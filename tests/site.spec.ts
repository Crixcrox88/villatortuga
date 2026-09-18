import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const locale of ["en", "es"]) {
  const path = locale === "en" ? "/" : "/es";
  for (const width of [360, 390, 768, 1024, 1440])
    test(`${locale} layout and accessibility at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator(".hero img")).toBeVisible();
      await expect(page.locator(".hero img")).toHaveJSProperty(
        "complete",
        true,
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        "noindex, nofollow",
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        locale === "en" ? "http://localhost:3000" : "http://localhost:3000/es",
      );
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
      expect(errors).toEqual([]);
      await page.screenshot({
        path: `test-results/${locale}-${width}.png`,
        fullPage: true,
      });
    });
  test(`${locale} gallery, keyboard, focus, FAQ and external links`, async ({
    page,
  }) => {
    await page.goto(path);
    const tile = page.locator(".gallery-tile").first();
    await tile.click();
    await expect(page.locator("dialog")).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(".lightbox-bottom p")).toContainText(
      locale === "en" ? "Photo 2 of 92" : "Foto 2 de 92",
    );
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() =>
        Boolean(document.activeElement?.closest("dialog")),
      ),
    ).toBe(true);
    await page.keyboard.press("Escape");
    await expect(page.locator("dialog")).not.toBeVisible();
    await expect(tile).toBeFocused();
    await page.locator("#gallery-category").selectOption("14");
    await expect(page.locator(".gallery-tile")).toHaveCount(1);
    await page.locator(".gallery-tile").click();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(".lightbox-bottom p")).toContainText(
      locale === "en" ? "Photo 1 of 1" : "Foto 1 de 1",
    );
    await page.keyboard.press("Escape");
    await page.locator("#gallery-category").selectOption("-1");
    await page.locator(".gallery-more").click();
    await expect(page.locator(".gallery-tile")).toHaveCount(18);
    await page.locator(".faq summary").first().click();
    await expect(page.locator(".faq details").first()).toHaveAttribute(
      "open",
      "",
    );
    for (const link of await page.locator('a[target="_blank"]').all()) {
      expect(await link.getAttribute("href")).toMatch(
        /^https:\/\/www.airbnb.com\/rooms\/1516054436387600999/,
      );
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
  test(`${locale} mobile menu, language and swipe`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(path);
    await page.locator(".menu-button").click();
    await page.locator('#mobile-menu a[href="#gallery"]').click();
    await expect(page.locator("#mobile-menu")).toHaveCount(0);
    await page.locator(".gallery-tile").first().click();
    await page.locator(".lightbox-image").dispatchEvent("touchstart", {
      changedTouches: [{ identifier: 1, clientX: 300 }],
    });
    await page.locator(".lightbox-image").dispatchEvent("touchend", {
      changedTouches: [{ identifier: 1, clientX: 100 }],
    });
    await expect(page.locator(".lightbox-bottom p")).toContainText(
      locale === "en" ? "Photo 2 of 92" : "Foto 2 de 92",
    );
    await page.keyboard.press("Escape");
    await page.locator(".language").click();
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      locale === "en" ? "es" : "en",
    );
    expect(page.url()).toContain("#gallery");
  });
}
test("404, metadata, assets and crawl controls", async ({ page, request }) => {
  for (const path of ["/missing-page", "/es/missing-page"]) {
    const res = await page.goto(path);
    expect(res?.status()).toBe(404);
    await expect(page.locator("h1")).toBeVisible();
  }
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
  expect((await request.get("/social.jpg")).status()).toBe(200);
  await page.goto("/");
  const ld = JSON.parse(
    await page.locator('script[type="application/ld+json"]').innerText(),
  );
  expect(ld["@type"]).toBe("LodgingBusiness");
  expect(ld.aggregateRating).toBeUndefined();
  const images = await page.evaluate(
    () =>
      performance
        .getEntriesByType("resource")
        .filter((x) => x.name.includes("/_next/image")).length,
  );
  expect(images).toBeLessThan(20);
});

test("refined navigation, locally hosted fonts and reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.locator("h1").evaluate((el) => getComputedStyle(el).fontFamily),
  ).toContain("editorial");
  expect(
    await page.evaluate(() => document.fonts.check("48px editorial")),
  ).toBe(true);
  await page.locator('.desktop-nav a[href="#spaces"]').click();
  await expect(page.locator('.desktop-nav a[href="#spaces"]')).toHaveAttribute(
    "aria-current",
    "location",
  );
  await expect(page.locator("header")).toHaveAttribute("data-scrolled", "true");
  expect(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
  ).toBe(0);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".menu-button").click();
  await page.locator("#mobile-menu a").first().focus();
  await page.keyboard.press("Escape");
  await expect(page.locator(".menu-button")).toBeFocused();
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
});

test("section motion follows scroll progress and keeps photos opaque", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/es");

  expect(
    await page.evaluate(() => CSS.supports("animation-timeline: view()")),
  ).toBe(true);
  await expect(page.locator(".pool-copy")).toHaveClass(/motion-copy/);
  await expect(page.locator(".pool-photo")).toHaveClass(/motion-media/);

  const sample = async () =>
    page.evaluate(() => {
      const copy = getComputedStyle(document.querySelector(".pool-copy")!);
      const media = getComputedStyle(document.querySelector(".pool-photo")!);
      return {
        copyOpacity: Number(copy.opacity),
        copyY: new DOMMatrixReadOnly(copy.transform).m42,
        mediaOpacity: Number(media.opacity),
        mediaY: new DOMMatrixReadOnly(media.transform).m42,
      };
    });

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    const target = document.querySelector(".pool-copy")!;
    const top = target.getBoundingClientRect().top + scrollY;
    scrollTo(0, top - innerHeight + 40);
  });
  await page.waitForTimeout(100);
  const entry = await sample();

  await page.evaluate(() => scrollBy(0, 560));
  await page.waitForTimeout(100);
  const settled = await sample();

  expect(entry.copyOpacity).toBe(1);
  expect(settled.copyOpacity).toBe(1);
  expect(settled.copyY).toBeLessThan(entry.copyY);
  expect(settled.mediaY).toBeLessThan(entry.mediaY);
  expect(entry.mediaOpacity).toBe(1);
  expect(settled.mediaOpacity).toBe(1);
});

test("editorial photos load while scrolling; content works without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100/");
  for (const selector of [
    ".hero img",
    ".pool-detail-photo img",
    ".room-photo img",
    ".kitchen-photo img",
    ".location-image img",
    ".final-cta img",
  ]) {
    for (const image of await page.locator(selector).all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate((el) => (el as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0);
    }
  }
  await expect(page.locator(".host")).toBeVisible();
  await page.locator(".faq summary").first().click();
  await expect(page.locator(".faq details").first()).toHaveAttribute(
    "open",
    "",
  );
  await context.close();
});

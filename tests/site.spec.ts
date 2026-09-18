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
      const heroExplore = page.locator(".hero-explore");
      const heroExploreStyles = await heroExplore.evaluate((element) => {
        const icon = element.querySelector("svg")!;
        const iconBox = icon.getBoundingClientRect();
        return {
          fontSize: Number.parseFloat(getComputedStyle(element).fontSize),
          iconWidth: iconBox.width,
          iconHeight: iconBox.height,
        };
      });
      expect(heroExploreStyles.fontSize).toBeGreaterThanOrEqual(14);
      expect(heroExploreStyles.iconWidth).toBeLessThanOrEqual(28);
      expect(heroExploreStyles.iconHeight).toBeLessThanOrEqual(28);
      const galleryIcon = page.locator(".gallery-tile .icon-view").first();
      const galleryIconBox = await galleryIcon.evaluate((element) => {
        const box = element.getBoundingClientRect();
        return { width: box.width, height: box.height };
      });
      expect(galleryIconBox.width).toBeLessThanOrEqual(32);
      expect(galleryIconBox.height).toBeLessThanOrEqual(32);
      await expect(page.locator(".host")).not.toContainText("Jorge");
      await expect(page.locator(".reviews-footer .small")).toHaveCount(0);
      const listingCard = page.locator(".airbnb-listing-card");
      await listingCard.scrollIntoViewIfNeeded();
      await expect(listingCard).toBeVisible();
      await expect(listingCard.locator("img")).toHaveJSProperty(
        "complete",
        true,
      );
      const hostProfile = page.locator(".host-profile");
      await hostProfile.scrollIntoViewIfNeeded();
      await expect(hostProfile.locator("img")).toHaveJSProperty(
        "complete",
        true,
      );
      const hostPhotoSize = await hostProfile
        .locator("img")
        .evaluate((image) => {
          const box = image.getBoundingClientRect();
          return { width: box.width, height: box.height };
        });
      expect(hostPhotoSize.width).toBeLessThanOrEqual(88.1);
      expect(hostPhotoSize.height).toBeLessThanOrEqual(88.1);
      await expect(page.locator(".amenity-icon .icon")).toHaveCount(4);
      expect(
        await page
          .locator(".location-stamp > strong")
          .evaluate((element) =>
            Number.parseInt(getComputedStyle(element).fontWeight, 10),
          ),
      ).toBeGreaterThanOrEqual(700);
      await expect(page.locator(".airbnb-proof iframe")).toHaveCount(0);
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
      const rel = (await link.getAttribute("rel"))?.split(/\s+/) ?? [];
      expect(rel).toEqual(expect.arrayContaining(["noopener", "noreferrer"]));
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

test("section motion follows scroll progress and keeps photos opaque and unclipped", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/es");

  await expect(page.locator("html")).toHaveClass(/lenis/);
  await expect(page.locator(".pool-copy")).toHaveClass(/motion-copy/);
  await expect(page.locator(".pool-photo")).toHaveClass(/motion-media/);

  const sample = async () =>
    page.evaluate(() => {
      const copy = getComputedStyle(document.querySelector(".pool-copy")!);
      const media = getComputedStyle(document.querySelector(".pool-photo")!);
      return {
        copyOpacity: Number(copy.opacity),
        copyY: new DOMMatrixReadOnly(copy.transform).m42,
        mediaClip: media.clipPath,
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
  expect(entry.mediaClip).toBe("none");
  expect(settled.mediaClip).toBe("none");

  await page.locator(".location-image").scrollIntoViewIfNeeded();
  await page.waitForTimeout(950);
  const stamp = await page.evaluate(() => {
    const frame = document.querySelector(".location-image")!;
    const badge = document.querySelector(".location-stamp")!;
    const frameRect = frame.getBoundingClientRect();
    const badgeRect = badge.getBoundingClientRect();
    return {
      overflow: getComputedStyle(frame).overflow,
      clipPath: getComputedStyle(frame).clipPath,
      extendsPastFrame: badgeRect.right > frameRect.right,
      insideViewport:
        badgeRect.left >= 0 &&
        badgeRect.right <= innerWidth &&
        badgeRect.top >= 0 &&
        badgeRect.bottom <= innerHeight,
    };
  });
  expect(stamp.overflow).toBe("visible");
  expect(stamp.clipPath).toBe("none");
  expect(stamp.extendsPastFrame).toBe(true);
  expect(stamp.insideViewport).toBe(true);
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

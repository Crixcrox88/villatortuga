#!/usr/bin/env bash
set -euo pipefail

root_dir="${1:-assets/property}"
cdn_root="https://a0.muscache.com/im/pictures/hosting"
standard_path="Hosting-1516054436387600999/original"
encoded_path="Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTUxNjA1NDQzNjM4NzYwMDk5OQ==/original"

categories=(
  "01-living-room:8"
  "02-full-kitchen:13"
  "03-bedroom-1:7"
  "04-bedroom-2:6"
  "05-bedroom-3:6"
  "06-bedroom-4:8"
  "07-full-bathroom-1:4"
  "08-full-bathroom-2:4"
  "09-full-bathroom-3:2"
  "10-full-bathroom-4:3"
  "11-balcony:6"
  "12-laundry-area:4"
  "13-exterior:6"
  "14-pool:14"
  "15-additional-photos:1"
)

ids=(
  838ee00a-a11b-46e4-9b46-556350a75194.jpeg
  1ec6d679-9044-49e1-bf27-ce5887cb0dce.jpeg
  d9eb092f-6a30-4d25-81fa-cd24b028f33e.jpeg
  dec4c0df-a664-4ddd-addf-273d91d610c4.jpeg
  1706a481-1a5f-45e3-8b8f-5763ee1be53b.jpeg
  b5077058-4ca5-4d9f-ae1e-b0d990e6094f.jpeg
  466ebe7f-0642-4ac2-a035-d9a586379cd7.jpeg
  211516c5-5c8a-4792-895a-5827d9b84df0.jpeg
  d9a5a3e5-7255-42a8-8a7d-bcc6a8d73707.jpeg
  46cef4dc-2e2d-42ed-99e4-aaadd4e93d8b.jpeg
  b49988b3-7ef7-45f6-9f85-371fc15127cc.jpeg
  dcc7063c-6871-4fab-a5ca-056105674bfd.jpeg
  e8abba66-6245-4c10-9dce-f44ea8926375.jpeg
  d51a17b0-a18b-4d22-bcf2-5f161bebb75f.jpeg
  33b8b017-8acc-45a5-aca6-23b7f0214748.jpeg
  f7b90ff0-56fe-456f-a7c9-8add90b76818.jpeg
  bb3f2d34-fe80-41cb-8da2-506ec1508db5.jpeg
  18cf57e0-cf45-4022-a205-395fee2ed7cd.jpeg
  fd0ef309-73a1-4595-9c1a-144b54e1f819.jpeg
  896f44f4-0b28-4b1b-a9a2-ea9a11d1c1a4.jpeg
  876ad2db-be16-4466-88ef-3dce8ca50934.jpeg
  b91cec17-9c9f-472f-b094-5da6b2d5b78c.jpeg
  97593077-5d25-48c8-823d-67c0f0bc4ede.jpeg
  3c5f9221-789b-47f5-80dd-651f0ed35c98.jpeg
  d6a64509-79d9-430d-a6dc-7b6983ffb8d5.jpeg
  126b1ef1-7b91-4456-9164-9e710e949141.jpeg
  bb12c327-0d2f-4278-af5c-b80d9d02290e.jpeg
  31bdb3af-1ab4-4529-9a8e-4be885952de1.jpeg
  eed199dc-c073-405a-9727-d26c0d1e66b5.jpeg
  e687bd4b-0116-4c30-88f1-2ed3a1edeb54.jpeg
  79937a1c-eb98-4cfb-a771-1e6e16a68a2a.jpeg
  23ac52c1-46f9-43d7-9c4a-da38ea6f7c2f.jpeg
  8b736417-2e55-4258-813b-eae5fa1c6225.jpeg
  a3f6b2ff-dbab-448e-b398-94e5f4b5a81a.jpeg
  00de1204-e4ab-41e2-9eab-1e4cccb48f70.jpeg
  72458056-588a-4f6f-8dd2-0914406644a4.jpeg
  75e8b938-3705-4f53-8969-a555afc1e91c.jpeg
  7cb28915-a21f-4365-baa3-a9a0f31309fd.jpeg
  47e70f62-018a-40a2-8d82-306e76b5b392.jpeg
  c768483f-f24d-4920-bdfe-fd6bfc95edc7.jpeg
  bfda8dbe-e035-4d87-a387-fbaae39368ec.jpeg
  01623341-05bd-4860-8f2e-6308c3cc6ab3.jpeg
  65b691b5-459c-4696-a9b3-3ebec05e6c50.jpeg
  08902285-b0ee-4530-a0b7-c78d6f9f4510.jpeg
  d91682a7-a3ab-43af-a4ee-e0c3ea4ebcd7.jpeg
  4e447161-65a0-4914-912d-193277e30204.jpeg
  f0446625-825a-4e49-afd2-8370cd0585c5.jpeg
  28cbac28-21a9-4f12-8db6-3e00d418599f.jpeg
  fd495e3e-77e7-4c44-b3ff-2d49c04001ce.jpeg
  70f0acba-78e0-4b38-834f-e154ec6c5c74.jpeg
  e0de3688-146c-4bbd-af8d-07749f08494e.jpeg
  33e3fe1e-46ed-4b73-a55d-ec737fbe0ccd.jpeg
  9db64d0f-8aed-4690-b59e-44d7289c182b.jpeg
  cb7fe430-2817-4a68-a6a4-96c3e9638802.jpeg
  9061bf77-0c27-4b58-bc63-3ebc324bb409.jpeg
  00e46ec7-ce1e-43d1-915a-c3175a22a6a5.jpeg
  9f6b2ec3-dc30-4c29-89a0-3b4add74d86c.jpeg
  5409f3e4-b55c-4479-b0f2-cb041d0fffaf.jpeg
  8fb4a5b1-b3ea-470a-ae19-213a16af553c.jpeg
  69e73344-9e8a-407b-ba30-919159ef3a06.jpeg
  de1e25d4-fc0f-4490-80ed-fe81a50eb5b8.jpeg
  0b3fb373-dde6-4070-adbe-547e992c76fa.jpeg
  8e18c281-f9ae-48a2-a4f6-e3aec632bd6d.jpeg
  c96489b5-2c40-4bee-95ae-4dee9e520713.jpeg
  7c69fdf5-8e43-4d21-9ec9-c0dde9bad65b.jpeg
  1326003d-55a4-4862-a16f-b4c44678eed0.jpeg
  12de652b-c7d5-49b7-992b-4c7e10686dde.jpeg
  391fbce7-f174-4938-9725-86ab6f7d3d76.jpeg
  2e30b631-59cb-434f-8c18-3844ab42380c.jpeg
  dd61b47b-c9cc-4c49-9dcc-beee18b3776e.jpeg
  63b8a364-66a5-4c85-a65b-0cfc1758ead0.jpeg
  7d1e3bb6-6cd8-4ec7-ab73-578678a81a7c.jpeg
  89d18bfc-5609-4a47-96b2-d2a583fefa2f.jpeg
  983be755-32c5-46b4-adf8-b3eab15cb9b2.jpeg
  76c70947-9b8d-4d1d-adb2-58034bdede18.jpeg
  2131511f-e5c4-4272-b697-91f0d352bbb1.jpeg
  4485a7f8-b3b5-4737-9dea-6549d15f4d85.jpeg
  d2fcb2dd-e459-4df6-b5c0-9afe20ea4ab3.jpeg
  ea6b2561-889f-4429-acfa-c6cb258fe03b.jpeg
  ea5354d5-80dc-4477-971b-99f705483063.jpeg
  55e7e335-f8bc-4064-97b9-744994727e49.jpeg
  aba74693-ffd5-40eb-8d6c-49094aea7833.jpeg
  e6f10cde-5117-4181-a5c3-e50f474757db.jpeg
  9feaa414-f279-4e6a-84a5-9d76822614f3.jpeg
  76e70c91-6f08-4ace-9523-871ada987c63.jpeg
  b7a0fe36-df97-4f2b-b222-8acd30d541a6.jpeg
  4c05b574-d1a4-4388-a5e3-8e049e7c0ebb.jpeg
  ee1136c8-6376-4709-ab90-e9394899caa6.jpeg
  2ea621d3-a9ac-4595-a05c-97e3442da419.jpeg
  b861ed6e-40fb-474e-9bf4-ed17bd183b0b.jpeg
  c5a454cb-f4ed-499c-8a3b-1469ee0a253b.jpeg
  89f68e5e-c00a-40f4-b0a7-3a31bb5235b8.jpeg
)

mkdir -p "$root_dir"
manifest="$root_dir/manifest.csv"
printf 'global_order,category_order,category,filename,requested_width,source_url\n' > "$manifest"

global_index=0
for category_spec in "${categories[@]}"; do
  category="${category_spec%%:*}"
  count="${category_spec##*:}"
  mkdir -p "$root_dir/$category"
  for ((category_index=1; category_index<=count; category_index++)); do
    id="${ids[$global_index]}"
    global_order=$((global_index + 1))
    filename=$(printf '%02d-%02d-%s' "$global_order" "$category_index" "$id")
    target="$root_dir/$category/$filename"
    requested_width="2560"
    image_path="$standard_path"
    case "$global_order" in
      48|64|65|66|67|68|69|70|71) image_path="$encoded_path" ;;
    esac
    url="$cdn_root/$image_path/$id?im_w=$requested_width"
    if [[ ! -s "$target" ]]; then
      downloaded=false
      for width in 2560 1920 1200 720; do
        url="$cdn_root/$image_path/$id?im_w=$width"
        if curl --fail --location --retry 2 --retry-delay 1 --silent "$url" --output "$target.part"; then
          mv "$target.part" "$target"
          requested_width="$width"
          downloaded=true
          break
        fi
      done
      if [[ "$downloaded" != true ]]; then
        printf 'Unable to download image %d (%s)\n' "$global_order" "$id" >&2
        exit 1
      fi
    fi
    printf '%d,%d,%s,%s,%s,%s\n' "$global_order" "$category_index" "$category" "$filename" "$requested_width" "$url" >> "$manifest"
    global_index=$((global_index + 1))
  done
done

printf 'Downloaded %d ordered property images into %s\n' "$global_index" "$root_dir"

Put your photographs here.

  assets/gallery/originals/all/        <- drop up to a few hundred .jpg / .png / .webp files in here
                                          (iPhone .HEIC: convert first, see below)

Then tell Claude "photos are in", or run it yourself:

  npm i -D sharp          (once)
  node scripts/add-photos.mjs

It writes resized copies (and strips GPS / camera data) into assets/gallery/full, thumbs and small,
and regenerates assets/js/gallery-data.js. Originals stay on your computer: this folder is git-ignored.

Convert HEIC to JPG on a Mac (inside the folder):
  for f in *.HEIC *.heic; do sips -s format jpeg "$f" --out "${f%.*}.jpg"; done

Optional captions: captions.json next to the photos, for example
  { "IMG_0012.jpg": { "title": { "en": "Low sun", "zh": "低低的太阳" }, "place": "Stockholm", "year": "2025" } }

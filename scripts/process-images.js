const path = require('path');

const fs = require('fs-extra');
const glob = require('glob');
const sharp = require('sharp');
const yaml = require('yamljs');

const ORIGINAL_IMAGE_DIR = 'assets/_original-images';
const OUTPUT_IMAGE_DIR = 'assets/images';

const imageSizes = yaml.load('./_config.yml').responsive_image_sizes;

const processImage = async (originalPath) => {
  console.log(`Processing image ${originalPath}.`);
  const {
    name: originalFileName,
    dir: originalDir,
    ext,
  } = path.parse(originalPath);
  const newDir = originalDir.replace(ORIGINAL_IMAGE_DIR, OUTPUT_IMAGE_DIR);

  await fs.ensureDir(newDir);

  const originalImage = sharp(originalPath);
  const metadata = await originalImage.metadata();
  const minDimension = Math.min(metadata.width, metadata.height);

  const resizeAndWriteImages = (input, newWidths, suffix) => (
    newWidths.reduce((promise, width) => (
      promise.then(() => (
        input
          .clone()
          .resize(width, suffix === 'thumb' ? width : undefined)
          .jpeg({ quality: 90 })
          .toFile(path.join(
            newDir,
            `${originalFileName}-${suffix}-${width}w${ext}`
          ))
      ))
    ), Promise.resolve())
  );

  // Process full width images.
  await resizeAndWriteImages(originalImage, imageSizes.full_width.srcset, 'full');

  // Process the thumbnails.
  const thumbnail = originalImage
    .clone()
    .resize(minDimension, minDimension);
  await resizeAndWriteImages(thumbnail, imageSizes.thumbnails.srcset, 'thumb');
};

glob(`${ORIGINAL_IMAGE_DIR}/**/*.jpg`, (err, files) => {
  const queue = files.reduce((promise, file) => {
    return promise.then(() => processImage(file));
  }, Promise.resolve());
  queue.then(() => {
    console.log('Finished processing images.');
  })
});

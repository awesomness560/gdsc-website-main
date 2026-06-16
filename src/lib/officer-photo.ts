import type { Area } from 'react-easy-crop'

const MAX_OUTPUT_PX = 800
const JPEG_QUALITY = 0.85

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', () => reject(new Error('Failed to load image')))
    image.src = src
  })
}

/** Crop a region from an image and downscale to a JPEG blob for upload. */
export async function cropAndDownscaleImage(
  imageSrc: string,
  pixelCrop: Area,
  maxSize = MAX_OUTPUT_PX,
): Promise<Blob> {
  const image = await loadImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas is not supported in this browser')

  const scale = Math.min(1, maxSize / Math.max(pixelCrop.width, pixelCrop.height))
  canvas.width = Math.round(pixelCrop.width * scale)
  canvas.height = Math.round(pixelCrop.height * scale)

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    canvas.width,
    canvas.height,
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Failed to export cropped image'))
      },
      'image/jpeg',
      JPEG_QUALITY,
    )
  })
}

/**
 * Image utilities shared across all profile pages.
 * Single source of truth for avatar processing.
 */

/**
 * Center-crops any image file to a 512×512 JPEG blob using the Canvas API.
 * Works in the browser only (uses HTMLCanvasElement).
 */
export function cropToSquare(file: File | Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    const objectUrl = URL.createObjectURL(file)
    img.onload = () => {
      const size = Math.min(img.width, img.height)
      const canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 512
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        URL.revokeObjectURL(objectUrl)
        return reject(new Error('Canvas context unavailable'))
      }
      const sx = (img.width - size) / 2
      const sy = (img.height - size) / 2
      ctx.drawImage(img, sx, sy, size, size, 0, 0, 512, 512)
      URL.revokeObjectURL(objectUrl)
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Canvas export failed'))),
        'image/jpeg',
        0.92
      )
    }
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Failed to load image'))
    }
    img.src = objectUrl
  })
}

/** Returns the 1-2 letter initials from a full name string. */
export function getInitials(name?: string | null): string {
  if (!name) return 'U'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

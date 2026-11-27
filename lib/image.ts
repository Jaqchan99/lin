const MAX_FILE_BYTES = 20 * 1024 * 1024

/**
 * Reads an image file, scales its longest edge down and re-encodes it as a
 * JPEG data URL so several entries fit in localStorage.
 */
export function readImageAsDataUrl(file: File, maxEdge = 1100): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('請選擇圖片檔案（JPG、PNG、WebP）。'))
      return
    }
    if (file.size > MAX_FILE_BYTES) {
      reject(new Error('圖片超過 20 MB，請先縮小後再上傳。'))
      return
    }

    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      URL.revokeObjectURL(url)
      const scale = Math.min(1, maxEdge / Math.max(image.width, image.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(image.width * scale)
      canvas.height = Math.round(image.height * scale)
      const context = canvas.getContext('2d')
      if (!context) {
        reject(new Error('無法處理這張圖片。'))
        return
      }
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', 0.82))
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('無法讀取這張圖片，請換一張試試。'))
    }
    image.src = url
  })
}

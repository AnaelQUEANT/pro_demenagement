export const getMobilier = async () => {
    const url = 'http://localhost:16501/mobilier'
    const request = await fetch(url)
    const result = await request.json()
    return result
  }
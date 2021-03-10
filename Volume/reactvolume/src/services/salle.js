export const getSalle = async () => {
    const url = 'http://localhost:16501/piece'
    const request = await fetch(url)
    const result = await request.json()
    return result
  }
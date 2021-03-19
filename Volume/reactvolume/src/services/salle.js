export const getSalle = async () => {
    const url = 'http://localhost:16501/typePiece'
    const request = await fetch(url)
    const result = await request.json()
    return result
  }
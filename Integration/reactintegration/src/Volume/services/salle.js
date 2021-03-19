export const getSalle = async () => {
    const url = 'http://localhost:16500/typePiece'
    const request = await fetch(url)
    const result = await request.json()
    return result
  }
export const getMobilier = async () => {
    const url = 'http://localhost:16500/mobilier'
    const request = await fetch(url)
    const result = await request.json()
    return result
  }

  export const getMobilierByPiece = async (id) => {
    const url = 'http://localhost:16500/mobilierByPiece/'+id.id
    const request = await fetch(url)
    const result = await request.json()
    return result
  }
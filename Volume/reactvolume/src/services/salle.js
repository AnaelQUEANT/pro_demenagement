export const getSalle = async () => {
    const url = 'http://localhost:16501/salle'
    const request = await fetch(url)
    const result = await request.json()
    return result
  }
export const getCamion = async () => {
    const url = 'http://localhost:16501/camion'
    const request = await fetch(url)
    const result = await request.json()
    return result
  }

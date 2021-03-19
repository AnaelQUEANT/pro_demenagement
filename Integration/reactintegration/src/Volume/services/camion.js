export const getCamion = async () => {
    const url = 'http://localhost:16500/camion'
    const request = await fetch(url)
    const result = await request.json()
    return result
  }

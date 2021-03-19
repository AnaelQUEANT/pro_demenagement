export const getCamion = async (vol) => {
    const url = 'http://localhost:16500/camion/'+vol
    const request = await fetch(url)
    const result = await request.json()
    return result
  }

import { request, config } from '../baseUtils'

export async function getSupports({ typeName }){
  const where = JSON.stringify({typeName})
  return request(`${config.APIV1}/support?limit=10000&where=${where}`)
}

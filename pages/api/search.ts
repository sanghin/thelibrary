import { NextApiRequest, NextApiResponse } from 'next'
import { getKnex } from '#server/database/knex'

const Search = async (request: NextApiRequest, response: NextApiResponse) => {
  const params: SearchParams = request.method === 'POST' ? JSON.parse(request.body) : request.query
  const qb = getKnex()

  const keys = Object.keys(params)
  for (const param of keys) {
    const value = params[param]

    if (param === 'ascendancy') {
      qb.whereRaw("pob->'PathOfBuilding'->'Build'->>'ascendClassName' = ?", value.charAt(0).toUpperCase() + value.slice(1))
    }
  }

  try {
    const builds = await qb

    return response.status(200).json({
      numberOfBuilds: builds.length,
      builds,
    })
  } catch (error) {
    console.error(error)

    return response.status(500).end()
  }
}

export default Search

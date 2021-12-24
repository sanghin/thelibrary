import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'
import parser from 'xml2json'
import { inflateSync } from 'zlib'
import { getKnex } from '#server/database/knex'
import { Model } from 'objection'
import Build from '#server/model/Build'
import { getTimestamp } from '#utils/methods'

Model.knex(getKnex())

const regex = /^https:\/\/pastebin\.com\/(\w{8,}?)/

/**
 * Convert PasteBin content to JSON
 * Reverse pob encoding process:
 * https://github.com/PathOfBuildingCommunity/PathOfBuilding/blob/0bbae520f87aa9d8c8e37c985ec152e9cc9d91be/src/Classes/ImportTab.lua#L168
 */
const fromPastebin = async (pasteBinId: string): Promise<POBBuild | null> => {
  try {
    const response = await fetch(`https://pastebin.com/raw/${pasteBinId}`)
    const text = await response.text()

    if (response.status !== 200 || text === 'Error with this ID!') {
      return null
    }

    const base64 = text.replace(/-/g, '+').replace(/_/g, '/')
    const buffer = Buffer.from(base64, 'base64')

    const inflateBuffer = inflateSync(buffer)

    const build = parser.toJson(inflateBuffer.toString(), { object: true }) as Partial<POBBuild>

    return build?.PathOfBuilding ? (build as POBBuild) : null
  } catch (err) {
    console.error(err)

    return null
  }
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const match = request.body.match(regex)
  const pasteBinId = match && match[1] ? match[1] : request.body
  const rawBuild = await fromPastebin(pasteBinId)

  if (!rawBuild) {
    return response.end()
  }

  try {
    await Build.query().insert({
      // created_at: getTimestamp(Date.now()),
      pob: rawBuild,
    })
  } catch (e) {
    console.error('Failed to save', e)

    return null
  }

  return response.status(201).json({
    meta: [],
    message: 'Success',
  })
}

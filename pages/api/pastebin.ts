import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'
import parser from 'xml2json'
import { inflateSync } from 'zlib'

// const Build = require('../../server/database/model/build')
const regex = /^https:\/\/pastebin\.com\/(\w{8,}?)/

/**
 * Convert PasteBin content to JSON
 * Reverse pob encoding process:
 * https://github.com/PathOfBuildingCommunity/PathOfBuilding/blob/0bbae520f87aa9d8c8e37c985ec152e9cc9d91be/src/Classes/ImportTab.lua#L168
 */
const fromPastebin = async (pasteBinId) => {
  try {
    const response = await fetch(`https://pastebin.com/raw/${pasteBinId}`)
    const text = await response.text()

    if (response.status !== 200 || text === 'Error with this ID!') {
      return null
    }

    const base64 = text.replace(/-/g, '+').replace(/_/g, '/')
    const buffer = Buffer.from(base64, 'base64')

    const inflateBuffer = inflateSync(buffer)

    return parser.toJson(inflateBuffer.toString(), { object: true })
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
    // eslint-disable-next-line no-console
    console.log('EMPTY RESPONSE')

    return response.end()
  }

  try {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(rawBuild, null, 4))

    // await new Build({
    //   created_at: new Date().toUTCString(),
    //   pob: rawBuild,
    // }).save()
  } catch (e) {
    console.error('Failed to save', e)

    return null
  }

  return response.status(201).json({
    meta: [],
    message: 'Success',
  })
}

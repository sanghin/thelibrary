import guid from 'objection-guid'
import { Model } from 'objection'

export default class Build extends guid()(Model) {
  id: string
  pob: POBBuild
  created_at: number
  updated_at: number

  static tableName = 'build'
}
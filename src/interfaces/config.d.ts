export interface ConfigProps {
  mongodb: {
    database: MongodbConfigProps
  },
  defaultRole: string
}
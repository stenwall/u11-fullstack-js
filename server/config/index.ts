export default {
  CLIENT_URL: process.env.CLIENT_URL as string,
  DB_URI: process.env.DB_URI as string,
  PORT: process.env.PORT as unknown as number,
  DB_NAME: process.env.DB_NAME as string,
  PRIVATE_KEY: process.env.PRIVATE_KEY as string
}
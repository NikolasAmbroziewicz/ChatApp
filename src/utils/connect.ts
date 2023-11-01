import mongoose from "mongoose";
import config from 'config'

import logger from "./logger";

async function connect () {
  try {
    const dbUri =  config.get<string>('dbUri')
    await mongoose.connect(dbUri)
    logger.info("Database has been connected")
  } catch(e) {
    logger.error('Could not connect to DB')
    process.exit(1)
  }
}

export default connect
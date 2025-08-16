import { PrismaClient } from "@prisma/client";
import logger from "../logger/index.js";

const prisma = new PrismaClient({
  log:[{level:'warn', emit:'event'}, {level:'error', emit:'event'}, {level:'info', emit:'event'}]
});

prisma.$on('error', (e) => {
  logger.error('Prisma error', e);
});

prisma.$on('warn', (e) => {
  logger.warn('Prisma warning', e);
});

prisma.$on('info', (e) => {
  logger.info('Prisma info', e);
});

export default prisma;

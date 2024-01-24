import rTracer from 'cls-rtracer'
import winston from 'winston'

const { combine, timestamp, printf } = winston.format

const rTracerFormat = printf(({ level, message, timestamp }) => {
  const rid = rTracer.id()
  return rid
    ? `${timestamp} - (${level.toUpperCase()}) [${rid}]: ${message}`
    : `${timestamp} - (${level.toUpperCase()}): ${message}`
})

const logger = winston.createLogger({
  format: combine(
    timestamp({ format: 'DD-MM-YYYY hh:mm:ss A' }),
    rTracerFormat
  ),
  transports: [new winston.transports.Console()]
})

export default logger

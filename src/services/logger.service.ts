import pino, { Logger as PinoLogger } from 'pino'

export class LoggerService {
  private readonly logger: PinoLogger

  constructor(context?: string) {
    this.logger = pino({
      level: 'info',
      transport: {
        targets: [
          {
            target: 'pino/file',
            options: { destination: 'logs/info.log' },
            level: 'info'
          },
          {
            target: 'pino/file',
            options: { destination: 'logs/error.log' },
            level: 'error'
          }
        ]
      }
    })

    if (context) {
      this.logger = this.logger.child({ context })
    }
  }

  info(message: string, payload?: unknown) {
    this.logger.info(payload || {}, message)
  }

  warn(message: string, payload?: unknown) {
    this.logger.warn(payload || {}, message)
  }

  error(message: string, payload?: unknown) {
    this.logger.error(payload || {}, message)
  }

  debug(message: string, payload?: unknown) {
    this.logger.debug(payload || {}, message)
  }

  trace(message: string, payload?: unknown) {
    this.logger.trace(payload || {}, message)
  }
}

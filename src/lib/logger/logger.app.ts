import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class AppLogger {
  private readonly logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: 'logs/app.log',
      }),
    ],
  });

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
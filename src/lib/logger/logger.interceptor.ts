import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { WinstonLogger } from "nest-winston";
import { Observable, tap } from "rxjs";
import { AppLogger } from "./logger.app";


@Injectable()
export class LoggerInterceptors implements NestInterceptor{
    constructor(private readonly logger :AppLogger)
    {}
    intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {

    const request = context.switchToHttp().getRequest();

    const start = Date.now();

    this.logger.log(
      `Request: ${request.method} ${request.url}`,
    );

    return next.handle().pipe(
      tap(() => {
        const time = Date.now() - start;

        this.logger.log(
          `Response: ${request.method} ${request.url} - ${time}ms`,
        );
      }),
    );
  }
}
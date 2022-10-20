import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MessageService } from '../services/message.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  // Aqui usei um Interceptor para tratar os vários tipos de erros HTTP de forma global
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }

        let errorMsg = '';

        if (err.error instanceof ErrorEvent) {
          errorMsg = `Error: ${err.error.message}`;
        } else if (Array.isArray(err.error) && err.error.length) {         // Tipo de erros que vem do Backend ver no Ferramentas do Desenvolverdor 
          errorMsg = `Error: ${err.error[0]}`;                             // no google chrome
        } else if (err.error.errors) {
          errorMsg = `Error: ${err.error.errors}`;
        } else {
          errorMsg = `Error Code: ${err.status}, Message: ${err.message}`;
        }

        this.messageService.add(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}

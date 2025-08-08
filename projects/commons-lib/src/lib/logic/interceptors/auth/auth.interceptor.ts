import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { hideSpinner, showSpinner } from '../../utils/eventBusConstants';
import { Router } from '@angular/router';
import { EventBusService } from '../../services/event-bus/event-bus.service';
import { ErrorModalService } from '../../../web/components/modal-error';

@Injectable()

/**
** Intercepta todas las peticiones
* @autor laurarojas
*/

export class AuthInterceptor implements HttpInterceptor {


  constructor(
    private readonly _router: Router, private readonly _eventBus: EventBusService, private readonly modalErrorService: ErrorModalService) { }

  /**
   * Envía un mensaje para mostrar un spinner, gestiona las peticiones HTTP, oculta el spinner
   * en respuestas exitosas, y maneja errores mostrando un mensaje de error modal o redireccionando a
   * la página de inicio para un estado 403.
   * @param request -representa la petición HTTP
   * que está siendo interceptada antes de ser enviada. Contiene información como el método de petición,
   * cabeceras, cuerpo y URL.
   * @param {HttpHandler} next - es una referencia al siguiente interceptor de la cadena.
   * siguiente interceptor de la cadena o el `HttpHandler` final que enviará la petición HTTP.
   * El método `intercept` devuelve un Observable de tipo `HttpEvent<unknown>`.
   * @autor laurarojas
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    return this.handleRequest(request, next);

  }

  private handleRequest(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {

    this._eventBus.sendMessage(showSpinner);

    const excludedUrls = [
      'product',
      'login',
      'category',
      'register',
      'random',
      'discount'
    ];

    const shouldExclude = excludedUrls.some(url => request.url.includes(url));

    if (!shouldExclude) {
      const token = sessionStorage.getItem('token');

      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
      finalize(() => this._eventBus.sendMessage(hideSpinner))
    );
  }

  private getErrorMessage(serviceError: any): string {
    if (serviceError.message) return serviceError.message;
    return 'Error en la consulta, intente de nuevo más tarde';
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 403) {
      this._router.navigate(['/']);
    } else {
      this.showModalError(this.getErrorMessage(error.error));
    }
    return throwError(() => error);
  }

  private showModalError(message: string): void {
    this.modalErrorService.setConfigModal(message);
  }

}


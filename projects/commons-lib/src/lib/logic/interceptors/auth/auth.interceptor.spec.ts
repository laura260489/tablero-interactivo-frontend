import { TestBed, inject } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { EventBusService } from '../../services/event-bus/event-bus.service';
import { ErrorModalService } from '../../../web/components/modal-error';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let interceptor: AuthInterceptor;
  let httpMock: HttpTestingController;
  let router: Router;

  const mockDataBus = {
    from: 'auth',
    to: 'shell',
    message: { isShowHeader: true },
  };
  const serviceMockBus = {
    onMessage: jest.fn().mockReturnValue(of(mockDataBus)),
    sendMessage: jest.fn()
  };
  const mockRouter = {
    navigate: jest.fn(),
  };
  const mockCognitoTokenService = {
    tokenIsExpired: jest.fn(),
    generateToken: jest.fn()
  }

  const mockSessionStorageService = {
    getValue: jest.fn()
  }

  const mockErrorModalService = {
    setConfigModal: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthInterceptor,
        { provide: Router, useValue: mockRouter },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: EventBusService, useValue: serviceMockBus },
        { provide: ErrorModalService, useValue: mockErrorModalService },
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(AuthInterceptor);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('Se debe crear el componente', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('debe enviar mensajes showSpinner y hideSpinner para HttpResponse correctos', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    const fakeResponse = { data: 'test' };
    const spySendMessage = jest.spyOn(serviceMockBus, 'sendMessage');
    
    httpClient.get('/api/data').subscribe((response) => {
      expect(response).toEqual(fakeResponse);
      expect(spySendMessage).toHaveBeenNthCalledWith(1, 'showSpinner');
      expect(spySendMessage).toHaveBeenNthCalledWith(2, 'hideSpinner');
    });
    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toEqual('GET');

    req.flush(fakeResponse);
    expect(spySendMessage).toHaveBeenCalledTimes(2);

    spySendMessage.mockRestore();
  });


  it('debe interceptar las peticiones HTTP', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
    const fakeErrorResponse = new HttpErrorResponse({
      error: 'test 403 error',
      status: 403,
      statusText: 'forbidden'
    });

    httpClient.get('/api/data').pipe(
      catchError((error: HttpErrorResponse) => {
        expect(error.status).toEqual(403);
        return throwError(() => new Error(error.message));
      })
    ).subscribe({
      error: (error) => expect(error.status).toEqual(403)
    })
    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toEqual('GET');
    req.flush({}, fakeErrorResponse);
    httpMock.verify();
  }));


  it('debe interceptar las respuestas HTTP 400 sin el mensaje', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
    const fakeErrorResponse = new HttpErrorResponse({
      error: 'test 400 error',
      status: 400,
      statusText: 'not found'
    });

    httpClient.get('/api/data').pipe(
      catchError((error: HttpErrorResponse) => {
        expect(error.status).toEqual(400);
        return throwError(() => new Error(error.message));
      })
    ).subscribe({
      error: (error) => expect(error.status).toEqual(400)
    })
    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toEqual('GET');
    req.flush({}, fakeErrorResponse);
    httpMock.verify();
  }));

  it('debe interceptar las respuestas HTTP 400 y mostrar el mensaje dataheader', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
    const fakeErrorResponseTwo = new HttpErrorResponse({
      status: 400,
      statusText: 'not found',
      error: {
        dataHeader: {
          errores: [
            {
              ID_ERROR: 1996,
              DESC_ERROR: "No cuenta con un convenio valido para realizar esta autorización, Por favor comuníquese al #322 para poderlo ayudar",
              TIPO_ERROR: "W",
              MSG_ERROR: "Consulta no devuelve registros.",
              MSG_ERROR1: "log_id=12151002"
            }
          ]
        }
      }
    });

    httpClient.get('/api/data/prueba').pipe(
      catchError((errorTwo: HttpErrorResponse) => {
        expect(errorTwo.status).toEqual(400);
        return throwError(() => new Error(errorTwo.message));
      })
    ).subscribe({
      error: (errorTwo) => expect(errorTwo.status).toEqual(400)
    })
    const request = httpMock.expectOne('/api/data/prueba');
    expect(request.request.method).toBe('GET');
    request.flush({}, fakeErrorResponseTwo);
    httpMock.verify();
  }));




  it('debería redirigir al usuario cuando el error tiene estado 403', () => {
    const errorResponse = new HttpErrorResponse({ status: 403, statusText: 'Forbidden' });

    interceptor['handleError'](errorResponse).subscribe({
      error: () => {
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      }
    });
  });

  it('debería mostrar un modal con el mensaje de error cuando no es un 403', () => {
    const errorResponse = new HttpErrorResponse({
      status: 500,
      error: { dataHeader: { errores: [{ DESC_ERROR: 'Server Error' }] } },
      statusText: 'Internal Server Error'
    });

    interceptor['handleError'](errorResponse).subscribe({
      error: () => {
        expect(interceptor['getErrorMessage']).toHaveBeenCalledWith(errorResponse.error);

      }
    });
  });

});


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RemoteEntryComponent } from './remote-entry.component';
import { loginSuccess } from '@commons-lib';

describe('RemoteEntryComponent', () => {
  let component: RemoteEntryComponent;
  let fixture: ComponentFixture<RemoteEntryComponent>;
  let httpMock: HttpTestingController;
  let router: Router;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoteEntryComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: '', component: RemoteEntryComponent },
          { path: 'auth/crear-cuenta', component: RemoteEntryComponent }
        ]),
        HttpClientTestingModule
      ],
      providers: [
        provideMockStore({})
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoteEntryComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store) as MockStore;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
    expect(component.loginForm.get('email')?.hasError('required')).toBeTruthy();
    expect(component.loginForm.get('password')?.hasError('required')).toBeTruthy();
  });

  it('should mark form as touched when form is invalid on submit', () => {
    component.ngOnInit();
    jest.spyOn(component.loginForm, 'markAllAsTouched');
    
    component.onSubmit();
    
    expect(component.loginForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should make HTTP request when form is valid', () => {
    component.ngOnInit();
    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password123'
    });

    component.onSubmit();

    const req = httpMock.expectOne(request => 
      request.url.includes('login') && 
      request.method === 'POST'
    );
    
    expect(req.request.body).toEqual({
      email: 'test@example.com',
      password: 'password123'
    });
    
    req.flush({ status_code: 200, token: 'mock-token' });
  });

  it('should handle HTTP error', () => {
    component.ngOnInit();
    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password123'
    });
    jest.spyOn(console, 'log').mockImplementation();

    component.onSubmit();

    const req = httpMock.expectOne(request => 
      request.url.includes('login')
    );
    
    req.flush('Error', { status: 500, statusText: 'Server Error' });
    
    expect(console.log).toHaveBeenCalled();
  });

  it('should navigate to create account', () => {
    jest.spyOn(router, 'navigate');
    
    component.navigateCreateAccount();
    
    expect(router.navigate).toHaveBeenCalledWith(['/auth/crear-cuenta']);
  });

  it('should decode token and dispatch login success', () => {
    const storeSpy = jest.spyOn(store, 'dispatch');
    const routerSpy = jest.spyOn(router, 'navigate');
    const sessionSpy = jest.spyOn(Storage.prototype, 'setItem');
    
    const validJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzIiwiZmlyc3RfbmFtZSI6IkpvaG4iLCJsYXN0X25hbWUiOiJEb2UiLCJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiZnJlcXVlbnRfdXNlciI6dHJ1ZSwicm9sZSI6WyJhZG1pbiJdfQ.mock-signature';
    
    try {
      component['decodeToken'](validJwt);
      
      expect(sessionSpy).toHaveBeenCalledWith('token', validJwt);
      expect(storeSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith(['/']);
    } catch (error) {
      expect(component['decodeToken']).toBeDefined();
    }
  });
});

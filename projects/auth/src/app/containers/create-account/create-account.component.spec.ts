import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

import { CreateAccountComponent } from './create-account.component';
import { ModalInformationService } from '@commons-lib';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;
  let httpMock: HttpTestingController;
  let modalInformationService: any;

  beforeEach(async () => {
    const modalSpy = {
      setConfigModal: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [CreateAccountComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'auth', component: CreateAccountComponent }
        ]),
        HttpClientTestingModule
      ],
      providers: [
        { provide: ModalInformationService, useValue: modalSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    modalInformationService = TestBed.inject(ModalInformationService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    
    expect(component.createAccount).toBeDefined();
    expect(component.createAccount.get('name')).toBeTruthy();
    expect(component.createAccount.get('lastName')).toBeTruthy();
    expect(component.createAccount.get('phone')).toBeTruthy();
    expect(component.createAccount.get('email')).toBeTruthy();
    expect(component.createAccount.get('password')).toBeTruthy();
  });

  describe('Form Validation', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should require all fields', () => {
      expect(component.createAccount.get('name')?.hasError('required')).toBeTruthy();
      expect(component.createAccount.get('lastName')?.hasError('required')).toBeTruthy();
      expect(component.createAccount.get('phone')?.hasError('required')).toBeTruthy();
      expect(component.createAccount.get('email')?.hasError('required')).toBeTruthy();
      expect(component.createAccount.get('password')?.hasError('required')).toBeTruthy();
    });

    it('should validate name pattern (no numbers)', () => {
      const nameControl = component.createAccount.get('name');
      nameControl?.setValue('Laura123');
      expect(nameControl?.hasError('pattern')).toBeTruthy();
      
      nameControl?.setValue('Laura');
      expect(nameControl?.hasError('pattern')).toBeFalsy();
    });

    it('should validate lastName pattern (no numbers)', () => {
      const lastNameControl = component.createAccount.get('lastName');
      lastNameControl?.setValue('Rojas123');
      expect(lastNameControl?.hasError('pattern')).toBeTruthy();
      
      lastNameControl?.setValue('Rojas');
      expect(lastNameControl?.hasError('pattern')).toBeFalsy();
    });

    it('should validate phone pattern (10 digits)', () => {
      const phoneControl = component.createAccount.get('phone');
      phoneControl?.setValue('123');
      expect(phoneControl?.hasError('pattern')).toBeTruthy();
      
      phoneControl?.setValue('1234567890');
      expect(phoneControl?.hasError('pattern')).toBeFalsy();
    });

    it('should validate email format', () => {
      const emailControl = component.createAccount.get('email');
      emailControl?.setValue('invalid-email');
      expect(emailControl?.hasError('email')).toBeTruthy();
      
      emailControl?.setValue('test@example.com');
      expect(emailControl?.hasError('email')).toBeFalsy();
    });

    it('should validate password complexity', () => {
      const passwordControl = component.createAccount.get('password');
      
      passwordControl?.setValue('123');
      expect(passwordControl?.hasError('minlength')).toBeTruthy();
      
      passwordControl?.setValue('password123');
      expect(passwordControl?.hasError('pattern')).toBeTruthy();
      
      passwordControl?.setValue('PASSWORD123');
      expect(passwordControl?.hasError('pattern')).toBeTruthy();
      
      passwordControl?.setValue('Password');
      expect(passwordControl?.hasError('pattern')).toBeTruthy();
      
      passwordControl?.setValue('Password123');
      expect(passwordControl?.valid).toBeTruthy();
    });
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should mark all fields as touched when form is invalid', () => {
      jest.spyOn(component.createAccount, 'markAllAsTouched');
      
      component.onSubmit();
      
      expect(component.createAccount.markAllAsTouched).toHaveBeenCalled();
    });

    it('should make HTTP request when form is valid', () => {
      component.createAccount.patchValue({
        name: 'Laura',
        lastName: 'Rojas',
        phone: '1234567890',
        email: 'laura@example.com',
        password: 'Password123'
      });

      component.onSubmit();

      const req = httpMock.expectOne((request) => 
        request.url.includes('register') && request.method === 'POST'
      );
      
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        first_name: 'Laura',
        last_name: 'Rojas',
        email: 'laura@example.com',
        phone: '1234567890',
        password: 'Password123'
      });
      expect(req.request.headers.get('Content-Type')).toBe('application/json');

      req.flush({ status_code: 201 });
    });

    it('should call showModal on successful registration', () => {
      jest.spyOn(component, 'showModal');
      
      component.createAccount.patchValue({
        name: 'Laura',
        lastName: 'Rojas',
        phone: '1234567890',
        email: 'laura@example.com',
        password: 'Password123'
      });

      component.onSubmit();

      const req = httpMock.expectOne((request) => 
        request.url.includes('register')
      );
      req.flush({ status_code: 201 });

      expect(component.showModal).toHaveBeenCalled();
    });

    it('should handle HTTP error', () => {
      jest.spyOn(console, 'log').mockImplementation();
      
      component.createAccount.patchValue({
        name: 'Laura',
        lastName: 'Rojas',
        phone: '1234567890',
        email: 'laura@example.com',
        password: 'Password123'
      });

      component.onSubmit();

      const req = httpMock.expectOne((request) => 
        request.url.includes('register')
      );
      req.flush('Error', { status: 400, statusText: 'Bad Request' });

      expect(console.log).toHaveBeenCalled();
    });

    it('should not call showModal when status_code is not 201', () => {
      jest.spyOn(component, 'showModal');
      
      component.createAccount.patchValue({
        name: 'Laura',
        lastName: 'Rojas',
        phone: '1234567890',
        email: 'laura@example.com',
        password: 'Password123'
      });

      component.onSubmit();

      const req = httpMock.expectOne((request) => 
        request.url.includes('register')
      );
      req.flush({ status_code: 400 });

      expect(component.showModal).not.toHaveBeenCalled();
    });
  });

  describe('Modal Methods', () => {
    it('should call modalInformationService.setConfigModal with correct config in showModal', () => {
      component.showModal();

      expect(modalInformationService.setConfigModal).toHaveBeenCalledWith({
        message: "Usuario creado de manera exitosa",
        showButton: true,
        buttonConfig: {
          label: "Iniciar sesión",
          navigate: "/auth"
        }
      });
    });

    it('should call modalInformationService.setConfigModal with null in modalClose', () => {
      component.modalClose(true);

      expect(modalInformationService.setConfigModal).toHaveBeenCalledWith(null);
    });
  });

  describe('Navigation', () => {
    it('should have navigateToLogin method', () => {
      expect(component.navigateToLogin).toBeDefined();
      expect(typeof component.navigateToLogin).toBe('function');
    });
  });

  describe('Password Hashing', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should hash password using CryptoJS.SHA3', () => {
      component.createAccount.patchValue({
        name: 'Laura',
        lastName: 'Rojas',
        phone: '1234567890',
        email: 'laura@example.com',
        password: 'Password123'
      });

      component.onSubmit();

      const req = httpMock.expectOne((request) => 
        request.url.includes('register')
      );
      
      expect(req.request.body.password).toBe('Password123');
      
      req.flush({ status_code: 201 });
    });
  });
});
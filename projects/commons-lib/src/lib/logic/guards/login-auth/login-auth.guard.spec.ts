import { TestBed, fakeAsync } from '@angular/core/testing';
import { LoginAuthGuard } from './login-auth.guard';
import { Router } from '@angular/router';

describe('LoginAuthGuard', () => {
  let guard: LoginAuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginAuthGuard,
        { provide: Router, useValue: { navigate: jest.fn() } }, // Mock del router
      ],
    });
    guard = TestBed.inject(LoginAuthGuard);
    router = TestBed.inject(Router);
  });

  it('Se debe crear el componente', () => {
    expect(guard).toBeTruthy();
  });

});

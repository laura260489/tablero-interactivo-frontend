import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomJwtPayload, loginSuccess, User } from '@commons-lib';
import { Store } from '@ngrx/store';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-remote-entry',
  templateUrl: './remote-entry.component.html',
  styleUrls: ['./remote-entry.component.scss']
})
export class RemoteEntryComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private store: Store, private http: HttpClient) { }

  ngOnInit() {
    sessionStorage.setItem('mock', JSON.stringify({ id: '1', name: 'John Doe', email: 'doe@gmail.com', token: '1223344', role: 'admin' }));
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    const body = {
      email: email,
      password: password
    }

    this.http.post<any>(
      process.env['urlBase'] + 'login',
      body,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    ).subscribe({
      next: (response) => {
        if (response.status_code === 200) this.decodeToken(response.token);
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  private decodeToken(token: string) {
    const decoded: CustomJwtPayload = jwtDecode<CustomJwtPayload>(token);

    sessionStorage.setItem('token', token);

    const user: User = {
      id: decoded.user_id,
      firstName: decoded.first_name,
      lastName: decoded.last_name,
      sub: decoded.sub,
      frecuent: decoded.frequent_user,
      role: decoded.role
    };

    this.store.dispatch(loginSuccess({ user }));
    this.router.navigate(['/home/board', 121212]);
  }

  public navigateCreateAccount() {
    this.router.navigate(['/crear-cuenta']);
  }

}

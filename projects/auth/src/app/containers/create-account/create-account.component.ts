import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalInformationService } from '@commons-lib';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  public createAccount: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private modalInformationService: ModalInformationService) { }

  ngOnInit() {
    this.createAccount = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]]
    });
  }

  onSubmit() {
    if (this.createAccount.valid) {
      const { name, lastName, email, phone, password } = this.createAccount.value;

      let passwordHash = password.trim();
      let hash = CryptoJS.SHA3(passwordHash, { outputLength: 256 });
      passwordHash = hash.toString(CryptoJS.enc.Hex);
      const body = {
        first_name: name,
        last_name: lastName,
        email: email,
        phone: phone,
        password: password
      }
      this.http.post<any>(
        process.env['urlBase'] + 'register',
        body,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }
      ).subscribe({
        next: (response) => {
          if(response.status_code === 201) this.showModal();
        },
        error: (error) => {
          console.log(error)
        }
      });

    } else {
      this.createAccount.markAllAsTouched();
    }
  }

  public showModal(): void {
    this.modalInformationService.setConfigModal({
      message: "Usuario creado de manera exitosa",
      showButton: true,
      buttonConfig: {
        label: "Iniciar sesión",
        navigate: "/auth"
      }
    });
  }
  navigateToLogin() {
    this.router.navigate(['/auth']);
  }

  public modalClose(event: boolean) {
    this.modalInformationService.setConfigModal(null);
  }

}

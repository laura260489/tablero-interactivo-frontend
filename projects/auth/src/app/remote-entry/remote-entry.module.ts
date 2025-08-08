import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteEntryComponent } from './remote-entry.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { StoreModule } from '@ngrx/store';
import { ErrorsFormModule } from '@commons-lib';


@NgModule({
  declarations: [
    RemoteEntryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent
      },
      {
        path: 'crear-cuenta',
        loadChildren: () => import('../containers/create-account/create-account.module').then(m => m.CreateAccountModule),
      }
    ]),
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    StoreModule,
    ErrorsFormModule
  ]
})
export class RemoteEntryModule { }

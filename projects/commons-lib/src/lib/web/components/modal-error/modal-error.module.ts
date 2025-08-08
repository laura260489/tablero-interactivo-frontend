import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalErrorComponent } from './modal-error.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule
  ],
  declarations: [ModalErrorComponent],
  exports: [ModalErrorComponent]
})
export class ModalErrorModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalInformationComponent } from './modal-information.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule
  ],
  declarations: [ModalInformationComponent],
  exports: [ModalInformationComponent]
})
export class ModalInformationModule { }

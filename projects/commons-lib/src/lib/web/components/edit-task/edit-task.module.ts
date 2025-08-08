import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ErrorsFormModule } from '../errors-form/errors-form.module';
import { ModalInformationModule } from '../modal-information/modal-information.module';
import { EditTaskComponent } from './edit-task.component';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';

import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DividerModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputTextModule,
    MultiSelectModule,
    ErrorsFormModule,
    ModalInformationModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule
  ],
  declarations: [EditTaskComponent],
  exports: [EditTaskComponent]
})
export class EditTaskModule { }

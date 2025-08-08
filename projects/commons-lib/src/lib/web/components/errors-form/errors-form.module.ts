import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsFormComponent } from './errors-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ErrorsFormComponent],
  exports: [ErrorsFormComponent]
})
export class ErrorsFormModule { }

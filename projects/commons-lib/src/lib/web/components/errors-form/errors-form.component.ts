import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-errors-form',
  templateUrl: './errors-form.component.html',
  styleUrls: ['./errors-form.component.scss']
})
export class ErrorsFormComponent {

  @Input() control!: AbstractControl | null;
  @Input() label: string = '';

  constructor() { }

  hasFormatError(): boolean {
    if (!this.control || !this.control.errors) return false;
    const errorKeys = Object.keys(this.control.errors);
    return errorKeys.some(key => key !== 'required');
  }

}

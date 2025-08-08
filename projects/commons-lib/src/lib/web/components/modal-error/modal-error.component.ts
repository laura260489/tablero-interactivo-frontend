import { Component, OnInit } from '@angular/core';
import { ErrorModalService } from './error-modal.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent implements OnInit {
  public display: boolean;
  public message: string = '';

  //* Se utiliza para manejar el ciclo de vida o para emitir una señal de destrucción.
  private readonly _destroyer$ = new Subject<void>();

  constructor(private modalService: ErrorModalService, private router: Router) { }

  ngOnInit() {
    this.modalService
      .getConfigModal()
      .pipe(takeUntil(this._destroyer$))
      .subscribe(message => {
        if (message) {
          this.message = message;
          this.display = true;
        };
      });
  }

}

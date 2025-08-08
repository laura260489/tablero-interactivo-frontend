import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ModalInformationService } from './modal-information.service';
import { ModalConfig } from '../../../logic/interfaces/modal-information.interface';

@Component({
  selector: 'app-modal-information',
  templateUrl: './modal-information.component.html',
  styleUrls: ['./modal-information.component.scss']
})
export class ModalInformationComponent implements OnInit {

  @Output() isClosed = new EventEmitter<boolean>();

  public display: boolean;
  public config: ModalConfig;

  //* Se utiliza para manejar el ciclo de vida o para emitir una señal de destrucción.
  private readonly _destroyer$ = new Subject<void>();

  constructor(private modalInformation: ModalInformationService, private router: Router) { }

  ngOnInit() {
    this.modalInformation
      .getConfigModal()
      .pipe(takeUntil(this._destroyer$))
      .subscribe(config => {
        if (config) {
          this.config = config;
          this.display = true;
        };
      });
  }

  public navigate(route:string) {
    this.display = false;
    this.isClosed.emit(true);
    this.router.navigate([route]);
  }

}


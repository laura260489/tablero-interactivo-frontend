import { Injectable } from '@angular/core';
import { ModalConfig } from '../../../logic/interfaces/modal-information.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalInformationService {

  private readonly controlModal = new BehaviorSubject<ModalConfig>(null);

  getConfigModal(): Observable<ModalConfig> {
    return this.controlModal.asObservable();
  }

  setConfigModal(config: ModalConfig) {
    this.controlModal.next(config);
  }

}

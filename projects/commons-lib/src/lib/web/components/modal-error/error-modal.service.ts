import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorModalService {

  private readonly controlModal = new BehaviorSubject<string>(null);

  /**
  * Devuelve un Observable de tipo IModalConfig que representa el modal de configuración.
  * @returns Se devuelve un Observable de tipo IModalConfig.
  * @autor laurarojas
  */
  getConfigModal(): Observable<string> {
    return this.controlModal.asObservable();
  }

  /**
   * La función `setConfigModal` establece la configuración para un modal pasando un mensaje al
   * controlModal`.
   * @param {string} message - De tipo
   * `IModalConfig`, que se utiliza para configurar un modal en la aplicación.
   * @autor laurarojas
   */
  setConfigModal(message: string) {
    this.controlModal.next(message);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
/**
** Manejador de eventos para comunicación entre micro front-ends.
* @autor laurarojasseguros and JesusMancilla-SB
*/

export class EventBusService {
  private eventSubject = new BehaviorSubject<any>('');

  constructor() {
    window.addEventListener('onMessageEventBus', (event: any) => {
      const data = event.detail.data;
      this.eventSubject.next(data);
    });
  }

  /**
   * Dispara un evento al DOM
   * @param {object} data - contiene la información que se va a enviar al disparar
   * el evento.
   * @autor laurarojasseguros and JesusMancilla-SB
   */
  sendMessage(data: object) {
    const event = new CustomEvent('onMessageEventBus', { detail: { data } });
    window.dispatchEvent(event);
  }
  /**
   * Obtiene el mensaje enviado.
   * @returns Un observable del behavior subject que dispara y recibe el mensaje
   * @autor laurarojasseguros and JesusMancilla-SB
   */
  onMessage(): Observable<any> {
    return this.eventSubject.asObservable();
  }
}

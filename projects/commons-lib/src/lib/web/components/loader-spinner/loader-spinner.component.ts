import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { EventBusService, IEventBus } from '../../../logic';

@Component({
  selector: 'lib-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
/**
** Componente que contiene el spinner transversal
* @autor laurarojasseguros and JesusMancilla-SB
*/
export class LoaderSpinnerComponent implements OnInit {
  //* Recibe un boolean para mostrar o no el spinner, se debe inicializar en falso
  @Input() isShow = false;

  constructor(public eventBus: EventBusService) {}

  /**
   * Se consume el servicio de event bus para saber si se muestra el spinner.
  */
  ngOnInit(): void {
    this.eventBus.onMessage().subscribe((data: IEventBus) => {
      if (data.to == 'spinner') {
        this.isShow = data.message.isShowSpinner;
      }
    });
  }

}

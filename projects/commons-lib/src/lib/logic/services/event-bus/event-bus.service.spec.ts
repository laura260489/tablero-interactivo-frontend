import { TestBed } from '@angular/core/testing';

import { EventBusService } from './event-bus.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

describe('EventBusService', () => {
  let service: EventBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventBusService);
  });

  it('Se debe crear el componente', () => {
    expect(service).toBeTruthy();
  });

  it('debería llamar a eventSubject.next() con los datos correctos cuando se activa onMessageEventBus', () => {
    const mockData = { message: 'Hello, world!' };
    const mockEvent = new CustomEvent('onMessageEventBus', { detail: { data: mockData } });

    const mockWindow: any = {};
    const mockEventSubject = new BehaviorSubject<any>('');

    service['eventSubject'] = mockEventSubject;

    service['window'] = mockWindow;

    mockWindow.dispatchEvent = jest.fn();
    service.sendMessage(mockData);

    mockWindow.dispatchEvent(mockEvent);

    let receivedData: any;
    service.onMessage().subscribe(data => {
      receivedData = data;
    });

    expect(receivedData).toEqual(mockData);
  });

});

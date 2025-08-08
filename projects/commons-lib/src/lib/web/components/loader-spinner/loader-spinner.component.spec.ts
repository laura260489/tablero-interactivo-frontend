import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderSpinnerComponent } from './loader-spinner.component';
import { of } from 'rxjs/internal/observable/of';
import { EventBusService } from '../../../logic/services/event-bus/event-bus.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoaderSpinnerComponent', () => {
  let component: LoaderSpinnerComponent;
  let fixture: ComponentFixture<LoaderSpinnerComponent>;
  const mockDataBus = {
    from: 'auth',
    to: 'spinner',
    message: { isShowSpinner: true },
  };
  const serviceMockBus = {
    onMessage: jest.fn().mockReturnValue(of(mockDataBus)),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderSpinnerComponent ],
      providers:[{ provide: EventBusService, useValue: serviceMockBus }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se debe crear el componente', () => {
    expect(component).toBeTruthy();
  });
});

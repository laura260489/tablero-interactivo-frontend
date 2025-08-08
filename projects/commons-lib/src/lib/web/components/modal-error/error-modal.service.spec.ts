import { TestBed } from '@angular/core/testing';
import { ErrorModalService } from './error-modal.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ErrorModalService', () => {
  let service: ErrorModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorModalService],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    service = TestBed.inject(ErrorModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable from getConfigModal', (done) => {
    const mockMessage = 'An error occurred';

    service.setConfigModal(mockMessage);

    service.getConfigModal().subscribe((message) => {
      expect(message).toEqual(mockMessage);
      done();
    });
  });

  it('should update the modal configuration when setConfigModal is called', () => {
    const mockMessage = 'This is a warning';

    service.setConfigModal(mockMessage);

    service.getConfigModal().subscribe((message) => {
      expect(message).toEqual(mockMessage);
    });
  });

  it('should emit null when setConfigModal is called with null', () => {
    service.setConfigModal(null);

    service.getConfigModal().subscribe((message) => {
      expect(message).toBeNull();
    });
  });
});
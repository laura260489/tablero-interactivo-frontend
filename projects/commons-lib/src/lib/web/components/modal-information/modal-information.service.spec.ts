/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModalInformationService } from './modal-information.service';

describe('Service: ModalInformation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalInformationService]
    });
  });

  it('should ...', inject([ModalInformationService], (service: ModalInformationService) => {
    expect(service).toBeTruthy();
  }));
});

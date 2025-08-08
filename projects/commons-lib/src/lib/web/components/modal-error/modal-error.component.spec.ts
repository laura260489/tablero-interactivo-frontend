import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ModalErrorComponent } from './modal-error.component';
import { ErrorModalService } from './error-modal.service';

describe('ModalErrorComponent', () => {
  let component: ModalErrorComponent;
  let fixture: ComponentFixture<ModalErrorComponent>;
  let errorModalService: any;

  beforeEach(async () => {
    const spy = {
      getConfigModal: jest.fn().mockReturnValue(of('Test error message'))
    };

    await TestBed.configureTestingModule({
      declarations: [ModalErrorComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ErrorModalService, useValue: spy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalErrorComponent);
    component = fixture.componentInstance;
    errorModalService = TestBed.inject(ErrorModalService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.display).toBeUndefined();
    expect(component.message).toBe('');
  });

  it('should subscribe to modal service on ngOnInit', () => {
    errorModalService.getConfigModal.mockReturnValue(of(null));
    
    component.ngOnInit();
    
    expect(errorModalService.getConfigModal).toHaveBeenCalled();
  });

  it('should set message and display when service emits message', () => {
    const testMessage = 'Test error message';
    errorModalService.getConfigModal.mockReturnValue(of(testMessage));
    
    component.ngOnInit();
    
    expect(component.message).toBe(testMessage);
    expect(component.display).toBe(true);
  });

  it('should not set display when service emits null', () => {
    errorModalService.getConfigModal.mockReturnValue(of(null));
    
    component.ngOnInit();
    
    expect(component.message).toBe('');
    expect(component.display).toBeUndefined();
  });

  it('should not set display when service emits empty string', () => {
    errorModalService.getConfigModal.mockReturnValue(of(''));
    
    component.ngOnInit();
    
    expect(component.message).toBe('');
    expect(component.display).toBeUndefined();
  });
});
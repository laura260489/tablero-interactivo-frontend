import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalInformationService} from '@commons-lib';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  public idTask: string = '';

  public isEdit: boolean = false;

  public editTask: FormGroup;

  public availableStates: any[] = [
    { name: 'En progreso', code: 'progress', disabled: false },
    { name: 'Por hacer', code: 'todo', disabled: false },
    { name: 'Hecho', code: 'done', disabled: false }
  ];

  public priority: any[] = [
    { name: 'Baja', code: 'low', disabled: false },
    { name: 'Media', code: 'medium', disabled: false },
    { name: 'Alta', code: 'high', disabled: false }
  ]

  public tag: any[] = [
    { name: 'Incidente', code: 'incident', disabled: false },
    { name: 'Feature', code: 'feature', disabled: false },
    { name: 'Urgente', code: 'urgent', disabled: false },
  ]


  constructor(private fb: FormBuilder, private http: HttpClient, public config: DynamicDialogConfig, private modalInformationService: ModalInformationService) { }

  ngOnInit() {

    this.idTask = this.config.data?.idTask;

    if(this.idTask) this.isEdit = true;

    this.editTask = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
      priority: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
      estimation: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      description: ['', [Validators.required, Validators.email]],
      tag: [[], [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
      start_date: [null, [Validators.required]],
      end_date: [null, [Validators.required]],
      user_asign: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
      state: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
    });
  }


  onSubmit() {
    if (this.editTask.valid) {
      const { title, priority, estimation,description, state } = this.editTask.value;
    } else {
      this.editTask.markAllAsTouched();
    }
  }

  public showModal(message:string): void {
    this.modalInformationService.setConfigModal({
      message: message,
      showButton: true,
      buttonConfig: {
        label: "Aceptar",
        navigate: "/"
      }
    });
  }

  public modalClose(event: boolean) {
    this.modalInformationService.setConfigModal(null);
  }
}

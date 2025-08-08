import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalInformationService, selectUser, User } from '@commons-lib';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  public idTask: string = '';
  public idUser: string;

  public isCreate: boolean = false;

  public editTask: FormGroup;

  public availableStates: any[] = [
    { name: 'En progreso', code: 'progress', disabled: false },
    { name: 'Por hacer', code: 'TODO', disabled: false },
    { name: 'Hecho', code: 'done', disabled: false }
  ];

  public priority: any[] = [
    { name: 'Baja', code: 'low', disabled: false },
    { name: 'Media', code: 'medium', disabled: false },
    { name: 'Alta', code: 'high', disabled: false }
  ]

  user$ = this.store.select(selectUser);

  constructor(private fb: FormBuilder, private http: HttpClient, public config: DynamicDialogConfig, private modalInformationService: ModalInformationService, private store: Store, private router: Router) { }

  ngOnInit() {

    if (Array.isArray(this.config.data?.idTask) && this.config.data.idTask.length === 0) {
      this.isCreate = true;
    } else {
      this.isCreate = false;
    }
    

    this.editTask = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
      priority: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
      estimation: ['', [Validators.required]],
      start_date: [null, [Validators.required]],
      end_date: [null, [Validators.required]],
      state: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
    });

    this.user$.subscribe((user: User) => {
      this.idUser = user.id;
    })
  }


  onSubmit() {
    if (this.editTask.valid) {
      const { title, priority, estimation, start_date, end_date, state } = this.editTask.value;

      const body = {
        name: title,
        priority,
        estimation,
        startDate: start_date.toISOString(),
        endDate: end_date.toISOString(),
        state,
        boardId: sessionStorage.getItem('board'),
        userId: this.idUser
      }
      if (!this.isCreate) {
        this.http.post<any>(
          process.env['urlBase'] + 'tasks',
          body,
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          }
        ).subscribe({
          next: (response) => {
            if (response.status_code === 201) {
              this.showModal("Tarea creada de manera exitosa")
              this.router.navigate(['/home/board', 121212]);
            }
          },
          error: (error) => {
            console.log(error)
          }
        });
      }
    } else {
      this.editTask.markAllAsTouched();
    }
  }

  public showModal(message: string): void {
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

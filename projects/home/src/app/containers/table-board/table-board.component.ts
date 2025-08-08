import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EditTaskComponent, logout, TagColors } from '@commons-lib';
import { Store } from '@ngrx/store';
import { DndDropEvent } from 'ngx-drag-drop';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TaskData } from '@commons-lib';
@Component({
  selector: 'app-table-board',
  templateUrl: './table-board.component.html',
  styleUrls: ['./table-board.component.scss']
})
export class TableBoardComponent implements OnInit {

  public value: any = '';
  public items: any[] = [];
  public ref!: DynamicDialogRef;

  public usersBoard: any[] = [
    { id: 1, name: 'Laura' },
    { id: 2, name: 'Maria' },
    { id: 3, name: 'Maria' },
    { id: 4, name: 'Maria' }
  ]


  public lists: any[] = [];

  constructor(
    private router: Router, private dialogService: DialogService, private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService, private store: Store, private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<TaskData[]>(process.env['urlBase'] + 'tasks/project/' + 'proyecto_contable').subscribe({
      next: (data) => {
        const listMap = {
          TODO: 'list-0',
          IN_PROGRESS: 'list-1',
          DONE: 'list-2'
        };

        this.lists = [
          { id: 'list-0', title: 'Pendiente', cards: [] },
          { id: 'list-1', title: 'En Proceso', cards: [] },
          { id: 'list-2', title: 'Completado', cards: [] }
        ];
        data.forEach(task => {
          const listId = listMap[task.status];
          const card = {
            id: task.taskId,
            title: task.taskName,
            users: [`${task.userFirstName} ${task.userLastName}`],
            tag: [task.priority?.toLowerCase() || 'feature']
          };

          const list = this.lists.find(l => l.id === listId);
          if (list) {
            list.cards.push(card);
          }
        });

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar tareas:', err);
      }
    });
  }


  public search(event: any) { }

  public onBoardSelect(event: any) {
    const selectedBoard = event;
    this.value = selectedBoard;
    this.router.navigate(['/board', selectedBoard.id]);
  }

  public onCardClick(card) {
    this.ref = this.dialogService.open(EditTaskComponent, {
      header: 'Editar Tarea',
      width: '50%',
      data: {
        idTask: 488448
      }
    });
  }


  public onDrop(event: DndDropEvent, targetList: any[]) {

    const draggedItem = event.data;

    if (!draggedItem || !draggedItem.id) {
      return;
    }

    let sourceList: any[] | undefined;
    let sourceIndex = -1;

    for (const list of this.lists) {
      const index = list.cards.findIndex(card => card.id === draggedItem.id);
      if (index !== -1) {
        sourceList = list.cards;
        sourceIndex = index;
        break;
      }
    }

    if (!sourceList) {
      return;
    }

    sourceList.splice(sourceIndex, 1);
    targetList.splice(event.index, 0, draggedItem);

    this.cdr.detectChanges();
  }

  public addTask() {
    this.ref = this.dialogService.open(EditTaskComponent, {
      header: 'Añadir Tarea',
      width: '50%',
      data: {}
    });
  }

  confirm(id: string) {
    this.confirmationService.confirm({
      message: '¿Desea eliminar la tarea?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        window.location.reload();

      },
      reject: () => {
        window.location.reload();
      }
    });
  }

  getColor(code: string): string {
    return TagColors[code] || 'gray';
  }

  public logout() {
    this.router.navigate(['/auth']);
    this.store.dispatch(logout());
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }



}

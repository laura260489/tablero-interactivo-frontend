import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EditTaskComponent, TagColors } from '@commons-lib';
import { DndDropEvent } from 'ngx-drag-drop';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

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


  lists = [
    {
      id: 'list-0',
      title: 'Pendiente',
      cards: [
        { id: '1t', title: 'Tarea 1', users: ['Laura'], tag: ['feature'] },
        { id: '2t', title: 'Tarea 2', users: ['Juan'], tag: ['incident'] }
      ]
    },
    {
      id: 'list-1',
      title: 'En Proceso',
      cards: [
        { id: '3t', title: 'Tarea 3', users: ['Sofía'], tag: ['feature'] },
        { id: '4t', title: 'Tarea 4', users: ['María'], tag: ['incident'] }
      ]
    },
    {
      id: 'list-2',
      title: 'Completado',
      cards: [
        { id: '5t', title: 'Tarea 5', users: ['Miguel'], tag: ['incident'] }
      ]
    }
  ];

  constructor(private router: Router, private dialogService: DialogService, private cdr: ChangeDetectorRef, private confirmationService: ConfirmationService) { }

  ngOnInit() {

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

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }



}

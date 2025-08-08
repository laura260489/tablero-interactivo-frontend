import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBoardComponent } from './table-board.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DndModule } from 'ngx-drag-drop';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    AutoCompleteModule,
    FormsModule,
    AvatarModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    AvatarGroupModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    DndModule,
    StoreModule,
    RouterModule.forChild([{
      path: ':id',
      component: TableBoardComponent
    }])
  ],
  declarations: [TableBoardComponent],
  providers: [DialogService, ConfirmationService]
})
export class TableBoardModule { }

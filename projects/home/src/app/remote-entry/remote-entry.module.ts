import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteEntryComponent } from './remote-entry.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    RemoteEntryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent
      },
      {
        path: "board",
        loadChildren: () =>
          import("../containers/table-board/table-board.module").then(
            (m) => m.TableBoardModule
          ),
      },
    ])
  ],
})
export class RemoteEntryModule { }

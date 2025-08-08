import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { formatRoute } from './config-routes';
import { MICRO_FRONTS } from '../core/constants';

const routes: Routes = [
  formatRoute(MICRO_FRONTS.AUTH.name, ''),
  formatRoute(MICRO_FRONTS.HOME.name, 'home'),
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

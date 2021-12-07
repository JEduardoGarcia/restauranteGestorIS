import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenesComponent } from './pages/ordenes/ordenes.component';
import { TotalComponent } from './pages/total/total.component';
import { PlatillosComponent } from './pages/platillos/platillos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/', pathMatch: 'full'
  },
  {
    path: 'ordenes',
    component: OrdenesComponent
  },
  {
    path: 'platillos',
    component: PlatillosComponent
  },
  {
    path: 'total',
    component: TotalComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

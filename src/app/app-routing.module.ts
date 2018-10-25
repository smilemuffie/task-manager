import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: '', loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'project', loadChildren: './project/project.module#ProjectModule'
  },
  {
    path: 'task', loadChildren: './task/task.module#TaskModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

## [Angular Lazy Loading](https://angular.io/guide/lazy-loading-ngmodules)
**steps:**
step 1: generate a new project `ng new project --routing`, `--routing` will help you to generate a `app-routing.module.ts` file. If you didn't use this commands, you need to make this file by yourself. This file will help you manage your routes well.
app-routing.module.ts
```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', loadChildren: './auth/auth.module#AuthModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
step 2: generate two files to manage your common parts and shared parts, `ng g m core`, `ng g m shared`. You can generate public components such as header, footer in core file by `ng g c core/header`, 

step 3: generate a module `ng g m auth --routing`, you will get an auth file, and then keep going on generating components `ng g c auth/login`, `ng g c auth/register`

## Vscode plugins for Angular
- Angular 7 Snippets
- tslint

tips
1. Dialog components must be injected in entryComponents, so you can use this.dialog.open(xxxComponent)

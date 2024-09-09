import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth.layout/auth.layout.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: AuthLayoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    ReactiveFormsModule 
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

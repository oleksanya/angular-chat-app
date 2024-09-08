import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatLayoutComponent } from './chat.layout/chat.layout.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ChatLayoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
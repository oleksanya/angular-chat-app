import { importProvidersFrom, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { authInterceptorProvider } from '../core/http/http.interceptor';
import { ChatService } from '../services/chat.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChatRoutingModule
  ],
  providers: [
    UserService,
    ChatService,
    provideHttpClient(withInterceptorsFromDi()),
    authInterceptorProvider
  ]
})
export class ChatModule { }
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app.routes';

import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { UserGuard } from './guards/user.guard';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateUserComponent,
    ListUsersComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ AuthenticationService, UserGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user/:id', canActivate: [UserGuard] ,component: CreateUserComponent },
    { path: 'list-users', canActivate: [UserGuard], component: ListUsersComponent },
    { path: '**', redirectTo: '/login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

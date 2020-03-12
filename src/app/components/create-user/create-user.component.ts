import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  title = 'Editar Usuario'

  public user: User;
  public status: string;
  public identity: string;
  public token: string;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _userService: UsuariosService,
              private _authService: AuthenticationService) { 
              this.user = new User('', '', '', '', '','ROLE_USER');
              this.identity = this._authService.getIdentity();
              this.token = this._authService.getToken();
              }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this._route.params.forEach((params: Params)=>{
      let id = params['id'];

      this._userService.getUser(id).subscribe(
        response => {
          if(!response.user){
            this._router.navigate(['/list-users']);
          }else{
            this.user = response.user;
          }
        }, 
        error => {
          console.log(error);
          this._router.navigate(['/list-users']);
        }
      )
    })
  }
  onSubmit(){
  let id = this.user._id;
  this._userService.editUser(this.token, id, this.user).subscribe(
    response =>{
      if(!response.user){
        this.status = 'error';
      }else{
        this.status = 'success';
        this.user = response.user;
      }
    },
    error => {
      console.log(error);
    }
  )
  }

}

import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  title = 'Usuarios'
  public token: string;

  public usuarios;

  constructor(private _userService: UsuariosService,
              private _authService: AuthenticationService) {
    this.token = this._authService.getToken();
   }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this._userService.listarUsuarios().subscribe(
      res => {
        this.usuarios = res.users ;
      }
    )
  }

  deleteUser(id){
    this._userService.deleteUser(this.token, id).subscribe(
      response =>{
        if(!response.user){
          alert('error en el servidor');
        }
        this.getUsers();
      },
      error =>{
        alert('Error en el servidor');
      }
    )
  }

}

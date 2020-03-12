import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public title = 'Login';
  public user: User;
  public identity;
  public token;
  public status: string;

  constructor(private _userService: AuthenticationService,
              private _router: Router) {
    this.user = new User('','','','','','ROLE_USER');
   }

  ngOnInit(): void {}

  onSubmit(){
    this._userService.singUp(this.user).subscribe(
      response =>{
        this.identity = response.user;

        if(!this.identity || !this.identity._id){
          console.log("El usuario no se logueo");
        }else{
          this.identity.password = '';

          localStorage.setItem('identity', JSON.stringify(this.identity));
          ///OBTENER EL TOKEN
          this._userService.singUp(this.user, 'true').subscribe(
            response =>{
              this.token = response.token;
      
              if(this.token.length <= 0 ){
                console.log("No hay token");
              }else{
                ///GUARDAR TOKEN EN LOCAL STORAGE
                localStorage.setItem('token', this.token);
                this.status = 'success';

                this._router.navigate(['/list-users'])
              }
            },
            error => { }
          )}
      },
      error => {
        var errorMessage = error;
        if(errorMessage != null){
          this.status = 'error'
        }
      }
    )
  }

}

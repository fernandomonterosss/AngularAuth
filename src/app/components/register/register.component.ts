import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  title = 'Registro';
  public user: User;
  public message: string;
  public status: string;

  constructor(private _userService: AuthenticationService) {
    this.user = new User('', '', '', '', '','ROLE_USER');
   }

  ngOnInit(): void {}

  onSubmit(registerForm){
    this._userService.register(this.user)
    .subscribe(response => {
      if(response.user && response.user._id){
        this.status = 'success';
        this.user = new User('', '', '', '', '','ROLE_USER');
        registerForm.reset();
      }else{
        this.status = 'error';
      }
      
    }, error => {})  
  }

}

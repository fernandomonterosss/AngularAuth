import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  public identity;
  constructor(private _userService: AuthenticationService,
              private _router: Router) { }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/'])
  }

}

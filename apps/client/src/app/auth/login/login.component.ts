import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserInput } from '../../../generated-types';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router) { }

  login(createUserData: CreateUserInput) {
    this.loginService.login(createUserData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}

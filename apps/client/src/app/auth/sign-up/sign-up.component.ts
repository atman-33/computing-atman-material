import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { CreateUserGQL, CreateUserInput } from '../../../generated-types';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  constructor(
    private readonly createUserGql: CreateUserGQL,
    private readonly loginService: LoginService,
    private readonly router: Router) { }

  signUp(createUserData: CreateUserInput) {
    // console.log(email, password);
    this.createUserGql
      .mutate({ createUserData })
      .pipe(
        concatMap(() => {
          return this.loginService.login(createUserData);
        })
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}

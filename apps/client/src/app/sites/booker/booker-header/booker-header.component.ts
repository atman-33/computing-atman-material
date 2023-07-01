import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CurrentUserGQL } from '../../../../generated-types';

@Component({
  selector: 'app-booker-header',
  templateUrl: './booker-header.component.html',
  styleUrls: ['./booker-header.component.scss'],
})
export class BookerHeaderComponent implements OnInit {
  currentUserEmail$!: Observable<string>

  constructor(
    private readonly currentUserGql: CurrentUserGQL
  ){}

  ngOnInit(): void {
      this.currentUserEmail$ = this.currentUserGql
        .watch()
        .valueChanges.pipe(map(result => result.data.currentUser.email));
  }

  // isLoggedIn$!: Observable<boolean>;

  // constructor(private readonly authService: AuthService) {
  //   console.log('booker-header.component.ts => constructor');
  //   this.isLoggedIn$ = authService.authenticated$;
  //   this.isLoggedIn$.subscribe(
  //     (data) => {
  //       console.log(`booker-header: ${data}`);
  //   });
  // }

  // onLogout() {
  //   this.authService.logout();
  // }
}

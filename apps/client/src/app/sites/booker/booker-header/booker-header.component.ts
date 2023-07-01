import { Component } from '@angular/core';

@Component({
  selector: 'app-booker-header',
  templateUrl: './booker-header.component.html',
  styleUrls: ['./booker-header.component.scss'],
})
export class BookerHeaderComponent {
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

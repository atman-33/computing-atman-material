import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-booker-header',
  templateUrl: './booker-header.component.html',
  styleUrls: ['./booker-header.component.scss'],
})
export class BookerHeaderComponent {
  isLoggedIn$!: Observable<boolean>;

  constructor(private readonly authService: AuthService) {
    console.log('booker-header.component.ts => constructor');
    this.isLoggedIn$ = authService.authenticated$;
  }

  onLogout() {
    this.authService.logout();
  }
}

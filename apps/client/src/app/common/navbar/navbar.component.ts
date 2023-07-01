import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { games } from '../../games/games';
import { sites } from '../../sites/sites';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLoggedIn$!: Observable<boolean>;
  isNavbarDialogOpen = false;

  sites = sites;
  games = games;

  constructor(
    private readonly authService: AuthService) {
    this.isLoggedIn$ = authService.authenticated$;
    this.isLoggedIn$.subscribe(
      (data) => {
        console.log(`navbar login: ${data}`);
    });
  }

  toggleNavbarDialog() {
    console.log('Toggle clicked!');
    this.isNavbarDialogOpen = !this.isNavbarDialogOpen;
  }

  closeNavbarDialog() {
    console.log('closeNavbarDialog!');
    this.isNavbarDialogOpen = false;
  }

  onLogout() {
    this.authService.logout();
    this.isNavbarDialogOpen = false;
  }
}

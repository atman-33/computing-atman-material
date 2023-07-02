import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CurrentUserGQL } from '../../../generated-types';
import { AuthService } from '../../auth/auth.service';
import { games } from '../../games/games';
import { sites } from '../../sites/sites';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  currentUserEmail$!: Observable<string>;
  isNavbarDialogOpen = false;

  sites = sites;
  games = games;

  constructor(
    private readonly authService: AuthService,
    private readonly currentUserGql: CurrentUserGQL
  ) {
    this.isLoggedIn$ = authService.authenticated$;
    this.isLoggedIn$.subscribe(
      (data) => {
        console.log(`navbar login: ${data}`);
      });
  }

  ngOnInit(): void {
    const isAuthenticated$ = this.authService.isAuthenticated();
    isAuthenticated$.subscribe(
      (data) => {
        console.log(`login: ${data}`);
      }
    )

    this.currentUserEmail$ = this.currentUserGql
      .watch()
      .valueChanges.pipe(map(result => result.data.currentUser.email));
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

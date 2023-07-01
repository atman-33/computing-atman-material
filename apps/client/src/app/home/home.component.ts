import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HomeComponent {
  showSitesList = false;
  showGamesList = false;

  constructor(
    private readonly router: Router) {
  }

  onBlogButtonClicked() {
    console.log('clicked!');
    this.router.navigate(['/blog']);
  }

  onSitesButtonClicked() {
    this.showSitesList = !this.showSitesList;
  }

  onGamesButtonClicked() {
    this.showGamesList = !this.showGamesList;
  }
}

import { Component } from '@angular/core';
import { games } from './games';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  games = games;

  onLinkClick(url: string) {
    window.open(url, '_blank');
  }
}

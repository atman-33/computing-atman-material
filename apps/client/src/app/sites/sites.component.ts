import { Component } from '@angular/core';
import { sites } from './sites';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent {
  sites = sites;

  onLinkClick(url: string) {
    window.open(url, '_blank');
  }
}

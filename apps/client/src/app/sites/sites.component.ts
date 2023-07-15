import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { sites } from './sites';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent {
  sites = sites;

  constructor(private readonly router: Router){}

  onLinkClick(url: string, isBlank = 'true'): void {

    if(isBlank === 'true'){
      window.open(url, '_blank');
    }else{
      this.router.navigate([url]);
    }
  }
}

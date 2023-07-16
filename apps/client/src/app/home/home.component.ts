import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonToggle } from '@angular/material/button-toggle';
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

export class HomeComponent implements OnInit   {

  @ViewChild('blogButton', { static: true }) blogButton!: MatButtonToggle;
  @ViewChild('sitesButton', { static: true }) sitesButton!: MatButtonToggle;
  @ViewChild('gamesButton', { static: true }) gamesButton!: MatButtonToggle;

  constructor(
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
      this.blogButton.checked = true;
      this.sitesButton.checked = true;
      this.gamesButton.checked = true;
  }
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SitesModule } from '../sites/sites.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SitesModule],
})
export class HomeModule {}

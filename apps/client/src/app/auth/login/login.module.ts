import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '../auth.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthModule],
})
export class LoginModule {}

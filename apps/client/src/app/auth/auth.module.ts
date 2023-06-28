import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule],
  exports: [AuthComponent]
})
export class AuthModule { }

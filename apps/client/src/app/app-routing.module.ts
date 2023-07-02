import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { BlogModule } from './blog/blog.module';
import { HomeComponent } from './home/home.component';
import { BookerModule } from './sites/booker/booker.module';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    },
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: '**',
        redirectTo: '',
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        BlogModule,
        BookerModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
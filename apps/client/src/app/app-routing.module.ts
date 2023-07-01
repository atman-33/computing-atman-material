import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
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
    // {
    //     path: 'sites/booker',
    //     component: BookerComponent,
    //     //canActivate: [AuthGuard]    // check login or logout(auth.guard > canActivate => auth.service > isAuthenticated)
    // },
    {
        path: '**',
        redirectTo: '',
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        BookerModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
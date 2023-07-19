import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Consts } from '@libs/angular-shared/domain';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { BlogModule } from './blog/blog.module';
import { HomeComponent } from './home/home.component';
import { BookerModule } from './sites/booker/booker.module';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login | ' + Consts.TITLE,
        data: {
            title: 'Login | ' + Consts.TITLE,
            description: Consts.DESCRIPTION,
            keywords: Consts.KEYWORDS,
            twittercard: Consts.TWITTER_CARD,
            twittersite: Consts.TWITTER_SITE,
            twitterimage: Consts.TWITTER_IMAGE,
            url: Consts.ROOT_URL + '/login',        
        }
    },
    {
        path: 'signup',
        component: SignUpComponent,
        title: 'Sign Up | ' + Consts.TITLE,
        data: {
            title: 'Sign Up | ' + Consts.TITLE,
            description: Consts.DESCRIPTION,
            keywords: Consts.KEYWORDS,
            twittercard: Consts.TWITTER_CARD,
            twittersite: Consts.TWITTER_SITE,
            twitterimage: Consts.TWITTER_IMAGE,
            url: Consts.ROOT_URL + '/signup',        
        }
    },
    {
        path: '',
        component: HomeComponent,
        title: 'Computing Atman',
        data: {
            title: Consts.TITLE,
            description: Consts.DESCRIPTION,
            keywords: Consts.KEYWORDS,
            twittercard: Consts.TWITTER_CARD,
            twittersite: Consts.TWITTER_SITE,
            twitterimage: Consts.TWITTER_IMAGE,
            url: Consts.ROOT_URL,        
        }
    },
    {
        path: '**',
        redirectTo: '',
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
}),
        BlogModule,
        BookerModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
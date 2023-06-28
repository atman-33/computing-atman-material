import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { FooterModule } from './common/footer/footer.module';
import { NavbarModule } from './common/navbar/navbar.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    ApolloModule,
    HomeModule,
    NavbarModule,
    FooterModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httplink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httplink.create({
            uri: 'api/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { CorpsComponent } from './body/corps/corps.component';
import { ProfileComponent } from './header/profile/profile.component';
import { AuthComponent } from './component/auth/auth.component';
import { AuthService } from './utils/auth.service';
import { AuthGuard } from './utils/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HeaderComponent,
    CorpsComponent,
    ProfileComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

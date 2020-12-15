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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { EnterComponent } from './body/enter/enter.component';
import { QrcodeCreationComponent } from './component/qrcode-creation/qrcode-creation.component';
@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HeaderComponent,
    CorpsComponent,
    ProfileComponent,
    AuthComponent,
    EnterComponent,
    QrcodeCreationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatInputModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

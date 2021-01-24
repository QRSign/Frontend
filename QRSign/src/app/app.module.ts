import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { CorpsComponent } from './body/corps/corps.component';
import { ProfileComponent } from './header/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EnterComponent } from './component/enter/enter.component';
import { QrcodeCreationComponent } from './component/qrcode-creation/qrcode-creation.component';
import { UserComponent } from './auth/user/user.component';
import { SignInComponent } from './auth/user/sign-in/sign-in.component';
import { SignUpComponent } from './auth/user/sign-up/sign-up.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HeaderComponent,
    CorpsComponent,
    ProfileComponent,
    EnterComponent,
    QrcodeCreationComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

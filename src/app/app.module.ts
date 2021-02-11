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
import { EnterComponent } from './component/enter/enter.component';
import { QrcodeCreationComponent } from './component/qrcode-creation/qrcode-creation.component';
import { UserComponent } from './auth/user/user.component';
import { SignInComponent } from './auth/user/sign-in/sign-in.component';
import { SignUpComponent } from './auth/user/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PasswordValidatorComponent } from './component/password-validator/password-validator.component';
import { TitleComponent } from './component/title/title.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
// import {MAT_DATE_LOCALE} from '@angular/material';

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
    PasswordValidatorComponent,
    TitleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    NgxMaterialTimepickerModule.setLocale('fr'),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

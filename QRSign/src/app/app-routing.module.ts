import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './auth/user/user.component';
import { CorpsComponent } from './body/corps/corps.component';
import { EnterComponent } from './component/enter/enter.component';

const routes: Routes = [
  { path: 'auth', component: UserComponent },
  {
    path: '',
    component: CorpsComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'enter',
        component: EnterComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

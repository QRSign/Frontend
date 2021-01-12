import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorpsComponent } from './body/corps/corps.component';
import { EnterComponent } from './component/enter/enter.component';
import { AuthComponent } from './component/auth/auth.component';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: '',
    component: CorpsComponent,
    canActivate: [AuthGuard],
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

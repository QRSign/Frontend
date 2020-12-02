import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorpsComponent } from './body/corps/corps.component';
import { EnterComponent } from './body/enter/enter.component';
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
        path: 'test',
        component: EnterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

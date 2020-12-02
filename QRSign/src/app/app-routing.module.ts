import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorpsComponent } from './body/corps/corps.component';
import { AuthComponent } from './component/auth/auth.component';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', canActivate: [AuthGuard], component: CorpsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

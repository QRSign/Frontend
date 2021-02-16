import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './auth/user/user.component';
import { CorpsComponent } from './body/corps/corps.component';
import { EnterComponent } from './component/enter/enter.component';
import { QrcodeCreationComponent } from './component/qrcode-creation/qrcode-creation.component';
import { HistoryComponent } from './component/history/history.component';
import { AuthGuard } from './utils/guard/auth.guard';
import { ShowQrcodeComponent } from './component/show-qrcode/show-qrcode.component';
import { QrcodeComponentComponent } from './component/qrcode-component/qrcode-component.component';
import { NotFoundComponent } from './component/not-found/not-found.component';

const routes: Routes = [
  { path: 'auth', component: UserComponent },
  {
    path: 'enter/:token',
    component: EnterComponent,
  },
  {
    path: '',
    component: CorpsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: QrcodeCreationComponent,
      },
      {
        path: 'qrcode',
        component: QrcodeComponentComponent,
        children: [
          {
            path: ':token',
            component: ShowQrcodeComponent,
          },
        ],
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
    ],
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

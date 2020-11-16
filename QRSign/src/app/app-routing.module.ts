import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorpsComponent } from './body/corps/corps.component';

const routes: Routes = [
  { path: "", component: CorpsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

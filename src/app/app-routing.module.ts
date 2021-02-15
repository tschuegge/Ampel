import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmpelEinfachComponent } from './ampel-einfach/ampel-einfach.component';
import { AmpelKomplettComponent } from './ampel-komplett/ampel-komplett.component';
import { LampeEinfachComponent } from './lampe-einfach/lampe-einfach.component';
import { LampeKomplettComponent } from './lampe-komplett/lampe-komplett.component';

const routes: Routes = [
  { path: 'lampe-einfach', component: LampeEinfachComponent },
  { path: 'lampe-komplett', component: LampeKomplettComponent },
  { path: 'ampel-einfach', component: AmpelEinfachComponent },
  { path: 'ampel-komplett', component: AmpelKomplettComponent },
  { path: '', pathMatch: 'full', redirectTo: 'lampe-einfach' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { MapComponent } from './map.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [Shell.childRoutes([{ path: 'map', component: MapComponent, data: { title: extract('Map') } }])];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MapRoutingModule {}

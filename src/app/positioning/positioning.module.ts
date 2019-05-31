import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PositioningRoutingModule } from './positioning-routing.module';
import { PositioningComponent } from './positioning.component';

@NgModule({
  imports: [CommonModule, TranslateModule, PositioningRoutingModule],
  declarations: [PositioningComponent]
})
export class PositioningModule {}

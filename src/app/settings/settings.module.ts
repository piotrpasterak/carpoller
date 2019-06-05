import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [CommonModule, TranslateModule, SettingsRoutingModule],
  declarations: [SettingsComponent]
})
export class SettingsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';

@NgModule({
  imports: [CommonModule, TranslateModule, ReportRoutingModule],
  declarations: [ReportComponent]
})
export class ReportModule {}

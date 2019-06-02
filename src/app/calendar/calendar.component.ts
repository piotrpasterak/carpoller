import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  holidaysdata: string;
  holidaysList: string[];
  loading: boolean;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  makeRequest(): void {
    this.loading = true;
    this.http
      .get(
        'https://calendarific.com/api/v2/holidays?&api_key=038a4d5f3c1553c33f1d637289f1b518cd92a5aef5f6cca1febd7a889c11a8f3&country=PL&year=2019&type=national',
        { responseType: 'json' }
      )
      .subscribe(response => {
        this.holidaysdata = JSON.stringify(response);
        const ress = JSON.parse(this.holidaysdata).response;
        console.log('data :' + JSON.stringify(ress));
        const holyarry = JSON.parse(JSON.stringify(ress)).holidays;
        this.holidaysList = holyarry as string[];
        console.log('data2 :' + this.holidaysList[1]);
        this.loading = false;
      });
  }
}

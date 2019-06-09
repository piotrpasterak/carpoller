import { Component, OnInit } from '@angular/core';
import { UsersTravelsRepository } from '@app/core/usersTravelsRepository';
import { Member } from '@app/core/models/Member';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  members: Member[];
  constructor(private usersTravelsRepository: UsersTravelsRepository) {}

  ngOnInit() {
    this.usersTravelsRepository.getMembers().subscribe(m => (this.members = m));
  }
}

import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { UsersService } from './users.service';
import { Member } from '../core/domain/Member';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  members: Member[];

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.getMembers().subscribe(data => {
      this.members = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Member;
      });
    });
  }
}

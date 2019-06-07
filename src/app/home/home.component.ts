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

      var dd = this.members[0].CalculateTravelingScore();
      // let func = (a: Member , b:Member) => {return a. CalculateTravelingScore() - b.CalculateTravelingScore() ;}

      // var potentialDriverId =
      //   this.members.sort(func)[0].GetId();

      // this.members.forEach(m => {
      //   m.isNominated = (m.GetId() == potentialDriverId) ? true : false;
      // })
    });
  }
}

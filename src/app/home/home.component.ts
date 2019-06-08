import { Component, OnInit } from '@angular/core';

import { Member, TravelParticipant } from '@app/core/models/Member';
import { UsersTravelsRepository } from '@app/home/usersTravelsRepository';
import { ParticipantRole, Travel } from '@app/core/models/Travel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  members: Member[];
  travel: Travel;

  constructor(private travelsRepository: UsersTravelsRepository) {}

  ngOnInit() {
    this.travelsRepository.getMembers().subscribe(data => {
      this.members = data.map(e => {
        return new Member(
          e.payload.doc.id,
          e.payload.doc.get('email'),
          e.payload.doc.get('nickname'),
          e.payload.doc.get('score') as number,
          ParticipantRole.Unknown,
          false,
          this.travelsRepository
        );
      });

      var potentialDriverId = this.members.sort(m => m.score)[0].id;

      this.members.forEach(m => {
        m.SetIsNominated(m.id == potentialDriverId ? true : false);
      });
    });
  }

  setRoleOnMember(member: Member, role: number) {
    member.SetRole(role);
  }
}

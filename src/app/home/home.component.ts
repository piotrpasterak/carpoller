import { Component, OnInit } from '@angular/core';

import { ParticipantRole, Travel, TravelParticipant } from '@app/core/models/Travel';
import { UsersTravelsRepository } from '@app/core/usersTravelsRepository';
import { Member } from '@app/core/models/Member';
import { CredentialsService } from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  members: Member[];
  travelFree: Travel;
  loggedMember: Member;

  constructor(private usersTravelsRepository: UsersTravelsRepository, private credsService: CredentialsService) {
    this.usersTravelsRepository.getMember(credsService.credentials.username);
  }

  ngOnInit() {
    this.usersTravelsRepository.getMembers().subscribe(m => (this.members = m));

    this.usersTravelsRepository.getFreeTravel().subscribe(t => {
      this.travelFree = t;
      this.nominateDriver();
    });
  }

  nominateDriver() {
    if (
      this.travelFree.participants &&
      !(this.travelFree.participants.filter(p => p.role == ParticipantRole.Driver).length > 0)
    ) {
      var potentialDriverId = this.members
        .filter(d => !d.DidSkipnomination())
        .sort(m => m.GetScore())
        .reverse()
        .map(m => m.id)[0];

      this.members.forEach(m => {
        m.SetIsNominated(m.id == potentialDriverId);
        this.usersTravelsRepository.updateMember(m);
      });
    }
  }

  setRoleOnMember(role: number) {
    this.loggedMember.SetRole(role);
    this.travelFree.participants.filter(p => p.member_id == this.loggedMember.id)[0].role = role;
  }

  setParticipation(member: Member, role: number) {
    this.travelFree.AddParticipant(new TravelParticipant(member.id, role));
    this.usersTravelsRepository.updateTravel(this.travelFree);
  }

  beginTravel() {
    this.travelFree.BeginTravel();
    this.usersTravelsRepository.updateTravel(this.travelFree);
  }

  private CreateNewFreeTravel() {
    this.usersTravelsRepository.addTravel(new Travel(Guid.newGuid().toString(), false, false, null, null, []));
  }

  finishTravel() {
    this.travelFree.MarkAsFinished();
    this.usersTravelsRepository.updateTravel(this.travelFree);
    this.CreateNewFreeTravel();
  }
}

class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

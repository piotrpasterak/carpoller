import { Injectable } from '@angular/core';
import { ITravelParticipant, ParticipantRole, Travel } from './Travel';
import { UsersTravelsRepository } from '@app/home/usersTravelsRepository';

export class TravelParticipant implements ITravelParticipant {
  public member_id: string;
  public role: ParticipantRole;
}

export class Member {
  constructor(
    public id: string,
    public email: string,
    public nickname: string,
    public score: number,
    private role: ParticipantRole,
    private isNominated: boolean,
    private travelsRepository: UsersTravelsRepository
  ) {
    this.travelsRepository.getTravels().subscribe(data => {
      var memberTravels = data.map(e => {
        return new Travel(
          e.payload.doc.id,
          e.payload.doc.get('isLocked') as boolean,
          e.payload.doc.get('startTimeStamp'),
          e.payload.doc.get('arrivalTimeStamp'),
          e.payload.doc.get('participants') as TravelParticipant[]
        );
      });

      this.score = this.CalculateTravelingScore(memberTravels);
    });
  }

  public GetIsNominated() {
    return this.isNominated;
  }

  public SetIsNominated(state: boolean) {
    this.isNominated = state;
  }

  public GetRole(): ParticipantRole {
    return this.role;
  }

  public SetRole(role: ParticipantRole) {
    this.role = role;
  }

  private CalculateTravelingScore(travels: Travel[]): number {
    var result = 0;
    var modifier = 1.05;
    var capacities: number[] = [5, 4, 3, 2];

    capacities.forEach(capacity => {
      result +=
        (this.TravelsWithRoleInCapOf(travels, ParticipantRole.Driver, capacity) +
          this.TravelsWithRoleInCapOf(travels, ParticipantRole.Passenger, capacity) / capacity) *
        modifier;
      modifier -= 0.05;
    });

    return result;
  }

  private TravelsWithRoleInCapOf(travels: Travel[], role: ParticipantRole, carCapacity: number): number {
    return travels.filter(
      t => t.participants.length == carCapacity && t.participants.filter(p => p.member_id == this.id && p.role == role)
    ).length;
  }
}

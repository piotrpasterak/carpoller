import { Injectable } from '@angular/core';
import { ParticipantRole, Travel } from './Travel';
import { UsersTravelsRepository } from '@app/core/usersTravelsRepository';

@Injectable()
export class Member {
  private finishedTravels: Travel[];
  private role: ParticipantRole;
  private skippedNomination: boolean;

  constructor(
    public id: string,
    public email: string,
    public nickname: string,
    public isNominated: boolean,
    public score: number,
    private usersTravelsRepository: UsersTravelsRepository
  ) {
    this.usersTravelsRepository.getTravels().subscribe(t => (this.finishedTravels = t));
  }

  GetId(): string {
    return this.id;
  }

  GetEmail(): string {
    return this.email;
  }

  GetNickname(): string {
    return this.nickname;
  }

  GetIsNominated(): boolean {
    return this.isNominated;
  }

  SetIsNominated(state: boolean) {
    this.isNominated = state;
  }

  GetScore(): number {
    return this.score;
  }

  GetRole(): ParticipantRole {
    return this.role;
  }

  SetRole(role: ParticipantRole) {
    this.role = role;
  }

  SkipNomination() {
    this.skippedNomination = true;
  }

  DidSkipnomination() {
    return this.skippedNomination;
  }

  FinishTrip() {
    this.score = this.CalculateTravelingScore(this.finishedTravels);
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

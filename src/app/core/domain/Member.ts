import { Injectable } from '@angular/core';
import { ParticipantRole, Travel } from './Travel';

export interface IMember {
  GetId(): string;
  GetEmail(): string;
  GetNickname(): string;
  GetTravelPending(): Travel;
  GetTravelsHistory(): Travel[];
}

@Injectable()
export class Member implements IMember {
  public id: string;
  public email: string;
  public nickname: string;
  public isNominated: boolean;
  public travel_pending: Travel;
  public travelsHistory: Travel[];

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

  GetTravelPending(): Travel {
    return this.travel_pending;
  }

  GetTravelsHistory(): Travel[] {
    return this.travelsHistory;
  }

  public CalculateTravelingScore(): number {
    var result = 0;
    var modifier = 1.05;
    var capacities: number[] = [5, 4, 3, 2];

    capacities.forEach(capacity => {
      result +=
        (this.TravelsWithRoleInCapOf(ParticipantRole.Driver, capacity) +
          this.TravelsWithRoleInCapOf(ParticipantRole.Passenger, capacity) / capacity) *
        modifier;
      modifier -= 0.05;
    });

    return result;
  }

  private TravelsWithRoleInCapOf(role: ParticipantRole, carCapacity: number): number {
    return this.travelsHistory.filter(
      t =>
        t._participants.length == carCapacity &&
        t._participants.filter(p => p.Member.GetId() == this.id && p.Role == role)
    ).length;
  }
}

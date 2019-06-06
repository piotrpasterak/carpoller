import { Injectable } from '@angular/core';
import { ITravel, ParticipantRole, Travel } from './Travel';

export interface IMember {
  GetId(): number;
  GetEmail(): string;
  GetNickname(): string;
  GetTravelPending(): Travel;
  GetTravelsHistory(): Travel[];
  GetCars(): string[];
}

@Injectable()
export class Member implements IMember {
  constructor(
    private _memberId: number,
    private _email: string,
    private _nickname: string,
    private _travelPending: Travel,
    private _travelsHistory: Travel[],
    private _cars: string[]
  ) {}

  GetId(): number {
    return this._memberId;
  }

  GetCars(): string[] {
    return this._cars;
  }

  GetEmail(): string {
    return this._email;
  }

  GetNickname(): string {
    return this._nickname;
  }

  GetTravelPending(): Travel {
    return this._travelPending;
  }

  GetTravelsHistory(): Travel[] {
    return this._travelsHistory;
  }

  CalculateTravelingScore(): number {
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
    return this._travelsHistory.filter(
      t =>
        t._participants.length == carCapacity &&
        t._participants.filter(p => p.Member.GetId() == this._memberId && p.Role == role)
    ).length;
  }
}

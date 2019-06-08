import { Injectable } from '@angular/core';
import { Timestamp } from 'rxjs';
import DateTimeFormat = Intl.DateTimeFormat;
import { Member } from './Member';

export interface ITravelDriver {
  BeginTravel(): void;
  MarkAsFinished(): void;
}

export interface ITravelParticipant {
  member_id: string;
  role: ParticipantRole;
}

export enum ParticipantRole {
  Unknown,
  Passenger,
  Driver
}

export class Travel {
  constructor(
    public id: string,
    public isFinished: boolean,
    public startTimeStamp: Date,
    public arrivalTimeStamp: Date,
    public participants: ITravelParticipant[]
  ) {}
}

@Injectable()
export class TravelService {
  constructor() {}

  AddParticipant(travel: Travel, participant: ITravelParticipant): void {
    // to powinno byc ze specyfikacji samochodu sciagane
    const MaxParticipantsInCar = 5;
    // check na dodanie ponowne kierowcy
    if (travel.participants.length < MaxParticipantsInCar) {
      travel.participants.push(participant);
    } else {
      throw new Error('Seats are full.');
    }
  }

  BeginTravel(travel: Travel): void {
    if (travel.isFinished == false && travel.startTimeStamp != null) {
      travel.startTimeStamp = new Date();
    } else {
      throw new Error('The travel has already started.');
    }
  }

  MarkAsFinished(travel: Travel): void {
    if (travel.isFinished == false && travel.arrivalTimeStamp != null) {
      travel.arrivalTimeStamp = new Date();
    } else {
      throw new Error('The travel has been already finished.');
    }
  }
}

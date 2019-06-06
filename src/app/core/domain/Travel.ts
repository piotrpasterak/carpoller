import { Injectable } from '@angular/core';
import { Timestamp } from 'rxjs';
import { IMember } from '@app/core/domain/Member';
import DateTimeFormat = Intl.DateTimeFormat;

export interface ITravelDriver {
  BeginTravel(): void;
  MarkAsFinished(): void;
}

export interface ITravel {
  AddParticipant(participant: ITravelParticipant): void;
}

export interface ITravelParticipant {
  Member: IMember;
  Role: ParticipantRole;
}

export enum ParticipantRole {
  Passenger,
  Driver
}

@Injectable()
export class Travel implements ITravel, ITravelDriver {
  public _id: number;
  public _isFinished: boolean;
  public _startTimeStamp: Date;
  public _arrivalTimeStamp: Date;
  public _distance: number;
  public _participants: ITravelParticipant[];

  AddParticipant(participant: ITravelParticipant): void {
    // to powinno byc ze specyfikacji samochodu sciagane
    const MaxParticipantsInCar = 5;
    // check na dodanie ponowne kierowcy
    if (this._participants.length < MaxParticipantsInCar) {
      this._participants.push(participant);
    } else {
      throw new Error('Seats are full.');
    }
  }

  BeginTravel(): void {
    if (this._isFinished == false && this._startTimeStamp != null) {
      this._startTimeStamp = new Date();
    } else {
      throw new Error('The travel has already started.');
    }
  }

  MarkAsFinished(): void {
    if (this._isFinished == false && this._arrivalTimeStamp != null) {
      this._arrivalTimeStamp = new Date();
    } else {
      throw new Error('The travel has been already finished.');
    }
  }
}

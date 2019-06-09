export interface ITravelDriver {
  BeginTravel(): void;
  MarkAsFinished(): void;
}

export class TravelParticipant {
  constructor(public member_id: string, public role: ParticipantRole) {}
}

export enum ParticipantRole {
  Unknown,
  Passenger,
  Driver
}

export class Travel {
  constructor(
    public id: string,
    public isGoingOn: boolean,
    public isFinished: boolean,
    public startTimeStamp: Date,
    public arrivalTimeStamp: Date,
    public participants: TravelParticipant[]
  ) {}

  AddParticipant(participant: TravelParticipant): void {
    // to powinno byc ze specyfikacji samochodu sciagane
    const MaxParticipantsInCar = 5;
    // check na dodanie ponowne kierowcy
    if (this.participants.length < MaxParticipantsInCar && !this.isFinished) {
      this.participants.push(participant);
    } else {
      throw new Error('Seats are full.');
    }
  }

  BeginTravel(): void {
    if (!this.isFinished && this.startTimeStamp != null) {
      this.startTimeStamp = new Date();
      this.isGoingOn = true;
    } else {
      throw new Error('The travel has already started.');
    }
  }

  MarkAsFinished(): void {
    if (!this.isFinished && this.arrivalTimeStamp != null) {
      this.arrivalTimeStamp = new Date();
      this.isFinished = true;
      this.isGoingOn = false;
    } else {
      throw new Error('The travel has been already finished.');
    }
  }
}

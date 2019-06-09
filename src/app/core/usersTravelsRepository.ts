import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Member } from '@app/core/models/Member';
import { Travel, TravelParticipant } from '@app/core/models/Travel';

@Injectable({
  providedIn: 'root'
})
export class UsersTravelsRepository {
  constructor(private firestore: AngularFirestore) {}

  getMembers() {
    return this.firestore
      .collection('Members')
      .snapshotChanges()
      .pipe(
        map(e =>
          e.map(t => {
            return new Member(
              t.payload.doc.id,
              t.payload.doc.get('email'),
              t.payload.doc.get('nickname'),
              t.payload.doc.get('isNominated'),
              t.payload.doc.get('score'),
              this
            );
          })
        )
      );
  }

  getMember(memberUserName: string) {
    return this.getMembers().pipe(map(m => m.filter(mb => mb.nickname == memberUserName)[0]));
  }

  updateMember(member: Member) {
    this.firestore.doc('Members/' + member.id).update({
      email: member.email,
      nickname: member.nickname,
      isNominated: member.isNominated,
      score: member.score
    });
  }

  getTravels() {
    return this.firestore
      .collection('Travels')
      .snapshotChanges()
      .pipe(
        map(e =>
          e.map(t => {
            return new Travel(
              t.payload.doc.id,
              t.payload.doc.get('isFinished') as boolean,
              t.payload.doc.get('isGoingOn'),
              t.payload.doc.get('startTimeStamp'),
              t.payload.doc.get('arrivalTimeStamp'),
              t.payload.doc.get('participants') as TravelParticipant[]
            );
          })
        )
      );
  }

  getTravel(id: string) {
    return this.getTravels().pipe(map(t => t.filter(e => e.id == id)));
  }

  getFinishedTravels() {
    this.getTravels().pipe(map(t => t.filter(e => e.isFinished)));
  }

  getFreeTravel() {
    return this.getTravels().pipe(map(t => t.filter(e => !e.isFinished && !e.isGoingOn)[0] as Travel));
  }

  addTravel(travel: Travel) {
    return this.firestore.collection('Travels').add(travel);
  }

  updateTravel(travel: Travel) {
    this.firestore.doc('Travels' + travel.id).update({
      isFinished: travel.isFinished,
      isGoingOn: travel.isGoingOn,
      startTimeStamp: travel.startTimeStamp,
      arrivalTimeStamp: travel.arrivalTimeStamp,
      participants: travel.participants
    });
  }
}

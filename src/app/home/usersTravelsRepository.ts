import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Travel } from '@app/core/models/Travel';
import { Member } from '@app/core/models/Member';

@Injectable({
  providedIn: 'root'
})
export class UsersTravelsRepository {
  private LoggedMember: Member;

  constructor(private firestore: AngularFirestore) {}

  getMembers() {
    return this.firestore.collection('Members').snapshotChanges();
  }

  updateMember(member: Member) {
    //delete member.GetId();
    this.firestore.doc('Members/' + member.id).update(member);
  }

  getTravels() {
    return this.firestore.collection('Travels').snapshotChanges();
  }

  addTravel(travel: Travel) {
    return this.firestore.collection('Travels').add(travel);
  }

  updateTravel(travel: Travel) {
    this.firestore.doc('Travels' + travel.id).update(travel);
  }
}

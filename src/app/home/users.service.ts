import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Member } from '@app/core/domain/Member';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private LoggedMember: Member;

  constructor(private firestore: AngularFirestore) {}

  getMembers() {
    return this.firestore.collection('Members').snapshotChanges();
  }

  updateMember(member: Member) {
    //delete member.GetId();
    this.firestore.doc('Members/' + member.GetId()).update(member);
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Member } from '@app/core/domain/Member';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private LoggedMember: Member;

  constructor(private firestore: AngularFirestore) {
    // fetch current member from store by id
  }
}

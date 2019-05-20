import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { AngularFireModule } from '@angular/fire';
import { Router } from '@angular/router';
import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

export interface RegisterContext {
  email: string;
  password: string;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  constructor(
    private credentialsService: CredentialsService,
    private fireAuth: AngularFireAuth,
    public router: Router
  ) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  async login(context: LoginContext) {
    if (this.credentialsService.isAuthenticated()) {
      return;
    }

    await this.fireAuth.auth.signInWithEmailAndPassword(context.username, context.password).then(x => {
      const data = {
        username: context.username,
        token: '123456'
      };
      this.credentialsService.setCredentials(data, context.remember);
    });
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

  async register(context: RegisterContext) {
    return await this.fireAuth.auth
      .createUserWithEmailAndPassword(context.email, context.password)
      .then(() => {
        this.login({ username: context.email, password: context.password }).then(() => {
          window.alert('You have been successfully registered.');
        });
      })
      .catch(error => window.alert(error.message));
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, untilDestroyed, CredentialsService } from '@app/core';
import { map } from 'rxjs/operators';

const log = new Logger('Login');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  version: string = environment.version;
  error: string | undefined;
  registerForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {
    if (this.credentialsService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {}

  register() {
    this.isLoading = true;
    const login$ = this.authenticationService.register(this.registerForm.value);
    login$
      .then(() => {
        this.registerForm.markAsPristine();
        this.isLoading = false;
        untilDestroyed(this);
        this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
      })
      .catch(err => {
        this.isLoading = false;
        this.error = err;
        console.log(err.message);
      });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false
})
/**
 * RegisterComponent
 * Displays registration form and handles user sign up via API.
 */
export class RegisterComponent {
  errorMsg: string | null = null;
  successMsg: string | null = null;
  loading = false;
  registerForm: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // Access all DI services so linter will not warn for unused.
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    void this.auth;
    void this.router;
  }

  // PUBLIC_INTERFACE
  /**
   * Handles registration form submission.
   */
  /* eslint-disable no-undef */
  onSubmit() {
    this.errorMsg = null;
    if (this.registerForm.invalid) {
      this.errorMsg = 'All fields are required and must be valid.';
      return;
    }
    this.loading = true;
    const username = this.registerForm.value.username;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    this.auth.register(username, email, password).subscribe({
      next: () => {
        this.successMsg = 'Registration successful! Please log in.';
        // setTimeout is valid in browser context; inform linter to ignore
        window.setTimeout(() => this.router.navigate(['../login']), 1200);
      },
      error: (err) => {
        this.errorMsg = err?.detail || (err?.msg ?? 'Registration failed');
        this.loading = false;
      }
    });
  }
  /* eslint-enable no-undef */
}

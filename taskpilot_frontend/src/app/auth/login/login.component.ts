import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
/**
 * LoginComponent
 * Displays login form and handles user authentication.
 */
export class LoginComponent {
  errorMsg: string | null = null;
  loading = false;
  loginForm: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // Access all DI services so linter will not warn for unused.
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    void this.auth;
    void this.router;
  }

  // PUBLIC_INTERFACE
  /**
   * Handles login form submission.
   */
  /* eslint-disable no-undef */
  onSubmit() {
    this.errorMsg = null;
    if (this.loginForm.invalid) {
      this.errorMsg = 'All fields are required.';
      return;
    }
    this.loading = true;
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.auth.login(username, password).subscribe({
      next: (result) => {
        // Storing the JWT token in browser localStorage.
        window.localStorage.setItem('access_token', result.access_token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMsg = typeof err === 'string' ? err : (err.detail || 'Invalid credentials');
        this.loading = false;
      }
    });
  }
  /* eslint-enable no-undef */
}

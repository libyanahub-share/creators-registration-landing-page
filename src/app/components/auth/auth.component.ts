import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  code: string = '';
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Handle code input - auto-uppercase and filter invalid characters
   */
  onCodeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.toUpperCase();

    // Only allow alphanumeric characters
    value = value.replace(/[^A-Z0-9]/g, '');

    this.code = value;
    input.value = value;

    // Clear error message when user starts typing again
    if (this.errorMessage) {
      this.errorMessage = '';
    }
  }

  /**
   * Validate the code
   */
  validateCode(): void {
    if (!this.code || this.code.trim() === '') {
      this.errorMessage = 'الرجاء إدخال كود الدخول';
      return;
    }

    // Validate format (4 alphanumeric characters)
    if (this.code.length !== 4 || !/^[A-Z0-9]{4}$/.test(this.code)) {
      this.errorMessage = 'الكود يجب أن يكون 4 أحرف أو أرقام';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const code = this.code.trim();

    this.authService.validateCode(code).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.token) {
          // Store token
          this.authService.setAuthToken(response.token, response.expiresAt);

          // Redirect to intended page or landing
          const redirectUrl = sessionStorage.getItem('redirectUrl') || '/';
          sessionStorage.removeItem('redirectUrl');
          this.router.navigate([redirectUrl]);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'حدث خطأ، الرجاء المحاولة مرة أخرى';
        // Clear the code inputs
        this.clearCode();
      }
    });
  }

  /**
   * Clear code input
   */
  clearCode(): void {
    this.code = '';
    // Focus input
    const input = document.getElementById('code-input') as HTMLInputElement;
    if (input) {
      input.focus();
    }
  }
}
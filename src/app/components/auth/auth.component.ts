import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  codeDigits: string[] = ['', '', '', ''];
  isLoading = false;
  errorMessage = '';
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Handle keydown events (all input handling)
   */
  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    // Handle backspace - clear current and move to previous
    if (event.key === 'Backspace') {
      event.preventDefault();
      
      // Always clear current input first
      input.value = '';
      this.codeDigits[index] = '';
      this.errorMessage = '';
      this.codeDigits = [...this.codeDigits];
      
      // Then move to previous input
      if (index > 0) {
        setTimeout(() => {
          const prevInput = document.getElementById(`digit-${index - 1}`) as HTMLInputElement;
          if (prevInput) {
            prevInput.focus();
            // Select the text so next backspace will clear it
            prevInput.select();
          }
        }, 0);
      }
      return;
    }

    // Handle Delete key
    if (event.key === 'Delete') {
      event.preventDefault();
      input.value = '';
      this.codeDigits[index] = '';
      this.errorMessage = '';
      this.codeDigits = [...this.codeDigits];
      return;
    }

    // Handle arrow keys
    if (event.key === 'ArrowRight' && index > 0) {
      event.preventDefault();
      const prevInput = document.getElementById(`digit-${index - 1}`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
      return;
    }

    if (event.key === 'ArrowLeft' && index < 3) {
      event.preventDefault();
      const nextInput = document.getElementById(`digit-${index + 1}`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
      return;
    }

    // Prevent non-digit characters (but allow Tab for navigation)
    if (!/^\d$/.test(event.key) && 
        !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) {
      event.preventDefault();
      return;
    }

    // Handle digit input
    if (/^\d$/.test(event.key)) {
      event.preventDefault();
      
      // Set the value in current input
      input.value = event.key;
      this.codeDigits[index] = event.key;
      this.errorMessage = '';
      
      // Force change detection
      this.codeDigits = [...this.codeDigits];
      
      // Move to next input if not the last one
      if (index < 3) {
        setTimeout(() => {
          const nextInput = document.getElementById(`digit-${index + 1}`) as HTMLInputElement;
          if (nextInput) {
            // Clear next input before focusing (fix placeholder issue)
            nextInput.value = '';
            nextInput.focus();
          }
        }, 0);
      }
      
      // Check if complete and auto-submit
      setTimeout(() => {
        if (this.isCodeComplete()) {
          this.validateCode();
        }
      }, 50);
    }
  }

  /**
   * Handle paste event
   */
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text');
    
    if (pastedData && /^\d{4}$/.test(pastedData)) {
      // Valid 4-digit code pasted
      for (let i = 0; i < 4; i++) {
        this.codeDigits[i] = pastedData[i];
        const input = document.getElementById(`digit-${i}`) as HTMLInputElement;
        if (input) {
          input.value = pastedData[i];
        }
      }
      // Auto-submit
      this.validateCode();
    }
  }

  /**
   * Check if all 4 digits are entered
   */
  isCodeComplete(): boolean {
    return this.codeDigits.every(digit => digit.length === 1);
  }

  /**
   * Get the complete code
   */
  getCode(): string {
    return this.codeDigits.join('');
  }

  /**
   * Validate the code
   */
  validateCode(): void {
    if (!this.isCodeComplete()) {
      this.errorMessage = 'الرجاء إدخال الكود المكون من 4 أرقام';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const code = this.getCode();

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
   * Clear all code inputs
   */
  clearCode(): void {
    this.codeDigits = ['', '', '', ''];
    for (let i = 0; i < 4; i++) {
      const input = document.getElementById(`digit-${i}`) as HTMLInputElement;
      if (input) {
        input.value = '';
      }
    }
    // Focus first input
    const firstInput = document.getElementById('digit-0') as HTMLInputElement;
    if (firstInput) {
      firstInput.focus();
    }
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';

export interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
  expiresAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_TOKEN_KEY = 'libyana_hub_auth_token';
  private readonly TOKEN_EXPIRY_KEY = 'libyana_hub_token_expiry';
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Validate access code with backend API
   * API endpoint: POST /api/verify-code
   */
  validateCode(code: string): Observable<AuthResponse> {
    const url = `${this.apiUrl}${environment.apiEndpoints.verifyCode}`;

    return this.http.post<AuthResponse>(url, { code }).pipe(
      map(response => {
        // Backend returns token with 2-hour expiry
        // Calculate expiry time
        if (response.success && response.token) {
          const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
          return {
            ...response,
            expiresAt
          };
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Store authentication token in session storage
   */
  setAuthToken(token: string, expiresAt?: string): void {
    sessionStorage.setItem(this.AUTH_TOKEN_KEY, token);
    if (expiresAt) {
      sessionStorage.setItem(this.TOKEN_EXPIRY_KEY, expiresAt);
    }
  }

  /**
   * Get current auth token
   */
  getAuthToken(): string | null {
    return sessionStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    if (!token) {
      return false;
    }

    // Check token expiry if exists
    const expiryStr = sessionStorage.getItem(this.TOKEN_EXPIRY_KEY);
    if (expiryStr) {
      const expiry = new Date(expiryStr);
      const now = new Date();
      if (now > expiry) {
        this.clearAuth();
        return false;
      }
    }

    return true;
  }

  /**
   * Clear authentication data
   */
  clearAuth(): void {
    sessionStorage.removeItem(this.AUTH_TOKEN_KEY);
    sessionStorage.removeItem(this.TOKEN_EXPIRY_KEY);
  }

  /**
   * Logout user
   */
  logout(): void {
    this.clearAuth();
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'حدث خطأ، الرجاء المحاولة مرة أخرى';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = 'خطأ في الاتصال بالشبكة';
    } else {
      // Backend error
      if (error.status === 404) {
        errorMessage = 'الكود غير صحيح أو تم استخدامه بالفعل';
      } else if (error.status === 422) {
        errorMessage = 'الرجاء إدخال كود صحيح مكون من 4 أرقام';
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }
    }

    return throwError(() => ({
      success: false,
      message: errorMessage
    }));
  }
}
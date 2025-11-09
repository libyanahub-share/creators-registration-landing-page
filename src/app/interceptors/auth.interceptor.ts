import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * HTTP Interceptor to automatically attach Bearer token to API requests
 * This interceptor runs for all HTTP requests and adds the Authorization header
 * when a valid token exists in session storage.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAuthToken();

  // If token exists, clone the request and add Authorization header
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  // If no token, proceed with original request
  return next(req);
};

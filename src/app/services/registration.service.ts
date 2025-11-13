import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { mapRegistrationData, FrontendRegistrationData } from '../utils/field-mapper';

export interface RegistrationResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    full_name: string;
    email: string;
    status: string;
  };
  errors?: { [key: string]: string[] };
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Submit registration to backend API
   * API endpoint: POST /api/register (requires Bearer token)
   */
  submitRegistration(formData: FrontendRegistrationData): Observable<RegistrationResponse> {
    const url = `${this.apiUrl}${environment.apiEndpoints.register}`;

    // Transform frontend data to backend format
    const backendData = mapRegistrationData(formData);

    // Check if video file exists
    if (backendData.video) {
      // If video exists, use FormData for multipart/form-data
      return this.submitWithVideo(url, backendData);
    } else {
      // If no video, send as JSON
      return this.submitWithoutVideo(url, backendData);
    }
  }

  /**
   * Submit registration with video file (multipart/form-data)
   */
  private submitWithVideo(url: string, data: any): Observable<RegistrationResponse> {
    const formData = new FormData();

    // Append required fields
    formData.append('full_name', data.full_name);
    formData.append('preferred_communication_channel', data.preferred_communication_channel);
    formData.append('bio', data.bio);

    // Append communication channel fields conditionally
    if (data.email) {
      formData.append('email', data.email);
    }
    if (data.phone_number) {
      formData.append('phone_number', data.phone_number);
    }
    if (data.whatsapp_number) {
      formData.append('whatsapp_number', data.whatsapp_number);
    }

    // Append arrays as JSON strings or individual items
    data.expertise.forEach((exp: string, index: number) => {
      formData.append(`expertise[${index}]`, exp);
    });

    data.teaching_methods.forEach((method: string, index: number) => {
      formData.append(`teaching_methods[${index}]`, method);
    });

    // Append video file
    if (data.video) {
      formData.append('video', data.video);
    }

    return this.http.post<RegistrationResponse>(url, formData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Submit registration without video (JSON)
   */
  private submitWithoutVideo(url: string, data: any): Observable<RegistrationResponse> {
    // Remove video property if it exists
    const { video, ...jsonData } = data;

    return this.http.post<RegistrationResponse>(url, jsonData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'حدث خطأ أثناء إرسال البيانات، الرجاء المحاولة مرة أخرى';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = 'خطأ في الاتصال بالشبكة';
    } else {
      // Backend error
      if (error.status === 400) {
        errorMessage = 'الكود تم استخدامه بالفعل';
      } else if (error.status === 401) {
        errorMessage = 'انتهت صلاحية الجلسة، الرجاء تسجيل الدخول مرة أخرى';
      } else if (error.status === 422) {
        // Validation errors
        if (error.error?.errors) {
          const errors = error.error.errors;
          const firstError = Object.values(errors)[0] as string[];
          errorMessage = Array.isArray(firstError) ? firstError[0] : String(firstError);
        } else {
          errorMessage = 'الرجاء التأكد من صحة البيانات المدخلة';
        }
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }
    }

    return throwError(() => ({
      success: false,
      message: errorMessage,
      errors: error.error?.errors
    }));
  }
}

import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AuthComponent } from './components/auth/auth.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LandingComponent } from './components/landing-page/landing/landing.component';

export const routes: Routes = [
  // Auth page - PUBLIC (no guard)
  {
    path: 'auth',
    component: AuthComponent,
    title: 'تسجيل الدخول - ليبيانا هب'
  },

  // Default home page - PROTECTED (requires auth)
  {
    path: '',
    component: LandingComponent,
    canActivate: [authGuard],
    title: 'ليبيانا هب - منصة المبدعين'
  },

  // Landing page alias - PROTECTED
  {
    path: 'landing',
    component: LandingComponent,
    canActivate: [authGuard],
    title: 'ليبيانا هب - منصة المبدعين'
  },

  // Registration page - PROTECTED
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [authGuard],
    title: 'التسجيل كمبدع - ليبيانا هب'
  },

  // Wildcard - redirect to home
  {
    path: '**',
    redirectTo: ''
  }
];
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SaasLandingPageComponent } from './components/saas-landing/saas-landing-page/saas-landing-page.component';

export const routes: Routes = [
  // Default redirect to home (will be intercepted by guard if not authenticated)
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  // New SaaS Landing Page - PUBLIC (no auth required)
  {
    path: 'landing',
    component: SaasLandingPageComponent,
    title: 'ليبيانا هب - منصة المبدعين'
  },

  // Auth page - PUBLIC (no guard)
  {
    path: 'auth',
    component: AuthComponent,
    title: 'تسجيل الدخول - ليبيانا هب'
  },

  // Home/Landing page - PROTECTED
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    title: 'الصفحة الرئيسية - ليبيانا هب'
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
    redirectTo: '/landing'
  }
];
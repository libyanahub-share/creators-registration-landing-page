import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LandingComponent } from './components/landing-page/landing/landing.component';

export const routes: Routes = [
  // Default home page - PUBLIC (no auth required)
  {
    path: '',
    component: LandingComponent,
    title: 'ليبيانا هب - منصة المبدعين'
  },

  // Landing page alias
  {
    path: 'landing',
    component: LandingComponent,
    title: 'ليبيانا هب - منصة المبدعين'
  },

  // Old home page - PROTECTED (will be deleted later)
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    title: 'الصفحة الرئيسية - ليبيانا هب'
  },

  // Auth page - PUBLIC (no guard)
  {
    path: 'auth',
    component: AuthComponent,
    title: 'تسجيل الدخول - ليبيانا هب'
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
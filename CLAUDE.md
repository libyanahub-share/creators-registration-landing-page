# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LibyanaHub Creators Registration Landing Page - An Angular 21 bilingual (English/Arabic) landing page with creator registration functionality. Protected by 4-character access codes with JWT authentication.

## Commands

```bash
npm start              # Dev server at http://localhost:4200
npm run build          # Production build to dist/creators-registration-landing-page/browser
npm run watch          # Development build with watch mode
npm test               # Run unit tests with Karma/Jasmine
```

## Tech Stack

- **Framework:** Angular 21.0.1 with standalone components
- **Styling:** Tailwind CSS 3.4 + SCSS with RTL support
- **Carousels:** ngx-slick-carousel, Swiper
- **Deployment:** Firebase Hosting

## Architecture

### Authentication Flow
1. User enters 4-character code at `/auth`
2. `AuthService` validates against `POST /api/verify-code`
3. JWT token (2-hour expiry) stored in sessionStorage
4. `authGuard` protects `/`, `/landing`, `/register` routes
5. `authInterceptor` adds Bearer token to all API requests

### Key Services
- **AuthService** - Token management, code validation, session handling
- **RegistrationService** - Form submission with field mapping, multipart uploads
- **TranslationService** - Reactive i18n with localStorage persistence
- **IndexedDbService** - Video persistence across page navigation

### Routes
- `/auth` - Public code entry page
- `/` and `/landing` - Protected landing page
- `/register` - Protected creator registration form

### API
Base URL: `https://api.libyanahub.ly/api`
- `POST /verify-code` - Validate access code
- `POST /register` - Submit registration (requires Bearer token)

## Code Patterns

### Standalone Components
All components use Angular standalone API with direct imports:
```typescript
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  // ...
})
```

### Field Mapping
Frontend camelCase maps to backend snake_case via `utils/field-mapper.ts`. Arabic labels map to English API enums for expertise and teaching methods.

### Scroll Animations
`ScrollRevealDirective` uses Intersection Observer for reveal animations. Configure with `revealType` and `delay` inputs.

### Styling
- Custom Tailwind colors via CSS variables (HSL format)
- Tajawal font for Arabic text
- Mobile breakpoint: 768px
- Utility classes: `gradient-primary`, `gradient-subtle`, `shadow-soft`, `shadow-elevated`

## Important Notes

- Token expires after 2 hours (enforced by backend)
- Access codes are 4-character alphanumeric (auto-uppercase)
- Videos stored in IndexedDB to survive page navigation
- Development environment uses production API
- RTL direction applied globally for Arabic support

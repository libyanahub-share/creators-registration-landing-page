import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-logo.component.html',
  styleUrl: './company-logo.component.css'
})
export class CompanyLogoComponent {
  logos = [
    '/images/logos/architect.png',
    '/images/logos/cloud.png',
    '/images/logos/coin.png',
    '/images/logos/mobile.png',
    '/images/logos/profile.png',
    '/images/logos/saas.png',
  ];
}

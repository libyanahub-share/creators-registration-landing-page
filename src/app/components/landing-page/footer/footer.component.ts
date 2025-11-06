import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { translations } from '../../../translations';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  translations = translations;

  brand = {
    projectName: 'ليبيانا هب',
    footerText: '© 2025 ليبيانا هب. جميع الحقوق محفوظة.',
    img: 'assets/images/logo.png'
  };

  contactInfo = {
    email: 'info@libyanahub.ly',
    address: 'طرابلس، ليبيا',
    phone: '+218 91 234 5678'
  };

  socialLinks = [
    { icon: 'fab fa-facebook-f', label: 'فيسبوك', link: '#' },
    { icon: 'fab fa-twitter', label: 'تويتر', link: '#' },
    { icon: 'fab fa-instagram', label: 'انستقرام', link: '#' },
    { icon: 'fab fa-linkedin-in', label: 'لينكدإن', link: '#' }
  ];
}

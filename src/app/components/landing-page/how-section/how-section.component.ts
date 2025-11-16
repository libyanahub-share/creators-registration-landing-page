import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollRevealDirective } from '../../../directives/scroll-reveal.directive';
import { translations } from '../../../translations';

@Component({
  selector: 'app-how-section',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './how-section.component.html',
  styleUrl: './how-section.component.scss'
})
export class HowSectionComponent {
  translations = translations;

  constructor(private router: Router) {}

  steps = [
    {
      number: 1,
      title: 'الخطوة الأولى',
      description: 'نص وصفي للخطوة الأولى. سيتم استبداله بالمحتوى النهائي من فريق التسويق.'
    },
    {
      number: 2,
      title: 'الخطوة الثانية',
      description: 'نص وصفي للخطوة الثانية. سيتم استبداله بالمحتوى النهائي من فريق التسويق.'
    },
    {
      number: 3,
      title: 'الخطوة الثالثة',
      description: 'نص وصفي للخطوة الثالثة. سيتم استبداله بالمحتوى النهائي من فريق التسويق.'
    },
    {
      number: 4,
      title: 'الخطوة الرابعة',
      description: 'نص وصفي للخطوة الرابعة. سيتم استبداله بالمحتوى النهائي من فريق التسويق.'
    }
  ];

  t(key: string): string {
    return (translations as any)[key]?.['ar'] || '';
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}

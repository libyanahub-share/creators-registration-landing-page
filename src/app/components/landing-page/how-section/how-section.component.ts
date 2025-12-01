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
      title: 'أدخل بياناتك الأساسية',
      description: 'املأ نموذج التسجيل باسمك ومعلومات الاتصال، واختر وسيلة التواصل المفضلة لديك (SMS، البريد الإلكتروني، أو واتساب).'
    },
    {
      number: 2,
      title: 'اختر مجال تخصصك',
      description: 'حدد المجال الذي تبدع فيه: برمجة، تصميم، تسويق، طبخ، رياضة، تصوير، إدارة أعمال، وغيرها الكثير.'
    },
    {
      number: 3,
      title: 'سجّل فيديو تعريفي',
      description: 'جهّز فيديو قصير (30 ثانية) تتحدث فيه عن نفسك وخبراتك. هذا الفيديو سيساعدنا في التعرف عليك بشكل أفضل.'
    }
  ];

  t(key: string): string {
    return (translations as any)[key]?.['ar'] || '';
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Translations {
  // Navbar
  navbar: {
    login: string;
    register: string;
    feature: string;
    testimonials: string;
    pricing: string;
    faq: string;
    contact: string;
  };

  // Hero Section
  hero: {
    title: string;
    titleBold: string;
    subtitle: string;
    watchVideo: string;
    getStarted: string;
    videoTitle: string;
    buyNow: string;
  };

  // Feature Section
  feature: {
    section1Title: string;
    section1TitleBold: string;
    section1Subtitle: string;
    section2Title: string;
    section2TitleBold: string;
    section2Subtitle: string;
    section3Title: string;
    section3TitleBold: string;
    tab1: string;
    tab2: string;
    tab3: string;
    tab1Text: string;
    tab2Text: string;
    tab3Text: string;
    seeDetail: string;
  };

  // FAQ Section
  faq: {
    title: string;
    titleBold: string;
    subtitle: string;
  };

  // Footer
  footer: {
    company: string;
    team: string;
    history: string;
    contactUs: string;
    locations: string;
    resources: string;
    resource: string;
    resourceName: string;
    anotherResource: string;
    finalResource: string;
    legal: string;
    privacyPolicy: string;
    termsOfUse: string;
    termsCondition: string;
    copyright: string;
    interestedWork: string;
    getStarted: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();

  private translations: { [key: string]: Translations } = {
    en: {
      navbar: {
        login: 'LOG IN',
        register: 'REGISTER',
        feature: 'feature',
        testimonials: 'testimonials',
        pricing: 'pricing',
        faq: 'faq',
        contact: 'contact'
      },
      hero: {
        title: 'Libyana Video Courses',
        titleBold: 'Complete Video Library',
        subtitle: 'Access thousands of video courses and learn from expert instructors. Build your skills with hands-on projects and interactive lessons.',
        watchVideo: 'WATCH VIDEO',
        getStarted: 'GET STARTED',
        videoTitle: 'Learn from Expert Instructors',
        buyNow: 'BUY NOW'
      },
      feature: {
        section1Title: 'Complete Video Library',
        section1TitleBold: 'All Courses',
        section1Subtitle: 'Browse through our extensive library of video courses across multiple categories. Learn at your own pace with lifetime access to all content.',
        section2Title: 'Structured Learning',
        section2TitleBold: 'Course Curriculum',
        section2Subtitle: 'Organized course content with video lessons, resources, Q&A discussions and notes. Track your progress through each module.',
        section3Title: 'Professional Courses',
        section3TitleBold: 'Expert Instructors',
        tab1: 'Marketing',
        tab2: 'Development',
        tab3: 'Design',
        tab1Text: 'Master digital marketing with comprehensive courses covering SEO, social media, content strategy and more from industry experts.',
        tab2Text: 'Learn web and mobile development from scratch with hands-on projects and real-world applications. Build your portfolio while learning.',
        tab3Text: 'Create stunning designs with courses in UI/UX, graphic design, and visual communication. Learn from award-winning designers.',
        seeDetail: 'See Detail'
      },
      faq: {
        title: 'FAQ',
        titleBold: 'FAQ',
        subtitle: 'Frequently Asked Questions'
      },
      footer: {
        company: 'COMPANY',
        team: 'Team',
        history: 'History',
        contactUs: 'Contact us',
        locations: 'Locations',
        resources: 'RESOURCES',
        resource: 'Resource',
        resourceName: 'Resource name',
        anotherResource: 'Another resource',
        finalResource: 'Final resource',
        legal: 'LEGAL',
        privacyPolicy: 'Privacy policy',
        termsOfUse: 'Terms of use',
        termsCondition: 'Terms Condition',
        copyright: '© 2025 LibyanaHub. All rights reserved.',
        interestedWork: 'Interested to work with us?',
        getStarted: 'Get Started'
      }
    },
    ar: {
      navbar: {
        login: 'تسجيل الدخول',
        register: 'التسجيل',
        feature: 'المميزات',
        testimonials: 'الشهادات',
        pricing: 'الأسعار',
        faq: 'الأسئلة الشائعة',
        contact: 'اتصل بنا'
      },
      hero: {
        title: 'دورات ليبيانا التعليمية',
        titleBold: 'مكتبة فيديو كاملة',
        subtitle: 'احصل على الوصول إلى آلاف الدورات التعليمية وتعلم من المدربين الخبراء. اكتسب مهاراتك من خلال المشاريع العملية والدروس التفاعلية.',
        watchVideo: 'شاهد الفيديو',
        getStarted: 'ابدأ الآن',
        videoTitle: 'تعلم من المدربين الخبراء',
        buyNow: 'اشتري الآن'
      },
      feature: {
        section1Title: 'مكتبة فيديو كاملة',
        section1TitleBold: 'جميع الدورات',
        section1Subtitle: 'تصفح مكتبتنا الواسعة من دورات الفيديو عبر فئات متعددة. تعلم بالسرعة التي تناسبك مع وصول مدى الحياة لجميع المحتويات.',
        section2Title: 'تعلم منظم',
        section2TitleBold: 'منهج الدورة',
        section2Subtitle: 'محتوى دورة منظم مع دروس فيديو وموارد ومناقشات أسئلة وأجوبة وملاحظات. تتبع تقدمك من خلال كل وحدة.',
        section3Title: 'دورات احترافية',
        section3TitleBold: 'مدربون خبراء',
        tab1: 'التسويق',
        tab2: 'التطوير',
        tab3: 'التصميم',
        tab1Text: 'اتقن التسويق الرقمي من خلال دورات شاملة تغطي تحسين محركات البحث ووسائل التواصل الاجتماعي واستراتيجية المحتوى والمزيد من خبراء الصناعة.',
        tab2Text: 'تعلم تطوير الويب والهاتف المحمول من الصفر مع المشاريع العملية والتطبيقات الواقعية. قم ببناء محفظتك أثناء التعلم.',
        tab3Text: 'أنشئ تصاميم مذهلة من خلال دورات في واجهة المستخدم/تجربة المستخدم والتصميم الجرافيكي والتواصل البصري. تعلم من المصممين الحائزين على جوائز.',
        seeDetail: 'عرض التفاصيل'
      },
      faq: {
        title: 'الأسئلة الشائعة',
        titleBold: 'الأسئلة الشائعة',
        subtitle: 'الأسئلة المتكررة'
      },
      footer: {
        company: 'الشركة',
        team: 'الفريق',
        history: 'التاريخ',
        contactUs: 'اتصل بنا',
        locations: 'المواقع',
        resources: 'الموارد',
        resource: 'مورد',
        resourceName: 'اسم المورد',
        anotherResource: 'مورد آخر',
        finalResource: 'المورد النهائي',
        legal: 'قانوني',
        privacyPolicy: 'سياسة الخصوصية',
        termsOfUse: 'شروط الاستخدام',
        termsCondition: 'الشروط والأحكام',
        copyright: '© 2025 ليبيانا هب. جميع الحقوق محفوظة.',
        interestedWork: 'مهتم بالعمل معنا؟',
        getStarted: 'ابدأ الآن'
      }
    }
  };

  constructor() {
    // Load saved language
    if (typeof localStorage !== 'undefined') {
      const savedLang = localStorage.getItem('appLanguage') || 'en';
      this.currentLang.next(savedLang);
    }
  }

  setLanguage(lang: string): void {
    this.currentLang.next(lang);
  }

  getCurrentLanguage(): string {
    return this.currentLang.value;
  }

  getTranslations(): Translations {
    return this.translations[this.currentLang.value];
  }

  translate(key: string): string {
    const keys = key.split('.');
    let value: any = this.translations[this.currentLang.value];

    for (const k of keys) {
      value = value[k];
      if (!value) return key;
    }

    return value;
  }
}

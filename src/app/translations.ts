export const translations = {
  // Navbar
  navLogin: { en: 'LOG IN', ar: 'تسجيل الدخول' },
  navRegister: { en: 'REGISTER', ar: 'التسجيل' },
  navFeature: { en: 'feature', ar: 'المميزات' },
  navTestimonials: { en: 'testimonials', ar: 'الشهادات' },
  navPricing: { en: 'pricing', ar: 'الأسعار' },
  navFaq: { en: 'faq', ar: 'الأسئلة الشائعة' },
  navContact: { en: 'contact', ar: 'اتصل بنا' },

  // Hero Section
  heroTitle: { en: 'Libyana Video Courses', ar: 'دورات ليبيانا التعليمية' },
  heroTitleBold: { en: 'Complete Video Library', ar: 'مكتبة فيديو كاملة' },
  heroSubtitle: {
    en: 'Access thousands of video courses and learn from expert instructors. Build your skills with hands-on projects and interactive lessons.',
    ar: 'احصل على الوصول إلى آلاف الدورات التعليمية وتعلم من المدربين الخبراء. اكتسب مهاراتك من خلال المشاريع العملية والدروس التفاعلية.'
  },
  heroWatchVideo: { en: 'WATCH VIDEO', ar: 'شاهد الفيديو' },
  heroGetStarted: { en: 'GET STARTED', ar: 'سجّل الآن' },
  heroVideoTitle: { en: 'Learn from Expert Instructors', ar: 'تعلم من المدربين الخبراء' },
  heroBuyNow: { en: 'BUY NOW', ar: 'اشتري الآن' },

  // Feature Section
  featureTitle: { en: 'Professional Courses', ar: 'دورات احترافية' },
  featureTitleBold: { en: 'Expert Instructors', ar: 'مدربون خبراء' },
  featureTab1: { en: 'Marketing', ar: 'التسويق' },
  featureTab2: { en: 'Development', ar: 'التطوير' },
  featureTab3: { en: 'Design', ar: 'التصميم' },
  featureTab1Text: {
    en: 'Master digital marketing with comprehensive courses covering SEO, social media, content strategy and more from industry experts.',
    ar: 'اتقن التسويق الرقمي من خلال دورات شاملة تغطي تحسين محركات البحث ووسائل التواصل الاجتماعي واستراتيجية المحتوى والمزيد من خبراء الصناعة.'
  },
  featureTab2Text: {
    en: 'Learn web and mobile development from scratch with hands-on projects and real-world applications. Build your portfolio while learning.',
    ar: 'تعلم تطوير الويب والهاتف المحمول من الصفر مع المشاريع العملية والتطبيقات الواقعية. قم ببناء محفظتك أثناء التعلم.'
  },
  featureTab3Text: {
    en: 'Create stunning designs with courses in UI/UX, graphic design, and visual communication. Learn from award-winning designers.',
    ar: 'أنشئ تصاميم مذهلة من خلال دورات في واجهة المستخدم/تجربة المستخدم والتصميم الجرافيكي والتواصل البصري. تعلم من المصممين الحائزين على جوائز.'
  },
  featureSeeDetail: { en: 'See Detail', ar: 'عرض التفاصيل' },

  // FAQ Section
  faqTitle: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
  faqSubtitle: { en: 'Frequently Asked Questions', ar: 'الأسئلة المتكررة' },

  // Footer
  footerCompany: { en: 'COMPANY', ar: 'الشركة' },
  footerTeam: { en: 'Team', ar: 'الفريق' },
  footerHistory: { en: 'History', ar: 'التاريخ' },
  footerContactUs: { en: 'Contact us', ar: 'اتصل بنا' },
  footerLocations: { en: 'Locations', ar: 'المواقع' },
  footerResources: { en: 'RESOURCES', ar: 'الموارد' },
  footerResource: { en: 'Resource', ar: 'مورد' },
  footerResourceName: { en: 'Resource name', ar: 'اسم المورد' },
  footerAnotherResource: { en: 'Another resource', ar: 'مورد آخر' },
  footerFinalResource: { en: 'Final resource', ar: 'المورد النهائي' },
  footerLegal: { en: 'LEGAL', ar: 'قانوني' },
  footerPrivacyPolicy: { en: 'Privacy policy', ar: 'سياسة الخصوصية' },
  footerTermsOfUse: { en: 'Terms of use', ar: 'شروط الاستخدام' },
  footerTermsCondition: { en: 'Terms Condition', ar: 'الشروط والأحكام' },
  footerCopyright: { en: '© 2025 LibyanaHub. All rights reserved.', ar: '© 2025 ليبيانا هب. جميع الحقوق محفوظة.' },
  footerInterestedWork: { en: 'Interested to work with us?', ar: 'مهتم بالعمل معنا؟' },
  footerGetStarted: { en: 'Get Started', ar: 'ابدأ الآن' }
};

// Helper function to get translated text
export function t(key: string, lang: 'en' | 'ar' = 'en'): string {
  return (translations as any)[key]?.[lang] || '';
}

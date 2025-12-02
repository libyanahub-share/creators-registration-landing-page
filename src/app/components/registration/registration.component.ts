import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { IndexedDbService } from '../../services/indexed-db.service';
import { AuthService } from '../../services/auth.service';

export interface RegistrationData {
  // Step 1: Personal Info
  fullName: string;
  preferredCommunicationChannel: 'email' | 'sms' | 'whatsapp' | '';
  email: string;
  phone: string;
  whatsappNumber: string;

  // Step 2: Teaching Info
  expertise: string[];
  teachingMethods: string[]; // Changed from single to multiple
  bio: string;

  // Step 3: Video (was Step 4)
  introVideo: File | null;
  introVideoUrl: string;
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  currentStep = 1;
  totalSteps = 4; // Changed from 5 to 4
  
  // Form data
  formData: RegistrationData = {
    fullName: '',
    preferredCommunicationChannel: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    expertise: [],
    teachingMethods: [], // Changed from teachingMethod to teachingMethods array
    bio: '',
    introVideo: null,
    introVideoUrl: ''
  };
  
  // Teaching methods from landing page
  teachingMethodsList = [
    'دورات فيديو مسجلة',
    'جلسات فردية مباشرة',
    'دورات تفاعلية منظمة',
    'تدريب لياقة بدنية شخصي',
    'دروس طبخ تفاعلية',
    'استشارات وتطوير مهني',
    'فنون إبداعية',
    'تعليم لغات'
  ];

  // Expertise suggestions
  expertiseSuggestions = [
    'برمجة',
    'تطوير الويب',
    'تصميم',
    'تسويق',
    'أمن سيبراني',
    'كتابة',
    'ترجمة',
    'محاسبة',
    'موارد بشرية',
    'علاقات عامة',
    'إدارة مخازن',
    'قانون',
    'طب',
    'هندسة',
    'تعليم',
    'طبخ',
    'رياضة',
    'فنون',
    'تصوير',
    'إدارة أعمال',
    'إدارة مشاريع',
    'تحليل بيانات',
    'أخرى'
  ];
  
  isSubmitting = false;
  showSuccessMessage = false;
  errorMessage = '';

  // Video guide modal
  isVideoGuideModalOpen = false;
  expandedAccordionStep: number | null = null;

  // Video guide steps content
  videoGuideSteps = [
    {
      title: 'ضع الكاميرا في مستوى العين',
      content: 'ضع هاتفك في الوضع الأفقي (المناظر الطبيعية) في مستوى عينيك. استخدم حامل ثلاثي القوائم أو حامل هاتف أو كومة من الكتب.',
      items: [
        'تأكد من أن الكاميرا ثابتة ولا تهتز',
        'يجب أن تكون الكاميرا موجهة مباشرة نحو وجهك',
        'تجنب وضع الكاميرا أعلى أو أقل من مستوى العين',
        'استخدم الوضع الأفقي للهاتف وليس العمودي'
      ],
      tip: 'إذا لم يكن لديك حامل، يمكنك استخدام كومة من الكتب أو الصناديق لرفع الهاتف إلى المستوى المناسب.',
      tipType: 'tip'
    },
    {
      title: 'حافظ على المسافة الصحيحة',
      content: 'ابق على بعد حوالي 2-3 أقدام (طول الذراع) من الكاميرا. هذا يضمن ظهور رأسك وكتفيك بوضوح.',
      items: [
        'المسافة المثالية هي طول ذراع واحدة تقريباً',
        'يجب أن يظهر رأسك وكتفاك بالكامل في الإطار',
        'لا تقترب كثيراً حتى لا يظهر وجهك فقط',
        'لا تبتعد كثيراً حتى لا تظهر صغيراً في الفيديو'
      ],
      tip: 'قم بإجراء تجربة تصوير سريعة للتحقق من المسافة المناسبة قبل التسجيل النهائي.',
      tipType: 'tip'
    },
    {
      title: 'استخدم الإضاءة الطبيعية من النافذة',
      content: 'واجه نافذة حتى يسقط الضوء الطبيعي على وجهك. ضع نفسك بحيث تكون النافذة أمامك أو قليلاً إلى الجانب.',
      items: [
        'الضوء الطبيعي من النافذة هو الأفضل للتصوير',
        'واجه النافذة مباشرة أو بزاوية 45 درجة',
        'تجنب وضع النافذة خلفك (الإضاءة الخلفية)',
        'أفضل وقت للتصوير هو النهار عندما يكون الضوء ساطعاً'
      ],
      tip: 'لا تضع النافذة خلفك! هذا سيجعل وجهك مظلماً والخلفية مشرقة جداً.',
      tipType: 'warning'
    },
    {
      title: 'أو استخدم مصباح/لمبة عادية',
      content: 'إذا لم يكن الضوء الطبيعي متاحاً، ضع مصباحاً أو لمبة عادية أمامك وقليلاً إلى الجانب.',
      items: [
        'ضع المصباح أمامك وليس خلفك',
        'يجب أن يكون المصباح في مستوى العين أو أعلى قليلاً',
        'لا تضع المصباح أسفل وجهك حتى لا تبدو الإضاءة غريبة',
        'يمكنك استخدام مصباحين على الجانبين للحصول على إضاءة أفضل'
      ],
      tip: 'لا تحتاج إلى معدات استوديو احترافية. مصباح مكتب عادي أو لمبة الغرفة كافية للحصول على إضاءة جيدة.',
      tipType: 'tip'
    },
    {
      title: 'اهتم بالخلفية',
      content: 'اختر خلفية نظيفة وبسيطة لا تشتت الانتباه عن وجهك ورسالتك.',
      items: [
        'اختر جداراً عادياً أو خلفية بسيطة',
        'تجنب الخلفيات المزدحمة أو الفوضوية',
        'تأكد من عدم وجود أشياء غريبة أو محرجة في الخلفية',
        'يمكنك إضافة نبات أو رف كتب بسيط لإضافة لمسة جمالية'
      ],
      tip: 'قم بالتقاط صورة للخلفية أولاً لترى كيف تبدو قبل بدء التسجيل.',
      tipType: 'tip'
    },
    {
      title: 'تحقق من الصوت',
      content: 'الصوت الواضح لا يقل أهمية عن الصورة الجيدة.',
      items: [
        'سجل في مكان هادئ بعيداً عن الضوضاء',
        'أغلق النوافذ لتقليل الأصوات الخارجية',
        'أوقف تشغيل المراوح ومكيفات الهواء إن أمكن',
        'تحدث بصوت واضح ومسموع',
        'لا تحتاج لميكروفون احترافي، ميكروفون الهاتف كافي'
      ],
      tip: 'قم بتسجيل تجريبي قصير أولاً للتأكد من وضوح الصوت قبل التسجيل النهائي.',
      tipType: 'warning'
    },
    {
      title: 'قائمة التحقق النهائية',
      content: 'قبل أن تضغط على زر التسجيل، تأكد من:',
      items: [
        'الهاتف في الوضع الأفقي (المناظر الطبيعية)',
        'الكاميرا في مستوى العين وثابتة',
        'أنت على بعد 2-3 أقدام من الكاميرا',
        'مصدر الضوء أمامك وليس خلفك',
        'الخلفية نظيفة وبسيطة',
        'المكان هادئ والصوت واضح',
        'أنت تنظر إلى عدسة الكاميرا',
        'قمت بتجربة تسجيل قصيرة للتحقق من كل شيء'
      ],
      tip: 'ابتسم وكن طبيعياً! الثقة والأصالة أهم من الكمال. تحدث كأنك تتحدث مع صديق.',
      tipType: 'tip'
    }
  ];

  private readonly STORAGE_KEY = 'libyana_hub_registration_draft';

  constructor(
    public router: Router,
    private registrationService: RegistrationService,
    private indexedDbService: IndexedDbService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.loadDraft();
  }
  
  /**
   * Navigate to next step
   */
  nextStep(): void {
    if (this.validateCurrentStep()) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.saveDraft();
        this.scrollToTop();
      }
    }
  }
  
  /**
   * Navigate to previous step
   */
  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.scrollToTop();
    }
  }
  
  /**
   * Go to specific step (only if previous steps are complete)
   */
  goToStep(step: number): void {
    if (step < 1 || step > this.totalSteps) {
      return;
    }

    // Allow going back to previous steps
    if (step < this.currentStep) {
      this.currentStep = step;
      this.scrollToTop();
      return;
    }

    // Check if all previous steps are completed
    for (let i = 1; i < step; i++) {
      const previousStepCache = this.currentStep;
      this.currentStep = i;
      if (!this.validateCurrentStep()) {
        this.currentStep = previousStepCache;
        return; // Don't allow navigation if previous step is incomplete
      }
      this.currentStep = previousStepCache;
    }

    // All previous steps are complete, allow navigation
    this.currentStep = step;
    this.scrollToTop();
  }

  /**
   * Check if a step is accessible (all previous steps are complete)
   */
  isStepAccessible(step: number): boolean {
    if (step === 1) return true;
    if (step <= this.currentStep) return true;

    // Check if all previous steps are complete
    for (let i = 1; i < step; i++) {
      const currentStepCache = this.currentStep;
      this.currentStep = i;
      const isValid = this.validateCurrentStep();
      this.currentStep = currentStepCache;
      if (!isValid) {
        return false;
      }
    }
    return true;
  }
  
  /**
   * Validate current step
   */
  validateCurrentStep(): boolean {
    switch (this.currentStep) {
      case 1:
        // Full name and channel selection are required
        if (this.formData.fullName.trim() === '' || this.formData.preferredCommunicationChannel === '') {
          return false;
        }

        // Validate based on selected channel
        switch (this.formData.preferredCommunicationChannel) {
          case 'email':
            return this.formData.email.trim() !== '' && this.isValidEmail(this.formData.email);
          case 'sms':
            return this.formData.phone.trim() !== '' && this.isValidLibyanaPhone(this.formData.phone);
          case 'whatsapp':
            return this.formData.whatsappNumber.trim() !== '' && this.isValidPhone(this.formData.whatsappNumber);
          default:
            return false;
        }
      case 2:
        return this.formData.expertise.length > 0;
      case 3:
        return this.formData.introVideo !== null || this.formData.introVideoUrl !== '';
      case 4:
        return true;
      default:
        return false;
    }
    // return true;
  }

  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number format
   */
  isValidPhone(phone: string): boolean {
    // Allow numbers, spaces, +, -, (, )
    const phoneRegex = /^[0-9+\-\s()]+$/;
    return phoneRegex.test(phone) && phone.replace(/[^0-9]/g, '').length >= 9;
  }

  /**
   * Validate Libyana phone number (092 or 094 prefixes)
   */
  isValidLibyanaPhone(phone: string): boolean {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/[^0-9]/g, '');

    // Check if it starts with 092 or 094 and has exactly 10 digits
    // or starts with 218092 or 218094 (with country code) and has 12 digits
    const libyanaRegex = /^(092|094)\d{7}$/;
    const libyanaWithCountryCode = /^218(092|094)\d{7}$/;

    return libyanaRegex.test(cleaned) || libyanaWithCountryCode.test(cleaned);
  }
  
  /**
   * Check if step is complete
   */
  isStepComplete(step: number): boolean {
    const currentStepCache = this.currentStep;
    this.currentStep = step;
    const isComplete = this.validateCurrentStep();
    this.currentStep = currentStepCache;
    return isComplete;
  }
  
  /**
   * Handle expertise selection
   */
  toggleExpertise(expertise: string): void {
    const index = this.formData.expertise.indexOf(expertise);
    if (index > -1) {
      this.formData.expertise.splice(index, 1);
    } else {
      this.formData.expertise.push(expertise);
    }
    this.saveDraft();
  }
  
  /**
   * Handle teaching method selection
   */
  toggleTeachingMethod(method: string): void {
    const index = this.formData.teachingMethods.indexOf(method);
    if (index > -1) {
      this.formData.teachingMethods.splice(index, 1);
    } else {
      this.formData.teachingMethods.push(method);
    }
    this.saveDraft();
  }
  
  /**
   * Handle video file selection
   */
  onVideoSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Basic validation
      if (file.type.startsWith('video/')) {
        this.formData.introVideo = file;

        // Create preview URL
        this.formData.introVideoUrl = URL.createObjectURL(file);

        // Save video to IndexedDB for persistence across page refreshes
        this.indexedDbService.saveVideo(file).catch(error => {
          console.error('Failed to save video to IndexedDB:', error);
        });

        this.saveDraft();
      } else {
        alert('الرجاء اختيار ملف فيديو صالح');
      }
    }
  }
  
  /**
   * Remove selected video
   */
  removeVideo(): void {
    this.formData.introVideo = null;
    this.formData.introVideoUrl = '';

    // Clear video from IndexedDB
    this.indexedDbService.clearVideo().catch(error => {
      console.error('Failed to clear video from IndexedDB:', error);
    });

    this.saveDraft();
  }
  
  /**
   * Save draft to localStorage
   */
  saveDraft(): void {
    const draftData = {
      ...this.formData,
      introVideo: null, // Can't store File in localStorage
      currentStep: this.currentStep
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(draftData));
  }
  
  /**
   * Load draft from localStorage and video from IndexedDB
   */
  async loadDraft(): Promise<void> {
    // Load form data from localStorage
    const draft = localStorage.getItem(this.STORAGE_KEY);
    if (draft) {
      try {
        const draftData = JSON.parse(draft);
        this.formData = { ...this.formData, ...draftData };
        this.currentStep = draftData.currentStep || 1;
      } catch (e) {
        console.error('Failed to load draft:', e);
      }
    }

    // Load video from IndexedDB
    try {
      const videoFile = await this.indexedDbService.getVideo();
      if (videoFile) {
        this.formData.introVideo = videoFile;
        // Recreate the blob URL for the video preview
        this.formData.introVideoUrl = URL.createObjectURL(videoFile);
      }
    } catch (error) {
      console.error('Failed to load video from IndexedDB:', error);
    }
  }
  
  /**
   * Clear draft from localStorage and IndexedDB
   */
  clearDraft(): void {
    localStorage.removeItem(this.STORAGE_KEY);

    // Clear all data from IndexedDB (including video)
    this.indexedDbService.clearAll().catch(error => {
      console.error('Failed to clear IndexedDB:', error);
    });
  }
  
  /**
   * Submit registration
   */
  submitRegistration(): void {
    if (!this.validateCurrentStep()) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    // Prepare data for API
    const registrationData = {
      fullName: this.formData.fullName,
      preferredCommunicationChannel: this.formData.preferredCommunicationChannel,
      email: this.formData.email,
      phone: this.formData.phone,
      whatsappNumber: this.formData.whatsappNumber,
      expertise: this.formData.expertise,
      teachingMethods: this.formData.teachingMethods,
      bio: this.formData.bio,
      introVideo: this.formData.introVideo
    };

    // Call registration service
    this.registrationService.submitRegistration(registrationData).subscribe({
      next: (response) => {
        this.isSubmitting = false;

        if (response.success) {
          // Show success message
          this.showSuccessMessage = true;

          // Clear draft
          this.clearDraft();

          // Scroll to top to show success message
          this.scrollToTop();

          console.log('Registration successful:', response.data);

          // TODO: Send SMS confirmation
          // TODO: Redirect after success or show next steps
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.message || 'حدث خطأ أثناء إرسال البيانات، الرجاء المحاولة مرة أخرى';
        this.scrollToTop();
        console.error('Registration error:', error);

        // Auto-logout if code is already used or session expired
        if (this.errorMessage.includes('الكود') || this.errorMessage.includes('الجلسة')) {
          this.authService.logout();
          // Redirect to auth page after a short delay to show the error
          setTimeout(() => {
            this.router.navigate(['/auth']);
          }, 2000);
        }
      }
    });
  }
  
  /**
   * Scroll to top of page
   */
  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  /**
   * Get progress percentage
   */
  getProgress(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  /**
   * Open video guide modal
   */
  openVideoGuideModal(): void {
    this.isVideoGuideModalOpen = true;
    this.expandedAccordionStep = null;
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close video guide modal
   */
  closeVideoGuideModal(): void {
    this.isVideoGuideModalOpen = false;
    document.body.style.overflow = '';
  }

  /**
   * Handle modal backdrop click
   */
  onModalBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeVideoGuideModal();
    }
  }

  /**
   * Toggle accordion step
   */
  toggleAccordionStep(index: number): void {
    this.expandedAccordionStep = this.expandedAccordionStep === index ? null : index;
  }
}
/**
 * Field Mapper Utility
 * Maps Arabic labels to English backend enum values and field names
 */

/**
 * Teaching Methods Mapping (Arabic → English)
 */
export const TEACHING_METHODS_MAP: { [key: string]: string } = {
  'دورات فيديو مسجلة': 'recorded_videos',
  'جلسات فردية مباشرة': 'live_sessions',
  'دورات تفاعلية منظمة': 'interactive_courses',
  'تدريب لياقة بدنية شخصي': 'personal_fitness',
  'دروس طبخ تفاعلية': 'cooking_lessons',
  'استشارات وتطوير مهني': 'consulting',
  'فنون إبداعية': 'creative_arts',
  'تعليم لغات': 'language_teaching'
};

/**
 * Expertise Mapping (Arabic → English)
 */
export const EXPERTISE_MAP: { [key: string]: string } = {
  'برمجة': 'programming',
  'تصميم': 'design',
  'تسويق': 'marketing',
  'كتابة': 'writing',
  'ترجمة': 'translation',
  'محاسبة': 'accounting',
  'قانون': 'law',
  'طب': 'medicine',
  'هندسة': 'engineering',
  'تعليم': 'education',
  'طبخ': 'cooking',
  'رياضة': 'sports',
  'فنون': 'arts',
  'موسيقى': 'music',
  'أخرى': 'other'
};

/**
 * Map teaching methods array from Arabic to English
 */
export function mapTeachingMethods(arabicMethods: string[]): string[] {
  return arabicMethods.map(method => TEACHING_METHODS_MAP[method] || method);
}

/**
 * Map expertise array from Arabic to English
 */
export function mapExpertise(arabicExpertise: string[]): string[] {
  return arabicExpertise.map(exp => EXPERTISE_MAP[exp] || exp);
}

/**
 * Map frontend registration data to backend API format
 */
export interface FrontendRegistrationData {
  fullName: string;
  email: string;
  phone: string;
  expertise: string[];
  teachingMethods: string[];
  bio: string;
  introVideo: File | null;
}

export interface BackendRegistrationData {
  full_name: string;
  email: string;
  phone_number: string;
  expertise: string[];
  teaching_methods: string[];
  bio: string;
  video?: File;
}

/**
 * Transform frontend data to backend format
 */
export function mapRegistrationData(frontendData: FrontendRegistrationData): BackendRegistrationData {
  return {
    full_name: frontendData.fullName,
    email: frontendData.email,
    phone_number: frontendData.phone,
    expertise: mapExpertise(frontendData.expertise),
    teaching_methods: mapTeachingMethods(frontendData.teachingMethods),
    bio: frontendData.bio,
    ...(frontendData.introVideo && { video: frontendData.introVideo })
  };
}

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
  'تطوير الويب': 'web_development',
  'تصميم': 'design',
  'تسويق': 'marketing',
  'أمن سيبراني': 'cybersecurity',
  'كتابة': 'writing',
  'ترجمة': 'translation',
  'محاسبة': 'accounting',
  'موارد بشرية': 'human_resources',
  'علاقات عامة': 'public_relations',
  'إدارة مخازن': 'inventory_management',
  'قانون': 'law',
  'طب': 'medicine',
  'هندسة': 'engineering',
  'تعليم': 'education',
  'طبخ': 'cooking',
  'رياضة': 'sports',
  'فنون': 'arts',
  'تصوير': 'photography',
  'إدارة أعمال': 'business_management',
  'إدارة مشاريع': 'project_management',
  'تحليل بيانات': 'data_analysis',
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
  preferredCommunicationChannel: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  expertise: string[];
  teachingMethods: string[];
  bio: string;
  introVideo: File | null;
}

export interface BackendRegistrationData {
  full_name: string;
  preferred_communication_channel: string;
  email?: string;
  phone_number?: string;
  whatsapp_number?: string;
  expertise: string[];
  teaching_methods: string[];
  bio: string;
  video?: File;
}

/**
 * Transform frontend data to backend format
 */
export function mapRegistrationData(frontendData: FrontendRegistrationData): BackendRegistrationData {
  const backendData: BackendRegistrationData = {
    full_name: frontendData.fullName,
    preferred_communication_channel: frontendData.preferredCommunicationChannel,
    email: frontendData.email || '',
    phone_number: frontendData.phone || '',
    whatsapp_number: frontendData.whatsappNumber || '',
    expertise: mapExpertise(frontendData.expertise),
    teaching_methods: mapTeachingMethods(frontendData.teachingMethods),
    bio: frontendData.bio || '',
  };

  // Add video if exists
  if (frontendData.introVideo) {
    backendData.video = frontendData.introVideo;
  }

  return backendData;
}

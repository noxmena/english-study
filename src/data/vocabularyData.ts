
export interface VocabularyItem {
  id: number;
  word: string;
  meaning: string;
  arabic: string;
  category?: string;
}

export const vocabularyItems: VocabularyItem[] = [
  { id: 1, word: "determination", meaning: "Firmness to achieve goals", arabic: "تصميم" },
  { id: 2, word: "encouragement", meaning: "Support or hope", arabic: "تشجيع" },
  { id: 3, word: "get used to", meaning: "Become familiar", arabic: "التعود" },
  { id: 4, word: "host family", meaning: "Welcoming family", arabic: "عائلة مضيفة" },
  { id: 5, word: "independent", meaning: "Self-sufficient", arabic: "مستقل" },
  { id: 6, word: "pick me up", meaning: "Lift spirits", arabic: "رفع معنويات" },
  { id: 7, word: "struggle", meaning: "Great effort", arabic: "نضال" },
  { id: 8, word: "believe", meaning: "Accept as true", arabic: "يؤمن" },
  { id: 9, word: "feel", meaning: "Experience emotion", arabic: "يشعر" },
  { id: 10, word: "forget", meaning: "Fail to remember", arabic: "ينسى" },
  { id: 11, word: "imagine", meaning: "Form mental image", arabic: "يتخيل" },
  { id: 12, word: "miss", meaning: "Feel absence sadness", arabic: "يشتاق" },
  { id: 13, word: "think", meaning: "Consider with mind", arabic: "يفكر" },
  { id: 14, word: "wish", meaning: "Want to happen", arabic: "يتمنى" },
  { id: 15, word: "expansion", meaning: "Increase in size", arabic: "توسع" },
  { id: 16, word: "facilities", meaning: "Provided services", arabic: "مرافق" },
  { id: 17, word: "high-tech", meaning: "Advanced technology", arabic: "تقنية عالية" },
  { id: 18, word: "network", meaning: "Interconnected System", arabic: "شبكة" },
  { id: 19, word: "public transport", meaning: "Public vehicles", arabic: "نقل عام" },
  { id: 20, word: "biodiversity", meaning: "Variety of life", arabic: "تنوع بيولوجي" },
  { id: 21, word: "challenging", meaning: "Tests abilities", arabic: "تحدي" },
  { id: 22, word: "native", meaning: "Originating from place", arabic: "أصلي" },
  { id: 23, word: "inhabitants", meaning: "Living people/animals", arabic: "سكان" },
  { id: 24, word: "preserve", meaning: "Protect original state", arabic: "يحافظ" },
  { id: 25, word: "scholarship", meaning: "Educational aid", arabic: "منحة دراسية" },
  { id: 26, word: "species", meaning: "Interbreeding group", arabic: "أنواع" },
  { id: 27, word: "rewarding", meaning: "Satisfying achievement", arabic: "مجزي" },
  { id: 28, word: "survival", meaning: "Continuing to live", arabic: "بقاء" },
  { id: 29, word: "reporter", meaning: "News investigator", arabic: "مراسل" },
  { id: 30, word: "fact-checker", meaning: "Verifies accuracy", arabic: "مدقق حقائق" },
  { id: 31, word: "interview", meaning: "Formal conversation", arabic: "مقابلة" },
  { id: 32, word: "newsreader", meaning: "Presents news", arabic: "مقدم أخبار" },
  { id: 33, word: "broadcast", meaning: "Transmit program", arabic: "بث" },
  { id: 34, word: "source", meaning: "Information origin", arabic: "مصدر" },
  { id: 35, word: "editor", meaning: "Prepares content", arabic: "محرر" },
  { id: 36, word: "question", meaning: "Ask for info", arabic: "يسأل" },
  { id: 37, word: "digital nomad", meaning: "Remote traveler", arabic: "رحال رقمي" },
  { id: 38, word: "channel", meaning: "Communication medium", arabic: "قناة" },
  { id: 39, word: "correspondent", meaning: "Location reporter", arabic: "مراسل" },
  { id: 40, word: "headlines", meaning: "News titles", arabic: "عناوين أخبار" },
  { id: 41, word: "investigator", meaning: "Thorough examiner", arabic: "محقق" },
  { id: 42, word: "journalist", meaning: "News writer", arabic: "صحفي" },
  { id: 43, word: "scene", meaning: "Event location", arabic: "مكان الحدث" },
  { id: 44, word: "deliberately", meaning: "Intentionally", arabic: "عمدًا" },
  { id: 45, word: "action", meaning: "Exciting events", arabic: "أكشن" },
  { id: 46, word: "animation", meaning: "Animated characters", arabic: "رسوم متحركة" },
  { id: 47, word: "comedy", meaning: "Makes laugh", arabic: "كوميديا" },
  { id: 48, word: "historical", meaning: "Based on history", arabic: "تاريخي" },
  { id: 49, word: "horror", meaning: "Creates fear", arabic: "رعب" },
  { id: 50, word: "musical", meaning: "Features songs", arabic: "موسيقي" },
  { id: 51, word: "romantic", meaning: "Focuses on love", arabic: "رومانسي" },
  { id: 52, word: "science fiction", meaning: "Futuristic concepts", arabic: "خيال علمي" },
  { id: 53, word: "constantly", meaning: "All the time", arabic: "باستمرار" },
  { id: 54, word: "enjoyable", meaning: "Gives pleasure", arabic: "ممتع" },
  { id: 55, word: "incredibly", meaning: "Extremely", arabic: "بشكل لا يصدق" },
  { id: 56, word: "hostile", meaning: "Unfriendly", arabic: "معادي" },
  { id: 57, word: "talented", meaning: "Naturally skilled", arabic: "موهوب" },
  { id: 58, word: "surprisingly", meaning: "Unexpectedly", arabic: "بشكل مفاجئ" },
  { id: 59, word: "unkind", meaning: "Not kind", arabic: "غير لطيف" },
  { id: 60, word: "achievable", meaning: "Able to accomplish", arabic: "قابل للتحقيق" },
  { id: 61, word: "measurable", meaning: "Able to quantify", arabic: "قابل للقياس" },
  { id: 62, word: "relevant", meaning: "Closely connected", arabic: "ذو صلة" },
  { id: 63, word: "specific", meaning: "Clearly defined", arabic: "محدد" },
  { id: 64, word: "set one goal", meaning: "Establish objective", arabic: "وضع هدف واحد" },
  { id: 65, word: "time-bound", meaning: "Has deadline", arabic: "محدد بوقت" }
];

// Helper function to get unique categories
export const getCategories = () => {
  const categories = [
    { id: "all", name: "All Words" },
    { id: "nouns", name: "Nouns" },
    { id: "verbs", name: "Verbs" },
    { id: "expressions", name: "Expressions" },
    { id: "adjectives", name: "Adjectives" }
  ];
  
  return categories;
};

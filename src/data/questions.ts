export type Question = {
  id: number;
  en: string;
  ar: string;
  optionsEn: string[];
  optionsAr: string[];
  answer: number;
  explanationEn: string;
  explanationAr: string;
};

export const questions: Question[] = [
  {
    id: 1,
    en: "Which planet is closest to the Sun?",
    ar: "ما أقرب كوكب إلى الشمس؟",
    optionsEn: ["Earth", "Mercury", "Mars", "Venus"],
    optionsAr: ["الأرض", "عطارد", "المريخ", "الزهرة"],
    answer: 1,
    explanationEn: "Mercury is the closest planet to the Sun.",
    explanationAr: "عطارد هو أقرب كواكب المجموعة الشمسية إلى الشمس.",
  },
  {
    id: 2,
    en: "What is the largest planet in our solar system?",
    ar: "ما أكبر كواكب المجموعة الشمسية؟",
    optionsEn: ["Saturn", "Earth", "Jupiter", "Neptune"],
    optionsAr: ["زحل", "الأرض", "المشتري", "نبتون"],
    answer: 2,
    explanationEn: "Jupiter is the largest planet in our solar system.",
    explanationAr: "المشتري هو أكبر كواكب المجموعة الشمسية.",
  },
  {
    id: 3,
    en: "Which planet is known as the Red Planet?",
    ar: "أي كوكب يُعرف بالكوكب الأحمر؟",
    optionsEn: ["Mars", "Venus", "Uranus", "Mercury"],
    optionsAr: ["المريخ", "الزهرة", "أورانوس", "عطارد"],
    answer: 0,
    explanationEn: "Mars is called the Red Planet because of iron oxide on its surface.",
    explanationAr: "يُعرف المريخ بالكوكب الأحمر بسبب أكاسيد الحديد على سطحه.",
  },
  {
    id: 4,
    en: "Which planet is famous for its rings?",
    ar: "ما الكوكب المشهور بحلقاته؟",
    optionsEn: ["Earth", "Mars", "Saturn", "Mercury"],
    optionsAr: ["الأرض", "المريخ", "زحل", "عطارد"],
    answer: 2,
    explanationEn: "Saturn is famous for its spectacular ring system.",
    explanationAr: "يشتهر زحل بنظام الحلقات المحيط به.",
  },
  {
    id: 5,
    en: "How many planets are in our solar system?",
    ar: "كم عدد كواكب المجموعة الشمسية؟",
    optionsEn: ["Seven", "Eight", "Nine", "Ten"],
    optionsAr: ["سبعة", "ثمانية", "تسعة", "عشرة"],
    answer: 1,
    explanationEn: "There are eight recognized planets in our solar system.",
    explanationAr: "تتكون المجموعة الشمسية من ثمانية كواكب.",
  },
  {
    id: 6,
    en: "Which planet do we live on?",
    ar: "على أي كوكب نعيش؟",
    optionsEn: ["Mars", "Venus", "Earth", "Jupiter"],
    optionsAr: ["المريخ", "الزهرة", "الأرض", "المشتري"],
    answer: 2,
    explanationEn: "Earth is our home planet.",
    explanationAr: "الأرض هي الكوكب الذي نعيش عليه.",
  },
  {
    id: 7,
    en: "Which planet is farthest from the Sun?",
    ar: "ما أبعد كوكب عن الشمس؟",
    optionsEn: ["Jupiter", "Neptune", "Saturn", "Uranus"],
    optionsAr: ["المشتري", "نبتون", "زحل", "أورانوس"],
    answer: 1,
    explanationEn: "Neptune is the farthest recognized planet from the Sun.",
    explanationAr: "نبتون هو أبعد الكواكب المعترف بها عن الشمس.",
  },
  {
    id: 8,
    en: "What is at the center of our solar system?",
    ar: "ماذا يوجد في مركز المجموعة الشمسية؟",
    optionsEn: ["Earth", "The Moon", "The Sun", "Jupiter"],
    optionsAr: ["الأرض", "القمر", "الشمس", "المشتري"],
    answer: 2,
    explanationEn: "The Sun is at the center of our solar system.",
    explanationAr: "تقع الشمس في مركز المجموعة الشمسية.",
  },
];

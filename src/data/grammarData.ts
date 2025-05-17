export interface GrammarRule {
  id: number;
  title: string;
  definition: string;
  whenToUse: string;
  howToUse: string;
  example: string;
  translation: string;
}

export const grammarRules: GrammarRule[] = [
  {
    id: 1,
    title: "Present Continuous",
    definition: "Actions happening now or around the present time.",
    whenToUse: "For current actions, temporary situations, future arrangements, or annoying habits.",
    howToUse: "am/is/are + verb-ing",
    example: "She is studying for her exam.",
    translation: "هي تدرس للامتحان الآن"
  },
  {
    id: 2,
    title: "Stative Verbs",
    definition: "Verbs that describe states (thoughts, feelings, senses, possessions) rather than actions.",
    whenToUse: "For permanent states, not actions. Often not used in continuous tenses.",
    howToUse: "Use simple tenses with these verbs (know, believe, love, own, etc.)",
    example: "I know the answer. (Not: I am knowing the answer)",
    translation: "أنا أعرف الإجابة"
  },
  {
    id: 3,
    title: "Future Perfect",
    definition: "To talk about something that will be completed before a certain future time.",
    whenToUse: "For actions that will be finished by a specific point in the future.",
    howToUse: "will have + past participle",
    example: "By next year, I will have graduated.",
    translation: "بحلول العام المقبل، سأكون قد تخرجت"
  },
  {
    id: 4,
    title: "Comparative Phrases",
    definition: "Phrases used to compare differences between people or things.",
    whenToUse: "To express similarities or differences in degree or quantity.",
    howToUse: "Use modifiers with comparative forms (much/far/slightly + comparative)",
    example: "She is much taller than her sister. This task is far more difficult than I expected.",
    translation: "هي أطول بكثير من أختها. هذه المهمة أصعب بكثير مما توقعت"
  },
  {
    id: 5,
    title: "Used to / Didn't Use to",
    definition: "Expresses past habits or states that are no longer true.",
    whenToUse: "For talking about things that happened regularly in the past but don't happen now.",
    howToUse: "used to + base verb / didn't use to + base verb",
    example: "I used to play the piano. She didn't use to like coffee.",
    translation: "كنت أعزف البيانو. لم تكن تحب القهوة"
  },
  {
    id: 6,
    title: "Past Perfect",
    definition: "Describes an action completed before another past action or time.",
    whenToUse: "For actions completed before another past action or time.",
    howToUse: "had + past participle",
    example: "She had left before I arrived.",
    translation: "كانت قد غادرت قبل أن أصل"
  },
  {
    id: 7,
    title: "Past Perfect Passive",
    definition: "Focuses on the result of an earlier action being done to the subject.",
    whenToUse: "When emphasizing the recipient of an action that happened before another past action.",
    howToUse: "had been + past participle",
    example: "The cake had been eaten before the guests arrived.",
    translation: "كانت الكعكة قد أُكلت قبل وصول الضيوف"
  },
  {
    id: 8,
    title: "Adjectives and Adverbs",
    definition: "Adjectives describe nouns. Adverbs describe verbs, adjectives, or other adverbs.",
    whenToUse: "Adjectives for nouns, adverbs for verbs or adjective modification.",
    howToUse: "Place adjective before noun, adverb after verb or before adjective. Many adverbs end in -ly.",
    example: "She is a careful driver. She drives carefully.",
    translation: "هي سائقة حذرة. هي تقود بحذر"
  },
  {
    id: 9,
    title: "Tag Questions",
    definition: "Short questions added to the end of a statement to confirm or check information.",
    whenToUse: "To confirm information or seek agreement.",
    howToUse: "Statement + tag (using auxiliary verb). Positive statement → negative tag; Negative statement → positive tag.",
    example: "You're coming to the party, aren't you?",
    translation: "أنت قادم إلى الحفلة، أليس كذلك؟"
  },
  {
    id: 10,
    title: "Defining Relative Clauses",
    definition: "Gives essential information about the noun it refers to.",
    whenToUse: "When the information is necessary to identify which person or thing we are talking about.",
    howToUse: "Use who/which/that without commas.",
    example: "The man who called you is my brother.",
    translation: "الرجل الذي اتصل بك هو أخي"
  },
  {
    id: 11,
    title: "Non-defining Relative Clauses",
    definition: "Adds extra information about the noun that is not essential for identification.",
    whenToUse: "When giving additional information that could be removed without changing the meaning.",
    howToUse: "Use who/which/whose with commas.",
    example: "My brother, who lives in London, is visiting us.",
    translation: "أخي، الذي يعيش في لندن، يزورنا"
  }
];

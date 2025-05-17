export interface FullExam {
  id: string;
  title: string;
  description: string;
  timeAllowed: string;
  totalMarks: number;
  sections: ExamSection[];
}

export interface ExamSection {
  id: string;
  title: string;
  description?: string;
  marks: number;
  content: string;
}

export const fullExam: FullExam = {
  id: "full-practice-exam-1",
  title: "English Language Practice Exam",
  description: "A complete practice exam for intermediate-level English learners",
  timeAllowed: "60 minutes",
  totalMarks: 50,
  sections: [
    {
      id: "multiple-choice",
      title: "Multiple Choice Questions",
      description: "Choose the correct answer (A, B, C, or D)",
      marks: 16,
      content: `
        <ol class="list-decimal pl-6 space-y-4">
          <li>I am going to ___ my brother up from the airport when he arrives.<br>
              A. pick<br>
              B. stand<br>
              C. leave<br>
              D. sit
          </li>
          <li>I love this sports club because all my favourite sports ___ are here.<br>
              A. difficulties<br>
              B. obstacles<br>
              C. facilities<br>
              D. drawbacks
          </li>
          <li>When you travel abroad, you might ___ before you get used to the new style of life.<br>
              A. hide<br>
              B. hike<br>
              C. struggle<br>
              D. trouble
          </li>
          <li>I'm sorry I can't go to your party. I ___ to the dentist that afternoon.<br>
              A. am going<br>
              B. go<br>
              C. went<br>
              D. going
          </li>
          <li>A technician ___ the air conditioner before we move into the new house.<br>
              A. has checked<br>
              B. will have checked<br>
              C. had checked<br>
              D. checked
          </li>
          <li>By this time next week I ___ all my exams.<br>
              A. am finishing<br>
              B. finished<br>
              C. have finished<br>
              D. will have finished
          </li>
          <li>The police were on the ___ of the car accident in minutes.<br>
              A. vision<br>
              B. sight<br>
              C. scene<br>
              D. view
          </li>
          <li>Ali ___ to loud music and it's so annoying to all of us.<br>
              A. is always listening<br>
              B. always listened<br>
              C. never listens<br>
              D. is never listening
          </li>
          <li>The Cairo Metro network is now a lot bigger, and the ___ work is in progress.<br>
              A. intention<br>
              B. expansion<br>
              C. suggestion<br>
              D. destruction
          </li>
          <li>This man is a ___; he betrayed his friends.<br>
              A. reliable<br>
              B. loyal<br>
              C. traitor<br>
              D. believer
          </li>
          <li>Which test ___ by next week?<br>
              A. will you have had<br>
              B. had you had<br>
              C. will you have<br>
              D. you are going to have
          </li>
          <li>In the play I watched yesterday, the hero was ___ for power; he tried to replace the king.<br>
              A. angry<br>
              B. thirsty<br>
              C. hungry<br>
              D. lazy
          </li>
          <li>By the end of next summer, scientists ___ a vaccine for COVID-19. Who knows?<br>
              A. will have discovered<br>
              B. might have discovered<br>
              C. will discover<br>
              D. might discover
          </li>
          <li>High-tech systems were used to build this 21st century public ___ system. This helps people to travel easier than before.<br>
              A. opinion<br>
              B. amusement<br>
              C. transport<br>
              D. transplant
          </li>
          <li>I think the workers ___ that project before the end of next month; the task is really difficult.<br>
              A. won't finish<br>
              B. haven't finished<br>
              C. will have finished<br>
              D. won't have finished
          </li>
          <li>This digital camera ___ to my friend Mai.<br>
              A. belongs<br>
              B. belong<br>
              C. have belonged<br>
              D. has belonged
          </li>
        </ol>
      `
    },
    {
      id: "fill-in-the-gaps",
      title: "Fill in the Gaps",
      description: "Complete the letter with one word in each space",
      marks: 6,
      content: `
        <div class="bg-gray-100 p-4 rounded">
          <p><strong>Dear Mum,</strong></p>
          <p>How are you? I'm <strong>___</strong> a great time here in London! There are lots of new things to do and see. I can't believe that by Friday I will <strong>___</strong> here for two weeks already! Please don't worry, I'm <strong>___</strong> well. My host family are great! This afternoon we're <strong>___</strong> to the cinema together to watch a science fiction film. It's all about how life <strong>___</strong> by the year 2080 and it says that we will have <strong>___</strong> for all diseases!</p>
          <p>Lots of love,<br>Taha</p>
        </div>
      `
    },
    {
      id: "translation",
      title: "Translation",
      marks: 10,
      content: `
        <div class="mb-6">
          <h4 class="font-medium mb-2">A. Translate the following into <strong>Arabic</strong>: (5 marks)</h4>
          <p class="italic mb-2">It is very important for teenagers to set a clear goal for their life. Setting goals helps them take control of their lives and get maximum results.</p>
          <div class="h-16 border border-gray-300 rounded"></div>
        </div>
        
        <div>
          <h4 class="font-medium mb-2">B. Translate the following into <strong>English</strong>: (5 marks)</h4>
          <p class="mb-2" dir="rtl">يوجد الكثير من المزايا و العيوب في السفر للخارج، من أحد المزايا هو أن المرء يستطيع اكتساب الخبرات و الإلمام بالثقافات الأخرى، و من أهم العيوب هو عدم مشاركتهم في مشروعات التنمية ببلدهم.</p>
          <div class="h-16 border border-gray-300 rounded"></div>
        </div>
      `
    },
    {
      id: "reading-comprehension",
      title: "Reading Comprehension",
      marks: 18,
      content: `
        <div class="mb-6">
          <h4 class="font-medium mb-2">Text: Taxis to the Moon</h4>
          <div class="bg-gray-100 p-4 rounded mb-4">
            <p class="mb-2">In 1969, newspaper headlines told us that walking on the moon was possible. Since then, scientists have continued their research to create high-tech machines to advance space exploration. Because of this, news reporters are now telling us that we may all have the chance to visit the moon one day.</p>
            <p class="mb-2">Only twenty-four humans have ever visited the moon, but by 2024 a Japanese businessman called Yusaku Maezawa will have become number twenty-five. The only problem is that the rocket he will travel in has not been built yet.</p>
            <p class="mb-2">Yusaku will be travelling in a high-tech rocket, known as the Big Falcon Rocket, which will have seven engines and will be able to carry one hundred passengers. Once it has been built, the 118-meter-high rocket will eventually carry passengers around the Moon, allowing space travel for anyone who can pay the price of the flight.</p>
            <p>The cost of the flight might be a problem to anyone who isn't Yusaku, who is thought to be paying over £52 million for his flight!</p>
          </div>
        </div>
        
        <div>
          <h4 class="font-medium mb-2">Questions:</h4>
          <ol class="list-decimal pl-6 space-y-4">
            <li><strong>What does the article say about future space travel?</strong><br>
                A. Only scientists will be able to travel to the moon.<br>
                B. Everyone will be able to walk on the moon.<br>
                C. We may all have the chance to visit the moon one day.<br>
                D. Space travel will be free for everyone.
            </li>
            <li><strong>Who will be the 25th person to visit the moon?</strong><br>
                A. An American scientist<br>
                B. A Russian astronaut<br>
                C. A Japanese businessman<br>
                D. A French engineer
            </li>
            <li><strong>What is special about the Big Falcon Rocket?</strong><br>
                A. It has five engines.<br>
                B. It can carry 100 passengers.<br>
                C. It costs £52 million.<br>
                D. It was built in 2024.
            </li>
            <li><strong>What is the main problem with the rocket?</strong><br>
                A. It is too expensive.<br>
                B. It has not been built yet.<br>
                C. It is unsafe.<br>
                D. It is too small.
            </li>
            <li><strong>How much is Yusaku Maezawa paying for his trip?</strong><br>
                A. Around £50 million<br>
                B. Over £52 million<br>
                C. Exactly £52 million<br>
                D. Less than £50 million
            </li>
            <li><strong>According to the text, what is the main barrier for others wanting to travel to the moon?</strong><br>
                A. Lack of interest<br>
                B. Technical problems<br>
                C. Cost<br>
                D. Time
            </li>
          </ol>
        </div>
      `
    }
  ]
};

export const answerKey = {
  "multiple-choice": ["A", "C", "C", "A", "B", "D", "C", "D", "B", "C", "A", "C", "A", "C", "A", "A"],
  "fill-in-the-gaps": ["having", "have been", "doing", "going", "will have changed", "a cure"],
  "translation": {
    "arabic": "من المهم جدًا للمراهقين أن يضعوا هدفًا واضحًا لحياتهم. إن وضع الأهداف يساعدهم على تحمل مسؤولية حياتهم والحصول على أفضل النتائج.",
    "english": "There are many advantages and disadvantages to traveling abroad. One advantage is that a person can gain experience and become familiar with other cultures, while one of the main disadvantages is that they do not participate in development projects in their own country."
  },
  "reading-comprehension": ["C", "C", "B", "B", "B", "C"]
}; 
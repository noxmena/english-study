export interface ReadingWritingExam {
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

export const spaceReadingExam: ReadingWritingExam = {
  id: "space-reading-exam-1",
  title: "Space Exploration Reading & Writing Exam",
  description: "Reading comprehension about space travel and creative writing tasks",
  timeAllowed: "45 minutes",
  totalMarks: 40,
  sections: [
    {
      id: "reading-comprehension",
      title: "Reading Comprehension",
      description: "Read the text and answer the questions",
      marks: 20,
      content: `
        <div class="mb-6">
          <h4 class="font-medium mb-2">Text: Space Exploration</h4>
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
            <li><strong>In the future we will...</strong><br>
                A. have the opportunity to travel to the moon<br>
                B. see one-hundred people travel into space every day<br>
                C. see a Japanese businessman build a rocket<br>
                D. be able to go to the moon without a rocket
            </li>
            <li><strong>In 1969, headlines told us that walking on the moon:</strong><br>
                A. was impossible<br>
                B. would not happen in 1969<br>
                C. was possible<br>
                D. needed a special rocket
            </li>
            <li><strong>What is the problem with the rocket?</strong><br>
                A. It needs more passengers before it flies<br>
                B. It does not exist at the moment<br>
                C. It is too tall to fly correctly<br>
                D. It's not strong enough
            </li>
            <li><strong>How much will it cost Yusaku?</strong><br>
                A. £52 million<br>
                B. 52 million LE<br>
                C. €25 million<br>
                D. €125 million
            </li>
          </ol>
        </div>
      `
    },
    {
      id: "open-questions",
      title: "Open-ended Questions",
      description: "Answer these questions with your own ideas",
      marks: 10,
      content: `
        <ol class="list-decimal pl-6 space-y-4">
          <li><strong>Would you like to fly to the moon? Why?</strong><br>
            <div class="h-20 border border-gray-300 rounded mt-2"></div>
          </li>
          <li><strong>Do you expect space travel will be cheaper in the future? Why?</strong><br>
            <div class="h-20 border border-gray-300 rounded mt-2"></div>
          </li>
          <li><strong>How important is it to continue travelling to other planets?</strong><br>
            <div class="h-20 border border-gray-300 rounded mt-2"></div>
          </li>
        </ol>
      `
    },
    {
      id: "writing-task",
      title: "Writing Task",
      description: "Choose one option and write about 180 words",
      marks: 10,
      content: `
        <div class="space-y-8">
          <div>
            <h4 class="font-medium mb-3">Option 1: Email to Local Government</h4>
            <p class="mb-3">Write an email to your local government about the progress in the means of transport in your town. Give some suggestions about how technology could help improve transportation.</p>
            
            <p class="mb-1">Use this structure:</p>
            <ul class="list-disc pl-6 mb-4">
              <li>Greeting</li>
              <li>Introduction: Mention current transport situation</li>
              <li>Suggestions using technology (e.g., smart traffic lights, electric buses, ride-sharing apps)</li>
              <li>Conclusion: Thank them and express hope for improvement</li>
              <li>Closing</li>
            </ul>
            
            <div class="h-40 border border-gray-300 rounded mt-2"></div>
          </div>
          
          <div>
            <h4 class="font-medium mb-3">Option 2: Diary Entry – Living in London</h4>
            <p class="mb-3">Write a diary entry about living in London. Include details about how the people, food, weather, and customs are different from what you're used to.</p>
            
            <p class="mb-1">Use this structure:</p>
            <ul class="list-disc pl-6 mb-4">
              <li>Date and greeting</li>
              <li>Describe your feelings about living in London</li>
              <li>Compare people, food, weather, and customs with your home country</li>
              <li>End with your thoughts or plans for the future</li>
            </ul>
            
            <div class="h-40 border border-gray-300 rounded mt-2"></div>
          </div>
        </div>
      `
    }
  ]
};

export const answerKey = {
  "reading-comprehension": ["A", "C", "B", "A"],
  "open-questions": {
    "example-answers": [
      "Yes, I would love to fly to the moon because it would be an amazing experience to see Earth from space and explore another world.",
      "Yes, I think space travel will become cheaper as technology improves and more companies get involved, just like how computers became cheaper over time.",
      "It's very important because exploring other planets helps us understand the universe better and could lead to new scientific discoveries and even alternative places to live if needed."
    ]
  },
  "writing-task": {
    "example-email": `
Dear Sir/Madam,

I am writing to discuss the current transportation situation in our town. While we have made progress with regular bus services and improved roads, there are still issues with traffic congestion and limited options for residents without cars.

I would like to suggest several technology-based improvements. First, implementing smart traffic lights that adjust timing based on traffic flow could reduce congestion significantly. Second, introducing electric buses would not only reduce pollution but also lower operating costs long-term. Finally, developing a town-specific ride-sharing app would help residents coordinate transportation efficiently.

Thank you for considering these suggestions. I hope to see continued improvement in our transportation infrastructure for the benefit of all residents.

Yours faithfully,
[Name]
    `,
    "example-diary": `
May 15, 2023
Dear Diary,

I've been living in London for three weeks now, and it's been quite an adjustment! The people here are more reserved than back home - they don't strike up conversations with strangers as easily, but they're incredibly polite.

The food here is so diverse! I can find cuisines from all over the world, though I miss my mom's home cooking. British dishes like fish and chips are tasty but heavier than what I'm used to eating.

The weather is definitely cooler and more unpredictable than back home. I've learned to always carry an umbrella because it can rain without warning!

As for customs, people queue (line up) for everything here, and it's considered very rude to cut in line. Public transportation etiquette is also important - no loud talking on the tube!

I'm starting to feel more at home each day, and I'm planning to explore more of the UK in the coming months. I think this experience will really broaden my perspective.

Until tomorrow,
[Name]
    `
  }
}; 
import React, { useState } from 'react';
import { ReadingWritingExam as ReadingExamType, answerKey } from '@/data/spaceReadingExam';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

interface SpaceReadingExamProps {
  exam: ReadingExamType;
  showAnswers?: boolean;
}

interface UserAnswers {
  'reading-comprehension': string[];
  'open-questions': string[];
  'writing-task': {
    option: 'email' | 'diary' | null;
    content: string;
  };
}

const SpaceReadingExam: React.FC<SpaceReadingExamProps> = ({ exam, showAnswers = false }) => {
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [examMode, setExamMode] = useState<'view' | 'take' | 'results'>('view');
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({
    'reading-comprehension': Array(4).fill(''),
    'open-questions': Array(3).fill(''),
    'writing-task': {
      option: null,
      content: ''
    }
  });
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<{
    score: number;
    totalMarks: number;
    sectionScores: {[key: string]: {correct: number, total: number}};
  } | null>(null);
  const [writingOption, setWritingOption] = useState<'email' | 'diary' | null>(null);

  const handleStartExam = () => {
    setExamMode('take');
    setCurrentSection(0);
    setCurrentQuestionIndex(0);
    setUserAnswers({
      'reading-comprehension': Array(4).fill(''),
      'open-questions': Array(3).fill(''),
      'writing-task': {
        option: null,
        content: ''
      }
    });
  };

  const handleReadingComprehensionAnswer = (questionIndex: number, answer: string) => {
    const newAnswers = [...userAnswers['reading-comprehension']];
    newAnswers[questionIndex] = answer;
    setUserAnswers({
      ...userAnswers,
      'reading-comprehension': newAnswers
    });
  };

  const handleOpenQuestionAnswer = (questionIndex: number, answer: string) => {
    const newAnswers = [...userAnswers['open-questions']];
    newAnswers[questionIndex] = answer;
    setUserAnswers({
      ...userAnswers,
      'open-questions': newAnswers
    });
  };

  const handleWritingTaskAnswer = (content: string) => {
    setUserAnswers({
      ...userAnswers,
      'writing-task': {
        ...userAnswers['writing-task'],
        content
      }
    });
  };

  const handleSelectWritingOption = (option: 'email' | 'diary') => {
    setWritingOption(option);
    setUserAnswers({
      ...userAnswers,
      'writing-task': {
        option,
        content: userAnswers['writing-task'].content
      }
    });
  };

  const currentSectionId = exam.sections[currentSection]?.id;
  
  const handleNextQuestion = () => {
    if (currentSectionId === 'reading-comprehension') {
      if (currentQuestionIndex < 3) { // 4 questions (0-3)
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCurrentSection(currentSection + 1);
        setCurrentQuestionIndex(0);
      }
    } else if (currentSectionId === 'open-questions') {
      if (currentQuestionIndex < 2) { // 3 questions (0-2)
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCurrentSection(currentSection + 1);
        setCurrentQuestionIndex(0);
      }
    } else if (currentSectionId === 'writing-task') {
      // Last section
      setExamMode('results');
      calculateResults();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      
      if (exam.sections[currentSection - 1]?.id === 'reading-comprehension') {
        setCurrentQuestionIndex(3); // Last reading comprehension question
      } else if (exam.sections[currentSection - 1]?.id === 'open-questions') {
        setCurrentQuestionIndex(2); // Last open question
      }
    }
  };

  const calculateResults = () => {
    let totalScore = 0;
    const sectionScores: {[key: string]: {correct: number, total: number}} = {};

    // Check reading comprehension (multiple choice)
    const rcCorrect = userAnswers['reading-comprehension'].filter(
      (answer, index) => answer === answerKey['reading-comprehension'][index]
    ).length;
    totalScore += rcCorrect * 5; // 5 points per question
    sectionScores['reading-comprehension'] = {
      correct: rcCorrect,
      total: 4
    };

    // For open questions, give points if they're not empty
    // In a real app you would have a teacher grade these
    const openQuestionsAnswered = userAnswers['open-questions'].filter(answer => answer.trim().length > 0).length;
    totalScore += openQuestionsAnswered * 3; // 3 points per question
    sectionScores['open-questions'] = {
      correct: openQuestionsAnswered,
      total: 3
    };

    // For writing task, give points if option selected and content not empty
    // In a real app you would have a teacher grade this
    const writingTaskScore = 
      userAnswers['writing-task'].option && 
      userAnswers['writing-task'].content.trim().length > 50 ? 10 : 0;
    totalScore += writingTaskScore;
    sectionScores['writing-task'] = {
      correct: writingTaskScore > 0 ? 1 : 0,
      total: 1
    };

    setResults({
      score: totalScore,
      totalMarks: exam.totalMarks,
      sectionScores
    });
  };

  const renderCurrentQuestion = () => {
    if (examMode !== 'take') return null;

    const section = exam.sections[currentSection];
    
    if (section.id === 'reading-comprehension') {
      // For the first question, show the reading passage
      if (currentQuestionIndex === 0) {
        return (
          <div className="p-4 border rounded-lg bg-white">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-medium">Reading Text</h3>
            </div>
            
            <div className="bg-gray-100 p-4 rounded mb-4">
              <p className="mb-2">In 1969, newspaper headlines told us that walking on the moon was possible. Since then, scientists have continued their research to create high-tech machines to advance space exploration. Because of this, news reporters are now telling us that we may all have the chance to visit the moon one day.</p>
              <p className="mb-2">Only twenty-four humans have ever visited the moon, but by 2024 a Japanese businessman called Yusaku Maezawa will have become number twenty-five. The only problem is that the rocket he will travel in has not been built yet.</p>
              <p className="mb-2">Yusaku will be travelling in a high-tech rocket, known as the Big Falcon Rocket, which will have seven engines and will be able to carry one hundred passengers. Once it has been built, the 118-meter-high rocket will eventually carry passengers around the Moon, allowing space travel for anyone who can pay the price of the flight.</p>
              <p>The cost of the flight might be a problem to anyone who isn't Yusaku, who is thought to be paying over £52 million for his flight!</p>
            </div>
            <Button onClick={() => setCurrentQuestionIndex(1)}>Start Answering Questions</Button>
          </div>
        );
      }
      
      // Get question based on index
      const questionIndex = currentQuestionIndex - 1; // Adjust for the reading passage
      
      let questionText = '';
      let options: { label: string, value: string }[] = [];
      
      if (questionIndex === 0) {
        questionText = "In the future we will...";
        options = [
          { label: "have the opportunity to travel to the moon", value: "A" },
          { label: "see one-hundred people travel into space every day", value: "B" },
          { label: "see a Japanese businessman build a rocket", value: "C" },
          { label: "be able to go to the moon without a rocket", value: "D" }
        ];
      } else if (questionIndex === 1) {
        questionText = "In 1969, headlines told us that walking on the moon:";
        options = [
          { label: "was impossible", value: "A" },
          { label: "would not happen in 1969", value: "B" },
          { label: "was possible", value: "C" },
          { label: "needed a special rocket", value: "D" }
        ];
      } else if (questionIndex === 2) {
        questionText = "What is the problem with the rocket?";
        options = [
          { label: "It needs more passengers before it flies", value: "A" },
          { label: "It does not exist at the moment", value: "B" },
          { label: "It is too tall to fly correctly", value: "C" },
          { label: "It's not strong enough", value: "D" }
        ];
      } else if (questionIndex === 3) {
        questionText = "How much will it cost Yusaku?";
        options = [
          { label: "£52 million", value: "A" },
          { label: "52 million LE", value: "B" },
          { label: "€25 million", value: "C" },
          { label: "€125 million", value: "D" }
        ];
      }
      
      return (
        <div className="p-4 border rounded-lg bg-white">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-medium">Question {questionIndex + 1}</h3>
            <div className="text-sm text-gray-500">{questionIndex + 1} of 4</div>
          </div>
          
          <p className="mb-6"><strong>{questionText}</strong></p>
          
          <RadioGroup 
            value={userAnswers['reading-comprehension'][questionIndex]} 
            onValueChange={(value) => handleReadingComprehensionAnswer(questionIndex, value)}
            className="space-y-3"
          >
            {options.map((option, i) => (
              <div key={`rc-option-${i}`} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option.value} 
                  id={`rc-option-${option.value}`} 
                />
                <Label htmlFor={`rc-option-${option.value}`} className="cursor-pointer">
                  {option.value}. {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );
    } else if (section.id === 'open-questions') {
      // Open-ended questions
      const questionTexts = [
        "Would you like to fly to the moon? Why?",
        "Do you expect space travel will be cheaper in the future? Why?",
        "How important is it to continue travelling to other planets?"
      ];
      
      return (
        <div className="p-4 border rounded-lg bg-white">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-medium">Question {currentQuestionIndex + 1}</h3>
            <div className="text-sm text-gray-500">{currentQuestionIndex + 1} of 3</div>
          </div>
          
          <p className="mb-4"><strong>{questionTexts[currentQuestionIndex]}</strong></p>
          
          <Textarea 
            value={userAnswers['open-questions'][currentQuestionIndex]}
            onChange={(e) => handleOpenQuestionAnswer(currentQuestionIndex, e.target.value)}
            className="min-h-[150px]"
            placeholder="Write your answer here..."
          />
        </div>
      );
    } else if (section.id === 'writing-task') {
      // Writing task
      return (
        <div className="p-4 border rounded-lg bg-white">
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">Writing Task</h3>
            <p className="text-gray-600">Choose one option and write about 180 words</p>
          </div>
          
          <div className="mb-6">
            <div className="flex gap-4 mb-4">
              <Button 
                variant={writingOption === 'email' ? 'default' : 'outline'}
                onClick={() => handleSelectWritingOption('email')}
                className="flex-1"
              >
                Option 1: Email to Local Government
              </Button>
              <Button 
                variant={writingOption === 'diary' ? 'default' : 'outline'}
                onClick={() => handleSelectWritingOption('diary')}
                className="flex-1"
              >
                Option 2: Diary Entry – Living in London
              </Button>
            </div>
            
            {writingOption === 'email' && (
              <div className="mb-6">
                <h4 className="font-medium mb-3">Email to Local Government</h4>
                <p className="mb-3">Write an email to your local government about the progress in the means of transport in your town. Give some suggestions about how technology could help improve transportation.</p>
                
                <p className="mb-1">Use this structure:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Greeting</li>
                  <li>Introduction: Mention current transport situation</li>
                  <li>Suggestions using technology (e.g., smart traffic lights, electric buses, ride-sharing apps)</li>
                  <li>Conclusion: Thank them and express hope for improvement</li>
                  <li>Closing</li>
                </ul>
              </div>
            )}
            
            {writingOption === 'diary' && (
              <div className="mb-6">
                <h4 className="font-medium mb-3">Diary Entry – Living in London</h4>
                <p className="mb-3">Write a diary entry about living in London. Include details about how the people, food, weather, and customs are different from what you're used to.</p>
                
                <p className="mb-1">Use this structure:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Date and greeting</li>
                  <li>Describe your feelings about living in London</li>
                  <li>Compare people, food, weather, and customs with your home country</li>
                  <li>End with your thoughts or plans for the future</li>
                </ul>
              </div>
            )}
            
            <Textarea 
              value={userAnswers['writing-task'].content}
              onChange={(e) => handleWritingTaskAnswer(e.target.value)}
              className="min-h-[300px]"
              placeholder="Write your answer here..."
              disabled={!writingOption}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  const renderResults = () => {
    if (!results) return null;

    const percentage = Math.round((results.score / results.totalMarks) * 100);
    
    let feedbackMessage = "";
    let feedbackIcon = null;
    
    if (percentage >= 90) {
      feedbackMessage = "Excellent! You've achieved a remarkable score.";
      feedbackIcon = <CheckCircle2 className="h-10 w-10 text-green-500" />;
    } else if (percentage >= 70) {
      feedbackMessage = "Great job! You've done well on this exam.";
      feedbackIcon = <CheckCircle2 className="h-10 w-10 text-green-400" />;
    } else if (percentage >= 50) {
      feedbackMessage = "Good effort! You've passed the exam.";
      feedbackIcon = <CheckCircle2 className="h-10 w-10 text-green-300" />;
    } else {
      feedbackMessage = "You need more practice. Keep studying!";
      feedbackIcon = <AlertCircle className="h-10 w-10 text-amber-500" />;
    }
    
    return (
      <div className="p-6 border rounded-lg bg-white">
        <div className="flex flex-col items-center justify-center mb-6">
          {feedbackIcon}
          <h2 className="text-2xl font-bold mt-3">Your Score: {results.score}/{results.totalMarks}</h2>
          <p className="text-gray-600">{percentage}% - {feedbackMessage}</p>
          
          <div className="w-full mt-4">
            <Progress value={percentage} className="h-2" />
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(results.sectionScores).map(([sectionId, score]) => {
            const section = exam.sections.find(s => s.id === sectionId);
            
            if (!section) return null;
            
            let sectionPercentage = 0;
            if (sectionId === 'writing-task') {
              sectionPercentage = score.correct * 100;
            } else {
              sectionPercentage = Math.round((score.correct / score.total) * 100);
            }
            
            return (
              <div key={sectionId} className="p-4 border rounded">
                <h3 className="font-medium">{section.title}</h3>
                <p className="text-sm text-gray-600">
                  {score.correct}/{score.total} correct ({sectionPercentage}%)
                </p>
                <Progress value={sectionPercentage} className="h-1 mt-2" />
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 flex justify-center gap-4">
          {showAnswers && (
            <Button 
              variant="outline" 
              onClick={() => setShowAnswerKey(!showAnswerKey)}
            >
              {showAnswerKey ? "Hide Answer Key" : "Show Answer Key"}
            </Button>
          )}
          <Button onClick={() => setExamMode('view')}>Return to Exam View</Button>
        </div>
        
        {showAnswerKey && (
          <div className="mt-4 p-4 border border-green-200 bg-green-50 rounded-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
              Answer Key
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Reading Comprehension</h4>
                <ol className="list-decimal pl-6">
                  {answerKey["reading-comprehension"].map((answer, index) => (
                    <li key={`reading-${index}`} className="text-sm">
                      {answer}
                    </li>
                  ))}
                </ol>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Open Questions (Example Answers)</h4>
                <ol className="list-decimal pl-6">
                  {answerKey["open-questions"]["example-answers"].map((answer, index) => (
                    <li key={`open-${index}`} className="text-sm">
                      {answer}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Writing Task (Example Answers)</h4>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="email">
                  <AccordionTrigger>Email to Local Government</AccordionTrigger>
                  <AccordionContent>
                    <div className="whitespace-pre-line text-sm">
                      {answerKey["writing-task"]["example-email"]}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="diary">
                  <AccordionTrigger>Diary Entry – Living in London</AccordionTrigger>
                  <AccordionContent>
                    <div className="whitespace-pre-line text-sm">
                      {answerKey["writing-task"]["example-diary"]}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Calculate progress for question-by-question mode
  let totalQuestions = 1 + 4 + 3 + 1; // Reading text + reading questions + open questions + writing task
  let currentQuestionNumber = 0;
  
  if (currentSection === 0) { // Reading comprehension
    currentQuestionNumber = currentQuestionIndex + 1;
  } else if (currentSection === 1) { // Open questions
    currentQuestionNumber = 5 + currentQuestionIndex;
  } else if (currentSection === 2) { // Writing task
    currentQuestionNumber = 8;
  }
  
  const progressPercentage = (currentQuestionNumber / totalQuestions) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {examMode === 'view' && (
        <>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{exam.title}</h2>
              <p className="text-gray-600">{exam.description}</p>
            </div>
            <div className="text-right">
              <p><strong>Time Allowed:</strong> {exam.timeAllowed}</p>
              <p><strong>Total Marks:</strong> {exam.totalMarks}</p>
            </div>
          </div>

          <div className="mb-4">
            <p><strong>Student Name:</strong> ________________________</p>
            <p><strong>Date:</strong> ________________________</p>
          </div>

          <hr className="my-6" />

          <Accordion type="single" collapsible defaultValue={exam.sections[0].id} className="space-y-4">
            {exam.sections.map((section) => (
              <AccordionItem key={section.id} value={section.id} className="border rounded-md px-4">
                <AccordionTrigger className="py-4">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="text-xl font-semibold">
                      {section.title}
                      {section.description && (
                        <span className="text-sm font-normal text-gray-500 ml-2">- {section.description}</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{section.marks} marks</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-6 flex justify-center gap-4">
            <Button className="px-8" onClick={handleStartExam}>
              Take Exam Question by Question
            </Button>
            <Button className="px-8" variant="outline">
              Print Exam
            </Button>
          </div>
        </>
      )}

      {examMode === 'take' && (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">{exam.title}</h2>
              <div className="text-sm text-gray-500">
                Question {currentQuestionNumber} of {totalQuestions}
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {renderCurrentQuestion()}
          
          <div className="mt-6 flex justify-between">
            <Button 
              onClick={handlePrevQuestion} 
              variant="outline"
              disabled={currentSection === 0 && currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            <Button 
              onClick={handleNextQuestion}
              disabled={
                (currentSectionId === 'writing-task' && 
                  (!userAnswers['writing-task'].option || 
                   userAnswers['writing-task'].content.length < 10))
              }
            >
              {currentSection === exam.sections.length - 1 ? 'Submit Exam' : 'Next Question'}
            </Button>
          </div>
        </>
      )}

      {examMode === 'results' && renderResults()}
    </div>
  );
};

export default SpaceReadingExam; 
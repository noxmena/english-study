import React, { useState } from 'react';
import { FullExam as FullExamType, answerKey } from '@/data/fullExam';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

interface FullExamProps {
  exam: FullExamType;
  showAnswers?: boolean;
}

interface UserAnswers {
  'multiple-choice': string[];
  'fill-in-the-gaps': string[];
  'translation': {
    arabic: string;
    english: string;
  };
  'reading-comprehension': string[];
}

const FullExam: React.FC<FullExamProps> = ({ exam, showAnswers = false }) => {
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [examMode, setExamMode] = useState<'view' | 'take' | 'results'>('view');
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({
    'multiple-choice': Array(16).fill(''),
    'fill-in-the-gaps': Array(6).fill(''),
    'translation': {
      arabic: '',
      english: ''
    },
    'reading-comprehension': Array(6).fill('')
  });
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<{
    score: number;
    totalMarks: number;
    sectionScores: {[key: string]: {correct: number, total: number}};
  } | null>(null);

  const handleStartExam = () => {
    setExamMode('take');
    setCurrentSection(0);
    setCurrentQuestionIndex(0);
    setUserAnswers({
      'multiple-choice': Array(16).fill(''),
      'fill-in-the-gaps': Array(6).fill(''),
      'translation': {
        arabic: '',
        english: ''
      },
      'reading-comprehension': Array(6).fill('')
    });
  };

  const handleMultipleChoiceAnswer = (questionIndex: number, answer: string) => {
    const newAnswers = [...userAnswers['multiple-choice']];
    newAnswers[questionIndex] = answer;
    setUserAnswers({
      ...userAnswers,
      'multiple-choice': newAnswers
    });
  };

  const handleFillInGapsAnswer = (index: number, answer: string) => {
    const newAnswers = [...userAnswers['fill-in-the-gaps']];
    newAnswers[index] = answer;
    setUserAnswers({
      ...userAnswers,
      'fill-in-the-gaps': newAnswers
    });
  };

  const handleTranslationAnswer = (type: 'arabic' | 'english', answer: string) => {
    setUserAnswers({
      ...userAnswers,
      'translation': {
        ...userAnswers.translation,
        [type]: answer
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

  const currentSectionId = exam.sections[currentSection]?.id;
  
  const handleNextQuestion = () => {
    if (currentSectionId === 'multiple-choice') {
      if (currentQuestionIndex < 15) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCurrentQuestionIndex(0);
        setCurrentSection(currentSection + 1);
      }
    } else if (currentSectionId === 'reading-comprehension') {
      if (currentQuestionIndex < 5) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Last question of the last section
        setExamMode('results');
        calculateResults();
      }
    } else {
      // For sections that don't have individual questions
      setCurrentSection(currentSection + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      
      if (exam.sections[currentSection - 1]?.id === 'multiple-choice') {
        setCurrentQuestionIndex(15); // Last question of multiple choice
      } else if (exam.sections[currentSection - 1]?.id === 'reading-comprehension') {
        setCurrentQuestionIndex(5); // Last question of reading comprehension
      }
    }
  };

  const calculateResults = () => {
    let totalScore = 0;
    const sectionScores: {[key: string]: {correct: number, total: number}} = {};

    // Check multiple choice
    const mcCorrect = userAnswers['multiple-choice'].filter(
      (answer, index) => answer === answerKey['multiple-choice'][index]
    ).length;
    totalScore += mcCorrect;
    sectionScores['multiple-choice'] = {
      correct: mcCorrect,
      total: 16
    };

    // Check fill in the gaps
    const gapsCorrect = userAnswers['fill-in-the-gaps'].filter(
      (answer, index) => answer.toLowerCase() === answerKey['fill-in-the-gaps'][index].toLowerCase()
    ).length;
    totalScore += gapsCorrect;
    sectionScores['fill-in-the-gaps'] = {
      correct: gapsCorrect,
      total: 6
    };

    // For translation, give full marks if it's not empty (since we can't accurately check)
    // In a real app you would have a teacher check these
    const translationScore = userAnswers.translation.arabic && userAnswers.translation.english ? 10 : 0;
    totalScore += translationScore;
    sectionScores['translation'] = {
      correct: translationScore,
      total: 10
    };

    // Check reading comprehension
    const readingCorrect = userAnswers['reading-comprehension'].filter(
      (answer, index) => answer === answerKey['reading-comprehension'][index]
    ).length;
    totalScore += readingCorrect * 3; // Each question is worth 3 marks
    sectionScores['reading-comprehension'] = {
      correct: readingCorrect,
      total: 6
    };

    setResults({
      score: totalScore,
      totalMarks: exam.totalMarks,
      sectionScores
    });
  };

  const formatLetterOption = (index: number) => {
    return String.fromCharCode(65 + index); // A, B, C, D
  };

  const renderCurrentQuestion = () => {
    if (examMode !== 'take') return null;

    const section = exam.sections[currentSection];
    
    if (section.id === 'multiple-choice') {
      // Extract the current question text and options from the content HTML
      const questionMatches = section.content.match(/<li>(.*?)<\/li>/gs) || [];
      
      if (currentQuestionIndex >= questionMatches.length) return null;
      
      const questionHTML = questionMatches[currentQuestionIndex];
      const questionText = questionHTML.replace(/<br>.*$/s, '').replace(/<li>(.*?)(?=<br>|$)/s, '$1').trim();
      
      // Extract options
      const options: string[] = [];
      const optionRegex = /([A-D])\.\s*(.*?)(?=<br>|$)/g;
      let match;
      const optionMatches = [...questionHTML.matchAll(/([A-D])\.\s*(.*?)(?=<br>|$)/g)];
      
      return (
        <div className="p-4 border rounded-lg bg-white">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-medium">Question {currentQuestionIndex + 1}</h3>
            <div className="text-sm text-gray-500">{currentQuestionIndex + 1} of 16</div>
          </div>
          
          <p className="mb-6">{questionText}</p>
          
          <RadioGroup 
            value={userAnswers['multiple-choice'][currentQuestionIndex]} 
            onValueChange={(value) => handleMultipleChoiceAnswer(currentQuestionIndex, value)}
            className="space-y-3"
          >
            {optionMatches.map((match, index) => (
              <div key={`mc-option-${index}`} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={match[1]} 
                  id={`option-${match[1]}`} 
                />
                <Label htmlFor={`option-${match[1]}`} className="cursor-pointer">
                  {match[1]}. {match[2]}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );
    } else if (section.id === 'fill-in-the-gaps') {
      return (
        <div className="p-4 border rounded-lg bg-white">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-medium">Fill in the Gaps</h3>
          </div>
          
          <div className="bg-gray-100 p-4 rounded mb-6">
            <p><strong>Dear Mum,</strong></p>
            <p>
              How are you? I'm <Input 
                className="inline-block w-24 mx-1 h-8 px-2" 
                value={userAnswers['fill-in-the-gaps'][0]}
                onChange={(e) => handleFillInGapsAnswer(0, e.target.value)}
              /> a great time here in London! There are lots of new things to do and see. 
              I can't believe that by Friday I will <Input 
                className="inline-block w-24 mx-1 h-8 px-2" 
                value={userAnswers['fill-in-the-gaps'][1]} 
                onChange={(e) => handleFillInGapsAnswer(1, e.target.value)}
              /> here for two weeks already! 
              Please don't worry, I'm <Input 
                className="inline-block w-24 mx-1 h-8 px-2" 
                value={userAnswers['fill-in-the-gaps'][2]} 
                onChange={(e) => handleFillInGapsAnswer(2, e.target.value)}
              /> well. 
              My host family are great! This afternoon we're <Input 
                className="inline-block w-24 mx-1 h-8 px-2" 
                value={userAnswers['fill-in-the-gaps'][3]} 
                onChange={(e) => handleFillInGapsAnswer(3, e.target.value)}
              /> to the cinema together 
              to watch a science fiction film. It's all about how life <Input 
                className="inline-block w-24 mx-1 h-8 px-2" 
                value={userAnswers['fill-in-the-gaps'][4]} 
                onChange={(e) => handleFillInGapsAnswer(4, e.target.value)}
              /> by the year 2080 and 
              it says that we will have <Input 
                className="inline-block w-24 mx-1 h-8 px-2" 
                value={userAnswers['fill-in-the-gaps'][5]} 
                onChange={(e) => handleFillInGapsAnswer(5, e.target.value)}
              /> for all diseases!
            </p>
            <p>Lots of love,<br/>Taha</p>
          </div>
        </div>
      );
    } else if (section.id === 'translation') {
      return (
        <div className="p-4 border rounded-lg bg-white">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-medium">Translation</h3>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-2">A. Translate the following into <strong>Arabic</strong>: (5 marks)</h4>
            <p className="italic mb-2">It is very important for teenagers to set a clear goal for their life. Setting goals helps them take control of their lives and get maximum results.</p>
            <Textarea 
              dir="rtl" 
              value={userAnswers.translation.arabic}
              onChange={(e) => handleTranslationAnswer('arabic', e.target.value)}
              className="min-h-[100px]"
              placeholder="Type your translation here..."
            />
          </div>
          
          <div>
            <h4 className="font-medium mb-2">B. Translate the following into <strong>English</strong>: (5 marks)</h4>
            <p className="mb-2" dir="rtl">يوجد الكثير من المزايا و العيوب في السفر للخارج، من أحد المزايا هو أن المرء يستطيع اكتساب الخبرات و الإلمام بالثقافات الأخرى، و من أهم العيوب هو عدم مشاركتهم في مشروعات التنمية ببلدهم.</p>
            <Textarea 
              value={userAnswers.translation.english}
              onChange={(e) => handleTranslationAnswer('english', e.target.value)}
              className="min-h-[100px]" 
              placeholder="Type your translation here..."
            />
          </div>
        </div>
      );
    } else if (section.id === 'reading-comprehension') {
      // First show the reading text
      if (currentQuestionIndex === 0) {
        return (
          <div className="p-4 border rounded-lg bg-white">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-medium">Reading Comprehension</h3>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Text: Taxis to the Moon</h4>
              <div className="bg-gray-100 p-4 rounded mb-6">
                <p className="mb-2">In 1969, newspaper headlines told us that walking on the moon was possible. Since then, scientists have continued their research to create high-tech machines to advance space exploration. Because of this, news reporters are now telling us that we may all have the chance to visit the moon one day.</p>
                <p className="mb-2">Only twenty-four humans have ever visited the moon, but by 2024 a Japanese businessman called Yusaku Maezawa will have become number twenty-five. The only problem is that the rocket he will travel in has not been built yet.</p>
                <p className="mb-2">Yusaku will be travelling in a high-tech rocket, known as the Big Falcon Rocket, which will have seven engines and will be able to carry one hundred passengers. Once it has been built, the 118-meter-high rocket will eventually carry passengers around the Moon, allowing space travel for anyone who can pay the price of the flight.</p>
                <p>The cost of the flight might be a problem to anyone who isn't Yusaku, who is thought to be paying over £52 million for his flight!</p>
              </div>
              <Button onClick={() => setCurrentQuestionIndex(1)}>Start Answering Questions</Button>
            </div>
          </div>
        );
      }
      
      // Extract questions and options for reading comprehension
      const questionIndex = currentQuestionIndex - 1;
      const questionMatches = section.content.match(/<li><strong>(.*?)<\/li>/gs) || [];
      
      if (questionIndex >= questionMatches.length) return null;
      
      const questionHTML = questionMatches[questionIndex];
      const questionText = questionHTML.match(/<strong>(.*?)<\/strong>/)?.[1] || '';
      
      // Extract options for this question
      const optionTexts: string[] = [];
      const optionLetters: string[] = [];
      const optionRegex = /([A-D])\.\s*(.*?)(?=<br>|$)/g;
      let match;
      const optionContent = questionHTML.replace(/<strong>(.*?)<\/strong>/, '');
      const optionMatches = [...optionContent.matchAll(/([A-D])\.\s*(.*?)(?=<br>|$)/g)];
      
      return (
        <div className="p-4 border rounded-lg bg-white">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-medium">Question {questionIndex + 1}</h3>
            <div className="text-sm text-gray-500">{questionIndex + 1} of 6</div>
          </div>
          
          <p className="mb-6"><strong>{questionText}</strong></p>
          
          <RadioGroup 
            value={userAnswers['reading-comprehension'][questionIndex]} 
            onValueChange={(value) => handleReadingComprehensionAnswer(questionIndex, value)}
            className="space-y-3"
          >
            {optionMatches.map((match, index) => (
              <div key={`rc-option-${index}`} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={match[1]} 
                  id={`rc-option-${match[1]}`} 
                />
                <Label htmlFor={`rc-option-${match[1]}`} className="cursor-pointer">
                  {match[1]}. {match[2]}
                </Label>
              </div>
            ))}
          </RadioGroup>
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
            
            const sectionPercentage = Math.round((score.correct / score.total) * 100);
            
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
      </div>
    );
  };

  // Calculate progress for question-by-question mode
  let totalQuestions = 16 + 1 + 1 + 6; // MC + fill-gaps + translation + reading
  let currentQuestionNumber = 0;
  
  if (currentSection === 0) {
    currentQuestionNumber = currentQuestionIndex + 1;
  } else if (currentSection === 1) {
    currentQuestionNumber = 16 + 1;
  } else if (currentSection === 2) {
    currentQuestionNumber = 16 + 1 + 1;
  } else if (currentSection === 3) {
    currentQuestionNumber = 16 + 1 + 1 + currentQuestionIndex;
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

          {showAnswers && (
            <div className="mt-8">
              <Button 
                onClick={() => setShowAnswerKey(!showAnswerKey)} 
                variant={showAnswerKey ? "destructive" : "default"}
              >
                {showAnswerKey ? "Hide Answer Key" : "Show Answer Key"}
              </Button>

              {showAnswerKey && (
                <div className="mt-4 p-4 border border-green-200 bg-green-50 rounded-md">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
                    Answer Key
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {exam.sections.map((section) => (
                      <div key={`answer-${section.id}`}>
                        <h4 className="font-medium mb-2">{section.title}</h4>
                        
                        {section.id === "multiple-choice" && (
                          <div className="grid grid-cols-4 gap-2">
                            {answerKey["multiple-choice"].map((answer, index) => (
                              <div key={`mc-${index}`} className="text-sm">
                                {index + 1}. {answer}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {section.id === "fill-in-the-gaps" && (
                          <ol className="list-decimal pl-6">
                            {answerKey["fill-in-the-gaps"].map((answer, index) => (
                              <li key={`gap-${index}`} className="text-sm">{answer}</li>
                            ))}
                          </ol>
                        )}
                        
                        {section.id === "translation" && (
                          <>
                            <div className="mb-2">
                              <p className="text-sm font-medium">Arabic:</p>
                              <p className="text-sm" dir="rtl">{answerKey.translation.arabic}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">English:</p>
                              <p className="text-sm">{answerKey.translation.english}</p>
                            </div>
                          </>
                        )}
                        
                        {section.id === "reading-comprehension" && (
                          <ol className="list-decimal pl-6">
                            {answerKey["reading-comprehension"].map((answer, index) => (
                              <li key={`reading-${index}`} className="text-sm">
                                {answer}
                              </li>
                            ))}
                          </ol>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

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
            
            <Button onClick={handleNextQuestion}>
              {currentSection === 3 && ((currentSectionId === 'reading-comprehension' && currentQuestionIndex === 6) || (currentSectionId !== 'reading-comprehension' && currentQuestionIndex === 5)) ? 
                'Submit Exam' : 'Next Question'}
            </Button>
          </div>
        </>
      )}

      {examMode === 'results' && renderResults()}
    </div>
  );
};

export default FullExam; 
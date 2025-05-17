
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Check, ArrowRight, Flag, X } from "lucide-react";
import { ExamQuestion as ExamQuestionType } from '@/data/examData';
import { Badge } from '@/components/ui/badge';

interface ExamQuestionProps {
  question: ExamQuestionType;
  onNext: () => void;
  isLast: boolean;
}

const ExamQuestion: React.FC<ExamQuestionProps> = ({ question, onNext, isLast }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const handleSubmit = () => {
    if (selectedAnswer) {
      setShowFeedback(true);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    onNext();
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  // Determine if this is an Arabic-to-English or English-to-Arabic translation question
  const isArabicQuestion = question.question.match(/[\u0600-\u06FF]/); // Check for Arabic characters
  const hasArabicOptions = question.options.some(option => option.match(/[\u0600-\u06FF]/));
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="border-b pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className={
            question.category === "vocabulary" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
            question.category === "grammar" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
            "bg-amber-100 text-amber-800 hover:bg-amber-100"
          }>
            {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
          </Badge>
          <Flag className="h-4 w-4 text-muted-foreground cursor-pointer" title="Flag this question" />
        </div>
        <h3 
          className={`text-lg font-medium ${isArabicQuestion ? 'text-right' : ''} whitespace-pre-wrap`} 
          dir={isArabicQuestion ? 'rtl' : 'ltr'}
        >
          {question.question}
        </h3>
      </CardHeader>
      <CardContent className="pt-4">
        <RadioGroup
          value={selectedAnswer || ""}
          onValueChange={!showFeedback ? setSelectedAnswer : undefined}
          className="space-y-3"
        >
          {question.options.map((option, index) => {
            const isOption = option === selectedAnswer;
            const isCorrectOption = option === question.correctAnswer;
            const showCorrect = showFeedback && isCorrectOption;
            const showIncorrect = showFeedback && isOption && !isCorrectOption;
            const hasArabicText = option.match(/[\u0600-\u06FF]/);
            
            return (
              <div 
                key={index} 
                className={`flex items-center space-x-2 p-2 rounded relative ${
                  showCorrect ? "bg-green-50 border border-green-200" :
                  showIncorrect ? "bg-red-50 border border-red-200" :
                  "hover:bg-gray-50"
                }`}
                dir={hasArabicText ? 'rtl' : 'ltr'}
              >
                <RadioGroupItem
                  value={option}
                  id={`option-${question.id}-${index}`}
                  disabled={showFeedback}
                  className={hasArabicText ? 'ml-2' : 'mr-2'}
                />
                <Label
                  htmlFor={`option-${question.id}-${index}`}
                  className={`flex-grow cursor-pointer py-1 ${hasArabicText ? 'text-right' : ''} whitespace-pre-wrap`}
                >
                  {option}
                </Label>
                {showCorrect && (
                  <Check className="h-5 w-5 text-green-500 ml-2" />
                )}
                {showIncorrect && (
                  <X className="h-5 w-5 text-red-500 ml-2" />
                )}
              </div>
            );
          })}
        </RadioGroup>
        
        {showFeedback && (
          <div className={`mt-4 p-3 rounded ${isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
            <p className="font-medium">{isCorrect ? "Correct!" : "Incorrect!"}</p>
            {question.explanation && (
              <p className={`text-sm mt-1 ${question.explanation.match(/[\u0600-\u06FF]/) ? 'text-right' : ''}`} 
                dir={question.explanation.match(/[\u0600-\u06FF]/) ? 'rtl' : 'ltr'}>
                {question.explanation}
              </p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-3">
        {!showFeedback ? (
          <Button 
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="ml-auto"
          >
            Submit
          </Button>
        ) : (
          <Button onClick={handleNext} className="ml-auto gap-2">
            {isLast ? "Finish" : "Next Question"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ExamQuestion;

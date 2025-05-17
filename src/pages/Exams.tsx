import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { examQuestions, getExamCategories } from '@/data/examData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExamQuestion from '@/components/ExamQuestion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import FullExam from '@/components/FullExam';
import { fullExam } from '@/data/fullExam';
import SpaceReadingExam from '@/components/SpaceReadingExam';
import { spaceReadingExam } from '@/data/spaceReadingExam';

const Exams = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("practice");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [examType, setExamType] = useState("full-exam");
  
  // Filter questions based on search term and category
  const filteredQuestions = examQuestions.filter(question => 
    (question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.options.some(option => option.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (activeCategory === "all" || question.category === activeCategory)
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentQuestionIndex(0);
    setExamStarted(false);
  };

  const handleStartExam = () => {
    setExamStarted(true);
    setCurrentQuestionIndex(0);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setExamStarted(false);
    }
  };

  // Count questions by category
  const countByCategory = {
    vocabulary: examQuestions.filter(q => q.category === 'vocabulary').length,
    grammar: examQuestions.filter(q => q.category === 'grammar').length,
    translation: examQuestions.filter(q => q.category === 'translation').length,
    all: examQuestions.length
  };

  // Calculate progress percentage
  const progressPercentage = examStarted 
    ? ((currentQuestionIndex + 1) / filteredQuestions.length) * 100 
    : 0;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">English Exam Practice</h1>
        <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Test your English knowledge with our exam resources. Choose between practice questions or take a full exam.
        </p>
        
        <Tabs defaultValue="practice" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="practice">Practice Questions</TabsTrigger>
              <TabsTrigger value="full-exams">Full Exams</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="practice">
            <div className="relative mb-8 max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search questions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setExamStarted(false);
                }}
              />
            </div>
            
            <Tabs defaultValue="all" onValueChange={handleCategoryChange} value={activeCategory}>
              <div className="flex justify-center">
                <TabsList>
                  {getExamCategories().map(category => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                      <Badge variant="outline" className="ml-2 bg-primary/10">
                        {countByCategory[category.id as keyof typeof countByCategory]}
                      </Badge>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {getExamCategories().map(category => (
                <TabsContent key={category.id} value={category.id}>
                  {!examStarted ? (
                    filteredQuestions.length > 0 ? (
                      <div className="text-center py-6">
                        <p className="mb-4">
                          {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''} available in this category.
                        </p>
                        <Button onClick={handleStartExam}>Start Practice Exam</Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No questions found for "{searchTerm}" in this category.</p>
                      </div>
                    )
                  ) : (
                    <ExamQuestion 
                      question={filteredQuestions[currentQuestionIndex]} 
                      onNext={handleNextQuestion} 
                      isLast={currentQuestionIndex === filteredQuestions.length - 1}
                    />
                  )}
                </TabsContent>
              ))}
            </Tabs>
            
            {examStarted && filteredQuestions.length > 1 && (
              <div className="mb-8 max-w-xl mx-auto">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Question {currentQuestionIndex + 1} of {filteredQuestions.length}</span>
                  <span>{Math.round(progressPercentage)}% Complete</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="full-exams">
            <Tabs defaultValue="full-exam" onValueChange={setExamType} value={examType}>
              <div className="flex justify-center mb-6">
                <TabsList>
                  <TabsTrigger value="full-exam">General Exam</TabsTrigger>
                  <TabsTrigger value="space-reading">Space Reading & Writing</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="full-exam">
                <FullExam exam={fullExam} showAnswers={true} />
              </TabsContent>
              
              <TabsContent value="space-reading">
                <SpaceReadingExam exam={spaceReadingExam} showAnswers={true} />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Exams;


import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, BookText, Lightbulb, GraduationCap } from 'lucide-react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <section className="py-12 md:py-16 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary">English Study Platform</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-600 mb-8">
            Your interactive resource for mastering English vocabulary, grammar, and exam preparation with Arabic translations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/vocabulary">
                <BookText className="w-4 h-4" />
                Explore Vocabulary
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/grammar">
                <BookOpen className="w-4 h-4" />
                Learn Grammar Rules
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="gap-2">
              <Link to="/exams">
                <GraduationCap className="w-4 h-4" />
                Practice Exams
              </Link>
            </Button>
          </div>
        </section>
        
        <section className="py-8">
          <h2 className="text-2xl font-semibold text-center mb-8">What You'll Learn</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BookText className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Rich Vocabulary</h3>
              <p className="text-gray-600">Learn essential English words with clear definitions and Arabic translations.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Grammar Rules</h3>
              <p className="text-gray-600">Master English grammar with detailed explanations, examples, and translations.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Exam Practice</h3>
              <p className="text-gray-600">Test your knowledge with interactive quizzes and exam-style questions.</p>
            </div>
          </div>
        </section>
        
        <section className="py-8 bg-gray-50 rounded-lg p-6 my-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Study Tips</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <p>Focus on examples — they help you remember!</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <p>Use colors or highlighters for each grammar rule.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <p>Make flashcards for vocabulary.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <p>Practice with exam questions regularly to reinforce your learning.</p>
            </div>
          </div>
        </section>
        
        <section className="py-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-600 mb-6">Explore our vocabulary flashcards, grammar explanations, and practice exams.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="gap-2">
              <Link to="/vocabulary">
                <BookText className="w-4 h-4" />
                Start with Vocabulary
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/exams">
                <GraduationCap className="w-4 h-4" />
                Try an Exam
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;

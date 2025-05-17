
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { vocabularyItems } from '@/data/vocabularyData';
import Flashcard from '@/components/Flashcard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Vocabulary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredItems = vocabularyItems.filter(item => 
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.arabic.includes(searchTerm)
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Vocabulary Flashcards</h1>
        <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Explore English vocabulary with meanings and Arabic translations. Click on a card to flip it.
        </p>
        
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search vocabulary..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="all">All Words</TabsTrigger>
              <TabsTrigger value="nouns">Nouns</TabsTrigger>
              <TabsTrigger value="verbs">Verbs</TabsTrigger>
              <TabsTrigger value="expressions">Expressions</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <Flashcard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No vocabulary found for "{searchTerm}"</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="nouns">
            <div className="text-center py-12">
              <p className="text-gray-500">Select categories coming in the next update!</p>
            </div>
          </TabsContent>
          
          <TabsContent value="verbs">
            <div className="text-center py-12">
              <p className="text-gray-500">Select categories coming in the next update!</p>
            </div>
          </TabsContent>
          
          <TabsContent value="expressions">
            <div className="text-center py-12">
              <p className="text-gray-500">Select categories coming in the next update!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Vocabulary;

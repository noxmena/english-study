
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { VocabularyItem } from '@/data/vocabularyData';

interface FlashcardProps {
  item: VocabularyItem;
}

const Flashcard = ({ item }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`flashcard h-48 md:h-56 cursor-pointer ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
      <div className="flashcard-inner relative w-full h-full">
        <Card className="flashcard-front absolute w-full h-full flex flex-col items-center justify-center p-6 text-center">
          <h3 className="text-xl font-bold text-primary mb-2">{item.word}</h3>
          <p className="text-sm text-gray-500">Click to see definition and translation</p>
        </Card>
        
        <Card className="flashcard-back absolute w-full h-full flex flex-col items-center justify-center p-6 text-center">
          <p className="text-md mb-2"><span className="font-medium">Meaning:</span> {item.meaning}</p>
          <p className="text-lg font-bold text-primary mt-2 mb-1">Arabic Translation</p>
          <p className="text-lg" dir="rtl">{item.arabic}</p>
        </Card>
      </div>
    </div>
  );
};

export default Flashcard;

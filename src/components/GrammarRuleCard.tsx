
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GrammarRule } from '@/data/grammarData';

interface GrammarRuleCardProps {
  rule: GrammarRule;
}

const GrammarRuleCard = ({ rule }: GrammarRuleCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg md:text-xl">{rule.title}</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)} 
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{rule.definition}</p>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="grid gap-3 text-sm">
            <div>
              <h4 className="font-medium text-primary">When to Use</h4>
              <p>{rule.whenToUse}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-primary">How to Use</h4>
              <p>{rule.howToUse}</p>
            </div>
            
            <div className="mt-2 space-y-2">
              <h4 className="font-medium text-primary">Example</h4>
              <p className="italic">{rule.example}</p>
              <div className="mt-1">
                <h4 className="font-medium text-primary">Translation</h4>
                <p className="text-base" dir="rtl">{rule.translation}</p>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default GrammarRuleCard;


import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { grammarRules } from '@/data/grammarData';
import GrammarRuleCard from '@/components/GrammarRuleCard';

const Grammar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredRules = grammarRules.filter(rule => 
    rule.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    rule.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Grammar Rules</h1>
        <p className="text-gray-600 mb-8 text-center">
          Comprehensive grammar explanations with examples and Arabic translations.
        </p>
        
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search grammar rules..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {filteredRules.length > 0 ? (
          <div className="space-y-4">
            {filteredRules.map(rule => (
              <GrammarRuleCard key={rule.id} rule={rule} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No grammar rules found for "{searchTerm}"</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Grammar;

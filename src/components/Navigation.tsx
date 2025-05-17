
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BookOpen, BookText, GraduationCap } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: null },
    { name: 'Vocabulary', path: '/vocabulary', icon: <BookText className="h-4 w-4" /> },
    { name: 'Grammar', path: '/grammar', icon: <BookOpen className="h-4 w-4" /> },
    { name: 'Exams', path: '/exams', icon: <GraduationCap className="h-4 w-4" /> }
  ];

  return (
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl text-primary">
            English Study Platform
          </Link>
          
          <nav>
            <ul className="flex items-center space-x-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;

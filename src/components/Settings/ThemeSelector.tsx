import React from 'react';
import { Check, Palette } from 'lucide-react';

export interface Theme {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  preview: {
    header: string;
    sidebar: string;
    content: string;
  };
}

const themes: Theme[] = [
  {
    id: 'blue',
    name: 'Ocean Blue',
    description: 'Professional blue theme with clean design',
    primaryColor: '#2563eb',
    secondaryColor: '#1d4ed8',
    backgroundColor: '#f8fafc',
    textColor: '#1e293b',
    preview: {
      header: '#2563eb',
      sidebar: '#1e40af',
      content: '#f8fafc'
    }
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    description: 'Elegant purple theme for modern look',
    primaryColor: '#7c3aed',
    secondaryColor: '#6d28d9',
    backgroundColor: '#faf5ff',
    textColor: '#1e1b4b',
    preview: {
      header: '#7c3aed',
      sidebar: '#5b21b6',
      content: '#faf5ff'
    }
  },
  {
    id: 'green',
    name: 'Forest Green',
    description: 'Natural green theme for eco-friendly feel',
    primaryColor: '#059669',
    secondaryColor: '#047857',
    backgroundColor: '#f0fdf4',
    textColor: '#064e3b',
    preview: {
      header: '#059669',
      sidebar: '#065f46',
      content: '#f0fdf4'
    }
  },
  {
    id: 'orange',
    name: 'Sunset Orange',
    description: 'Warm orange theme for energetic vibe',
    primaryColor: '#ea580c',
    secondaryColor: '#dc2626',
    backgroundColor: '#fff7ed',
    textColor: '#7c2d12',
    preview: {
      header: '#ea580c',
      sidebar: '#c2410c',
      content: '#fff7ed'
    }
  }
];

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (themeId: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onThemeChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Palette className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
        <h3 className="text-base lg:text-lg font-semibold text-gray-800">Choose Theme</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`relative border-2 rounded-lg p-3 lg:p-4 cursor-pointer transition-all duration-200 ${
              selectedTheme === theme.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => onThemeChange(theme.id)}
          >
            {/* Selection indicator */}
            {selectedTheme === theme.id && (
              <div className="absolute top-2 right-2 lg:top-3 lg:right-3 bg-blue-500 text-white rounded-full p-1">
                <Check className="w-3 h-3 lg:w-4 lg:h-4" />
              </div>
            )}

            {/* Theme preview */}
            <div className="mb-3">
              <div className="flex space-x-1 mb-2">
                <div 
                  className="h-6 lg:h-8 rounded-tl rounded-bl flex-1"
                  style={{ backgroundColor: theme.preview.header }}
                />
                <div 
                  className="h-6 lg:h-8 rounded-tr rounded-br w-3 lg:w-4"
                  style={{ backgroundColor: theme.preview.sidebar }}
                />
              </div>
              <div className="flex space-x-1">
                <div 
                  className="h-8 lg:h-12 rounded-bl rounded-br flex-1"
                  style={{ backgroundColor: theme.preview.content }}
                />
                <div 
                  className="h-8 lg:h-12 rounded-br w-3 lg:w-4"
                  style={{ backgroundColor: theme.preview.sidebar }}
                />
              </div>
            </div>

            {/* Theme info */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">{theme.name}</h4>
              <p className="text-xs lg:text-sm text-gray-600 mb-2">{theme.description}</p>
              
              {/* Color palette */}
              <div className="flex space-x-2">
                <div 
                  className="w-5 h-5 lg:w-6 lg:h-6 rounded border border-gray-200"
                  style={{ backgroundColor: theme.primaryColor }}
                  title="Primary Color"
                />
                <div 
                  className="w-5 h-5 lg:w-6 lg:h-6 rounded border border-gray-200"
                  style={{ backgroundColor: theme.secondaryColor }}
                  title="Secondary Color"
                />
                <div 
                  className="w-5 h-5 lg:w-6 lg:h-6 rounded border border-gray-200"
                  style={{ backgroundColor: theme.backgroundColor }}
                  title="Background Color"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector; 
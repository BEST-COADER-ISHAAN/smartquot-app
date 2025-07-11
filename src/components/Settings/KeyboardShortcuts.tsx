import React from 'react';
import { Keyboard, Zap } from 'lucide-react';
import { getShortcutsByCategory, formatShortcutKey } from '../../lib/keyboardShortcuts';

const KeyboardShortcuts: React.FC = () => {
  const shortcutCategories = getShortcutsByCategory();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Keyboard className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Keyboard Shortcuts</h3>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Zap className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div className="text-sm text-gray-700">
            <p className="font-medium mb-1">Quick Actions</p>
            <p>Use these keyboard shortcuts to navigate and perform actions quickly throughout the application.</p>
          </div>
        </div>
      </div>

      {shortcutCategories.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Keyboard className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No shortcuts are currently registered.</p>
          <p className="text-sm">Shortcuts will appear here as you navigate through the application.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {shortcutCategories.map((category) => (
            <div key={category.name} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h4 className="font-medium text-gray-900">{category.name}</h4>
              </div>
              <div className="divide-y divide-gray-200">
                {category.shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between px-4 py-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{shortcut.description}</p>
                    </div>
                    <div className="ml-4">
                      <kbd className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
                        {formatShortcutKey(shortcut.key)}
                      </kbd>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-blue-50 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-blue-900 mb-2">Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Shortcuts work globally throughout the application</li>
          <li>• They won't trigger when typing in input fields</li>
          <li>• All shortcuts use the Alt key as a modifier</li>
          <li>• You can see available shortcuts in the navigation menu</li>
        </ul>
      </div>
    </div>
  );
};

export default KeyboardShortcuts; 
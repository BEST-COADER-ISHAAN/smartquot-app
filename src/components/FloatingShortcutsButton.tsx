import React, { useState } from 'react';
import { Keyboard, X } from 'lucide-react';
import { getShortcutsByCategory, formatShortcutKey } from '../lib/keyboardShortcuts';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

const FloatingShortcutsButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const shortcutCategories = getShortcutsByCategory();

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        title="Keyboard Shortcuts"
      >
        <Keyboard className="w-6 h-6" />
      </button>

      {/* Shortcuts Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Keyboard className="w-6 h-6 text-blue-600" />
              <span>Keyboard Shortcuts</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Info Section */}
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Use these keyboard shortcuts to navigate and perform actions quickly throughout the application.
              </p>
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

            {/* Tips Section */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Tips</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Shortcuts work globally throughout the application</li>
                <li>• They won't trigger when typing in input fields</li>
                <li>• All shortcuts use the Alt key as a modifier</li>
                <li>• You can access this help anytime with the floating button</li>
              </ul>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingShortcutsButton; 
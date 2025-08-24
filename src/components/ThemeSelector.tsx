import React, { useState } from 'react';
import { useLSSTheme } from '../contexts/LSSThemeContext';

const ThemeSelector: React.FC = () => {
  const { themeMode, setThemeMode, themeModes } = useLSSTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full backdrop-blur-md bg-black/30 border-2 border-white/50 shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-black/40"
          aria-label="Theme selector"
        >
          <div 
            className="w-6 h-6 rounded-full border-2 border-white/50"
            style={{ backgroundColor: themeModes.find(t => t.key === themeMode)?.color }}
          />
        </button>

        {isOpen && (
          <div className="absolute bottom-16 right-0 w-80 p-4 rounded-xl backdrop-blur-md bg-black/80 border border-white/20 shadow-2xl">
            <div className="mb-3">
              <h3 className="text-sm font-medium text-white/90 mb-1">Theme Mode</h3>
              <p className="text-xs text-white/60">Choose your visual experience</p>
            </div>

            <div className="space-y-2">
              {['V1', 'Film'].map(version => (
                <div key={version}>
                  <div className="text-xs font-medium text-white/70 mb-2">{version} Modes</div>
                  <div className="grid grid-cols-2 gap-2">
                    {themeModes
                      .filter(mode => mode.version === version)
                      .map((mode) => (
                        <button
                          key={mode.key}
                          onClick={() => {
                            setThemeMode(mode.key);
                            setIsOpen(false);
                          }}
                          className={`p-3 rounded-lg text-left transition-all duration-200 border ${
                            themeMode === mode.key
                              ? 'bg-white/20 border-white/40 shadow-lg'
                              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className="w-3 h-3 rounded-full border border-white/30"
                              style={{ backgroundColor: mode.color }}
                            />
                            <span className="text-sm font-medium text-white/90">{mode.label}</span>
                          </div>
                          <p className="text-xs text-white/60">{mode.description}</p>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeSelector;
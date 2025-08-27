import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MoodElement {
  id: string;
  type: 'shape' | 'color' | 'texture';
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle' | 'blob';
}

export const PlaygroundSection: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [elements, setElements] = useState<MoodElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Predefined color palettes based on moods
  const moodPalettes: Record<string, string[]> = {
    serene: ['#4DA6FF', '#87CEEB', '#B8E6F0', '#E0F6FF'],
    vibrant: ['#FF6B5D', '#FFE55C', '#52E5B7', '#B8A4E3'],
    organic: ['#8FBC8F', '#DEB887', '#F4A460', '#CD853F'],
    futuristic: ['#9370DB', '#00BFFF', '#7FFFD4', '#FF69B4'],
    retro: ['#FF6347', '#FFD700', '#32CD32', '#FF1493'],
    minimal: ['#000000', '#FFFFFF', '#808080', '#C0C0C0'],
  };

  // Generate elements based on prompt
  const generateMoodBoard = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Parse prompt for mood keywords
    const lowerPrompt = prompt.toLowerCase();
    let palette = moodPalettes.vibrant; // default
    
    Object.entries(moodPalettes).forEach(([mood, colors]) => {
      if (lowerPrompt.includes(mood)) {
        palette = colors;
      }
    });

    // Generate random elements
    const newElements: MoodElement[] = [];
    const elementCount = Math.floor(Math.random() * 8) + 12; // 12-20 elements

    for (let i = 0; i < elementCount; i++) {
      newElements.push({
        id: `element-${i}`,
        type: ['shape', 'color', 'texture'][Math.floor(Math.random() * 3)] as any,
        x: Math.random() * 80 + 10, // 10-90% from left
        y: Math.random() * 80 + 10, // 10-90% from top
        size: Math.random() * 60 + 20, // 20-80px
        rotation: Math.random() * 360,
        color: palette[Math.floor(Math.random() * palette.length)],
        shape: ['circle', 'square', 'triangle', 'blob'][Math.floor(Math.random() * 4)] as any,
      });
    }

    setElements(newElements);
    setIsGenerating(false);
  };

  // Handle element interactions
  const handleElementClick = (elementId: string) => {
    setSelectedElement(selectedElement === elementId ? null : elementId);
  };

  const handleElementDrag = (elementId: string, deltaX: number, deltaY: number) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    setElements(prev => prev.map(el => {
      if (el.id === elementId) {
        return {
          ...el,
          x: Math.max(0, Math.min(100, el.x + (deltaX / rect.width) * 100)),
          y: Math.max(0, Math.min(100, el.y + (deltaY / rect.height) * 100)),
        };
      }
      return el;
    }));
  };

  const rerollElement = (elementId: string) => {
    const currentPalette = Object.values(moodPalettes).flat();
    setElements(prev => prev.map(el => {
      if (el.id === elementId) {
        return {
          ...el,
          color: currentPalette[Math.floor(Math.random() * currentPalette.length)],
          shape: ['circle', 'square', 'triangle', 'blob'][Math.floor(Math.random() * 4)] as any,
          rotation: Math.random() * 360,
          size: Math.random() * 60 + 20,
        };
      }
      return el;
    }));
  };

  const downloadMoodBoard = () => {
    // In a real implementation, this would generate and download an image
    alert('Feature coming soon! Your mood board would be downloaded as a high-resolution image.');
  };

  const clearCanvas = () => {
    setElements([]);
    setPrompt('');
    setSelectedElement(null);
  };

  return (
    <section id="playground" className="version-section playground-section">
      <div className="version-container">
        {/* Section Header */}
        <div className="section-header">
          <motion.h2
            className="version-headline"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
          >
            The Playground
          </motion.h2>
          <motion.p
            className="version-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
          >
            Experience the magic firsthand. Create a generative mood board that responds to your creativity.
            This is not a demo—it's a glimpse into the future of human-AI collaboration.
          </motion.p>
        </div>

        {/* Playground Interface */}
        <motion.div
          className="playground-interface"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
        >
          {/* Input Section */}
          <div className="prompt-section">
            <h3>What are you dreaming of?</h3>
            <div className="prompt-input-group">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Try: serene, futuristic, organic..."
                className="prompt-input"
                onKeyPress={(e) => e.key === 'Enter' && generateMoodBoard()}
              />
              <button
                onClick={generateMoodBoard}
                disabled={isGenerating || !prompt.trim()}
                className={`version-btn version-btn-primary generate-btn ${isGenerating ? 'generating' : ''}`}
              >
                {isGenerating ? (
                  <>
                    <div className="spinner" />
                    <span>Creating Magic...</span>
                  </>
                ) : (
                  <>
                    <span>Generate</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="canvas-container">
            <div ref={canvasRef} className="mood-canvas">
              <AnimatePresence>
                {elements.map((element) => (
                  <motion.div
                    key={element.id}
                    className={`mood-element ${element.shape} ${selectedElement === element.id ? 'selected' : ''}`}
                    style={{
                      left: `${element.x}%`,
                      top: `${element.y}%`,
                      width: `${element.size}px`,
                      height: `${element.size}px`,
                      backgroundColor: element.color,
                      transform: `rotate(${element.rotation}deg)`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.8 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    drag
                    dragElastic={0.1}
                    onDrag={(event, info) => handleElementDrag(element.id, info.delta.x, info.delta.y)}
                    onClick={() => handleElementClick(element.id)}
                    onDoubleClick={() => rerollElement(element.id)}
                    whileHover={{ scale: 1.1, opacity: 1 }}
                    whileDrag={{ scale: 1.2, zIndex: 10 }}
                  />
                ))}
              </AnimatePresence>

              {elements.length === 0 && (
                <div className="canvas-placeholder">
                  <div className="placeholder-icon">✨</div>
                  <p>Your mood board will appear here</p>
                  <p className="placeholder-hint">Enter a prompt above to begin creating</p>
                </div>
              )}
            </div>

            {/* Canvas Controls */}
            {elements.length > 0 && (
              <motion.div
                className="canvas-controls"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <button onClick={downloadMoodBoard} className="version-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7,10 12,15 17,10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </button>
                <button onClick={clearCanvas} className="version-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3,6 5,6 21,6" />
                    <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
                  </svg>
                  Clear
                </button>
              </motion.div>
            )}
          </div>

          {/* Instructions */}
          {elements.length > 0 && (
            <motion.div
              className="playground-instructions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="instruction">
                <strong>Drag</strong> elements to rearrange
              </div>
              <div className="instruction">
                <strong>Double-click</strong> to reroll an element
              </div>
              <div className="instruction">
                <strong>Click</strong> to select and highlight
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="playground-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3>Enjoyed the Playground?</h3>
          <p>Imagine what we could build together.</p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="version-btn version-btn-primary"
          >
            Let's Create Something Amazing
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        .playground-section {
          background: linear-gradient(
            135deg,
            rgba(77, 166, 255, 0.02) 0%,
            rgba(184, 164, 227, 0.02) 50%,
            rgba(82, 229, 183, 0.02) 100%
          );
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .playground-interface {
          max-width: 1000px;
          margin: 0 auto;
        }

        .prompt-section {
          margin-bottom: 3rem;
          text-align: center;
        }

        .prompt-section h3 {
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--text-primary);
          margin-bottom: 2rem;
        }

        .prompt-input-group {
          display: flex;
          gap: 1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .prompt-input {
          flex: 1;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 2rem;
          color: var(--text-primary);
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .prompt-input:focus {
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.08);
        }

        .prompt-input::placeholder {
          color: var(--text-secondary);
          opacity: 0.7;
        }

        .generate-btn {
          padding: 1rem 2rem;
          white-space: nowrap;
        }

        .generate-btn.generating {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .canvas-container {
          position: relative;
          margin-bottom: 2rem;
        }

        .mood-canvas {
          width: 100%;
          height: 500px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }

        .canvas-placeholder {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: var(--text-secondary);
          opacity: 0.6;
        }

        .placeholder-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .placeholder-hint {
          font-size: 0.9rem;
          opacity: 0.7;
          margin-top: 0.5rem;
        }

        .mood-element {
          position: absolute;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 20%;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .mood-element.circle {
          border-radius: 50%;
        }

        .mood-element.triangle {
          border-radius: 0;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        .mood-element.blob {
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        }

        .mood-element.selected {
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5), 0 8px 32px rgba(0, 0, 0, 0.2);
          z-index: 5;
        }

        .canvas-controls {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .playground-instructions {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .instruction {
          color: var(--text-secondary);
          font-size: 0.9rem;
          text-align: center;
        }

        .instruction strong {
          color: var(--text-primary);
        }

        .playground-cta {
          text-align: center;
          margin-top: 4rem;
          padding: 3rem 2rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
          backdrop-filter: blur(20px);
        }

        .playground-cta h3 {
          font-size: 1.75rem;
          font-weight: 300;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .playground-cta p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .prompt-input-group {
            flex-direction: column;
          }

          .mood-canvas {
            height: 400px;
          }

          .playground-instructions {
            flex-direction: column;
            gap: 1rem;
          }

          .canvas-controls {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </section>
  );
};
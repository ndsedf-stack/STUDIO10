import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Genre } from './types';
import { GENRES } from './constants';
import { generateStoryStream, generateInspiration } from './services/geminiService';
import ControlPanel from './components/ControlPanel';
import StoryDisplay from './components/StoryDisplay';

const App: React.FC = () => {
  const [genre, setGenre] = useState<Genre>(GENRES[0].value);
  const [characters, setCharacters] = useState<string>('');
  const [plot, setPlot] = useState<string>('');

  const [story, setStory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGeneratingInspiration, setIsGeneratingInspiration] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const storyPanelRef = useRef<HTMLDivElement>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setStory('');

    try {
      const stream = generateStoryStream({ genre, characters, plot });
      for await (const chunk of stream) {
        setStory((prev) => prev + chunk);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [genre, characters, plot]);

  const handleGenerateInspiration = useCallback(async () => {
    setIsGeneratingInspiration(true);
    setError(null);
    try {
      const { characters, plot } = await generateInspiration(genre);
      setCharacters(characters);
      setPlot(plot);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unexpected error occurred while generating inspiration.');
      }
    } finally {
      setIsGeneratingInspiration(false);
    }
  }, [genre]);

  const handleSetCharacters = (value: string) => {
    setCharacters(value);
    if (story || error) {
      setStory('');
      setError(null);
    }
  };

  const handleSetPlot = (value: string) => {
    setPlot(value);
    if (story || error) {
      setStory('');
      setError(null);
    }
  };

  useEffect(() => {
    // Scroll to story panel on mobile when generation starts or finishes
    if (window.innerWidth < 768 && (isLoading || story || error)) {
      storyPanelRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLoading, story, error]);

  return (
    <main className="min-h-screen w-screen text-slate-200 font-sans md:grid md:grid-cols-2 md:h-screen md:overflow-hidden">
      <div className="md:h-screen md:overflow-y-auto">
        <ControlPanel
          genre={genre}
          setGenre={setGenre}
          characters={characters}
          setCharacters={handleSetCharacters}
          plot={plot}
          setPlot={handleSetPlot}
          isLoading={isLoading}
          onGenerate={handleGenerate}
          isGeneratingInspiration={isGeneratingInspiration}
          onGenerateInspiration={handleGenerateInspiration}
        />
      </div>
      <div ref={storyPanelRef} className="md:h-screen md:overflow-y-auto">
        <StoryDisplay
          story={story}
          isLoading={isLoading}
          error={error}
          onRegenerate={handleGenerate}
        />
      </div>
    </main>
  );
};

export default App;

import React, { useState, useCallback } from 'react';
import ControlPanel from './components/ControlPanel';
import ImageGallery from './components/ImageGallery';
import { generateMannequinImages } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [brandName, setBrandName] = useState<string>('Elegance');
  const [imageCount, setImageCount] = useState<number>(1);
  const [referenceImageFile, setReferenceImageFile] = useState<File | null>(null);
  const [referenceImageUrl, setReferenceImageUrl] = useState<string | null>(null);
  
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setReferenceImageFile(file);
    setReferenceImageUrl(URL.createObjectURL(file));
    setError(null);
  };

  const handleGenerateClick = useCallback(async () => {
    if (!referenceImageFile) {
      setError('Please upload a reference image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const { base64, mimeType } = await fileToBase64(referenceImageFile);
      const images = await generateMannequinImages(
        { data: base64, mimeType },
        brandName,
        imageCount
      );
      setGeneratedImages(images);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [referenceImageFile, brandName, imageCount]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white font-sans">
      <header className="py-4 px-6 md:px-10 border-b border-gray-700/50 backdrop-blur-sm sticky top-0 z-10">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-200">
          Mannequin Muse
        </h1>
        <p className="text-sm text-gray-400">AI-Powered Fashion Studio</p>
      </header>
      
      <main className="flex flex-col lg:flex-row gap-8 p-6 md:p-10">
        <aside className="w-full lg:w-1/3 xl:w-1/4 lg:sticky lg:top-24 self-start">
          <ControlPanel
            brandName={brandName}
            setBrandName={setBrandName}
            imageCount={imageCount}
            setImageCount={setImageCount}
            onImageUpload={handleImageUpload}
            onGenerate={handleGenerateClick}
            isLoading={isLoading}
            referenceImageUrl={referenceImageUrl}
          />
        </aside>
        
        <section className="w-full lg:w-2/3 xl:w-3/4">
          <ImageGallery 
            images={generatedImages} 
            isLoading={isLoading} 
            error={error} 
            imageCount={imageCount}
          />
        </section>
      </main>
    </div>
  );
};

export default App;

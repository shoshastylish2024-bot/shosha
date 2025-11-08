import React from 'react';

interface ImageGalleryProps {
  images: string[];
  isLoading: boolean;
  error: string | null;
  imageCount: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, isLoading, error, imageCount }) => {
  const renderSkeletons = () => {
    return Array.from({ length: imageCount }).map((_, index) => (
      <div key={index} className="aspect-w-1 aspect-h-1 bg-gray-800 rounded-lg overflow-hidden animate-pulse">
         <div className="w-full h-full bg-gray-700/50"></div>
      </div>
    ));
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <h2 className="text-lg font-medium text-gray-300 mb-4">Generating your editorial photos...</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderSkeletons()}
          </div>
        </>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-red-900/20 border border-red-500/50 rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          <h3 className="text-xl font-semibold text-red-300">Generation Failed</h3>
          <p className="mt-2 text-red-400">{error}</p>
        </div>
      );
    }
    
    if (images.length > 0) {
      return (
        <>
            <h2 className="text-lg font-medium text-gray-300 mb-4">Generated Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((imgSrc, index) => (
                <div key={index} className="group aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700/60 relative">
                <img 
                    src={imgSrc} 
                    alt={`Generated mannequin ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            ))}
            </div>
        </>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-800/30 border border-dashed border-gray-700 rounded-lg p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-400">Your Studio Awaits</h3>
        <p className="mt-2 text-gray-500">Configure your settings and click "Generate" to create your photos.</p>
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};

export default ImageGallery;

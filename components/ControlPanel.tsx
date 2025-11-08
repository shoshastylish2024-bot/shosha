import React from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface ControlPanelProps {
  brandName: string;
  setBrandName: (name: string) => void;
  imageCount: number;
  setImageCount: (count: number) => void;
  onImageUpload: (file: File) => void;
  onGenerate: () => void;
  isLoading: boolean;
  referenceImageUrl: string | null;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  brandName,
  setBrandName,
  imageCount,
  setImageCount,
  onImageUpload,
  onGenerate,
  isLoading,
  referenceImageUrl,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/60 shadow-2xl space-y-6 backdrop-blur-lg">
      <h2 className="text-xl font-semibold text-amber-300 border-b border-gray-600 pb-3">Configuration</h2>

      <div>
        <label htmlFor="image-upload" className="block text-sm font-medium text-gray-300 mb-2">1. Reference Outfit</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md hover:border-amber-400 transition-colors">
          <div className="space-y-1 text-center">
            {referenceImageUrl ? (
               <img src={referenceImageUrl} alt="Reference Preview" className="mx-auto h-32 w-auto rounded-md object-contain" />
            ) : (
              <UploadIcon className="mx-auto h-12 w-12 text-gray-500" />
            )}
            <div className="flex text-sm text-gray-500">
              <label htmlFor="image-upload-input" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-amber-400 hover:text-amber-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:ring-amber-500 px-1">
                <span>Upload a file</span>
                <input id="image-upload-input" name="image-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="brand-name" className="block text-sm font-medium text-gray-300">2. Brand Name</label>
        <div className="mt-1">
          <input
            type="text"
            name="brand-name"
            id="brand-name"
            className="shadow-sm bg-gray-700/50 border border-gray-600 text-white focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm rounded-md p-2"
            placeholder="e.g., Elegance"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="image-count" className="block text-sm font-medium text-gray-300">3. Number of Images</label>
        <div className="mt-1 flex items-center space-x-3">
          <input
            type="range"
            name="image-count"
            id="image-count"
            min="1"
            max="4"
            step="1"
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-amber-400"
            value={imageCount}
            onChange={(e) => setImageCount(parseInt(e.target.value, 10))}
          />
          <span className="text-amber-300 font-semibold w-6 text-center">{imageCount}</span>
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !referenceImageUrl}
        className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-900 bg-gradient-to-r from-amber-300 to-yellow-400 hover:from-amber-400 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
      >
        {isLoading ? (
          <>
            <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />
            Generating...
          </>
        ) : (
          'Generate Photos'
        )}
      </button>
    </div>
  );
};

export default ControlPanel;

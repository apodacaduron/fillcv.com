
import React from 'react';

export interface Template {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
}

export const templates: Template[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and modern design with a focus on readability',
    preview: (
      <div className="bg-white h-full w-full p-2 rounded flex flex-col gap-1">
        <div className="h-4 w-1/2 bg-gray-900 rounded-sm"></div>
        <div className="h-2 w-3/4 bg-gray-300 rounded-sm"></div>
        <div className="h-1 w-full bg-gray-200 rounded-sm my-1"></div>
        <div className="h-2 w-1/2 bg-gray-300 rounded-sm"></div>
        <div className="h-2 w-2/3 bg-gray-300 rounded-sm"></div>
        <div className="h-2 w-3/4 bg-gray-300 rounded-sm"></div>
      </div>
    )
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional layout ideal for corporate positions',
    preview: (
      <div className="bg-white h-full w-full p-2 rounded flex flex-col gap-1">
        <div className="bg-blue-600 h-5 w-full mb-1"></div>
        <div className="h-3 w-1/2 bg-gray-900 rounded-sm"></div>
        <div className="h-2 w-2/3 bg-gray-300 rounded-sm"></div>
        <div className="flex gap-1 mt-1">
          <div className="h-full w-1/3 flex flex-col gap-1">
            <div className="h-2 w-full bg-gray-200 rounded-sm"></div>
            <div className="h-2 w-full bg-gray-200 rounded-sm"></div>
          </div>
          <div className="h-full w-2/3 flex flex-col gap-1">
            <div className="h-2 w-full bg-gray-300 rounded-sm"></div>
            <div className="h-2 w-full bg-gray-300 rounded-sm"></div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design for standing out in creative fields',
    preview: (
      <div className="bg-white h-full w-full p-2 rounded flex flex-col gap-1">
        <div className="h-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm mb-1"></div>
        <div className="flex gap-1">
          <div className="h-10 w-1/3 rounded-full bg-gray-200"></div>
          <div className="h-full w-2/3 flex flex-col gap-1 justify-center">
            <div className="h-3 w-full bg-gray-900 rounded-sm"></div>
            <div className="h-2 w-2/3 bg-gray-300 rounded-sm"></div>
          </div>
        </div>
        <div className="h-1 w-full bg-gray-200 rounded-sm my-1"></div>
        <div className="h-2 w-full bg-gray-300 rounded-sm"></div>
      </div>
    )
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Optimized for tech roles with skills emphasis',
    preview: (
      <div className="bg-white h-full w-full p-2 rounded flex flex-col gap-1">
        <div className="flex gap-1">
          <div className="h-full w-2/3 flex flex-col gap-1">
            <div className="h-3 w-3/4 bg-gray-900 rounded-sm"></div>
            <div className="h-2 w-full bg-gray-300 rounded-sm"></div>
          </div>
          <div className="h-full w-1/3 flex flex-col gap-1">
            <div className="h-2 w-full bg-gray-800 rounded-sm"></div>
            <div className="h-2 w-full bg-gray-200 rounded-sm"></div>
          </div>
        </div>
        <div className="h-1 w-full bg-gray-200 rounded-sm my-1"></div>
        <div className="flex flex-wrap gap-1 mt-1">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-2 w-1/5 bg-blue-200 rounded-full"></div>
          ))}
        </div>
      </div>
    )
  }
];

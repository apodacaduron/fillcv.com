
import React from 'react';
import { Template, templates } from '../data/templates';

interface TemplateSelectionProps {
  selectedTemplate: string;
  setSelectedTemplate: (templateId: string) => void;
}

const TemplateSelection = ({ 
  selectedTemplate, 
  setSelectedTemplate 
}: TemplateSelectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Choose a Template</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {templates.map((template) => (
          <div 
            key={template.id}
            className={`cursor-pointer transition-all duration-200 rounded-lg overflow-hidden ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-primary scale-105' 
                : 'ring-1 ring-gray-200 hover:ring-gray-300'
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="aspect-[3/4] bg-gray-50">
              {template.preview}
            </div>
            <div className="p-3 bg-white border-t border-gray-100">
              <h4 className="font-medium text-sm">{template.name}</h4>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {template.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelection;

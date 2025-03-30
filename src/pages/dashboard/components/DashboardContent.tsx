
import { ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

import CVUploadForm from './CVUploadForm';
import ProcessOptions from './ProcessOptions';
import TemplateSelection from './TemplateSelection';

const DashboardContent = () => {
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'text'>('upload');
  const [processType, setProcessType] = useState<'feedback' | 'generate'>('feedback');
  const [position, setPosition] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (uploadMethod === 'upload') {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('target', '')
      await supabase.functions.invoke('ai-cv-feedback', { body: formData })
    } else {
      await supabase.functions.invoke('ai-cv-feedback', { body: { text: 'This is my CV :)', target: '' } })
    }
    
    // Simulate processing delay
    setTimeout(() => {
      setLoading(false);
      toast({
        title: processType === 'feedback' ? "Feedback Generated" : "CV Generated",
        description: processType === 'feedback' 
          ? "Your CV feedback is ready to view!" 
          : "Your new CV has been created successfully!",
      });
    }, 2000);
  };

  return (
    <Card className="shadow-sm border-gray-200/70 overflow-hidden animate-fade-up">
      <CardHeader className="bg-gray-50/50">
        <CardTitle>Create or Improve Your CV</CardTitle>
        <CardDescription>
          Upload your existing CV or input your information to get started
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <CVUploadForm 
            uploadMethod={uploadMethod} 
            setUploadMethod={setUploadMethod} 
            file={file} 
            setFile={setFile} 
          />
          
          <ProcessOptions 
            processType={processType} 
            setProcessType={setProcessType} 
            position={position} 
            setPosition={setPosition} 
          />
          
          {processType === 'generate' && (
            <TemplateSelection 
              selectedTemplate={selectedTemplate} 
              setSelectedTemplate={setSelectedTemplate} 
            />
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between border-t bg-gray-50/50 py-4">
          <Button variant="outline" type="button" asChild>
            <Link to="/">Cancel</Link>
          </Button>
          <Button 
            type="submit" 
            disabled={loading || (uploadMethod === 'upload' && !file)}
            className="flex items-center gap-2"
          >
            {loading ? 'Processing...' : processType === 'feedback' ? 'Get Feedback' : 'Generate CV'}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DashboardContent;

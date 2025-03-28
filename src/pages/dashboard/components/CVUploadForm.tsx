
import { FileText, Upload } from 'lucide-react';
import React, { ChangeEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

interface CVUploadFormProps {
  uploadMethod: 'upload' | 'text';
  setUploadMethod: (method: 'upload' | 'text') => void;
  file: File | null;
  setFile: (file: File | null) => void;
}

const CVUploadForm = ({ uploadMethod, setUploadMethod, file, setFile }: CVUploadFormProps) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <Tabs defaultValue="upload" className="w-full" onValueChange={(v) => setUploadMethod(v as 'upload' | 'text')}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload CV
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Enter Details
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-8 text-center bg-gray-50/50">
            <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-1">Upload your CV</h3>
            <p className="text-muted-foreground text-sm mb-4">PDF format recommended (max 5MB)</p>
            
            <Input 
              id="cv-upload" 
              type="file" 
              accept=".pdf,.doc,.docx,.txt" 
              onChange={handleFileChange}
            />
            <Label htmlFor="cv-upload" asChild>
              <Button type="button" variant="outline" className="mt-2">
                Select File
              </Button>
            </Label>
            
            {file && (
              <div className="mt-4 p-3 bg-primary/10 rounded-lg text-sm flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="font-medium">{file.name}</span>
                <span className="text-muted-foreground ml-auto">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="text" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullname">Full Name</Label>
                <Input 
                  id="fullname" 
                  placeholder="John Doe"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="john@example.com" 
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  placeholder="+1 (555) 123-4567" 
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="website">Website/LinkedIn</Label>
                <Input 
                  id="website" 
                  placeholder="linkedin.com/in/johndoe" 
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="experience">Professional Experience</Label>
                <Textarea 
                  id="experience" 
                  placeholder="Describe your work experience..." 
                  className="mt-1 h-32"
                />
              </div>
              
              <div>
                <Label htmlFor="education">Education</Label>
                <Textarea 
                  id="education" 
                  placeholder="List your educational background..." 
                  className="mt-1 h-20"
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="skills">Skills</Label>
            <Textarea 
              id="skills" 
              placeholder="List your key skills separated by commas..." 
              className="mt-1"
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <Separator className="my-6" />
    </>
  );
};

export default CVUploadForm;

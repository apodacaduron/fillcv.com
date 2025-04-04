import { FileText, Upload } from 'lucide-react';
import React, { ChangeEvent, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

import { ProcessForm } from './DashboardContent';

type Props = {
  uploadMethod: "upload" | "text";
  setUploadMethod: (method: "upload" | "text") => void;
  file: File | null;
  setFile: (file: File | null) => void;
  formInstance: UseFormReturn<ProcessForm, any, undefined>
}

const CVUploadForm = (props: Props) => {
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    if (file) {
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes

      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: `The selected file exceeds the ${maxSize}MB limit. Please choose a smaller file.`,
          variant: "destructive",
        });
        e.target.value = ""; // Reset input
        return;
      }

      props.setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <Tabs
        defaultValue="upload"
        className="w-full"
        onValueChange={(v) => props.setUploadMethod(v as "upload" | "text")}
      >
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
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center bg-gray-50/50"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-1">Upload your CV</h3>
            <p className="text-muted-foreground text-sm mb-4">
              PDF format recommended (max 2MB)
            </p>

            <Input
              ref={fileInputRef}
              id="cv-upload"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <Label htmlFor="cv-upload" asChild>
              <Button type="button" variant="outline" className="mt-2">
                Select File
              </Button>
            </Label>

            {props.file && (
              <div className="mt-4 p-3 bg-primary/10 rounded-lg text-sm flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="font-medium">{props.file.name}</span>
                <span className="text-muted-foreground ml-auto">
                  {(props.file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="text" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="personal_info">Personal information</Label>
              <Textarea
                id="personal_info"
                placeholder="Enter you personal information like full name, email, phone number, website, linkedin"
                className="mt-1 h-20"
                {...props.formInstance.register('personal_info')}
              />
            </div>

            <div>
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                placeholder="Enter a summary..."
                className="mt-1 h-20"
                {...props.formInstance.register('summary')}
              />
            </div>

            <div>
              <Label htmlFor="experience">Professional Experience</Label>
              <Textarea
                id="experience"
                placeholder="Describe your work experience..."
                className="mt-1 h-20"
                {...props.formInstance.register('experience')}
              />
            </div>

            <div>
              <Label htmlFor="education">Education</Label>
              <Textarea
                id="education"
                placeholder="List your educational background..."
                className="mt-1 h-20"
                {...props.formInstance.register('education')}
              />
            </div>

            <div>
              <Label htmlFor="certifications">Certifications</Label>
              <Textarea
                id="certifications"
                placeholder="List your educational background..."
                className="mt-1 h-20"
                {...props.formInstance.register('certifications')}
              />
            </div>
            <div>
              <Label htmlFor="projects">Projects</Label>
              <Textarea
                id="projects"
                placeholder="List your educational background..."
                className="mt-1 h-20"
                {...props.formInstance.register('projects')}
              />
            </div>
            <div>
              <Label htmlFor="languages">Languages</Label>
              <Textarea
                id="languages"
                placeholder="List your educational background..."
                className="mt-1 h-20"
                {...props.formInstance.register('languages')}
              />
            </div>
            <div>
              <Label htmlFor="interests">Interests</Label>
              <Textarea
                id="interests"
                placeholder="List your educational background..."
                className="mt-1 h-20"
                {...props.formInstance.register('interests')}
              />
            </div>
            <div>
              <Label htmlFor="skills">Skills</Label>
              <Textarea
                id="skills"
                placeholder="List your key skills separated by commas..."
                className="mt-1"
                {...props.formInstance.register('skills')}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-6" />
    </>
  );
};

export default CVUploadForm;

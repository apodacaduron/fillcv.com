import { ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import FullPageLoader from '@/components/FullPageLoader';
import { Button } from '@/components/ui/button';
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { loadingMessages } from '@/data/loading-messages';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { pickRandomFromArray } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';

import CVUploadForm from './CVUploadForm';
import ProcessOptions from './ProcessOptions';
import TemplateSelection from './TemplateSelection';

const DashboardContent = () => {
  const [title, setTitle] = useState(pickRandomFromArray(loadingMessages.titles));
  const [description, setDescription] = useState(pickRandomFromArray(loadingMessages.subtitles));
  const [uploadMethod, setUploadMethod] = useState<"upload" | "text">("upload");
  const [processType, setProcessType] = useState<"feedback" | "generate">(
    "feedback"
  );
  const [position, setPosition] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("minimal");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const submitFormMutation = useMutation({
    mutationFn: async (e: React.FormEvent) => {
      e.preventDefault();

      if (uploadMethod === "upload") {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("target", position);
        return await supabase.functions.invoke("ai-cv-feedback", { body: formData });
      } else {
        return await supabase.functions.invoke("ai-cv-feedback", {
          body: { text: "This is my CV :)", target: position },
        });
      }
    },
    onSuccess(response) {
      if (response?.data?.data?.id) {
        navigate(`/feedbacks/${response?.data?.data?.id}`);
      }
    },
    onError(error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error?.message ?? "There was a problem with your request.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (!submitFormMutation.isPending) return;

    const interval = setInterval(() => {
      setTitle(pickRandomFromArray(loadingMessages.titles));
      setDescription(pickRandomFromArray(loadingMessages.subtitles));
    }, 6000);

    return () => clearInterval(interval); // Limpia el intervalo cuando submitFormMutation.isPending es false
  }, [submitFormMutation.isPending]);

  return (
    <Card className="shadow-sm border-gray-200/70 overflow-hidden animate-fade-up">
      {submitFormMutation.isPending && <FullPageLoader title={title} description={description} />}

      <CardHeader className="bg-gray-50/50">
        <CardTitle>Create or Improve Your CV</CardTitle>
        <CardDescription>
          Upload your existing CV or input your information to get started
        </CardDescription>
      </CardHeader>

      <form onSubmit={submitFormMutation.mutate}>
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

          {processType === "generate" && (
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
            disabled={
              submitFormMutation.isPending ||
              (uploadMethod === "upload" && !file)
            }
            className="flex items-center gap-2"
          >
            {submitFormMutation.isPending
              ? "Processing..."
              : processType === "feedback"
              ? "Get Feedback"
              : "Generate CV"}
            {!submitFormMutation.isPending && (
              <ArrowRight className="h-4 w-4" />
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DashboardContent;

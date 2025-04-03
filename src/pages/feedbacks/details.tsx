import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

const FeedbackDetails = () => {
  const params = useParams();
  const conversationQuery = useQuery({
    queryKey: ["conversation", params?.id],
    async queryFn() {
      return await supabase
        .from("conversations")
        .select("*, feedbacks(read)")
        .eq("feedback_id", params?.id)
        .single();
    },
  });

  return (
    <div className="h-[calc(100vh_-_112px)] flex flex-col overflow-y-scroll">
      <main className="flex-grow">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 animate-fade-up">
              <h1 className="text-3xl font-bold mb-2">
                AI-Powered CV Feedback
              </h1>
              <p className="text-muted-foreground">
                Review the detailed feedback from our AI, and improve your CV
                for your next job opportunity!
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-gray-100 p-4 rounded-md max-w-[80%]">
                <Markdown>{conversationQuery?.data?.data?.message}</Markdown>
              </div>
              <div className="bg-blue-300 p-4 rounded-md max-w-[80%] ml-auto">
                <Markdown>{conversationQuery?.data?.data?.message}</Markdown>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeedbackDetails;

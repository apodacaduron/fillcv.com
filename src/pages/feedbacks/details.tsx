import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import { supabase } from '@/lib/supabase';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

const FeedbackDetails = () => {
  const params = useParams();

  const PAGE_SIZE = 10; // Número de elementos por página

  const conversationsQuery = useInfiniteQuery({
    queryKey: ["conversation", params?.id],
    queryFn: async ({ pageParam = 0 }) => {
      const { data, error } = await supabase
        .from("conversations")
        .select("*, feedbacks(read)")
        .eq("feedback_id", params?.id)
        .range(pageParam, pageParam + PAGE_SIZE - 1); // Paginar los resultados

      if (error) throw new Error(error.message);
      return {
        data,
        nextPage: data.length === PAGE_SIZE ? pageParam + PAGE_SIZE : null,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
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
              {conversationsQuery.data?.pages?.map((page, i) => (
                <div key={i}>
                  {page?.data?.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 rounded-md max-w-[80%] animate-fade-up ${
                        conversation.sender === "model"
                          ? "bg-gray-100"
                          : "bg-blue-300 ml-auto"
                      }`}
                    >
                      <Markdown>{conversation?.message}</Markdown>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeedbackDetails;

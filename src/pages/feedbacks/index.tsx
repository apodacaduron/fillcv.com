import { MoreVertical } from 'lucide-react';
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/lib/supabase';
import { useInfiniteQuery } from '@tanstack/react-query';

const Feedbacks = () => {
  const PAGE_SIZE = 10; // Número de elementos por página

  const feedbacksQuery = useInfiniteQuery({
    queryKey: ["feedbacks"],
    queryFn: async ({ pageParam = 0 }) => {
      const { data, error } = await supabase
        .from("feedbacks")
        .select("*")
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b">
      <main className="flex-grow">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 animate-fade-up">
              <h1 className="text-3xl font-bold mb-2">Feedbacks</h1>
              <p className="text-muted-foreground">
              Upload your CV and get AI-powered insights to improve it. 🚀
              </p>
            </div>

            {feedbacksQuery.isLoading && <div className="grid gap-4 mt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-fade-up">
              {Array.from({length: 20}).map((_, i) => <Skeleton key={`skeleton-${i}`} className="h-[163px] rounded-xl" />)}
            </div>}

            {feedbacksQuery.isSuccess && <div className="grid gap-4 mt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-fade-up">
              {feedbacksQuery.data?.pages?.map((page, i) => (
                <div key={i}>
                  {page?.data?.map((feedback) => (
                    <Link
                      to={`/feedbacks/${feedback.id}`}
                      key={feedback.id}
                      className="bg-white dark:bg-neutral-800 shadow-md p-4 rounded-lg border dark:border-neutral-700 hover:shadow-lg transition relative block"
                    >
                      {/* Card Header */}
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-semibold text-lg flex items-center gap-2 line-clamp-2 leading-tight mb-3">
                            {feedback.feedback_title}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-neutral-500 line-clamp-4">
                            <Markdown>{feedback.feedback_text}</Markdown>
                          </span>
                        </div>
                        <Button
                          size="icon"
                          className="absolute -top-4 -right-4"
                        >
                          <MoreVertical />
                        </Button>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feedbacks;

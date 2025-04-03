import { Tables } from 'database.types';
import { FileX, Loader2, MoreVertical, Trash } from 'lucide-react';
import React from 'react';
import Markdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';

import FeedbackState from '@/components/FeedbackState';
import { Button } from '@/components/ui/button';
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

const Feedbacks = () => {
  const PAGE_SIZE = 10; // Número de elementos por página

  const [deletingItem, setDeletingItem] =
    React.useState<Tables<"feedbacks"> | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();
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
  const deleteFeedbackMutation = useMutation({
    mutationFn: async (feedback: Tables<"feedbacks">) => {
      return await supabase
        .from("resumes")
        .delete()
        .eq("id", feedback.resume_id);
    },
    onSuccess() {
      setDeletingItem(null);
      feedbacksQuery.refetch();
    },
    onError(error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error?.message ?? "There was a problem with your request.",
        variant: "destructive",
      });
    },
  });

  function openDeleteFeedbackDialog(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    feedback: Tables<"feedbacks">
  ) {
    event.stopPropagation();
    setDeletingItem(feedback);
  }

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

            {feedbacksQuery.isError &&
              !feedbacksQuery.data?.pages?.find(Boolean)?.data?.length && (
                <FeedbackState
                  imageSrc="/undraw_server-down_lxs9.svg"
                  title="Something went wrong"
                  description="We are unable to rerieve your feedbacks, try reloading the page"
                />
              )}
            {feedbacksQuery.isSuccess &&
              !feedbacksQuery.data?.pages?.find(Boolean)?.data?.length && (
                <FeedbackState
                  imageSrc="/undraw_add-notes_9xls.svg"
                  actionText="New feedback"
                  title="No feedbacks yet"
                  description="Upload your resume and get AI Feedback"
                  onAction={() => navigate("/dashboard")}
                />
              )}

            {feedbacksQuery.isLoading && (
              <div className="grid gap-4 mt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-fade-up">
                {Array.from({ length: 20 }).map((_, i) => (
                  <Skeleton
                    key={`skeleton-${i}`}
                    className="h-[163px] rounded-xl"
                  />
                ))}
              </div>
            )}

            {feedbacksQuery.isSuccess && (
              <div className="grid gap-4 mt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-fade-up">
                {feedbacksQuery.data?.pages
                  ?.flatMap((page) => page?.data || [])
                  .map((feedback) => (
                    <Link
                      to={`/feedbacks/${feedback.id}`}
                      key={feedback.id}
                      className="bg-white dark:bg-neutral-800 shadow-md p-4 rounded-lg border dark:border-neutral-700 hover:shadow-lg transition relative inline-block"
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="icon"
                              className="absolute -top-4 -right-4"
                            >
                              <MoreVertical />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={(event) =>
                                openDeleteFeedbackDialog(event, feedback)
                              }
                              className="text-red-400"
                            >
                              <Trash className="h-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </Link>
                  ))}
              </div>
            )}

            <Dialog
              open={Boolean(deletingItem)}
              onOpenChange={(open) => !open && setDeletingItem(null)}
            >
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Delete feedback</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to permanently delete feedback{" "}
                    <b>{deletingItem?.feedback_title}</b>?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setDeletingItem(null)}
                    >
                      Close
                    </Button>
                  </DialogClose>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => deleteFeedbackMutation.mutate(deletingItem)}
                    disabled={deleteFeedbackMutation.isPending}
                  >
                    {deleteFeedbackMutation.isPending && (
                      <Loader2 className="animate-spin" />
                    )}
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feedbacks;

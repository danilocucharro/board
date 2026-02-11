import { ThumbsUpIcon } from "lucide-react";
import type { IssueInteractionsResponseSchema } from "@/api/routes/schemas/issue-interactions";
import { Button } from "./button";
import { ComponentProps, MouseEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "@/http/toggle-like";
import { z } from "zod";

interface LikeButtonProps extends ComponentProps<"button"> {
  issueId: string;
  initialLikes: number;
  initialLiked?: boolean;
}

type IssueInteractionsResponse = z.infer<
  typeof IssueInteractionsResponseSchema
>;

export function LikeButton({
  issueId,
  initialLikes,
  initialLiked = false,
  ...props
}: LikeButtonProps) {
  const queryClient = useQueryClient();

  const { mutate: onToggleLike, isPending } = useMutation({
    mutationFn: () => toggleLike({ issueId }),
    onMutate: async () => {
      const previousData =
        queryClient.getQueriesData<IssueInteractionsResponse>({
          queryKey: ["issue-likes"],
        });

      queryClient.setQueriesData<IssueInteractionsResponse>(
        { queryKey: ["issue-likes"] },
        (old) => {
          if (!old) {
            return undefined;
          }

          return {
            ...old,
            interactions: old.interactions.map((interaction) => {
              if (interaction.issueId === issueId) {
                return {
                  ...interaction,
                  isLiked: !interaction.isLiked,
                  likesCount: interaction.isLiked
                    ? interaction.likesCount - 1
                    : interaction.likesCount + 1,
                };
              }

              return interaction;
            }),
          };
        },
      );

      return { previousData };
    },
    onError: async (_err, _params, context) => {
      if (context?.previousData) {
        for (const [queryKey, data] of context.previousData) {
          queryClient.setQueryData<IssueInteractionsResponse>(queryKey, data);
        }
      }
    },
  });

  const liked = initialLiked;

  function handleToogleLike(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation(); // Vai fazer com que o click tenha efeito apenas no componnete clicado e nao nos outrous componnetes acima dele

    onToggleLike();
  }

  return (
    <Button
      data-liked={liked}
      className="data-[liked=true]:bg-indigo-600 data-[liked=true]:text-white data-[liked=true]:hover:bg-indigo-500"
      aria-label={liked ? "Unlike" : "Like"}
      disabled={isPending}
      onClick={handleToogleLike}
      {...props}
    >
      <ThumbsUpIcon className="size-3" />
      <span className="text-sm">{initialLikes}</span>
    </Button>
  );
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { CommentProduct } from "@/types";
import { showError, showSuccess } from "@/components/toast/Toast";

interface CommentPayload {
  body: string;
  productId: string;
  star: number;
}

const createComment = async (data: CommentPayload): Promise<CommentProduct> => {
  const res = await request.post<{data: CommentProduct}>("/user/comment/add", data);
  return res.data.data;
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<CommentProduct, AxiosError, CommentPayload>({
    mutationFn: createComment,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
      showSuccess(`Created successfully!`);
    },
    onError: () => {
     showError(`Error`);
    },
  });
};

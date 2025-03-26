import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { QuestionProduct } from "@/types";
import { showError, showSuccess } from "@/components/toast/Toast";

interface QuestionPayload {
  body: string;
  productId: string;
}

const postQuestion = async (data: QuestionPayload): Promise<QuestionProduct> => {
  const res = await request.post<QuestionProduct>("/user/question/add", data);
  return res.data;
};

export const usePostQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation<QuestionProduct, AxiosError, QuestionPayload>({
    mutationFn: postQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question"] });
      showSuccess(`Sent successfully!`);
    },
    onError: () => {
     showError(`Something went wrong!`);
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { CommentProduct } from "@/types";
import { showError, showSuccess } from "@/components/toast/Toast";

import { CREATE_PRODUCT_COMMENTS, GET_PRODUCT_COMMENTS } from "@/constants";

interface CommentPayload {
  body: string;
  productId: string;
  star: number;
}

const createComment = async (data: CommentPayload): Promise<CommentProduct> => {
  const res = await request.post<{data: CommentProduct}>(CREATE_PRODUCT_COMMENTS, data);
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


export const getProductComments = async (productId: string) => {
  try {
    const res = await request(`${GET_PRODUCT_COMMENTS}/${productId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
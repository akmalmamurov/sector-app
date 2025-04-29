"use client";
import { getSingleOrder } from "@/api";
import { SingleOrderLeft, SingleOrderRight } from "@/components/single-order";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const SingleOrder = () => {
  const { id } = useParams();
  const { data: order } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getSingleOrder(id as string),
  });
  console.log(order);

  return (
    <section className="grid grid-cols-12 gap-[30px]">
      {/* single order left */}
      <SingleOrderLeft />
      {/* single order right */}
      <SingleOrderRight />
    </section>
  );
};

export default SingleOrder;

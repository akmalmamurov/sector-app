import { getSingleOrder } from "@/api";
import { SingleOrderLeft, SingleOrderRight } from "@/components/single-order";
type Props = {
  params: Promise<{ id: string }>;
};
const SingleOrder = async ({ params }: Props) => {
  const { id } = await params;
  const order = await getSingleOrder(id);
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

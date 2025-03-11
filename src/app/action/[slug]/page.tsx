const SinglePromotionPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <div>
      <h1>ffff</h1>
      <p>{slug}</p>
    </div>
  );
};

export default SinglePromotionPage;

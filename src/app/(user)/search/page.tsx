type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const SearchPage = ({ searchParams }: Props) => {
  const query = searchParams.query || "Default Query";

  console.log(query);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-blue-600 uppercase">
        {query}
      </h1>
    </div>
  );
};

export default SearchPage;

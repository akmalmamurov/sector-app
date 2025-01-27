interface Props {
  searchParams: {
    query?: string;
  };
}
const SearchPage = ({ searchParams }: Props) => {
  const { query } = searchParams;
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

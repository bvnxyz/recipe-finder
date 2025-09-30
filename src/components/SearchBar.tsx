export const SearchBar = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (query: string) => void;
}) => {
  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-2xl">
        <input
          value={query}
          type="text"
          placeholder="Search..."
          className="
            w-full 
            px-5 py-3 
            rounded-full 
            border border-gray-300 
            shadow-sm 
            text-gray-700 
            placeholder-gray-400
          "
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

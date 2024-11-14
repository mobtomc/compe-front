const SuggestionsComponent = ({ suggestions }) => {
  return (
    <div
      className="p-4 bg-gray-900 rounded-xl shadow-md overflow-auto mt-6"
      style={{ maxHeight: "400px" }}
    >
      <h2 className="text-2xl text-white font-bold">Suggestions</h2>
      {Array.isArray(suggestions) && suggestions.length > 0 ? (
        <ul className="mt-2 text-gray-500">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="mb-2">
              {suggestion}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-gray-400">No suggestions available.</p>
      )}
    </div>
  );
};

export default SuggestionsComponent;

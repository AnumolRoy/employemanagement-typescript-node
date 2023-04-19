import  { useState } from "react";
import * as React from "react";

export interface Props {
  onSearch: (searchText: string) => void;
}

function Search({ onSearch }: Props): JSX.Element {
  const [searchText, setSearchText] = useState("");

  // Function to handle changes to search text
  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Trimming the search text and setting it to state
    const searchText = e.target.value.toString().trim();
    setSearchText(searchText.trim());

    // Calling the onSearch function with the lowercase search text
    onSearch(searchText.toLowerCase());
  };

  // Render the search input field
  return (
    <div className="mb-4">
      <label className="block ">
        Search
      </label>
      <input
        className="shadow "
        type="text"
        value={searchText}
        placeholder="Search here....."
        onChange={handleSearchTextChange}
      />
    </div>
  );
}

export default Search;

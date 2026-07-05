// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiSearch } from "react-icons/fi";

// function SearchBar() {
//   const [keyword, setKeyword] = useState("");
//   const navigate = useNavigate();

//   const submitHandler = (e) => {
//     e.preventDefault();

//     if (keyword.trim()) {
//       navigate(`/products?search=${keyword}`);
//     } else {
//       navigate("/products");
//     }
//   };

//   return (
//     <form onSubmit={submitHandler} className="search-bar">

//       <FiSearch className="search-icon" />

//       <input
//         type="text"
//         placeholder="Search products..."
//         value={keyword}
//         onChange={(e) => setKeyword(e.target.value)}
//       />

//     </form>
//   );
// }

// export default SearchBar;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";

function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products?search=${encodeURIComponent(keyword)}`);
    } else {
      navigate("/products");
    }
  };

  const clearSearch = () => {
    setKeyword("");
    navigate("/products");
  };

  return (
    <form onSubmit={submitHandler} className="search-bar">

      <FiSearch className="search-icon" />

      <input
        type="text"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {keyword && (
        <FiX
          className="clear-icon"
          onClick={clearSearch}
        />
      )}

    </form>
  );
}

export default SearchBar;
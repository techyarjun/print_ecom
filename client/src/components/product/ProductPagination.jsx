import "../styles/product/ProductPagination.css";

function ProductPagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  if (totalPages <= 1) return null;

  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  return (
    <div className="pagination-wrapper">

      <button
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage(currentPage - 1)
        }
      >
        ← Previous
      </button>

      {pages.map((page) => (

        <button
          key={page}
          className={
            currentPage === page
              ? "active"
              : ""
          }
          onClick={() =>
            setCurrentPage(page)
          }
        >
          {page}
        </button>

      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          setCurrentPage(currentPage + 1)
        }
      >
        Next →
      </button>

    </div>
  );
}

export default ProductPagination;
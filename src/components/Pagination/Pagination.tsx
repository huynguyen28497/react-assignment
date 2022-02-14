import React, { useEffect, useState } from "react";
import "./styles.scss";

interface IPaginationProps {
  page: number;
  setPage: (value: number) => void;
  count: number;
  itemPerPage: number;
}

const Pagination = (props: IPaginationProps) => {
  const { page = 0, setPage, count, itemPerPage } = props;
  const [allButton, setAllButton] = useState(0);

  useEffect(() => {
    setAllButton(Math.ceil(count / itemPerPage));
  }, [count, itemPerPage]);

  return (
    <div className="pagination-root">
      {Array.from(Array(allButton).keys()).map((_) => (
        <button
          className={`pagination-button ${
            _ === page && "pagination-button--active"
          }`}
          onClick={() => setPage(_)}
        >
          {_ + 1}
        </button>
      ))}
      {page+1 !== allButton ? (
        <button
          className={`pagination-button`}
          onClick={() => setPage(page + 1)}
        >
          {">"}
        </button>
      ) : null}
    </div>
  );
};

export default Pagination;

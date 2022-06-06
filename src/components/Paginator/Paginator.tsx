import React from "react";
import styles from "./Paginator.module.scss";

function generatorArr(from: number, to: number) {
  const arrItems = to + 1 - from;
  let currentValue = from;
  return [...new Array(arrItems)].map(() => currentValue++);
}

const getMaxPageNum = (
  currentPage: number,
  totalPages: number,
  numbersPerPage: number
) => {
  const AVERAGE = Math.ceil(numbersPerPage / 2);

  if (currentPage <= AVERAGE) {
    return totalPages > numbersPerPage ? numbersPerPage : totalPages;
  } else if (currentPage + AVERAGE > totalPages) {
    return totalPages;
  }

  return currentPage + AVERAGE - 1;
};

const getMinPageNum = (
  currentPage: number,
  totalPages: number,
  numbersPerPage: number
) => {

  console.log(currentPage, totalPages, numbersPerPage)

  const AVERAGE = Math.floor(numbersPerPage / 2);
  const maxNumPerPage = Math.min(totalPages, numbersPerPage);

  if (currentPage <= AVERAGE) {
    return 1;
  } else if (currentPage + AVERAGE > totalPages) {
    return totalPages - maxNumPerPage + 1;
  }

  return currentPage - AVERAGE;
};

interface Props {
  currentPage: number;
  totalPages: number;
  onPageClick: (currentPage: number) => void;
  maxPages?: number;
}

const Paginator: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageClick,
  maxPages = 10,
}) => {


  if(totalPages < 0) {
    return null
  }

  const lastPage = getMaxPageNum(currentPage, totalPages, maxPages);
  const firstPage = getMinPageNum(currentPage, totalPages, maxPages);
  const paginationList = generatorArr(firstPage, lastPage);



  const elements = paginationList.map((numbers, index) => {
    return (
      <li
        className={
          currentPage + 1 === numbers ? `page-item active` : "page-item"
        }
        key={index}
      >
        <span
          onClick={() => {
            onPageClick(numbers);
          }}
          className="page-link"
        >
          {numbers}
        </span>
      </li>
    );
  });




  return (
    <div className={styles.pagination}>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li
            className="page-item"
            onClick={() => {
              onPageClick(currentPage - 1);
            }}
          >
            {currentPage > 6 ? <span className="page-link">Previous</span> : ""}
          </li>
          {elements}
          <li
            className="page-item"
            onClick={() => {
              onPageClick(currentPage + 1);
            }}
          >
            {currentPage <= totalPages - 1 ? (
              <span className="page-link">Next</span>
            ) : (
              ""
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Paginator;

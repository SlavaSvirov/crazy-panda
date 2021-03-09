import React from "react";
import styles from "./Pagination.module.css";

export const Pagination = ({ perPage, totalComments, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalComments / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumbers.map((number) => {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={styles.pageItems}
            >
              <div>{number}</div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

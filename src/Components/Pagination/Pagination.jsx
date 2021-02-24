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
            <li key={number} className={styles.pageItems}>
              <a
                onClick={() => paginate(number)}
                href="!#"
                className={styles.pageLink}
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
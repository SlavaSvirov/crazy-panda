import React from "react";
import { Pagination } from "../Pagination/Pagination";
import { Search } from "../Search/Search";
import styles from "./Table.module.css";

export const Table = () => {
  const [error, setError] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [sortedComments, setSortedComments] = React.useState([]);
  const [isSorted, setIsSorted] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const items = await response.json();
        const preparedItems = items.map(({ id, name, email, body }) => ({
          id,
          name,
          email,
          body,
        }));

        setComments(preparedItems);
        setSortedComments(preparedItems.slice(0, perPage));
        setIsLoaded(true);
      } catch (error) {
        setIsLoaded(true);
        setError(error);
      }
    })();
  }, []);

  const indexOfLastComment = currentPage * perPage;
  const indexOfFirstComment = indexOfLastComment - perPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  React.useEffect(() => {
    setSortedComments(currentComments);
  }, [currentPage, perPage]);

  const handleClickSort = (e) => {
    const field = e.target.dataset.field;
    let direction = isSorted ? -1 : 1;
    const sortedElements = currentComments.sort((a, b) => {
      if (a[field] === b[field]) return 0;
      return a[field] > b[field] ? direction : -direction;
    });

    setSortedComments([...sortedElements]);
    setIsSorted(!isSorted);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toString();
    const filteredItems = currentComments.filter((item) => {
      const test = Object.keys(item).some((field) => {
        if (item[field] !== Object(item[field])) {
          const result =
            item[field].toString().toLowerCase().search(value) !== -1;
          if (result) {
            return item;
          }
        }
      });
      return test;
    });
    setSortedComments(filteredItems);
  };
  const handleChangePerPage = (e) => {
    setPerPage(e.target.value);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // setSortedItems(currentComments);

  // const commentsLength = comments.length;
  // const pagesCount = Math.ceil(commentsLength / perPage);
  // const arr = new Array(pagesCount);

  if (error) {
    return <p>Error {error.message} </p>;
  } else if (!isLoaded) {
    return "loading...";
  } else {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <Search
            onChangePerPage={handleChangePerPage}
            onChange={handleSearch}
          />
          <table>
            <thead>
              <th data-field="id" onClick={handleClickSort}>
                Id
              </th>
              <th data-field="name" onClick={handleClickSort}>
                Name
              </th>
              <th data-field="body" onClick={handleClickSort}>
                body
              </th>
              <th data-field="email" onClick={handleClickSort}>
                E-mail
              </th>
            </thead>
            <tbody>
              {sortedComments.map((el) => {
                return (
                  <tr className={styles.row}>
                    <td className="id">{el.id}</td>
                    <td className="name">{el.name}</td>
                    <td className="body">{el.body}</td>
                    <td className="email">{el.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            paginate={paginate}
            perPage={perPage}
            totalComments={comments.length}
          />
        </div>
      </div>
    );
  }
};

// Необходимо разработать javascript-компонент для построения таблицы с дополнительными возможностями для пользователя.

// Функционал: Клиентская пагинация: данные необходимо отображать постранично, максимум 50 элементов на страницу, необходимо предоставить пользовательскую навигацию для перехода по страницам.
// Сортировка по столбцам: при нажатии на название столбца строки таблицы сортируются по возрастанию, при повторном клике - по убыванию.
// Фильтрация: компонент предоставляет текстовое поле, в которое пользователь может ввести текст и строки таблицы, данные которых не содержат подстроку, введённую пользователем, скрываются. Перефильтрация осуществляется на каждое изменение значения поля.

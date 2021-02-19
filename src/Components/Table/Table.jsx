import React from "react";
import { Search } from "../Search/Search";
import styles from "./Table.module.css";
import ReactPaginate from "react-paginate";

const PAGE_SIZE = 50;

export const Table = () => {
  const [error, setError] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [sortedItems, setSortedItems] = React.useState([]);
  const [isSorted, setIsSorted] = React.useState(true);
  const [offset, setOffset] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);

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
        let slice = preparedItems.slice(offset, offset + PAGE_SIZE);
        setItems(preparedItems);
        setSortedItems(slice);
        setIsLoaded(true);
      } catch (error) {
        setIsLoaded(true);
        setError(error);
      }
    })();
  }, []);

  const handleClickSort = (event) => {
    const field = event.target.dataset.field;
    let direction = isSorted ? -1 : 1;
    const sortedElements = items.sort((a, b) => {
      if (a[field] === b[field]) return 0;
      return a[field] > b[field] ? direction : -direction;
    });

    setSortedItems([...sortedElements]);
    setIsSorted(!isSorted);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toString();
    const filteredItems = items.filter((item) => {
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
    setSortedItems(filteredItems);
  };
  const itemsLength = items.length;
  const pagesCount = Math.ceil(itemsLength / PAGE_SIZE);
  const arr = new Array(pagesCount);

  const loadMoreData = () => {
    let slice = items.slice(offset, offset + PAGE_SIZE);
    setSortedItems(slice);
  };
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * PAGE_SIZE;
    setCurrentPage(selectedPage);
    setOffset(offset);
    loadMoreData();
  };

  if (error) {
    return <p>Error {error.message} </p>;
  } else if (!isLoaded) {
    return "loading...";
  } else {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <Search onChange={handleSearch} />
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
              {sortedItems.map((el) => {
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
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            pageCount={pagesCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
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

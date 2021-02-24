import styles from "./Search.module.css";

export const Search = ({ onChange, onChangePerPage }) => {
  return (
    <div>
      <input
        placeholder="Введите запрос"
        className={styles.searchBar}
        onChange={onChange}
        type="text"
      />
      <label htmlFor="select">Выводить на страницу по</label>
      <select onChange={onChangePerPage} htmlFor="select">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};

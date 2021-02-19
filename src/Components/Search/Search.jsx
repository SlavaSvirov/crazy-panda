import styles from "./Search.module.css";

export const Search = ({ onChange }) => {
  return <input onChange={onChange} type="text" />;
};

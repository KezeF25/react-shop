import React from "react";
import debounce from "lodash.debounce";

import styles from "./Search.module.scss";
import close_icon from '../../assets/img/close_icon.svg';
import { setSearchValue } from "../../redux/slices/filterSlice";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";


const Search: React.FC = () => {

  const searchValue = useSelector((state: RootState) => state.filter.searchValue);

  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    startDebounce(event.target.value);
  }

  const startDebounce = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 500),
    [],
  );

  const onClickClose = () => {
    dispatch(setSearchValue(''));
    setValue('');
    if (inputRef.current !== null){
      inputRef.current.focus();
    }
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 50 50"
        height="50px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 50 50"
        width="50px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect fill="none" height="50" width="50" />
        <circle
          cx="21"
          cy="20"
          fill="none"
          r="16"
          stroke="#000000"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          stroke="#000000"
          strokeMiterlimit="10"
          strokeWidth="4"
          x1="32.229"
          x2="45.5"
          y1="32.229"
          y2="45.5"
        />
      </svg>
      <input ref={inputRef} value={value} onChange={onChangeInput} className={styles.search} placeholder="Поиск..." />
      {searchValue && <img onClick={onClickClose} src={close_icon} className={styles.close_icon} alt="close"/>}
    </div>
  );
};

export default Search;

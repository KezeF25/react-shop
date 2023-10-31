import React from "react";
import { useDispatch } from "react-redux";

import styles from "./Pagination.module.scss";

type PaginationProps = {
  page: number;
  setPage: any;
}

const Pagination: React.FC<PaginationProps> = ({page, setPage}) => {
  const dispatch = useDispatch()
  const countPage = 2;

  return (
    <div className={styles.root}>
      <ul>
        {[...new Array(countPage)].map((_, index) => <li key={index} onClick={() => dispatch(setPage(index + 1))} className={page === index + 1 ? styles.active : styles.page} >{index + 1}</li>)}
      </ul>
    </div>
  );
};

export default Pagination;

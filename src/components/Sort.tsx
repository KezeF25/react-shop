import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";
import { RootState, useAppDispatch } from "../redux/store";

type SortItem = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title';
  sortOption: 'desc' | 'asc';
};

export const sortList: SortItem[] = [
  { name: "популярности (убыв.)", sortProperty: "rating", sortOption: "desc" },
  { name: "популярности (возр.)", sortProperty: "rating", sortOption: "asc" },
  { name: "цене (убыв.)", sortProperty: "price", sortOption: "desc" },
  { name: "цене (возр.)", sortProperty: "price", sortOption: "asc" },
  { name: "алфавиту", sortProperty: "title", sortOption: "asc" },
];

const Sort: React.FC = React.memo(() => {

  console.log('Sort перерисовался');

  const dispatch = useAppDispatch();
  const sortSelect = useSelector((state: RootState) => state.filter.sort);

  const [popupOpen, setPopupOpen] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const onClickSortList = (name: SortItem) => {
    dispatch(setSort(name));
    setPopupOpen(false);
  };

  React.useEffect(() => {
    const HandleClick = (event: MouseEvent) => {

      if (!(event.target as Element).closest(".sort")) {
        setPopupOpen(false);
      }
    };

    document.body.addEventListener("click", HandleClick);

    return () => {
      document.body.removeEventListener("click", HandleClick);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setPopupOpen(!popupOpen)}>{sortSelect.name}</span>
      </div>
      {popupOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, index) => {
              return (
                <li
                  onClick={() => onClickSortList(obj)}
                  key={index}
                  className={sortSelect.name === obj.name ? "active" : ""}
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
})

export default Sort;

import React from "react";
import { useDispatch } from "react-redux";

type CategoriesProps = {
  activeCategories: number,
  setActiveCategories: any,
  setPage: any,
}

const categoriesName = ['Все', 'Корпусы', 'Видеокарты', 'SSD', 'Мониторы', 'Материнские платы'];

const Categories: React.FC<CategoriesProps> = React.memo(({ setActiveCategories, activeCategories, setPage }) => {

  console.log('Categories перерисовался');

  const dispatch = useDispatch();

  const switchCategory = (index: number) => {
    dispatch(setActiveCategories(index));
    dispatch(setPage(1));
  }

  return (
    <div className="categories">
      <ul>
        {
          categoriesName.map((obj, index) => {
             return <li key={index} onClick={() => switchCategory(index)} className={activeCategories === index ? 'active' : ''}>
              {obj}
            </li>
          })
        }
      </ul>
    </div>
  );
})

export default Categories;
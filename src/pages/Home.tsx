import React from "react";
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import { filterSliceState, setCategoryId, setCurrentPage, setFilter } from "../redux/slices/filterSlice";
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import ItemBlock from '../components/ItemBlock';
import Skeleton from '../components/ItemBlock/Skeleton';
import Pagination from "../components/Pagination";
import { fetchComputerItems } from "../redux/slices/requestBackendSlice";
import { RootState, useAppDispatch } from "../redux/store";

export const Home: React.FC = () => {

  console.log('Home перерисовался');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const startFetch = React.useRef(false);
  const firstLaunch = React.useRef(true);

  const {items, status} = useSelector((state: RootState) => state.request);
  const activeCategories = useSelector((state: RootState) => state.filter.categoryId);
  const sortSelect = useSelector((state: RootState) => state.filter.sort)
  const currentPage = useSelector((state: RootState) => state.filter.currentPage)
  const searchValue = useSelector((state: RootState) => state.filter.searchValue);

  const fetchRequest = async () => {

    const category = activeCategories ? '&category=' + activeCategories : '';
    const sort = `&sortBy=${sortSelect.sortProperty}&order=${sortSelect.sortOption}`
    const pageNumber = `page=${currentPage}&limit=8`;

    dispatch(fetchComputerItems({category, sort, pageNumber}));
  }

  React.useEffect(() => {
    if (!firstLaunch.current){
      const QueryString = qs.stringify({
        sortSelect : sortSelect.sortProperty,
        activeCategories,
        currentPage,
      });
  
      navigate(`?${QueryString}`);
    }
    firstLaunch.current = false

  },[activeCategories, sortSelect, currentPage])

  React.useEffect(() => {
    if (window.location.search){
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortSelect);

      if (sort){
        params.sort = sort;
      }
      
      dispatch(
        setFilter((params as unknown) as filterSliceState)
      );

      startFetch.current = true;
    }
  }, [])

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!startFetch.current){
      fetchRequest();
    }

    startFetch.current = false;
  }, [activeCategories, sortSelect, currentPage, searchValue]);

  return (
    <>
      <div className="content__top">
        <Categories setActiveCategories={setCategoryId} activeCategories={activeCategories} setPage={setCurrentPage} />
        <Sort />
      </div>
      <h2 className="content__title">Товар</h2>
      {status === 'error' ? 
        <div className="cart cart--empty">
          <h2>
            Проблемы с подключением <span>😕</span>
          </h2>
        </div>
        :
        <div className="content__items">
        {status === 'loading'
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.filter((obj) => {
            if (obj.title.toLowerCase().includes(searchValue.toLowerCase())){
              return true;
            }
            return false;
          }).map((obj: any) => {
              return <ItemBlock key={obj.id} {...obj} />;
            })}
        </div>
      }
      <Pagination page={currentPage} setPage={setCurrentPage} />
    </>
  );
};

export default Home;

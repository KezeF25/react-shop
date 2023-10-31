import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, addItem } from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";

type ItemBlockProps = {
  id: string,
  title: string,
  imgURL: string,
  description: string,
  price: number,
}

const ItemBlock: React.FC<ItemBlockProps> = ({id, title, imgURL, description, price}) => {
  const cartItem = useSelector((state: RootState) => state.cart.items.find(obj => obj.id === id));
  const dispatch = useDispatch();

  const count = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      imgURL,
      title,
      price,
      count: 0,
    }
    dispatch(addItem(item));
  }

  return (
    <div className="item-block">
      <img
        className="item-block__image"
        src={imgURL}
        alt="Parts"
      />
      <h4 className="item-block__title">{title}</h4>
      <div className="item-block__selector">
        {description}
      </div>
      <div className="item-block__bottom">
        <div className="item-block__price">{price} руб.</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {count > 0 && <i>{count}</i>}
        </button>
      </div>
    </div>
  );
}

export default ItemBlock;

import { ComponentProps, useEffect } from "react";
import classes from "./List.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/typedReduxHooks";
import { fetchUpdateList } from "../../store/slices/productSlice";
import { IProduct } from "../../api/types";
import Pagination from "../Pagination/Pagination";

const errorsToReload = [500];

const List = function ({ className = "", ...props }: ComponentProps<"div">) {
  const dispatch = useAppDispatch();
  const { isLoading, loadStatus, loadError, products } = useAppSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchUpdateList());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (loadError && errorsToReload.includes(loadStatus)) {
      console.error("Error: " + loadError);
      dispatch(fetchUpdateList());
    }
  }, [loadError]); // eslint-disable-line react-hooks/exhaustive-deps

  const uniqueProducts = products ? getUniqueProducts(products) : null;

  const normalContent = (
    <div className={classes.list}>
      {!uniqueProducts || !uniqueProducts.length ? (
        <p className={classes.status}>List is empty</p>
      ) : (
        uniqueProducts.map((item) => (
          <div className={classes.listItem} key={item.id}>
            <p className={classes.itemId}>ID: {item.id}</p>
            <p>Brand: {item.brand || "-"}</p>
            <p>Product: {item.product}</p>
            <p>Price: {item.price}</p>
          </div>
        ))
      )}
    </div>
  );
  const loadingContent = <p className={classes.status}>loading</p>;
  const loadErrorContent = <p className={classes.status}>{loadError}</p>;
  let content = normalContent;
  if (isLoading || !uniqueProducts) content = loadingContent;
  if (!isLoading && loadError !== null) content = loadErrorContent;

  return (
    <div className={`${className} ${classes.default}`} {...props}>
      <Pagination />
      {content}
    </div>
  );
};
export default List;

const getUniqueProducts = (products: IProduct[]): IProduct[] => {
  const ids: string[] = [];
  const filtered = products.filter((p) => {
    if (p.id && !ids.includes(p.id)) {
      ids.push(p.id);
      return true;
    }
    return false;
  });
  return filtered;
};

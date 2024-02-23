import { ComponentProps } from "react";
import classes from "./Pagination.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/typedReduxHooks";
import { fetchGetItems } from "../../store/slices/productSlice";

type Page = number | null;

const Pagination = function ({
  className = "",
  ...props
}: ComponentProps<"div">) {
  const dispatch = useAppDispatch();

  const { isLoading, activePage, pageCount } = useAppSelector(
    (state) => state.product
  );

  const pageThreshold = 5;
  const nullNumber = -1;

  let visiblePagesStart = activePage - pageThreshold;
  if (visiblePagesStart < 0) visiblePagesStart = 0;

  let visiblePagesEnd = activePage + pageThreshold;
  if (visiblePagesEnd > pageCount - 1) visiblePagesEnd = pageCount - 1;

  let pages = [];
  for (let i = 0; i < pageCount; i++) {
    if (i >= visiblePagesStart && i <= visiblePagesEnd) pages.push(i);
  }

  if (pages[0] > 0) pages[0] = 0;
  if (pages[1] - pages[0] > 1) pages[1] = nullNumber;
  if (pages[pages.length - 1] < pageCount - 1)
    pages[pages.length - 1] = pageCount - 1;
  if (pages[pages.length - 1] - pages[pages.length - 2] > 1)
    pages[pages.length - 2] = nullNumber;

  const buttonElems = pages.map((number, index) => (
    <button
      className={`${classes.paginationButton} ${
        number === activePage ? classes.active : ""
      }`}
      key={index}
      disabled={number === nullNumber || isLoading}
      onClick={
        number === nullNumber
          ? undefined
          : () => dispatch(fetchGetItems(number))
      }
    >
      {number === nullNumber ? "..." : number + 1}
    </button>
  ));

  return (
    <div className={`${className} ${classes.pagination}`} {...props}>
      {!!pageCount && buttonElems}
    </div>
  );
};
export default Pagination;

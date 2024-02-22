import { ComponentProps, useEffect, ReactNode, MouseEvent } from 'react';
import classes from './SearchResult.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { updateSearchList } from '../../store/slices/searchSlice';
import { Pagination } from 'react-bootstrap';

const SearchResult = function ({ className = '', ...props }: ComponentProps<'div'>) {
   const dispatch = useAppDispatch();
   useEffect(() => {
      dispatch(updateSearchList({}));
   }, []); // eslint-disable-line react-hooks/exhaustive-deps

   const { isLoading, loadError, list, searchFragment, activePage, pageCount } = useAppSelector(
      (state) => state.search
   );

   // Pagination
   const defaultPage = 1;
   const handlePaginationClick = (e: MouseEvent<HTMLElement>) => {
      const value = e.currentTarget.dataset.value;
      if (!value) return;
      dispatch(updateSearchList({ page: Number(value) }));
   };
   const items = [];
   for (let number = defaultPage; number <= pageCount; number++) {
      items.push(
         <Pagination.Item
            key={number}
            active={number === activePage}
            data-value={number}
            onClick={handlePaginationClick}
         >
            {number}
         </Pagination.Item>
      );
   }
   // /Pagination

   const getHighlightedText = (str: string) => {
      if (!searchFragment) return str;
      const split = str.split(searchFragment);
      const nodes: ReactNode[] = [];
      split.forEach((item, i) => {
         nodes.push(<span key={i}>{item}</span>);
         if (i < split.length - 1)
            nodes.push(
               <span className={classes.highlighted} key={i + '_2'}>
                  {searchFragment}
               </span>
            );
      });
      return nodes;
   };

   const normalContent = (
      <div className={classes.list}>
         {!list.length ? (
            <p className={classes.status}>List is empty</p>
         ) : (
            list.map((item) => (
               <div className={classes.listItem} key={item.id}>
                  <div className={classes.itemHeader}>
                     <p className={classes.itemId}>#{item.id}</p>
                     <p className={classes.itemTitle}>{getHighlightedText(item.title)}</p>
                  </div>
                  <div className={classes.itemText}>{getHighlightedText(item.body)}</div>
               </div>
            ))
         )}
      </div>
   );
   const loadingContent = <p className={classes.status}>loading</p>;
   const loadErrorContent = <p className={classes.status}>{loadError}</p>;
   let content = normalContent;
   if (isLoading) content = loadingContent;
   else if (loadError !== null) content = loadErrorContent;

   return (
      <div className={`${className} ${classes.default}`} {...props}>
         <Pagination size="sm">{(!isLoading || loadError !== null) && items}</Pagination>
         {content}
      </div>
   );
};
export default SearchResult;

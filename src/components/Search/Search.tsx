import { ComponentProps } from 'react';
import classes from './Search.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import SearchResult from '../SearchResult/SearchResult';

const Search = function ({ className = '', ...props }: ComponentProps<'div'>) {
   return (
      <div className={`${className} ${classes.default}`} {...props}>
         <SearchBar className={classes.searchBar} />
         <SearchResult className={classes.searchResult} />
      </div>
   );
};
export default Search;

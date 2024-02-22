import { ComponentProps, useState, ChangeEvent, KeyboardEvent } from 'react';
import classes from './SearchBar.module.scss';
import { Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { updateSearchList } from '../../store/slices/searchSlice';

const SearchBar = function ({ className = '' }: ComponentProps<'div'>) {
   const dispatch = useAppDispatch();
   const { isLoading } = useAppSelector((state) => state.search);

   const [inputValue, setInputValue] = useState('');

   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value);
   };

   const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') search();
      if (e.key === 'Escape') setInputValue('');
   };

   const search = () => {
      if (!inputValue || isLoading) return;
      const correctValue = inputValue.trim();
      if (correctValue !== inputValue) setInputValue(correctValue);
      dispatch(updateSearchList({ searchFragment: correctValue }));
   };

   return (
      <div className={`${className} ${classes.default}`}>
         <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeydown}
         />
         <Button className={classes.button} variant="primary" onClick={search}>
            Search
         </Button>
      </div>
   );
};
export default SearchBar;

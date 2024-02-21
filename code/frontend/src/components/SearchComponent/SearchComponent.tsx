import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, memo } from 'react';
import { SearchComponentInterface } from './SearchComponentInterface';

const SearchComponent = ({ search, setSearch }: SearchComponentInterface) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClearClick = () => {
    setSearch('');
  };

  return (
    <>
      <div className="w-full max-w-xs relative">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full"
          value={search}
          onChange={handleInputChange}
        />
        {search && (
          <FontAwesomeIcon
            icon={faTimes}
            className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400 cursor-pointer"
            onClick={handleClearClick}
          />
        )}
        {!search && (
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400 pointer-events-none"
          />
        )}
      </div>
    </>
  );
};

export default memo(SearchComponent);

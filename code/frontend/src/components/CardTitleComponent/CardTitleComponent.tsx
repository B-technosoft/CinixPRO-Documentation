import { CardTitleComponentInterface } from "./CardTitleComponentInterface";
import SearchComponent from "../SearchComponent/SearchComponent";
import NewButtonComponent from "../NewButtonComponent/NewButtonComponent";

const CardTitleComponent = ({
  title,
  route,
  search,
  setSearch,
}: CardTitleComponentInterface) => {
  return route && title ? (
    <div className="flex justify-between">
      <NewButtonComponent route={route} title={title} />
      <SearchComponent search={search} setSearch={setSearch} />
    </div>
  ) : (
    <div className="flex justify-end">
      <SearchComponent search={search} setSearch={setSearch} />
    </div>
  );
};

export default CardTitleComponent;

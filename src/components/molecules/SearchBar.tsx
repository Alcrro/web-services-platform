import IconSearchNavbar from "./IconSearchNavbar";
import SearchBarModal from "./SearchBarModal";

export type IconProps = {
  className?: string;
  size?: number;
};
export type SearchItemProps = {
  type: string;
  label: string;
  icon: React.ComponentType<IconProps>;
};

const SearchBar = ({ icon: Icon, label }: SearchItemProps) => {
  return (
    <div className="">
      {/* Icon search in navbar */}
      <IconSearchNavbar>
        <Icon />
      </IconSearchNavbar>

      {/* Icon + input */}
      <SearchBarModal>
        <Icon className="shrink-0 mr-2" size={20} />
        <input
          type="text"
          placeholder={label}
          autoFocus
          className="flex-1 bg-(--color-bg) p-2 rounded-lg outline-none text-sm "
        />
      </SearchBarModal>
    </div>
  );
};

export default SearchBar;

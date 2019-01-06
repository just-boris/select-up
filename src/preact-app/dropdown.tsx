import { h } from "preact";
import { Item } from "../common/interfaces";
import styles from "./styles.css";
import SelectItem from "./dropdown-item";

interface SelectDropdownProps {
  isOpen: boolean;
  items?: Item[];
  selectedId?: string;
  onItemClick: (id: string) => void;
}

export default function SelectDropdown({
  isOpen,
  items,
  selectedId,
  onItemClick
}: SelectDropdownProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <ul className={styles.dropdown}>
      {items &&
        items.map(item => (
          <li key={item.id} onClick={() => onItemClick(item.id)}>
            <SelectItem selected={item.id === selectedId}>
              {item.text}
            </SelectItem>
          </li>
        ))}
    </ul>
  );
}

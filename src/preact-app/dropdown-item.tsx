import { ComponentChildren, h } from "preact";
import styles from "./styles.css";

interface SelectDropdownItemProps {
  children: ComponentChildren;
  selected: boolean;
}

export default function SelectDropdownItem({
  children,
  selected
}: SelectDropdownItemProps) {
  const classes = [styles.dropdownItem];
  if (selected) {
    classes.push(styles.dropdownItemSelected);
  }
  return <span className={classes.join(" ")}>{children}</span>;
}

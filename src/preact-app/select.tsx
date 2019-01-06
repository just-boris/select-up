import { Component, h } from "preact";
import { Item } from "../common/interfaces";

interface ChangeEventDetail {
  selectedId: string;
  selectedOption: Item;
}

interface SelectProps {
  value?: string;
  placeholder?: string;
  items?: Item[];
  onChange?: (detail: ChangeEventDetail) => void;
}

export default class Select extends Component<SelectProps> {
  render() {
    return <div>hello</div>;
  }
}

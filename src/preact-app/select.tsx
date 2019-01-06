import { Component, h } from "preact";
import { Item } from "../common/interfaces";
import styles from "./styles.css";
import caretIcon from "../common/caret.svg";
import SelectDropdown from "./dropdown";

export interface ChangeEventDetail {
  selectedId: string;
  selectedOption: Item;
}

interface SelectProps {
  value?: string;
  placeholder?: string;
  items?: Item[];
  onChange?: (detail: ChangeEventDetail) => void;
}

interface SelectState {
  isOpen: boolean;
}

export default class Select extends Component<SelectProps, SelectState> {
  state = { isOpen: false };

  private root?: HTMLElement;

  private globalMousedown = (event: MouseEvent) => {
    if (this.root && !this.root.contains(event.target as Node)) {
      this.setState({ isOpen: false });
    }
  };

  private onTriggerClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  private onItemClick = (id: string) => {
    this.setState({ isOpen: false });
    if (this.props.onChange) {
      this.props.onChange({
        selectedId: id,
        selectedOption: this.findItem(id)!
      });
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.globalMousedown);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.globalMousedown);
  }

  private findItem(id: string) {
    return (
      this.props.items && this.props.items.filter(item => item.id === id)[0]
    );
  }

  private renderValue() {
    if (this.props.value) {
      const selectedItem = this.findItem(this.props.value);
      if (selectedItem) {
        return selectedItem.text;
      }
    }
    return <span className={styles.placeholder}>{this.props.placeholder}</span>;
  }

  render() {
    return (
      <div ref={node => (this.root = node)} className={styles.select}>
        <div className={styles.trigger} onMouseDown={this.onTriggerClick}>
          <span className={styles.value}>{this.renderValue()}</span>
          <span
            className={styles.caret}
            dangerouslySetInnerHTML={{ __html: caretIcon }}
          />
        </div>
        <SelectDropdown
          isOpen={this.state.isOpen}
          items={this.props.items}
          selectedId={this.props.value}
          onItemClick={this.onItemClick}
        />
      </div>
    );
  }
}

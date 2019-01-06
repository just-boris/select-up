import { LitElement, html, property } from "@polymer/lit-element";
import { Item } from "../common/interfaces";
import "./dropdown-item";

class SelectDropdown extends LitElement {
  @property()
  open?: boolean;

  @property()
  items: Item[] = [];

  @property()
  selectedId?: string;

  onItemClick(id: string) {
    this.dispatchEvent(new CustomEvent("itemClick", { detail: { id } }));
  }

  render() {
    if (!this.open) {
      return html``;
    }
    return html`
      <style>
        :host {
          width: 100%;
          position: absolute;
          background: #fff;
          box-shadow: 0 1px 1px 0 rgba(0, 28, 36, 0.5);
          border-top: 1px solid #eaeded;
          box-sizing: border-box;
        }
        ul {
          padding: 0;
          margin: 0;
          max-height: 80vh;
          overflow: auto;
        }
        li {
          list-style: none;
        }
      </style>
      <ul>
        ${
          this.items.map(
            item =>
              html`
                <li>
                  <x-select-dropdown-item
                    ?selected=${item.id === this.selectedId}
                    @click="${() => this.onItemClick(item.id)}"
                    >${item.text}</x-select-dropdown-item
                  >
                </li>
              `
          )
        }
      </ul>
    `;
  }
}
customElements.define("x-select-dropdown", SelectDropdown);

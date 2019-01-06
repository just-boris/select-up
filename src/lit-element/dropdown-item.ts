import { LitElement, html, property } from "@polymer/lit-element";

class SelectDropdownItem extends LitElement {
  @property()
  selected?: boolean;

  render() {
    return html`
      <style>
        :host {
          display: block;
          border: 1px solid transparent;
          padding: 4px 10px;
          border-bottom-color: #eaeded;
          cursor: pointer;
        }
        :host(:hover) {
          background-color: #f2f3f3;
        }
        :host([selected]) {
          border-color: #00a1c9;
          background-color: #f1faff;
        }
      </style>
      <slot />
    `;
  }
}
customElements.define("x-select-dropdown-item", SelectDropdownItem);

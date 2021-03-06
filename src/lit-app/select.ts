import { LitElement, html, property } from "@polymer/lit-element";
import { unsafeHTML } from "@polymer/lit-element/node_modules/lit-html/directives/unsafe-html";
import { Item } from "../common/interfaces";
import caretIcon from "../common/caret.svg";
import "./dropdown";

export default class Select extends LitElement {
  @property()
  value?: string;

  @property()
  placeholder?: string;

  @property()
  items: Item[] = [];

  @property()
  __open: boolean = false;

  globalMousedown = (event: MouseEvent) => {
    if (!this.contains(event.target as Node)) {
      this.__open = false;
    }
  };

  connectedCallback() {
    super.connectedCallback();
    document.body.addEventListener("mousedown", this.globalMousedown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.body.removeEventListener("mousedown", this.globalMousedown);
  }

  private findItem(id: string) {
    return this.items.filter(item => item.id === id)[0];
  }

  private onTriggerClick() {
    this.__open = !this.__open;
  }

  private onItemClick(event: CustomEvent) {
    this.value = event.detail.id;
    this.__open = false;
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          selectedId: this.value,
          selectedOption: this.findItem(this.value!)
        }
      })
    );
  }

  private renderValue() {
    if (this.value) {
      const selectedItem = this.findItem(this.value);
      if (selectedItem) {
        return selectedItem.text;
      }
    }
    return html`
      <span class="placeholder">${this.placeholder}</span>
    `;
  }

  render() {
    return html`
      <div class="trigger" @mousedown="${this.onTriggerClick}">
        <span class="value">${this.renderValue()}</span>
        <span class="caret">${unsafeHTML(caretIcon)}</span>
      </div>
      <x-select-dropdown
        .open="${this.__open}"
        .items=${this.items}
        .selectedId=${this.value}
        @itemClick="${this.onItemClick}"
      />
      <style>
        :host {
          font-size: 14px;
          line-height: 20px;
          color: #545b64;
          font-weight: 400;
          font-family: Amazon Ember, Helvetica Neue, Roboto, Arial, sans-serif;
          position: relative;
          display: block;
        }
        .trigger {
          border-radius: 2px;
          border: 1px solid #aab7b8;
          padding: 4px 10px;
          display: flex;
        }
        .value {
          width: 100%;
        }
        .caret {
          align-self: center;
        }
        .placeholder {
          color: #aab7b8;
          font-style: italic;
        }
      </style>
    `;
  }
}
customElements.define("x-select", Select);

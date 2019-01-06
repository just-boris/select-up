import names from "./names.json";
import "./lit-element";
import Select from "./lit-element";

const element = document.createElement("x-select") as Select;
element.placeholder = "Select a name...";
element.items = names.map(name => ({ id: name, text: name }));
element.addEventListener("change", event =>
  console.log((event as CustomEvent).detail)
);
document.body.appendChild(element);

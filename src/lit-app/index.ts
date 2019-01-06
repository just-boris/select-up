import names from "../common/names.json";
import "./select";
import Select from "./select";

const element = document.createElement("x-select") as Select;
element.placeholder = "Select a name...";
element.items = names.map(name => ({ id: name, text: name }));
element.addEventListener("change", event =>
  console.log((event as CustomEvent).detail)
);
document.body.appendChild(element);

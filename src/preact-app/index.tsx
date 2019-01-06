import { render, h } from "preact";
import names from "../common/names.json";
import Select from "./select";

render(
  <Select
    placeholder="Select a name..."
    items={names.map(name => ({ id: name, text: name }))}
    onChange={detail => console.log(detail)}
  />,
  document.getElementById("app")!
);

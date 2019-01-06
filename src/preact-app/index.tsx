import { render, h, Component } from "preact";
import names from "../common/names.json";
import Select, { ChangeEventDetail } from "./select";

class App extends Component<{}, { value?: string }> {
  state = {
    value: undefined
  };

  private onChange = (detail: ChangeEventDetail) => {
    this.setState({
      value: detail.selectedId
    });
    console.log(detail);
  };

  render() {
    return (
      <Select
        value={this.state.value}
        placeholder="Select a name..."
        items={names.map(name => ({ id: name, text: name }))}
        onChange={this.onChange}
      />
    );
  }
}

render(<App />, document.getElementById("app")!);

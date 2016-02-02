import React from "react";
import Button from "components/button";

const style = {
  base: {
    height: 50,
    marginBottom: 10,
    width: "100%",
    overflow: "visible",
    whiteSpace: "nowrap"
  },

  input: {
    width: 438,
    height: 45,
    fontSize: 25,
    marginRight: 10
  }
};

export default class NewUserForm extends React.Component {
  componentDidMount() {
    if(this.props.autofocus) {
      this.refs.input.focus();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    if(this.props.onSubmit) {
      this.props.onSubmit(event);
    }
  }

  render() {
    const {value, onSubmit, onChange} = this.props;
    return (
      <div style={style.base}>
        <form onSubmit={onSubmit}>
          <input
            ref="input"
            style={style.input}
            value={value}
            onChange={onChange}
            maxLength={30}
            placeholder="Name"
          />
          <Button disabled={!value.trim().length}>Create</Button>
        </form>
      </div>
    );
  }
}

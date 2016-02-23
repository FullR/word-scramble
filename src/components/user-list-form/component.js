import React from "react";
import Button from "../button";
import bembam from "bembam";

export default class UserListForm extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func,
    onChange: React.PropTypes.func,
    value: React.PropTypes.string
  };

  static defaultProps = {
    value: ""
  };

  submit(event) {
    const {onSubmit} = this.props;
    event.preventDefault();
    if(onSubmit) {
      onSubmit(event);
    }
  }

  render() {
    const {value, onChange, className} = this.props;
    const cn = bembam("User-list-form", className);

    return (
      <form {...this.props} className={cn} onSubmit={this.submit.bind(this)}>
        <input value={value} onChange={onChange}/>
        <Button disabled={!value || !value.trim().length}>Create</Button>
      </form>
    );
  }
}

import React from "react";
import {noop} from "lodash";
import bembam from "bembam";

export default class UserListItem extends React.Component {
  static propTypes = {
    onRemoveClick: React.PropTypes.func,
    selected: React.PropTypes.bool
  };

  static defaultProps = {
    selected: false,
    onRemoveClick: noop
  };

  onRemoveClick(event) {
    event.stopPropagation();
    this.props.onRemoveClick(event);
  }

  render() {
    const {selected, children, className} = this.props;
    const cn = bembam("User-list-item", className)
      .mod("selected", selected);

    return (
      <div {...this.props} className={cn}>
        {children}
        <div className={cn.el("remove-button")} onClick={this.onRemoveClick.bind(this)}>
          {"\u2716"}
        </div>
      </div>
    );
  }
}

import React from "react";
import {noop} from "lodash";
import cn from "util/cn";

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
    const classNames = cn("User-list-item", selected ? `User-list-item--selected` : null, className);

    return (
      <div {...this.props} className={classNames}>
        {children}
        <div className="User-list-item__remove-button" onClick={this.onRemoveClick.bind(this)}>
          {"\u2716"}
        </div>
      </div>
    );
  }
}

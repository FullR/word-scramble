import React from "react";
import cn from "util/cn";

export default class UserList extends React.Component {
  render() {
    const {className} = this.props;
    const classNames = cn("User-list", className);

    return (
      <div {...this.props} className={classNames}/>
    );
  }
}

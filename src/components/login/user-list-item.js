import React from "react";
import Block from "components/block";
import {VCenter} from "components/center";
import radium from "radium";

const style = {
  base: {
    listStyleType: "none",
    padding: 20,
    cursor: "pointer",
    ":hover": {
      background: "rgba(0, 0, 255, 0.1)"
    }
  },

  selected: {
    background: "rgba(0, 0, 255, 0.2)",
    cursor: "default",
    fontWeight: 800,
    ":hover": {
      background: "rgba(0, 0, 255, 0.2)"
    }
  },

  content: {
    width: "100%",
    height: "100%"
  },

  removeButton: {
    position: "absolute",
    right: 0,
    cursor: "pointer",
    color: "rgba(0, 0, 0, 0.2)",
    ":hover": {
      color: "red"
    }
  }
};

@radium
class RemoveX extends React.Component {
  render() {
    return (<VCenter {...this.props} style={style.removeButton}>{"\u2716"}</VCenter>);
  }
}

@radium
export default class UserListItem extends React.Component {
  onRemoveClick(event) {
    event.stopPropagation();
    if(this.props.onRemoveClick) {
      this.props.onRemoveClick(event);
    }
  }

  render() {
    const {selected} = this.props;
    return (
      <li {...this.props} style={[
        style.base,
        selected ? style.selected : null,
        this.props.style
      ]}>
        <Block style={style.content}>
          {this.props.children}
          <RemoveX onClick={this.onRemoveClick.bind(this)}/>
        </Block>
      </li>
    );
  }
}

import React from "react";

export default (Wrapped) => class WindowListener extends React.Component {
  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
    this.state = {width: window.innerWidth, height: window.innerHeight};
  }

  onResize() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  render() {
    return (<Wrapped {...this.props} {...this.state}/>);
  }
}

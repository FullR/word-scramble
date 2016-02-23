import React from "react";

export default class Router extends React.Component {
  static propTypes = {
    routes: React.PropTypes.object.isRequired,
    route: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      options: React.PropTypes.object
    })
  };

  render() {
    const {routes, route} = this.props;

    if(routes.hasOwnProperty(route.name)) {
      return routes[route.name](route.options || {});
    } else {
      throw new Error(`Route not defined: "${route.name}"`);
    }
  }
}

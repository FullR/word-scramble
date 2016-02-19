import React from "react";

function defaultRenderer(Wrapped, props, storeState) {
  return (<Wrapped {...props} store={storeState}/>);
}

export default function storeListener(store, renderFn=defaultRenderer) {
  if(!store) throw new Error("storeListener requires a store");
  return (Wrapped) => class StoreListenerWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {store: store.getState()};
    }

    componentWillMount() {
      this.unsub = store.subscribe((state) => {
        this.setState({store: store.getState()});
      });
    }

    componentWillUnmount() {
      if(this.unsub) {
        this.unsub();
        this.unsub = null;
      }
    }

    render() {
      return renderFn(Wrapped, this.props, this.state.store);
    }
  };
}

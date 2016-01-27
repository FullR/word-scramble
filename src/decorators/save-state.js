import React from "react";
import storage from "storage";

export default function saveState({namespace, keys}={}) {
  return (Parent) => class SaveState extends Parent {
    _getNamespace() {
      const ns = namespace || this.namespace || this.props.namespace;
      if(!ns) throw new Error("saveState requires a namespace");
      return ns;
    }

    save() {
      const data = keys ? keys.reduce((data, key) => {
        data[key] = this.state[key];
        return data;
      }, {}) : (this.state || {});
      storage.set(this._getNamespace(), data);
      return data;
    }

    load(defaultData={}) {
      return Object.assign({}, defaultData, storage.get(this._getNamespace())) || defaultData;
    }

    componentDidUpdate(prevProps, prevState) {
      if(super.componentDidUpdate) {
        super.componentDidUpdate(prevProps, prevState);
      }
      this.save();
    }
  };
}

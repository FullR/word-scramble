import storage from "./storage";

function getStoreKey(namespace) {
  return `store::${namespace}`;
}

export default class Store {
  constructor(namespace, initialData={}) {
    this.namespace = namespace;
    this.initialData = {...initialData};
    this.key = getStoreKey(namespace);
    this.data = storage.get(this.key) || initialData;
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    this.data[key] = value;
    storage.set(this.key, this.data);
  }

  reset() {
    this.data = {...this.initialData};
    storage.set(this.key, this.initialData);
  }

  delete() {
    storage.remove(this.key);
  }
}

Store.exists = (namespace) => !!storage.get(getStoreKey(namespace));
Store.delete = (namespace) => {
  if(Store.exists(namespace)) {
    (new Store(namespace)).delete()
  }
};

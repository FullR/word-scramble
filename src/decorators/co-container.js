import stoppableCo from "util/stoppable-co";
import wait from "util/wait";

export default function coContainer(Wrapped) {
  return class CoContainer extends Wrapped {
    startCo(genFn, context, ...args) {
      return wait(0).then(() => {
        const co = stoppableCo(genFn.bind(context));
        const {promise, stop} = co.apply(null, args);
        this.stopCo();
        this._stopCo = stop;
        return promise.then(() => {
          this._stopCo = null;
        });
      });
    }

    stopCo() {
      if(this._stopCo) {
        this._stopCo();
        this._stopCo = null;
      }
    }

    componentWillUnmount() {
      this.stopCo();
      if(super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }
  };
}

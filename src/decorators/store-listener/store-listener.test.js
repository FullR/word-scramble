import {expect} from "chai";
import storeListener from "./index";
import {createStore} from "redux";
import jsdom from "mocha-jsdom";
import {renderIntoDocument} from "react-addons-test-utils";

describe("storeListener", function(done) {
  jsdom();
  it("should pass the state of the store to the wrapped component", (done) => {
    const React = require("react");
    const store = createStore(() => {
      return {a: "b", c: "d"}
    });

    @storeListener(store)
    class Component extends React.Component {
      render() {
        try {
          expect(this.props).to.deep.equal({store: {a: "b", c: "d"}});
          done();
        } catch(error) {
          done(error);
        }
        return null;
      }
    }

    renderIntoDocument(<Component/>);
  });

  it("should re-render the wrapped component when the store is updated", (done) => {
    const React = require("react");
    const store = createStore((state={a: "b", c: "d"}, action={}) => {
      if(action.type === "TEST_ACTION") {
        return {e: "f", g: "h"};
      }
      return state;
    });
    let rerendered = false;

    @storeListener(store)
    class Component extends React.Component {
      componentDidMount() {
        setTimeout(() => store.dispatch({type: "TEST_ACTION"}), 10);
      }
      render() {
        try {
          if(rerendered) {
            expect(this.props).to.deep.equal({store: {e: "f", g: "h"}});
            done();
          } else {
            expect(this.props).to.deep.equal({store: {a: "b", c: "d"}});
            rerendered = true;
          }
        } catch(error) {
          done(error);
        }
        return null;
      }
    }

    renderIntoDocument(<Component/>);
  });

});

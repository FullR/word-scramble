import {createStore} from "redux";
import storage from "storage";
import reducer from "./reducer";

export default createStore(reducer);

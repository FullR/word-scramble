import {Observable} from "rx";

export default function onReady(isCordova=false) {
  const observableFn = isCordova ?
    (observer) => {
      const handler = (event) => {
        observer.onNext("deviceready");
        observer.onCompleted();
      };
      document.addEventListener("deviceready", handler);
      return () => {
        document.removeEventListener("deviceready", handler);
      };
    } :
    (observer) => {
      window.onload = () => {
        observer.onNext("load");
        observer.onCompleted();
      };

      return () => {
        window.onload = null;
      };
    };

  return Observable.create(observableFn);
}

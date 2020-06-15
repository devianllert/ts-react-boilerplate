/* eslint-disable prefer-promise-reject-errors */
/* https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html */
export interface CancellablePromise<T> {
  promise: Promise<T>;
  cancel(): void;
}

const makeCancelable = <T>(promise: Promise<T>): CancellablePromise<T> => {
  let hasCanceled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise.then(
      (val) => (hasCanceled ? reject({ isCanceled: true }) : resolve(val)),
      (error) => (hasCanceled ? reject({ isCanceled: true }) : reject(error)),
    );
  });

  return {
    promise: wrappedPromise,
    cancel(): void {
      hasCanceled = true;
    },
  };
};

export default makeCancelable;

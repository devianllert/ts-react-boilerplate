import React, {
  createContext,
  useState,
  useContext,
  Provider,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  ReactNode,
  Context,
} from 'react';

type UpdateType<A> = Dispatch<SetStateAction<A>>;

/**
 * A helper to create a Context and Provider with no upfront default value, and
 * without having to check for undefined all the time.
 */
export const createCtx = <A extends {} | null>(): readonly [() => A, Provider<A | undefined>] => {
  const ctx = createContext<A | undefined>(undefined);

  const useCtx = (): A => {
    const c = useContext(ctx);

    if (c === undefined) {
      throw new Error('useCtx must be inside a Provider with a value');
    }

    return c;
  };

  return [useCtx, ctx.Provider] as const;
};

export const createCtxWithUpdate = <A extends any>(
  defaultValue: A,
): readonly [
  Context<{ state: A; update: Dispatch<SetStateAction<A>> }>,
  (props: { children?: ReactNode }) => ReactNode,
] => {
  const defaultUpdate: UpdateType<typeof defaultValue> = () => defaultValue;

  const ctx = createContext({
    state: defaultValue,
    update: defaultUpdate,
  });

  const ContextProvider = (props: PropsWithChildren<{}>): ReactNode => {
    const [state, update] = useState(defaultValue);
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <ctx.Provider value={{ state, update }} {...props} />;
  };

  return [ctx, ContextProvider] as const;
};

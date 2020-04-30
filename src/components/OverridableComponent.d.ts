export interface ComponentProp<C extends React.ElementType> {
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: C;
}

/**
 * Props of the component if `component={Component}` is used.
 */
export type OverrideProps<
  C extends React.ElementType,
  P = {},
> = (
  & P
  & React.ComponentPropsWithRef<C>
);

export interface OverridableComponent<P = {}> {
  <C extends React.ElementType>(props: ComponentProp<C> & OverrideProps<C, P>): JSX.Element;
}

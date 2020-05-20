import { useMemo } from 'react';
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
  match,
} from 'react-router';
import queryString from 'query-string';
import {
  History,
  Location,
  Path,
  LocationDescriptorObject,
} from 'history';

interface UseRouterState<P, M, L, H> {
  push(path: Path, state?: H): void;
  push(location: LocationDescriptorObject<H>): void;
  replace(path: Path, state?: H): void;
  replace(location: LocationDescriptorObject<H>): void;
  pathname: string;
  query: {
    [x: string]: string | string[] | null | undefined;
  } & P;
  match: match<M>;
  location: Location<L>;
  history: History<H>;
}

// Hook
const useRouter = <P = {}, M = {}, L = any, H = any>(): UseRouterState<P, M, L, H> => {
  const params = useParams<P>();
  const location = useLocation<L>();
  const history = useHistory<H>();
  const routeMatch = useRouteMatch<M>();

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(() => ({
    // For convenience add push(), replace(), pathname at top level
    push: history.push,
    replace: history.replace,
    pathname: location.pathname,
    // Merge params and parsed query string into single "query" object
    // so that they can be used interchangeably.
    // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
    query: {
      ...queryString.parse(location.search), // Convert string to object
      ...params,
    },
    // Include match, location, history objects so we have
    // access to extra React Router functionality if needed.
    match: routeMatch,
    location,
    history,
  }), [params, routeMatch, location, history]);
};

export default useRouter;

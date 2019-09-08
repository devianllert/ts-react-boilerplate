import { useState, useCallback } from 'react';

/**
 * Hook that tracks value of a boolean
 *
 * @example
 *
 * const [on, toggle] = useBoolean(true);
 *
 * toggle(true) // on = true
 * toggle(false) // on = false
 * toggle() // on = !on
 */

const useBoolean = (initialBool = true): [boolean, (bool?: boolean) => void] => {
  const [bool, setBool] = useState<boolean>(initialBool);

  const toggle = useCallback(
    (nextValue?: boolean): void => {
      if (nextValue) {
        setBool(nextValue);

        return;
      }

      setBool((currentValue): boolean => !currentValue);
    },
    [setBool],
  );

  return [bool, toggle];
};

export default useBoolean;

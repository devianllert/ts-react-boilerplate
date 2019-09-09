import { useState, useCallback } from 'react';

export interface CopyToClipboardState {
  value?: string;
  error?: Error;
}

/**
 * Hook that copy text to a user's clipboard.
 *
 * @example
 *
 * const [state, copyToClipboard] = useCopyToClipboard();
 */

const useClipboardCopy = (): [CopyToClipboardState, (value: string) => void] => {
  const [state, setState] = useState<CopyToClipboardState>({
    value: undefined,
    error: undefined,
  });

  const copyToClipboard = useCallback(async (value: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(value);

      setState({
        value,
        error: undefined,
      });
    } catch (error) {
      setState({
        value: undefined,
        error,
      });
    }
  }, []);

  return [state, copyToClipboard];
};

export default useClipboardCopy;

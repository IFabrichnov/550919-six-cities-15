import { act, renderHook } from '@testing-library/react';
import useBoolean from './use-boolean';

describe('Hook: useBoolean', () => {
  it('should be correctly changed', () => {
    const { result } = renderHook(() => useBoolean());

    expect(result.current.isOn).toBe(false);

    act(() => {
      result.current.on();
    });
    expect(result.current.isOn).toBe(true);

    act(() => {
      result.current.off();
    });
    expect(result.current.isOn).toBe(false);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOn).toBe(true);
  });
});

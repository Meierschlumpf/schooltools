import { createRef, RefObject, useRef, useState } from "react";

interface UseActiveValueProps<TData, TActiveValue> {
  data: TData[];
  generateKey: (val: TData) => string;
  initialValue: TActiveValue;
  parseKey: (key: string) => TActiveValue;
}

export const useActiveValue = <TData, TActiveValue>({
  data,
  generateKey,
  parseKey,
  initialValue,
}: UseActiveValueProps<TData, TActiveValue>) => {
  const itemRefs = useRef<Record<string, RefObject<HTMLDivElement>>>({});
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeValue, setActiveValue] = useState(initialValue);

  const refKeys = data.map(generateKey);

  refKeys.forEach((i: string) => {
    itemRefs.current[i] = createRef<HTMLDivElement>();
  });

  const updateActiveValue = () => {
    const res = Object.entries(itemRefs.current).reduce(
      (
        previous: {
          value: TActiveValue | null;
          max: number;
        },
        [k, v],
      ) => {
        const wrapperTop = wrapperRef.current?.getBoundingClientRect().top ?? 0;
        const top = v.current?.getBoundingClientRect().top ?? wrapperTop;
        if (top >= wrapperTop) return previous;
        if (previous.max >= top) return previous;

        return {
          value: parseKey(k),
          max: top,
        };
      },
      { value: null, max: -Infinity },
    );
    setActiveValue(res.value ?? initialValue);
  };

  return {
    wrapperRef,
    itemRefs,
    activeValue,
    updateActiveValue,
    generateKey,
  };
};

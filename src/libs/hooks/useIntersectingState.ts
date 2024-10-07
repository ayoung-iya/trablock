import { useEffect, useRef } from 'react';

function useIntersectingState<T extends Element>(onIntersect: IntersectionObserverCallback) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(onIntersect);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [onIntersect]);

  return ref;
}

export default useIntersectingState;

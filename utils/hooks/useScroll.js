/**
 * useScroll React custom hook
 * Usage:
 *    const { scrollX, scrollY, scrollDirection } = useScroll();
 */

import { useState, useEffect, useRef } from "react";
import { curry, apply } from "ramda";

const debounce_ = curry((immediate, timeMs, fn) => () => {
  let timeout;

  return (...args) => {
    const later = () => {
      timeout = null;

      if (!immediate) {
        apply(fn, args);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, timeMs);

    if (callNow) {
      apply(fn, args);
    }

    return timeout;
  };
});

const debounceImmediate = debounce_(true);

const debounce = debounce_(false);

export function useScroll() {
  if (typeof document === "undefined") {
    return { scrollY: null, scrollX: null, scrollDirection: null };
  }
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [bodyOffset, setBodyOffset] = useState(
    document.body.getBoundingClientRect()
  );
  const [scrollY, setScrollY] = useState(bodyOffset.top);
  const [scrollX, setScrollX] = useState(bodyOffset.left);
  const [scrollDirection, setScrollDirection] = useState();
  const [pageY, setPageY] = useState(0);
  const [ignore, setIgnore] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const updateValues = ({ deltaY, pageY }) => {
    console.log({ deltaY, pageY });
    setScrollDirection(deltaY > 0 ? 1 : -1);
    setPageY(pageY);
    timeout(() => {});
  };

  useEffect(() => {
    window.addEventListener("wheel", (e) => {
      setLastUpdate(Date.now());
      const { deltaY, pageY } = e;
      updateValues({ deltaY, pageY });
    });
  }, []);

  return {
    scrollDirection,
    lastUpdate
  };
}

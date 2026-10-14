'use client';

import { useEffect, useRef } from 'react';

/**
 * Scroll reveal hook using IntersectionObserver.
 * Observes container and all `.reveal` / `.reveal-stagger` elements,
 * ensuring they smoothly transition in without awkward blank gaps.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const queryElements = (): HTMLElement[] => {
      const scope = ref.current || document;
      const elements: HTMLElement[] = [];

      if (
        ref.current &&
        (ref.current.classList.contains('reveal') ||
          ref.current.classList.contains('reveal-stagger'))
      ) {
        elements.push(ref.current);
      }

      if (scope.querySelectorAll) {
        scope
          .querySelectorAll<HTMLElement>('.reveal, .reveal-stagger')
          .forEach((el) => elements.push(el));
      }

      return Array.from(new Set(elements));
    };

    const elements = queryElements();

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '120px 0px 50px 0px', // Trigger ahead of viewport arrival to eliminate blank gaps
      }
    );

    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // If already in or near current viewport on initial page load, reveal immediately
      if (rect.top <= windowHeight + 80) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);


  return ref;
}

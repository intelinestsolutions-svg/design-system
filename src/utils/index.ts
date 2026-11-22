/* ==========================================================================
   NextGen Kit — Utils
   localStorage persistence, snippet generation, validation
   ========================================================================== */

/** localStorage key prefix per component */
export const STORAGE_PREFIX = 'nextgen-';

/** Save props to localStorage */
export function saveProps(componentId: string, props: Record<string, any>): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${componentId}`, JSON.stringify(props));
  } catch {
    // localStorage blocked (private mode, etc.) — silently no-op
  }
}

/** Load props from localStorage */
export function loadProps<T extends Record<string, any>>(
  componentId: string,
  defaults: T
): T {
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${componentId}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaults, ...parsed } as T;
    }
  } catch {
    // localStorage blocked
  }
  return defaults;
}

/** Clear saved props for a component */
export function clearProps(componentId: string): void {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${componentId}`);
  } catch {
    // no-op
  }
}

/** Generate deterministic snippet — omits props at default */
export function generateSnippet(
  componentTag: string,
  props: Record<string, any>,
  defaults: Record<string, any>
): string {
  const attrs: string[] = [];

  for (const [key, value] of Object.entries(props)) {
    if (value === defaults[key]) continue;

    if (typeof value === 'boolean') {
      if (value) attrs.push(key);
    } else if (typeof value === 'string') {
      attrs.push(`${key}="${value}"`);
    } else {
      attrs.push(`:${key}="${JSON.stringify(value)}"`);
    }
  }

  const attrString =
    attrs.length === 0
      ? ''
      : attrs.length <= 2
        ? ' ' + attrs.join(' ')
        : '\n  ' + attrs.join('\n  ') + '\n';

  return `<${componentTag}${attrString} />`;
}

/** Debounce utility for save-on-input */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  wait: number
): T {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return ((...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  }) as T;
}

/** Throttle utility for scroll/resize handlers */
export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  limit: number
): T {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  } as T;
}

/** Deep clone */
export function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

/** Escape HTML for safe snippet display */
export function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/** Generate component HTML preview */
export function renderPreview(componentTag: string, props: Record<string, any>): string {
  // Client-side rendering placeholder — components render themselves at runtime
  return `<${componentTag}>Preview content</${componentTag}>`;
}
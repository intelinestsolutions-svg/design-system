/* VButton — Enhanced with full state, accessibility, and theming */
import { VNode } from 'vue';

export interface VButtonProps {
  /** Primary or secondary variant */
  variant?: 'primary' | 'secondary';
  /** Small, medium, large */
  size?: 'small' | 'medium' | 'large';
  /** Disabled state */
  disabled?: boolean;
  /** Custom class */
  class?: string;
  /** Aria-label for accessibility */
  'aria-label'?: string;
}

/** VButton — Primary CTA component with live playground */
export default {
  name: 'VButton',
  props: {
    variant: { type: String, default: 'primary' as 'primary' | 'secondary' },
    size: { type: String, default: 'medium' as 'small' | 'medium' | 'large' },
    disabled: { type: Boolean, default: false },
    'aria-label': { type: String, default: undefined }
  },
  computed: {
    /** Derived classes from tokens */
    buttonClasses(): string {
      return [
        'n-button',
        `n-button--${this.variant}`,
        `n-button--${this.size}`,
        disabled && 'n-button--disabled',
        this.$attrs.class || ''
      ].filter(Boolean).join(' ');
    },
    /** ARIA role based on state */
    buttonAriaRole(): string {
      return this.disabled ? 'button' : 'button';
    },
    /** ARIA disabled attribute */
    buttonAriaDisabled(): boolean | undefined {
      return this.disabled ? undefined : false;
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    /** Handle click - respects disabled state */
    function handleClick(event: MouseEvent) {
      if (props.disabled) return;
      emit('click', event);
    }

    /** Memoized computed styles */
    const computedVariant = computed(() => ({
      primary: 'var(--accent-primary)',
      secondary: 'var(--text-secondary)'
    })[props.variant]);

    const computedSize = computed(() => ({
      small: 'var(--btn-height-sm)',
      medium: 'var(--btn-height-md)',
      large: 'var(--btn-height-lg)'
    })[props.size]);

    return {
      handleClick,
      computedVariant,
      computedSize,
      buttonClasses,
      buttonAriaRole,
      buttonAriaDisabled
    };
  }
};
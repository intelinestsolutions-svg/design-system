/* VInput — Enhanced with full state, validation, and theming */
import { VNode, ComputedRef } from 'vue';

export interface VInputProps {
  /** Label text / placeholder */
  label?: string;
  /** State: idle | focus | error */
  state?: 'idle' | 'focus' | 'error';
  /** Hint text below field */
  hint?: string;
  /** Type: text | email | password | search */
  type?: 'text' | 'email' | 'password' | 'search';
  /** Disabled state */
  disabled?: boolean;
  /** Custom class */
  class?: string;
  /** Aria-label for accessibility */
  'aria-label'?: string;
  /** Whether field is required */
  required?: boolean;
}

/** VInput — Labeled text field with live playground */
export default {
  name: 'VInput',
  props: {
    label: { type: String, default: 'Work email' },
    state: { type: String, default: 'idle' as 'idle' | 'focus' | 'error' },
    hint: { type: String, default: 'Enter your email' },
    type: { type: String, default: 'email' as 'text' | 'email' | 'password' | 'search' },
    disabled: { type: Boolean, default: false },
    'aria-label': { type: String, default: undefined },
    required: { type: Boolean, default: false }
  },
  computed: {
    /** Derived input classes */
    inputClasses(): string {
      return [
        'n-input',
        `n-input--${this.state}`,
        disabled && 'n-input--disabled',
        this.$attrs.class || ''
      ].filter(Boolean).join(' ');
    },
    /** Input state class for background/border */
    inputStateBg(): string {
      const map: Record<string, string> = {
        idle: 'var(--bg-surface)',
        focus: 'var(--accent-subtle)',
        error: 'var(--state-error-bg)'
      };
      return map[this.state] || map.idle;
    },
    /** Input border color */
    inputBorderColor(): string {
      const map: Record<string, string> = {
        idle: 'var(--border-default)',
        focus: 'var(--border-focus)',
        error: 'var(--border-error)'
      };
      return map[this.state] || map.idle;
    },
    /** Text color based on state */
    inputTextColor(): string {
      const map: Record<string, string> = {
        idle: 'var(--text-primary)',
        focus: 'var(--accent-text)',
        error: 'var(--text-danger)'
      };
      return map[this.state] || map.idle;
    }
  },
  emits: ['update:state', 'change'],
  watch: {
    state(newState: string) {
      emit('update:state', newState);
    }
  },
  setup(props, { emit }) {
    /** Input event handler - saves state */
    function handleInputEvent(event: Event) {
      if (props.disabled) return;
      emit('change', (event.target as HTMLInputElement).value);
    }

    /** Blur handler - returns to idle */
    function handleBlur() {
      if (props.disabled) return;
      emit('update:state', 'idle');
    }

    /** Focus handler */
    function handleFocus() {
      if (props.disabled) return;
      emit('update:state', 'focus');
    }

    return {
      inputClasses,
      inputStateBg,
      inputBorderColor,
      inputTextColor,
      handleInputEvent,
      handleBlur,
      handleFocus
    };
  }
};
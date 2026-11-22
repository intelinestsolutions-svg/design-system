/* VCard — Enhanced with full state, elevation, and theming */
import { VNode, ComputedRef } from 'vue';

export interface VCardProps {
  /** Card title */
  title?: string;
  /** Padding: none | small | medium | large */
  padding?: 'none' | 'small' | 'medium' | 'large';
  /** Elevated shadow */
  elevated?: boolean;
  /** Custom class */
  class?: string;
  /** Click handler */
  onClick?: () => void;
}

/** VCard — Bordered surface for one subject with live playground */
export default {
  name: 'VCard',
  props: {
    title: { type: String, default: 'Quarterly invoice' },
    padding: { type: String, default: 'medium' as 'none' | 'small' | 'medium' | 'large' },
    elevated: { type: Boolean, default: false },
    'aria-label': { type: String, default: undefined }
  },
  computed: {
    /** Derived card classes */
    cardClasses(): string {
      return [
        'n-card',
        `n-card--${this.padding}`,
        this.elevated && 'n-card--elevated',
        this.$attrs.class || ''
      ].filter(Boolean).join(' ');
    },
    /** Background based on elevation */
    cardBackground(): string {
      return this.elevated ? 'var(--bg-elevated)' : 'var(--bg-surface)';
    },
    /** Shadow based on elevation */
    cardShadow(): string {
      return this.elevated ? 'var(--shadow-lg)' : 'var(--shadow-sm)';
    },
    /** Padding value from tokens */
    cardPadding(): string {
      const map: Record<string, string> = {
        none: 'var(--space-0)',
        small: 'var(--space-4)',
        medium: 'var(--space-6)',
        large: 'var(--space-8)'
      };
      return map[this.padding] || map.medium;
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    /** Click handler */
    function handleClick(event: MouseEvent) {
      emit('click', event);
    }

    return {
      cardClasses,
      cardBackground,
      cardShadow,
      cardPadding,
      handleClick
    };
  }
};
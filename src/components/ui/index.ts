/* Component registry — single source of truth for all component metadata */
/** Component type for registration (no Vue dependency in this static build) */
export type Component = Record<string, any>;

export interface PropMeta {
  name: string;
  type: string;
  control: 'select' | 'toggle' | 'text' | 'color' | 'slider';
  options?: (string | number)[];
  default: string | number | boolean;
  start: string | number | boolean;
  description: string;
}

export interface ComponentMeta {
  id: string;
  name: string;
  tag: string;
  summary: string;
  intro: string;
  usageNotes: string[];
  props: PropMeta[];
  component: Component;
}

/** Component metadata — drives playground, prop table, snippets, docs */
export const components: ComponentMeta[] = [
  {
    id: 'vbutton',
    name: 'VButton',
    tag: 'VButton',
    summary: 'One action per screen gets the primary variant. Everything else steps back.',
    intro: 'A versatile button component with multiple variants, sizes, and states. Built on design tokens for full theming support.',
    usageNotes: [
      'Use <code>primary</code> for the main CTA on a screen; <code>secondary</code> for everything else.',
      'Disabled buttons are non-interactive and announce their state to screen readers.',
      'Sizes scale via tokens: <code>small</code> (24px), <code>medium</code> (32px), <code>large</code> (40px).',
      'All colors use semantic tokens — works in light/dark mode automatically.'
    ],
    props: [
      {
        name: 'variant',
        type: 'primary | secondary',
        control: 'select',
        options: ['primary', 'secondary'],
        default: 'primary',
        start: 'primary',
        description: 'Visual style — primary for main actions, secondary for supporting actions'
      },
      {
        name: 'size',
        type: 'small | medium | large',
        control: 'select',
        options: ['small', 'medium', 'large'],
        default: 'medium',
        start: 'medium',
        description: 'Touch target size — maps to token heights'
      },
      {
        name: 'disabled',
        type: 'boolean',
        control: 'toggle',
        default: false,
        start: false,
        description: 'Non-interactive state; removes hover/focus, announces to AT'
      }
    ],
    component: {} as Component
  },
  {
    id: 'vinput',
    name: 'VInput',
    tag: 'VInput',
    summary: 'A labelled text field whose state is spelled out — never color alone.',
    intro: 'An accessible form input with explicit states (idle/focus/error), hint text, and full keyboard support.',
    usageNotes: [
      'State is <strong>explicit</strong> — never conveyed by color alone. Screen readers announce state changes.',
      'Hint text provides context without cluttering the label.',
      'Type attribute supports text, email, password, search — native validation kicks in.',
      'Error state pairs with aria-invalid and descriptive error message.'
    ],
    props: [
      {
        name: 'label',
        type: 'string',
        control: 'text',
        default: 'Work email',
        start: 'Work email',
        description: 'Visible label text — also used as aria-label if no explicit one given'
      },
      {
        name: 'state',
        type: 'idle | focus | error',
        control: 'select',
        options: ['idle', 'focus', 'error'],
        default: 'idle',
        start: 'idle',
        description: 'Explicit interaction state — drives border, background, text color'
      },
      {
        name: 'hint',
        type: 'string',
        control: 'text',
        default: 'Enter your email',
        start: 'Enter your email',
        description: 'Helper text below field — visible to all users'
      },
      {
        name: 'type',
        type: 'text | email | password | search',
        control: 'select',
        options: ['text', 'email', 'password', 'search'],
        default: 'email',
        start: 'email',
        description: 'Native input type — enables browser validation, password masking, etc.'
      },
      {
        name: 'disabled',
        type: 'boolean',
        control: 'toggle',
        default: false,
        start: false,
        description: 'Non-interactive, greyed out, removed from tab order'
      }
    ],
    component: {} as Component
  },
  {
    id: 'vcard',
    name: 'VCard',
    tag: 'VCard',
    summary: 'A bordered surface for one subject. Elevation is earned, not default.',
    intro: 'A flexible container with configurable padding and optional elevation. Content-agnostic by design.',
    usageNotes: [
      'Default is flat (no shadow) — elevation is opt-in via <code>elevated</code> prop.',
      'Padding scales via tokens: <code>none</code> (0), <code>small</code> (16px), <code>medium</code> (24px), <code>large</code> (32px).',
      'Border uses <code>--border-subtle</code> — visible but quiet in both themes.',
      'Works as a clickable card when onClick is provided (adds cursor: pointer).'
    ],
    props: [
      {
        name: 'title',
        type: 'string',
        control: 'text',
        default: 'Quarterly invoice',
        start: 'Quarterly invoice',
        description: 'Heading text — rendered as h3 with semantic heading hierarchy'
      },
      {
        name: 'padding',
        type: 'none | small | medium | large',
        control: 'select',
        options: ['none', 'small', 'medium', 'large'],
        default: 'medium',
        start: 'medium',
        description: 'Internal spacing — maps to token spacing scale'
      },
      {
        name: 'elevated',
        type: 'boolean',
        control: 'toggle',
        default: false,
        start: false,
        description: 'Adds shadow and elevated background — use for surfaces that float'
      }
    ],
    component: {} as Component
  }
];

/** Get component by ID */
export function getComponent(id: string): ComponentMeta | undefined {
  return components.find(c => c.id === id);
}

/** Get all component IDs for routing */
export function getComponentIds(): string[] {
  return components.map(c => c.id);
}

/** Generate snippet for a component with given props */
export function generateSnippet(componentId: string, props: Record<string, any>): string {
  const comp = getComponent(componentId);
  if (!comp) return '';

  const attrs: string[] = [];
  for (const prop of comp.props) {
    const value = props[prop.name];
    const isDefault = value === prop.default;

    if (isDefault) continue;

    if (typeof value === 'boolean') {
      if (value) attrs.push(prop.name);
    } else if (typeof value === 'string') {
      attrs.push(`${prop.name}="${value}"`);
    } else {
      attrs.push(`:${prop.name}="${value}"`);
    }
  }

  const attrString = attrs.length > 2
    ? '\n  ' + attrs.join('\n  ') + '\n'
    : attrs.length > 0
      ? ' ' + attrs.join(' ')
      : '';

  return `<${comp.tag}${attrString} />`;
}
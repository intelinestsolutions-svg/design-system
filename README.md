# NextGen Kit — Modular Design System

NextGen Kit is a modular design system with live playgrounds, rebuilt using the **OpenIntelligentUI design system** assets from `intelinestsolutions-svg/design-system`. Every component has:

- **Live playgrounds** — set props with real controls, watch the specimen respond, copy the exact markup
- **Documented props** — every supported variation is a prop with visible defaults
- **Small on purpose** — a component only joins when three production screens need it
- **Props as API** — no utility-class overrides, no theme forks, no local CSS patches
- **The snippet is the truth** — what you copy is what ships — nothing hides in a wrapper class

## Components

| Component | Props | States |
|-----------|-------|--------|
| `VButton` | variant, size, disabled | primary, secondary · small, medium, large · disabled |
| `VInput` | label, state, hint, type, disabled | idle, focus, error · text, email, password, search |
| `VCard` | title, padding, elevated | none, small, medium, large · elevated |

## Design System Assets

This rebuild uses the design system from `intelinestsolutions-svg/design-system`:

- **Theme variables** — CSS custom properties for colors, fonts, radii, and dark mode
- **SVG pre-built classes** — `.c-purple`, `.c-teal`, `.c-coral`, `.c-pink`, `.c-gray`, `.c-blue`, `.c-green`, `.c-amber`, `.c-red`
- **Form styles** — pre-styled buttons, inputs, textareas, selects, ranges, checkboxes, radios
- **Initial-render stagger** — animated entrance for first render
- **Open Generative UI Design Skill** — context for building on the design system

## Dark Mode

Automatic via CSS media queries — no hex values hardcoded. Follows `prefers-color-scheme` and system preferences. Manual override available via the theme toggle.

## Development

No build step required. Just serve the `public/` directory:

```bash
# With npx serve
npx serve public/

# Or with Python
python -m http.server --directory public

# Or with Node http-server
npx http-server public -p 8080
```

Then open `http://localhost:8080`.

## File Structure

```
nextgen-kit-enhanced/
├── public/
│   ├── index.html          # Main application (HTML + CSS + JS)
│   └── assets/
│       └── favicon.svg     # Site favicon
├── src/
│   ├── styles/
│   │   ├── tokens.css      # Design tokens (colors, typography, spacing, etc.)
│   │   ├── base.css        # Base reset and utilities
│   │   └── components/
│   │       ├── VButton.css
│   │       ├── VInput.css
│   │       └── VCard.css
│   ├── components/
│   │   ├── ui/
│   │   │   ├── VButton.vue     # Component spec (documentation)
│   │   │   ├── VInput.vue
│   │   │   ├── VCard.vue
│   │   │   └── index.ts        # Component metadata registry
│   │   └── playground/     # Playground logic (future Vue components)
│   └── utils/
│       └── index.ts        # localStorage, snippet generation, debounce/throttle
├── README.md
├── package.json
└── .gitignore
```

## Philosophy

> **Small on purpose** — Rejects components early; the kit fits in one afternoon  
> **Props are the API** — Everything else is a proposal, not a workaround  
> **The snippet is the truth** — What you copy is what ships — nothing hides in a wrapper class

## License

MIT. See `LICENSE`; reuse and adapt this template in personal or commercial projects.

## Attribution

Built with design system assets from [intelinestsolutions-svg/design-system](https://github.com/intelinestsolutions-svg/design-system) (MIT Licensed).

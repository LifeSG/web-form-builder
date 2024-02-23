# Contributing

## Starting development

First install all packages required by this project

```
npm ci
```

> Should you encounter some errors, try doing `npm ci --legacy-peer-deps`

## Adding components

Components are to be added in the `src/components` directory in a structure like this

```
├── src
|	├── components
|	|	└── component-name
|   |       ├── component-name.tsx
|	|       ├── component-name.style.tsx
|   |       ├── index.tsx
|   |       └── types.ts
|   └── index.ts
└── tests
	└── component-name
		└── component-name.spec.tsx
```

Where

-   `component-name.tsx` contains the component src
-   `component-name.style.tsx` contains the styled components of the component
-   `types.ts` the type definitions
-   `index.ts` to contain the exportable of the component and its typings. This is to be reexported to `src/index.ts`

Tests files will sit in the `tests` folder bearing the same folder name as the component.

> File and folder structure are in `kebab-case`

<br />

## Previewing the component

You can preview the components you have created via Storybook. You can do so by doing this.

```
npm run storybook
```

If the web page does not load automatically, you may go to `http://localhost:6006`.

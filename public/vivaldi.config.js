const config = {
  themeSettings: {},
  docs: {
    name: 'Github',
    homepage: '/docs/index.md',
    notFound: '/docs/404.md',
    url: 'https://github.com/mauroreisvieira/hello-week/blob/main'
  },
  defaultVersion: 'v2',
  versions: {
    v2: {
      name: '2.13.1',
      path: 'docs/v2/'
    },
  },
  navbar: {
    logoName: 'Hello Week',
    logoUrl: false,
    home: '/',
    community: {
      Twitter: {
        link: 'https://twitter.com/mauroreisvieira/',
        svg:
          '<svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-5 h-5" viewBox="0 0 20 20"><path d="M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.59 1.49-1.3 2.04-2.13-.75.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.48-1.68.81-2.6 1a4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.49C2.01 8.2 1.37 8.03.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 0 16.4a11.62 11.62 0 0 0 6.29 1.84"/></svg>'
      },
      Github: {
        link: 'https://github.com/mauroreisvieira/hello-week',
        svg:
          '<svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-5 h-5" viewBox="0 0 20 20"><path d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"/></svg>'
      }
    }
  },
  sideNav: {
    v2: [
      {
        text: 'Getting Started',
        children: [
          {
            path: 'guide/installation.md',
            slug: 'installation',
            text: 'Installation'
          },
          {
            path: 'guide/options.md',
            slug: 'options',
            text: 'Options'
          },
          {
            path: 'guide/callbacks.md',
            slug: 'callbacks',
            text: 'Callbacks'
          },
          {
            path: 'guide/methods.md',
            slug: 'methods',
            text: 'Methods'
          },
          {
            path: 'guide/format.md',
            slug: 'format',
            text: 'Format'
          },
          {
            path: 'guide/languages.md',
            slug: 'languages',
            text: 'Languages'
          },
          {
            path: 'guide/customization.md',
            slug: 'customization',
            text: 'Customization'
          }
        ]
      },
      {
        text: 'Examples',
        children: [
          {
            path: 'examples/selected-days.md',
            slug: 'selected-days',
            text: 'Selected Days'
          },
          {
            path: 'examples/disabled-dates.md',
            slug: 'disabled-dates',
            text: 'Disabled Dates'
          },
          {
            path: 'examples/disabled-days-week.md',
            slug: 'disabled-days-week',
            text: 'Disabled Days of Week'
          },
          {
            path: 'examples/get-month-year.md',
            slug: 'get-month-year',
            text: 'Get Month & Year'
          },
          {
            path: 'examples/go-to-date.md',
            slug: 'go-to-date',
            text: 'Go to Date'
          },
          {
            path: 'examples/highlight-dates.md',
            slug: 'highlight-dates',
            text: 'Highlight Dates'
          },
          {
            path: 'examples/min-and-max.md',
            slug: 'min-and-max',
            text: 'Min & Max'
          },
          {
            path: 'examples/locked.md',
            slug: 'locked',
            text: 'Locked'
          },
          {
            path: 'examples/range.md',
            slug: 'range',
            text: 'Range'
          },
          {
            path: 'examples/rtl.md',
            slug: 'rtl',
            text: 'RTL'
          },
          {
            path: 'examples/on-select.md',
            slug: 'on-select',
            text: 'On Select'
          },
          {
            path: 'examples/before-create-day.md',
            slug: 'before-create-day',
            text: 'Before Create Day'
          },
        ]
      },
      {
        text: 'Advanced',
        children: [
          {
            path: 'advanced/api-reference.md',
            slug: 'api-reference',
            text: 'API Reference'
          },
        ]
      }
    ],
  }
};
Object.defineProperty(window, 'VIVALDI', { value: config, writable: false });

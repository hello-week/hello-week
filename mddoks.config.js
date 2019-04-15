/*
Mddoks - Javascript Framework to build documentation.
Welcome to the Mddoks config file. This is where you can customize Mddoks for your project.

View the full documentation at https://mauroreisvieira.github.io/mddoks/
*/


const config = {
    /*
    |-----------------------------------------------------------------------------------------------
    | Theme                          https://mauroreisvieira.github.io/mddoks/#/docs/theme
    |-----------------------------------------------------------------------------------------------
    |
    | Configure Theme options.
    |
    */
    theme: {
        appName: "Hello Week",
        appLogo: false,
        version: true,
        search: false
    },

    /*
    |-----------------------------------------------------------------------------------------------
    | Algolia                          https://mauroreisvieira.github.io/mddoks/#/docs/algolia
    |-----------------------------------------------------------------------------------------------
    |
    | Configure Algolia options.
    |
    */
    algolia: false,

    /*
    |-----------------------------------------------------------------------------------------------
    | Social                          https://mauroreisvieira.github.io/mddoks/#/docs/social
    |-----------------------------------------------------------------------------------------------
    |
    | Configure Social options.
    |
    */
    social: {
        twitter: "https://twitter.com/mauroreisvieira",
        github: "https://github.com/mauroreisvieira/hello-week",
        linkedin: false,
    },

    /*
    |-----------------------------------------------------------------------------------------------
    | Router                          https://mauroreisvieira.github.io/mddoks/#/docs/router
    |-----------------------------------------------------------------------------------------------
    |
    | Configure Router options.
    |
    */
    router: [
{
            name: "API",
            isVisible: true,
            menus: [
                {
                    url: "/docs/methods",
                    title: "Methods"
                },
                {
                    url: "/docs/options",
                    title: "Options"
                },
                {
                    url: "/docs/date-format",
                    title: "Format Date"
                },
                {
                    url: "/docs/callbacks",
                    title: "Callbacks"
                },
                {
                    url: "/docs/customization",
                    title: "Customization"
                },
                {
                    url: "/docs/languages",
                    title: "Languages"
                }
            ]
        },
        {
            name: "Demos",
            isVisible: true,
            menus: [
                {
                    url: "/docs/demos/disabled-dates",
                    title: "Disabled Dates"
                },
                {
                    url: "/docs/demos/disabled-days-week",
                    title: "Disabled Days Week"
                },
                {
                    url: "/docs/demos/go-to-date",
                    title: "Go to Date"
                },
                {
                    url: "/docs/demos/get-month-year",
                    title: "Get Month and Year"
                },
                {
                    url: "/docs/demos/highlight-dates",
                    title: "Dates Highlight"
                },
                {
                    url: "/docs/demos/locked",
                    title: "Locked"
                },
                {
                    url: "/docs/demos/min-and-max",
                    title: "Min and Max"
                },
                {
                    url: "/docs/demos/range",
                    title: "Range"
                },
                {
                    url: "/docs/demos/reset",
                    title: "Reset"
                },
                {
                    url: "/docs/demos/retrieve-clicked-date",
                    title: "Retrieve Clicked Date"
                },
                {
                    url: "/docs/demos/rtl",
                    title: "RTL"
                },
                {
                    url: "/docs/demos/selected-days",
                    title: "Selected Days"
                }
            ]
        },
        {
            name: "Support",
            isVisible: true,
            menus: [
                {
                    url: "/CONTRIBUTING",
                    title: "Contributing"
                },
                {
                    url: "/CHANGELOG",
                    title: "Changelog"
                }
            ]
        }
    ]
};

Object.defineProperty (window, "MDDOKS", { value : config, writable: false });

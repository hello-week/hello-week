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
        appLogo: "assets/images/logo.png",
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
            name: "Get Started",
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
                }
            ]
        }
    ]
};

Object.defineProperty (window, "MDDOKS", { value : config, writable: false });

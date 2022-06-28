module.exports = {
  locales: ["es", "en"],
  defaultLocale: "es",
  localeDetection: false,
  pages: {
    "*": ["common"],
    // "/": ["products"],
  },
  /*
  loadLocaleFrom: (lang, ns) =>
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
    */
};

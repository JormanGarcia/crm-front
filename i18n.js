module.exports = {
  locales: ["en", "es"],
  defaultLocale: "es",
  pages: {
    "*": ["common"],
    // "/": ["products"],
  },
  /*
  loadLocaleFrom: (lang, ns) =>
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
    */
};

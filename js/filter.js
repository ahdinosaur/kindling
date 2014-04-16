var filterModules = function (modules, search) {
  return modules.filter(function (item) {
    return item.name.match(search)
      || item.author.match(search);
  });
};

module.exports = {
  modules: filterModules,
};
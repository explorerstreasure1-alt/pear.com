window.Core = {
  I18n,
  DesignSystem,
  ApiService,
  JobService,
  UserService,
  CategoryService,
  JobStore,
  UIStore,
  UserStore,
  Store
};

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    DesignSystem.init();
    I18n.init();
    JobStore.init();
    UIStore.init();
    UserStore.init();
  });
})();
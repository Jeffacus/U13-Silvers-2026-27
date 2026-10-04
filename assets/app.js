(function () {
  try {
    var target = new URL('../', window.location.href);
    target.searchParams.set('app', '66');
    target.hash = window.location.hash;
    window.location.replace(target.href);
  } catch (e) {
    window.location.replace('../?app=66');
  }
}());

/**
 * Rotas
 */

module.exports = function (router) {
  // Home
  router.get('/', function (req, res) {
    res.sendfile('./public/index.html');
  });
}

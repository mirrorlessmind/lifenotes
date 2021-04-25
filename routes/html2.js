// Need to require file path dependency
// ===============================================================================
const path = require('path');

module.exports = function(app) {
  // GET Requests for user referencing the notes, index html, default to index
  // ---------------------------------------------------------------------------

  app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
};

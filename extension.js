var { max } = require('./disposable/max');
var { smart } = require('./disposable/smart');

function activate(context) {
  context.subscriptions.push(smart)
  context.subscriptions.push(max)
}

exports.activate = activate;

module.exports = {
  activate
}
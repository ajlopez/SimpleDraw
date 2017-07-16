
var sd = require('..');
var domie = require('domie');

exports['create simple view'] = function (test) {
	var view = sd.view();
	
	test.ok(view);
	test.equal(typeof view, 'object');
};

exports['render simple view element'] = function (test) {
	var view = sd.view({ width: 100, height: 50 });
	var document = domie.document();
	
	var element = view.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<svg width="100px" height="50px" />');
};

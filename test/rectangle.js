
var sd = require('..');
var domie = require('domie');

exports['create simple rectangle'] = function (test) {
	var rectangle = sd.rectangle({ x: 10, y: 20, width: 50, height: 25 });
	
	test.ok(rectangle);
	test.equal(typeof rectangle, 'object');
};

exports['render simple rectangle element'] = function (test) {
	var rectangle = sd.rectangle({ x: 10, y: 20, width: 50, height: 25 });
	var document = domie.document();
	
	var element = rectangle.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<rect x="10" y="20" width="50" height="25" />');
};

exports['render rectangle with rounded corners'] = function (test) {
	var rectangle = sd.rectangle({ x: 10, y: 20, width: 50, height: 25, rx: 3, ry: 2 });
	var document = domie.document();
	
	var element = rectangle.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<rect x="10" y="20" width="50" height="25" rx="3" ry="2" />');
};

exports['render rectangle with fill and fill opacity'] = function (test) {
	var rectangle = sd.rectangle({ x: 10, y: 20, width: 50, height: 25, fill: 'blue', fill_opacity: 0.2 });
	var document = domie.document();
	
	var element = rectangle.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<rect x="10" y="20" width="50" height="25" style="fill: blue; fill-opacity: 0.2;" />');
};

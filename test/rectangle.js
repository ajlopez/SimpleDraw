
const sd = require('..');
const domie = require('domie');

exports['create simple rectangle'] = function (test) {
	const rectangle = sd.rectangle({ x: 10, y: 20, width: 50, height: 25 });
	
	test.ok(rectangle);
	test.equal(typeof rectangle, 'object');
};

exports['render simple rectangle element'] = function (test) {
	const rectangle = sd.rectangle({ x: 10, y: 20, width: 50, height: 25 });
	const document = domie.document();
	
	const element = rectangle.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<rect x="10" y="20" width="50" height="25" />');
};

exports['render rectangle with rounded corners'] = function (test) {
	const rectangle = sd.rectangle({ x: 10, y: 20, width: 50, height: 25, rx: 3, ry: 2 });
	const document = domie.document();
	
	const element = rectangle.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<rect x="10" y="20" width="50" height="25" rx="3" ry="2" />');
};

exports['render rectangle with fill and fill opacity'] = function (test) {
	const rectangle = sd.rectangle({ x: 10, y: 20, width: 50, height: 25, fill: 'blue', fill_opacity: 0.2 });
	const document = domie.document();
	
	const element = rectangle.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<rect x="10" y="20" width="50" height="25" style="fill: blue; fill-opacity: 0.2;" />');
};

exports['render rectangle with translate'] = function (test) {
	const rectangle = sd.rectangle({ x: 10, y: 20, width: 50, height: 25, translate: [ 10, 20 ] });
	const document = domie.document();
	
	const element = rectangle.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<rect x="10" y="20" width="50" height="25" transform="translate(10, 20)" />');
};


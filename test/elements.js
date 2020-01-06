
const sd = require('..');
const domie = require('domie');

exports['create line element'] = function (test) {
	const line = sd.element('line', { x1: 10, y1: 20, x2: 30, y2: 40 });
	const document = domie.document();
	
	const element = line.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<line x1="10" y1="20" x2="30" y2="40" />');
};

exports['create rectangle element'] = function (test) {
	const rectangle = sd.element('rect', { x: 10, y: 20, width: 50, height: 25 });
	const document = domie.document();
	
	const element = rectangle.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<rect x="10" y="20" width="50" height="25" />');
};

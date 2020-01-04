
const sd = require('..');
const domie = require('domie');

exports['create simple circle'] = function (test) {
	const circle = sd.circle({ cx: 10, cy: 10, r: 5 });
	
	test.ok(circle);
	test.equal(typeof circle, 'object');
};

exports['render simple circle element'] = function (test) {
	const circle = sd.circle({ cx: 10, cy: 20, r: 5 });
	const document = domie.document();
	
	const element = circle.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<circle cx="10" cy="20" r="5" />');
};

exports['use stroke in options'] = function (test) {
	const circle = sd.circle({ cx: 10, cy: 20, r: 5, stroke: 'black' });
	const document = domie.document();
	
	const element = circle.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<circle cx="10" cy="20" r="5" style="stroke: black;" />');
};

exports['use fill in options'] = function (test) {
	const circle = sd.circle({ cx: 10, cy: 20, r: 5, stroke: 'black', fill: 'blue' });
	const document = domie.document();
	
	const element = circle.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<circle cx="10" cy="20" r="5" style="stroke: black; fill: blue;" />');
};


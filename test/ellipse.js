
const sd = require('..');
const domie = require('domie');

exports['create simple ellipse'] = function (test) {
	const ellipse = sd.ellipse({ cx: 10, cy: 20, rx: 15, ry: 10 });
	
	test.ok(ellipse);
	test.equal(typeof ellipse, 'object');
};

exports['render simple ellipse element'] = function (test) {
	const ellipse = sd.ellipse({ cx: 10, cy: 20, rx: 15, ry: 10 });
	const document = domie.document();
	
	const element = ellipse.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<ellipse cx="10" cy="20" rx="15" ry="10" />');
};


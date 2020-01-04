
const sd = require('..');
const domie = require('domie');

exports['create simple text'] = function (test) {
	const text = sd.text("hello, world", { x: 10, y: 20 });
	
	test.ok(text);
	test.equal(typeof text, 'object');
};

exports['render simple text element'] = function (test) {
	const text = sd.text("hello, world", { x: 10, y: 20 });
	const document = domie.document();
	
	const element = text.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<text x="10" y="20">hello, world</text>');
};


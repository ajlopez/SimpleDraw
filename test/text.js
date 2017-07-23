
var sd = require('..');
var domie = require('domie');

exports['create simple text'] = function (test) {
	var text = sd.text("hello, world", { x: 10, y: 20 });
	
	test.ok(text);
	test.equal(typeof text, 'object');
};

exports['render simple text element'] = function (test) {
	var text = sd.text("hello, world", { x: 10, y: 20 });
	var document = domie.document();
	
	var element = text.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<text x="10" y="20">hello, world</text>');
};


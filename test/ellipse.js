
var sd = require('..');
var domie = require('domie');

exports['create simple ellipse'] = function (test) {
	var ellipse = sd.ellipse({ cx: 10, cy: 20, rx: 15, ry: 10 });
	
	test.ok(ellipse);
	test.equal(typeof ellipse, 'object');
};

exports['render simple ellipse element'] = function (test) {
	var ellipse = sd.ellipse({ cx: 10, cy: 20, rx: 15, ry: 10 });
	var document = domie.document();
	
	var element = ellipse.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<ellipse cx="10" cy="20" rx="15" ry="10" />');
};


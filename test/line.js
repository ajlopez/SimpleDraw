
var sd = require('..');
var domie = require('domie');

exports['create simple line'] = function (test) {
	var line = sd.line({ x1: 10, y1: 20, x2: 30, y2: 40 });
	
	test.ok(line);
	test.equal(typeof line, 'object');
};

exports['render simple line element'] = function (test) {
	var line = sd.line({ x1: 10, y1: 20, x2: 30, y2: 40 });
	var document = domie.document();
	
	var element = line.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<line x1="10" y1="20" x2="30" y2="40" />');
};

exports['use stroke in options'] = function (test) {
	var line = sd.line({ x1: 10, y1: 20, x2: 30, y2: 40, stroke: "black" });
	var document = domie.document();
	
	var element = line.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<line x1="10" y1="20" x2="30" y2="40" style="stroke: black;" />');
};

exports['use stroke and stroke width in options'] = function (test) {
	var line = sd.line({ x1: 10, y1: 20, x2: 30, y2: 40, stroke: "black", stroke_width: 10 });
	var document = domie.document();
	
	var element = line.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<line x1="10" y1="20" x2="30" y2="40" style="stroke: black; stroke-width: 10;" />');
};

exports['use stroke and stroke opacity in options'] = function (test) {
	var line = sd.line({ x1: 10, y1: 20, x2: 30, y2: 40, stroke: "black", stroke_opacity: 0.2 });
	var document = domie.document();
	
	var element = line.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<line x1="10" y1="20" x2="30" y2="40" style="stroke: black; stroke-opacity: 0.2;" />');
};


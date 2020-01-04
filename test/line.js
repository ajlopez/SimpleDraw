
const sd = require('..');
const domie = require('domie');

exports['create simple line'] = function (test) {
	const line = sd.line({ x1: 10, y1: 20, x2: 30, y2: 40 });
	
	test.ok(line);
	test.equal(typeof line, 'object');
};

exports['render simple line element'] = function (test) {
	const line = sd.line({ x1: 10, y1: 20, x2: 30, y2: 40 });
	const document = domie.document();
	
	const element = line.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<line x1="10" y1="20" x2="30" y2="40" />');
};

exports['use stroke in options'] = function (test) {
	const line = sd.line({ x1: 10, y1: 20, x2: 30, y2: 40, stroke: "black" });
	const document = domie.document();
	
	const element = line.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<line x1="10" y1="20" x2="30" y2="40" style="stroke: black;" />');
};

exports['use stroke and stroke width in options'] = function (test) {
	const line = sd.line({ x1: 10, y1: 20, x2: 30, y2: 40, stroke: "black", stroke_width: 10 });
	const document = domie.document();
	
	const element = line.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<line x1="10" y1="20" x2="30" y2="40" style="stroke: black; stroke-width: 10;" />');
};

exports['use stroke and stroke opacity in options'] = function (test) {
	const line = sd.line({ x1: 10, y1: 20, x2: 30, y2: 40, stroke: "black", stroke_opacity: 0.2 });
	const document = domie.document();
	
	const element = line.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<line x1="10" y1="20" x2="30" y2="40" style="stroke: black; stroke-opacity: 0.2;" />');
};

exports['use stroke and stroke dasharray in options'] = function (test) {
	const line = sd.line({ x1: 10, y1: 20, x2: 30, y2: 40, stroke: "black", stroke_dasharray: [ 9, 3, 5 ] });
	const document = domie.document();
	
	const element = line.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<line x1="10" y1="20" x2="30" y2="40" style="stroke: black; stroke-dasharray: 9, 3, 5;" />');
};


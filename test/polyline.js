
const sd = require('..');
const domie = require('domie');

exports['create simple polyline'] = function (test) {
	const line = sd.polyline({ points: "10 20, 30 40, 50 60" });
	
	test.ok(line);
	test.equal(typeof line, 'object');
};

exports['render simple polyline element'] = function (test) {
	const line = sd.polyline({ points: "10 20, 30 40, 50 60" });
	const document = domie.document();
	
	const element = line.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<polyline points="10 20, 30 40, 50 60" />');
};

exports['render simple polyline element using array points'] = function (test) {
	const line = sd.polyline({ points: [[10, 20], [30, 40], [50, 60]] });
	const document = domie.document();
	
	const element = line.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<polyline points="10 20, 30 40, 50 60" />');
};

exports['use stroke in options'] = function (test) {
	const line = sd.polyline({ points: "10 20, 30 40, 50 60", stroke: "black" });
	const document = domie.document();
	
	const element = line.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<polyline points="10 20, 30 40, 50 60" style="stroke: black;" />');
};

exports['use stroke and stroke width in options'] = function (test) {
	const line = sd.polyline({ points: "10 20, 30 40, 50 60", stroke: "black", stroke_width: 10 });
	const document = domie.document();
	
	const element = line.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<polyline points="10 20, 30 40, 50 60" style="stroke: black; stroke-width: 10;" />');
};

exports['use stroke and stroke opacity in options'] = function (test) {
	const line = sd.polyline({ points: "10 20, 30 40, 50 60", stroke: "black", stroke_opacity: 0.2 });
	const document = domie.document();
	
	const element = line.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<polyline points="10 20, 30 40, 50 60" style="stroke: black; stroke-opacity: 0.2;" />');
};

exports['use stroke and stroke dasharray in options'] = function (test) {
	const line = sd.polyline({ points: "10 20, 30 40, 50 60", stroke: "black", stroke_dasharray: [ 9, 3, 5 ] });
	const document = domie.document();
	
	const element = line.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<polyline points="10 20, 30 40, 50 60" style="stroke: black; stroke-dasharray: 9, 3, 5;" />');
};


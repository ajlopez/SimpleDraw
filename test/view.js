
var sd = require('..');
var domie = require('domie');

exports['create simple view'] = function (test) {
	var view = sd.view();
	
	test.ok(view);
	test.equal(typeof view, 'object');
};

exports['render simple view element'] = function (test) {
	var view = sd.view({ width: 100, height: 50 });
	var document = domie.document();
	
	var element = view.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<svg width="100px" height="50px" />');
};

exports['render view with a line'] = function (test) {
	var view = sd.view({ width: 100, height: 50 })
		.line({ x1: 10, y1: 20, x2: 30, y2: 40 });
		
	var document = domie.document();
	
	var element = view.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<svg width="100px" height="50px"><line x1="10" y1="20" x2="30" y2="40" /></svg>');
};

exports['render view with a circle'] = function (test) {
	var view = sd.view({ width: 100, height: 50 })
		.circle({ cx: 10, cy: 20, r: 5 });
		
	var document = domie.document();
	
	var element = view.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<svg width="100px" height="50px"><circle cx="10" cy="20" r="5" /></svg>');
};

exports['render view with line and circle'] = function (test) {
	var view = sd.view({ width: 100, height: 50 })
		.line({ x1: 10, y1: 20, x2: 30, y2: 40 })
		.circle({ cx: 10, cy: 20, r: 5 });
		
	var document = domie.document();
	
	var element = view.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<svg width="100px" height="50px"><line x1="10" y1="20" x2="30" y2="40" /><circle cx="10" cy="20" r="5" /></svg>');
};

exports['render view with circle and line'] = function (test) {
	var view = sd.view({ width: 100, height: 50 })
		.circle({ cx: 10, cy: 20, r: 5 })
		.line({ x1: 10, y1: 20, x2: 30, y2: 40 });
		
	var document = domie.document();
	
	var element = view.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<svg width="100px" height="50px"><circle cx="10" cy="20" r="5" /><line x1="10" y1="20" x2="30" y2="40" /></svg>');
};

exports['render view with line and rectangle'] = function (test) {
	var view = sd.view({ width: 100, height: 50 })
		.line({ x1: 10, y1: 20, x2: 30, y2: 40 })
		.rectangle({ x: 10, y: 20, width: 50, height: 25 });
		
	var document = domie.document();
	
	var element = view.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<svg width="100px" height="50px"><line x1="10" y1="20" x2="30" y2="40" /><rect x="10" y="20" width="50" height="25" /></svg>');
};

exports['render view with rectangle and line'] = function (test) {
	var view = sd.view({ width: 100, height: 50 })
		.rectangle({ x: 10, y: 20, width: 50, height: 25 })
		.line({ x1: 10, y1: 20, x2: 30, y2: 40 });
		
	var document = domie.document();
	
	var element = view.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<svg width="100px" height="50px"><rect x="10" y="20" width="50" height="25" /><line x1="10" y1="20" x2="30" y2="40" /></svg>');
};



var sd = require('..');

exports['create simple line'] = function (test) {
	var line = sd.line({ x1: 10, y1: 20, x2: 30, y2: 40 });
	
	test.ok(line);
	test.equal(typeof line, 'object');
};


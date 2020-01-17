
const sd = require('..');
const domie = require('domie');

exports['create simple group'] = function (test) {
	const group = sd.group({});
	
	test.ok(group);
	test.equal(typeof group, 'object');
};

exports['render simple group element'] = function (test) {
	const group = sd.group({ id: 'g1' });
	const document = domie.document();
	
	const element = group.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<g id="g1" />');
};


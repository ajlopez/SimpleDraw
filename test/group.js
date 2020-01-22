
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

exports['render group element with line element'] = function (test) {
	const group = sd.group({ id: 'g1' });
    group.line({ x1: 10, y1: 20, x2: 30, y2: 40 });
	const document = domie.document();
	
	const element = group.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<g id="g1"><line x1="10" y1="20" x2="30" y2="40" /></g>');
};

exports['render group element adding line element'] = function (test) {
	const group = sd.group({ id: 'g1' });
    group.add(sd.element('line', { x1: 10, y1: 20, x2: 30, y2: 40 }));
	const document = domie.document();
	
	const element = group.element(document);
	
	test.ok(element);
	test.equal(element.outerHTML, '<g id="g1"><line x1="10" y1="20" x2="30" y2="40" /></g>');
};


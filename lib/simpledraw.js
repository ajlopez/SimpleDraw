
function addAttribute(document, element, options, name) {
	if (options[name] == null)
		return;
		
	var attr = document.createAttribute(name);
	attr.value = options[name].toString();
	element.attributes.setNamedItem(attr);
}

function addStyle(document, el, options) {
	var style = {};
	
	if (options.stroke)
		style.stroke = options.stroke;

	if (options.fill)
		style.fill = options.fill;
		
	if (Object.keys(style).length === 0)
		return;
		
	var str = '';
	
	for (var name in style)  {
		if (str.length)
			str += ' ';
			
		str += name + ": " + style[name] + ";";
	}
	
	var attr = document.createAttribute('style');
	attr.value = str;
	el.attributes.setNamedItem(attr);
}

function Line(options) {
	options = options || {};
	
	this.element = function (document) {
		var el = document.createElement('line');
		
		addAttribute(document, el, options, 'x1');
		addAttribute(document, el, options, 'y1');
		addAttribute(document, el, options, 'x2');
		addAttribute(document, el, options, 'y2');
		addStyle(document, el, options);
		
		return el;
	};
}

function Circle(options) {
	options = options || {};
	
	this.element = function (document) {
		var el = document.createElement('circle');
		
		addAttribute(document, el, options, 'cx');
		addAttribute(document, el, options, 'cy');
		addAttribute(document, el, options, 'r');
		addStyle(document, el, options);
		
		return el;
	};
}

function createLine(options) {
	return new Line(options);
}

function createCircle(options) {
	return new Circle(options);
}

module.exports = {
	line: createLine,
	circle: createCircle
};


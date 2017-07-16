
var sd = (function () {

function addAttribute(document, element, options, name, units) {
	if (options[name] == null)
		return;
	
	var value = options[name];
	
	if (units && typeof value === 'number')
		value += units;
		
	var attr = document.createAttribute(name);
	attr.value = value.toString();
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

function Line(options, parent) {
	options = options || {};
	
	this.element = function (document, direct) {
		if (!direct && parent)
			return parent.element(document);
		
		var el = document.createElement('line');
		
		addAttribute(document, el, options, 'x1');
		addAttribute(document, el, options, 'y1');
		addAttribute(document, el, options, 'x2');
		addAttribute(document, el, options, 'y2');
		addStyle(document, el, options);
		
		return el;
	};
	
	this.circle = function (options) { return parent.circle(options); };
	this.line = function (options) { return parent.line(options); };
}

function Circle(options, parent) {
	options = options || {};
	
	this.element = function (document, direct) {
		if (!direct && parent)
			return parent.element(document);
		
		var el = document.createElement('circle');
		
		addAttribute(document, el, options, 'cx');
		addAttribute(document, el, options, 'cy');
		addAttribute(document, el, options, 'r');
		addStyle(document, el, options);
		
		return el;
	};
	
	this.circle = function (options) { return parent.circle(options); };
	this.line = function (options) { return parent.line(options); };
}

function ViewPort(options) {
	options = options || {};
	var elements = [];

	this.element = function (document) {
		var el = document.createElement('svg');
		
		addAttribute(document, el, options, 'width', 'px');
		addAttribute(document, el, options, 'height', 'px');
		
		elements.forEach(function (elem) {
			el.appendChild(elem.element(document, true));
		})
		
		return el;
	};
	
	this.line = function (options) {
		var line = createLine(options, this);
		elements.push(line);
		return line;
	}
	
	this.circle = function (options) {
		var circle = createCircle(options, this);
		elements.push(circle);
		return circle;
	}
}

function createLine(options, parent) {
	return new Line(options, parent);
}

function createCircle(options, parent) {
	return new Circle(options, parent);
}

function createViewPort(options) {
	return new ViewPort(options);
}

return {
	line: createLine,
	circle: createCircle,
	view: createViewPort
};
	
}());


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = sd;




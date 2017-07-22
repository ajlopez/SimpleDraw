
var sd = (function () {
	
var styles = [ 'stroke', 'stroke_width', 'stroke_opacity', 'stroke_dasharray', 'fill' ];

function normalizeName(name) {
	return name.replace(/_/g, "-");
}

function normalizeValue(value) {
	if (Array.isArray(value))
		return value.toString().replace(/,/g, ", ");

	return value;
}

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
	
	styles.forEach(function (name) {
		if (options[name] != null)
			style[name] = options[name];
	});
		
	if (Object.keys(style).length === 0)
		return;
		
	var str = '';
	
	for (var name in style)  {
		if (str.length)
			str += ' ';

		
		str += normalizeName(name) + ": " + normalizeValue(style[name]) + ";";
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
		
		var el = document.createElementNS("http://www.w3.org/2000/svg", 'line');
		
		addAttribute(document, el, options, 'x1');
		addAttribute(document, el, options, 'y1');
		addAttribute(document, el, options, 'x2');
		addAttribute(document, el, options, 'y2');
		addStyle(document, el, options);
		
		return el;
	};
	
	this.circle = function (options) { return parent.circle(options); };
	this.line = function (options) { return parent.line(options); };
	this.rectangle = function (options) { return parent.rectangle(options); };
}

function Circle(options, parent) {
	options = options || {};
	
	this.element = function (document, direct) {
		if (!direct && parent)
			return parent.element(document);
		
		var el = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
		
		addAttribute(document, el, options, 'cx');
		addAttribute(document, el, options, 'cy');
		addAttribute(document, el, options, 'r');
		addStyle(document, el, options);
		
		return el;
	};
	
	this.circle = function (options) { return parent.circle(options); };
	this.line = function (options) { return parent.line(options); };
}

function Rectangle(options, parent) {
	options = options || {};
	
	this.element = function (document, direct) {
		if (!direct && parent)
			return parent.element(document);
		
		var el = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
		
		addAttribute(document, el, options, 'x');
		addAttribute(document, el, options, 'y');
		addAttribute(document, el, options, 'width');
		addAttribute(document, el, options, 'height');
		addStyle(document, el, options);
		
		return el;
	};

	this.circle = function (options) { return parent.circle(options); };
	this.line = function (options) { return parent.line(options); };
	this.rectangle = function (options) { return parent.rectangle(options); };
}

function ViewPort(options) {
	options = options || {};
	var elements = [];

	this.element = function (document) {
		var el = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
		
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

	this.rectangle = function (options) {
		var rectangle = createRectangle(options, this);
		elements.push(rectangle);
		return rectangle;
	}
}

function createLine(options, parent) {
	return new Line(options, parent);
}

function createCircle(options, parent) {
	return new Circle(options, parent);
}

function createRectangle(options, parent) {
	return new Rectangle(options, parent);
}

function createViewPort(options) {
	return new ViewPort(options);
}

return {
	line: createLine,
	circle: createCircle,
	rectangle: createRectangle,
	view: createViewPort
};
	
}());


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = sd;




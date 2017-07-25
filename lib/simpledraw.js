
var sd = (function () {
	
var styles = [ 'stroke', 'stroke_width', 'stroke_opacity', 'stroke_dasharray', 'fill', 'fill_opacity' ];

var lineattrs = [ 'x1', 'y1', 'x2', 'y2' ];
var circleattrs = [ 'cx', 'cy', 'r' ];
var ellipseattrs = [ 'cx', 'cy', 'rx', 'ry' ];
var rectangleattrs = [ 'x', 'y', 'width', 'height', 'rx', 'ry' ];
var textattrs = [ 'x', 'y' ];

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

function Element(name, options, attributes, value) {
	options = options || {};

	this.element = function (document) {
		var el = document.createElementNS("http://www.w3.org/2000/svg", name);
		
		attributes.forEach(function(attr) {
			addAttribute(document, el, options, attr);
		});
		
		addStyle(document, el, options);
		
		if (value)
			el.appendChild(document.createTextNode(value));
		
		return el;
	};
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
		var line = createLine(options);
		elements.push(line);
		return this;
	}
	
	this.circle = function (options) {
		var circle = createCircle(options);
		elements.push(circle);
		return this;
	}
	
	this.ellipse = function (options) {
		var ellipse = createEllipse(options);
		elements.push(ellipse);
		return this;
	}

	this.rectangle = function (options) {
		var rectangle = createRectangle(options);
		elements.push(rectangle);
		return this;
	}
	
	this.text = function (text, options) {
		var text = createText(text, options);
		elements.push(text);
		return this;
	}
}

function createLine(options) {
	return new Element('line', options, lineattrs);
}

function createCircle(options) {
	return new Element('circle', options, circleattrs);
}

function createEllipse(options) {
	return new Element('ellipse', options, ellipseattrs);
}

function createRectangle(options) {
	return new Element('rect', options, rectangleattrs);
}

function createText(text, options) {
	return new Element('text', options, textattrs, text);
}

function createViewPort(options) {
	return new ViewPort(options);
}

return {
	line: createLine,
	circle: createCircle,
	ellipse: createEllipse,
	rectangle: createRectangle,
	text: createText,
	view: createViewPort
};
	
}());


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = sd;




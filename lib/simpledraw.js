
const sd = (function () {
	
const styles = [ 'stroke', 'stroke_width', 'stroke_opacity', 'stroke_dasharray', 'fill', 'fill_opacity' ];
const transforms = [ 'translate', 'scale' ];

const genattrs = [ 'id' ];

const viewportattrs = [ 'width', 'height' ];
const lineattrs = [ 'x1', 'y1', 'x2', 'y2' ];
const polylineattrs = [ 'points' ];
const circleattrs = [ 'cx', 'cy', 'r' ];
const ellipseattrs = [ 'cx', 'cy', 'rx', 'ry' ];
const rectangleattrs = [ 'x', 'y', 'width', 'height', 'rx', 'ry' ];
const textattrs = [ 'x', 'y' ];

const elemattrs = {
    'line': lineattrs,
    'rect': rectangleattrs,
    'circle': circleattrs,
    'ellipse': ellipseattrs,
    'text': textattrs,
    'polyline': polylineattrs
};

function normalizeName(name) {
	return name.replace(/_/g, "-");
}

function normalizeValue(value) {
    if (Array.isArray(value) && Array.isArray(value[0])) {
        const newvalue = [];
        
        for (let k = 0, l = value.length; k < l; k++)
            newvalue.push(value[k].join(' '));
        
        value = newvalue;
    }
    
	if (Array.isArray(value))
		return value.join(", ");

	return value;
}

function addAttribute(document, element, options, name, units) {
	if (options[name] == null)
		return;
	
	let value = normalizeValue(options[name]);
	
	if (units && typeof value === 'number')
		value += units;
		
	const attr = document.createAttribute(name);
    
	attr.value = value.toString();
	element.attributes.setNamedItem(attr);
}

function addTransform(document, el, options) {
    const transform = {};
    
	transforms.forEach(function (name) {
		if (options[name] != null)
			transform[name] = options[name];
	});
    
	if (Object.keys(transform).length === 0)
		return;
		
	let str = '';
	
	for (let name in transform)  {
		if (str.length)
			str += ' ';

		str += normalizeName(name) + "(" + normalizeValue(transform[name]) + ")";
	}
	
	const attr = document.createAttribute('transform');
    
	attr.value = str;
	el.attributes.setNamedItem(attr);
}

function addStyle(document, el, options) {
	const style = {};
	
	styles.forEach(function (name) {
		if (options[name] != null)
			style[name] = options[name];
	});
		
	if (Object.keys(style).length === 0)
		return;
		
	let str = '';
	
	for (let name in style)  {
		if (str.length)
			str += ' ';

		str += normalizeName(name) + ": " + normalizeValue(style[name]) + ";";
	}
	
	const attr = document.createAttribute('style');
    
	attr.value = str;
	el.attributes.setNamedItem(attr);
}

function Element(name, options, attributes, value) {
	options = options || {};
    attributes = attributes || [];
    
    // TODO this is hack
    const issvg = name === 'svg';

	this.element = function (document) {
		const el = document.createElementNS("http://www.w3.org/2000/svg", name);
		
		genattrs.forEach(function(attr) {
			addAttribute(document, el, options, attr);
		});

		attributes.forEach(function(attr) {
            if (issvg && (attr === 'height' || attr === 'width'))
                addAttribute(document, el, options, attr, 'px');
            else
                addAttribute(document, el, options, attr);
		});
		
		addStyle(document, el, options);
        addTransform(document, el, options);
		
		if (value)
			el.appendChild(document.createTextNode(value));
		
		return el;
	};
}

function CompositeElement(name, options, attributes, value) {
    Element.call(this, name, options, attributes, value);

	const elements = [];
    const superelement = this.element;

	this.element = function (document) {
        const el = superelement.call(this, document);

		elements.forEach(function (elem) {
			el.appendChild(elem.element(document, true));
		})
		
		return el;
	};
	
	this.line = function (options) {
		const line = createLine(options);
        
		elements.push(line);
        
		return this;
	}
	
	this.polyline = function (options) {
		const polyline = createPolyline(options);
        
		elements.push(polyline);
        
		return this;
	}
	
	this.circle = function (options) {
		const circle = createCircle(options);
        
		elements.push(circle);
        
		return this;
	}
	
	this.ellipse = function (options) {
		const ellipse = createEllipse(options);
        
		elements.push(ellipse);
        
		return this;
	}

	this.rectangle = function (options) {
		const rectangle = createRectangle(options);
        
		elements.push(rectangle);
        
		return this;
	}
	
	this.text = function (text, options) {
		text = createText(text, options);
        
		elements.push(text);
        
		return this;
	}
}

function createLine(options) {
	return new Element('line', options, lineattrs);
}

function createPolyline(options) {
	return new Element('polyline', options, polylineattrs);
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

function createGroup(options) {
    return new Element('g', options);
}

function createViewPort(options) {
	return new CompositeElement('svg', options, viewportattrs);
}

function createElement(name, options, extra) {
    const attrs = elemattrs[name] ? elemattrs[name] : [];
    
    return new Element(name, options, attrs, extra);
}

return {
	line: createLine,
	polyline: createPolyline,
	circle: createCircle,
	ellipse: createEllipse,
	rectangle: createRectangle,
	text: createText,
    group: createGroup,
    
	view: createViewPort,
    
    element: createElement
};
	
}());


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = sd;


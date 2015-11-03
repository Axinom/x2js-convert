(function () {
	"use strict";

	const CONVERT_DIRECTIONS = {
		"XmlToJson": 1,
		"JsonToXml": 2
	};

	let X2JS = require("x2js");

	module.exports = {
		"directions": CONVERT_DIRECTIONS,
		"convert": function convert(inputString, direction) {
			let converter = new X2JS();

			if (direction === CONVERT_DIRECTIONS.JsonToXml) {
				// First, transform JSON to JavaScript objects.
				let objectTree = JSON.parse(inputString);

				// Then convert JavaScript objects to XML.
				let xml = converter.js2xml(objectTree);

				// And we're done!
				return xml;
			} else if (direction === CONVERT_DIRECTIONS.XmlToJson) {
				// First, transform XML to JavaScript objects.
				let objectTree = converter.xml2js(inputString);

				// Then serialize to JSON.
				let json = JSON.stringify(objectTree);

				// And we're done!
				return json;
			} else {
				throw new Error("Unsupported conversion direction.");
			}
		}
	};
})();
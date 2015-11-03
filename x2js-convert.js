#!/usr/bin/env node

(function () {
	"use strict";

	let fs = require("fs");
	let convert = require("./convert");
	let program = require("commander");
	program.option("-f, --from <file>", "Source file to convert from (.json or .xml)")
		.option("-t, --to <file>", "Destination file to save the output to (.json or .xml, the opposite of from)")
		.parse(process.argv);

	if (!program.from)
		throw new Error("You must specify the source file.");

	if (!program.from.endsWith(".xml") && !program.from.endsWith(".json"))
		throw new Error("Source filename must end with with .xml or .json.");

	let direction = null;

	if (program.from.endsWith(".xml"))
		direction = convert.directions.XmlToJson;
	else
		direction = convert.directions.JsonToXml;

	if (!program.to)
		throw new Error("You must specify the destination file.");

	if (direction === convert.directions.JsonToXml && !program.to.endsWith(".xml"))
		throw new Error("If the input file extension is .json, your destination file extension must be .xml.");

	if (direction === convert.directions.XmlToJson && !program.to.endsWith(".json"))
		throw new Error("If the input file extension is .xml, your destination file extension must be .json.");

	if (!fs.existsSync(program.from))
		throw new Error("The source file does not exist.");

	if (fs.existsSync(program.to))
		throw new Error("The destination file already exists.");

	console.log("Reading input file.");

	let inputString = fs.readFileSync(program.from, { "encoding": "utf8" });

	console.log("Converting data.");

	let outputString = convert.convert(inputString, direction);

	console.log("Writing output file.");

	fs.writeFileSync(program.to, outputString);

	console.log("Done!");
})();
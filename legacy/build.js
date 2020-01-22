var pkg = require('package.json');
var FS = require('fs');
var Path = require('path');
var TypeScript = require('typescript');
var jsTokens = require("js-tokens");
var sourcePath = './src/util/types.ts';

var configFile = TypeScript.parseConfigFileTextToJson('./tsconfig.json');
console.log(JSON.stringify(configFile.config));

/*
var content = FS.readFile(sourcePath);
var res1 = TypeScript.transpileModule(content, {compilerOptions: compilerOptions, moduleName: "myModule2"});
console.log(res1.outputText);

var sourceFile = TypeScript.createSourceFile(sourcePath, FS.readFile(sourcePath), ts.ScriptTarget.ES5, true);
var mt = jsTokens.matchToToken()
*/
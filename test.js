var FS = require('fs');
var Path = require('path');
var jsTokens = require("js-tokens");
var util = require('util');
var packageFilePath = Path.resolve('./package.json');
var packageJSON = require(packageFilePath);
// var tsConfig = require('./tsconfig.json');
// var TypeScript = require('typescript');

var defaultCompilerOptions = {
    target:"es5",
    module:"commonjs",
    noImplicitAny: true,
    removeComments: false,
    preserveConstEnums: true,
    noEmitHelpers: true,
    sourceMap: false,
    declaration: false,
    outDir: "compiled",
    lib: ["es2015"]
};
function asTrimedStringArray(obj) {
    if (util.isNullOrUndefined(obj))
        return [];
    if (util.isString(obj))
        return [obj.trim()];
    if (!util.isArray(obj))
        return [];
    return obj.filter(function(a) { return !util.isNullOrUndefined(a) && util.isString(a); }).map(function(a) { return a.trim(); }).filter(function(a) { return a.length > 0; })
}
function asCompilerOptions(obj) {
    var result = {
        target: defaultCompilerOptions.target,
        module: defaultCompilerOptions.module,
        noImplicitAny: defaultCompilerOptions.noImplicitAny,
        removeComments: defaultCompilerOptions.removeComments,
        preserveConstEnums: defaultCompilerOptions.preserveConstEnums,
        noEmitHelpers: defaultCompilerOptions.noEmitHelpers,
        sourceMap: defaultCompilerOptions.sourceMap,
        declaration: defaultCompilerOptions.declaration,
        outDir: defaultCompilerOptions.outDir,
        lib: defaultCompilerOptions.lib
    };
    if (util.isNullOrUndefined(obj) || !util.isObject(obj))
        return result;
    if (util.isString(obj.target) && obj.target.trim().length > 0)
        result.target = obj.target;
    if (util.isString(obj.module) && obj.module.trim().length > 0)
        result.module = obj.module;
    if (util.isString(obj.outDir) && obj.outDir.trim().length > 0)
        result.outDir = obj.outDir;
    var lib = asTrimedStringArray(obj.lib);
    if (lib.length == 0)
        result.lib = obj.lib;
    if (util.isBoolean(obj.noImplicitAny))
        result.noImplicitAny = obj.noImplicitAny;
    if (util.isBoolean(obj.removeComments))
        result.removeComments = obj.removeComments;
    if (util.isBoolean(obj.preserveConstEnums))
        result.preserveConstEnums = obj.preserveConstEnums;
    if (util.isBoolean(obj.noEmitHelpers))
        result.noEmitHelpers = obj.noEmitHelpers;
    if (util.isBoolean(obj.sourceMap))
        result.sourceMap = obj.sourceMap;
    if (util.isBoolean(obj.declaration))
        result.declaration = obj.declaration;
    return result;
}
function asTsConfig(obj) {
    if (util.isNullOrUndefined(obj))
        return { compilerOptions: asCompilerOptions(), files: [] };
    if (util.isString(obj))
        return (obj.trim().length == 0) ? asTsConfig() : asTsConfig(require(Path.resolve(obj.trim())));
    return { compilerOptions: asCompilerOptions(obj.compilerOptions), files: asTrimedStringArray(obj.files).map(function(f) { return Path.resolve(f); }) };
}
function asSourceConfig(obj, tsconfig) {
    if (util.isNullOrUndefined(obj))
        return null;
    if (util.isString(obj))
        return asSourceConfig({ files: [obj] }, tsconfig);
    if (util.isArray(obj))
        return asSourceConfig({ files: obj }, tsconfig);
    if (!util.isObject(obj))
        return null;
    
    var result = { name: "", output: "", files: asTrimedStringArray(obj.files) };
    if (!util.isNullOrUndefined(obj.name) && util.isString(obj.name))
        result.name = obj.name.trim();
    if (!util.isNullOrUndefined(obj.output) && util.isString(obj.output))
        result.name = obj.output.trim();
    if (result.name.length == 0) {
        if (result.output.length == 0) {
            if (result.files.length == 0)
                return null;
            result.output = Path.resolve('ported');
            result.name = Path.parse(result.files[0]).name;
        } else {
            result.output = Path.resolve(result.output);
            result.name = Path.parse(result.output).name;
        }
    } else 
        result.output = Path.resolve((result.output.length == 0) ? 'ported': result.output);
    return result;
}
function asConfigGroup(obj) {
    if (util.isNullOrUndefined(obj) || !util.isObject(obj))
        return asConfigGroup({ tsconfig: asTsConfig(obj) });
    var tsconfig = asTsConfig(obj.tsconfig);
    var result = { tsconfig: tsconfig, source: ((util.isNullOrUndefined(obj.source) || !util.isArray(obj.source)) ? [asSourceConfig(obj.source, tsconfig)] : obj.source.map(function(o) { return asSourceConfig(o, tsconfig); })).filter(function(o) { return !util.isNullOrUndefined(o); }) };
    if (result.source.length == 0 && !util.isNullOrUndefined(tsconfig.compilerOptions) && !util.isNullOrUndefined(tsConfig.compilerOptions.outDir) && util.isString(tsConfig.compilerOptions.outDir)) {
        var tsFiles = asTrimedStringArray(tsConfig.files).map(function(f) { return toPathSegments(Path.resolve(f)); });
        while (!util.isNull(tsFiles.reduce(function(p, c) {
            if (c.length > 1 && util.isString(p) && p == c[0])
                return p;
            return null;
        }, tsFiles[0][0])))
            tsFiles.forEach(function(a) { a.shift(); });
        var source = asSourceConfig(tsFiles.map(function(a) {
            a.unshift(tsConfig.compilerOptions.outDir);
            var p = Path.parse(Path.resolve.apply(undefined, a));
            return Path.resolve(p.dir, p.name + ".js");
        }).filter(function(f) { return FS.existsSync(f); }));
        if (!util.isNullOrUndefined(source))
            result.source = [source];
    }
}
function toPathSegments(path) {
    var result = [];
    var parsed = Path.parse(path);
    while (parsed.dir != parsed.root) {
        result.unshift(parsed.base);
        parsed = Path.parse(parsed.dir);
    }
    result.unshift(parsed.root, parsed.base);
    return result;
}
function getServiceNowPublishConfig(config) {
    if (util.isNullOrUndefined(config)) {
        if (util.isNullOrUndefined(packageJSON))
            throw "package.json file was not loaded from " + packageFilePath;
        if (util.isNullOrUndefined(packageJSON.serviceNowPublish))
            throw '"serviceNowPublish" configuration was not found in package.json file at ' + packageFilePath;
        if (util.isNullOrUndefined(packageJSON.serviceNowPublish.server)) {
            if (util.isNullOrUndefined(packageJSON.serviceNowPublish.client))
                throw 'Neither "server" nor "client" properties were found under "serviceNowPublish" configuration in package.json file at ' + packageFilePath;
            return { client: getServiceNowPublishConfig(packageJSON.serviceNowPublish.client) };
        }
        if (util.isNullOrUndefined(packageJSON.serviceNowPublish.client))
            return { server: getServiceNowPublishConfig(packageJSON.serviceNowPublish.server) };
        return { server: getServiceNowPublishConfig(packageJSON.serviceNowPublish.server), client: getServiceNowPublishConfig(packageJSON.serviceNowPublish.client) };
    }
    var path = '';
    if (util.isString(config.tsconfig))
        path = config.tsconfig.trim();
    path = Path.resolve((path.length == 0) ? './tsconfig.json' : path);
    var tsConfig = (FS.existsSync(path)) ? require(path) : { "compilerOptions": { "target":"es5", "module":"commonjs", "noImplicitAny": true, "removeComments": false,
        "preserveConstEnums": true, "noEmitHelpers": true, "sourceMap": false, "declaration": false, "outDir": "compiled", "lib": [ "es2015" ] } };
    var source = [];
    if (!util.isNullOrUndefined(config.source)) {
        if (util.isString(config.source))
            source = [{ files: [config.source] }];
        else if (util.isArray)
            source = config.source;
    }
    source = source.filter(function(s) { return !util.isNullOrUndefined(s); }).map(function(s) { return (util.isString(s)) ? { files: [s] } : s; })
        .filter(function(s) { return { name: (util.isNullOrUndefined(s.name) || !util.isString(s.name)) ? "" : s.name.trim(), output: (util.isNullOrUndefined(s.output) || !util.isString(s.output)) ? "" : s.output.trim(),
            files: asTrimedStringArray(s.files).map(function(f) { return Path.resolve(f); }) }; });
    
    if (source.files.length == 0 && !util.isNullOrUndefined(tsconfig.compilerOptions) && !util.isNullOrUndefined(tsConfig.compilerOptions.outDir) && util.isString(tsConfig.compilerOptions.outDir)) {
        var tsFiles = asTrimedStringArray(tsConfig.files).map(function(f) { return toPathSegments(Path.resolve(f)); });
        while (!util.isNull(tsFiles.reduce(function(p, c) {
            if (c.length > 1 && util.isString(p) && p == c[0])
                return p;
            return null;
        }, tsFiles[0][0])))
            tsFiles.forEach(function(a) { a.shift(); });
        source.files = tsFiles.map(function(a) {
            a.unshift(tsConfig.compilerOptions.outDir);
            var p = Path.parse(Path.resolve.apply(undefined, a));
            return Path.resolve(p.dir, p.name + ".js");
        }).filter(function(f) { return FS.existsSync(f); });
    }
    if (source.name.length == 0) {
        if (source.output.length == 0) {
            if (source.files.length == 0)
                throw "Source configuration contains neither a name, output or file";
            source.name = Path.basename(source.files[0]);
        } else
            source.name = Path.basename(source.output);
    }
    if (source.output.length == 0)
        source.output = Path.resolve('./ported', source.name + ".js");
    else
        source.output = Path.resolve(source.output);
    
    return { tsconfig: tsconfig, source: source };
}
serviceNowPublishConfig = getServiceNowPublishConfig();
if ((util.isNullOrUndefined(serviceNowPublishConfig.server) || serviceNowPublishConfig.server.source.files.length == 0) &&
        (util.isNullOrUndefined(serviceNowPublishConfig.server) || serviceNowPublishConfig.server.source.files.length == 0))
    throw new Error("No files to process");

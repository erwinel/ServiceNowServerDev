/// <reference path="base.d.ts" />
declare class GlideJSUtil {
    static isInstanceOf(object: any, typeName: string): boolean;
    static isJavaArray(object: any): boolean;
    static getJavaClassName(object: any): string;
}
declare class JSUtil {
    static isJavaObject(object: any): boolean;
}
declare class GlideRhinoHelper {
    static getNativeFromRhino(object: any): any;
}
declare class GlideElementEncrypted {
}
declare class GlideActionList {
}
declare class GlideElementReplicationPayload {
}
declare class GlideList {
}
declare class ScheduleDateTime {
}
declare class GlideSysList {
}
declare class GlideChoiceList {
}
declare class GlideXMLDocument {
}
declare class GlideElementAudio {
}
declare class GlideElementVariable {
}
declare class GlideURI {
}
declare class GlideActionURL {
}
declare class GlideElementFileAttachment {
}
declare class GlideChoice {
}
declare class GlideElementPhoneNumber {
}
declare class GlideElementRelatedTags {
}
declare class GlideElementDataStructure {
}
declare class GlideElementDataArray {
}
declare function getInheritance(element: GlideElement): string[];
interface IElementOnly {
    source: any;
}
interface IElementAndInherits {
    'object': any;
    inherits: string[];
}
declare type ElementObjectResult = IElementOnly | IElementAndInherits;
interface IElementWithValueOnly {
    source: ElementObjectResult;
    value: ElementObjectResult;
}
interface IElementWithGlideOnly {
    source: ElementObjectResult;
    glide: ElementObjectResult;
}
declare type ElementWithGlideAndValue = IElementWithGlideOnly & IElementWithValueOnly;
declare type ElementWithGlideOrValue = (IElementWithGlideOnly & Partial<IElementWithValueOnly>) | (IElementWithValueOnly & Partial<IElementWithGlideOnly>) | ElementWithGlideAndValue;
declare type ElementResult = ElementWithGlideOrValue | ElementObjectResult;
declare function isElementOnly(obj: ElementResult): obj is IElementOnly;
declare function isElementAndInherits(obj: ElementResult): obj is IElementAndInherits;
declare function isElementWithValue(obj: ElementResult): obj is IElementWithValueOnly | ElementWithGlideAndValue;
declare function isElementWithGlide(obj: ElementResult): obj is IElementWithGlideOnly | ElementWithGlideAndValue;
declare function isElementWithGlideOrValue(obj: ElementResult): obj is ElementWithGlideOrValue;
declare function getElementResult(element: any): ElementResult;
declare function toInfoExport(source: ElementResult): any;
declare function getInfo(colName: string, isArray: boolean, array_denormalized: boolean): any;

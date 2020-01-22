/// <reference path="../ServiceNowTypings/ServerScoped/base.d.ts" />

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

declare class GlideElementEncrypted { }
declare class GlideActionList { }
declare class GlideElementReplicationPayload { }
declare class GlideList { }
declare class ScheduleDateTime { }
declare class GlideSysList { }
declare class GlideChoiceList { }
declare class GlideXMLDocument { }
declare class GlideElementAudio { }
declare class GlideElementVariable { }
declare class GlideURI { }
declare class GlideActionURL { }
declare class GlideElementFileAttachment { }
declare class GlideChoice { }
declare class GlideElementPhoneNumber { }
declare class GlideElementRelatedTags { }
declare class GlideElementDataStructure { }
declare class GlideElementDataArray { }

function getInheritance(element: GlideElement): string[] {
    try {
        if (typeof element !== 'object')
            return [typeof element];
        if (element === null)
            return ['null'];
    } catch (e) { }
    var inherits: string[] = [];
    if (GlideJSUtil.isInstanceOf(element, 'com.snc.pa.dc.GlideElementBreakdownElement')) inherits.push('com.snc.pa.dc.GlideElementBreakdownElement');
    if (GlideJSUtil.isInstanceOf(element, 'com.glide.vars.GlideElementGlideVar')) inherits.push('com.glide.vars.GlideElementGlideVar');
    if (GlideJSUtil.isInstanceOf(element, 'com.snc.apps.glide_elements.GlideElementSourceName')) inherits.push('com.snc.apps.glide_elements.GlideElementSourceName');
    if (GlideJSUtil.isInstanceOf(element, 'com.glide.vars.HierarchicalVariables')) inherits.push('com.glide.vars.HierarchicalVariables');
    if (GlideJSUtil.isInstanceOf(element, 'com.glide.vars.GlideElementHierarchicalVariables')) inherits.push('com.glide.vars.GlideElementHierarchicalVariables');
    if (GlideJSUtil.isInstanceOf(element, 'com.snc.apps.glide_elements.GlideElementSourceTable')) inherits.push('com.snc.apps.glide_elements.GlideElementSourceTable');
    if (GlideJSUtil.isInstanceOf(element, 'com.glide.script.glide_elements.GlideElementInternalType')) inherits.push('com.glide.script.glide_elements.GlideElementInternalType');
    if (GlideJSUtil.isInstanceOf(element, 'com.glide.glideobject.GlideDuration')) inherits.push('com.glide.glideobject.GlideDuration');
    if (GlideJSUtil.isInstanceOf(element, 'com.snc.datastructure.GlideElementDataObject')) inherits.push('com.snc.datastructure.GlideElementDataObject');
    if (GlideJSUtil.isInstanceOf(element, 'com.glide.glideobject.SysClassName')) inherits.push('com.glide.glideobject.SysClassName');
    if (GlideJSUtil.isInstanceOf(element, 'com.glide.script.glide_elements.GlideElementPhoneNumber')) inherits.push('com.glide.script.glide_elements.GlideElementPhoneNumber');
    if (GlideJSUtil.isInstanceOf(element, 'com.snc.apps.glide_elements.GlideElementSourceId')) inherits.push('com.snc.apps.glide_elements.GlideElementSourceId');
    if (GlideJSUtil.isInstanceOf(element, 'com.snc.datastructure.GlideElementDataStructure')) inherits.push('com.snc.datastructure.GlideElementDataStructure');
    if (GlideJSUtil.isInstanceOf(element, 'com.glide.script.glide_elements.GlideElementDomainId')) inherits.push('com.glide.script.glide_elements.GlideElementDomainId');
    if (GlideJSUtil.isInstanceOf(element, 'com.glide.script.glide_elements.GlideElementDocumentId')) inherits.push('com.glide.script.glide_elements.GlideElementDocumentId');
    if (GlideJSUtil.isInstanceOf(element, 'com.glide.script.glide_elements.GlideElementSourceTable')) inherits.push('com.glide.script.glide_elements.GlideElementSourceTable');
    if (GlideJSUtil.isInstanceOf(element, 'com.snc.datastructure.GlideElementDataArray')) inherits.push('com.snc.datastructure.GlideElementDataArray');
    if (GlideJSUtil.isInstanceOf(element, 'com.glide.wiki.GlideElementWikiText')) inherits.push('com.glide.wiki.GlideElementWikiText');

    try {
        if (element instanceof GlideElementNameValue) inherits.push('GlideElementNameValue');
        if (element instanceof GlideElementGlideVar) inherits.push('GlideElementGlideVar');
        if (element instanceof GlideElementVariableConditions) inherits.push('GlideElementVariableConditions');
        if (element instanceof GlideElementGlideObject) inherits.push('GlideElementGlideObject');
        if (element instanceof GlideElementCounter) inherits.push('GlideElementCounter');
        if (element instanceof GlideElementPrice) inherits.push('GlideElementPrice');
        if (element instanceof GlideElementCurrency) inherits.push('GlideElementCurrency');
        if (element instanceof GlideElementTranslatedField) inherits.push('GlideElementTranslatedField');
        if (element instanceof GlideElementConditions) inherits.push('GlideElementConditions');
        if (element instanceof GlideElementSourceName) inherits.push('GlideElementSourceName');
        if (element instanceof GlideElementScript) inherits.push('GlideElementScript');
        if (element instanceof GlideElementTranslatedHTML) inherits.push('GlideElementTranslatedHTML');
        if (element instanceof GlideElementEncrypted) inherits.push('GlideElementEncrypted');
        if (element instanceof GlideElementURL) inherits.push('GlideElementURL');
        if (element instanceof GlideElementPassword2) inherits.push('GlideElementPassword2');
        if (element instanceof GlideElementWorkflowConditions) inherits.push('GlideElementWorkflowConditions');
        if (element instanceof GlideElementShortTableName) inherits.push('GlideElementShortTableName');
        if (element instanceof GlideElementVariables) inherits.push('GlideElementVariables');
        if (element instanceof GlideActionList) inherits.push('GlideActionList');
        if (element instanceof GlideElementReference) inherits.push('GlideElementReference');
        if (element instanceof GlideElementDocumentation) inherits.push('GlideElementDocumentation');
        if (element instanceof GlideElementUserImage) inherits.push('GlideElementUserImage');
        if (element instanceof GlideElementReplicationPayload) inherits.push('GlideElementReplicationPayload');
        if (element instanceof GlideElementAudio) inherits.push('GlideElementAudio');
        if (element instanceof GlideElementNumeric) inherits.push('GlideElementNumeric');
        if (element instanceof GlideElementTranslatedText) inherits.push('GlideElementTranslatedText');
        if (element instanceof GlideElementCompressed) inherits.push('GlideElementCompressed');
        if (element instanceof GlideElementBoolean) inherits.push('GlideElementBoolean');
        if (element instanceof GlideElementPassword) inherits.push('GlideElementPassword');
        if (element instanceof GlideElementIcon) inherits.push('GlideElementIcon');
        if (element instanceof GlideElementShortFieldName) inherits.push('GlideElementShortFieldName');
        if (element instanceof GlideList) inherits.push('GlideList');
        if (element instanceof ScheduleDateTime) inherits.push('ScheduleDateTime');
        if (element instanceof GlideElementBreakdownElement) inherits.push('GlideElementBreakdownElement');
        if (element instanceof GlideElementFullUTF8) inherits.push('GlideElementFullUTF8');
        if (element instanceof GlideElementWorkflow) inherits.push('GlideElementWorkflow');
        if (element instanceof GlideSysList) inherits.push('GlideSysList');
        if (element instanceof GlideChoiceList) inherits.push('GlideChoiceList');
        if (element instanceof GlideXMLDocument) inherits.push('GlideXMLDocument');
        if (element instanceof GlideElementSourceTable) inherits.push('GlideElementSourceTable');
        if (element instanceof GlideElementVariable) inherits.push('GlideElementVariable');
        if (element instanceof GlideElementWikiText) inherits.push('GlideElementWikiText');
        if (element instanceof GlideURI) inherits.push('GlideURI');
        if (element instanceof GlideElementSysClassName) inherits.push('GlideElementSysClassName');
        if (element instanceof GlideActionURL) inherits.push('GlideActionURL');
        if (element instanceof GlideElementDocumentId) inherits.push('GlideElementDocumentId');
        if (element instanceof GlideElementFileAttachment) inherits.push('GlideElementFileAttachment');
        if (element instanceof GlideDateTime) inherits.push('GlideDateTime');
        if (element instanceof GlideDate) inherits.push('GlideDate');
        if (element instanceof GlideElementSourceId) inherits.push('GlideElementSourceId');
        if (element instanceof GlideChoice) inherits.push('GlideChoice');
        if (element instanceof GlideElementDataObject) inherits.push('GlideElementDataObject');
        if (element instanceof GlideTime) inherits.push('GlideTime');
        if (element instanceof GlideElementPhoneNumber) inherits.push('GlideElementPhoneNumber');
        if (element instanceof GlideElementDomainId) inherits.push('GlideElementDomainId');
        if (element instanceof GlideElementRelatedTags) inherits.push('GlideElementRelatedTags');
        if (element instanceof GlideElementInternalType) inherits.push('GlideElementInternalType');
        if (element instanceof GlideUser) inherits.push('GlideUser');
        if (element instanceof GlideElementDataStructure) inherits.push('GlideElementDataStructure');
        if (element instanceof GlideDuration) inherits.push('GlideDuration');
        if (element instanceof GlideElementDataArray) inherits.push('GlideElementDataArray');
        if (element instanceof GlideElement) inherits.push('GlideElement');
    } catch (e) {

    }
    if (GlideJSUtil.isInstanceOf(element, 'IntegerTime')) inherits.push('IntegerTime');
    if (GlideJSUtil.isInstanceOf(element, 'GlideElementHierarchicalVariables')) inherits.push('GlideElementHierarchicalVariables');
    if (GlideJSUtil.isInstanceOf(element, 'MaskCode')) inherits.push('MaskCode');
    if (GlideJSUtil.isInstanceOf(element, 'Translated')) inherits.push('Translated');
    if (GlideJSUtil.isInstanceOf(element, 'GlideUserInput')) inherits.push('GlideUserInput');
    if (GlideJSUtil.isInstanceOf(element, 'GlideDueDate')) inherits.push('GlideDueDate');
    if (GlideJSUtil.isInstanceOf(element, 'Journal')) inherits.push('Journal');
    if (GlideJSUtil.isInstanceOf(element, 'WeekOfMonth')) inherits.push('WeekOfMonth');
    if (GlideJSUtil.isInstanceOf(element, 'GlideHTML')) inherits.push('GlideHTML');
    if (GlideJSUtil.isInstanceOf(element, 'GlidePreciseTime')) inherits.push('GlidePreciseTime');
    if (GlideJSUtil.isInstanceOf(element, 'MonthOfYear')) inherits.push('MonthOfYear');
    if (GlideJSUtil.isInstanceOf(element, 'DayOfWeek')) inherits.push('DayOfWeek');
    if (GlideJSUtil.isInstanceOf(element, 'StringBoolean')) inherits.push('StringBoolean');
    if (GlideJSUtil.isInstanceOf(element, 'IntegerDate')) inherits.push('IntegerDate');

    if (GlideJSUtil.isInstanceOf(element, 'java.time.YearMonth')) inherits.push('java.time.YearMonth');
    if (GlideJSUtil.isInstanceOf(element, 'java.time.ZoneId')) inherits.push('java.time.ZoneId');
    if (GlideJSUtil.isInstanceOf(element, 'java.time.Duration')) inherits.push('java.time.Duration');
    if (GlideJSUtil.isInstanceOf(element, 'java.time.LocalDate')) inherits.push('java.time.LocalDate');
    if (GlideJSUtil.isInstanceOf(element, 'java.time.LocalDateTime')) inherits.push('java.time.LocalDateTime');
    if (GlideJSUtil.isInstanceOf(element, 'java.time.ZonedDateTime')) inherits.push('java.time.ZonedDateTime');
    if (GlideJSUtil.isInstanceOf(element, 'java.time.Year')) inherits.push('java.time.Year');
    if (GlideJSUtil.isInstanceOf(element, 'java.time.LocalTime')) inherits.push('java.time.LocalTime');
    if (GlideJSUtil.isInstanceOf(element, 'java.time.MonthDay')) inherits.push('java.time.MonthDay');
    if (GlideJSUtil.isInstanceOf(element, 'java.lang.StringBuilder')) inherits.push('java.lang.StringBuilder');
    try {
        if (element instanceof Packages.java.lang.StringBuffer) inherits.push('java.lang.StringBuffer');
        if (element instanceof Packages.java.util.Map) inherits.push('java.util.Map');
        if (element instanceof Packages.java.util.List) inherits.push('java.util.List');
        if (element instanceof Packages.java.util.Set) inherits.push('java.util.Set');
        if (element instanceof Packages.java.util.TimeZone) inherits.push('java.util.TimeZone');
        if (element instanceof Packages.java.lang.String) inherits.push('java.lang.String');
        if (element instanceof Packages.java.lang.Integer) inherits.push('java.lang.Integer');
        if (element instanceof Packages.java.lang.Long) inherits.push('java.lang.Long');
        if (element instanceof Packages.java.lang.Byte) inherits.push('java.lang.Byte');
        if (element instanceof Packages.java.lang.Float) inherits.push('java.lang.Float');
        if (element instanceof Packages.java.lang.Short) inherits.push('java.lang.Short');
        if (element instanceof Packages.java.lang.Double) inherits.push('java.lang.Double');
        if (element instanceof Packages.java.lang.Character) inherits.push('java.lang.Character');
    } catch (e) {
        if (GlideJSUtil.isInstanceOf(element, 'java.lang.StringBuffer')) inherits.push('java.lang.StringBuffer');
        if (GlideJSUtil.isInstanceOf(element, 'java.util.Map')) inherits.push('java.util.Map');
        if (GlideJSUtil.isInstanceOf(element, 'java.util.List')) inherits.push('java.util.List');
        if (GlideJSUtil.isInstanceOf(element, 'java.util.Set')) inherits.push('java.util.Set');
        if (GlideJSUtil.isInstanceOf(element, 'java.util.TimeZone')) inherits.push('java.util.TimeZone');
        if (GlideJSUtil.isInstanceOf(element, 'java.lang.String')) inherits.push('java.lang.String');
        if (GlideJSUtil.isInstanceOf(element, 'java.lang.Integer')) inherits.push('java.lang.Integer');
        if (GlideJSUtil.isInstanceOf(element, 'java.lang.Long')) inherits.push('java.lang.Long');
        if (GlideJSUtil.isInstanceOf(element, 'java.lang.Byte')) inherits.push('java.lang.Byte');
        if (GlideJSUtil.isInstanceOf(element, 'java.lang.Float')) inherits.push('java.lang.Float');
        if (GlideJSUtil.isInstanceOf(element, 'java.lang.Short')) inherits.push('java.lang.Short');
        if (GlideJSUtil.isInstanceOf(element, 'java.lang.Double')) inherits.push('java.lang.Double');
        if (GlideJSUtil.isInstanceOf(element, 'java.lang.Character')) inherits.push('java.lang.Character');
    }
    if (GlideJSUtil.isInstanceOf(element, 'java.lang.Number')) inherits.push('java.lang.Number');
    try {
        if (element instanceof Packages.java.lang.Boolean) inherits.push('java.lang.Boolean');
        if (element instanceof Packages.java.lang.Object) inherits.push('java.lang.Object');
    } catch (e) {
        if (GlideJSUtil.isInstanceOf(element, 'java.lang.Double')) inherits.push('java.lang.Boolean');
        if (GlideJSUtil.isInstanceOf(element, 'java.lang.Character')) inherits.push('java.lang.Object');
    }
    try {
        if (element instanceof Date) inherits.push('Date');
        if (element instanceof Boolean) inherits.push('Boolean');
        if (element instanceof String) inherits.push('String');
        if (element instanceof Number) inherits.push('Number');
    } catch (e) {
    }

    if (GlideJSUtil.isJavaArray(element)) { inherits.push('[]'); }
    var c = '' + GlideJSUtil.getJavaClassName(element);
    if (c.trim().length > 0) {
        var found = false;
        for (var x = 0; x < inherits.length; x++) {
            if (inherits[x] == c) {
                found = true;
                break;
            }
        }
        if (!found)
            inherits.push('java class: ' + c);
    }

    return inherits;
}

interface IElementOnly { source: any; }
interface IElementAndInherits { 'object': any; inherits: string[]; }
type ElementObjectResult = IElementOnly | IElementAndInherits;
interface IElementWithValueOnly {
    source: ElementObjectResult,
    value: ElementObjectResult,
}
interface IElementWithGlideOnly {
    source: ElementObjectResult,
    glide: ElementObjectResult,
}
type ElementWithGlideAndValue = IElementWithGlideOnly & IElementWithValueOnly;
type ElementWithGlideOrValue = (IElementWithGlideOnly & Partial<IElementWithValueOnly>) | (IElementWithValueOnly & Partial<IElementWithGlideOnly>) | ElementWithGlideAndValue;
type ElementResult = ElementWithGlideOrValue | ElementObjectResult;

function isElementOnly(obj: ElementResult): obj is IElementOnly {
    return typeof (<IElementAndInherits>obj).inherits === 'undefined' && typeof (<ElementWithGlideOrValue>obj).value === 'undefined' && typeof (<ElementWithGlideOrValue>obj).glide === 'undefined';
}

function isElementAndInherits(obj: ElementResult): obj is IElementAndInherits {
    return typeof (<IElementAndInherits>obj).inherits !== 'undefined';
}

function isElementWithValue(obj: ElementResult): obj is IElementWithValueOnly | ElementWithGlideAndValue {
    return typeof (<IElementWithValueOnly>obj).value !== 'undefined';
}

function isElementWithGlide(obj: ElementResult): obj is IElementWithGlideOnly | ElementWithGlideAndValue {
    return typeof (<IElementWithGlideOnly>obj).glide !== 'undefined';
}

function isElementWithGlideOrValue(obj: ElementResult): obj is ElementWithGlideOrValue {
    return typeof (<ElementWithGlideOrValue>obj).glide !== 'undefined' || typeof (<ElementWithGlideOrValue>obj).value !== 'undefined';
}

function getElementResult(element: any): ElementResult {
    var result: ElementResult;
    try { result = <IElementAndInherits>{ 'object': element, inherits: getInheritance(element) }; }
    catch (e) { result = <IElementOnly>{ source: element }; }
    var glideObj;
    var nObj: ElementObjectResult;
    try {
        if ((<{ getGlideObject?: Function }><any>element).getGlideObject) {
            glideObj = (<{ getGlideObject: Function }><any>element).getGlideObject();
            try { nObj = <IElementAndInherits>{ 'object': glideObj, inherits: getInheritance(glideObj) }; }
            catch (e) { nObj = <IElementOnly>{ source: glideObj }; }
            result = <IElementWithGlideOnly>{
                glide: nObj,
                source: result
            };
        }
    } catch (e) { }
    try {
        if ((<{ getValue?: Function }><any>element).getValue) {
            glideObj = (<{ getValue: Function }><any>element).getValue();
            try { nObj = <IElementAndInherits>{ 'object': glideObj, inherits: getInheritance(glideObj) }; }
            catch (e) { nObj = <IElementOnly>{ source: glideObj }; }
            if (isElementWithGlide(result))
                (<ElementWithGlideOrValue>result).value = nObj;
            else
                return <IElementWithValueOnly>{
                    value: nObj,
                    source: result
                };
        }
    } catch (e) { }
    return result;
}

function toInfoExport(source: ElementResult): any {
    if (isElementWithGlide(source)) {
        if (isElementWithValue(source))
            return {
                source: toInfoExport(source.source),
                glide: toInfoExport(source.glide),
                value: toInfoExport(source.value)
            };
        return {
            source: toInfoExport(source.source),
            glide: toInfoExport(source.glide)
        };
    }
    if (isElementWithValue(source))
        return {
            source: toInfoExport(source.source),
            value: toInfoExport(source.value)
        };
    return (isElementAndInherits(source)) ? source : source.source;
}

function getInfo(colName: string, isArray: boolean, array_denormalized: boolean): any {
    var dictGr: sys_dictionaryGlideRecord = <sys_dictionaryGlideRecord>new GlideRecord("sys_dictionary");
    dictGr.addQuery('internal_type', colName);
    dictGr.addQuery('array', isArray);
    dictGr.addQuery('array_denormalized', array_denormalized);
    dictGr.query();
    var hasElement: boolean = false;
    var element: GlideElement;
    while (dictGr.next()) {
        try {
            var gr: GlideRecord = new GlideRecord((<{ getValue(): string; }><any>dictGr.name).getValue());
            gr.addNotNullQuery((<{ getValue(): string; }><any>dictGr.element).getValue());
            gr.query();
            if (gr.next()) {
                element = gr.getElement((<{ getValue(): string; }><any>dictGr.element).getValue());
                if (!gs.nil(element))
                    break;
                hasElement = true;
            }
            if (!hasElement) {
                gr = new GlideRecord((<{ getValue(): string; }><any>dictGr.name).getValue());
                gr.query();
                if (gr.next()) {
                    element = gr.getElement((<{ getValue(): string; }><any>dictGr.element).getValue());
                    hasElement = true;
                }
            }
        } catch (e) { }
    }
    if (hasElement) {
        var nObj = (JSUtil.isJavaObject(element)) ? GlideRhinoHelper.getNativeFromRhino(element) : element;
        if (typeof nObj !== 'undefined') {
            if (JSUtil.isJavaObject(element))
                return {
                    source: toInfoExport(getElementResult(element)),
                    'native': toInfoExport(getElementResult(nObj))
                }
            return toInfoExport(getElementResult(element));
        }
    }
}
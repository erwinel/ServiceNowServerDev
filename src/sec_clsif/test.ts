var types = new x_44813_util.types();
let cu = new x_44813_sec_clsif.ClassificationUtil();
let allClassifications = cu.getAllClassifications();
let expectedClassifications = [
    { pm: 'U', name: 'UNCLASSIFIED' },
    { pm: 'C', name: 'CONFIDENTIAL' },
    { pm: 'R', name: 'RESTRICTED' },
    { pm: 'S', name: 'SECRET' },
    { pm: 'TS', name: 'TOP SECRET' }
];
if (allClassifications.length < expectedClassifications.length) {
    gs.error("x_44813_sec_clsif.ClassificationUtil.getAllClassifications() failed: Only {0} of expected minimum  {1} results returned.",
        allClassifications.length, expectedClassifications.length);
} else if (expectedClassifications.filter(function(c) {
        let arr = allClassifications.filter(function(a) { return a.portion_marking == c.pm; });
        if (arr.length != 1)
            gs.error("x_44813_sec_clsif.ClassificationUtil.getAllClassifications() failed: Expected 1 item matching {0}; Actual: {1}.", types.serializeToString(c.pm), arr.length);
        else if (arr[0].name != c.name)
            gs.error("x_44813_sec_clsif.ClassificationUtil.getAllClassifications() failed: Expected name for Portion Marking {0}: {1}; Actual: {2}.", types.serializeToString(c.pm),
                types.serializeToString(c.name), types.serializeToString(arr[0].name));
        else
            return false;
        return true;
    }).length == 0)
        gs.info("x_44813_sec_clsif.ClassificationUtil.getAllClassifications() passed.");

let actual = cu.getDefaultPortionMarking();
if (actual === expectedClassifications[0].pm)
    gs.info("cu.getDefaultPortionMarking() passed.");
else
    gs.error("cu.getDefaultPortionMarking() failed: Expected: {0}; Actual: {1}.", types.serializeToString(expectedClassifications[0].pm), actual);
let cv = new x_44813_sec_clsif.ClassificationValidator();
if (cv.isValid !== false)
    gs.error("new x_44813_sec_clsif.ClassificationValidator().isValid failed. Expected: false; Actual: {0}", types.serializeToString(cv.isValid));
else 
    gs.info("new x_44813_sec_clsif.ClassificationValidator().isValid passed.");
if (cv.errorMessages.length != 2)
    gs.error("new x_44813_sec_clsif.ClassificationValidator().errorMessages.length failed. Expected: 2; Actual: {0}", cv.errorMessages.length);
else {
    let expectedStr: string = "Classification Name cannot be empty.";
    if (cv.errorMessages[0] !== expectedStr)
        gs.error("new x_44813_sec_clsif.ClassificationValidator().errorMessages[0] failed. Expected: {0}; Actual: {1}", types.serializeToString(expectedStr),
            types.serializeToString(cv.errorMessages[0]));
    else 
        gs.info("update x_44813_sec_clsif.ClassificationValidator().errorMessages[0] passed.");
    expectedStr = "Portion Marking cannot be empty.";
    if (cv.errorMessages[1] !== expectedStr)
        gs.error("new x_44813_sec_clsif.ClassificationValidator().errorMessages[1] failed. Expected: {0}; Actual: {1}", types.serializeToString(expectedStr),
            types.serializeToString(cv.errorMessages[1]));
    else 
        gs.info("update x_44813_sec_clsif.ClassificationValidator().errorMessages[0] passed.");
}
cv.portionMarking.sourceValue = " U ";
cv.name.sourceValue = " UNCLASSIFIED";
if (cv.isValid !== true)
    gs.error("update x_44813_sec_clsif.ClassificationValidator().isValid failed. Expected: true; Actual: {0}", types.serializeToString(cv.isValid));
else 
    gs.info("update x_44813_sec_clsif.ClassificationValidator().isValid passed.");
if (cv.portionMarking.sourceValue !== " U ")
    gs.error("update x_44813_sec_clsif.ClassificationValidator().portionMarking.sourceValue. Expected: {0}; Actual: {1}", types.serializeToString(" U "),
        types.serializeToString(cv.portionMarking.sourceValue));
else 
    gs.info("update x_44813_sec_clsif.ClassificationValidator().portionMarking.sourceValue passed.");
if (cv.name.sourceValue !== " UNCLASSIFIED")
    gs.error("update x_44813_sec_clsif.ClassificationValidator().name.sourceValue. Expected: {0}; Actual: {1}", types.serializeToString(" UNCLASSIFIED"),
        types.serializeToString(cv.name.sourceValue));
else 
    gs.info("update x_44813_sec_clsif.ClassificationValidator().name.sourceValue passed.");
if (cv.portionMarking.normalizedValue !== "U")
    gs.error("update x_44813_sec_clsif.ClassificationValidator().portionMarking.normalizedValue. Expected: {0}; Actual: {1}", types.serializeToString("U"),
        types.serializeToString(cv.portionMarking.normalizedValue));
else 
    gs.info("update x_44813_sec_clsif.ClassificationValidator().portionMarking.normalizedValue passed.");
if (cv.name.normalizedValue !== "UNCLASSIFIED")
    gs.error("update x_44813_sec_clsif.ClassificationValidator().name.normalizedValue. Expected: {0}; Actual: {1}", types.serializeToString("UNCLASSIFIED"),
        types.serializeToString(cv.name.normalizedValue));
else 
    gs.info("update x_44813_sec_clsif.ClassificationValidator().name.normalizedValue passed.");
if (cv.errorMessages.length != 0)
    gs.error("update x_44813_sec_clsif.ClassificationValidator().errorMessages.length failed. Expected: 0; Actual: {0}", cv.errorMessages.length);
else 
    gs.info("update x_44813_sec_clsif.ClassificationValidator().errorMessages.length passed.");
if (cv.infoMessages.length != 2)
    gs.error("update x_44813_sec_clsif.ClassificationValidator().infoMessages.length failed. Expected: 2; Actual: {0}", cv.infoMessages.length);
else {
    let expectedStr: string = "Portion Marking has been normalized.";
    if (cv.infoMessages[0] !== expectedStr)
        gs.error("update x_44813_sec_clsif.ClassificationValidator().infoMessages[0] failed. Expected: {0}; Actual: {1}", types.serializeToString(expectedStr),
            types.serializeToString(cv.infoMessages[0]));
    else 
        gs.info("update x_44813_sec_clsif.ClassificationValidator().infoMessages[0] passed.");
    expectedStr = "Classification Name has been normalized.";
    if (cv.infoMessages[1] !== expectedStr)
        gs.error("update x_44813_sec_clsif.ClassificationValidator().infoMessages[1] failed. Expected: {0}; Actual: {1}", types.serializeToString(expectedStr),
            types.serializeToString(cv.infoMessages[1]));
    else 
        gs.info("update x_44813_sec_clsif.ClassificationValidator().infoMessages[0] passed.");
}
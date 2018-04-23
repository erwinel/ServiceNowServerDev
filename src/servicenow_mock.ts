declare interface GlideSystem_old {
    /**
     * Adds an error message for the current session.
     * @param {*} message The message to add.
     */
    addErrorMessage(message: any): void;
    
    /**
     * Adds an info message for the current session. This method is not supported for asynchronous business rules.
     * @param {*} message An info message object.
     */
    addInfoMessage(message: any): void;
    
    /**
     * Creates a base64 string from the specified string.
     * @param {string} source The string to be encoded.
     * @returns {string} The base64 string.
     */
    base64Encode(source: string): string;
    
    /**
     * Returns an ASCII string from the specified base64 string..
     * @param {string} source A base64 encoded string.
     * @returns {string} The decoded string.
     */
    base64Decode(source: string): string;
    
    /**
     * Returns the date and time for the beginning of last month in GMT.
     * @returns {string} GMT beginning of last month, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfLastMonth(): string;
    
    /**
     * Returns the date and time for the beginning of next month in GMT.
     * @returns {string} GMT beginning of next month, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfNextMonth(): string;
    
    /**
     * Returns the date and time for the beginning of next week in GMT.
     * @returns {string} The GMT beginning of next week, in the format yyyy-mm-dd hh:mm:ss.
     */
    beginningOfNextWeek(): string;
    
    /**
     * Returns the date and time for the beginning of next year in GMT.
     * @returns {string} GMT beginning of next year, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfNextYear(): string;
    
    /**
     * Returns the date and time for the beginning of this month in GMT.
     * @returns {string} GMT beginning of this month, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfThisMonth(): string;
    
    /**
     * Returns the date and time for the beginning of this quarter in GMT.
     * @returns {string} GMT beginning of this quarter, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfThisQuarter(): string;
    
    /**
     * Returns the date and time for the beginning of this week in GMT.
     * @returns {string} GMT beginning of this week, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfThisWeek(): string;
    
    /**
     * Returns the date and time for the beginning of this year in GMT.
     * @returns {string} GMT beginning of this year, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfThisYear(): string;
    
    /**
     * Generates a date and time for the specified date in GMT.
     * @param {string} date Format: yyyy-mm-dd
     * @param {string} range Start, end, or a time in the 24 hour format hh:mm:ss.
     * @returns {string} A date and time in the format yyyy-mm-dd hh:mm:ss. If range is start, the returned value is yyyy-mm-dd 00:00:00; If range is end the return value is yyyy-mm-dd 23:59:59.
     */
    dateGenerate(date: string, range: string): string;
    
    /**
     * Returns the date and time for a specified number of days ago.
     * @param {number} days Integer number of days
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    daysAgo(days: number): string;
    
    /**
     * Returns the date and time for the end of the day a specified number of days ago.
     * @param {number} days Integer number of days
     * @returns {string} GMT end of the day in the format yyyy-mm-dd hh:mm:ss
     */
    daysAgoEnd(days: number): string;
    
    /**
     * Returns the date and time for the beginning of the day a specified number of days ago.
     * @param {number} days Integer number of days
     * @returns {string} GMT end of the day in the format yyyy-mm-dd hh:mm:ss
     */
    daysAgoStart(days: number): string;
    
    /**
     * Adds an info message for the current session. This method is not supported for asynchronous business rules.
     * @param {string} message The log message with place holders for any variable arguments.
     * @param {*} [parm1] First variable argument.
     * @param {*} [parm2] Second variable argument.
     * @param {*} [parm3] Third variable argument.
     * @param {*} [parm4] Fourth variable argument.
     * @param {*} [parm5] Fifth variable argument.
     */
    debug(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;
    
    /**
     * Returns the date and time for the end of last month in GMT.
     * @returns {string} GMT end of last month, in the format yyyy-mm-dd hh:mm:ss
     */
    endOfLastMonth(): string;
    
    /**
     * Returns the date and time for the end of last week in GMT.
     * @returns {string} GMT end of last week, in the format yyyy-mm-dd hh:mm:ss
     */
    endOfLastWeek(): string;
    
    /**
     * Returns the date and time for the end of last year in GMT.
     * @returns {string} GMT in format yyyy-mm-dd hh:mm:ss
     */
    endOfLastYear(): string;
    
    /**
     * Returns the date and time for the end of next month in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfNextMonth(): string;
    
    /**
     * Returns the date and time for the end of next week in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfNextWeek(): string;
    
    /**
     * Returns the date and time for the end of next year in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfNextYear(): string;
    
    /**
     * Returns the date and time for the end of this month in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfThisMonth(): string;
    
    /**
     * Returns the date and time for the end of this quarter in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfThisQuarter(): string;
    
    /**
     * Returns the date and time for the end of this week in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfThisWeek(): string;
    
    /**
     * Returns the date and time for the end of this year in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfThisYear(): string;
    
    /**
     * Writes an error message to the system log.
     * @param {string} message The log message with place holders for any variable arguments.
     * @param {*} [parm1] First variable argument.
     * @param {*} [parm2] Second variable argument.
     * @param {*} [parm3] Third variable argument.
     * @param {*} [parm4] Fourth variable argument.
     * @param {*} [parm5] Fifth variable argument.
     */
    error(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;
    
    /**
     * Queues an event for the event manager.
     * @param {string} name Name of the event being queued.
     * @param {GlideRecord} instance A GlideRecord object, such as "current".
     * @param {string|null|undefined} parm1 Saved with the instance if specified.
     * @param {string|null|undefined} parm2 Saved with the instance if specified.
     * @param {string} parm3 The name of the queue
     */
    eventQueue(name: string, instance: GlideRecord, parm1: string|null|undefined, parm2: string|null|undefined, parm3: string): void;
    
    /**
     * Queues an event for the event manager.
     * @param {string} name Name of the event being queued.
     * @param {GlideRecord} instance A GlideRecord object, such as "current".
     * @param {string|null|undefined} parm1 Saved with the instance if specified.
     * @param {string} parm3 The name of the queue
     */
    eventQueue(name: string, instance: GlideRecord, parm1: string|null|undefined, parm3: string): void;
    
    /**
     * Queues an event for the event manager.
     * @param {string} name Name of the event being queued.
     * @param {GlideRecord} instance A GlideRecord object, such as "current".
     * @param {string} parm3 The name of the queue
     */
    eventQueue(name: string, instance: GlideRecord, parm3: string): void;
    
    /**
     * Generates a GUID that can be used when a unique identifier is required.
     * @returns {string} A 32-character hexadecimal GUID.
     */
    generateGUID(): string;
    
    /**
     * Gets the caller scope name; returns null if there is no caller.
     * @returns {string|null} The caller's scope name, or null if there is no caller.
     */
    getCallerScopeName(): string|null;
    
    /**
     * Gets a string representing the cache version for a CSS file.
     * @returns {string} The CSS cache version.
     */
    getCssCacheVersionString(): string;
    
    /**
     * Gets the ID of the current application as set using the Application Picker.
     * @returns {string} The current application's sys_id, or global in none is set.
     */
    getCurrentApplicationId(): string;
    
    /**
     * Gets the name of the current scope.
     * @returns {string} The current scope name.
     */
    getCurrentScopeName(): string;
    
    /**
     * Returns the list of error messages for the session that were added by addErrorMessage().
     * @returns {string[]} List of error messages.
     */
    getErrorMessages(): string[];
    
    /**
     * Retrieves a message from UI messages with HTML special characters replaced with escape sequences, for example, & becomes &amp;.
     * @param id The ID of the message.
     * @param args A list of strings or other values defined by java.text.MessageFormat, which allows you to produce language-neutral messages for display to users.
     * @returns {string} The UI message with HTML special characters replaced with escape sequences.
     */
    getEscapedMessage(id: string, args?: any[]): string;
    
    /**
     * Retrieves a message from UI messages.
     * @param id The ID of the message.
     * @param args A list of strings or other values defined by java.text.MessageFormat, which allows you to produce language-neutral messages for display to users.
     * @returns {string} The UI message.
     */
    getMessage(id: string, args?: any[]): string;
    
    /**
     * Gets the value of a Glide property. If the property is not found, returns an alternate value.
     * @param {string} id The key for the property whose value should be returned.
     * @param {string} [alt] Alternate object to return if the property is not found.
     * @returns {string} The value of the Glide property, or the alternate object defined above.
     */
    getProperty(key: string, alt?: string): string;
    
    /**
     * Retrieves the GlideSession session ID.
     * @returns {string} The session ID.
     */
    getSessionID(): string;
    
    /**
     * Gets the current URI for the session.
     * @returns {string} The URI.
     */
    getUrlOnStack(): string;
    
    /**
     * Returns a reference to the scoped GlideUser object for the current user.
     * @returns {GlideUser} Reference to a scoped user object.
     */
    getUser(): GlideUser;
    
    /**
     * Gets the display name of the current user.
     * @returns {string} The name field of the current user. Returns Abel Tuter, as opposed to abel.tuter.
     */
    getUserDisplayName(): string;
    
    /**
     * Gets the sys_id of the current user.
     * @returns {string} The sys_id of the current user.
     */
    getUserID(): string;
    
    /**
     * Gets the user name, or user id, of the current user.
     * @returns {string} The user name of the current user.
     */
    getUserName(): string;
    
    /**
     * Determines if the current user has the specified role.
     * @param {string} role The role to check.
     * @returns {boolean} True if the user had the role. Returns true for users with the administrator role.
     */
    hasRole(role: string): boolean;
    
    /**
     * Returns the date and time for a specified number of hours ago.
     * @param {number} hours Integer number of hours
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    hoursAgo(hours: number): string;
    
    /**
     * Returns the date and time for the end of the hour a specified number of hours ago.
     * @param {number} hours Integer number of hours
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    hoursAgoEnd(hours: number): string;
    
    /**
     * Returns the date and time for the start of the hour a specified number of hours ago.
     * @param {number} hours Integer number of hours
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    hoursAgoStart(hours: number): string;
    
    /**
     * Provides a safe way to call from the sandbox, allowing only trusted scripts to be included.
     * @param {string} name The name fo the script to include.
     * @returns {boolean} True if the include worked.
     */
    include(name: string): boolean;
    
    /**
     * Writes an info message to the system log.
     * @param {string} message The log message with place holders for any variable arguments.
     * @param {*} [parm1] First variable argument.
     * @param {*} [parm2] Second variable argument.
     * @param {*} [parm3] Third variable argument.
     * @param {*} [parm4] Fourth variable argument.
     * @param {*} [parm5] Fifth variable argument.
     */
    info(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;
    
    /**
     * Determines if debugging is active for a specific scope.
     * @returns {boolean} True if either session debugging is active or the log level is set to debug for the specified scope.
     */
    isDebugging(): boolean;
    
    /**
     * Checks if the current session is interactive. An example of an interactive session is when a user logs in normally. An example of a non-interactive session is using a SOAP request to retrieve data.
     * @returns {boolean} True if the session is interactive.
     */
    isInteractive(): boolean;
    
    /**
     * Determines if the current user is currently logged in.
     * @returns {boolean} True if the current user is logged in.
     */
    isLoggedIn(): boolean;
    
    /**
     * You can determine if a request comes from a mobile device.
     * @returns {boolean} True if the request comes from a mobile device; otherwise, false.
     */
    isMobile(): boolean;
    
    /**
     * Returns the date and time for a specified number of months ago.
     * @param {number} months Integer number of months.
     * @returns {string} GMT on today's date of the specified month, in the format yyyy-mm-dd hh:mm:ss.
     */
    monthsAgo(months: number): string;
    
    /**
     * Returns the date and time for the end of the minute a specified number of minutes ago.
     * @param {number} minutes Integer number of minutes.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    minutesAgoEnd(minutes: number): string;
    
    /**
     * Returns the date and time for the start of the minute a specified number of minutes ago.
     * @param {number} minutes Integer number of minutes.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    minutesAgoStart(minutes: number): string;
    
    /**
     * Returns the date and time for the start of the month a specified number of months ago.
     * @param {number} months Integer number of months.
     * @returns {string} GMT start of the month the specified number of months ago, in the format yyyy-mm-dd hh:mm:ss.
     */
    monthsAgoStart(months: number): string;
    
    /**
     * Queries an object and returns true if the object is null, undefined, or contains an empty string.
     * @param {*} o The object to be checked.
     * @returns {string} True if the object is null, undefined, or contains an empty string; otherwise, returns false.
     */
    nil(o: any): string;
    
    /**
     * Returns the date and time for the last day of the quarter for a specified number of quarters ago.
     * @param {number} quarters Integer number of quarters.
     * @returns {string} GMT end of the quarter that was the specified number of quarters ago, in the format yyyy-mm-dd hh:mm:ss.
     */
    quartersAgoEnd(quarters: number): string;
    
    /**
     * Returns the date and time for the first day of the quarter for a specified number of quarters ago.
     * @param {number} quarters Integer number of quarters.
     * @returns {string} GMT end of the month that was the specified number of quarters ago, in the format yyyy-mm-dd hh:mm:ss.
     */
    quartersAgoStart(quarters: number): string;
    
    /**
     * Sets the specified key to the specified value if the property is within the script's scope.
     * @param {string} id The key for the property to be set.
     * @param {string} value The value of the property to be set.
     * @param {string} [description] A description of the property.
     */
    setProperty(key: string, value: string, description?: string): void;
    
    /**
     * Sets the redirect URI for this transaction, which then determines the next page the user will see.
     * @param {string|GlideUri} o URI object or URI string to set as the redirect.
     */
    setRedirect(o: string|GlideUri): void;
    
    /**
     * Determines if a database table exists.
     * @param {string} name Name of the table to check for existence.
     * @returns {boolean} True if the table exists. False if the table was not found.
     */
    tableExists(name: string): boolean;
    
    /**
     * Encodes non-ASCII characters, unsafe ASCII characters, and spaces so the returned string can be used on the Internet. Uses UTF-8 encoding. Uses percent (%) encoding.
     * @param {string} url The string to be encoded.
     * @returns {string} A string with non-ASCII characters, unsafe ASCII characters, and spaces encoded.
     */
    urlEncode(url: string): string;
    
    /**
     * Replaces UTF-8 encoded characters with ASCII characters.
     * @param {string} url A string with UTF-8 percent (%) encoded characters.
     * @returns {string} A string with encoded characters replaced with ASCII characters.
     */
    urlDecode(url: string): string;
    
    /**
     * Writes a warning message to the system log.
     * @param {string} message The log message with place holders for any variable arguments.
     * @param {*} [parm1] First variable argument.
     * @param {*} [parm2] Second variable argument.
     * @param {*} [parm3] Third variable argument.
     * @param {*} [parm4] Fourth variable argument.
     * @param {*} [parm5] Fifth variable argument.
     */
    warn(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;
    
    /**
     * Takes an XML string and returns a JSON object.
     * @param {string} xmlString The XML string to be converted.
     * @returns {object|null} A JSON object representing the XML string. Null if unable to process the XML string.
     */
    xmlToJSON(xmlString: string): { [key: string]: any }|null;
    
    /**
     * Returns a date and time for a certain number of years ago.
     * @param {number} years Integer number of years.
     * @returns {string} GMT beginning of the year that is the specified number of years ago, in the format yyyy-mm-dd hh:mm:ss.
     */
    yearsAgo(years: number): string;
    
    /**
     * Returns yesterday's time (24 hours ago).
     * @returns {string} GMT for 24 hours ago, in the format yyyy-mm-dd hh:mm:ss
     */
    yesterday(): string;
}
declare class NativeObject  {
	constructor();
	static hasOwnProperty(thisObj: any, args: Array<any>): any;
	static isPrototypeOf(cx: any, thisObj: any, args: Array<any>): any;
	static propertyIsEnumerable(cx: any, thisObj: any, args: Array<any>): any;
	static toLocaleString(cx: any, thisObj: any): string;
	static toString(cx: any, thisObj: any): string;
	static valueOf(thisObj: any): any;
}
declare class GlideSystem  {
	OLAPBuildTimeDimension(): void;
	breaker(obj: any): void;
	static cacheFlush(catalog?: any, invalidateMetaData?: any): void;
	constructor();
	dumpProperties(): void;
	escaper(string_1: string): string;
	eventQueue(name: string, instance: any, parm1: string, parm2: string, queue: string): void;
	eventQueueScheduled(name: string, instance: any, parm1: string, parm2: string, expiration: any): void;
	eventsProcess(): void;
	static executeCondition(condition: string): boolean;
	executeNow(current: any): string;
	static fileExists(fileName: string): boolean;
	generateGUID(o: any): string;
	generateURL(table: string, key: string, view: any): string;
	static getBooleanPreference(key: string, defaultValue: boolean): boolean;
	static getCallerScopeName(): string;
	static getCannotConfigureScopeReason(scopeID: string): string;
	static getCssCacheVersionString(): string;
	static getCurrentScopeName(): string;
	static getCustomerPrefix(): string;
	getDisplayColumn(tableName: string): string;
	getEscapedMessage(id: string, args: any): string;
	getEscapedProperty(key: string, alt: any): string;
	static getGlideHome(): string;
	getInstanceIP(): string;
	getJavaVersion(): string;
	static getMaxSchemaNameLength(): number;
	getMessage(id: string, args: any): string;
	getMessageLang(id: string, language: string, args: any): string;
	getMessageS(id: string, args: any): string;
	static getNewAppScopeCompanyPrefix(): string;
	getNodeID(): string;
	static getNumericPreference(key: string, defaultValue: number): number;
	static getPreference(key: string, defaultValue: any): string;
	getProperty(key: string, alt: any): string;
	static getScopeIdByElementName(tableName: string, elementName: string): string;
	static getScopeIdByRecordId(sysId: string): string;
	static getScopeLabelByElementName(tableName: string, elementName: string): string;
	static getScopeLabelByRecordId(sysId: string): string;
	static getScopeNameByElementName(tableName: string, elementName: string): string;
	static getScopeNameByRecordId(sysId: string): string;
	static getSession(): any;
	getSessionID(): string;
	getStyle(tableName: string, fieldName: string, fieldValue: string): string;
	getSystemID(): string;
	getTempDir(): string;
	static getVendorPrefixPrefix(): string;
	globalPut(name: string, g: any): void;
	static hasRightsTo(resourcePath: string, context: any): boolean;
	static hasRole(role: string): boolean;
	static include(name: string): boolean;
	installationSetting(spec: string, ref: string): string;
	invalidateCache(): void;
	isDatabaseView(table: string): boolean;
	isEdgeEncryptedSession(): boolean;
	isInteractiveSession(): boolean;
	isMobile(): boolean;
	isPaused(): boolean;
	static log(message: string, source: string): void;
	logError(message: string, source: string): void;
	logWarning(message: string, source: string): void;
	mergeAttribute(tableName: string, parm1: string, parm2: string): void;
	nil(o: any): boolean;
	static pause(): void;
	static print(toPrint: string): void;
	processDelegatedEvents(): void;
	static publish(channel: string, data: any): void;
	static publishToUser(channel: string, data: any, toUser: string): void;
	resolveIcon(className: string): string;
	resume(): void;
	setCannotCancel(b: boolean): boolean;
	setProperty(key: string, value: string, description: string): void;
	sleep(i: number): void;
	tableExists(name: string): boolean;
	templateExists(templateName: string): boolean;
	templateOrMacroExists(templateName: string): boolean;
	unWrap(url: string): string;
	workflowFlush(o: any): void;
	xmlToJSON(xmlString: string): NativeObject;
}
declare interface GlideUser {
    /**
     * Returns the current user's company sys_id.
     * @returns {string} Company sys_id.
     */
    getCompanyID(): string;

    /**
     * Returns the current user's display name.
     * @returns {string} User's display name
     */
    getDisplayName(): string;

    /**
     * Returns the user's email address.
     * @returns {string} User's email address
     */
    getEmail(): string;

    /**
     * Returns the user's first name.
     * @returns {string} User's first name
     */
    getFirstName(): string;

    /**
     * Gets the sys_id of the current user.
     * @returns {string} User's sys_id
     */
    getID(): string;

    /**
     * Returns the user's last name.
     * @returns {string} User's last name
     */
    getLastName(): string;

    /**
     * Returns the user ID, or login name, of the current user.
     * @returns {string} User ID
     */
    getName(): string;

    /**
     * Gets the specified user preference value for the current user.
     * @param name The name of the preference.
     * @returns {string} The preference value.
     */
    getPreference(name: string): string;

    /**
     * Returns a list of roles that includes explicitly granted roles, inherited roles, and roles acquired by group membership.
     * @returns {string[]} List of all roles available to the user.
     */
    getRoles(): string[];

    /**
     * Returns the list of roles explicitly granted to the user.
     * @returns {string[]} List of roles explicitly assigned to the user.
     */
    getUserRoles(): string[];

    /**
     * Determines if the current user has the specified role.
     * @param role Role to check
     * @returns {boolean} True if the user has the role.
     */
    hasRole(role: string): boolean;

    /**
     * Determines if the current user is a member of the specified group.
     * @param group Group to check
     * @returns {boolean} True if the user is a member of the group.
     */
    isMemberOf(group: string): boolean;

    /**
     * Saves a user preference value to the database.
     * @param name The preference to save.
     * @param value The preference value.
     */
    savePreference(name: string, value: string): void;
}

declare interface GlideUri {
    new(): GlideUri;

    /**
     * Returns the specified parameter.
     * @param name The parameter name.
     * @returns {string} The value for the specified parameter.
     */
    get(name: string): string;

    /**
     * Returns the file name portion of the URI.
     * @returns {string} The file name portion of the URI.
     */
    getFileFromPath(): string;

    /**
     * Sets the specified parameter to the specified value.
     * @param name The parameter name.
     * @param value The value.
     */
    set(name: string, value: string): void;

    /**
     * Reconstructs the URI string and performs the proper URL encoding by converting non-valid characters to their URL code. For example, converting & to '%26'.
     * @param path The base portion of the system URL to which the URI is appended.
     * @returns {string} The URL.
     */
    toString(path: string): string;
}
interface GlideIQueryCondition  {
	addOrCondition(name: string, value: any): GlideIQueryCondition;
}
declare class GlideQueryCondition  {
	// addCondition(name: string, value: any): GlideIQueryCondition;
	// addCondition(name: string, oper: string, value: any): GlideIQueryCondition;
	// addCondition(and: GlideIQueryCondition): void;
	addCondition(name_OR_and: string|GlideIQueryCondition, value_OR_oper?: any|string, value?: any): GlideIQueryCondition;
	// addOrCondition(name: string, value: any): GlideIQueryCondition;
	// addOrCondition(name: string, oper: string, value: any): GlideIQueryCondition;
	// addOrCondition(or: GlideIQueryCondition): void;
	addOrCondition(name_OR_or: string|GlideIQueryCondition, value_OR_oper?: any|string, value?: any): GlideIQueryCondition;
	// constructor();
	// constructor(name: string, operator: string);
	// constructor(name: string, operator: string, value: string);
	constructor(name?: string, operator?: string, value?: string);
}
declare interface GlideQueryCondition_old {
    /**
     * Adds an AND condition to the current condition. Assumes the equals operator.
     * @param {string} name The name of a field.
     * @param {*} value The value to query on.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addCondition(name: string, value: any) : GlideQueryCondition;
    /**
     * Adds an AND condition to the current condition.
     * @param {string} name The name of a field.
     * @param {string} oper The operator for the query (=,!=,>,>=,<,<=,IN,NOT IN,STARTSWITH,ENDSWITH,CONTAINS,DOES NOT CONTAIN,INSTANCEOF).
     * @param {*} value The value to query on.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addCondition(name: string, oper: string, value: any) : GlideQueryCondition;
    /**
     * Adds an OR condition to the current condition. Assumes the equals operator.
     * @param {string} name The name of a field.
     * @param {*} value The value to query on.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addOrCondition(name: string, value: any) : GlideQueryCondition;
    /**
     * Adds an OR condition to the current condition.
     * @param {string} name The name of a field.
     * @param {string} oper The operator for the query (=,!=,>,>=,<,<=,IN,NOT IN,STARTSWITH,ENDSWITH,CONTAINS,DOES NOT CONTAIN,INSTANCEOF).
     * @param {*} value The value to query on.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addOrCondition(name: string, oper: string, value: any) : GlideQueryCondition;
}

declare interface IServerClass {
    intialize(...args: (any|null|undefined)[]): void;
    type: string;
}
declare interface IBackgroundProgressWorkerHandler extends IServerClass {
    process(...args: (any|null|undefined)[]): void;
}
declare class GlideProgressWorker  {
	constructor();
	getProgressID(): string;
	setOutputSummary(msg: string): void;
	setProgressErrorState(): void;
	setProgressMessage(m: string): void;
	setProgressName(name: string): void;
	setProgressState(status: string): void;
	setProgressStateCode(stateCode: string): void;
}
declare class GlideScriptedProgressWorker extends GlideProgressWorker {
	addMessage(message: string): void;
	addNonEscapedParameter(parm: string): void;
	addParameter(parm: string): void;
	constructor();
	setName(name: string): void;
}
declare class GlideScriptedProgressWorker_old {
    setProgressName(displayName: string): any|null|undefined;
    setName(name: string): any|null|undefined;
    addParameter(value: any): any|null|undefined;
    setBackground(isBackground: boolean): any|null|undefined;
    getProgressID(): any|null|undefined;
    start(): any|null|undefined;
    setProgressMessage(message: string): any|null|undefined;

    registerChild(...args: any[]): any|null|undefined;
    initProgressFields(...args: any[]): any|null|undefined;
    setCannotCancel(...args: any[]): any|null|undefined;
    setProgressState(...args: any[]): any|null|undefined;
    wait(...args: any[]): any|null|undefined;
    cancel(...args: any[]): any|null|undefined;
    getClass(...args: any[]): any|null|undefined;
    setProgressStateCode(...args: any[]): any|null|undefined;
    hashCode(...args: any[]): any|null|undefined;
    stage(...args: any[]): any|null|undefined;
    fail(...args: any[]): any|null|undefined;
    notify(...args: any[]): any|null|undefined;
    setParentController(...args: any[]): any|null|undefined;
    setProgressErrorState(...args: any[]): any|null|undefined;
    getParentController(...args: any[]): any|null|undefined;
    isCancelled(...args: any[]): any|null|undefined;
    getOutputSummary(...args: any[]): any|null|undefined;
    updateDetailMessage(...args: any[]): any|null|undefined;
    run(...args: any[]): any|null|undefined;
    getProgressMessage(...args: any[]): any|null|undefined;
    isUncancelable(...args: any[]): any|null|undefined;
    setProgressTable(...args: any[]): any|null|undefined;
    equals(...args: any[]): any|null|undefined;
    getProgressState(...args: any[]): any|null|undefined;
    runScript(...args: any[]): any|null|undefined;
    updateMessage(...args: any[]): any|null|undefined;
    setProgressError(...args: any[]): any|null|undefined;
    addNonEscapedParameter(...args: any[]): any|null|undefined;
    isFailed(...args: any[]): any|null|undefined;
    addMessage(...args: any[]): any|null|undefined;
    setProgressMessage(...args: any[]): any|null|undefined;
    success(...args: any[]): any|null|undefined;
    notifyAll(...args: any[]): any|null|undefined;
    isBackground(...args: any[]): any|null|undefined;
    isPending(...args: any[]): any|null|undefined;
    getWorkerThreadID(...args: any[]): any|null|undefined;
    isError(...args: any[]): any|null|undefined;
    setOutputSummary(...args: any[]): any|null|undefined;
    isStarting(...args: any[]): any|null|undefined;
    loadProgressWorker(...args: any[]): any|null|undefined;
    getProgressTable(...args: any[]): any|null|undefined;
}
declare class GlideRecord  {
	_next(): boolean;
	_operation(): string;
	_query(field: any, value: any): void;
	addActiveQuery(): GlideQueryCondition;
	addDomainQuery(o: any): void;
	addEncodedQuery(query: string): void;
	addFunction(function_1: string): void;
	addInactiveQuery(): GlideQueryCondition;
	addJoinQuery(joinTable: string, primaryField: any, joinTableField: any): GlideIQueryCondition;
	addNotNullQuery(fieldName: string): GlideQueryCondition;
	addNullQuery(fieldName: string): GlideQueryCondition;
	addQuery(name: string, operator: any, value: any): GlideIQueryCondition;
	appendOrQuery(condition: any, name: string, operator: any, value: any): void;
	applyEncodedQuery(queryString: string): void;
	applyRowSecurity(): void;
	applyTemplate(template: string): void;
	attachGlideListener(className: string, insert: boolean, update: boolean, delete_1: boolean, fields: string, foreign: any, foreign2: any, details: string): void;
	autoSysFields(b: boolean): void;
	canCreate(): boolean;
	canDelete(): boolean;
	canRead(): boolean;
	canWrite(): boolean;
	changes(): boolean;
	chooseWindow(f: number, l: number, forceCount: boolean): void;
	close(): void;
	// constructor();
	// constructor(tableName: string);
	constructor(tableName?: string);
	createElement(): boolean;
	createIndex(): boolean;
	deleteMultiple(): void;
	deleteRecord(): boolean;
	dropIndex(): boolean;
	evaluateAsDefault(fieldName: string): string;
	find(columnName: string, value: string): boolean;
	findForeignKey(collection: string): string;
	get(name: any, value: any): boolean;
	getAttribute(attribute: string): string;
	getBooleanAttribute(attribute: string): boolean;
	getCategory(): string;
	getClassDisplayValue(): string;
	getDisplayName(): string;
	getDisplayValue(name: string): string;
	getED(): GlideElementDescriptor;
	getElement(columnName: string): GlideElement;
	getElements(): Array<any>;
	getEncodedQuery(): string;
	getEngineParameter(name: string): string;
	getEscapedDisplayValue(): string;
	getFields(): Array<any>;
	getLabel(): string;
	getLastErrorMessage(): string;
	getLink(noStack: boolean): string;
	getLocation(): number;
	getPlural(): string;
	getRecordClassName(): string;
	getRelatedLists(): { [key: string]: any; };
	getRelatedRecords(foreignKey: string, collectionID: string): void;
	getRelatedTables(): { [key: string]: string; };
	getRowCount(): number;
	getRowNumber(): number;
	getSetRowCount(): number;
	getTableName(): string;
	getTableScope(): string;
	getTableScopeId(): string;
	getTableScopeName(): string;
	getUniqueValue(): string;
	getValue(name: string): string;
	hasAttachments(): boolean;
	hasNext(): boolean;
	hasRightsTo(operation: string): boolean;
	incrementViewCount(): void;
	initialize(): void;
	insert(): string;
	insertLazy(): string;
	insertOrUpdate(keyField: string): string;
	insertWithReferences(): string;
	instanceOf(className: string): boolean;
	isActionAborted(): boolean;
	isFiltrationByACLEnabled(): boolean;
	isForeignTable(): boolean;
	isInGlobalScope(): boolean;
	isInSelectedScope(): boolean;
	isInStoreScope(): boolean;
	isMetadata(): boolean;
	isNewRecord(): boolean;
	isReadonly(): boolean;
	isValid(): boolean;
	isValidField(columnName: string): boolean;
	isValidMetadataRecord(): boolean;
	isValidRecord(): boolean;
	isView(): boolean;
	isWorkflow(): boolean;
	largeResultExpected(): void;
	makeReadonly(): void;
	moreEncodedQuery(query: string): void;
	static newGlideRecordNamedFromScript(tableName: string): GlideRecord;
	newRecord(): void;
	next(): boolean;
	nextRecord(): boolean;
	notifyUser(): void;
	onePassQuery(): void;
	operation(): string;
	orderBy(name: string): void;
	orderByDesc(name: string): void;
	popCurrent(): void;
	putCurrent(): void;
	putOptimizers(o: any): void;
	query(field: any, value: any): void;
	queryNoDomain(): void;
	restoreLocation(): void;
	saveLocation(): void;
	scheduleScript(name: string): void;
	setAbortAction(b: boolean): void;
	setCategory(category: string): void;
	setDisplayValue(name: string, value: any): void;
	setEngineParameter(name: string, value: string): void;
	setFiltrationByACLEnabled(b: boolean): void;
	setForceUpdate(e: boolean): void;
	setLimit(limit: number): void;
	setLocation(rowNumber: number): void;
	setNewGuid(): string;
	setNewGuidValue(guid: string): void;
	setQueryReferences(queryReferences: boolean): void;
	setSystem(isSystem: boolean): void;
	setUseEngines(e: boolean): void;
	setValue(name: string, value: any): void;
	setWorkflow(e: boolean): void;
	targetExtension(tableName: string): void;
	update(reason: any): string;
	updateLazy(): boolean;
	updateMultiple(): void;
	updateNoDomain(reason: any): string;
	updateWithReferences(reason: any): string;
}
declare class GlideRecord_old {
    constructor(tableName: string);

    sys_id: GlideElement;

    [key: string]: GlideElement|any;

    /**
     * Adds a filter to return active records.
     * @returns {GlideQueryCondition} Filter to return active records.
     */
    addActiveQuery(): GlideQueryCondition;

    /**
     * Adds an encoded query to other queries that may have been set.
     * @param {string} query An encoded query string.
     */
    addEncodedQuery(query: string): void;

    /**
     * Adds a filter to return records based on a relationship in a related table.
     * @param {string} joinTable Table name
     * @param {*} [primaryField] If other than sys_id, the primary field
     * @param {*} [joinTableField] If other than sys_id, the field that joins the tables
     * @returns {GlideQueryCondition} A filter that lists records where the relationships match.
     */
    addJoinQuery(joinTable: string, primaryField?: any, joinTableField?: any): GlideQueryCondition;

    /**
     * A filter that specifies records where the value of the field passed in the parameter is not null.
     * @param {string} fieldName The name of the field to be checked.
     * @returns {GlideQueryCondition} A filter that specifies records where the value of the field passed in the parameter is not null.
     */
    addNotNullQuery(fieldName: string): GlideQueryCondition;

    /**
     * Adds a filter to return records where the value of the specified field is null.
     * @param {string} fieldName The name of the field to be checked.
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addNullQuery(fieldName: string): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @param {string} query An encoded query string.
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(query: string): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @param {string} name Table field name.
     * @param {*} value Value on which to query (not case-sensitive).
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(name: string, value: any): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @param {string} name Table field name.
     * @param {string} operator Query operator (=,!=,>,>=,<,<=,IN,NOT IN,STARTSWITH,ENDSWITH,CONTAINS,DOES NOT CONTAIN,INSTANCEOF).
     * @param {*} value Value on which to query (not case-sensitive).
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(name: string, operator: string, value: any): GlideQueryCondition;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit inserting new records in this table.
     * @returns {boolean} True if the user's roles permit creation of new records in this table.
     */
    canCreate() : boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit deleting records in this table.
     * @returns {boolean} True if the user's roles permit deletions of records in this table.
     */
    canDelete() : boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit reading records in this table.
     * @returns {boolean} True if the user's roles permit reading records from this table.
     */
    canRead() : boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit editing records in this table.
     * @returns {boolean} True if the user's roles permit writing to records from this table.
     */
    canWrite() : boolean;

    /**
     * Sets a range of rows to be returned by subsequent queries.
     * @param {number} firstRow The first row to include.
     * @param {number} lastRow The last row to include.
     * @param {boolean} forceCount If true, the getRowCount() method will return all possible records.
     */
    chooseWindow(firstRow: number, lastRow: number, forceCount: boolean): void;

    /**
     * Deletes multiple records that satisfy the query condition.
     */
    deleteMultiple(): void;

    /**
     * Deletes the current record.
     * @returns {boolean} True if the record was deleted; false if no record was found to delete.
     */
    deleteRecord(): boolean;

    /**
     * Defines a GlideRecord based on the specified expression of 'name = value'.
     * @param {string} name Column name
     * @param {*} [value] Value to match. If value is not specified, then the expression used is 'sys_id = name'.
     * @returns {boolean} True if one or more matching records was found. False if no matches found.
     */
    get(name: string, value?: any): boolean;

    /**
     * Returns the dictionary attributes for the specified field.
     * @param {string} fieldName Field name for which to return the dictionary attributes
     * @returns {string} Dictionary attributes
     */
    getAttribute(fieldName: string): string;

    /**
     * Returns the table's label.
     * @returns {string} Table's label
     */
    getClassDisplayValue(): string;

    /**
     * Retrieves the display value for the current record.
     * @returns {string} The display value for the current record.
     */
    getDisplayValue(): string;

    /**
     * Retrieves the GlideElement object for the specified field.
     * @param {string} columnName Name of the column to get the element from.
     * @returns {GlideElement} The GlideElement for the specified column of the current record.
     */
    getElement(columnName: string): GlideElement;

    /**
     * Retrieves the query condition of the current result set as an encoded query string.
     * @returns {string} The encoded query as a string.
     */
    getEncodedQuery(): string;

    /**
     * Returns the field's label.
     * @returns {string} Field's label.
     */
    getLabel(): string;

    /**
     * Retrieves the last error message. If there is no last error message, null is returned.
     * @returns {string|null} The last error message as a string.
     */
    getLastErrorMessage(): string|null;

    /**
     * Retrieves a link to the current record.
     * @param {boolean} noStack If true, the sysparm_stack parameter is not appended to the link. The parameter sysparm_stack specifies the page to visit after closing the current link.
     * @returns {string} A link to the current record as a string.
     */
    getLink(noStack: boolean): string;

    /**
     * Retrieves the class name for the current record.
     * @returns {string} The class name.
     */
    getRecordClassName(): string;

    /**
     * Retrieves the number of rows in the query result.
     * @returns {number} The number of rows.
     */
    getRowCount(): number;

    /**
     * Retrieves the name of the table associated with the GlideRecord.
     * @returns {string} The table name.
     */
    getTableName(): string;

    /**
     * Gets the primary key of the record, which is usually the sys_id unless otherwise specified.
     * @returns {string|null} The unique primary key as a String, or null if the key is null.
     */
    getUniqueValue(): string|null;

    /**
     * Retrieves the string value of an underlying element in a field.
     * @param {string} name The name of the field to get the value from.
     * @returns {string} The value of the field.
     */
    getValue(name: string): string;

    /**
     * Determines if there are any more records in the GlideRecord object.
     * @returns {boolean} True if there are more records in the query result set.
     */
    hasNext(): boolean;

    /**
     * Inserts a new record using the field values that have been set for the current record.
     * @returns {string} Unique ID of the inserted record, or null if the record is not inserted.
     */
    insert(): string;

    /**
     * Creates an empty record suitable for population before an insert.
     */
    initialize(): void;

    /**
     * Checks to see if the current database action is to be aborted.
     * @returns {boolean} True if the current database action is to be aborted.
     */
    isActionAborted(): boolean;

    /**
     * Checks if the current record is a new record that has not yet been inserted into the database.
     * @returns {boolean} True if the record is new and has not been inserted into the database.
     */
    isNewRecord(): boolean;

    /**
     * Determines if the table exists.
     * @returns {boolean} True if table is valid or if record was successfully retrieved. False if table is invalid or record was not successfully retrieved.
     */
    isValid(): boolean;

    /**
     * Determines if the specified field is defined in the current table.
     * @param {string} columnName The name of the the field.
     * @returns {boolean} True if the field is defined for the current table.
     */
    isValidField(columnName: string): boolean;

    /**
     * Determines if current record is a valid record.
     * @returns {boolean} True if the current record is valid. False if past the end of the record set.
     */
    isValidRecord(): boolean;

    /**
     * Creates a new GlideRecord record, sets the default values for the fields, and assigns a unique ID to the record.
     */
    newRecord(): void;

    /**
     * Moves to the next record in the GlideRecord object.
     * @returns {boolean} True if moving to the next record is successful. False if there are no more records in the result set.
     */
    next(): boolean;

    /**
     * Retrieves the current operation being performed, such as insert, update, or delete.
     * @returns {string} The current operation.
     */
    operation(): string;

    /**
     * Specifies an orderBy column.
     * @param {string} name The column name used to order the records in this GlideRecord object.
     */
    orderBy(name: string): void;

    /**
     * Runs the query against the table based on the filters specified by addQuery, addEncodedQuery, etc.
     * @param {string} [name] The column name to query on.
     * @param {*} [value] The value to query for.
     */
    query(field?: string, value?: any): void;

    /**
     * Specifies a decending orderBy column.
     * @param {string} name The column name used to order the records in this GlideRecord object.
     */
    orderByDesc(name: string): void;

    /**
     * Sets a flag to indicate if the next database action (insert, update, delete) is to be aborted. This is often used in business rules.
     * @param b True to abort the next action. False if the action is to be allowed.
     */
    setAbortAction(b: boolean): void;

    /**
     * Sets the limit for number of records are fetched by the GlideRecord query.
     * @param {number} maxNumRecords The maximum number of records to fetch.
     */
    setLimit(maxNumRecords: number): void;

    /**
     * Sets sys_id value for the current record.
     * @param {string} guid The GUID to be assigned to the current record.
     */
    setNewGuidValue(guid: string): void;

    /**
     * Sets the value of the field with the specified name to the specified value.
     * @param {string} name Name of the field.
     * @param {*} value The value to assign to the field.
     */
    setValue(name: string, value: any): void;

    /**
     * Enables or disables the running of business rules, script engines, and audit.
     * @param {boolean} enable If true (default), enables business rules. If false, disables business rules.
     */
    setWorkflow(enable: boolean): void;

    /**
     * Updates the GlideRecord with any changes that have been made. If the record does not already exist, it is inserted.
     * @param {string} [reason] The reason for the update. The reason is displayed in the audit record.
     * @returns {string|null} Unique ID of the new or updated record. Returns null if the update fails.
     */
    update(reason?: string): string|null;

    /**
     * Updates each GlideRecord in the list with any changes that have been made.
     */
    updateMultiple(): void;
}
declare interface GlidePlugin  {
	getDescription(): any;
	getDisplayName(): string;
	getName(): string;
	getPath(): string;
	refreshArtifacts(): void;
}
declare class GlideExtensionPoint  {
	// constructor(plugin: string, el: any);
	// constructor(plugin: string, el: any, namespace: string);
	// constructor(extension: any);
	constructor(plugin_OR_extension: string|any, el?: any, namespace?: string);
	getAttribute(name: string): string;
}
declare class GlidePluginManager  {
	constructor();
	static getActivePlugin(pluginName: string): GlidePlugin;
	static getActivePlugins(): { [key: string]: GlidePlugin; };
	static getExtensionMap(): { [key: string]: { [key: string]: GlideExtensionPoint; }; };
	static getInstalledCorePlugins(): { [key: string]: GlidePlugin; };
	static getInstalledPlugin(pluginName: string): GlidePlugin;
	static getInstalledPlugins(): { [key: string]: GlidePlugin; };
	static getPluginPath(pluginName: string): string;
	static getUninstalledConditionalPlugins(pluginName: string): GlideRecord;
	init(haveDB: boolean): void;
	static isActive(plugin_id: string): boolean;
	static isRegistered(pluginId: string): boolean;
	isSkipDependentUpdate(): boolean;
	static isUpgradeSystemBusy(): boolean;
	static isZboot(): boolean;
	static loadAllDemo(): void;
	static loadDemoData(pluginName: string): void;
	// static loadPluginData(pluginName: string): void;
	// static loadPluginData(pluginName: string, dir: string): void;
	static loadPluginData(pluginName: string, dir?: string): void;
	registerPlugin(pluginName: string): void;
	setSkipDependentUpdate(b: boolean): void;
	setSource(source: string): void;
	static setZbootJS(b: boolean): void;
	static startPluginFromCluster(pluginName: string): void;
	upgrade(): void;
	upgradeCount(): number;
	static verifyFilenames(): void;
}
declare class SysStyleResult  {
	// constructor();
	// constructor(initInRhino: boolean);
	// constructor(sysId: string, style: string, alt: string);
	constructor(initInRhino_OR_sysId?: boolean|string, style?: string, alt?: string);
	getAlt(): string;
	getStyle(): string;
}
// FRom https://github.com/yln99517/snts
declare class GlideElement  {
	canCreate(): boolean;
	canRead(): boolean;
	canWrite(): boolean;
	changes(): boolean;
	changesFrom(o: any): boolean;
	changesFromNotEmpty(): boolean;
	changesTo(o: any): boolean;
	changesToNotEmpty(): boolean;
	constructor();
	debug(msg: any): void;
	elementSupportsMapping(): boolean;
	explainLock(): string;
	getAttribute(attribute: string): string;
	getBaseTableName(): string;
	getBooleanAttribute(attribute: string): boolean;
	getChoiceValue(): string;
	getChoices(dependent: string): Array<any>;
	getDebugCount(): number;
	getDependent(): string;
	getDependentTable(): string;
	getDisplayValue(maxCharacters: number): string;
	getDisplayValueExt(maxCharacters: number, nullsub: string): string;
	getED(): GlideElementDescriptor;
	getElementValue(name: string): string;
	getError(): string;
	getEscapedValue(): string;
	getFieldStyle(): string;
	getFullStyle(): SysStyleResult;
	getGlideObject(): any;
	getGlideRecord(): GlideRecord;
	getHTMLValue(maxChars: number): string;
	getHTMLValueExt(maxCharacters: number, nullsub: string): string;
	getInitialValue(): string;
	getLabel(): string;
	getMappingConfig(): ScopedServer.MappingLookupSourceDescriptor;
	getModifiedBy(): string;
	getName(): string;
	getReferenceKey(): string;
	getStyle(): string;
	getTableName(): string;
	getTextAreaDisplayValue(): string;
	getValue(): string;
	getValueMapping(): string;
	getXHTMLValue(): string;
	getXMLValue(): string;
	hasAttribute(attribute: string): boolean;
	hasMapping(): boolean;
	hasRightsTo(operation: string): boolean;
	hasValue(): boolean;
	isArray(): boolean;
	isDynamicCreate(): boolean;
	isNil(): boolean;
	isObject(): boolean;
	nil(): boolean;
	setDisplayValue(value: any): void;
	setError(error: string): void;
	setInitialValue(value: string): void;
	setJournalEntry(value: any, userName: string): void;
	setValue(value: any): void;
	setValueMapping(mapping: string): void;
	size(): number;
	toString(): string;
}
declare interface GlideElement_old {
    /**
     * Determines if the user's role permits the creation of new records in this field.
     * @returns {boolean} True if the field can be created, false otherwise.
     */
    canCreate(): boolean;

    /**
     * Indicates whether the user's role permits them to read the associated GlideRecord.
     * @returns {boolean} True if the field can be read, false otherwise.
     */
    canRead(): boolean;

    /**
     * Determines whether the user's role permits them to write to the associated GlideRecord.
     * @returns {boolean} True if the user can write to the field, false otherwis.
     */
    canWrite(): boolean;

    /**
     * Determines if the new value of a field, after a change, matches the specified object.
     * @returns {boolean} True if the fields have been changed, false if the field has not.
     */
    changes(): boolean;

    /**
     * Determines if the previous value of the current field matches the specified object.
     * @param {*} o An object value to check against the previous value of the current field.
     * @returns {boolean} True if the previous value matches, false if it does not.
     */
    changesFrom(o: any): boolean;

    /**
     * Determines if the new value of a field, after a change, matches the specified object.
     * @param {*} o An object value to check against the new value of the current field.
     * @returns {boolean} True if the new value matches, false if it does not.
     */
    changesTo(o: any): boolean;

    /**
     * Returns the value of the specified attribute from the dictionary.
     * @param {string} attributeName Attribute name
     * @returns {string} Attribute value
     */
    getAttribute(attributeName: string): string;

    /**
     * Returns the Boolean value of the specified attribute from the dictionary.
     * @param {string} attributeName Attribute name.
     * @returns {boolean} Boolean value of the attribute. Returns false if the attribute does not exist.
     */
    getBooleanAttribute(attributeName: string): boolean;

    /**
     * Gets the formatted display value of the field.
     * @param {number} [maxCharacters] Maximum characters desired
     */
    getDisplayValue(maxCharacters?: number): string;

    /**
     * Returns the HTML value of a field.
     * @param {number} [maxChars] Maximum number of characters to return.
     * @returns {string} HTML value for the field.
     */
    getHTMLValue(maxChars?: number): string;

    /**
     * Gets the object label.
     * @returns {string} The object label.
     */
    getLabel(): string;

    /**
     * Gets the name of the field.
     * @returns {string} The name of the field.
     */
    getName(): string;

    /**
     * Gets the table name for a reference element.
     * @returns {string} The table name of the reference
     */
    getReferenceTable(): string;

    /**
     * Gets a GlideRecord object for a given reference element.
     * @returns {GlideRecord} The GlideRecord object
     */
    getRefRecord(): GlideRecord;

    /**
     * Gets the name of the table on which the field resides.
     * @returns {string} Name of the table. The returned value may be different from the table Class that the record is in. See Tables and Classes in the product documentation.
     */
    getTableName(): string;

    /**
     * Determines if a field is null.
     * @returns {boolean} True if the field is null or an empty string, false if not.
     */
    nil(): boolean;

    /**
     * Sets the value of a date/time element to the specified number of milliseconds since January 1, 1970 00:00:00 GMT.
     * @param {number} milliseconds Number of milliseconds since 1/1/1970.
     */
    setDateNumericValue(milliseconds: number): void;

    /**
     * Sets the display value of the field.
     * @param {*} value The value to set for the field.
     */
    setDisplayValue(value: any): void;

    /**
     * Adds an error message.
     * @param {string} errorMessage The error message.
     */
    setError(errorMessage: string): void;

    /**
     * Sets the value of a field.
     * @param {*} value Object value to set the field to.
     */
    setValue(value: any): void;

    /**
     * Converts the value to a string.
     * @returns {string} The value as a string
     */
    toString(): string;
}
declare class GlideDBI  {
	close(): void;
	compactTable(tableName: string): void;
	constructor(identifierQuoter: any);
	dropIndex(tableName: string, element: string): string;
	executeProcedure(procName: string, inputs: Array<any>, outputs: Array<any>, map: Array<number>, types: Array<number>): any;
	executeStatementViaJS(sql: string): any;
	getAcceptableNameForDB(baseName: string, childName: string): string;
	getConnectionStringViaJS(): string;
	getDatabaseName(): string;
	getDatabaseProductVersion(): string;
	getDatabaseVersion(): number;
	getDriverName(): string;
	getDriverVersion(): string;
	getPasswordViaJS(): string;
	getQuotedIdentifier(identifier: string): string;
	getRDBMS(): string;
	getURLViaJS(): string;
	getUserViaJS(): string;
	isMySQL(): boolean;
	isOracle(): boolean;
	isSqlServer(): boolean;
	tableDropViaJS(name: string): void;
	truncateTableViaJS(name: string): boolean;
}
declare class GlideAttributes  {
	// constructor(attributes: string);
	// constructor();
	constructor(attributes?: string);
	containsAttribute(attribute: string): boolean;
	getAttribute(attribute: string): string;
	removeAttribute(attribute: string): string;
	serializeAttributes(): string;
	setAttribute(key: string, value: string): void;
}
declare class GlideElementDescriptor  {
	canAvg(): boolean;
	canMax(): boolean;
	canMin(): boolean;
	canSum(): boolean;
	// constructor();
	// constructor(name: string, jdbcType: number);
	// constructor(name: string, jdbcType: number, length: number);
	// constructor(name: string, type_1: string, length: number);
	// constructor(is: any, unusedSignatureVariable: boolean);
	// constructor(dbi: GlideDBI, dictionaryTableName: any, columnMetadata: any, elementMetadata: any);
	// constructor(rsmd: any, i: number);
	// constructor(e: any, tableName: string);
	// constructor(r: any);
	constructor(name_OR_is_OR_dbi_OR_rsmd_OR_e_OR_r?: string|any|GlideDBI, jdbcType_OR_type_1_OR_unusedSignatureVariable_OR_dictionaryTableName_OR_i_OR_tableName?: number|string|boolean|any, length_OR_columnMetadata?: number|any, elementMetadata?: any);
	getAttachmentEncryptionType(): string;
	getAttribute(name: string): string;
	// getBooleanAttribute(attribute: string, def: boolean): boolean;
	// getBooleanAttribute(attribute: string): boolean;
	getBooleanAttribute(attribute: string, def?: boolean): boolean;
	getChoice(): number;
	getChoiceTable(): string;
	getColumnName(): string;
	getDefault(): string;
	getDependent(): string;
	getDirectAttribute(name: string): string;
	getEncryptionType(): string;
	getFirstTableName(): string;
	getHint(): string;
	getInternalType(): string;
	getLabel(): string;
	getLength(): number;
	getName(): string;
	getPlural(): string;
	getReference(): string;
	getReferenceKey(): string;
	getReferenceQualifier(): string;
	getScopeID(): string;
	getSqlLength(): number;
	getTableName(): string;
	getTableNameFromJS(): string;
	getType(): number;
	getUniqueID(): string;
	hasAttachmentsEncrypted(): boolean;
	hasAttribute(attribute: string): boolean;
	isAutoOrSysID(): boolean;
	isBoolean(): boolean;
	isChoiceTable(): boolean;
	isDateOnly(): boolean;
	isDateType(): boolean;
	isDisplay(): boolean;
	isDuration(): boolean;
	isEdgeEncryptable(): boolean;
	isEdgeEncrypted(): boolean;
	isEncrypted(): boolean;
	isFirstTableName(): boolean;
	isInDatabase(): boolean;
	isJournal(): boolean;
	isJournalList(): boolean;
	isList(): boolean;
	isMandatory(): boolean;
	isMetricType(): boolean;
	isMultiText(): boolean;
	isNumber(): boolean;
	isObject(): boolean;
	isReadOnly(): boolean;
	isReference(): boolean;
	isString(): boolean;
	isTimeType(): boolean;
	isTrulyNumber(): boolean;
	isVirtual(): boolean;
	mergeAttributesWithTables(): GlideAttributes;
	serializeAttributes(): string;
	setInternalType(s: string): void;
	setIsReference(b: boolean): void;
	setName(name: string): void;
	toSQLType(dbi: GlideDBI): string;
	toString(): string;
	toXML(): any;
}
declare let gs: GlideSystem;
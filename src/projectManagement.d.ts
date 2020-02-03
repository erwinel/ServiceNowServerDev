/// <reference path="base.d.ts" />

/**
 * "ttb"="Transform business"; "gtb"="Grow business"; "rtb"="Run business"
 */
declare type PortfolioCategory = "ttb" | "gtb" | "rtb";

/**
 * GlideElement values from the Portfolio table.
 * @interface pm_portfolioFields
 */
declare interface pm_portfolioFields extends IGlideTableProperties {
	/**
	 * Active
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof pm_portfolioFields
	 */
	active: $$rhino.Nilable<$$property.Boolean>;
	/**
	 * Category
	 * @type {$$rhino.Nilable<$$property.generic.Element<PortfolioCategory>>}
	 * @memberof pm_portfolioFields
	 */
	category: $$rhino.Nilable<$$property.generic.Element<PortfolioCategory>>;
	/**
	 * Description
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_portfolioFields
	 */
	description: $$rhino.Nilable<$$property.Element>;
	/**
	 * Name
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_portfolioFields
	 */
	name: $$rhino.Nilable<$$property.Element>;
	/**
	 * Portfolio manager
	 * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
	 * @memberof pm_portfolioFields
	 * @description Reference to User ($$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>)
	 */
	portfolio_manager: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;
	/**
	 * Portfolio planning
	 * @type {IStringBasedGlideElement<("advanced" | "simple")>}
	 * @memberof pm_portfolioFields
	 * @description "advanced"="Advanced"; "simple"="Simple"
	 */
	portfolio_planning: $$rhino.Nilable<$$property.generic.Element<("advanced" | "simple")>>;
	/**
	 * State
	 * @type {IStringBasedGlideElement<("define" | "analyse" | "approve" | "charter")>}
	 * @memberof pm_portfolioFields
	 * @description "define"="Define"; "analyse"="Analyze"; "approve"="Approve"; "charter"="Charter"
	 */
	state: $$rhino.Nilable<$$property.generic.Element<("define" | "analyse" | "approve" | "charter")>>;
	/**
	 * Task type
	 * @type {GlideElement}
	 * @memberof pm_portfolioFields
	 * @description Internal type is "sys_class_name"
	 */
	sys_class_name: GlideElement;
	/**
	 * Created by
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_portfolioFields
	 */
	sys_created_by: $$rhino.Nilable<$$property.Element>;
	/**
	 * Created
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_portfolioFields
	 * @description Internal type is glide_date_time
	 */
	sys_created_on: $$rhino.Nilable<$$property.Element>;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof pm_portfolioFields
	 * @description Internal type is "domain_id"
	 */
	sys_domain: GlideElement;
	/**
	 * Updates
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_portfolioFields
	 * @description Internal type is integer
	 */
	sys_mod_count: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Updated by
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_portfolioFields
	 */
	sys_updated_by: $$rhino.Nilable<$$property.Element>;
	/**
	 * Updated
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_portfolioFields
	 * @description Internal type is glide_date_time
	 */
	sys_updated_on: $$rhino.Nilable<$$property.Element>;
}
declare type pm_portfolioGlideRecord = GlideRecord & pm_portfolioFields;

/**
 * GlideElement values from the Planned Task table.
 * @interface planned_taskFields
 * @extends {ItaskFields}
 */
declare interface planned_taskFields extends taskFields {
	/**
	 * Allow dates outside schedule
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof planned_taskFields
	 */
	allow_dates_outside_schedule: $$rhino.Nilable<$$property.Boolean>;
	/**
	 * Planned benefit
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 * @description Internal type is currency
	 */
	benefits: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Budget cost
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 * @description Internal type is currency
	 */
	budget_cost: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Calculation
	 * @type {IStringBasedGlideElement<("automatic" | "manual")>}
	 * @memberof planned_taskFields
	 * @description "automatic"="Automatic"; "manual"="Manual"
	 */
	calculation_type: $$rhino.Nilable<$$property.generic.Element<("automatic" | "manual")>>;
	/**
	 * Planned Capital
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 * @description Internal type is currency
	 */
	capex_cost: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Total Planned cost
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 * @description Internal type is currency
	 */
	cost: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Critical path
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof planned_taskFields
	 */
	critical_path: $$rhino.Nilable<$$property.Boolean>;
	/**
	 * Dependency
	 * @type {GlideElement}
	 * @memberof planned_taskFields
	 * @description Internal type is "decoration"
	 */
	dependency: GlideElement;
	/**
	 * Planned duration
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 * @description Internal type is glide_duration
	 */
	duration: $$rhino.Nilable<$$property.Element>;
	/**
	 * Planned effort
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 * @description Internal type is glide_duration
	 */
	effort: $$rhino.Nilable<$$property.Element>;
	/**
	 * Planned end date
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 * @description Internal type is glide_date_time
	 */
	end_date: $$rhino.Nilable<$$property.Element>;
	/**
	 * End date derived from
	 * @type {$$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>}
	 * @memberof planned_taskFields
	 * @description Reference to Planned Task ($$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>)
	 */
	end_date_derived_from: $$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>;
	/**
	 * HTML description
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 * @description Internal type is html
	 */
	html_description: $$rhino.Nilable<$$property.Element>;
	/**
	 * Key milestone
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof planned_taskFields
	 */
	key_milestone: $$rhino.Nilable<$$property.Boolean>;
	/**
	 * Level
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 * @description Internal type is integer
	 */
	level: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Milestone
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof planned_taskFields
	 */
	milestone: $$rhino.Nilable<$$property.Boolean>;
	/**
	 * MPP task id
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 * @description Internal type is integer
	 */
	mpp_task_id: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Planned Operating
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 * @description Internal type is currency
	 */
	opex_cost: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Orig sys ID
	 * @type {$$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>}
	 * @memberof planned_taskFields
	 * @description Reference to Planned Task ($$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>)
	 */
	orig_sys_id: $$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>;
	/**
	 * Orig top task ID
	 * @type {$$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>}
	 * @memberof planned_taskFields
	 * @description Reference to Planned Task ($$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>)
	 */
	orig_top_task_id: $$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>;
	/**
	 * Percent complete
	 * @type {GlideElement}
	 * @memberof planned_taskFields
	 * @description Internal type is "percent_complete"
	 */
	percent_complete: GlideElement;
	/**
	 * Phase type
	 * @type {IStringBasedGlideElement<("waterfall" | "agile" | "test")>}
	 * @memberof planned_taskFields
	 * @description "waterfall"="Waterfall"; "agile"="Agile"; "test"="Test"
	 */
	phase_type: $$rhino.Nilable<$$property.generic.Element<("waterfall" | "agile" | "test")>>;
	/**
	 * Relation applied
	 * @type { $$rhino.Nilable<$$property.Reference>}
	 * @memberof planned_taskFields
	 * @description Reference to Planned Task Relationship ($$rhino.Nilable<$$property.generic.Reference<Iplanned_task_rel_planned_taskFields, Iplanned_task_rel_planned_taskGlideRecord>>)
	 */
	relation_applied: $$rhino.Nilable<$$property.Reference>;
	/**
	 * Remaining duration
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 * @description Internal type is glide_duration
	 */
	remaining_duration: $$rhino.Nilable<$$property.Element>;
	/**
	 * Remaining effort
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 * @description Internal type is glide_duration
	 */
	remaining_effort: $$rhino.Nilable<$$property.Element>;
	/**
	 * Resource allocated cost
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 * @description Internal type is currency
	 */
	resource_allocated_cost: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Resource planned cost
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 * @description Internal type is currency
	 */
	resource_planned_cost: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Rollup
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof planned_taskFields
	 */
	rollup: $$rhino.Nilable<$$property.Boolean>;
	/**
	 * Original end date
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 * @description Internal type is glide_date_time
	 */
	schedule_end_date: $$rhino.Nilable<$$property.Element>;
	/**
	 * Original start date
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 * @description Internal type is glide_date_time
	 */
	schedule_start_date: $$rhino.Nilable<$$property.Element>;
	/**
	 * Shadow
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof planned_taskFields
	 */
	shadow: $$rhino.Nilable<$$property.Boolean>;
	/**
	 * Planned start date
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 * @description Internal type is glide_date_time
	 */
	start_date: $$rhino.Nilable<$$property.Element>;
	/**
	 * Start date derived from
	 * @type {$$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>}
	 * @memberof planned_taskFields
	 * @description Reference to Planned Task ($$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>)
	 */
	start_date_derived_from: $$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>;
	/**
	 * Status
	 * @type {IStringBasedGlideElement<("green" | "yellow" | "red")>}
	 * @memberof planned_taskFields
	 * @description "green"="Green"; "yellow"="Yellow"; "red"="Red"
	 */
	status: $$rhino.Nilable<$$property.generic.Element<("green" | "yellow" | "red")>>;
	/**
	 * Sub tree root
	 * @type {$$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>}
	 * @memberof planned_taskFields
	 * @description Reference to Planned Task ($$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>)
	 */
	sub_tree_root: $$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>;
	/**
	 * Task
	 * @type {GlideElement}
	 * @memberof planned_taskFields
	 * @description Internal type is "composite_field"
	 */
	task: GlideElement;
	/**
	 * Generate time cards for top task only
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof planned_taskFields
	 */
	time_card_at_top_task: $$rhino.Nilable<$$property.Boolean>;
	/**
	 * Time constraint
	 * @type {IStringBasedGlideElement<("asap" | "start_on")>}
	 * @memberof planned_taskFields
	 * @description "asap"="Start ASAP"; "start_on"="Start on specific date"
	 */
	time_constraint: $$rhino.Nilable<$$property.generic.Element<("asap" | "start_on")>>;
	/**
	 * Top portfolio
	 * @type {$$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>}
	 * @memberof planned_taskFields
	 * @description Reference to Portfolio ($$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>)
	 */
	top_portfolio: $$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>;
	/**
	 * Top program
	 * @type {$$rhino.Nilable<$$property.generic.Reference<pm_programFields, pm_programGlideRecord>>}
	 * @memberof planned_taskFields
	 * @description Reference to Program ($$rhino.Nilable<$$property.generic.Reference<pm_programFields, pm_programGlideRecord>>)
	 */
	top_program: $$rhino.Nilable<$$property.generic.Reference<pm_programFields, pm_programGlideRecord>>;
	/**
	 * Top task
	 * @type {$$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>}
	 * @memberof planned_taskFields
	 * @description Reference to Planned Task ($$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>)
	 */
	top_task: $$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>;
	/**
	 * Version
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 * @description Internal type is integer
	 */
	version: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * WBS
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 */
	wbs: $$rhino.Nilable<$$property.Element>;
	/**
	 * WBS Order
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 * @description Internal type is integer
	 */
	wbs_order: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Actual cost
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 * @description Internal type is currency
	 */
	work_cost: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Actual duration
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 * @description Internal type is glide_duration
	 */
	work_duration: $$rhino.Nilable<$$property.Element>;
	/**
	 * Actual effort
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 * @description Internal type is glide_duration
	 */
	work_effort: $$rhino.Nilable<$$property.Element>;
}
declare type planned_taskGlideRecord = taskGlideRecord & planned_taskFields;

/**
 * GlideElement values from the Program table.
 * @interface pm_programFields
 * @extends {planned_taskFields}
 */
declare interface pm_programFields extends planned_taskFields {
	/**
	 * Cost Status
	 * @type {IStringBasedGlideElement<("green" | "yellow" | "red")>}
	 * @memberof pm_programFields
	 * @description "green"="Green"; "yellow"="Yellow"; "red"="Red"
	 */
	cost_status: $$rhino.Nilable<$$property.generic.Element<("green" | "yellow" | "red")>>;
	/**
	 * Goals
	 * @type {GlideElement}
	 * @memberof pm_programFields
	 * @description Internal type is "glide_list"
	 */
	goals: GlideElement;
	/**
	 * Planned returns
	 * @type {$$rhino.Nilable<$$property.Currency>}
	 * @memberof pm_programFields
	 * @description Internal type is currency
	 */
	planned_return: $$rhino.Nilable<$$property.Currency>;
	/**
	 * Portfolio
	 * @type {$$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>}
	 * @memberof pm_programFields
	 * @description Reference to Portfolio ($$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>)
	 */
	portfolio: $$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>;
	/**
	 * Program manager
	 * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
	 * @memberof pm_programFields
	 * @description Reference to User ($$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>)
	 */
	program_manager: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;
	/**
	 * Project/Demand Portfolios
	 * @type {GlideElement}
	 * @memberof pm_programFields
	 * @description Internal type is "glide_list"
	 */
	related_portfolios: GlideElement;
	/**
	 * Resource Status
	 * @type {IStringBasedGlideElement<("green" | "yellow" | "red")>}
	 * @memberof pm_programFields
	 * @description "green"="Green"; "yellow"="Yellow"; "red"="Red"
	 */
	resource_status: $$rhino.Nilable<$$property.generic.Element<("green" | "yellow" | "red")>>;
	/**
	 * Risk
	 * @type {IStringBasedGlideElement<("critical" | "high" | "moderate" | "low" | "planning")>}
	 * @memberof pm_programFields
	 * @description "critical"="Critical"; "high"="High"; "moderate"="Moderate"; "low"="Low"; "planning"="Planning"
	 */
	risk: $$rhino.Nilable<$$property.generic.Element<("critical" | "high" | "moderate" | "low" | "planning")>>;
	/**
	 * Planned ROI %
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_programFields
	 * @description Internal type is decimal
	 */
	roi: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Schedule Status
	 * @type {IStringBasedGlideElement<("green" | "yellow" | "red")>}
	 * @memberof pm_programFields
	 * @description "green"="Green"; "yellow"="Yellow"; "red"="Red"
	 */
	schedule_status: $$rhino.Nilable<$$property.generic.Element<("green" | "yellow" | "red")>>;
	/**
	 * Scope Status
	 * @type {IStringBasedGlideElement<("green" | "yellow" | "red")>}
	 * @memberof pm_programFields
	 * @description "green"="Green"; "yellow"="Yellow"; "red"="Red"
	 */
	scope_status: $$rhino.Nilable<$$property.generic.Element<("green" | "yellow" | "red")>>;
	/**
	 * Score
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_programFields
	 * @description Internal type is decimal
	 */
	score: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Risk
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_programFields
	 * @description Internal type is decimal
	 */
	score_risk: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Size
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_programFields
	 * @description Internal type is decimal
	 */
	score_size: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Value
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_programFields
	 * @description Internal type is decimal
	 */
	score_value: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Strategies
	 * @type {GlideElement}
	 * @memberof pm_programFields
	 * @description Internal type is "glide_list"
	 */
	strategic_objectives: GlideElement;
}
declare type pm_programGlideRecord = planned_taskGlideRecord & pm_programFields;

/**
 * GlideElement values from the Goal table.
 * @interface goalFields
 */
declare interface goalFields extends IGlideTableProperties {
	/**
	 * Active
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof goalFields
	 */
	active: $$rhino.Nilable<$$property.Boolean>;
	/**
	 * Actual achievement till date
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof goalFields
	 * @description Internal type is float
	 */
	actual_achievement_till_date: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Comments
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof goalFields
	 */
	comments: $$rhino.Nilable<$$property.Element>;
	/**
	 * Direction
	 * @type {IStringBasedGlideElement<("increase" | "decrease")>}
	 * @memberof goalFields
	 * @description Internal type is choice; "increase"="Maximize"; "decrease"="Minimize"
	 */
	direction: $$rhino.Nilable<$$property.generic.Element<("increase" | "decrease")>>;
	/**
	 * Planned achievement
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof goalFields
	 * @description Internal type is float
	 */
	estimated_achievement: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Goal Indicator
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof goalFields
	 */
	goal_indicator: $$rhino.Nilable<$$property.Element>;
	/**
	 * Owner
	 * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
	 * @memberof goalFields
	 * @description Reference to User ($$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>)
	 */
	goal_owner: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;
	/**
	 * Portfolio
	 * @type {$$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>}
	 * @memberof goalFields
	 * @description Reference to Portfolio ($$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>)
	 */
	portfolio: $$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>;
	/**
	 * Short description
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof goalFields
	 */
	short_description: $$rhino.Nilable<$$property.Element>;
	/**
	 * State
	 * @type {IStringBasedGlideElement<("pending" | "achieved" | "not_achieved")>}
	 * @memberof goalFields
	 * @description "pending"="Pending"; "achieved"="Achieved"; "not_achieved"="Not Achieved"
	 */
	state: $$rhino.Nilable<$$property.generic.Element<("pending" | "achieved" | "not_achieved")>>;
	/**
	 * Status indicator
	 * @type {IStringBasedGlideElement<("red" | "yellow" | "green")>}
	 * @memberof goalFields
	 * @description Internal type is choice; "red"="Red"; "yellow"="Yellow"; "green"="Green"
	 */
	status_indicator: $$rhino.Nilable<$$property.generic.Element<("red" | "yellow" | "green")>>;
	/**
	 * Created by
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof goalFields
	 */
	sys_created_by: $$rhino.Nilable<$$property.Element>;
	/**
	 * Created
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof goalFields
	 * @description Internal type is glide_date_time
	 */
	sys_created_on: $$rhino.Nilable<$$property.Element>;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof goalFields
	 * @description Internal type is "domain_id"
	 */
	sys_domain: GlideElement;
	/**
	 * Domain Path
	 * @type {GlideElement}
	 * @memberof goalFields
	 * @description Internal type is "domain_path"
	 */
	sys_domain_path: GlideElement;
	/**
	 * Updates
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof goalFields
	 * @description Internal type is integer
	 */
	sys_mod_count: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Updated by
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof goalFields
	 */
	sys_updated_by: $$rhino.Nilable<$$property.Element>;
	/**
	 * Updated
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof goalFields
	 * @description Internal type is glide_date_time
	 */
	sys_updated_on: $$rhino.Nilable<$$property.Element>;
	/**
	 * Target
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof goalFields
	 * @description Internal type is float
	 */
	target_value: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Task
	 * @type {$$rhino.Nilable<$$property.generic.Reference<taskFields, taskGlideRecord>>}
	 * @memberof goalFields
	 * @description Reference to Task ($$rhino.Nilable<$$property.generic.Reference<taskFields, taskGlideRecord>>)
	 */
	task: $$rhino.Nilable<$$property.generic.Reference<taskFields, taskGlideRecord>>;
	/**
	 * Unit
	 * @type {$$rhino.Nilable<$$property.Reference>}
	 * @memberof goalFields
	 * @description Reference to Unit (IGlideRefElement<Ipa_unitsGlideRecord>)
	 */
	unit: $$rhino.Nilable<$$property.Reference>;
}
declare type goalGlideRecord = GlideRecord & goalFields;

/**
 * GlideElement values from the Project Task table.
 * @interface pm_project_taskFields
 * @extends {planned_taskFields}
 */
declare interface pm_project_taskFields extends planned_taskFields {
	/**
	 * Rollup dates from stories
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof pm_project_taskFields
	 */
	agile_rollup_dates: $$rhino.Nilable<$$property.Boolean>;
	/**
	 * End Sprint
	 * @type {$$rhino.Nilable<$$property.Reference>}
	 * @memberof pm_project_taskFields
	 * @description Reference to Sprint (IGlideRefElement<Irm_sprintGlideRecord>)
	 */
	end_sprint: $$rhino.Nilable<$$property.Reference>;
	/**
	 * Link
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof pm_project_taskFields
	 */
	link: $$rhino.Nilable<$$property.Boolean>;
	/**
	 * Project
	 * @type {GlideElement}
	 * @memberof pm_project_taskFields
	 * @description Internal type is "composite_field"
	 */
	project: GlideElement;
	/**
	 * Team
	 * @type {$$rhino.Nilable<$$property.Reference>}
	 * @memberof pm_project_taskFields
	 * @description Reference to Team (IGlideRefElement<Iscrum_pp_teamGlideRecord>)
	 */
	scrum_team: $$rhino.Nilable<$$property.Reference>;
	/**
	 * Start Sprint
	 * @type {$$rhino.Nilable<$$property.Reference>}
	 * @memberof pm_project_taskFields
	 * @description Reference to Sprint (IGlideRefElement<Irm_sprintGlideRecord>)
	 */
	start_sprint: $$rhino.Nilable<$$property.Reference>;
	/**
	 * Test plan
	 * @type {$$rhino.Nilable<$$property.Reference>}
	 * @memberof pm_project_taskFields
	 * @description Reference to Test Plan (IGlideRefElement<Itm_test_planGlideRecord>)
	 */
	test_plan: $$rhino.Nilable<$$property.Reference>;
}
declare type pm_project_taskGlideRecord = planned_taskGlideRecord & pm_project_taskFields;

/**
 * GlideElement values from the Project table.
 * @interface pm_projectFields
 * @extends {planned_taskFields}
 */
declare interface pm_projectFields extends planned_taskFields {
	/**
	 * Assumptions
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_projectFields
	 * @description Internal type is html
	 */
	assumptions: $$rhino.Nilable<$$property.Element>;
	/**
	 * Backlog
	 * @type {$$rhino.Nilable<$$property.Reference>}
	 * @memberof pm_projectFields
	 * @description Reference to Personal backlog (IGlideRefElement<Ibacklog_definitionGlideRecord>)
	 */
	backlog_definition: $$rhino.Nilable<$$property.Reference>;
	/**
	 * Barriers
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_projectFields
	 * @description Internal type is html
	 */
	barriers: $$rhino.Nilable<$$property.Element>;
	/**
	 * Business Applications
	 * @type {GlideElement}
	 * @memberof pm_projectFields
	 * @description Internal type is "glide_list"
	 */
	business_applications: GlideElement;
	/**
	 * Business Capabilities
	 * @type {GlideElement}
	 * @memberof pm_projectFields
	 * @description Internal type is "glide_list"
	 */
	business_capabilities: GlideElement;
	/**
	 * Business case
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_projectFields
	 * @description Internal type is html
	 */
	business_case: $$rhino.Nilable<$$property.Element>;
	/**
	 * Business Unit
	 * @type {$$rhino.Nilable<$$property.generic.Reference<business_unitFields, business_unitGlideRecord>>}
	 * @memberof pm_projectFields
	 * @description Reference to Business Unit ($$rhino.Nilable<$$property.generic.Reference<business_unitFields, business_unitGlideRecord>>)
	 */
	business_unit: $$rhino.Nilable<$$property.generic.Reference<business_unitFields, business_unitGlideRecord>>;
	/**
	 * Operating Estimate at completion
	 * @type {$$rhino.Nilable<$$property.Currency>}
	 * @memberof pm_projectFields
	 * @description Internal type is currency
	 */
	capex_forecast_cost: $$rhino.Nilable<$$property.Currency>;
	/**
	 * Demand
	 * @type {$$rhino.Nilable<$$property.Reference>}
	 * @memberof pm_projectFields
	 * @description Reference to Demand (IGlideRefElement<Idmn_demandGlideRecord>)
	 */
	demand: $$rhino.Nilable<$$property.Reference>;
	/**
	 * Department
	 * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>}
	 * @memberof pm_projectFields
	 * @description Reference to Department ($$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>)
	 */
	department: $$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>;
	/**
	 * Discount Rate %
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_projectFields
	 * @description Internal type is decimal
	 */
	discount_rate: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Enablers
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_projectFields
	 * @description Internal type is html
	 */
	enablers: $$rhino.Nilable<$$property.Element>;
	/**
	 * Execution type
	 * @type {IStringBasedGlideElement<("waterfall" | "agile" | "hybrid")>}
	 * @memberof pm_projectFields
	 * @description "waterfall"="Waterfall"; "agile"="Agile"; "hybrid"="Hybrid"
	 */
	execution_type: $$rhino.Nilable<$$property.generic.Element<("waterfall" | "agile" | "hybrid")>>;
	/**
	 * Estimate at completion
	 * @type {$$rhino.Nilable<$$property.Currency>}
	 * @memberof pm_projectFields
	 * @description Internal type is currency
	 */
	forecast_cost: $$rhino.Nilable<$$property.Currency>;
	/**
	 * Goal
	 * @type {$$rhino.Nilable<$$property.generic.Reference<goalFields, goalGlideRecord>>}
	 * @memberof pm_projectFields
	 * @description Reference to Goal ($$rhino.Nilable<$$property.generic.Reference<goalFields, goalGlideRecord>>)
	 */
	goal: $$rhino.Nilable<$$property.generic.Reference<goalFields, goalGlideRecord>>;
	/**
	 * Goals
	 * @type {GlideElement}
	 * @memberof pm_projectFields
	 * @description Internal type is "glide_list"
	 */
	goals: GlideElement;
	/**
	 * Impacted Business Units
	 * @type {GlideElement}
	 * @memberof pm_projectFields
	 * @description Internal type is "glide_list"
	 */
	impacted_business_units: GlideElement;
	/**
	 * Investment Class
	 * @type {IStringBasedGlideElement<("run" | "change")>}
	 * @memberof pm_projectFields
	 * @description "run"="Run"; "change"="Change"
	 */
	investment_class: $$rhino.Nilable<$$property.generic.Element<("run" | "change")>>;
	/**
	 * Investment Type
	 * @type {IStringBasedGlideElement<("cost_reduction" | "end_user_experience" | "legal_and_regulatory" | "revenue_generating" | "service_sustaining" | "strategic_enabler")>}
	 * @memberof pm_projectFields
	 * @description "cost_reduction"="Cost Reduction"; "end_user_experience"="End User Experience"; "legal_and_regulatory"="Legal and Regulatory"; "revenue_generating"="Revenue Generating"; "service_sustaining"="Service Sustaining"; "strategic_enabler"="Strategic Enabler"
	 */
	investment_type: $$rhino.Nilable<$$property.generic.Element<("cost_reduction" | "end_user_experience" | "legal_and_regulatory" | "revenue_generating" | "service_sustaining" | "strategic_enabler")>>;
	/**
	 * In scope
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_projectFields
	 * @description Internal type is html
	 */
	in_scope: $$rhino.Nilable<$$property.Element>;
	/**
	 * Internal rate of return %
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_projectFields
	 * @description Internal type is decimal
	 */
	irr_value: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Net present value
	 * @type {$$rhino.Nilable<$$property.Currency>}
	 * @memberof pm_projectFields
	 * @description Internal type is currency
	 */
	npv_value: $$rhino.Nilable<$$property.Currency>;
	/**
	 * Capital Estimate at completion
	 * @type {$$rhino.Nilable<$$property.Currency>}
	 * @memberof pm_projectFields
	 * @description Internal type is currency
	 */
	opex_forecast_cost: $$rhino.Nilable<$$property.Currency>;
	/**
	 * Out of scope
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_projectFields
	 * @description Internal type is html
	 */
	out_of_scope: $$rhino.Nilable<$$property.Element>;
	/**
	 * Phase
	 * @type {IStringBasedGlideElement<("initiating" | "planning" | "executing" | "delivering" | "closing")>}
	 * @memberof pm_projectFields
	 * @description "initiating"="Initiating"; "planning"="Planning"; "executing"="Executing"; "delivering"="Delivering"; "closing"="Closing"
	 */
	phase: $$rhino.Nilable<$$property.generic.Element<("initiating" | "planning" | "executing" | "delivering" | "closing")>>;
	/**
	 * Portfolio
	 * @type {$$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>}
	 * @memberof pm_projectFields
	 * @description Reference to Portfolio ($$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>)
	 */
	primary_portfolio: $$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>;
	/**
	 * Program
	 * @type {$$rhino.Nilable<$$property.generic.Reference<pm_programFields, pm_programGlideRecord>>}
	 * @memberof pm_projectFields
	 * @description Reference to Program ($$rhino.Nilable<$$property.generic.Reference<pm_programFields, pm_programGlideRecord>>)
	 */
	primary_program: $$rhino.Nilable<$$property.generic.Reference<pm_programFields, pm_programGlideRecord>>;
	/**
	 * Project manager
	 * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
	 * @memberof pm_projectFields
	 * @description Reference to User ($$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>)
	 */
	project_manager: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;
	/**
	 * Project schedule date format
	 * @type {IStringBasedGlideElement<("date_time" | "date")>}
	 * @memberof pm_projectFields
	 * @description "date_time"="Date and Time"; "date"="Date"
	 */
	project_schedule_date_format: $$rhino.Nilable<$$property.generic.Element<("date_time" | "date")>>;
	/**
	 * Project type
	 * @type {IStringBasedGlideElement<("regular" | "workbench")>}
	 * @memberof pm_projectFields
	 * @description "regular"="Regular"; "workbench"="Workbench"
	 */
	project_type: $$rhino.Nilable<$$property.generic.Element<("regular" | "workbench")>>;
	/**
	 * Derive assignee list from resource plan
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof pm_projectFields
	 */
	resources_from_resource_plan: $$rhino.Nilable<$$property.Boolean>;
	/**
	 * Risk
	 * @type {IStringBasedGlideElement<("critical" | "high" | "moderate" | "low" | "planning")>}
	 * @memberof pm_projectFields
	 * @description "critical"="Critical"; "high"="High"; "moderate"="Moderate"; "low"="Low"; "planning"="Planning"
	 */
	risk: $$rhino.Nilable<$$property.generic.Element<("critical" | "high" | "moderate" | "low" | "planning")>>;
	/**
	 * Risk cost
	 * @type {$$rhino.Nilable<$$property.Currency>}
	 * @memberof pm_projectFields
	 * @description Internal type is currency
	 */
	risk_cost: $$rhino.Nilable<$$property.Currency>;
	/**
	 * Risk of not performing
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_projectFields
	 * @description Internal type is html
	 */
	risk_of_not_performing: $$rhino.Nilable<$$property.Element>;
	/**
	 * Risk of performing
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_projectFields
	 * @description Internal type is html
	 */
	risk_of_performing: $$rhino.Nilable<$$property.Element>;
	/**
	 * Planned ROI %
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_projectFields
	 * @description Internal type is decimal
	 */
	roi: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Schedule
	 * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_scheduleFields, cmn_scheduleGlideRecord>>}
	 * @memberof pm_projectFields
	 * @description Reference to Schedule ($$rhino.Nilable<$$property.generic.Reference<cmn_scheduleFields, cmn_scheduleGlideRecord>>)
	 */
	schedule: $$rhino.Nilable<$$property.generic.Reference<cmn_scheduleFields, cmn_scheduleGlideRecord>>;
	/**
	 * Score
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_projectFields
	 * @description Internal type is decimal
	 */
	score: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Risk Score
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_projectFields
	 * @description Internal type is decimal
	 */
	score_risk: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Size Score
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_projectFields
	 * @description Internal type is decimal
	 */
	score_size: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Value Score
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_projectFields
	 * @description Internal type is decimal
	 */
	score_value: $$rhino.Nilable<$$property.Numeric>;
	/**
	 * Strategies
	 * @type {GlideElement}
	 * @memberof pm_projectFields
	 * @description Internal type is "glide_list"
	 */
	strategic_objectives: GlideElement;
	/**
	 * Allow time card reporting on
	 * @type {IStringBasedGlideElement<("project" | "project_task" | "project_project_task" | "no_time_card")>}
	 * @memberof pm_projectFields
	 * @description "project"="Project only"; "project_task"="Project tasks only"; "project_project_task"="Project and project tasks"; "no_time_card"="No time reporting"
	 */
	time_card_preference: $$rhino.Nilable<$$property.generic.Element<("project" | "project_task" | "project_project_task" | "no_time_card")>>;
	/**
	 * Derive time component from planned dates
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof pm_projectFields
	 */
	time_component_from_planned: $$rhino.Nilable<$$property.Boolean>;
	/**
	 * Title
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_projectFields
	 */
	title: $$rhino.Nilable<$$property.Element>;
	/**
	 * Update actual effort from time card
	 * @type {IStringBasedGlideElement<("yes" | "no")>}
	 * @memberof pm_projectFields
	 * @description "yes"="Yes"; "no"="No"
	 */
	update_actual_effort_from_time_card: $$rhino.Nilable<$$property.generic.Element<("yes" | "no")>>;
	/**
	 * Recalculate score on project change
	 * @type {IStringBasedGlideElement<("yes" | "no")>}
	 * @memberof pm_projectFields
	 * @description "yes"="Yes"; "no"="No"
	 */
	update_score_on_value_change: $$rhino.Nilable<$$property.generic.Element<("yes" | "no")>>;
	/**
	 * Planned return
	 * @type {$$rhino.Nilable<$$property.Currency>}
	 * @memberof pm_projectFields
	 * @description Internal type is currency
	 */
	value: $$rhino.Nilable<$$property.Currency>;
}
declare type pm_projectGlideRecord = planned_taskGlideRecord & pm_projectFields;

/**
 * strategic=Strategic; operational=Operational
 */
declare type DemandCategory = "strategic" | "operational";

/**
 * critical=Critical; high=High; moderate=Moderate; low=Low; planning=Planning
 */
declare type DemandRiskLevel = "critical" | "high" | "moderate" | "low" | "planning";

/**
 * change=Change (dependent: operational); enhancement=Enhancement (dependent: strategic); defect=Defect (depedent: operational); project=Project (dependent: strategic)
 */
declare type DemandType = "change" | "enhancement" | "defect" | "project";

/**
 * GlideElement values from the Idea table.
 * @interface dmn_demandFields
 * @extends {taskFields}
*/
declare interface dmn_demandFields extends taskFields {
	/**
	 * Assessment Required
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof dmn_demandFields
	 */
	assessment_required: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Assumptions
     * @type {$$rhino.Nilable<$$property.Element>}
     * @memberof dmn_demandFields
     * @description Internal type is "html"
     */
	assumptions: $$rhino.Nilable<$$property.Element>;

    /**
     * Barriers
     * @type {$$rhino.Nilable<$$property.Element>}
     * @memberof dmn_demandFields
     * @description Internal type is "html"
     */
	barriers: $$rhino.Nilable<$$property.Element>;

    /**
     * Business Applications
     * @type {$$rhino.Nilable<IGlideElement>}
     * @memberof dmn_demandFields
     * @description Internal type is "glide_list"; refers to $$property.generic.Reference<cmdb_ci_business_appFields, cmdb_ci_business_appGlideRecord>
     */
	business_applications: $$rhino.Nilable<IGlideElement>;

    /**
     * Business Capabilities
     * @type {$$rhino.Nilable<IGlideElement>}
     * @memberof dmn_demandFields
     * @description Internal type is "glide_list"; refers to $$property.generic.Reference<cmdb_ci_business_capabilityFields, cmdb_ci_business_capabilityGlideRecord>
     */
	business_capabilities: $$rhino.Nilable<IGlideElement>;

    /**
     * Business case
     * @type {$$rhino.Nilable<$$property.Element>}
     * @memberof dmn_demandFields
     * @description Internal type is "html"
     */
	business_case: $$rhino.Nilable<$$property.Element>;

    /**
     * Business Unit
     * @type {$$rhino.Nilable<$$property.generic.Reference<business_unitFields, business_unitGlideRecord>>}
     * @memberof dmn_demandFields
     */
	business_unit: $$rhino.Nilable<$$property.generic.Reference<business_unitFields, business_unitGlideRecord>>;

    /**
     * Capital budget
     * @type {$$rhino.Nilable<$$property.Currency>}
     * @memberof dmn_demandFields
     */
	capital_budget: $$rhino.Nilable<$$property.Currency>;

    /**
     * Capital expense
     * @type {$$rhino.Nilable<$$property.Currency>}
     * @memberof dmn_demandFields
     */
	capital_outlay: $$rhino.Nilable<$$property.Currency>;

    /**
     * Category
     * @type {$$rhino.Nilable<$$property.generic.Element<DemandCategory>>}
     * @memberof dmn_demandFields
     */
	category: $$rhino.Nilable<$$property.generic.Element<DemandCategory>>;

    /**
     * Change
     * @type {$$rhino.Nilable<$$property.generic.Reference<change_requestFields, change_requestGlideRecord>>}
     * @memberof dmn_demandFields
     */
	change: $$rhino.Nilable<$$property.generic.Reference<change_requestFields, change_requestGlideRecord>>;

    /**
     * Collaborators
     * @type {$$rhino.Nilable<IGlideElement>}
     * @memberof dmn_demandFields
     * @description Internal type is "glide_list"; refers to $$property.generic.Reference<sys_userFields, sys_userGlideRecord>
     */
	collaborators: $$rhino.Nilable<IGlideElement>;

    /**
     * Cost
     * @type {$$rhino.Nilable<$$property.Numeric>}
     * @memberof dmn_demandFields
	 * @description Internal type is "decimal"
     */
	score_cost: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Defect
     * @type {$$rhino.Nilable<IGlideElement>}
     * @memberof dmn_demandFields
     * @description Refers to Defect $$property.generic.Reference<rm_defectFields, rm_defectGlideRecord>
     */
	defect: $$rhino.Nilable<IGlideElement>;

    /**
     * Demand
     * @type {$$rhino.Nilable<$$property.Element>}
     * @memberof dmn_demandFields
     * @description Internal type is "composite_field";
     */
	demand: $$rhino.Nilable<$$property.Element>;

    /**
     * Demand manager
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     * @memberof dmn_demandFields
     */
	demand_manager: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Department
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     * @memberof dmn_demandFields
     */
	department: $$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>;

    /**
     * Discount Rate %
     * @type {$$rhino.Nilable<$$property.Numeric>}
     * @memberof dmn_demandFields
	 * @description Internal type is "decimal"
     */
	discount_rate: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Due date
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     * @memberof dmn_demandFields
	 * @description Internal type is "glide_date"
     */
	requested_by: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Enablers
     * @type {$$rhino.Nilable<$$property.Element>}
     * @memberof dmn_demandFields
     * @description Internal type is "html"
     */
	enablers: $$rhino.Nilable<$$property.Element>;

    /**
     * Enhancement
     * @type {$$rhino.Nilable<IGlideElement>}
     * @memberof dmn_demandFields
     * @description Refers to Enhancement $$property.generic.Reference<rm_enhancementFields, rm_enhancementGlideRecord>
     */
	enhancement: $$rhino.Nilable<IGlideElement>;

    /**
     * Financial benefit
     * @type {$$rhino.Nilable<$$property.Currency>}
     * @memberof dmn_demandFields
     */
	financial_benefit: $$rhino.Nilable<$$property.Currency>;

    /**
     * Financial return
     * @type {$$rhino.Nilable<$$property.Currency>}
     * @memberof dmn_demandFields
     */
	financial_return: $$rhino.Nilable<$$property.Currency>;

    /**
     * Goal
     * @type {$$rhino.Nilable<$$property.generic.Reference<goalFields, goalGlideRecord>>}
     * @memberof dmn_demandFields
     */
	goal: $$rhino.Nilable<$$property.generic.Reference<goalFields, goalGlideRecord>>;

    /**
     * Goals
     * @type {$$rhino.Nilable<IGlideElement>}
     * @memberof dmn_demandFields
     * @description Internal type is "glide_list"; refers to $$property.generic.Reference<goalFields, goalGlideRecord>
     */
	goals: $$rhino.Nilable<IGlideElement>;

    /**
     * Idea
     * @type {$$rhino.Nilable<$$property.generic.Reference<ideaFields, ideaGlideRecord>>}
     * @memberof dmn_demandFields
     */
	idea: $$rhino.Nilable<$$property.generic.Reference<ideaFields, ideaGlideRecord>>;

    /**
     * Impacted Business Units
     * @type {$$rhino.Nilable<IGlideElement>}
     * @memberof dmn_demandFields
     * @description Internal type is "glide_list"; refers to $$property.generic.Reference<business_unitFields, business_unitGlideRecord>
     */
	impacted_business_units: $$rhino.Nilable<IGlideElement>;

    /**
     * In scope
     * @type {$$rhino.Nilable<$$property.Element>}
     * @memberof dmn_demandFields
     * @description Internal type is "html"
     */
	in_scope: $$rhino.Nilable<$$property.Element>;

    /**
     * Internal rate of return %
     * @type {$$rhino.Nilable<$$property.Numeric>}
     * @memberof dmn_demandFields
     * @description Internal type is "decimal"
     */
	irr_value: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Investment Class
     * @type {$$rhino.Nilable<$$property.Element>}
     * @memberof dmn_demandFields
	 * @description Choice from investment_class field in pm_project table;
     */
	investment_class: $$rhino.Nilable<$$property.Element>;

    /**
     * Investment Type
     * @type {$$rhino.Nilable<$$property.Element>}
     * @memberof dmn_demandFields
	 * @description Choice from investment_type field in pm_project table;
     */
	investment_type: $$rhino.Nilable<$$property.Element>;

    /**
     * Labor costs
     * @type {$$rhino.Nilable<$$property.Currency>}
     * @memberof dmn_demandFields
     */
	labor_costs: $$rhino.Nilable<$$property.Currency>;

    /**
     * Net present value
     * @type {$$rhino.Nilable<$$property.Currency>}
     * @memberof dmn_demandFields
     */
	npv_value: $$rhino.Nilable<$$property.Currency>;

    /**
     * Operating budget
     * @type {$$rhino.Nilable<$$property.Currency>}
     * @memberof dmn_demandFields
     */
	operational_budget: $$rhino.Nilable<$$property.Currency>;

    /**
     * Operating expense
     * @type {$$rhino.Nilable<$$property.Currency>}
     * @memberof dmn_demandFields
     */
	operational_outlay: $$rhino.Nilable<$$property.Currency>;

    /**
     * Other costs
     * @type {$$rhino.Nilable<$$property.Currency>}
     * @memberof dmn_demandFields
     */
	other_costs: $$rhino.Nilable<$$property.Currency>;

    /**
     * Out of scope
     * @type {$$rhino.Nilable<$$property.Element>}
     * @memberof dmn_demandFields
     * @description Internal type is "html"
     */
	out_of_scope: $$rhino.Nilable<$$property.Element>;

    /**
     * Portfolio
     * @type {$$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>}
     * @memberof dmn_demandFields
     */
	portfolio: $$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>;

    /**
     * Program
     * @type {$$rhino.Nilable<$$property.generic.Reference<pm_programFields, pm_programGlideRecord>>}
     * @memberof dmn_demandFields
     */
	primary_program: $$rhino.Nilable<$$property.generic.Reference<pm_programFields, pm_programGlideRecord>>;

    /**
     * Project
     * @type {$$rhino.Nilable<$$property.generic.Reference<pm_projectFields, pm_projectGlideRecord>>}
     * @memberof dmn_demandFields
     */
	project: $$rhino.Nilable<$$property.generic.Reference<pm_projectFields, pm_projectGlideRecord>>;

    /**
     * Related Records
     * @type {$$rhino.Nilable<IGlideElement>}
     * @memberof dmn_demandFields
     * @description Internal type is "glide_list"; refers to $$property.generic.Reference<taskFields, taskGlideRecord>
     */
	related_records: $$rhino.Nilable<IGlideElement>;

    /**
     * Resource allocated cost
     * @type {$$rhino.Nilable<$$property.Currency>}
     * @memberof dmn_demandFields
     */
	resource_allocated_cost: $$rhino.Nilable<$$property.Currency>;

    /**
     * Resource planned cost
     * @type {$$rhino.Nilable<$$property.Currency>}
     * @memberof dmn_demandFields
     */
	resource_planned_cost: $$rhino.Nilable<$$property.Currency>;

    /**
     * Risk
     * @type {$$rhino.Nilable<$$property.Numeric>}
     * @memberof dmn_demandFields
     * @description Internal type is "decimal"
     */
	score_risk: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Risk Level
     * @type {$$rhino.Nilable<$$property.generic.Element<DemandRiskLevel>>}
     * @memberof dmn_demandFields
     */
	expected_risk: $$rhino.Nilable<$$property.generic.Element<DemandRiskLevel>>;

    /**
     * Risk of not performing
     * @type {$$rhino.Nilable<$$property.Element>}
     * @memberof dmn_demandFields
     * @description Internal type is "html"
     */
	risk_of_not_performing: $$rhino.Nilable<$$property.Element>;

    /**
     * Risk of performing
     * @type {$$rhino.Nilable<$$property.Element>}
     * @memberof dmn_demandFields
     * @description Internal type is "html"
     */
	risk_of_performing: $$rhino.Nilable<$$property.Element>;

    /**
     * ROI %
     * @type {$$rhino.Nilable<$$property.Numeric>}
     * @memberof dmn_demandFields
     * @description Internal type is "decimal"
     */
	expected_roi: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Score
     * @type {$$rhino.Nilable<$$property.Numeric>}
     * @memberof dmn_demandFields
     * @description Internal type is "decimal"
     */
	score: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Size
     * @type {$$rhino.Nilable<$$property.Numeric>}
     * @memberof dmn_demandFields
     * @description Internal type is "decimal"
     */
	score_size: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Stage
     * @type {$$rhino.Nilable<IGlideElement>}
     * @memberof dmn_demandFields
     * @description Internal type is "decoration";
     */
	stage: $$rhino.Nilable<IGlideElement>;

    /**
     * Start date
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     * @memberof dmn_demandFields
	 * @description Internal type is "glide_date"
     */
	start_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Strategic Alignment
     * @type {$$rhino.Nilable<$$property.Numeric>}
     * @memberof dmn_demandFields
     * @description Internal type is "decimal"
     */
	score_strategic_allignment: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Strategies
     * @type {$$rhino.Nilable<IGlideElement>}
     * @memberof dmn_demandFields
     * @description Internal type is "glide_list"; refers to Strategic Objective $$property.generic.Reference<strategic_objectiveFields, strategic_objectiveGlideRecord>
     */
	strategic_objectives: $$rhino.Nilable<IGlideElement>;

    /**
     * Submitted by
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     * @memberof dmn_demandFields
     */
	submitter: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Submitted on
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     * @memberof dmn_demandFields
	 * @description Internal type is "glide_date"
     */
	submitted_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * T-Shirt size
     * @type {$$rhino.Nilable<$$property.generic.Element<"small" | "medium" | "large" | "xlarge" | "xxlarge">>}
     * @memberof dmn_demandFields
	 * @description small=S - Small; medium=M - Medium; large=L - Large; xlarge=XL - Extra Large; xxlarge=XXL - Extra Extra Large
     */
	size: $$rhino.Nilable<$$property.generic.Element<"small" | "medium" | "large" | "xlarge" | "xxlarge">>;

    /**
     * Total planned cost
     * @type {$$rhino.Nilable<$$property.Currency>}
     * @memberof dmn_demandFields
     */
	total_costs: $$rhino.Nilable<$$property.Currency>;

    /**
     * Type
     * @type {$$rhino.Nilable<$$property.generic.Element<DemandType>>}
     * @memberof dmn_demandFields
     */
	type: $$rhino.Nilable<$$property.generic.Element<DemandType>>;

    /**
     * Value
     * @type {$$rhino.Nilable<$$property.Numeric>}
     * @memberof dmn_demandFields
     * @description Internal type is "decimal"
     */
	score_value: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Visited States
     * @type {$$rhino.Nilable<$$property.Element>}
     * @memberof dmn_demandFields
     */
	visited_state: $$rhino.Nilable<$$property.Element>;

}
declare type dmn_demandGlideRecord = taskGlideRecord & dmn_demandFields;

/**
 * GlideElement values from the Idea table.
 * @interface ideaFields
 * @extends {taskFields}
*/
declare interface ideaFields extends taskFields {

    /**
     * Business Applications
     * @type {$$rhino.Nilable<IGlideElement>}
     * @memberof ideaFields
     * @description Internal type is "glide_list"; refers to $$property.generic.Reference<cmdb_ci_business_appFields, cmdb_ci_business_appGlideRecord>
     */
	business_applications: $$rhino.Nilable<IGlideElement>;

    /**
     * Business Capabilities
     * @type {$$rhino.Nilable<IGlideElement>}
     * @memberof ideaFields
     * @description Internal type is "glide_list"; refers to $$property.generic.Reference<cmdb_ci_business_capabilityFields, cmdb_ci_business_capabilityGlideRecord>
     */
	business_capabilities: $$rhino.Nilable<IGlideElement>;

    /**
     * Business Unit
     * @type {$$rhino.Nilable<$$property.generic.Reference<business_unitFields, business_unitGlideRecord>>}
     * @memberof ideaFields
     */
	business_unit: $$rhino.Nilable<$$property.generic.Reference<business_unitFields, business_unitGlideRecord>>;

    /**
     * Collaborators
     * @type {$$rhino.Nilable<IGlideElement>}
     * @memberof ideaFields
     * @description Internal type is "glide_list"; refers to $$property.generic.Reference<sys_userFields, sys_userGlideRecord>
     */
	collaborators: $$rhino.Nilable<IGlideElement>;

    /**
     * Demand
     * @type {$$rhino.Nilable<$$property.generic.Reference<dmn_demandFields, dmn_demandGlideRecord>>}
     * @memberof ideaFields
     */
	demand: $$rhino.Nilable<$$property.generic.Reference<dmn_demandFields, dmn_demandGlideRecord>>;

    /**
     * Demand
     * @type {$$rhino.Nilable<$$property.Element>}
     * @memberof ideaFields
     * @description Internal type is "composite_field";
     */
	demand_composite: $$rhino.Nilable<$$property.Element>;

    /**
     * Department
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     * @memberof ideaFields
     */
	department: $$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>;

    /**
     * Description
     * @type {$$rhino.Nilable<$$property.Element>}
     * @memberof ideaFields
     * @description Internal type is "html"
     */
	business_case: $$rhino.Nilable<$$property.Element>;

    /**
     * Idea
     * @type {$$rhino.Nilable<$$property.Element>}
     * @memberof ideaFields
     * @description Internal type is "composite_field";
     */
	idea: $$rhino.Nilable<$$property.Element>;

    /**
     * Impacted Business Units
     * @type {$$rhino.Nilable<IGlideElement>}
     * @memberof ideaFields
     * @description Internal type is "glide_list"; refers to $$property.generic.Reference<business_unitFields, business_unitGlideRecord>
     */
	impacted_business_units: $$rhino.Nilable<IGlideElement>;

    /**
     * Stage
     * @type {$$rhino.Nilable<IGlideElement>}
     * @memberof ideaFields
     * @description Internal type is "decoration";
     */
	stage: $$rhino.Nilable<IGlideElement>;

    /**
     * Submitted by
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     * @memberof dmn_demandFields
     */
	submitter: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

}
declare type ideaGlideRecord = taskGlideRecord & ideaFields;
declare type SystemPropertyType = "string" | "color" | "timezone";
declare let worker: GlideScriptedProgressWorker;
interface SystemPropertyDefinition {
    name: string;
    type: SystemPropertyType;
    description: string;
    sys_package: string;
    prod: string;
    test: string;
    dev: string;
    sb: string;
}
declare class ArmySystemInit {
    sys_properties: SystemPropertyDefinition[];
    intialize(): void;
    process(stage: string | null | undefined, ...pluginIds: string[]): void;
}

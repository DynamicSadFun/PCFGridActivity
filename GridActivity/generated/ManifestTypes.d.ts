/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    entityName: ComponentFramework.PropertyTypes.StringProperty;
    lookupName: ComponentFramework.PropertyTypes.StringProperty;
    parentName: ComponentFramework.PropertyTypes.StringProperty;
    ActiveOnly: ComponentFramework.PropertyTypes.EnumProperty<"0" | "1">;
    dataSet: ComponentFramework.PropertyTypes.DataSet;
}
export interface IOutputs {
}

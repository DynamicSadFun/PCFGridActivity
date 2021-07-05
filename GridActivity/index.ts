import {IInputs, IOutputs} from "./generated/ManifestTypes";
import './js/jquery-3.5.1.js';
import './js/jquery.dataTables.js';
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;

type DataSet = ComponentFramework.PropertyTypes.DataSet;
// Define const here
const RowRecordId: string = "rowRecId";
const RowEntityName: string = "entityName";
const activitiesTable: string = "#activitiesTable";
const timeOutForLoading: number = 100;
const pageSize: number = 5000;
var $  = require( 'jquery' );

export class GridActivity implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _contextObj: ComponentFramework.Context<IInputs>;
	// Div element created as part of this control's main container
	private _mainContainer: HTMLDivElement;
	private _htmlTable: HTMLTableElement;
	/**
	 * Empty constructor.
	 */
	constructor() { }

	/**
	 * Get sorted columns on view, columns are sorted by DataSetInterfaces.Column.order
	 * Property-set columns will always have order = -1.
	 * In Model-driven app, the columns are ordered in the same way as columns defined in views.
	 * In Canvas-app, the columns are ordered by the sequence fields added to control
	 * Note that property set columns will have order = 0 in test harness, this is a bug.
	 * @param context
	 * @return sorted columns object on View
	 */
	private getSortedColumnsOnView(context: ComponentFramework.Context<IInputs>): DataSetInterfaces.Column[] {
		if (!context.parameters.dataSet.columns) {
			return [];
		}
		let columns = context.parameters.dataSet.columns;
		return columns;
	}

	private tableStyleInitialize(table: any): void {
		table = $(activitiesTable).DataTable({
			paging: true,
			scrollX: true,
			lengthChange : true,
			searching: true,
			ordering: true
		});
	}

	private loadDone(): void {
		// This problem arises due to the fact that first the native data is loaded, and then the child data is loaded. Need to fix it.
		let table;
		if ( $.fn.dataTable.isDataTable(activitiesTable) ) {
			$(activitiesTable).dataTable().fnDestroy();
			this.tableStyleInitialize(table);
		}
		else {
			this.tableStyleInitialize(table);
		}
	}

	private createTD(text: string, tableRow: HTMLTableRowElement): void {
		let td: any = document.createElement("td");
		td.innerText = text;
		tableRow.appendChild(td);
	}

	private createTableHeader(columnsOnView: DataSetInterfaces.Column[]): HTMLTableSectionElement {
		let tableHeader: HTMLTableSectionElement = document.createElement("thead");
		let tableHeaderRow: HTMLTableRowElement = document.createElement("tr");
		columnsOnView.forEach(function (columnItem, index) {
			let tableHeaderCell = document.createElement("th");
			let columnDisplayName: string;
			columnDisplayName = columnItem.displayName;
			tableHeaderCell.innerText = columnDisplayName;
			tableHeaderRow.appendChild(tableHeaderCell);
		});
		tableHeader.appendChild(tableHeaderRow);
		return tableHeader;
	}

	private getOtherRecords(instance: GridActivity, columnsOnView: DataSetInterfaces.Column[], tableBody: HTMLTableSectionElement) {
		let param: IInputs = this._contextObj.parameters;
		let results = [] as any;
		let formatValue = "@OData.Community.Display.V1.FormattedValue";

		var arrayEntity = param.entityName.raw!.split(',');
		var arrayLookup = param.lookupName.raw!.split(',');
		var arrayName = param.parentName.raw!.split(',');

		let entityLookupCondition = arrayEntity.length != arrayLookup.length;
		let entityArrayNameCondition = arrayEntity.length != arrayName.length;
		let lookupArrayNameCondition = arrayLookup.length != arrayName.length;

		if(entityLookupCondition || entityArrayNameCondition || lookupArrayNameCondition) {
			throw new Error("The array of entities must match the number of elements with the array of fields and array of parent names!");
		}

		// filter for Active rows
		let stateCodeFilter = param.ActiveOnly.raw == "1" ? "(statecode eq 0) and " : "";
		let fields = columnsOnView.map(x => x['name']).toString().replace("regardingobjectid,",""); // except regarding for correct oData-query
		arrayEntity.forEach((entityName, index) => {
			let regarding = "regardingobjectid_";
			// TODO: Think about the brevity and compactness of the query, as well as auto-extracting metadata.
			let query = "?$select=" + fields + 
						"&$expand=" + regarding + entityName.trim() + 
						"($select=" + arrayName[index].trim() + 
						")&$filter=" + stateCodeFilter + "(" + regarding + entityName.trim() + 
						"/_" + arrayLookup[index].trim() + 
						"_value eq " + (<any>this._contextObj.mode).contextInfo.entityId + ")";
			
			this._contextObj.webAPI.retrieveMultipleRecords("activitypointer", query).then(
				function success(arrayRes) {
					results = arrayRes.entities;//.filter((k: any) => k["regardingobjectid_" + entityName.trim() + ""] != null);
					for (var i = 0; i < results.length; i++) {
						var currentResult = results[i];
						let tableRecordRow: HTMLTableRowElement = document.createElement("tr");
						tableRecordRow.addEventListener("click", instance.clickActivity.bind(instance));
						tableRecordRow.setAttribute(RowRecordId, currentResult["activityid"]);
						tableRecordRow.setAttribute(RowEntityName, currentResult["activitytypecode"]);
								
						try {
							let dueDate = currentResult["scheduledend"] != null ?
										(new Date(currentResult["scheduledend"]).toLocaleString()).replace(',', '') :
										"";
							instance.createTD(currentResult["subject"], tableRecordRow);							
							instance.createTD(currentResult[regarding.concat(entityName.trim())][arrayName[index].trim()], tableRecordRow);
							instance.createTD(currentResult["activitytypecode".concat(formatValue)], tableRecordRow);					
							instance.createTD(currentResult["statecode".concat(formatValue)], tableRecordRow);					
							instance.createTD(currentResult["prioritycode".concat(formatValue)], tableRecordRow);	
							instance.createTD(dueDate, tableRecordRow);	
							instance.createTD(currentResult["instancetypecode".concat(formatValue)], tableRecordRow);	
							instance.createTD(currentResult["community"], tableRecordRow);	
							
							// done
							tableBody.appendChild(tableRecordRow);
						}
						catch(error) {
							alert(error);
						}
					}
				},	
				function(error) {
					alert(error.message);
				}
			).then(
				function style() {
					setTimeout(() => instance.loadDone(), timeOutForLoading);
				}
			);
		});
	}

	private createTableBody(columnsOnView: DataSetInterfaces.Column[], gridParam: DataSet): HTMLTableSectionElement {
		let instance: GridActivity = this;
		let tableBody: HTMLTableSectionElement = document.createElement("tbody");
		tableBody.id = "activitiesTbody";
		
		let sortedCondition = gridParam.sortedRecordIds.length > 0;
		if (sortedCondition) {
			// get only top 10
			for (let currentRecordId of gridParam.sortedRecordIds) {
				let entityReference = <any>gridParam.records[currentRecordId].getNamedReference();
				let tableRecordRow: HTMLTableRowElement = document.createElement("tr");
				tableRecordRow.addEventListener("click", instance.clickActivity.bind(instance));
				// the nuances of working with the design of links to records:
				// https://powerusers.microsoft.com/t5/Power-Apps-Pro-Dev-ISV/Table-Grid-Dataset-Component-Sample/m-p/397886#M1174
				tableRecordRow.setAttribute(RowRecordId, entityReference.id);
				tableRecordRow.setAttribute(RowEntityName, entityReference.entityType);
				columnsOnView.forEach(function (columnItem, index) {
					let tableRecordCell = document.createElement("td");
					// Currently there is a bug in canvas preventing retrieving value using alias for property set columns.
					// In this component, I use the column's actual column name to retrieve the formatted value to work around the issue
					// columnItem.alias should be used after bug is addressed
					tableRecordCell.innerText = gridParam.records[currentRecordId].getFormattedValue(columnItem.name);
					tableRecordRow.appendChild(tableRecordCell);
				});
				tableBody.appendChild(tableRecordRow);
			}
		}

		this.getOtherRecords(instance, columnsOnView, tableBody);
		return tableBody;
	}

	private clickActivity(event: Event): void {
		let rowElement = (event.currentTarget as HTMLTableRowElement);
		let rowRecordId = rowElement.getAttribute(RowRecordId);
		let rowEntityName = rowElement.getAttribute(RowEntityName);
		if (rowRecordId && rowEntityName) {
			let entityFormOptions = {
				entityName: rowEntityName,
				entityId: rowRecordId
		  	};
		  	this._contextObj.navigation.openForm(entityFormOptions);
		}
	  }

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
	{	
		this._mainContainer = container;
	}

	public DrawTable(context: ComponentFramework.Context<IInputs>): void {
		let dataSet = context.parameters.dataSet;
		if (!dataSet.loading) {
			// Get sorted columns on View
			let columnsOnView = this.getSortedColumnsOnView(context);
			if (!columnsOnView || columnsOnView.length === 0) {
				return;
			}
			if (dataSet.paging != null) {
				// be default this function get only top 10 rows, we need this one:
				// https://www.inogic.com/blog/2019/09/get-all-the-records-of-dataset-grid-control-swiftly/
				// https://powerusers.microsoft.com/t5/Power-Apps-Pro-Dev-ISV/BUG-Dataset-paging-problem/td-p/341586
				dataSet.paging.setPageSize(pageSize); // set any count for showing your rows
				dataSet.paging.loadNextPage();
				// When new data is received, it needs to first remove the table element, allowing it to properly render a table with updated data
				// This only needs to be done on elements having child elements which is tied to data received from canvas/model 
				while (this._htmlTable.firstChild) {
					this._htmlTable.removeChild(this._htmlTable.firstChild);
				}
				this._htmlTable.appendChild(this.createTableHeader(columnsOnView));
				this._htmlTable.appendChild(this.createTableBody(columnsOnView, dataSet)); 
			}
		}
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		this._mainContainer.innerHTML = "";
		this._htmlTable = document.createElement("table");
		this._htmlTable.id = "activitiesTable";
		this._htmlTable.setAttribute("class", "display");
		this._htmlTable.style.width = "100%";	

		try {
			this._contextObj = context;
			this.DrawTable(context);	
		}
		catch(error) {
			alert(error);
		}

		this._mainContainer.appendChild(this._htmlTable);
	}

	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}

}

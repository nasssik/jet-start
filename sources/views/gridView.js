import {JetView} from "webix-jet";

export default class GridView extends JetView {
	constructor(app, name, data) {
		super(app, name);
		this._gridData = data;
	}

	config() {
		const _ = this.app.getService("locale")._;

		return {
			rows: [
				{
					view: "datatable",
					editable: true,
					editaction: "dblclick",
					localId: "mydatatable",
					autoConfig: true
				},
				{
					view: "toolbar",
					cols: [
						{
							view: "button",
							localId: "addbutton",
							value: _("Add new")
						},
						{
							view: "button",
							localId: "removebutton",
							value: _("Remove selected")
						}
					]
				}
			]
		};
	}

	init() {
		let table = this.$$("mydatatable");
		table.parse(this._gridData);
		this.$$("addbutton").attachEvent("onItemClick", () => {
			this._gridData.add({Name: "New item"});
		});
		this.$$("removebutton").attachEvent("onItemClick", () => {
			let sel = table.getSelectedId();
			if (sel) this._gridData.remove(sel);
		});
	}
}

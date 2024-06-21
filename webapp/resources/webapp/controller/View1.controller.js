sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/core/Fragment",
		"sap/m/MessageToast",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"webapp/webapp/view/jszip",
		"webapp/webapp/view/xlsx",
		"sap/ui/model/Sorter"
	],

	function (Controller, Fragment, MessageToast, JSONModel, Filter, FilterOperator, jszip, xlsx, Sorter) {
		"use strict";

		return Controller.extend("webapp.webapp.controller.View1", {

			onInit: function () {
				var oColumn1 = this.getView().byId("hideColumn1");
				oColumn1.setVisible(!oColumn1.getVisible());
				var oColumn2 = this.getView().byId("hideColumn2");
				oColumn2.setVisible(!oColumn2.getVisible());
				var oColumn3 = this.getView().byId("hideColumn3");
				oColumn3.setVisible(!oColumn3.getVisible());
				var oColumn9 = this.getView().byId("hideColumn4");
				oColumn9.setVisible(!oColumn9.getVisible());
				var oColumn10 = this.getView().byId("hideColumn5");
				oColumn10.setVisible(!oColumn10.getVisible());
				var oColumn11 = this.getView().byId("hideColumn6");
				oColumn11.setVisible(!oColumn11.getVisible());

				var oColumn6 = this.getView().byId("showColumn1");
				oColumn6.setVisible(oColumn6.getVisible());
				var oColumn7 = this.getView().byId("showColumn2");
				oColumn7.setVisible(oColumn7.getVisible());
				var oColumn8 = this.getView().byId("showColumn3");
				oColumn8.setVisible(oColumn8.getVisible());
				var oColumn12 = this.getView().byId("showColumn4");
				oColumn12.setVisible(oColumn12.getVisible());
				var oColumn13 = this.getView().byId("showColumn5");
				oColumn13.setVisible(oColumn13.getVisible());
				var oColumn14 = this.getView().byId("showColumn6");
				oColumn14.setVisible(oColumn14.getVisible());

				this.loadTableData2();
				var oDialogModel = new JSONModel({});
				this.getView().setModel(oDialogModel, "dialogModel");
				var oUserModel = new JSONModel({});
				this.getView().setModel(oUserModel, "oUserModel");
				var that = this;
				$.ajax({
					url: "/xsjs_crud/FetchUsernameDetails.xsjs",
					method: "GET",
					contentType: "application/json",
					success: function (oData) {
						that.getView().getModel("oUserModel").setProperty("/userName", oData.Database_Application_User);
					},
					error: function () {
						MessageToast.show("An error occurred while adding the record. Please try again later.");
					}
				});

			},

			onFiltershipTo_EU: function (oEvent) {
				var table = this.byId("tableId2");
				var binding = table.getBinding("items");
				this._bDescendingSort = !this._bDescendingSort;
				var oSorter = new Sorter("KUNNR", this._bDescendingSort);
				binding.sort(oSorter);
			},
			onFilterprod_EU: function (oEvent) {
				var table = this.byId("tableId2");
				var binding = table.getBinding("items");
				this._bDescendingSort = !this._bDescendingSort;
				var oSorter = new Sorter("MATNR", this._bDescendingSort);
				binding.sort(oSorter);
			},

			onFilterEU_EU: function (oEvent) {
				var table = this.byId("tableId2");
				var binding = table.getBinding("items");
				this._bDescendingSort = !this._bDescendingSort;
				var oSorter = new Sorter("KUNNR_EU", this._bDescendingSort);
				binding.sort(oSorter);
			},

			onFilterEUname_EU: function (oEvent) {
				var table = this.byId("tableId2");
				var binding = table.getBinding("items");
				this._bDescendingSort = !this._bDescendingSort;
				var oSorter = new Sorter("NAME1_EU", this._bDescendingSort);
				binding.sort(oSorter);
			},

			onFilterprodname_EU: function (oEvent) {
				var table = this.byId("tableId2");
				var binding = table.getBinding("items");
				this._bDescendingSort = !this._bDescendingSort;
				var oSorter = new Sorter("MAKTX", this._bDescendingSort);
				binding.sort(oSorter);
			},

			onFiltershname_EU: function (oEvent) {
				var table = this.byId("tableId2");
				var binding = table.getBinding("items");
				this._bDescendingSort = !this._bDescendingSort;
				var oSorter = new Sorter("NAME1", this._bDescendingSort);
				binding.sort(oSorter);
			},

			onFiltercount_EU: function (oEvent) {
				var table = this.byId("tableId2");
				var binding = table.getBinding("items");
				this._bDescendingSort = !this._bDescendingSort;
				var oSorter = new Sorter("COUNT", this._bDescendingSort);
				binding.sort(oSorter);
			},
			onFilterModif_EU: function (oEvent) {
				var table = this.byId("tableId2");
				var binding = table.getBinding("items");
				this._bDescendingSort = !this._bDescendingSort;
				var oSorter = new Sorter("LAST_MODIFIED_USER", this._bDescendingSort);
				binding.sort(oSorter);
			},
			onFilterTime_EU: function (oEvent) {
				var table = this.byId("tableId2");
				var binding = table.getBinding("items");
				this._bDescendingSort = !this._bDescendingSort;
				var oSorter = new Sorter("LAST_MODIFIED_TIMESTAMP", this._bDescendingSort);
				binding.sort(oSorter);
			},
			onFiltershipTo: function (oEvent) {
				var table = this.byId("tableId1");
				var binding = table.getBinding("items");
				this._bDescendingSort = !this._bDescendingSort;
				var oSorter = new Sorter("KUNNR", this._bDescendingSort);
				binding.sort(oSorter);
			},
			onFilterprod: function (oEvent) {
				var table = this.byId("tableId1");
				var binding = table.getBinding("items");
				this._bDescendingSort = !this._bDescendingSort;
				var oSorter = new Sorter("MATNR", this._bDescendingSort);
				binding.sort(oSorter);
			},

			onFilterEU: function (oEvent) {
				var table = this.byId("tableId1");
				var binding = table.getBinding("items");
				this._bDescendingSort = !this._bDescendingSort;
				var oSorter = new Sorter("KUNNR_EU", this._bDescendingSort);
				binding.sort(oSorter);
			},

			onFilterEUname: function (oEvent) {
				var table = this.byId("tableId1");
				var binding = table.getBinding("items");
				this._bDescendingSort = !this._bDescendingSort;
				var oSorter = new Sorter("NAME1_EU", this._bDescendingSort);
				binding.sort(oSorter);
			},

			onFilterprodname: function (oEvent) {
				var table = this.byId("tableId1");
				var binding = table.getBinding("items");
				this._bDescendingSort = !this._bDescendingSort;
				var oSorter = new Sorter("MAKTX", this._bDescendingSort);
				binding.sort(oSorter);
			},

			onFiltershname: function (oEvent) {
				var table = this.byId("tableId1");
				var binding = table.getBinding("items");
				this._bDescendingSort = !this._bDescendingSort;
				var oSorter = new Sorter("NAME1", this._bDescendingSort);
				binding.sort(oSorter);
			},

			onFiltercount: function (oEvent) {
				var table = this.byId("tableId1");
				var binding = table.getBinding("items");
				this._bDescendingSort = !this._bDescendingSort;
				var oSorter = new Sorter("COUNT", this._bDescendingSort);
				binding.sort(oSorter);
			},
			onFilterModif: function (oEvent) {
				var table = this.byId("tableId1");
				var binding = table.getBinding("items");
				this._bDescendingSort = !this._bDescendingSort;
				var oSorter = new Sorter("LAST_MODIFIED_USER", this._bDescendingSort);
				binding.sort(oSorter);
			},
			onFilterTime: function (oEvent) {
				var table = this.byId("tableId1");
				var binding = table.getBinding("items");
				this._bDescendingSort = !this._bDescendingSort;
				var oSorter = new Sorter("LAST_MODIFIED_TIMESTAMP", this._bDescendingSort);
				binding.sort(oSorter);
			},

			onPress: function (oEvent) {
				var oColumn1 = this.getView().byId("hideColumn1");
				oColumn1.setVisible(!oColumn1.getVisible());
				var oColumn2 = this.getView().byId("hideColumn2");
				oColumn2.setVisible(!oColumn2.getVisible());
				var oColumn3 = this.getView().byId("hideColumn3");
				oColumn3.setVisible(!oColumn3.getVisible());

				var oColumn6 = this.getView().byId("showColumn1");
				oColumn6.setVisible(!oColumn6.getVisible());
				var oColumn7 = this.getView().byId("showColumn2");
				oColumn7.setVisible(!oColumn7.getVisible());
				var oColumn8 = this.getView().byId("showColumn3");
				oColumn8.setVisible(!oColumn8.getVisible());
			},
			onPress_EU: function (oEvent) {
				var oColumn1 = this.getView().byId("hideColumn4");
				oColumn1.setVisible(!oColumn1.getVisible());
				var oColumn2 = this.getView().byId("hideColumn5");
				oColumn2.setVisible(!oColumn2.getVisible());
				var oColumn3 = this.getView().byId("hideColumn6");
				oColumn3.setVisible(!oColumn3.getVisible());

				var oColumn6 = this.getView().byId("showColumn4");
				oColumn6.setVisible(!oColumn6.getVisible());
				var oColumn7 = this.getView().byId("showColumn5");
				oColumn7.setVisible(!oColumn7.getVisible());
				var oColumn8 = this.getView().byId("showColumn6");
				oColumn8.setVisible(!oColumn8.getVisible());
			},
			onUpload: function (e) {
				//	var	this.excelData ;
				this._import(e.getParameter("files") && e.getParameter("files")[0]);
			},

			_import: function (file) {
				var that = this;

				if (file && window.FileReader) {
					var reader = new FileReader();
					reader.onload = function (e) {
						var data = e.target.result;
						var workbook = XLSX.read(data, {
							type: 'binary'
						});
						workbook.SheetNames.forEach(function (sheetName) {
							// Here is your object for every sheet in workbook
							that.excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

						});
					};
					reader.onerror = function (ex) {
						console.log(ex);
					};
					reader.readAsBinaryString(file);
				}
			},

			onuploadBtn: function (oEvent) {
				//	var oErrors = {};
				//	var that = this;
				var finalArray = new Array();
				finalArray = this.excelData;
				if (!finalArray.length) {
					sap.m.MessageToast.show("Please upload an XLSX file", {
						duration: 1000,
						my: sap.ui.core.Popup.Dock.CenterCenter,
						at: sap.ui.core.Popup.Dock.CenterCenter
					});
					return;
				}
				var oTableModel = this.getView().getModel("tableModel"); //new JSONModel();
				this.getView().setModel(oTableModel, "tableModel");
				var busyDialog = new sap.m.BusyDialog();
				busyDialog.open();

				function zeroPad(num, numZeros) {
					var n = Math.abs(num);
					var zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
					var zeroString = Math.pow(10, zeros).toString().substr(1);
					if (num < 0) {
						zeroString = '-' + zeroString;
					}

					return zeroString + n;
				}
				for (var i = 0; i < finalArray.length; i++) {
					finalArray[i].ProductId = zeroPad(finalArray[i].ProductId, 18);
					finalArray[i].ShiptoId = zeroPad(finalArray[i].ShiptoId, 10);
					var oEntry = {
						KUNNR: finalArray[i].ShiptoId,
						MATNR: finalArray[i].ProductId,
						KUNNR_EU: finalArray[i]["New EU ID"],
						NAME1_EU: finalArray[i].NewEndUserName,
						MAKTX: finalArray[i]["Product Description"],
						NAME1: finalArray[i]["Ship to Name"],
						COUNT: finalArray[i]["Count of Source"],
						LAST_MODIFIED_USER: this.getView().getModel("oUserModel").getProperty("/userName"),
						LAST_MODIFIED_TIMESTAMP: this.formatDateobjToBackendDateString(new Date())
					};
					$.ajax({
						url: "/xsjs_crud/CUDEu.xsjs?cmd=insertupdate",
						method: "POST",
						contentType: "application/json",
						data: JSON.stringify(oEntry),
						success: function () {
							this.loadTableData();
							busyDialog.close();
							MessageToast.show("Record Added Successfully!");
						}.bind(this),
						error: function () {
							MessageToast.show("An error occurred while adding the record. Please try again later.");
							busyDialog.close();
						}
					});
					$.ajax({
						url: "/xsjs_crud/CUDEu.xsjs?cmd=validate",
						method: "POST",
						contentType: "application/json",
						data: JSON.stringify(oEntry),
						success: function () {
							this.loadTableData();
						}.bind(this)
					});
				}

			},
			onAdd: function () {
				if (!this._oDialog) {
					Fragment.load({
						id: this.getView().getId(),
						name: "webapp.webapp.fragment.AddItemDialog",
						controller: this
					}).then(function (oDialog) {
						this._oDialog = oDialog;
						this.getView().addDependent(this._oDialog);
						this.getView().getModel("dialogModel").setData({});

						this._oDialog.setModel(this.getView().getModel("dialogModel"));

						this._oDialog.open();
						this._oDialog.attachAfterClose(function () {
							this._oDialog.destroy();
							this._oDialog = null;
						}.bind(this));
					}.bind(this));
				} else {
					this._oDialog.open();
				}
			},

			onSave: function () {
				// var oTableModel = this.getView().getModel("tableModel");
				var oDialogModel = this.getView().getModel("dialogModel");
				var oNewItem = oDialogModel.getData();

				if (!oNewItem.KUNNR || !oNewItem.MATNR || !oNewItem.KUNNR_EU || !oNewItem.NAME1_EU || !oNewItem.MAKTX || !oNewItem.NAME1 ||
					!oNewItem.COUNT) {
					MessageToast.show("Please fill in all mandatory fields!");
					return;
				}
				oNewItem.LAST_MODIFIED_USER = this.getView().getModel("oUserModel").getProperty("/userName");
				oNewItem.LAST_MODIFIED_TIMESTAMP = this.formatDateobjToBackendDateString(new Date());
				for (var key in oNewItem) {
					if (oNewItem[key] !== null && typeof oNewItem[key] === "number") {
						oNewItem[key] = oNewItem[key].toString();
					} else if (oNewItem[key] === null) {
						oNewItem[key] = "";
					}
				}
				$.ajax({
					url: "/xsjs_crud/CUDEu.xsjs?cmd=insertupdate",
					method: "POST",
					contentType: "application/json",
					data: JSON.stringify(oNewItem),
					success: function () {
						this.loadTableData();
						oDialogModel.setData({});
						this._oDialog.close();
						MessageToast.show("Record Added Successfully!");
					}.bind(this),
					error: function () {
						MessageToast.show("An error occurred while adding the record. Please try again later.");
					}
				});
			},
			loadTableData: function () {

				var oTableModel = new JSONModel();
				this.getView().setModel(oTableModel, "tableModel");
				var busyDialog = new sap.m.BusyDialog();
				busyDialog.open();
				$.ajax({
					url: "/xsjs_crud/FetchEu2.xsjs",
					method: "GET",
					success: function (data) {
						data = data.map(function (item) {
							return item;
						});
						for (var i = 0; i < data.length; i++) {
							data[i].MATNR = data[i].MATNR.replace(/^0+/, '');
							data[i].KUNNR = data[i].KUNNR.replace(/^0+/, '');
							if (data[i].LAST_MODIFIED_TIMESTAMP !== null) {
								data[i].LAST_MODIFIED_TIMESTAMP = data[i].LAST_MODIFIED_TIMESTAMP.slice(0, 10);
							}
						}
						oTableModel.setData(data);
						busyDialog.close();
					},
					error: function () {
						MessageToast.show("An error occurred while loading the records. Please try again later.");
					}
				});
				var oTableModel2 = new JSONModel();
				this.getView().setModel(oTableModel2, "tableModel2");
				$.ajax({
					url: "/xsjs_crud/FetchEu1.xsjs",
					method: "GET",
					success: function (data) {
						data = data.map(function (item) {
							return item;
						});
						for (var i = 0; i < data.length; i++) {
							data[i].MATNR = data[i].MATNR.replace(/^0+/, '');
							data[i].KUNNR = data[i].KUNNR.replace(/^0+/, '');
							if (data[i].LAST_MODIFIED_TIMESTAMP !== null) {
								data[i].LAST_MODIFIED_TIMESTAMP = data[i].LAST_MODIFIED_TIMESTAMP.slice(0, 10);
							}

						}
						oTableModel2.setData(data);
						busyDialog.close();
					},
					error: function () {
						MessageToast.show("An error occurred while loading the records. Please try again later.");
					}
				});

			},
			loadTableData2: function () {
				var that = this;
				var oTableModel = new JSONModel();
				this.getView().setModel(oTableModel, "tableModel");
				var busyDialog = new sap.m.BusyDialog();
				busyDialog.open();
				/*	$.ajax({
					url: "/xsjs_crud/DeleteEu.xsjs",
						method: "DELETE",
						success: function (data) {}
					});*/
				$.ajax({
					url: "/xsjs_crud/FetchEu2.xsjs",
					method: "GET",
					success: function (data1) {
						data1 = data1.map(function (item1) {
							return item1;
						});
						$.ajax({
							url: "/xsjs_crud/FetchEu.xsjs",
							method: "GET",
							success: function (data) {
								data = data.map(function (item) {
									data1.sort((a, b) => a.MATNR - b.MATNR);
									data.sort((a, b) => a.MATNR - b.MATNR);
									const isSameUser = (data, data1) => data.MATNR === data1.MATNR;
									const onlyInLeft = (left, right, compareFunction) =>
										left.filter(leftValue =>
											!right.some(rightValue =>
												compareFunction(leftValue, rightValue)));

									const onlyInA = onlyInLeft(data, data1, isSameUser);
									if (onlyInA.length !== 0) {
										for (var i = 0; i < onlyInA.length; i++) {
											$.ajax({
												url: "/xsjs_crud/CUDEu.xsjs?cmd=validate",
												method: "POST",
												contentType: "application/json",
												data: JSON.stringify(onlyInA[i]),
												success: function () {
													that.loadTableData();
													busyDialog.close();
												}
											});
										}
									}
									return item;
								});
							}
						});
					}
				});

				that.loadTableData();
				busyDialog.close();
			},

			onCancel: function () {
				this.getView().getModel("dialogModel").setData({});
				this._oDialog.close();
			},
			onEdit: function (oEvent) {
				var oSelectedItem = oEvent.getSource().getParent().getBindingContext("tableModel");
				var oSelectedData = oSelectedItem.getObject();
				this.oOriginalItem = Object.assign({}, oSelectedData);
				var busyDialog = new sap.m.BusyDialog();
				busyDialog.open();
				this.getView().getModel("dialogModel").setData(this.oOriginalItem);

				if (!this._oDialog) {
					Fragment.load({
						id: this.getView().getId(),
						name: "webapp.webapp.fragment.UpdateItemDialog",
						controller: this
					}).then(function (oDialog) {
						this._oDialog = oDialog;
						this.getView().addDependent(this._oDialog);

						if (!this._oDialog.getModel()) {
							this._oDialog.setModel(this.getView().getModel("dialogModel"));
						}

						this._oDialog.open();
						busyDialog.close();
						this._oDialog.attachAfterClose(function () {
							this._oDialog.destroy();
							this._oDialog = null;
						}.bind(this));
					}.bind(this));
				} else {
					this._oDialog.open();
				}
			},
			onUpdate: function () {
				var oTableModel = this.getView().getModel("tableModel");
				var oDialogModel = this.getView().getModel("dialogModel");
				var oUpdatedItem = oDialogModel.getData();
				var that = this;

				if (!oUpdatedItem.KUNNR || !oUpdatedItem.MATNR || !oUpdatedItem.KUNNR_EU || !oUpdatedItem.NAME1_EU || !oUpdatedItem.MAKTX ||
					!oUpdatedItem.NAME1 || !oUpdatedItem.COUNT) {
					MessageToast.show("Please fill in all mandatory fields!");
					return;
				}
				oUpdatedItem.LAST_MODIFIED_USER = this.getView().getModel("oUserModel").getProperty("/userName");
				oUpdatedItem.LAST_MODIFIED_TIMESTAMP = this.formatDateobjToBackendDateString(new Date());
				for (var key in oUpdatedItem) {
					if (typeof oUpdatedItem[key] === "number") {
						oUpdatedItem[key] = oUpdatedItem[key].toString();
					} else if (oUpdatedItem[key] === null) {
						oUpdatedItem[key] = "";
					}
				}

				function zeroPad(num, numZeros) {
					var n = Math.abs(num);
					var zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
					var zeroString = Math.pow(10, zeros).toString().substr(1);
					if (num < 0) {
						zeroString = '-' + zeroString;
					}

					return zeroString + n;
				}
				var aTableData = oTableModel.getData();
				/*	$.ajax({
						url: "/xsjs_crud/CUDEu.xsjs?cmd=Validate_SD",
						method: "GET",
						contentType: "application/json",
						data: JSON.stringify(oUpdatedItem),
						success: function () {*/

				oUpdatedItem.MATNR = zeroPad(oUpdatedItem.MATNR, 18);
				oUpdatedItem.KUNNR = zeroPad(oUpdatedItem.KUNNR, 10);
				$.ajax({
					url: "/xsjs_crud/CUDEu.xsjs?cmd=insertupdate",
					method: "PUT",
					contentType: "application/json",
					data: JSON.stringify(oUpdatedItem),
					success: function () {
						oUpdatedItem.MATNR = oUpdatedItem.MATNR.replace(/^0+/, '');
						oUpdatedItem.KUNNR = oUpdatedItem.KUNNR.replace(/^0+/, '');
						var nIndex = aTableData.findIndex(function (item) {
							return item.MATNR === oUpdatedItem.MATNR;
						});

						oUpdatedItem.MATNR = zeroPad(oUpdatedItem.MATNR, 18);
						oUpdatedItem.KUNNR = zeroPad(oUpdatedItem.KUNNR, 10);
						if (nIndex !== -1) {
							aTableData.splice(nIndex, 1, Object.assign({}, oUpdatedItem));
							oTableModel.setData(aTableData);
							oDialogModel.setData({});
							this.loadTableData();
							var oPanelMenu1 = this.byId("idIconTabBarSeparatorIcon"); // get icon tab bar

							oPanelMenu1.setSelectedKey("mapIcon"); //set active filter with predefined key
							this._oDialog.close();
							MessageToast.show("Record Updated Successfully!");
						} else {
							MessageToast.show("Record not found for update.");
						}
					}.bind(this),
					error: function () {
						MessageToast.show("An error occurred while updating the record. Please try again later.");
					}
				});

				//	}
				//	});
				$.ajax({
					url: "/xsjs_crud/CUDEu.xsjs?cmd=validate",
					method: "POST",
					contentType: "application/json",
					data: JSON.stringify(oUpdatedItem),
					success: function () {
						that.loadTableData();
					}
				});
			},

			onCancelUpdate: function () {
				this.getView().getModel("dialogModel").setData(this.oOriginalItem);
				this._oDialog.close();
			},
			onSearch: function (event) {
				var searchTerm = event.getParameter("query");
				var table = this.byId("tableId1");
				var binding = table.getBinding("items");

				if (searchTerm === "") {
					binding.filter([]);
				} else {
					var oFilterArr = new Filter([
						new Filter("KUNNR", FilterOperator.Contains, searchTerm),
						new Filter("MATNR", FilterOperator.Contains, searchTerm),
						new Filter("KUNNR_EU", FilterOperator.Contains, searchTerm),
						new Filter("NAME1_EU", FilterOperator.Contains, searchTerm),
						new Filter("MAKTX", FilterOperator.Contains, searchTerm),
						new Filter("NAME1", FilterOperator.Contains, searchTerm),
						new Filter("COUNT", FilterOperator.Contains, searchTerm)
					], false);
					binding.filter([oFilterArr]);
				}
			},

			onSearch_EU: function (event) {
				var searchTerm = event.getParameter("query");
				var table = this.byId("tableId2");
				var binding = table.getBinding("items");

				if (searchTerm === "") {
					binding.filter([]);
				} else {
					var oFilterArr = new Filter([
						new Filter("KUNNR", FilterOperator.Contains, searchTerm),
						new Filter("MATNR", FilterOperator.Contains, searchTerm),
						new Filter("KUNNR_EU", FilterOperator.Contains, searchTerm),
						new Filter("NAME1_EU", FilterOperator.Contains, searchTerm),
						new Filter("MAKTX", FilterOperator.Contains, searchTerm),
						new Filter("NAME1", FilterOperator.Contains, searchTerm),
						new Filter("COUNT", FilterOperator.Contains, searchTerm)
					], false);
					binding.filter([oFilterArr]);
				}
			},

			onDelete: function (oEvent) {
				// var oTable = this.byId("tableId1");
				var oSelectedItem = oEvent.getSource().getParent();
				var oContext = oSelectedItem.getBindingContext("tableModel");

				function zeroPad(num, numZeros) {
					var n = Math.abs(num);
					var zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
					var zeroString = Math.pow(10, zeros).toString().substr(1);
					if (num < 0) {
						zeroString = '-' + zeroString;
					}

					return zeroString + n;
				}
				sap.m.MessageBox.confirm("Are you sure you want to delete this record?", {
					title: "Confirmation",
					onClose: function (oAction) {
						if (oAction === sap.m.MessageBox.Action.OK) {
							var oTableModel = this.getView().getModel("tableModel");
							var aTableData = oTableModel.getData();
							var nIndex = aTableData.findIndex(function (item) {
								return JSON.stringify(item) === JSON.stringify(oContext.getProperty());
							});
							if (nIndex !== -1) {

								oContext.getProperty().MATNR = zeroPad(oContext.getProperty().MATNR, 18);
								oContext.getProperty().KUNNR = zeroPad(oContext.getProperty().KUNNR, 10);
								$.ajax({
									url: "/xsjs_crud/CUDEu.xsjs?cmd=delete",
									method: "DELETE",
									contentType: "application/json",
									data: JSON.stringify(oContext.getProperty()),
									success: function () {

										aTableData.splice(nIndex, 1);
										oTableModel.refresh(true);
										MessageToast.show("Record Deleted Successfully!");
										this.loadTableData();
									},
									error: function () {
										MessageToast.show("An error occurred while deleting the record. Please try again later.");
									}
								});
							}
						}
					}.bind(this)
				});
			},

			formatDateobjToBackendDateString: function (oDate) {

				if (!oDate) {

					return "";

				}

				oDate = new Date(oDate);

				var dd = oDate.getDate();

				var MM = oDate.getMonth() + 1;

				var yy = oDate.getFullYear();

				if (dd < 10) {

					dd = "0" + dd;

				}

				if (MM < 10) {

					MM = "0" + MM;

				}

				var newDate = yy + "-" + MM + "-" + dd;

				var hh = oDate.getHours();

				if (hh < 10) {

					hh = "0" + hh;

				}

				hh = hh.toString();

				var mi = oDate.getMinutes();

				if (mi < 10) {

					mi = "0" + mi;

				}

				mi = mi.toString();
				var ss = oDate.getSeconds();
				if (ss < 10) {
					ss = "0" + ss;
				}
				ss = ss.toString();
				var ms = oDate.getMilliseconds();
				if (ms < 100) {
					ms = "0" + ms;
				}
				var time = hh + ":" + mi + ":" + ss + "." + ms;
				newDate = newDate + "T" + time + "Z";
				return newDate;
			}
		});
	});
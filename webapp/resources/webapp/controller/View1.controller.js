sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/core/Fragment",
		"sap/m/MessageToast",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"webapp/webapp/view/jszip",
		"webapp/webapp/view/xlsx"
	],

	function (Controller, Fragment, MessageToast, JSONModel, Filter, FilterOperator, jszip, xlsx) {
		"use strict";

		return Controller.extend("webapp.webapp.controller.View1", {

			onInit: function () {
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
						oTableModel2.setData(data);
						busyDialog.close();
					},
					error: function () {
						MessageToast.show("An error occurred while loading the records. Please try again later.");
					}
				});

			},
			loadTableData2: function () {

				var oTableModel = new JSONModel();
				this.getView().setModel(oTableModel, "tableModel");
				var busyDialog = new sap.m.BusyDialog();
				busyDialog.open();
				$.ajax({
					url: "/xsjs_crud/FetchEu.xsjs",
					method: "GET",
					success: function (data) {
						data = data.map(function (item) {
							$.ajax({
								url: "/xsjs_crud/CUDEu.xsjs?cmd=validate",
								method: "POST",
								contentType: "application/json",
								data: JSON.stringify(item),
								success: function () {}
							});
							return item;
						});
					}
				});
				$.ajax({
					url: "/xsjs_crud/FetchEu2.xsjs",
					method: "GET",
					success: function (data1) {
						data1 = data1.map(function (item1) {
							return item1;
						});
						oTableModel.setData(data1);

						busyDialog.close();
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
						oTableModel2.setData(data);
						busyDialog.close();
					},
					error: function () {
						MessageToast.show("An error occurred while loading the records. Please try again later.");
					}
				});
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
				var aTableData = oTableModel.getData();
				/*	$.ajax({
						url: "/xsjs_crud/CUDEu.xsjs?cmd=Validate_SD",
						method: "GET",
						contentType: "application/json",
						data: JSON.stringify(oUpdatedItem),
						success: function () {*/
				$.ajax({
					url: "/xsjs_crud/CUDEu.xsjs?cmd=insertupdate",
					method: "PUT",
					contentType: "application/json",
					data: JSON.stringify(oUpdatedItem),
					success: function () {
						var nIndex = aTableData.findIndex(function (item) {
							return item.MATNR === oUpdatedItem.MATNR;
						});

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
						this.loadTableData();
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

								$.ajax({
									url: "/xsjs_crud/CUDEu.xsjs?cmd=delete",
									method: "DELETE",
									contentType: "application/json",
									data: JSON.stringify(oContext.getProperty()),
									success: function () {

										aTableData.splice(nIndex, 1);
										oTableModel.refresh(true);
										MessageToast.show("Record Deleted Successfully!");
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
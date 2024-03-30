sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Panel",
    "sap/ui/core/UIComponent",
    "sap/m/MessageBox",
    'sap/ui/export/library',
    "sap/m/Token",
    'sap/ui/export/Spreadsheet',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    'sap/m/p13n/Engine',
    'sap/m/p13n/SelectionController',
    'sap/m/p13n/MetadataHelper',
    'sap/m/table/ColumnWidthController'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Panel, UIComponent, MessageBox, exportLibrary, Token, Spreadsheet, Filter, FilterOperator, Fragment, Engine, SelectionController, MetadataHelper, ColumnWidthController) {
        "use strict";
        var EdmType = exportLibrary.EdmType;
        var that = this;
        var FilterBarCount = 0;
        return Controller.extend("zexim.controller.FrightCapturingReport", {
            onInit: function () {
                this.FilterBarHideFunction();
                this._registerForP13n();
                this.getView().setModel(new sap.ui.model.json.JSONModel, "oTableDataModel");
                UIComponent.getRouterFor(this).getRoute('FrightCapturingReport').attachPatternMatched(this.ScreenRefrash, this);
                var fnValidator = function (args) {
                    var text = args.text.toUpperCase();
                    return new Token({ key: text, text: text });
                };
                this.getView().byId("InvoiceNumber").addValidator(fnValidator);
            },
            FilterBarHideFunction: function () {
                if (FilterBarCount === 0) {
                    this.getView().byId("FilterBarHideShowButton1").setText("Show Filter Bar");
                    this.getView().byId("Form1").setVisible(false);
                    FilterBarCount++;
                } else {
                    this.getView().byId("FilterBarHideShowButton1").setText("Hide Filter Bar");
                    this.getView().byId("Form1").setVisible(true);
                    FilterBarCount--;
                }
            },
            onBeforeRendering: function () {
                this.getView().byId("Page1").setBusy(true)
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZFREGHT_CAP_SERVICE_BIN")
                this.getView().setModel(new sap.ui.model.json.JSONModel, "oTransporterDataModel");
                oModel.read("/Transport_f4", {
                    urlParameters: {
                        "$top": "5000"
                    },
                    success: function (orespo) {
                        // oBusy.close();
                        this.getView().byId("Page1").setBusy(false)
                        this.getView().getModel("oTransporterDataModel").setProperty("/aTransporterData", orespo.results);
                    }.bind(this)
                })
                setTimeout(10000)
            },
            ScreenRefrash: function () {
                var aNewArr = [{
                    "SRN": "1",
                    "InvoiceNumber": "2",
                    "InvoiceDate": "3",
                    // "Product": "4",
                    // "ProductDescription": "5",
                    "DistributionChannel": "5",
                    "InvoiceType": "6",
                    "Buyer": "7",
                    "LrNo": "8",
                    "LrDate": "9",
                    "TransporterName": "10",
                    "GrossWeight": "11",
                    "NetWeight": "12",
                    "InvoiceAmount": "13",
                    "TransporterInvoiceNumber": "14",
                    "TransporterInvoiceDate": "15",
                    "NoOfBox": "16",
                    "TransportCharges": "17",
                    "DetentionatPlant": "18",
                    "DetentionatDestination": "19",
                    "Loading_Unloading": "20",
                    "DoubleDelivery": "21",
                    "LiftonLiftCharges": "22",
                    "TotalCharges": "23",
                    "OtherCharges": "23",
                }, {
                    "SRN": "1111",
                    "InvoiceNumber": "2111",
                    "InvoiceDate": "3111",
                    // "Product": "4111",
                    // "ProductDescription": "5111",
                    "DistributionChannel": "5",
                    "InvoiceType": "6111",
                    "Buyer": "7111",
                    "LrNo": "8111",
                    "LrDate": "9111",
                    "TransporterName": "10111",
                    "GrossWeight": "11111",
                    "NetWeight": "12111",
                    "InvoiceAmount": "13111",
                    "TransporterInvoiceNumber": "14111",
                    "TransporterInvoiceDate": "15111",
                    "NoOfBox": "16111",
                    "TransportCharges": "17111",
                    "DetentionatPlant": "18111",
                    "DetentionatDestination": "19111",
                    "Loading_Unloading": "20111",
                    "DoubleDelivery": "21111",
                    "LiftonLiftCharges": "22111",
                    "OtherCharges": "23",
                    "TotalCharges": "322222222222223",
                },]
                this.getView().getModel("oTableDataModel").setProperty("/aTableData", []);
                this.getView().byId("InvoiceNumber").setValue();
                this.getView().byId("FromInvoiceDate").setValue();
                this.getView().byId("ToInvoiceDate").setValue();
            },
            GetTableData: function () {
                var oBusy = new sap.m.BusyDialog({
                    text: "Please Wait"
                });
                oBusy.open();
                var InvoiceNumber = this.getView().byId("InvoiceNumber").getValue();
                var FromInvoiceDate = this.getView().byId("FromInvoiceDate").getValue();
                var ToInvoiceDate = this.getView().byId("ToInvoiceDate").getValue();
                var TransportarName = this.getView().byId("TransportarName").getValue();
                var aFilters = [];
                var InvoiceNumber = this.getView().byId("InvoiceNumber").getTokens();
                var InvoiceNumber = InvoiceNumber.map(function (oToken) {
                    return oToken.getText();
                });
                InvoiceNumber.sort(function (a, b) {
                    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
                });
                if (InvoiceNumber.length != 0) {
                    InvoiceNumber.map(function (res) {
                        aFilters.push(new sap.ui.model.Filter("invoiceno", "EQ", res));
                    })
                }
                if (FromInvoiceDate != "" && ToInvoiceDate == "") {
                    aFilters.push(new sap.ui.model.Filter("invoicedate", "EQ", FromInvoiceDate));
                }
                if (FromInvoiceDate != "" && ToInvoiceDate != "") {
                    aFilters.push(new sap.ui.model.Filter({ path: "invoicedate", operator: sap.ui.model.FilterOperator.BT, value1: FromInvoiceDate, value2: ToInvoiceDate }))
                }
                if (TransportarName != "") {
                    aFilters.push(new sap.ui.model.Filter("YY1_SalesTransporter_BDH", "EQ", TransportarName));
                }
                var oTableDataModel = this.getView().getModel("oTableDataModel");
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZFREGHT_CAP_SERVICE_BIN")
                var aTableData = [];
                oModel.read("/FREIGHT", {
                    filters: [aFilters],
                    urlParameters: {
                        "$top": "5000"
                    },
                    success: function (oresponse) {
                        oresponse.results.map(function (items, index) {
                            var InvoiceAmount = Number(items.TotalNetAmount) + Number(items.TotalTaxAmount);
                            var InvoiceAmount1 = InvoiceAmount.toString();
                            var obj = {
                                "SRN": "",
                                "InvoiceNumber": items.invoiceno,
                                // "InvoiceDate": invoicedate,
                                // "Product": items.Product,
                                "DistributionChannel": items.DistributionChannel,
                                // "ProductDescription": items.BillingDocumentItemText,
                                "StorageLocation": items.StorageLocation,
                                "InvoiceType": items.BillingDocumentType,
                                "InvoiceQuantity": Number(items.BillingQuantity),
                                "Buyer": items.Customer,
                                "LrNo": items.YY1_LRNumber_BDH,
                                // "LrDate": LrDates,
                                "TransporterName": items.TransporterName,
                                "GrossWeight": Number(items.ItemGrossWeight),
                                "NetWeight": Number(items.ItemNetWeight),
                                "InvoiceAmount": InvoiceAmount1,
                                "TransporterInvoiceNumber": items.TransInvNo,
                                "TransporterInvoiceDate": items.TransInvDat,
                                "TransporterInvoiceDate1": items.TransInvDat1,
                                "LrDate1": items.Lrdate1,
                                "NoOfBox": (items.NumberofBox).toString(),
                                "TransportCharges": items.TransCharges,
                                "DetentionatPlant": items.DetensionPlant,
                                "DetentionatDestination": items.DetensionDestination,
                                "Loading_Unloading": items.Loading,
                                "DoubleDelivery": items.DoubleDelivery,
                                "LiftonLiftCharges": items.LiftCharge,
                                "OtherCharges": items.OtherCharge,
                                "TotalCharges": items.TotalCharge,
                                "GSTCode":items.Gstcode,
                                "TaxType":items.taxtype,
                                "TaxCode":items.Taxcode,
                                "TDSBase":items.Tdsbase,
                            }
                            if (items.invoicedate != "" && items.invoicedate != "NaN" && items.invoicedate != null && items.invoicedate != "0.00" && items.invoicedate != undefined) {
                                const invoiceDate = new Date(items.invoicedate);
                                const invoiceDate1 = `${invoiceDate.getFullYear()}-${invoiceDate.getMonth() + 1 < 10 ? '0' : ''}${invoiceDate.getMonth() + 1}-${invoiceDate.getDate() < 10 ? '0' : ''}${invoiceDate.getDate()}`;
                                obj["InvoiceDate"] = invoiceDate1
                            } else {
                                obj["InvoiceDate"] = ""
                            }
                            if (items.YY1_LRDate_BDH != "" && items.YY1_LRDate_BDH != "NaN" && items.YY1_LRDate_BDH != null && items.YY1_LRDate_BDH != "0.00" && items.YY1_LRDate_BDH != undefined) {
                                const lrDate = new Date(items.YY1_LRDate_BDH);
                                const lrDate1 = `${lrDate.getFullYear()}-${lrDate.getMonth() + 1 < 10 ? '0' : ''}${lrDate.getMonth() + 1}-${lrDate.getDate() < 10 ? '0' : ''}${lrDate.getDate()}`;
                                obj["LrDate"] = lrDate1;
                            } else {
                                obj["LrDate"] = "";
                            }
                            aTableData.push(obj)
                        })
                        const res = aTableData.reduce((acc, r) => {
                            const found = acc.find(
                                (a) =>
                                    a.SRN == r.SRN &&
                                    a.InvoiceNumber == r.InvoiceNumber &&
                                    a.InvoiceDate == r.InvoiceDate &&
                                    a.GSTCode == r.GSTCode &&
                                    a.TaxType == r.TaxType &&
                                    a.TaxCode == r.TaxCode &&
                                    a.TDSBase == r.TDSBase &&
                                    // a.Product == r.Product &&
                                    // a.ProductDescription == r.ProductDescription &&
                                    a.DistributionChannel == r.DistributionChannel &&
                                    a.InvoiceType == r.InvoiceType &&
                                    a.StorageLocation == r.StorageLocation &&
                                    // a.InvoiceQuantity == r.InvoiceQuantity &&
                                    a.Buyer == r.Buyer &&
                                    a.LrNo == r.LrNo &&
                                    a.LrDate == r.LrDate &&
                                    a.LrDate1 == r.LrDate1 &&
                                    a.TransporterName == r.TransporterName &&
                                    // a.GrossWeight == r.GrossWeight &&
                                    // a.NetWeight == r.NetWeight &&
                                    a.InvoiceAmount == r.InvoiceAmount &&
                                    a.TransporterInvoiceNumber == r.TransporterInvoiceNumber &&
                                    a.TransporterInvoiceDate == r.TransporterInvoiceDate &&
                                    a.TransporterInvoiceDate1 == r.TransporterInvoiceDate1 &&
                                    a.NoOfBox == r.NoOfBox &&
                                    a.TransportCharges == r.TransportCharges &&
                                    a.DetentionatPlant == r.DetentionatPlant &&
                                    a.DetentionatDestination == r.DetentionatDestination &&
                                    a.Loading_Unloading == r.Loading_Unloading &&
                                    a.DoubleDelivery == r.DoubleDelivery &&
                                    a.LiftonLiftCharges == r.LiftonLiftCharges &&
                                    a.TotalCharges == r.TotalCharges &&
                                    a.OtherCharges == r.OtherCharges
                            );
                            if (found) {
                                found.InvoiceQuantity += r.InvoiceQuantity;
                                found.GrossWeight += r.GrossWeight;
                                found.NetWeight += r.NetWeight;
                            } else {
                                acc.push({ ...r }); // Include age in the new object
                            }
                            return acc;
                        }, []);
                        res.map(function (res, ind) {
                            res.SRN = ind + 1;
                        })
                        oBusy.close();

                        oTableDataModel.setProperty("/aTableData", res)
                    }.bind(this)
                })
            },
            SaveTableData: function () {
                var oBusyDialog = new sap.m.BusyDialog({
                    text: "Saving data"
                });
                oBusyDialog.open();
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZFREGHT_CAP_SERVICE_BIN")
                var tabledata = this.getView().getModel("oTableDataModel").getProperty("/aTableData");
                tabledata.map(function (items, index, arr) {
                    var oFilter1 = new sap.ui.model.Filter("Invoiceno", "EQ", items.InvoiceNumber)
                    var obj = {
                        "Invoiceno": items.InvoiceNumber,
                        // "Invoicedate": items.InvoiceDate,
                        // "Product": items.Product,
                        // "Itemtext": items.ProductDescription,
                        "Invoicetype": items.InvoiceType,
                        "Buyer": items.Buyer,
                        "Lrnumber": items.LrNo,
                        // "Lrdate": items.LrDate,
                        "Transportername": items.TransporterName,
                        "GrossWt": (items.GrossWeight).toString(),
                        "NetWt": (items.NetWeight).toString(),
                        "InvoiceAmt": items.InvoiceAmount,
                        "InvoiceQuantity": (items.InvoiceQuantity).toString(),
                        "TransInvNo": items.TransporterInvoiceNumber,
                        // "TransInvDat": items.TransporterInvoiceDate,
                        "NoOfBox": items.NoOfBox,
                        "TransCharges": items.TransportCharges,
                        "DetensionPlant": items.DetentionatPlant,
                        "DetensionDestination": items.DetentionatDestination,
                        "Loading": items.Loading_Unloading,
                        "DoubleDelivery": items.DoubleDelivery,
                        "LiftCharge": items.LiftonLiftCharges,
                        "TotalCharge": (items.TotalCharges).toString(),
                        "OtherCharge": (items.OtherCharges).toString(),
                        "distributionchannel": items.DistributionChannel,
                        "Storagelocation":items.StorageLocation,
                        "Gstcode":items.GSTCode,
                        "taxtype":items.TaxType,
                        "Taxcode":items.TaxCode,
                        "Tdsbase":items.TDSBase,
                    }
                    if (items.InvoiceDate != "" && items.InvoiceDate != null && items.InvoiceDate != undefined && items.InvoiceDate != "NaN") {
                        var InvoiceDate = new Date(items.InvoiceDate);
                        var InvoiceDate1 = new Date(InvoiceDate.getTime() - InvoiceDate.getTimezoneOffset() * 60000);
                        var InvoiceDate2 = InvoiceDate1.toISOString().slice(0, 16);
                        obj["Invoicedate"] = InvoiceDate2;
                    } else {
                        obj["Invoicedate"] = null;
                    }
                    if (items.TransporterInvoiceDate != "" && items.TransporterInvoiceDate != null && items.TransporterInvoiceDate != undefined && items.TransporterInvoiceDate != "NaN") {
                        var TransporterInvoiceDate = new Date(items.TransporterInvoiceDate);
                        var TransporterInvoiceDate1 = new Date(TransporterInvoiceDate.getTime() - TransporterInvoiceDate.getTimezoneOffset() * 60000);
                        var TransporterInvoiceDate2 = TransporterInvoiceDate1.toISOString().slice(0, 16);
                        obj["TransInvDat"] = TransporterInvoiceDate2;
                    } else {
                        obj["TransInvDat"] = null;
                    }
                    if (items.TransporterInvoiceDate1 != "" && items.TransporterInvoiceDate1 != null && items.TransporterInvoiceDate1 != undefined && items.TransporterInvoiceDate1 != "NaN") {
                        var TransporterInvoiceDate1 = new Date(items.TransporterInvoiceDate1);
                        var TransporterInvoiceDate11 = new Date(TransporterInvoiceDate1.getTime() - TransporterInvoiceDate1.getTimezoneOffset() * 60000);
                        var TransporterInvoiceDate21 = TransporterInvoiceDate11.toISOString().slice(0, 16);
                        obj["TransInvDat1"] = TransporterInvoiceDate21;
                    } else {
                        obj["TransInvDat1"] = null;
                    }
                    if (items.LrDate != "" && items.LrDate != null && items.LrDate != undefined && items.LrDate != "NaN") {
                        var LrDate = new Date(items.LrDate);
                        var LrDate1 = new Date(LrDate.getTime() - LrDate.getTimezoneOffset() * 60000);
                        var LrDate2 = LrDate1.toISOString().slice(0, 16);
                        obj["Lrdate"] = LrDate2;
                    } else {
                        obj["Lrdate"] = null;
                    }
                    if (items.LrDate1 != "" && items.LrDate1 != null && items.LrDate1 != undefined && items.LrDate1 != "NaN") {
                        var LrDate1 = new Date(items.LrDate1);
                        var LrDate11 = new Date(LrDate1.getTime() - LrDate1.getTimezoneOffset() * 60000);
                        var LrDate21 = LrDate11.toISOString().slice(0, 16);
                        obj["Lrdate"] = LrDate21;
                    } else {
                        obj["Lrdate"] = null;
                    }
                    oModel.read("/FREIGHTTAB", {
                        filters: [oFilter1],
                        success: function (oresponse) {
                            if (oresponse.results.length > 0) {
                                oModel.update("/FREIGHTTAB(Invoiceno='" + items.InvoiceNumber + "')", obj, {
                                    success: function (oresponse) {
                                        if (index === arr.length - 1) {
                                            MessageBox.success("Data updated")
                                            oBusyDialog.close()
                                        }
                                    }.bind(this),
                                    error: function () {
                                        if (index === arr.length - 1) {
                                            MessageBox.error("Data was not updated")
                                            oBusyDialog.close()
                                        }
                                    }
                                })
                            }
                            else {
                                oModel.create("/FREIGHTTAB", obj, {
                                    success: function (oresponse) {
                                        if (index === arr.length - 1) {
                                            oBusyDialog.close();
                                            MessageBox.success("Data saved")
                                        }
                                    }.bind(this),
                                    error: function (oError) {
                                        if (index === arr.length - 1) {
                                            MessageBox.error("Data not Saved")
                                            oBusyDialog.close()
                                        }
                                    }
                                })
                            }
                        }
                    })
                })
            },
            TotalChargesCalculate_ac_TransportCharges: function (oEvent) {
                var oTableModel = this.getView().getModel('oTableDataModel');
                var sPath = oEvent.getSource().getBindingContext('oTableDataModel');
                var TransportCharges = Number(oEvent.mParameters.value);
                var DetentionatDestination = Number(sPath.getObject().DetentionatDestination);
                var DetentionatPlant = Number(sPath.getObject().DetentionatPlant);
                var Loading_Unloading = Number(sPath.getObject().Loading_Unloading);
                var DoubleDelivery = Number(sPath.getObject().DoubleDelivery);
                var LiftonLiftCharges = Number(sPath.getObject().LiftonLiftCharges);
                oTableModel.getProperty(sPath.getPath()).TotalCharges = TransportCharges + DetentionatDestination + DetentionatPlant + Loading_Unloading + DoubleDelivery + LiftonLiftCharges;
                oTableModel.setProperty(sPath.getPath(), oTableModel.getProperty(sPath.getPath()));

            },
            TotalChargesCalculate_ac_DetentionatPlant: function (oEvent) {
                var oTableModel = this.getView().getModel('oTableDataModel');
                var sPath = oEvent.getSource().getBindingContext('oTableDataModel');
                var TransportCharges = Number(sPath.getObject().TransportCharges);
                var DetentionatDestination = Number(sPath.getObject().DetentionatDestination);
                var DetentionatPlant = Number(oEvent.mParameters.value);
                var Loading_Unloading = Number(sPath.getObject().Loading_Unloading);
                var DoubleDelivery = Number(sPath.getObject().DoubleDelivery);
                var LiftonLiftCharges = Number(sPath.getObject().LiftonLiftCharges);
                oTableModel.getProperty(sPath.getPath()).TotalCharges = TransportCharges + DetentionatDestination + DetentionatPlant + Loading_Unloading + DoubleDelivery + LiftonLiftCharges;
                oTableModel.setProperty(sPath.getPath(), oTableModel.getProperty(sPath.getPath()));
            },
            TotalChargesCalculate_ac_DetentionatDestination: function (oEvent) {
                var oTableModel = this.getView().getModel('oTableDataModel');
                var sPath = oEvent.getSource().getBindingContext('oTableDataModel');
                var TransportCharges = Number(sPath.getObject().TransportCharges);
                var DetentionatDestination = Number(oEvent.mParameters.value);
                var DetentionatPlant = Number(sPath.getObject().DetentionatPlant);
                var Loading_Unloading = Number(sPath.getObject().Loading_Unloading);
                var DoubleDelivery = Number(sPath.getObject().DoubleDelivery);
                var LiftonLiftCharges = Number(sPath.getObject().LiftonLiftCharges);
                oTableModel.getProperty(sPath.getPath()).TotalCharges = TransportCharges + DetentionatDestination + DetentionatPlant + Loading_Unloading + DoubleDelivery + LiftonLiftCharges;
                oTableModel.setProperty(sPath.getPath(), oTableModel.getProperty(sPath.getPath()));
            },
            TotalChargesCalculate_ac_Loading_Unloading: function (oEvent) {
                var oTableModel = this.getView().getModel('oTableDataModel');
                var sPath = oEvent.getSource().getBindingContext('oTableDataModel');
                var TransportCharges = Number(sPath.getObject().TransportCharges);
                var DetentionatDestination = Number(sPath.getObject().DetentionatDestination);
                var DetentionatPlant = Number(sPath.getObject().DetentionatPlant);
                var Loading_Unloading = Number(oEvent.mParameters.value);
                var DoubleDelivery = Number(sPath.getObject().DoubleDelivery);
                var LiftonLiftCharges = Number(sPath.getObject().LiftonLiftCharges);
                oTableModel.getProperty(sPath.getPath()).TotalCharges = TransportCharges + DetentionatDestination + DetentionatPlant + Loading_Unloading + DoubleDelivery + LiftonLiftCharges;
                oTableModel.setProperty(sPath.getPath(), oTableModel.getProperty(sPath.getPath()));
            },
            TotalChargesCalculate_ac_DoubleDelivery: function (oEvent) {
                var oTableModel = this.getView().getModel('oTableDataModel');
                var sPath = oEvent.getSource().getBindingContext('oTableDataModel');
                var TransportCharges = Number(sPath.getObject().TransportCharges);
                var DetentionatDestination = Number(sPath.getObject().DetentionatDestination);
                var DetentionatPlant = Number(sPath.getObject().DetentionatPlant);
                var Loading_Unloading = Number(sPath.getObject().Loading_Unloading);
                var DoubleDelivery = Number(oEvent.mParameters.value);
                var LiftonLiftCharges = Number(sPath.getObject().LiftonLiftCharges);
                oTableModel.getProperty(sPath.getPath()).TotalCharges = TransportCharges + DetentionatDestination + DetentionatPlant + Loading_Unloading + DoubleDelivery + LiftonLiftCharges;
                oTableModel.setProperty(sPath.getPath(), oTableModel.getProperty(sPath.getPath()));
            },
            TotalChargesCalculate_ac_LiftonLiftCharges: function (oEvent) {
                var oTableModel = this.getView().getModel('oTableDataModel');
                var sPath = oEvent.getSource().getBindingContext('oTableDataModel');
                var TransportCharges = Number(sPath.getObject().TransportCharges);
                var DetentionatDestination = Number(sPath.getObject().DetentionatDestination);
                var DetentionatPlant = Number(sPath.getObject().DetentionatPlant);
                var Loading_Unloading = Number(sPath.getObject().Loading_Unloading);
                var DoubleDelivery = Number(sPath.getObject().DoubleDelivery);
                var LiftonLiftCharges = Number(oEvent.mParameters.value);
                oTableModel.getProperty(sPath.getPath()).TotalCharges = TransportCharges + DetentionatDestination + DetentionatPlant + Loading_Unloading + DoubleDelivery + LiftonLiftCharges;
                oTableModel.setProperty(sPath.getPath(), oTableModel.getProperty(sPath.getPath()));
            },
            onExport: function () {
                if (!this._oTable) {
                    this._oTable = this.byId('FrightCapturingReport_Table');
                }

                var oTable = this._oTable;
                var oRowBinding = oTable.getBinding('rows');
                var aCols = [
                    {
                        label: 'SRN',
                        type: EdmType.String,
                        property: 'SRN',
                    },
                    {
                        label: 'Invoice Number',
                        type: EdmType.String,
                        property: 'InvoiceNumber',
                    },
                    {
                        label: 'Invoice Date',
                        type: EdmType.String,
                        property: 'InvoiceDate',
                    },
                    // {
                    //     label: 'Product',
                    //     type: EdmType.String,
                    //     property: 'Product',
                    // },
                    {
                        label: 'DistributionChannel',
                        type: EdmType.String,
                        property: 'DistributionChannel',
                    },
                    // {
                    //     label: 'Product Description',
                    //     type: EdmType.String,
                    //     property: 'ProductDescription',
                    // },
                    {
                        label: 'Invoice Type',
                        type: EdmType.String,
                        property: 'InvoiceType',
                    },
                    {
                        label: 'Buyer',
                        type: EdmType.String,
                        property: 'Buyer',
                    },
                    {
                        label: 'Lr Number',
                        type: EdmType.String,
                        property: 'LrNo',
                    },
                    {
                        label: 'Lr Date',
                        type: EdmType.String,
                        property: 'LrDate',
                    },
                    {
                        label: 'Lr Date1',
                        type: EdmType.String,
                        property: 'LrDate1',
                    },
                    {
                        label: 'Transporter Name',
                        type: EdmType.String,
                        property: 'TransporterName',
                    },
                    {
                        label: 'Gross Weight',
                        type: EdmType.String,
                        property: 'GrossWeight',
                    },
                    {
                        label: 'Net Weight',
                        type: EdmType.String,
                        property: 'NetWeight',
                    },
                    {
                        label: 'Invoice Amount',
                        type: EdmType.String,
                        property: 'InvoiceAmount',
                    },
                    {
                        label: 'Invoice Quantity',
                        type: EdmType.String,
                        property: 'InvoiceQuantity',
                    },
                    {
                        label: 'Transporter Invoice Number',
                        type: EdmType.String,
                        property: 'TransporterInvoiceNumber',
                    },
                    {
                        label: 'Transporter Invoice Date',
                        type: EdmType.String,
                        property: 'TransporterInvoiceDate',
                    },
                    {
                        label: 'Transporter Invoice Date1',
                        type: EdmType.String,
                        property: 'TransporterInvoiceDate1',
                    },
                    {
                        label: 'Number Of Box',
                        type: EdmType.String,
                        property: 'NoOfBox',
                    },
                    {
                        label: 'Transport Charges',
                        type: EdmType.String,
                        property: 'TransportCharges',
                    },
                    {
                        label: 'Detentionat Plant',
                        type: EdmType.String,
                        property: 'DetentionatPlant',
                    },
                    {
                        label: 'Detentionat Destination',
                        type: EdmType.String,
                        property: 'DetentionatDestination',
                    },
                    {
                        label: 'Loading Unloading',
                        type: EdmType.String,
                        property: 'Loading_Unloading',
                    },
                    {
                        label: 'Double Delivery',
                        type: EdmType.String,
                        property: 'DoubleDelivery',
                    },
                    {
                        label: 'Lift on Lift Charges',
                        type: EdmType.String,
                        property: '',
                    },
                    {
                        label: 'Total Charges',
                        type: EdmType.String,
                        property: 'TotalCharges',
                    },
                    {
                        label: 'Other Charges',
                        type: EdmType.String,
                        property: 'OtherCharges',
                    },
                ]
                var oSettings = {
                    workbook: {
                        columns: aCols,
                        hierarchyLevel: 'Level'
                    },
                    dataSource: oRowBinding,
                    fileName: 'Fright Capturing Report.xlsx',
                    worker: false // We need to disable worker because we are using a MockServer as OData Service
                };

                var oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function () {
                    oSheet.destroy();
                });
            },
            TransporterInvoiceNumber_LiveChange1: function (oEvent) {
                var oTableModel = this.getView().getModel('oTableDataModel');
                var sPath = oEvent.getSource().getBindingContext('oTableDataModel');
                var sInputValue = oEvent.getParameter("value");
                var lastCharacter = sInputValue.charAt(sInputValue.length - 2);
                if (lastCharacter != "/") {
                    var newValue = sInputValue.replace(/\s/g, '/');
                    oTableModel.getProperty(sPath.getPath()).TransporterInvoiceNumber = newValue;
                    oTableModel.setProperty(sPath.getPath(), oTableModel.getProperty(sPath.getPath()));
                } else {
                    var newValue = sInputValue.slice(0, -1);
                    oTableModel.getProperty(sPath.getPath()).TransporterInvoiceNumber = newValue;
                    oTableModel.setProperty(sPath.getPath(), oTableModel.getProperty(sPath.getPath()));
                }
            },
            TransporterInvoiceNumber_LiveChange: function (oEvent) {
                var oTableModel = this.getView().getModel('oTableDataModel');
                var sPath = oEvent.getSource().getBindingContext('oTableDataModel');
                var sInputValue = oEvent.getParameter("value");
                var newValue = sInputValue.replace(/\s/g, '/');
                oTableModel.getProperty(sPath.getPath()).TransporterInvoiceNumber = newValue;
                oTableModel.setProperty(sPath.getPath(), oTableModel.getProperty(sPath.getPath()));
            },
            handleValueHelpTransportarName: function (oEvent) {
                var oView = this.getView();
                if (!this.oTransportarNameValueHelp) {
                    this.oTransportarNameValueHelp = Fragment.load({
                        id: oView.getId(),
                        name: "zexim.fragments.TransportarNameValueDialog",
                        controller: this
                    }).then(function (oTransportarNameValueDialog) {
                        oView.addDependent(oTransportarNameValueDialog);
                        return oTransportarNameValueDialog;
                    });
                }
                this.oTransportarNameValueHelp.then(function (oTransportarNameValueDialog) {
                    var oTemplate = new sap.m.StandardListItem({
                        title: "{oTransporterDataModel>TransporterCode}",
                        description: "{oTransporterDataModel>Transportername}",
                        type: "Active"
                    });
                    oTransportarNameValueDialog.bindAggregation("items", {
                        path: 'oTransporterDataModel>/aTransporterData',
                        length: 30,
                        template: oTemplate,
                    });
                    oTransportarNameValueDialog.setTitle("Select Transporter Name");
                    oTransportarNameValueDialog.open();
                }.bind(this));
            },
            TransportarNameValueDialog_Close: function (oEvent) {
                this.getView().byId("TransportarName").setValue(oEvent.mParameters.selectedItem.mProperties.title);
            },
            onSearch_TransportarNameValueDialog: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter([

                    new Filter("TransporterCode", FilterOperator.Contains, sValue),
                    new Filter("Transportername", FilterOperator.Contains, sValue),

                ])
                var oBinding = oEvent.getParameter("itemsBinding");
                oBinding.filter([oFilter]);
            },












            _registerForP13n: function () {
                const oTable = this.byId("FrightCapturingReport_Table");
                this.oMetadataHelper = new MetadataHelper([
                    {
                        key: "SRN_col",
                        label: "SRN",
                        path: "SRN"
                    },
                    {
                        key: "InvoiceNumber_col",
                        label: "Invoice Number",
                        path: "InvoiceNumber"
                    },
                    {
                        key: "InvoiceDate_col",
                        label: "Invoice Date",
                        path: "InvoiceDate"
                    },
                    {
                        key: "DistributionChannel_col",
                        label: "Distribution Channel",
                        path: "DistributionChannel"
                    },
                    {
                        key: "StorageLocation_col",
                        label: "Storage Location",
                        path: "StorageLocation"
                    },
                    {
                        key: "InvoiceType_col",
                        label: "Invoice Type",
                        path: "InvoiceType"
                    },
                    {
                        key: "InvoiceQuantity_col",
                        label: "Invoice Quantity",
                        path: "InvoiceQuantity"
                    },
                    {
                        key: "Buyer_col",
                        label: "Buyer",
                        path: "Buyer"
                    },
                    {
                        key: "LrNo_col",
                        label: "Lr Number",
                        path: "LrNo"
                    },
                    {
                        key: "LrDate_col",
                        label: "Lr Date",
                        path: "LrDate"
                    },
                    {
                        key: "LrDate_col1",
                        label: "Lr Date1",
                        path: "LrDate"
                    },
                    {
                        key: "TransporterName_col",
                        label: "Transporter Name",
                        path: "TransporterName"
                    },
                    {
                        key: "GrossWeight_col",
                        label: "Gross Weight",
                        path: "GrossWeight"
                    },
                    {
                        key: "NetWeight_col",
                        label: "Net Weight",
                        path: "NetWeight"
                    },
                    {
                        key: "InvoiceAmount_col",
                        label: "Invoice Amount",
                        path: "InvoiceAmount"
                    },
                    {
                        key: "TransporterInvoiceNumber_col",
                        label: "Transporter Invoice Number",
                        path: "TransporterInvoiceNumber"
                    },
                    {
                        key: "TransporterInvoiceDate_col",
                        label: "Transporter Invoice Date",
                        path: "TransporterInvoiceDate"
                    },
                    {
                        key: "TransporterInvoiceDate_col1",
                        label: "Transporter Invoice Date1",
                        path: "TransporterInvoiceDate"
                    },
                    {
                        key: "NoOfBox_col",
                        label: "No Of Box",
                        path: "NoOfBox"
                    },
                    {
                        key: "TransportCharges_col",
                        label: "Transport Charges",
                        path: "TransportCharges"
                    },
                    {
                        key: "DetentionatPlant_col",
                        label: "Detentionat Plant",
                        path: "DetentionatPlant"
                    },
                    {
                        key: "DetentionatDestination_col",
                        label: "Detentionat Destination",
                        path: "DetentionatDestination"
                    },
                    {
                        key: "Loading_Unloading_col",
                        label: "Loading Unloading",
                        path: "Loading_Unloading"
                    },
                    {
                        key: "DoubleDelivery_col",
                        label: "Double Delivery",
                        path: "DoubleDelivery"
                    },
                    {
                        key: "LiftonLiftCharges_col",
                        label: "Lift on Lift Charges",
                        path: "LiftonLiftCharges"
                    },
                    {
                        key: "OtherCharges_col",
                        label: "Other Charges",
                        path: "OtherCharges"
                    },
                    {
                        key: "TotalCharges_col",
                        label: "Total Charges",
                        path: "TotalCharges"
                    },
                    {
                        key: "GSTCode_col",
                        label: "GST Code",
                        path: "GSTCode"
                    },
                    {
                        key: "TaxType_col",
                        label: "Tax Type",
                        path: "TaxType"
                    },
                    {
                        key: "TaxCode_col",
                        label: "Tax Code",
                        path: "TaxCode"
                    },
                    {
                        key: "TDSBase_col",
                        label: "TDS Base",
                        path: "TDSBase"
                    }
                ]);

                this._mIntialWidth = {
                    "SRN_col": "11rem",
                    "InvoiceNumber_col": "11rem",
                    "InvoiceDate_col": "11rem",
                    "DistributionChannel_col": "11rem",
                    "StorageLocation_col": "11rem",
                    "InvoiceType_col": "11rem",
                    "InvoiceQuantity_col": "11rem",
                    "Buyer_col": "11rem",
                    "LrNo_col": "11rem",
                    "LrDate_col": "11rem",
                    "LrDate_col1": "11rem",
                    "TransporterName_col": "11rem",
                    "GrossWeight_col": "11rem",
                    "NetWeight_col": "11rem",
                    "InvoiceAmount_col": "11rem",
                    "TransporterInvoiceNumber_col": "11rem",
                    "TransporterInvoiceDate_col": "11rem",
                    "TransporterInvoiceDate_col1": "11rem",
                    "NoOfBox_col": "11rem",
                    "TransportCharges_col": "11rem",
                    "DetentionatPlant_col": "11rem",
                    "DetentionatDestination_col": "11rem",
                    "Loading_Unloading_col": "11rem",
                    "DoubleDelivery_col": "11rem",
                    "LiftonLiftCharges_col": "11rem",
                    "OtherCharges_col": "11rem",
                    "TotalCharges_col": "11rem",
                    "GSTCode_col": "11rem",
                    "TaxType_col": "11rem",
                    "TaxCode_col": "11rem",
                    "TDSBase_col": "11rem",
                };

                Engine.getInstance().register(oTable, {
                    helper: this.oMetadataHelper,
                    controller: {
                        Columns: new SelectionController({
                            targetAggregation: "columns",
                            control: oTable
                        }),
                        ColumnWidth: new ColumnWidthController({
                            control: oTable
                        })
                    }
                });

                Engine.getInstance().attachStateChange(this.handleStateChange.bind(this));
            },
            openPersoDialog: function (oEvt) {
                const oTable = this.byId("FrightCapturingReport_Table");

                Engine.getInstance().show(oTable, ["Columns"], {
                    contentHeight: "35rem",
                    contentWidth: "32rem",
                    source: oEvt.getSource()
                });
            },
            handleStateChange: function (oEvt) {
                const oTable = this.byId("FrightCapturingReport_Table");
                const oState = oEvt.getParameter("state");
                if (!oState) {
                    return;
                }
                oTable.getColumns().forEach(function (oColumn) {
                    const sKey = this.getView().getLocalId(oColumn.getId());
                    const sColumnWidth = oState.ColumnWidth[sKey];
                    oColumn.setWidth(sColumnWidth || this._mIntialWidth[sKey]);
                    oColumn.setVisible(false);
                }.bind(this));

                oState.Columns.forEach(function (oProp, iIndex) {
                    const oCol = this.byId(oProp.key);
                    oCol.setVisible(true);
                    oTable.removeColumn(oCol);
                    oTable.insertColumn(oCol, iIndex);
                }.bind(this));
            },
        });
    });

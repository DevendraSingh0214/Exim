sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageBox",
    "sap/ui/model/FilterOperator",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, MessageBox, FilterOperator) {
        "use strict";

        return Controller.extend("zexim.controller.FreightChargesScreen", {
            onInit: function () {
                UIComponent.getRouterFor(this).getRoute("FreightChargesScreen").attachPatternMatched(this._onRouteMatch, this);
                this.getView().setModel(new sap.ui.model.json.JSONModel(), "oTableItemModel");
                this.getView().getModel("oTableItemModel").setProperty("/aTableItem", []);
            },

            _onRouteMatch: function () {
                var oModel = this.getOwnerComponent().getModel();
                var url = "/sap/opu/odata/sap/YEXIMALLCDS";
                var oDataModel = new sap.ui.model.odata.v2.ODataModel(url);
                var oCommonModel = this.getOwnerComponent().getModel("oCommonModel");
                var sInput = oCommonModel.getProperty("/billingObject").BillingNo;
                var fromBillingDate = oCommonModel.getProperty("/billingObject").fromBillingDate;
                var toBillingDate = oCommonModel.getProperty("/billingObject").toBillingDate;
                var oFilter = new sap.ui.model.Filter("Docno", "EQ", sInput);
                var oFilter3 = new sap.ui.model.Filter("BillingDocument", "EQ", sInput)
                var oTableModel = this.getView().getModel("oTableItemModel");
                var aTableArr = oTableModel.getProperty("/aTableItem");
                var aTableData = [];
                var aNewArr = [];
                var aNewArr1 = [];
                var aNewArr2 = [];

                var date1 = fromBillingDate.slice(6, 10)
                var date2 = fromBillingDate.slice(5, 6)
                var date3 = fromBillingDate.slice(3, 5)
                var date4 = fromBillingDate.slice(2, 3)
                var date5 = fromBillingDate.slice(0, 2)
                var fromDate = date1 + date2 + date3 + date4 + date5

                var date7 = toBillingDate.slice(6, 10)
                var date8 = toBillingDate.slice(5, 6)
                var date9 = toBillingDate.slice(3, 5)
                var date10 = toBillingDate.slice(2, 3)
                var date11 = toBillingDate.slice(0, 2)
                var toDate = date7 + date8 + date9 + date10 + date11

                var oFilter1 = new sap.ui.model.Filter({
                    path: "Invoicedate",
                    operator: FilterOperator.BT,
                    value1: fromBillingDate,
                    value2: toBillingDate
                })

                var oFilter2 = new sap.ui.model.Filter({
                    path: "BillingDocumentDate",
                    operator: FilterOperator.BT,
                    value1: fromDate,
                    value2: toDate
                })

                if (aTableArr.length > 0) {
                    oTableModel.setProperty("/aTableItem", aTableData)
                    aTableArr = [];

                    if (fromBillingDate === "" && toBillingDate === "") {
                        oModel.read("/ZFREGHTCHARGES", {
                            filters: [oFilter],
                            success: function (oresponse) {
                                if (oresponse.results.length > 0) {
                                    oresponse.results.map(function (items) {
                                        var obj = {
                                            Docno: items.Docno,
                                            DeliveryNumber: items.Deliveryno,
                                            DocDate: items.Invoicedate,
                                            Portofdischarge: items.portofdis,
                                            Forwarder: items.Forwarder,
                                            Transportername: items.Transportername,
                                            Frecontainerno: items.Frecontainerno,
                                            Oceanfreightbillno: items.Oceanfreightbillno,
                                            Othshiplinebillno: items.Othshiplinebillno,
                                            Traspoerterbillno: items.Traspoerterbillno,
                                            Agencybillno: items.Agencybillno,
                                            Bltellexbillno: items.Bltellexbillno,
                                            Conecorebillno: items.Conecorebillno,
                                            Bltellexbillamt: items.Bltellexbillamt,
                                            Conecoreamt: items.Conecoreamt,
                                            Shippingline: items.Shippingline,
                                            Emptycontainer: items.Emptycontainer,
                                            Portofloading: items.Portofloading,
                                            Oceanfreight: items.Oceanfreight,
                                            Thc: items.Thc,
                                            Inlandfreight: items.Inlandfreight,
                                            Agencycharge: items.Agencycharge,
                                            Totalcharge: items.Totalcharge
                                        }
                                        aNewArr.push(obj)
                                    })
                                    oTableModel.setProperty("/aTableItem", aNewArr)
                                } else {
                                    oModel.read("/YEINVOICE_CDS", {
                                        filters: [oFilter3],
                                        success: function (oresponse) {

                                            var result = [];
                                            var map = new Map();

                                            for (var item of oresponse.results) {
                                                if (!map.has(item.DELIVERY_NUMBER)) {
                                                    map.set(item.DELIVERY_NUMBER, true)
                                                    result.push(item)
                                                }
                                            }

                                            result.map(function (items) {

                                                var documentDate = items.BillingDocumentDate;
                                                var documentDate1 = new Date(documentDate);
                                                var documentDate2 = documentDate1.getDate() + '-' + Number(documentDate1.getMonth() + 1) + '-' + documentDate1.getFullYear()

                                                var documentDate3 = documentDate2.split("-")
                                                if (documentDate3[1].length != 2) {
                                                    var documentDate4 = documentDate3[0] + "-" + 0 + documentDate3[1] + "-" + documentDate3[2]
                                                } else {
                                                    documentDate4 = documentDate2
                                                }

                                                var documentDate5 = documentDate4.split("-");
                                                if (documentDate5[0].length != 2) {
                                                    var documentDate6 = 0 + documentDate5[0] + "-" + documentDate5[1] + "-" + documentDate5[2]
                                                } else {
                                                    documentDate6 = documentDate4
                                                }

                                                var obj = {
                                                    Docno: items.BillingDocument,
                                                    DeliveryNumber: items.DELIVERY_NUMBER,
                                                    DocDate: documentDate6,
                                                    Portofdischarge: items.portofdis,
                                                    Forwarder: items.Forwarder,
                                                    Transportername: items.TRANSPORTERNAME,
                                                    Frecontainerno: items.containernumber,
                                                    Oceanfreightbillno: items.Oceanfreightbillno,
                                                    Othshiplinebillno: items.Othshiplinebillno,
                                                    Traspoerterbillno: items.Traspoerterbillno,
                                                    Agencybillno: items.Agencybillno,
                                                    Bltellexbillno: items.Bltellexbillno,
                                                    Conecorebillno: items.Conecorebillno,
                                                    Bltellexbillamt: items.Bltellexbillamt,
                                                    Conecoreamt: items.Conecoreamt,
                                                    Shippingline: items.Shippingline,
                                                    Emptycontainer: items.Emptycontainer,
                                                    Portofloading: items.Portofloading,
                                                    Oceanfreight: items.OCEANFREIGHT_exim,
                                                    Thc: items.Thc,
                                                    Inlandfreight: items.Inlandfreight,
                                                    Agencycharge: items.Agencycharge
                                                }
                                                aNewArr.push(obj)
                                            })

                                            // oresponse.results.map(function (items) {

                                            //     var documentDate = items.BillingDocumentDate;
                                            //     var documentDate1 = new Date(documentDate);
                                            //     var documentDate2 = documentDate1.getDate() + '-' + Number(documentDate1.getMonth() + 1) + '-' + documentDate1.getFullYear()

                                            //     var documentDate3 = documentDate2.split("-")
                                            //     if (documentDate3[1].length != 2) {
                                            //         var documentDate4 = documentDate3[0] + "-" + 0 + documentDate3[1] + "-" + documentDate3[2]
                                            //     } else {
                                            //         documentDate4 = documentDate2
                                            //     }

                                            //     var obj = {
                                            //         Docno: items.BillingDocument,
                                            //         DeliveryNumber: items.DELIVERY_NUMBER,
                                            //         DocDate: documentDate4,
                                            //         Portofdischarge: items.portofdis,
                                            //         Forwarder: items.Forwarder,
                                            //         Transportername: items.TRANSPORTERNAME,
                                            //         Frecontainerno: items.containernumber,
                                            //         Oceanfreightbillno: items.Oceanfreightbillno,
                                            //         Othshiplinebillno: items.Othshiplinebillno,
                                            //         Traspoerterbillno: items.Traspoerterbillno,
                                            //         Agencybillno: items.Agencybillno,
                                            //         Bltellexbillno: items.Bltellexbillamt,
                                            //         Conecorebillno: items.Conecorebillno,
                                            //         Bltellexbillamt: items.Bltellexbillamt,
                                            //         Conecoreamt: items.Conecoreamt,
                                            //         Shippingline: items.Shippingline,
                                            //         Emptycontainer: items.Emptycontainer,
                                            //         Portofloading: items.Portofloading,
                                            //         Oceanfreight: items.OCEANFREIGHT_exim,
                                            //         Thc: items.Thc,
                                            //         Inlandfreight: items.Inlandfreight,
                                            //         Agencycharge: items.Agencycharge
                                            //     }
                                            //     aNewArr.push(obj)
                                            // })

                                            oTableModel.setProperty("/aTableItem", aNewArr)
                                        }
                                    })
                                }
                            }
                        })
                    }
                    else if (sInput === "") {
                        oModel.read("/ZFREGHTCHARGES", {
                            filters: [oFilter1],
                            success: function (oresponse) {
                                if (oresponse.results.length > 0) {
                                    oresponse.results.map(function (items) {
                                        var obj = {
                                            Docno: items.Docno,
                                            DeliveryNumber: items.Deliveryno,
                                            DocDate: items.Invoicedate,
                                            Portofdischarge: items.portofdis,
                                            Forwarder: items.Forwarder,
                                            Transportername: items.Transportername,
                                            Frecontainerno: items.Frecontainerno,
                                            Oceanfreightbillno: items.Oceanfreightbillno,
                                            Othshiplinebillno: items.Othshiplinebillno,
                                            Traspoerterbillno: items.Traspoerterbillno,
                                            Agencybillno: items.Agencybillno,
                                            Bltellexbillno: items.Bltellexbillno,
                                            Conecorebillno: items.Conecorebillno,
                                            Bltellexbillamt: items.Bltellexbillamt,
                                            Conecoreamt: items.Conecoreamt,
                                            Shippingline: items.Shippingline,
                                            Emptycontainer: items.Emptycontainer,
                                            Portofloading: items.Portofloading,
                                            Oceanfreight: items.Oceanfreight,
                                            Thc: items.Thc,
                                            Inlandfreight: items.Inlandfreight,
                                            Agencycharge: items.Agencycharge,
                                            Totalcharge: items.Totalcharge
                                        }
                                        aNewArr.push(obj)
                                    })
                                    oTableModel.setProperty("/aTableItem", aNewArr)
                                } else {
                                    oModel.read("/YEINVOICE_CDS", {
                                        filters: [oFilter2],
                                        success: function (oresponse) {

                                            var result = [];
                                            var map = new Map();

                                            for (var item of oresponse.results) {
                                                if (!map.has(item.DELIVERY_NUMBER)) {
                                                    map.set(item.DELIVERY_NUMBER, true)
                                                    result.push(item)
                                                }
                                            }

                                            // var DeliveryNumber = item.DELIVERY_NUMBER;
                                            // if (deliverynum != DeliveryNumber) {
                                            //     for (var i = 1; i < oresponse.results.length; i++) {
                                            //         aNewArr1.push(oresponse.results[i])
                                            //     }
                                            // }
                                            // })

                                            // })

                                            result.map(function (items) {

                                                var documentDate = items.BillingDocumentDate;
                                                var documentDate1 = new Date(documentDate);
                                                var documentDate2 = documentDate1.getDate() + '-' + Number(documentDate1.getMonth() + 1) + '-' + documentDate1.getFullYear()

                                                var documentDate3 = documentDate2.split("-")
                                                if (documentDate3[1].length != 2) {
                                                    var documentDate4 = documentDate3[0] + "-" + 0 + documentDate3[1] + "-" + documentDate3[2]
                                                } else {
                                                    documentDate4 = documentDate2
                                                }

                                                var documentDate5 = documentDate4.split("-");
                                                if (documentDate5[0].length != 2) {
                                                    var documentDate6 = 0 + documentDate5[0] + "-" + documentDate5[1] + "-" + documentDate5[2]
                                                } else {
                                                    documentDate6 = documentDate4
                                                }

                                                var obj = {
                                                    Docno: items.BillingDocument,
                                                    DeliveryNumber: items.DELIVERY_NUMBER,
                                                    DocDate: documentDate6,
                                                    Portofdischarge: items.portofdis,
                                                    Forwarder: items.Forwarder,
                                                    Transportername: items.TRANSPORTERNAME,
                                                    Frecontainerno: items.containernumber,
                                                    Oceanfreightbillno: items.Oceanfreightbillno,
                                                    Othshiplinebillno: items.Othshiplinebillno,
                                                    Traspoerterbillno: items.Traspoerterbillno,
                                                    Agencybillno: items.Agencybillno,
                                                    Bltellexbillno: items.Bltellexbillamt,
                                                    Conecorebillno: items.Conecorebillno,
                                                    Bltellexbillamt: items.Bltellexbillamt,
                                                    Conecoreamt: items.Conecoreamt,
                                                    Shippingline: items.Shippingline,
                                                    Emptycontainer: items.Emptycontainer,
                                                    Portofloading: items.Portofloading,
                                                    Oceanfreight: items.OCEANFREIGHT_exim,
                                                    Thc: items.Thc,
                                                    Inlandfreight: items.Inlandfreight,
                                                    Agencycharge: items.Agencycharge
                                                }
                                                aNewArr.push(obj)
                                            })

                                            // oresponse.results.map(function (items) {

                                            //     var documentDate = items.BillingDocumentDate;
                                            //     var documentDate1 = new Date(documentDate);
                                            //     var documentDate2 = documentDate1.getDate() + '-' + Number(documentDate1.getMonth() + 1) + '-' + documentDate1.getFullYear()

                                            //     var documentDate3 = documentDate2.split("-")
                                            //     if (documentDate3[1].length != 2) {
                                            //         var documentDate4 = documentDate3[0] + "-" + 0 + documentDate3[1] + "-" + documentDate3[2]
                                            //     } else {
                                            //         documentDate4 = documentDate2
                                            //     }

                                            //     var obj = {
                                            //         Docno: items.BillingDocument,
                                            //         DeliveryNumber: items.DELIVERY_NUMBER,
                                            //         DocDate: documentDate4,
                                            //         Portofdischarge: items.portofdis,
                                            //         Forwarder: items.Forwarder,
                                            //         Transportername: items.TRANSPORTERNAME,
                                            //         Frecontainerno: items.containernumber,
                                            //         Oceanfreightbillno: items.Oceanfreightbillno,
                                            //         Othshiplinebillno: items.Othshiplinebillno,
                                            //         Traspoerterbillno: items.Traspoerterbillno,
                                            //         Agencybillno: items.Agencybillno,
                                            //         Bltellexbillno: items.Bltellexbillamt,
                                            //         Conecorebillno: items.Conecorebillno,
                                            //         Bltellexbillamt: items.Bltellexbillamt,
                                            //         Conecoreamt: items.Conecoreamt,
                                            //         Shippingline: items.Shippingline,
                                            //         Emptycontainer: items.Emptycontainer,
                                            //         Portofloading: items.Portofloading,
                                            //         Oceanfreight: items.OCEANFREIGHT_exim,
                                            //         Thc: items.Thc,
                                            //         Inlandfreight: items.Inlandfreight,
                                            //         Agencycharge: items.Agencycharge
                                            //     }
                                            //     aNewArr.push(obj)
                                            // })

                                            oTableModel.setProperty("/aTableItem", aNewArr)
                                        }
                                    })
                                }
                            }
                        })
                    }
                    else {
                        oModel.read("/ZFREGHTCHARGES", {
                            filters: [oFilter, oFilter1],
                            success: function (oresponse) {
                                if (oresponse.results.length > 0) {
                                    oresponse.results.map(function (items) {
                                        var obj = {
                                            Docno: items.Docno,
                                            DeliveryNumber: items.Deliveryno,
                                            DocDate: items.Invoicedate,
                                            Portofdischarge: items.portofdis,
                                            Forwarder: items.Forwarder,
                                            Transportername: items.Transportername,
                                            Frecontainerno: items.Frecontainerno,
                                            Oceanfreightbillno: items.Oceanfreightbillno,
                                            Othshiplinebillno: items.Othshiplinebillno,
                                            Traspoerterbillno: items.Traspoerterbillno,
                                            Agencybillno: items.Agencybillno,
                                            Bltellexbillno: items.Bltellexbillno,
                                            Conecorebillno: items.Conecorebillno,
                                            Bltellexbillamt: items.Bltellexbillamt,
                                            Conecoreamt: items.Conecoreamt,
                                            Shippingline: items.Shippingline,
                                            Emptycontainer: items.Emptycontainer,
                                            Portofloading: items.Portofloading,
                                            Oceanfreight: items.Oceanfreight,
                                            Thc: items.Thc,
                                            Inlandfreight: items.Inlandfreight,
                                            Agencycharge: items.Agencycharge,
                                            Totalcharge: items.Totalcharge
                                        }
                                        aNewArr.push(obj)
                                    })
                                    oTableModel.setProperty("/aTableItem", aNewArr)
                                } else {
                                    oModel.read("/YEINVOICE_CDS", {
                                        filters: [oFilter2, oFilter3],
                                        success: function (oresponse) {

                                            var result = [];
                                            var map = new Map();

                                            for (var item of oresponse.results) {
                                                if (!map.has(item.DELIVERY_NUMBER)) {
                                                    map.set(item.DELIVERY_NUMBER, true)
                                                    result.push(item)
                                                }
                                            }

                                            result.map(function (items) {

                                                var documentDate = items.BillingDocumentDate;
                                                var documentDate1 = new Date(documentDate);
                                                var documentDate2 = documentDate1.getDate() + '-' + Number(documentDate1.getMonth() + 1) + '-' + documentDate1.getFullYear()

                                                var documentDate3 = documentDate2.split("-")
                                                if (documentDate3[1].length != 2) {
                                                    var documentDate4 = documentDate3[0] + "-" + 0 + documentDate3[1] + "-" + documentDate3[2]
                                                } else {
                                                    documentDate4 = documentDate2
                                                }

                                                var documentDate5 = documentDate4.split("-");
                                                if (documentDate5[0].length != 2) {
                                                    var documentDate6 = 0 + documentDate5[0] + "-" + documentDate5[1] + "-" + documentDate5[2]
                                                } else {
                                                    documentDate6 = documentDate4
                                                }

                                                var obj = {
                                                    Docno: items.BillingDocument,
                                                    DeliveryNumber: items.DELIVERY_NUMBER,
                                                    DocDate: documentDate6,
                                                    Portofdischarge: items.portofdis,
                                                    Forwarder: items.Forwarder,
                                                    Transportername: items.TRANSPORTERNAME,
                                                    Frecontainerno: items.containernumber,
                                                    Oceanfreightbillno: items.Oceanfreightbillno,
                                                    Othshiplinebillno: items.Othshiplinebillno,
                                                    Traspoerterbillno: items.Traspoerterbillno,
                                                    Agencybillno: items.Agencybillno,
                                                    Bltellexbillno: items.Bltellexbillno,
                                                    Conecorebillno: items.Conecorebillno,
                                                    Bltellexbillamt: items.Bltellexbillamt,
                                                    Conecoreamt: items.Conecoreamt,
                                                    Shippingline: items.Shippingline,
                                                    Emptycontainer: items.Emptycontainer,
                                                    Portofloading: items.Portofloading,
                                                    Oceanfreight: items.OCEANFREIGHT_exim,
                                                    Thc: items.Thc,
                                                    Inlandfreight: items.Inlandfreight,
                                                    Agencycharge: items.Agencycharge
                                                }
                                                aNewArr.push(obj)
                                            })

                                            // oresponse.results.map(function (items) {

                                            //     var documentDate = items.BillingDocumentDate;
                                            //     var documentDate1 = new Date(documentDate);
                                            //     var documentDate2 = documentDate1.getDate() + '-' + Number(documentDate1.getMonth() + 1) + '-' + documentDate1.getFullYear()

                                            //     var documentDate3 = documentDate2.split("-")
                                            //     if (documentDate3[1].length != 2) {
                                            //         var documentDate4 = documentDate3[0] + "-" + 0 + documentDate3[1] + "-" + documentDate3[2]
                                            //     } else {
                                            //         documentDate4 = documentDate2
                                            //     }

                                            //     var obj = {
                                            //         Docno: items.BillingDocument,
                                            //         DeliveryNumber: items.DELIVERY_NUMBER,
                                            //         DocDate: documentDate4,
                                            //         Portofdischarge: items.portofdis,
                                            //         Forwarder: items.Forwarder,
                                            //         Transportername: items.TRANSPORTERNAME,
                                            //         Frecontainerno: items.containernumber,
                                            //         Oceanfreightbillno: items.Oceanfreightbillno,
                                            //         Othshiplinebillno: items.Othshiplinebillno,
                                            //         Traspoerterbillno: items.Traspoerterbillno,
                                            //         Agencybillno: items.Agencybillno,
                                            //         Bltellexbillno: items.Bltellexbillamt,
                                            //         Conecorebillno: items.Conecorebillno,
                                            //         Bltellexbillamt: items.Bltellexbillamt,
                                            //         Conecoreamt: items.Conecoreamt,
                                            //         Shippingline: items.Shippingline,
                                            //         Emptycontainer: items.Emptycontainer,
                                            //         Portofloading: items.Portofloading,
                                            //         Oceanfreight: items.OCEANFREIGHT_exim,
                                            //         Thc: items.Thc,
                                            //         Inlandfreight: items.Inlandfreight,
                                            //         Agencycharge: items.Agencycharge
                                            //     }
                                            //     aNewArr.push(obj)
                                            // })

                                            oTableModel.setProperty("/aTableItem", aNewArr)
                                        }
                                    })
                                }
                            }
                        })
                    }
                } else if (aTableArr.length === 0) {

                    if (fromBillingDate === "" && toBillingDate === "") {
                        oModel.read("/ZFREGHTCHARGES", {
                            filters: [oFilter],
                            success: function (oresponse) {
                                if (oresponse.results.length > 0) {
                                    oresponse.results.map(function (items) {
                                        var obj = {
                                            Docno: items.Docno,
                                            DeliveryNumber: items.Deliveryno,
                                            DocDate: items.Invoicedate,
                                            Portofdischarge: items.portofdis,
                                            Forwarder: items.Forwarder,
                                            Transportername: items.Transportername,
                                            Frecontainerno: items.Frecontainerno,
                                            Oceanfreightbillno: items.Oceanfreightbillno,
                                            Othshiplinebillno: items.Othshiplinebillno,
                                            Traspoerterbillno: items.Traspoerterbillno,
                                            Agencybillno: items.Agencybillno,
                                            Bltellexbillno: items.Bltellexbillno,
                                            Conecorebillno: items.Conecorebillno,
                                            Bltellexbillamt: items.Bltellexbillamt,
                                            Conecoreamt: items.Conecoreamt,
                                            Shippingline: items.Shippingline,
                                            Emptycontainer: items.Emptycontainer,
                                            Portofloading: items.Portofloading,
                                            Oceanfreight: items.Oceanfreight,
                                            Thc: items.Thc,
                                            Inlandfreight: items.Inlandfreight,
                                            Agencycharge: items.Agencycharge,
                                            Totalcharge: items.Totalcharge
                                        }
                                        aNewArr.push(obj)
                                    })
                                    oTableModel.setProperty("/aTableItem", aNewArr)
                                } else {
                                    oModel.read("/YEINVOICE_CDS", {
                                        filters: [oFilter3],
                                        success: function (oresponse) {


                                            var result = [];
                                            var map = new Map();

                                            for (var item of oresponse.results) {
                                                if (!map.has(item.DELIVERY_NUMBER)) {
                                                    map.set(item.DELIVERY_NUMBER, true)
                                                    result.push(item)
                                                }
                                            }

                                            result.map(function (items) {

                                                var documentDate = items.BillingDocumentDate;
                                                var documentDate1 = new Date(documentDate);
                                                var documentDate2 = documentDate1.getDate() + '-' + Number(documentDate1.getMonth() + 1) + '-' + documentDate1.getFullYear()

                                                var documentDate3 = documentDate2.split("-")
                                                if (documentDate3[1].length != 2) {
                                                    var documentDate4 = documentDate3[0] + "-" + 0 + documentDate3[1] + "-" + documentDate3[2]
                                                } else {
                                                    documentDate4 = documentDate2
                                                }

                                                var documentDate5 = documentDate4.split("-");
                                                if (documentDate5[0].length != 2) {
                                                    var documentDate6 = 0 + documentDate5[0] + "-" + documentDate5[1] + "-" + documentDate5[2]
                                                } else {
                                                    documentDate6 = documentDate4
                                                }

                                                var obj = {
                                                    Docno: items.BillingDocument,
                                                    DeliveryNumber: items.DELIVERY_NUMBER,
                                                    DocDate: documentDate6,
                                                    Portofdischarge: items.portofdis,
                                                    Forwarder: items.Forwarder,
                                                    Transportername: items.TRANSPORTERNAME,
                                                    Frecontainerno: items.containernumber,
                                                    Oceanfreightbillno: items.Oceanfreightbillno,
                                                    Othshiplinebillno: items.Othshiplinebillno,
                                                    Traspoerterbillno: items.Traspoerterbillno,
                                                    Agencybillno: items.Agencybillno,
                                                    Bltellexbillno: items.Bltellexbillno,
                                                    Conecorebillno: items.Conecorebillno,
                                                    Bltellexbillamt: items.Bltellexbillamt,
                                                    Conecoreamt: items.Conecoreamt,
                                                    Shippingline: items.Shippingline,
                                                    Emptycontainer: items.Emptycontainer,
                                                    Portofloading: items.Portofloading,
                                                    Oceanfreight: items.OCEANFREIGHT_exim,
                                                    Thc: items.Thc,
                                                    Inlandfreight: items.Inlandfreight,
                                                    Agencycharge: items.Agencycharge,
                                                    Totalcharge: ""
                                                }
                                                aNewArr.push(obj)
                                            })

                                            // oresponse.results.map(function (items) {

                                            //     var documentDate = items.BillingDocumentDate;
                                            //     var documentDate1 = new Date(documentDate);
                                            //     var documentDate2 = documentDate1.getDate() + '-' + Number(documentDate1.getMonth() + 1) + '-' + documentDate1.getFullYear()

                                            //     var documentDate3 = documentDate2.split("-")
                                            //     if (documentDate3[1].length != 2) {
                                            //         var documentDate4 = documentDate3[0] + "-" + 0 + documentDate3[1] + "-" + documentDate3[2]
                                            //     } else {
                                            //         documentDate4 = documentDate2
                                            //     }

                                            //     var obj = {
                                            //         Docno: items.BillingDocument,
                                            //         DeliveryNumber: items.DELIVERY_NUMBER,
                                            //         DocDate: documentDate4,
                                            //         Portofdischarge: items.portofdis,
                                            //         Forwarder: items.Forwarder,
                                            //         Transportername: items.TRANSPORTERNAME,
                                            //         Frecontainerno: items.containernumber,
                                            //         Oceanfreightbillno: items.Oceanfreightbillno,
                                            //         Othshiplinebillno: items.Othshiplinebillno,
                                            //         Traspoerterbillno: items.Traspoerterbillno,
                                            //         Agencybillno: items.Agencybillno,
                                            //         Bltellexbillno: items.Bltellexbillamt,
                                            //         Conecorebillno: items.Conecorebillno,
                                            //         Bltellexbillamt: items.Bltellexbillamt,
                                            //         Conecoreamt: items.Conecoreamt,
                                            //         Shippingline: items.Shippingline,
                                            //         Emptycontainer: items.Emptycontainer,
                                            //         Portofloading: items.Portofloading,
                                            //         Oceanfreight: items.OCEANFREIGHT_exim,
                                            //         Thc: items.Thc,
                                            //         Inlandfreight: items.Inlandfreight,
                                            //         Agencycharge: items.Agencycharge
                                            //     }
                                            //     aNewArr.push(obj);
                                            // })
                                            oTableModel.setProperty("/aTableItem", aNewArr)
                                        }
                                    })
                                }
                            }
                        })
                    }
                    else if (sInput === "") {
                        oModel.read("/ZFREGHTCHARGES", {
                            filters: [oFilter1],
                            success: function (oresponse) {
                                if (oresponse.results.length > 0) {
                                    oresponse.results.map(function (items) {
                                        var obj = {
                                            Docno: items.Docno,
                                            DeliveryNumber: items.Deliveryno,
                                            DocDate: items.Invoicedate,
                                            Portofdischarge: items.portofdis,
                                            Forwarder: items.Forwarder,
                                            Transportername: items.Transportername,
                                            Frecontainerno: items.Frecontainerno,
                                            Oceanfreightbillno: items.Oceanfreightbillno,
                                            Othshiplinebillno: items.Othshiplinebillno,
                                            Traspoerterbillno: items.Traspoerterbillno,
                                            Agencybillno: items.Agencybillno,
                                            Bltellexbillno: items.Bltellexbillno,
                                            Conecorebillno: items.Conecorebillno,
                                            Bltellexbillamt: items.Bltellexbillamt,
                                            Conecoreamt: items.Conecoreamt,
                                            Shippingline: items.Shippingline,
                                            Emptycontainer: items.Emptycontainer,
                                            Portofloading: items.Portofloading,
                                            Oceanfreight: items.Oceanfreight,
                                            Thc: items.Thc,
                                            Inlandfreight: items.Inlandfreight,
                                            Agencycharge: items.Agencycharge,
                                            Totalcharge: items.Totalcharge
                                        }
                                        aNewArr.push(obj)
                                    })
                                    oTableModel.setProperty("/aTableItem", aNewArr)
                                } else {
                                    oModel.read("/YEINVOICE_CDS", {
                                        filters: [oFilter2],
                                        success: function (oresponse) {

                                            var result = [];
                                            var map = new Map();

                                            for (var item of oresponse.results) {
                                                if (!map.has(item.DELIVERY_NUMBER)) {
                                                    map.set(item.DELIVERY_NUMBER, true)
                                                    result.push(item)
                                                }
                                            }

                                            // for (var i = 0; i < oresponse.results.length; i++) {
                                            //     aNewArr1.push(oresponse.results[i])
                                            // }
                                            // aNewArr1.map(function (items) {
                                            //     var deliverynum = items.DELIVERY_NUMBER;
                                            //     var invoicenum = items.DELIVERY_NUMBER;

                                            //     oresponse.results.map(function (item) {
                                            //         var DeliveryNum = item.DELIVERY_NUMBER;
                                            //         var InvoiceNum = item.DELIVERY_NUMBER;

                                            //         if (deliverynum != DeliveryNum && invoicenum != InvoiceNum) {
                                            //             aNewArr2.push(item)
                                            //         }

                                            //     })

                                            // })

                                            result.map(function (items) {

                                                var documentDate = items.BillingDocumentDate;
                                                var documentDate1 = new Date(documentDate);
                                                var documentDate2 = documentDate1.getDate() + '-' + Number(documentDate1.getMonth() + 1) + '-' + documentDate1.getFullYear()

                                                var documentDate3 = documentDate2.split("-")
                                                if (documentDate3[1].length != 2) {
                                                    var documentDate4 = documentDate3[0] + "-" + 0 + documentDate3[1] + "-" + documentDate3[2]
                                                } else {
                                                    documentDate4 = documentDate2
                                                }

                                                var documentDate5 = documentDate4.split("-");
                                                if (documentDate5[0].length != 2) {
                                                    var documentDate6 = 0 + documentDate5[0] + "-" + documentDate5[1] + "-" + documentDate5[2]
                                                } else {
                                                    documentDate6 = documentDate4
                                                }

                                                var obj = {
                                                    Docno: items.BillingDocument,
                                                    DeliveryNumber: items.DELIVERY_NUMBER,
                                                    DocDate: documentDate6,
                                                    Portofdischarge: items.portofdis,
                                                    Forwarder: items.Forwarder,
                                                    Transportername: items.TRANSPORTERNAME,
                                                    Frecontainerno: items.containernumber,
                                                    Oceanfreightbillno: items.Oceanfreightbillno,
                                                    Othshiplinebillno: items.Othshiplinebillno,
                                                    Traspoerterbillno: items.Traspoerterbillno,
                                                    Agencybillno: items.Agencybillno,
                                                    Bltellexbillno: items.Bltellexbillamt,
                                                    Conecorebillno: items.Conecorebillno,
                                                    Bltellexbillamt: items.Bltellexbillamt,
                                                    Conecoreamt: items.Conecoreamt,
                                                    Shippingline: items.Shippingline,
                                                    Emptycontainer: items.Emptycontainer,
                                                    Portofloading: items.Portofloading,
                                                    Oceanfreight: items.OCEANFREIGHT_exim,
                                                    Thc: items.Thc,
                                                    Inlandfreight: items.Inlandfreight,
                                                    Agencycharge: items.Agencycharge
                                                }
                                                aNewArr.push(obj)
                                            })

                                            // oresponse.results.map(function (items) {

                                            //     var documentDate = items.BillingDocumentDate;
                                            //     var documentDate1 = new Date(documentDate);
                                            //     var documentDate2 = documentDate1.getDate() + '-' + Number(documentDate1.getMonth() + 1) + '-' + documentDate1.getFullYear()

                                            //     var documentDate3 = documentDate2.split("-")
                                            //     if (documentDate3[1].length != 2) {
                                            //         var documentDate4 = documentDate3[0] + "-" + 0 + documentDate3[1] + "-" + documentDate3[2]
                                            //     } else {
                                            //         documentDate4 = documentDate2
                                            //     }

                                            //     var obj = {
                                            //         Docno: items.BillingDocument,
                                            //         DeliveryNumber: items.DELIVERY_NUMBER,
                                            //         DocDate: documentDate4,
                                            //         Portofdischarge: items.portofdis,
                                            //         Forwarder: items.Forwarder,
                                            //         Transportername: items.TRANSPORTERNAME,
                                            //         Frecontainerno: items.containernumber,
                                            //         Oceanfreightbillno: items.Oceanfreightbillno,
                                            //         Othshiplinebillno: items.Othshiplinebillno,
                                            //         Traspoerterbillno: items.Traspoerterbillno,
                                            //         Agencybillno: items.Agencybillno,
                                            //         Bltellexbillno: items.Bltellexbillamt,
                                            //         Conecorebillno: items.Conecorebillno,
                                            //         Bltellexbillamt: items.Bltellexbillamt,
                                            //         Conecoreamt: items.Conecoreamt,
                                            //         Shippingline: items.Shippingline,
                                            //         Emptycontainer: items.Emptycontainer,
                                            //         Portofloading: items.Portofloading,
                                            //         Oceanfreight: items.OCEANFREIGHT_exim,
                                            //         Thc: items.Thc,
                                            //         Inlandfreight: items.Inlandfreight,
                                            //         Agencycharge: items.Agencycharge
                                            //     }
                                            //     aNewArr.push(obj)
                                            // })

                                            oTableModel.setProperty("/aTableItem", aNewArr)
                                        }
                                    })
                                }
                            }
                        })
                    } else {
                        oModel.read("/ZFREGHTCHARGES", {
                            filters: [oFilter, oFilter1],
                            success: function (oresponse) {
                                if (oresponse.results.length > 0) {
                                    oresponse.results.map(function (items) {
                                        var obj = {
                                            Docno: items.Docno,
                                            DeliveryNumber: items.Deliveryno,
                                            DocDate: items.Invoicedate,
                                            Portofdischarge: items.portofdis,
                                            Forwarder: items.Forwarder,
                                            Transportername: items.Transportername,
                                            Frecontainerno: items.Frecontainerno,
                                            Oceanfreightbillno: items.Oceanfreightbillno,
                                            Othshiplinebillno: items.Othshiplinebillno,
                                            Traspoerterbillno: items.Traspoerterbillno,
                                            Agencybillno: items.Agencybillno,
                                            Bltellexbillno: items.Bltellexbillno,
                                            Conecorebillno: items.Conecorebillno,
                                            Bltellexbillamt: items.Bltellexbillamt,
                                            Conecoreamt: items.Conecoreamt,
                                            Shippingline: items.Shippingline,
                                            Emptycontainer: items.Emptycontainer,
                                            Portofloading: items.Portofloading,
                                            Oceanfreight: items.Oceanfreight,
                                            Thc: items.Thc,
                                            Inlandfreight: items.Inlandfreight,
                                            Agencycharge: items.Agencycharge,
                                            Totalcharge: items.Totalcharge
                                        }
                                        aNewArr.push(obj)
                                    })
                                    oTableModel.setProperty("/aTableItem", aNewArr)
                                } else {
                                    oModel.read("/YEINVOICE_CDS", {
                                        filters: [oFilter2, oFilter3],
                                        success: function (oresponse) {

                                            var result = [];
                                            var map = new Map();

                                            for (var item of oresponse.results) {
                                                if (!map.has(item.DELIVERY_NUMBER)) {
                                                    map.set(item.DELIVERY_NUMBER, true)
                                                    result.push(item)
                                                }
                                            }

                                            result.map(function (items) {

                                                var documentDate = items.BillingDocumentDate;
                                                var documentDate1 = new Date(documentDate);
                                                var documentDate2 = documentDate1.getDate() + '-' + Number(documentDate1.getMonth() + 1) + '-' + documentDate1.getFullYear()

                                                var documentDate3 = documentDate2.split("-")
                                                if (documentDate3[1].length != 2) {
                                                    var documentDate4 = documentDate3[0] + "-" + 0 + documentDate3[1] + "-" + documentDate3[2]
                                                } else {
                                                    documentDate4 = documentDate2
                                                }

                                                var documentDate5 = documentDate4.split("-");
                                                if (documentDate5[0].length != 2) {
                                                    var documentDate6 = 0 + documentDate5[0] + "-" + documentDate5[1] + "-" + documentDate5[2]
                                                } else {
                                                    documentDate6 = documentDate4
                                                }

                                                var obj = {
                                                    Docno: items.BillingDocument,
                                                    DeliveryNumber: items.DELIVERY_NUMBER,
                                                    DocDate: documentDate6,
                                                    Portofdischarge: items.portofdis,
                                                    Forwarder: items.Forwarder,
                                                    Transportername: items.TRANSPORTERNAME,
                                                    Frecontainerno: items.containernumber,
                                                    Oceanfreightbillno: items.Oceanfreightbillno,
                                                    Othshiplinebillno: items.Othshiplinebillno,
                                                    Traspoerterbillno: items.Traspoerterbillno,
                                                    Agencybillno: items.Agencybillno,
                                                    Bltellexbillno: items.Bltellexbillno,
                                                    Conecorebillno: items.Conecorebillno,
                                                    Bltellexbillamt: items.Bltellexbillamt,
                                                    Conecoreamt: items.Conecoreamt,
                                                    Shippingline: items.Shippingline,
                                                    Emptycontainer: items.Emptycontainer,
                                                    Portofloading: items.Portofloading,
                                                    Oceanfreight: items.OCEANFREIGHT_exim,
                                                    Thc: items.Thc,
                                                    Inlandfreight: items.Inlandfreight,
                                                    Agencycharge: items.Agencycharge
                                                }
                                                aNewArr.push(obj)
                                            })

                                            // oresponse.results.map(function (items) {

                                            //     var documentDate = items.BillingDocumentDate;
                                            //     var documentDate1 = new Date(documentDate);
                                            //     var documentDate2 = documentDate1.getDate() + '-' + Number(documentDate1.getMonth() + 1) + '-' + documentDate1.getFullYear()

                                            //     var documentDate3 = documentDate2.split("-")
                                            //     if (documentDate3[1].length != 2) {
                                            //         var documentDate4 = documentDate3[0] + "-" + 0 + documentDate3[1] + "-" + documentDate3[2]
                                            //     } else {
                                            //         documentDate4 = documentDate2
                                            //     }

                                            //     var obj = {
                                            //         Docno: items.BillingDocument,
                                            //         DeliveryNumber: items.DELIVERY_NUMBER,
                                            //         DocDate: documentDate4,
                                            //         Portofdischarge: items.portofdis,
                                            //         Forwarder: items.Forwarder,
                                            //         Transportername: items.TRANSPORTERNAME,
                                            //         Frecontainerno: items.containernumber,
                                            //         Oceanfreightbillno: items.Oceanfreightbillno,
                                            //         Othshiplinebillno: items.Othshiplinebillno,
                                            //         Traspoerterbillno: items.Traspoerterbillno,
                                            //         Agencybillno: items.Agencybillno,
                                            //         Bltellexbillno: items.Bltellexbillamt,
                                            //         Conecorebillno: items.Conecorebillno,
                                            //         Bltellexbillamt: items.Bltellexbillamt,
                                            //         Conecoreamt: items.Conecoreamt,
                                            //         Shippingline: items.Shippingline,
                                            //         Emptycontainer: items.Emptycontainer,
                                            //         Portofloading: items.Portofloading,
                                            //         Oceanfreight: items.OCEANFREIGHT_exim,
                                            //         Thc: items.Thc,
                                            //         Inlandfreight: items.Inlandfreight,
                                            //         Agencycharge: items.Agencycharge
                                            //     }
                                            //     aNewArr.push(obj)
                                            // })

                                            oTableModel.setProperty("/aTableItem", aNewArr)
                                        }
                                    })
                                }
                            }
                        })
                    }

                }
            },

            onChange: function (oEvent) {
                var oContext = oEvent.getSource().getBindingContext('oTableItemModel').getObject();
                var Total = Number(oContext.Thc) + Number(oContext.Agencycharge) + Number(oContext.Bltellexbillamt) + Number(oContext.Conecoreamt) + Number(oContext.Inlandfreight) + Number(oContext.Oceanfreight);
                oContext.Totalcharge = Total;
            },

            onDeleteSelectedData: function (oEvent) {
                var oTable = oEvent.getSource().getParent().getParent();
                var aSelectedIndex = oTable.getSelectedIndices();
                var oTableModel = this.getView().getModel("oTableItemModel");
                var aTableArr = oTableModel.getProperty("/aTableItem");
                var aNewArr = [];

                for (var i = 0; i < aSelectedIndex.length; i++) {
                    aNewArr.push(aTableArr[aSelectedIndex[i]].Docno);
                }

                aNewArr.map(function (item) {
                    var Docno = item;
                    var iIndex = "";
                    aTableArr.map(function (item, index) {
                        if (Docno === item.Docno) {
                            iIndex = index;
                        }
                    })
                    aTableArr.splice(iIndex, 1);
                })

                oTableModel.setProperty("/aTableItem", aTableArr)
            },

            onDelete: function () {

            },

            onSave: function () {
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Saving Data",
                    text: "Please wait"
                });
                oBusyDialog.open();
                var oModel = this.getView().getModel();
                var Tabledata = this.getView().getModel("oTableItemModel").getProperty("/aTableItem");

                var aNewArr = [];
                var aNewArr1 = [];

                Tabledata.map(function (items) {
                    // if (items.DocDate === undefined) {
                    //     var oDate = new Date();
                    //     var newDate = oDate.getDate() + '-' + Number(oDate.getMonth() + 1) + '-' + oDate.getFullYear();
                    //     var newDate1 = newDate.split("-")
                    //     if (newDate1[1].length != 2) {
                    //         var newDate42= newDate1[0] + "-" + 0 + newDate1[1] + "-" + newDate1[2]
                    //     } else {
                    //         newDate2 = newDate1
                    //     }
                    // } else {
                    //     var oDate = new Date(items.DocDate);
                    //     var newDate = oDate.getDate() + '-' + Number(oDate.getMonth() + 1) + '-' + oDate.getFullYear();
                    //     var newDate1 = newDate.split("-");
                    //     if (newDate1[1].length != 2) {
                    //         var newDate2= newDate1[0] + "-" + 0 + newDate1[1] + "-" + newDate1[2]
                    //     } else {
                    //         newDate2 = newDate1
                    //     }
                    // }

                    var obj = {
                        Docno: items.Docno,
                        Invoicedate: items.DocDate,
                        Deliveryno: items.DeliveryNumber,
                        Portofdischarge: items.Portofdischarge,
                        Forwarder: items.Forwarder,
                        Transportername: items.Transportername,
                        Frecontainerno: items.Frecontainerno,
                        Oceanfreightbillno: items.Oceanfreightbillno,
                        Othshiplinebillno: items.Othshiplinebillno,
                        Traspoerterbillno: items.Traspoerterbillno,
                        Agencybillno: items.Agencybillno,
                        Bltellexbillno: items.Bltellexbillno,
                        Conecorebillno: items.Conecorebillno,
                        Bltellexbillamt: items.Bltellexbillamt,
                        Conecoreamt: items.Conecoreamt,
                        Shippingline: items.Shippingline,
                        Emptycontainer: items.Emptycontainer,
                        Portofloading: items.Portofloading,
                        Oceanfreight: items.Oceanfreight,
                        Thc: items.Thc,
                        Inlandfreight: items.Inlandfreight,
                        Agencycharge: items.Agencycharge,
                        Totalcharge: (items.Totalcharge).toString()
                    }
                    aNewArr.push(obj);
                })

                aNewArr.map(function (items) {
                    var oFilter = new sap.ui.model.Filter("Docno", "EQ", items.Docno);

                    oModel.read("/ZFREGHTCHARGES", {
                        filters: [oFilter],
                        success: function (oresponse) {
                            if (oresponse.results.length > 0) {
                                // var oDate = new Date(items.Invoicedate);
                                // var newDate = oDate.getDate() + '-' + Number(oDate.getMonth() + 1) + '-' + oDate.getFullYear();
                                var obj = {
                                    Docno: items.Docno,
                                    Deliveryno: items.Deliveryno,
                                    Invoicedate: items.Invoicedate,
                                    Portofdischarge: items.Portofdischarge,
                                    Forwarder: items.Forwarder,
                                    Transportername: items.Transportername,
                                    Frecontainerno: items.Frecontainerno,
                                    Oceanfreightbillno: items.Oceanfreightbillno,
                                    Othshiplinebillno: items.Othshiplinebillno,
                                    Traspoerterbillno: items.Traspoerterbillno,
                                    Agencybillno: items.Agencybillno,
                                    Bltellexbillno: items.Bltellexbillno,
                                    Conecorebillno: items.Conecorebillno,
                                    Bltellexbillamt: items.Bltellexbillamt,
                                    Conecoreamt: items.Conecoreamt,
                                    Shippingline: items.Shippingline,
                                    Emptycontainer: items.Emptycontainer,
                                    Portofloading: items.Portofloading,
                                    Oceanfreight: items.Oceanfreight,
                                    Thc: items.Thc,
                                    Inlandfreight: items.Inlandfreight,
                                    Agencycharge: items.Agencycharge,
                                    Totalcharge: items.Totalcharge
                                }
                                oModel.update("/ZFREGHTCHARGES(Docno='" + items.Docno + "',Deliveryno='" + items.Deliveryno + "')", obj, {
                                    success: function (oresponse) {
                                        oBusyDialog.close();
                                        MessageBox.success("Data saved successfully", {
                                            onClose: function (oAction) {
                                                if (oAction === MessageBox.Action.OK) {
                                                    window.location.reload();
                                                }
                                            }
                                        });
                                    },
                                    error: function () {
                                        oBusyDialog.close();
                                        MessageBox.error("Data was not saved", {
                                            onClose: function (oAction) {
                                                if (oAction === MessageBox.Action.OK) {
                                                    window.location.reload();
                                                }
                                            }
                                        });
                                    }
                                })
                            } else {
                                // var oDate = new Date(items.Invoicedate);
                                // var newDate = oDate.getDate() + '-' + Number(oDate.getMonth() + 1) + '-' + oDate.getFullYear();
                                var obj = {
                                    Docno: items.Docno,
                                    Deliveryno: items.Deliveryno,
                                    Invoicedate: items.Invoicedate,
                                    Portofdischarge: items.Portofdischarge,
                                    Forwarder: items.Forwarder,
                                    Transportername: items.Transportername,
                                    Frecontainerno: items.Frecontainerno,
                                    Oceanfreightbillno: items.Oceanfreightbillno,
                                    Othshiplinebillno: items.Othshiplinebillno,
                                    Traspoerterbillno: items.Traspoerterbillno,
                                    Agencybillno: items.Agencybillno,
                                    Bltellexbillno: items.Bltellexbillno,
                                    Conecorebillno: items.Conecorebillno,
                                    Bltellexbillamt: items.Bltellexbillamt,
                                    Conecoreamt: items.Conecoreamt,
                                    Shippingline: items.Shippingline,
                                    Emptycontainer: items.Emptycontainer,
                                    Portofloading: items.Portofloading,
                                    Oceanfreight: items.Oceanfreight,
                                    Thc: items.Thc,
                                    Inlandfreight: items.Inlandfreight,
                                    Agencycharge: items.Agencycharge,
                                    Totalcharge: items.Totalcharge
                                }
                                oModel.create("/ZFREGHTCHARGES", obj, {
                                    success: function (oresponse) {
                                        oBusyDialog.close();
                                        MessageBox.success("Data saved successfully", {
                                            onClose: function (oAction) {
                                                if (oAction === MessageBox.Action.OK) {
                                                    window.location.reload();
                                                }
                                            }
                                        });
                                    },
                                    error: function () {
                                        oBusyDialog.close();
                                        MessageBox.error("Data was not saved", {
                                            onClose: function (oAction) {
                                                if (oAction === MessageBox.Action.OK) {
                                                    window.location.reload();
                                                }
                                            }
                                        });
                                    }
                                })
                            }
                        }
                    })
                })
            }
        });
    });

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageBox",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, MessageBox, FilterOperator) {
        "use strict";

        return Controller.extend("zexim.controller.FreightChargesreport", {
            onInit: function () {
                // var oPanel = this.getView().byId("Panel2");
                // oPanel.setVisible(false);
                this.getView().setModel(new sap.ui.model.json.JSONModel(), "oTableItemModel");
                this.getView().getModel("oTableItemModel").setProperty("/aTableItem", []);
                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(), "oCommonModel");
            },

            onExecute: function () {
                var Docno = this.getView().byId("idDoc").getValue();
                var fromDate = this.getView().byId("FromBillingDt").getValue();
                var toDate = this.getView().byId("ToBillingDt").getValue();
                var Forwarder = this.getView().byId("idComboForwarder").getValue();
                var AgencyName = this.getView().byId("idComboAgency").getValue();
                var Object = {
                    BillingNo: Docno,
                    // toBillingDate: Docno.length > 0 ? "" : toDate,
                    // fromBillingDate: Docno.length > 0 ? "" : fromDate,
                    toBillingDate: toDate,
                    fromBillingDate: fromDate,
                    Forwarder: Forwarder,
                    AgencyName: AgencyName
                };
                this.getOwnerComponent().getModel("oCommonModel").setProperty("/billingObject", Object);
                UIComponent.getRouterFor(this).navTo("FreightChargesReport1");
            },

            OnExecute: function () {
                var oModel = this.getView().getModel();
                var Docnum = this.getView().byId("idDoc").getValue();
                var FromBillingDt = this.getView().byId("FromBillingDt").getValue();
                var ToBillingDt = this.getView().byId("ToBillingDt").getValue();
                var oTableModel = this.getView().getModel("oTableItemModel");
                var aTableArr = oTableModel.getProperty("/aTableItem");

                var oFilter = new sap.ui.model.Filter({
                    path: "Invoicedate",
                    operator: FilterOperator.BT,
                    value1: FromBillingDt,
                    value2: ToBillingDt
                })

                var oFilter1 = new sap.ui.model.Filter("Docno", "EQ", Docnum);


                if (aTableArr.length > 0) {
                    if (Docnum.length > 0) {
                        oModel.read("/ZFREGHTCHARGES", {
                            filters: [oFilter1],
                            success: function (oresponse) {
                                oTableModel.setProperty("/aTableItem", oresponse.results)
                            }
                        })
                    }
                    if (FromBillingDt.length > 0 && ToBillingDt.length > 0) {
                        oModel.read("/ZFREGHTCHARGES", {
                            filters: [oFilter],
                            success: function (oresponse) {
                                oTableModel.setProperty("/aTableItem", oresponse.results)
                            }
                        })
                    }
                } else {
                    if (Docnum.length > 0) {
                        oModel.read("/ZFREGHTCHARGES", {
                            filters: [oFilter1],
                            success: function (oresponse) {
                                oTableModel.setProperty("/aTableItem", oresponse.results[0])
                            }
                        })
                    }
                    if (FromBillingDt.length > 0 && ToBillingDt.length > 0) {
                        oModel.read("/ZFREGHTCHARGES", {
                            filters: [oFilter],
                            success: function (oresponse) {
                                oTableModel.setProperty("/aTableItem", oresponse.results)
                            }
                        })
                    }
                }






            }
        });
    });
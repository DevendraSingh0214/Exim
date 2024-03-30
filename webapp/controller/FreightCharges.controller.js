sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, MessageBox) {
        "use strict";

        return Controller.extend("zexim.controller.FreightCharges", {
            onInit: function () {
                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(), "oCommonModel");
            },

            onSubmit: function () {
                var Docno = this.getView().byId("idBillingDoc").getValue();
                var fromDate = this.getView().byId("fromDate").getValue();
                var toDate = this.getView().byId("toDate").getValue();
                var Object = {
                    BillingNo: Docno,
                    toBillingDate: Docno.length>0 ? "" : toDate,
                    fromBillingDate: Docno.length>0 ? "" : fromDate,
                };
                this.getOwnerComponent().getModel("oCommonModel").setProperty("/billingObject", Object);
                UIComponent.getRouterFor(this).navTo("FreightChargesScreen");
            }
        });
    });

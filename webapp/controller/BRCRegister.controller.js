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

        return Controller.extend("zexim.controller.BRCRegister", {
            onInit: function () {

            },
            OnExecute: function (){
                var FromPlant = this.getView().byId("FromPlant").getValue();
                var ToPlant = this.getView().byId("ToPlant").getValue();
                var FromInvoiceNo = this.getView().byId("FromInvoiceNo").getValue();
                var ToInvoiceNo = this.getView().byId("ToInvoiceNo").getValue();
                var FromInvoiceDt = this.getView().byId("FromInvoiceDt").getValue();
                var ToInvoiceDt = this.getView().byId("ToInvoiceDt").getValue();
                UIComponent.getRouterFor(this).navTo("BRCRegisterScreen");
            }
        });
    });

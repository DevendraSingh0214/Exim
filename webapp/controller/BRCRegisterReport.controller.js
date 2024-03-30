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

        return Controller.extend("zexim.controller.BRCRegisterReport", {
            onInit: function () {
                var oPanel = this.getView().byId("Panel2");
                oPanel.setVisible(false);
            },
            OnExecute: function () {
                var FromPlant = this.getView().byId("FromPlant").getValue();
                var ToPlant = this.getView().byId("ToPlant").getValue();
                var FromBillingDt = this.getView().byId("FromBillingDt").getValue();
                var ToBillingDt = this.getView().byId("FromBillingDt").getValue();
                var oPanel = this.getView().byId("Panel2");
                if(FromPlant === "" && ToPlant === "" && FromBillingDt === "" && ToBillingDt === "" ){
                    MessageBox.error("Please enter at least one field");
                    
                }
                else{
                    oPanel.setVisible(true);
                }
            }
        });
    });

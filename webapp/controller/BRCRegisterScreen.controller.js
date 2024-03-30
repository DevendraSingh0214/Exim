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

        return Controller.extend("zexim.controller.BRCRegisterScreen", {
            onInit: function () {
                // var oTable1 = this.getView().byId("BRCTable");
                // oTable1.setFixedColumnCount(10);
            }
        });
    });

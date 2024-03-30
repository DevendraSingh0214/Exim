sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Panel",
    "sap/ui/core/UIComponent",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Panel, UIComponent, Filter, FilterOperator, MessageBox) {
        "use strict";

        return Controller.extend("zexim.controller.FirstScreen", {
            onInit: function () {
                this.onChangeAction();
            },
            onPanelExpand: function (oEvent) {
                var expandedPanelId = oEvent.getSource().getId();
                var panels = ["panel1", "panel2", "panel3"];

                panels.forEach(function (panelId) {
                    var panel = this.getView().byId(panelId);
                    if (panelId === expandedPanelId) {
                        // Expand the clicked panel
                        panel.setExpanded(true);
                    } else {
                        // Collapse other panels
                        panel.setExpanded(false);
                    }
                }, this);
            },
            onSubmit: function (oEvent) {
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Loading",
                    text: "Please wait"
                });
                oBusyDialog.open();
                var oInput = this.getView().byId("idInp").getValue();
                if (oInput != "") {
                    var PrintType = oEvent.getSource().mProperties.text;
                    var urlParam = "";
                    if (PrintType === "Custom Invoice") {
                        urlParam = "custominvoice"
                    } else if (PrintType === "Notification") {
                        urlParam = "notification"
                    } else if (PrintType === "Annexure A") {
                        urlParam = "annexure"
                    } else if (PrintType === "Verified Gross Mass (VGM)") {
                        urlParam = "vgm"
                    } else if (PrintType === "Self Sealing Nhava Sheva") {
                        urlParam = "nhavasheva"
                    } else if (PrintType === "Pre Shipment Advice") {
                        urlParam = "preshipmentadvice"
                    } else if (PrintType === "Self Sealing") {
                        urlParam = "SelfSealingPrint"
                    } else if (PrintType === "Bill of Lading") {
                        urlParam = "billoflading"
                    } else if (PrintType === "BL Draft") {
                        urlParam = "bldraft"
                    } else if (PrintType === "Country of Origin") {
                        urlParam = "countryoforigin"
                    } else if (PrintType === "Prerequisite Form") {
                        urlParam = "prerequisiteform"
                    } else if (PrintType === "Commercial Invoice") {
                        urlParam = "commercialinvoice"
                    } else if (PrintType === "Packing List") {
                        urlParam = "packinglist"
                    } else if (PrintType === "Packing List Detail") {
                        urlParam = "packinglistdetail"
                    } else if (PrintType === "Weight List") {
                        urlParam = "weightlist"
                    } else if (PrintType === "Certificate of Quantity and Weight") {
                        urlParam = "quantityandweight"
                    } else if (PrintType === "Shipping Advice") {
                        urlParam = "shippingadvice"
                    } else if (PrintType === "Weight and Measurement List") {
                        urlParam = "weightmeasurelist"
                    } else if (PrintType === "Bill of Exchange") {
                        urlParam = "billofexchange"
                    } else if (PrintType === "Bill of Exchange Advance") {
                        urlParam = "exchangeadvance"
                    } else if (PrintType === "Beneficiary Certificate (FORH)") {
                        urlParam = "certificateforh"
                    } else if (PrintType === "Beneficiary Certificate (50/50)") {
                        urlParam = "certificate5050"
                    } else if (PrintType === "Beneficiary Certificate Non Plastic") {
                        urlParam = "certificatenonplastic"
                    } else if (PrintType === "Beneficiary Certificate (Manufacturing)") {
                        urlParam = "certificatemanufacturing"
                    }
                    var url1 = "/sap/bc/http/sap/zexim_http?";
                    var url2 = "sap-client=080";
                    var url3 = "&value1=";
                    var url4 = "&invoice=";

                    var url5 = url3 + urlParam;
                    var url6 = url4 + oInput;

                    var url = url1 + url2 + url5 + url6;
                    $.ajax({
                        url: url,
                        cache: false,
                        type: "GET",
                        // beforeSend: function (xhr) {
                        //     xhr.withCredentials = true;
                        //     xhr.username = username;
                        //     xhr.password = password;
                        // },
                        success: function (result) {
                            if (result.slice(0, 5) === "ERROR") {
                                oBusyDialog.close();
                                MessageBox.error(result);
                            } else {
                                var decodedPdfContent = atob(result);
                                var byteArray = new Uint8Array(decodedPdfContent.length);
                                for (var i = 0; i < decodedPdfContent.length; i++) {
                                    byteArray[i] = decodedPdfContent.charCodeAt(i);
                                }
                                var blob = new Blob([byteArray.buffer], {
                                    type: 'application/pdf'
                                });
                                var _pdfurl = URL.createObjectURL(blob);
                                if (!this._PDFViewer) {
                                    this._PDFViewer = new sap.m.PDFViewer({
                                        width: "auto",
                                        source: _pdfurl
                                    });
                                    jQuery.sap.addUrlWhitelist("blob"); // register blob url as whitelist
                                    // this._PDFViewer.removeAllPopupButtons();
                                } else {
                                    this._PDFViewer = new sap.m.PDFViewer({
                                        width: "auto",
                                        source: _pdfurl
                                    });
                                }
                                oBusyDialog.close();
                                this._PDFViewer.open();
                            }
                        }.bind(this),
                        error: function () {
                            oBusyDialog.close();
                        }

                    });
                } else {
                    oBusyDialog.close();
                    this.getView().byId("idInp").setValueState("Error")
                }
            },
            Invoice_Enter_Function: function () {
                var oInput = this.getView().byId("idInp").getValue();
                if (oInput != "") {
                    this.getView().byId("idInp").setValueState("None")
                }
            },
            Pre_Shipment_Details: function () {
                UIComponent.getRouterFor(this).navTo("PreShipment");
            },
            Post_Shipment_Details: function () {
                UIComponent.getRouterFor(this).navTo("PostShipment");
            },
            Brc_Register: function () {
                UIComponent.getRouterFor(this).navTo("BRCRegister");
            },
            Fright_Charges: function () {
                UIComponent.getRouterFor(this).navTo("FreightCharges");
            },
            Freight_Capturing_Report: function () {
                UIComponent.getRouterFor(this).navTo("FrightCapturingReport");
            },
            SampleInvoice: function () {
                UIComponent.getRouterFor(this).navTo("SampleInvoice");
            },
            PreShipmentReport: function () {
                UIComponent.getRouterFor(this).navTo("PreShipmentReport");
            },

            FreightChargesReport: function () {
                UIComponent.getRouterFor(this).navTo("FreightChargesreport");
            },
            BRCRegisterReport: function () {
                UIComponent.getRouterFor(this).navTo("BRCRegisterReport");
            },
            DrawBackReport: function () {
                UIComponent.getRouterFor(this).navTo("DrawBackReport");
            },


            onChangeAction: function () {
                var GateEntryAction = this.getView().byId("GateEntryAction").getSelectedButton().getText();
                if (GateEntryAction === "Extraction of Data") {
                    var oPanel1 = this.getView().byId("panel1")
                    oPanel1.setVisible(true)
                    var oPanel2 = this.getView().byId("panel2")
                    oPanel2.setVisible(false)
                    var oPanel3 = this.getView().byId("panel3")
                    oPanel3.setVisible(false)
                } else if (GateEntryAction === "Prints") {
                    var oPanel1 = this.getView().byId("panel1")
                    oPanel1.setVisible(false)
                    var oPanel2 = this.getView().byId("panel2")
                    oPanel2.setVisible(true)
                    var oPanel3 = this.getView().byId("panel3")
                    oPanel3.setVisible(false)
                } else if (GateEntryAction === "Report") {
                    var oPanel1 = this.getView().byId("panel1")
                    oPanel1.setVisible(false)
                    var oPanel2 = this.getView().byId("panel2")
                    oPanel2.setVisible(false)
                    var oPanel3 = this.getView().byId("panel3")
                    oPanel3.setVisible(true)
                }
            },
        });
    });

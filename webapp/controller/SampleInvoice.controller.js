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

        return Controller.extend("zexim.controller.SampleInvoice", {
            onInit: function () {
                this.getView().setModel(new sap.ui.model.json.JSONModel, "oTableDataModel");
                this.getView().getModel("oTableDataModel").setProperty("/aTableData", []);
            },
            AddSingleEmptyRow: function () {
                var aNewArr = this.getView().getModel("oTableDataModel").getProperty("/aTableData");
                aNewArr.push({ "ContaineNo": "", "NoandKindofPackages": "", "DescriptionofGoods": "", "Quantity": "", "Rate": "", "Amount": "", });
                this.getView().getModel("oTableDataModel").setProperty("/aTableData", aNewArr);
            },
            DeleteTables_SelectedRow: function (oEvent) {
                var aNewArr = this.getView().getModel("oTableDataModel").getProperty("/aTableData");
                var oTable = this.getView().byId("FirstTable");
                var indicesToRemove = oTable.getSelectedIndices();
                aNewArr = aNewArr.filter((_, index) => !indicesToRemove.includes(index));
                this.getView().getModel("oTableDataModel").setProperty("/aTableData", aNewArr);
            },
            CallPrint: function () {
                // https://my410662.s4hana.cloud.sap:443/sap/bc/http/sap/ZSAMPLE_INVOICE_PRINT_HTTP?sap-client=080
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Loading",
                    text: "Please wait"
                });
                oBusyDialog.open();
                var aTableData = this.getView().getModel("oTableDataModel").getProperty("/aTableData")
                var Exporter = encodeURIComponent(this.getView().byId("Exporter").getValue());
                var Consigne = encodeURIComponent(this.getView().byId("Consigne").getValue());
                var PreCarriageBy = encodeURIComponent(this.getView().byId("PreCarriageBy").getValue());
                var PlaceofReciept = encodeURIComponent(this.getView().byId("PlaceofReciept").getValue());
                var VesselFlightNo = encodeURIComponent(this.getView().byId("VesselFlightNo").getValue());
                var PortOfLoading = encodeURIComponent(this.getView().byId("PortOfLoading").getValue());
                var PortOfDischarge = encodeURIComponent(this.getView().byId("PortOfDischarge").getValue());
                var PortOfDestination = encodeURIComponent(this.getView().byId("PortOfDestination").getValue());
                var SampleInvoiceNo = encodeURIComponent(this.getView().byId("SampleInvoiceNo").getValue());
                var SampleInvoiceDate = encodeURIComponent(this.getView().byId("SampleInvoiceDate").getValue());
                var ExportersRef = encodeURIComponent(this.getView().byId("ExportersRef").getValue());
                var BuyersOrderNo = encodeURIComponent(this.getView().byId("BuyersOrderNo").getValue());
                var OtherReference = encodeURIComponent(this.getView().byId("OtherReference").getValue());
                var Country_ofOrgin_of_Goods = encodeURIComponent(this.getView().byId("Country_ofOrgin_of_Goods").getValue());
                var CountryofFinalDestination = encodeURIComponent(this.getView().byId("CountryofFinalDestination").getValue());
                var TermsofDeliveryandPayment = encodeURIComponent(this.getView().byId("TermsofDeliveryandPayment").getValue());
                var url1 = "/sap/bc/http/sap/ZSAMPLE_INVOICE_PRINT_HTTP?sap-client=080";
                var url2 = "&Exporter=" + Exporter;
                var url3 = "&Consigne=" + Consigne;
                var url4 = "&PreCarriageBy=" + PreCarriageBy;
                var url5 = "&PlaceofReciept=" + PlaceofReciept;
                var url6 = "&VesselFlightNo=" + VesselFlightNo;
                var url7 = "&PortOfLoading=" + PortOfLoading;
                var url8 = "&PortOfDischarge=" + PortOfDischarge;
                var url9 = "&PortOfDestination=" + PortOfDestination;
                var url10 = "&SampleInvoiceNo=" + SampleInvoiceNo;
                var url11 = "&SampleInvoiceDate=" + SampleInvoiceDate;
                var url12 = "&ExportersRef=" + ExportersRef;
                var url13 = "&BuyersOrderNo=" + BuyersOrderNo;
                var url14 = "&OtherReference=" + OtherReference;
                var url15 = "&Country_ofOrgin_of_Goods=" + Country_ofOrgin_of_Goods;
                var url16 = "&CountryofFinalDestination=" + CountryofFinalDestination;
                var url17 = "&TermsofDeliveryandPayment=" + TermsofDeliveryandPayment;
                var url18 = "&LineItemData=" + JSON.stringify(aTableData);

                var url = url1 + url2 + url3 + url4 + url5 + url6 + url7 + url8 + url9 + url10 + url11 + url12 + url13 + url14 + url15 + url16 + url17 + url18;
                $.ajax({
                    url: url,
                    type: "GET",
                    beforeSend: function (xhr) {
                        xhr.withCredentials = true;
                        // xhr.username = username;
                        // xhr.password = password;
                    },
                    success: function (result) {
                        if (result == "ERROR") {
                            MessageBox.error(result)
                            oBusyDialog.close();
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
                            } else {
                                this._PDFViewer = new sap.m.PDFViewer({
                                    width: "auto",
                                    source: _pdfurl
                                });
                                jQuery.sap.addUrlWhitelist("blob"); // register blob url as whitelist
                            }
                            oBusyDialog.close();
                            this._PDFViewer.open();
                        }
                    }.bind(this),
                    error() {
                        oBusyDialog.close();
                    }

                });

            },
        });
    });

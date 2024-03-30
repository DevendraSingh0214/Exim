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

        return Controller.extend("zexim.controller.PreShipmentReport", {
            onInit: function () {
                this.getView().setModel(new sap.ui.model.json.JSONModel, "oTableDataModel");
                this.getView().getModel("oTableDataModel").setProperty("/aTableData", []);
                // this.GetTableData();
                UIComponent.getRouterFor(this).getRoute('PreShipmentReport').attachPatternMatched(this.GetAllServiceData, this);
            },
            GetAllServiceData: function () {
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Fetching Data",
                    text: "Please wait"
                });
                oBusyDialog.open();
                var oTableDataModel = this.getView().getModel("oTableDataModel");
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YEXIMALLCDS")
                var sInput = this.getView().byId("Invoice").getValue();
                var aFilters = [];
                if (sInput != "") {
                    aFilters.push(new sap.ui.model.Filter("Docno", "EQ", sInput))
                }
                var oFilter1 = new sap.ui.model.Filter("BillingDocument", "EQ", sInput);
                aFilters.push(new sap.ui.model.Filter("Doctype", "EQ", "PS"))

                oModel.read("/ZEXIM_ALL", {
                    filters: [aFilters],
                    urlParameters: {
                        "$top": "50000"
                    },
                    success: function (oresponse) {
                        var aTableData = [];
                        if (oresponse.results.length != 0) {
                            oresponse.results.map(function (items) {
                                const DocDate = new Date(items.DocDate);
                                const DocDate1 = items.DocDate == null ? "" : `${DocDate.getFullYear()}-${DocDate.getMonth() + 1 < 10 ? '0' : ''}${DocDate.getMonth() + 1}-${DocDate.getDate() < 10 ? '0' : ''}${DocDate.getDate()}`;

                                const RefreanceDate = new Date(items.RefreanceDate);
                                const RefreanceDate1 = items.RefreanceDate == null ? "" : `${RefreanceDate.getFullYear()}-${RefreanceDate.getMonth() + 1 < 10 ? '0' : ''}${RefreanceDate.getMonth() + 1}-${RefreanceDate.getDate() < 10 ? '0' : ''}${RefreanceDate.getDate()}`;

                                const Peformadate = new Date(items.Peformadate);
                                const Peformadate1 = items.Peformadate == null ? "" : `${Peformadate.getFullYear()}-${Peformadate.getMonth() + 1 < 10 ? '0' : ''}${Peformadate.getMonth() + 1}-${Peformadate.getDate() < 10 ? '0' : ''}${Peformadate.getDate()}`;

                                const Deliverydate = new Date(items.Deliverydate);
                                const Deliverydate1 = items.Deliverydate == null ? "" : `${Deliverydate.getFullYear()}-${Deliverydate.getMonth() + 1 < 10 ? '0' : ''}${Deliverydate.getMonth() + 1}-${Deliverydate.getDate() < 10 ? '0' : ''}${Deliverydate.getDate()}`;

                                const LrDate = new Date(items.LrDate);
                                const LrDate1 = items.LrDate == null ? "" : `${LrDate.getFullYear()}-${LrDate.getMonth() + 1 < 10 ? '0' : ''}${LrDate.getMonth() + 1}-${LrDate.getDate() < 10 ? '0' : ''}${LrDate.getDate()}`;

                                const Epcgdate = new Date(items.Epcgdate);
                                const Epcgdate1 = items.Epcgdate == null ? "" : `${Epcgdate.getFullYear()}-${Epcgdate.getMonth() + 1 < 10 ? '0' : ''}${Epcgdate.getMonth() + 1}-${Epcgdate.getDate() < 10 ? '0' : ''}${Epcgdate.getDate()}`;

                                const Shipmentdate = new Date(items.Shipmentdate);
                                const Shipmentdate1 = items.Shipmentdate == null ? "" : `${Shipmentdate.getFullYear()}-${Shipmentdate.getMonth() + 1 < 10 ? '0' : ''}${Shipmentdate.getMonth() + 1}-${Shipmentdate.getDate() < 10 ? '0' : ''}${Shipmentdate.getDate()}`;

                                const Bldate = new Date(items.Bldate);
                                const Bldate1 = items.Bldate == null ? "" : `${Bldate.getFullYear()}-${Bldate.getMonth() + 1 < 10 ? '0' : ''}${Bldate.getMonth() + 1}-${Bldate.getDate() < 10 ? '0' : ''}${Bldate.getDate()}`;



                                var freight = parseFloat(items.frt1_exim + items.frt2_exim).toFixed(2);
                                var assessable = parseFloat(items.assesible * items.exchangerate).toFixed(2);
                                var commission = parseFloat(items.COMMISION1_exim + items.commision_exim).toFixed(2);
                                var grandtotal = parseFloat(items.docuhead_netamt + items.docuhead_total_tax).toFixed(2);
                                aTableData.push({
                                    //General Tab Data Start
                                    "Docno": items.Docno,
                                    "Doctype": items.Doctype,
                                    "DocDate": DocDate1,
                                    "RefreanceNo": items.RefreanceNo,
                                    "RefreanceDate": RefreanceDate1,
                                    "Peformano": items.Peformano,
                                    "Peformadate": Peformadate1,
                                    "Deliveryno": items.Deliveryno,
                                    "Deliverydate": Deliverydate1,
                                    "TransporterName": items.TransporterName,
                                    "Lrno": items.Lrno,
                                    "LrDate": LrDate1,
                                    "TruckNo": items.TruckNo,
                                    "Containerno": items.Containerno,
                                    "Containersize": items.Containersize,
                                    "RfidNo": items.RfidNo,
                                    "Lineseal": items.Lineseal,
                                    "Vesselno": items.Vesselno,
                                    "shipmenttype": items.shipmenttype,
                                    "Precarrier": items.Precarrier,
                                    "Portofdischarge": items.Portofdischarge,
                                    "Portofloading": items.Portofloading,
                                    "Epcgno": items.Epcgno,
                                    "Epcgdate": Epcgdate1,
                                    "Remarks": items.Remarks,
                                    "Remarks1": items.Remarks1,
                                    "Remarks2": items.Remarks2,
                                    "PaymentTerms": items.PaymentTerms,
                                    "Deliveryterms": items.Deliveryterms,
                                    "Incotermslocation": items.Incotermslocation,
                                    "Shipmentmark": items.Shipmentmark,
                                    "Shipmentdate": Shipmentdate1,
                                    "Weightofcontainer": items.Weightofcontainer,
                                    "Exportname1": "SUDIVA SPINNERS PVT. LTD.",
                                    "Street1": "N.H.48",
                                    "Street2": "Village: Dhunwalia",
                                    "Street3": "Post-Sareri",
                                    "City": "BHILWARA-311024(RAJ.)",
                                    "Country": "INDIA",
                                    "Exporteriecno": items.Exporteriecno,
                                    "Authorisedsigntory": items.Authorisedsigntory,
                                    "Authorisedsigntoryno": "8959900078",
                                    "Designation": items.Designation,
                                    "Nameofcustomsbroker": items.Nameofcustomsbroker,
                                    "Maxperwt": items.Maxperwt,
                                    "Contareweight": items.Contareweight,
                                    "Weighslip": items.Weighslip,
                                    "Bldate": Bldate1,
                                    //General Tab Data End



                                    //Buyer Data Tab Data start
                                    "Billtobuyrname": items.Billtobuyrname,
                                    "Billtostreet1": items.Billtostreet1,
                                    "Billtostreet2": items.Billtostreet2,
                                    "Billtostreet3": items.Billtostreet3,
                                    "Billtocity": items.Billtocity,
                                    "Billtocountry": items.Billtocountry,
                                    "Constoname": items.Constoname,
                                    "Constostreet1": items.Constostreet1,
                                    "Constostreet2": items.Constostreet2,
                                    "Constostreet3": items.Constostreet3,
                                    "Constocity": items.Constocity,
                                    "Constocountry": items.Constocountry,
                                    "Notifyname": items.Notifyname,
                                    "Notifystreet1": items.Notifystreet1,
                                    "Notifystreet2": items.Notifystreet2,
                                    "Notifystreet3": items.Notifystreet3,
                                    "Notifycity": items.Notifycity,
                                    "Notifycountry": items.Notifycountry,
                                    "Notify2name": items.Notify2name,
                                    "Notify2street1": items.Notify2street1,
                                    "Notify2street2": items.Notify2street2,
                                    "Notify2street3": items.Notify2street3,
                                    "Notify2city": items.Notify2city,
                                    "Notify2country": items.Notify2country,
                                    "Conslctoname": items.Conslctoname,
                                    "Conslctostreet1": items.Conslctostreet1,
                                    "Conslctostreet2": items.Conslctostreet2,
                                    "Conslctostreet3": items.Conslctostreet3,
                                    "Conslctocity": items.Conslctocity,
                                    "Conslctocountry": items.Conslctocountry,
                                    "Notify3name": items.Notify3name,
                                    "Notify3street1": items.Notify3street1,
                                    "Notify3street2": items.Notify3street2,
                                    "Notify3street3": items.Notify3street3,
                                    "Notify3city": items.Notify3city,
                                    "Notify3country": items.Notify3country,
                                    //Buyer Data Tab Data End

                                    //Calculation Data Tab Data start
                                    "Docno": items.BillingDocument,
                                    "Doctype": "PS",
                                    "Totalqty": items.totalnetquantity,
                                    "Totalnetqty": items.totalnetquantity,
                                    "Totalgrosswt": items.totalgrossquantity,
                                    "Totalpackages": items.zpackage,
                                    "Typeofpackages": "",
                                    "Doccurrency": items.trancurr,
                                    "Exchangerate": items.exchangerate,
                                    "Commission": commission,
                                    "Insurance": items.INSURANCE_exim,
                                    "Insurancepre": items.INSURANCEPREMIUM,
                                    "Freight": freight,
                                    "Oceanfreight": items.OCEANFREIGHT_exim,
                                    "Dutycalculation": items.INSURANCEPREMIUM,
                                    "Assessablevalueinrs": assessable,
                                    "Gst": items.gst_exim,
                                    "Invoiceamount": items.docuhead_netamt,
                                    "Addamt": items.ADDAMT_exim,
                                    "Lessamt": items.DISCOUNT_exim,
                                    "Grandtotalamount": grandtotal,
                                    "Amountinwords": "",
                                    "Lcno": items.LcNo,
                                    "Lcdate": "",
                                    "Issueingbank": items.Issueingbank,
                                    "Bank": "",
                                    "Adcodebank": "",
                                    "Buyername": "",
                                    "Calculation_Street1": "",
                                    "Calculation_Street2": "",
                                    "Calculation_Street3": "",
                                    "Stufffileno": "",
                                    "Stufffilpermdate": "",
                                    "Exportunder": "",
                                    "Advancelicense": ""
                                    //Calculation Data Tab Data end

                                })
                            })
                            oBusyDialog.close();
                            oTableDataModel.setProperty("/aTableData", aTableData);
                        } else {
                            oTableDataModel.setProperty("/aTableData", aTableData);
                            oBusyDialog.close();
                        }
                    }
                })
            },










            GetTableData: function () {
                this.getGeneralTabServiceData();
                this.getBuyerTabServiceData();
                this.getCalculationTabServiceData();
                this.getItemDetailsTabServiceData();
                this.getExtraDetailsTabServiceData();
            },
            getGeneralTabServiceData: function () {
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Fetching Data",
                    text: "Please wait"
                });
                oBusyDialog.open();
                var oGeneralTableDataModel = this.getView().getModel("oGeneralTableDataModel");
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZEXIM_V2API")
                var sInput = this.getView().byId("Invoice").getValue();
                var aFilters = [];
                if (sInput != "") {
                    aFilters.push(new sap.ui.model.Filter("Docno", "EQ", sInput))
                }
                var oFilter1 = new sap.ui.model.Filter("BillingDocument", "EQ", sInput);
                aFilters.push(new sap.ui.model.Filter("Doctype", "EQ", "PS"))

                oModel.read("/generaltab_", {
                    filters: [aFilters],
                    urlParameters: {
                        "$top": "50000"
                    },
                    success: function (oresponse) {
                        var aGeneralTableData = [];
                        if (oresponse.results.length != 0) {
                            oBusyDialog.close();
                            oresponse.results.map(function (items) {
                                const DocDate = new Date(items.DocDate);
                                const DocDate1 = items.DocDate == null ? "" : `${DocDate.getFullYear()}-${DocDate.getMonth() + 1 < 10 ? '0' : ''}${DocDate.getMonth() + 1}-${DocDate.getDate() < 10 ? '0' : ''}${DocDate.getDate()}`;

                                const RefreanceDate = new Date(items.RefreanceDate);
                                const RefreanceDate1 = items.RefreanceDate == null ? "" : `${RefreanceDate.getFullYear()}-${RefreanceDate.getMonth() + 1 < 10 ? '0' : ''}${RefreanceDate.getMonth() + 1}-${RefreanceDate.getDate() < 10 ? '0' : ''}${RefreanceDate.getDate()}`;

                                const Peformadate = new Date(items.Peformadate);
                                const Peformadate1 = items.Peformadate == null ? "" : `${Peformadate.getFullYear()}-${Peformadate.getMonth() + 1 < 10 ? '0' : ''}${Peformadate.getMonth() + 1}-${Peformadate.getDate() < 10 ? '0' : ''}${Peformadate.getDate()}`;

                                const Deliverydate = new Date(items.Deliverydate);
                                const Deliverydate1 = items.Deliverydate == null ? "" : `${Deliverydate.getFullYear()}-${Deliverydate.getMonth() + 1 < 10 ? '0' : ''}${Deliverydate.getMonth() + 1}-${Deliverydate.getDate() < 10 ? '0' : ''}${Deliverydate.getDate()}`;

                                const LrDate = new Date(items.LrDate);
                                const LrDate1 = items.LrDate == null ? "" : `${LrDate.getFullYear()}-${LrDate.getMonth() + 1 < 10 ? '0' : ''}${LrDate.getMonth() + 1}-${LrDate.getDate() < 10 ? '0' : ''}${LrDate.getDate()}`;

                                const Epcgdate = new Date(items.Epcgdate);
                                const Epcgdate1 = items.Epcgdate == null ? "" : `${Epcgdate.getFullYear()}-${Epcgdate.getMonth() + 1 < 10 ? '0' : ''}${Epcgdate.getMonth() + 1}-${Epcgdate.getDate() < 10 ? '0' : ''}${Epcgdate.getDate()}`;

                                const Shipmentdate = new Date(items.Shipmentdate);
                                const Shipmentdate1 = items.Shipmentdate == null ? "" : `${Shipmentdate.getFullYear()}-${Shipmentdate.getMonth() + 1 < 10 ? '0' : ''}${Shipmentdate.getMonth() + 1}-${Shipmentdate.getDate() < 10 ? '0' : ''}${Shipmentdate.getDate()}`;

                                const Bldate = new Date(items.Bldate);
                                const Bldate1 = items.Bldate == null ? "" : `${Bldate.getFullYear()}-${Bldate.getMonth() + 1 < 10 ? '0' : ''}${Bldate.getMonth() + 1}-${Bldate.getDate() < 10 ? '0' : ''}${Bldate.getDate()}`;

                                aGeneralTableData.push({
                                    "Docno": items.Docno,
                                    "Doctype": items.Doctype,
                                    "DocDate": DocDate1,
                                    "RefreanceNo": items.RefreanceNo,
                                    "RefreanceDate": RefreanceDate1,
                                    "Peformano": items.Peformano,
                                    "Peformadate": Peformadate1,
                                    "Deliveryno": items.Deliveryno,
                                    "Deliverydate": Deliverydate1,
                                    "TransporterName": items.TransporterName,
                                    "Lrno": items.Lrno,
                                    "LrDate": LrDate1,
                                    "TruckNo": items.TruckNo,
                                    "Containerno": items.Containerno,
                                    "Containersize": items.Containersize,
                                    "RfidNo": items.RfidNo,
                                    "Lineseal": items.Lineseal,
                                    "Vesselno": items.Vesselno,
                                    "shipmenttype": items.shipmenttype,
                                    "Precarrier": items.Precarrier,
                                    "Portofdischarge": items.Portofdischarge,
                                    "Portofloading": items.Portofloading,
                                    "Epcgno": items.Epcgno,
                                    "Epcgdate": Epcgdate1,
                                    "Remarks": items.Remarks,
                                    "Remarks1": items.Remarks1,
                                    "Remarks2": items.Remarks2,
                                    "PaymentTerms": items.PaymentTerms,
                                    "Deliveryterms": items.Deliveryterms,
                                    "Incotermslocation": items.Incotermslocation,
                                    "Shipmentmark": items.Shipmentmark,
                                    "Shipmentdate": Shipmentdate1,
                                    "Weightofcontainer": items.Weightofcontainer,
                                    "Exportname1": "SUDIVA SPINNERS PVT. LTD.",
                                    "Street1": "N.H.48",
                                    "Street2": "Village: Dhunwalia",
                                    "Street3": "Post-Sareri",
                                    "City": "BHILWARA-311024(RAJ.)",
                                    "Country": "INDIA",
                                    "Exporteriecno": items.Exporteriecno,
                                    "Authorisedsigntory": items.Authorisedsigntory,
                                    "Authorisedsigntoryno": "8959900078",
                                    "Designation": items.Designation,
                                    "Nameofcustomsbroker": items.Nameofcustomsbroker,
                                    "Maxperwt": items.Maxperwt,
                                    "Contareweight": items.Contareweight,
                                    "Weighslip": items.Weighslip,
                                    "Bldate": Bldate1
                                })
                            })
                            oGeneralTableDataModel.setProperty("/aGeneralTableData", aGeneralTableData);

                        } else {
                            oGeneralTableDataModel.setProperty("/aGeneralTableData", aGeneralTableData);
                            oBusyDialog.close();
                        }
                    }
                })
            },
            getBuyerTabServiceData: function () {

            },
            getCalculationTabServiceData: function () {

            },
            getItemDetailsTabServiceData: function () {

            },
            getExtraDetailsTabServiceData: function () {

            },
        });
    });

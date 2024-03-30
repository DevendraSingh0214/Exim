sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, Filter, FilterOperator, MessageBox) {
        "use strict";

        return Controller.extend("zexim.controller.PreShipment", {
            onInit: function () {
                var oTransport = {
                    TransportType: [
                        {
                            Key: 1,
                            Description: "By Road"
                        },
                        {
                            Key: 2,
                            Description: "By Air"
                        },
                        {
                            Key: 3,
                            Description: "By Sea"
                        }, {
                            Key: 4,
                            Description: "Road/Rail"
                        }, {
                            Key: 5,
                            Description: "Road/Air"
                        }, {
                            Key: 6,
                            Description: "Road/Sea"
                        }
                    ]
                }
                this.getView().setModel(new sap.ui.model.json.JSONModel(oTransport), "oTransportType");

                var oPortofLoading = {
                    Portofloading: [
                        {
                            Key: "1",
                            Description: "PIPAVAV"
                        },
                        {
                            Key: 2,
                            Description: "NHAVA SHEVA, INDIA"
                        },
                        {
                            Key: 3,
                            Description: "J.N.P.T MUMBAI"
                        },
                        {
                            Key: 4,
                            Description: "MUNDRA"
                        },
                        {
                            Key: 5,
                            Description: "PETRA POLE"
                        },
                        {
                            Key: 6,
                            Description: "ANY PORT OF INDIA"
                        },
                        {
                            Key: 7,
                            Description: "HAZIRA PORT"
                        },
                        {
                            Key: 8,
                            Description: "MUMBAI AIRPORT"
                        },
                        {
                            Key: 9,
                            Description: "MANDIDEEP ICD INDIA"
                        },
                        {
                            Key: 10,
                            Description: "IGI, DELHI, INDIA"
                        },
                        {
                            Key: 11,
                            Description: "NSICT, INDIA"
                        },
                        {
                            Key: 12,
                            Description: "GTI, INDIA"
                        },
                        {
                            Key: 13,
                            Description: "KOLKATA PORT, INDIA"
                        },
                        {
                            Key: 14,
                            Description: "BHILWARA/INDIA"
                        },
                        {
                            Key: 15,
                            Description: "VISHAKHAPATNAM"
                        },
                        {
                            Key: 16,
                            Description: "ATTARI BORDER"
                        },
                        {
                            Key: 17,
                            Description: "JOGBANI NEPAL"
                        },
                        {
                            Key: 18,
                            Description: "VIZAG PORT"
                        }
                    ]
                }
                this.getView().setModel(new sap.ui.model.json.JSONModel(oPortofLoading), "oPortLoadingModel")

                var oDesignation = {
                    Designation: [
                        {
                            Key: "1",
                            Description: "Ast. Manager"
                        },
                        {
                            Key: "2",
                            Description: "Dypt. Manager"
                        },
                        {
                            Key: "3",
                            Description: ""
                        },
                        {
                            Key: "4",
                            Description: ""
                        }
                    ]
                }
                this.getView().setModel(new sap.ui.model.json.JSONModel(oDesignation), "oDesignationType");

                var oSignatory = {
                    Signatory: [
                        {
                            Key: 1,
                            Description: "Maneesh Gupta"
                        },
                        {
                            Key: 2,
                            Description: "Anant Pareek"
                        },
                        {
                            Key: 3,
                            Description: "Mahesh Bihani Ji"
                        },
                        {
                            Key: 4,
                            Description: "Anil Jhanwar"
                        }
                    ]
                }
                this.getView().setModel(new sap.ui.model.json.JSONModel(oSignatory), "oSignatureType");


                var oShipmentType = {
                    ShipmentType: [
                        {
                            Key: "LCL/LCL",
                            Description: "Loose Container Load"
                        },
                        {
                            Key: "LCL/FCL",
                            Description: "Loose/Full Container Load"
                        },
                        {
                            Key: "FCL/LCL",
                            Description: "Full/Loose Container Load"
                        },
                        {
                            Key: "FCL/FCL",
                            Description: "Full Container Load"
                        }
                    ]
                }
                this.getView().setModel(new sap.ui.model.json.JSONModel(oShipmentType), "oShipType")

                var oContainerSize = {
                    ContainerSize: [
                        {
                            Key: 1,
                            Description: "40'HC"
                        },
                        {
                            Key: 2,
                            Description: "20'SD"
                        }
                    ]
                }
                this.getView().setModel(new sap.ui.model.json.JSONModel(oContainerSize), "oContainer")

                this.getView().setModel(new sap.ui.model.json.JSONModel(), "oTableItemModel")
                this.getView().getModel("oTableItemModel").setProperty("/aTableItem", [])

                UIComponent.getRouterFor(this).getRoute('PreShipment').attachPatternMatched(this._onRouteMatch, this);
            },

            _onRouteMatch: function () {
                var oDate = new Date();
                var oPayloadObject = {
                    "Docno": "",
                    "Doctype": "PS",
                    "DocDate": oDate.getDate() + '-' + Number(oDate.getMonth() + 1) + '-' + oDate.getFullYear(),
                    "RefreanceNo": "",
                    "RefreanceDate": oDate.getDate() + '-' + Number(oDate.getMonth() + 1) + '-' + oDate.getFullYear(),
                    "Peformano": "",
                    "Peformadate": oDate.getDate() + '-' + Number(oDate.getMonth() + 1) + '-' + oDate.getFullYear(),
                    "Deliveryno": "",
                    "Deliverydate": oDate.getDate() + '-' + Number(oDate.getMonth() + 1) + '-' + oDate.getFullYear(),
                    "TransporterName": "",
                    "Lrno": "",
                    "LrDate": oDate.getDate() + '-' + Number(oDate.getMonth() + 1) + '-' + oDate.getFullYear(),
                    "TruckNo": "",
                    "Containerno": "",
                    "Containersize": "",
                    "RfidNo": "",
                    "Lineseal": "",
                    "Vesselno": "",
                    "Precarrier": "",
                    "Portofdischarge": "",
                    "Portofloading": "",
                    "Epcgno": "",
                    "Epcgdate": oDate.getDate() + '-' + Number(oDate.getMonth() + 1) + '-' + oDate.getFullYear(),
                    "Remarks": "",
                    "Remarks1": "",
                    "Remarks2": "",
                    "PaymentTerms": "",
                    "Deliveryterms": "",
                    "Incotermslocation": "",
                    "Shipmentmark": "",
                    "Shipmentdate": oDate.getDate() + '-' + Number(oDate.getMonth() + 1) + '-' + oDate.getFullYear(),
                    "Weightofcontainer": "",
                    "Exportname1": "SUDIVA SPINNERS PVT. LTD.",
                    "Street1": "N.H.48",
                    "Street2": "Village: Dhunwalia",
                    "Street3": "Post-Sareri",
                    "City": "BHILWARA-311024(RAJ.)",
                    "Country": "INDIA",
                    "Exporteriecno": "1111003726",
                    "Authorisedsigntory": "",
                    "Authorisedsigntoryno": "7230051055",
                    "Designation": "",
                    "Nameofcustomsbroker": "",
                    "Maxperwt": "",
                    "Contareweight": "",
                    "Weighslip": ""
                }
                this.getView().setModel(new sap.ui.model.json.JSONModel(oPayloadObject), "oPayloadData")

                var oBuyerPayloadObject = {
                    "Docno": "",
                    "Doctype": "PS",
                    "Billtobuyrname": "",
                    "Billtostreet1": "",
                    "Billtostreet2": "",
                    "Billtostreet3": "",
                    "Billtocity": "",
                    "Billtocountry": "",
                    "Constoname": "",
                    "Constostreet1": "",
                    "Constostreet2": "",
                    "Constostreet3": "",
                    "Constocity": "",
                    "Constocountry": "",
                    "Tobecontinue": "",
                    "Notifyname": "",
                    "Notifystreet1": "",
                    "Notifystreet2": "",
                    "Notifystreet3": "",
                    "Notifycity": "",
                    "Notifycountry": "",
                    "Notify2name": "",
                    "Notify2street1": "",
                    "Notify2street2": "",
                    "Notify2street3": "",
                    "Notify2city": "",
                    "Notify2country": "",
                    "Conslctoname": "",
                    "Conslctostreet1": "",
                    "Conslctostreet2": "",
                    "Conslctostreet3": "",
                    "Conslctocity": "",
                    "Conslctocountry": "",
                    "Notify3name": "",
                    "Notify3street1": "",
                    "Notify3street2": "",
                    "Notify3street3": "",
                    "Notify3city": "",
                    "Notify3country": ""
                }
                this.getView().setModel(new sap.ui.model.json.JSONModel(oBuyerPayloadObject), "oBuyerPayload")

                var oCalculationObject = {
                    "Docno": "",
                    "Doctype": "PS",
                    "Totalqty": "",
                    "Totalnetqty": "",
                    "Totalgrosswt": "",
                    "Totalpackages": "",
                    "Typeofpackages": "",
                    "Doccurrency": "",
                    "Exchangerate": "",
                    "Commission": "",
                    "Insurance": "",
                    "Insurancepre": "",
                    "Freight": "",
                    "Oceanfreight": "",
                    "Dutycalculation": "",
                    "Assessablevalueinrs": "",
                    "Gst": "",
                    "Invoiceamount": "",
                    "Addamt": "",
                    "Lessamt": "",
                    "Grandtotalamount": "",
                    "Amountinwords": "",
                    "Lcno": "",
                    "Lcdate": "",
                    "Issueingbank": "",
                    "Bank": "",
                    "Adcodebank": "",
                    "Buyername": "",
                    "Street1": "",
                    "Street2": "",
                    "Street3": "",
                    "Shippingline": "",
                    "Etddate": "",
                    "Etadate": "",
                    "Stufffileno": "",
                    "Stufffilpermdate": "",
                    "Exportunder": "",
                    "Advancelicense": "",
                    "Frightchargetype": "",
                    "Foreignbank": "",
                    "Lcdate1": ""
                }
                this.getView().setModel(new sap.ui.model.json.JSONModel(oCalculationObject), "oCalculationPayload")

                var oSettingObject = {
                    editable: true
                }
                this.getView().setModel(new sap.ui.model.json.JSONModel(oSettingObject), "oGeneralModel")
            },

            handleSelect: function () {
                var value = this.getView().byId("idCheckBox").getSelected();
                if (value === true) {
                    this.getView().getModel("oGeneralModel").setProperty("/editable", false)
                } else {
                    this.getView().getModel("oGeneralModel").setProperty("/editable", true)
                }
            },

            onRead: function () {
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Fetching Data",
                    text: "Please wait"
                });
                oBusyDialog.open();
                var oModel = this.getView().getModel();
                var DocType = this.getView().byId("idDocType").getValue();
                var sInput = this.getView().byId("idDoc").getValue();
                var oFilter = new sap.ui.model.Filter("Docno", "EQ", sInput);
                var oFilter1 = new sap.ui.model.Filter("BillingDocument", "EQ", sInput);
                var oFilter2 = new sap.ui.model.Filter("Doctype", "EQ", DocType);

                var oDate = new Date();
                var newDate = new Date(oDate.getTime() - oDate.getTimezoneOffset() * 60000);
                var newDate1 = newDate.toISOString().slice(0, 16);

                oModel.read("/generaltab_", {
                    filters: [oFilter, oFilter2],
                    urlParameters: {
                        "$top": "500000"
                    },
                    success: function (oresponse) {
                        if (oresponse.results.length === 0) {
                            oModel.read("/YEINVOICE_CDS", {
                                filters: [oFilter1],
                                success: function (oresponse) {
                                    oBusyDialog.close
                                    if (oresponse.results[0].lrdate === null) {
                                        var oLrDate = newDate1;
                                    } else {
                                        var oLrDate = oresponse.results[0].lrdate;
                                    }

                                    if (oresponse.results[0].BillingDocumentDate === null) {
                                        var oBillingDocumentDate = newDate1;
                                    } else {
                                        var oBillingDocumentDate = oresponse.results[0].BillingDocumentDate;
                                    }

                                    if (oresponse.results[0].Buyerrefrencedate === null) {
                                        var oBuyerrefrencedate = newDate1;
                                    } else {
                                        var oBuyerrefrencedate = oresponse.results[0].Buyerrefrencedate;
                                    }

                                    if (oresponse.results[0].SalesDocumentDate === null) {
                                        var oSalesDocumentDate = newDate1;
                                    } else {
                                        var oSalesDocumentDate = oresponse.results[0].SalesDocumentDate;
                                    }

                                    if (oresponse.results[0].DeliveryDate === null) {
                                        var oDeliveryDate = newDate1;
                                    } else {
                                        var oDeliveryDate = oresponse.results[0].DeliveryDate;
                                    }

                                    if (oresponse.results[0].epcgdate === null) {
                                        var oEpcgDate = newDate1;
                                    } else {
                                        var oEpcgDate = oresponse.results[0].epcgdate;
                                    }

                                    // if (oresponse.results[0].lrdate === null || oresponse.results[0].BillingDocumentDate === null || oresponse.results[0].Buyerrefrencedate === null || oresponse.results[0].SalesDocumentDate === null || oresponse.results[0].DeliveryDate === null || oresponse.results[0].epcgdate === null) {
                                    //     var oLrDate = newDate1;
                                    //     var oBillingDocumentDate = newDate1;
                                    //     var oBuyerrefrencedate = newDate1;
                                    //     var oSalesDocumentDate = newDate1;
                                    //     var oDeliveryDate = newDate1;
                                    //     var oEpcgDate = newDate1;
                                    // } else {
                                    //     var oLrDate = oresponse.results[0].lrdate;
                                    //     var oBillingDocumentDate = oresponse.results[0].BillingDocumentDate;
                                    //     var oBuyerrefrencedate = oresponse.results[0].Buyerrefrencedate;
                                    //     var oSalesDocumentDate = oresponse.results[0].SalesDocumentDate;
                                    //     var oDeliveryDate = oresponse.results[0].DeliveryDate;
                                    //     var oEpcgDate = oresponse.results[0].epcgdate;
                                    // }
                                    oBusyDialog.close();
                                    var oInvoiceData = {
                                        "Docno": oresponse.results[0].BillingDocument,
                                        "Doctype": "PS",
                                        "DocDate": oBillingDocumentDate,
                                        "RefreanceNo": oresponse.results[0].Buyerrefrence,
                                        "RefreanceDate": oBuyerrefrencedate,
                                        "Peformano": oresponse.results[0].SDDOCU,
                                        "Peformadate": oSalesDocumentDate,
                                        "Deliveryno": oresponse.results[0].DELIVERY_NUMBER,
                                        "Deliverydate": oDeliveryDate,
                                        "TransporterName": oresponse.results[0].TRANSPORTERNAME,
                                        "Lrno": oresponse.results[0].TransDocNo,
                                        "LrDate": oLrDate,
                                        "TruckNo": oresponse.results[0].VEHICLENUMBER,
                                        "Containerno": oresponse.results[0].containernumber,
                                        "Containersize": "",
                                        "RfidNo": oresponse.results[0].rfidnumber,
                                        "Lineseal": oresponse.results[0].linesealnum,
                                        "Vesselno": oresponse.results[0].vesselflightnu,
                                        "shipmenttype": oresponse.results[0].shipmenttype,
                                        "Precarrier": oresponse.results[0].PRECARRIERBYTRANSPORT,
                                        "Portofdischarge": oresponse.results[0].portofdis,
                                        "Portofloading": oresponse.results[0].portofloading,
                                        "Epcgno": oresponse.results[0].epcgno,
                                        "Epcgdate": oEpcgDate,
                                        "Remarks": oresponse.results[0].remark,
                                        "Remarks1": oresponse.results[0].remark1,
                                        "Remarks2": "",
                                        "PaymentTerms": oresponse.results[0].PaymentTermsDescription,
                                        "Deliveryterms": oresponse.results[0].deliveryterm,
                                        "Incotermslocation": oresponse.results[0].IncotermsTransferLocation,
                                        "Shipmentmark": oresponse.results[0].shippingmark,
                                        "Shipmentdate": newDate1,
                                        "Weightofcontainer": "",
                                        "Exportname1": "SUDIVA SPINNERS PVT. LTD.",
                                        "Street1": "N.H.48",
                                        "Street2": "Village: Dhunwalia",
                                        "Street3": "Post-Sareri",
                                        "City": "BHILWARA-311024(RAJ.)",
                                        "Country": "INDIA",
                                        "Exporteriecno": "1111003726",
                                        "Authorisedsigntory": "",
                                        "Authorisedsigntoryno": "7230051055",
                                        "Designation": "",
                                        "Nameofcustomsbroker": ""
                                    }
                                    this.getView().setModel(new sap.ui.model.json.JSONModel(oInvoiceData), "oPayloadData")

                                }.bind(this),
                                error: function () {
                                    oBusyDialog.close();
                                }
                            })
                        } else if (oresponse.results.length != 0) {
                            oBusyDialog.close();
                            var docType = "PS";
                            var invoiceData = {
                                "Docno": oresponse.results[0].Docno,
                                "Doctype": docType,
                                "DocDate": oresponse.results[0].DocDate,
                                "RefreanceNo": oresponse.results[0].RefreanceNo,
                                "RefreanceDate": oresponse.results[0].RefreanceDate,
                                "Peformano": oresponse.results[0].Peformano,
                                "Peformadate": oresponse.results[0].Peformadate,
                                "Deliveryno": oresponse.results[0].Deliveryno,
                                "Deliverydate": oresponse.results[0].Deliverydate,
                                "TransporterName": oresponse.results[0].TransporterName,
                                "Lrno": oresponse.results[0].Lrno,
                                "LrDate": oresponse.results[0].LrDate,
                                "TruckNo": oresponse.results[0].TruckNo,
                                "Containerno": oresponse.results[0].Containerno,
                                "Containersize": oresponse.results[0].Containersize,
                                "RfidNo": oresponse.results[0].RfidNo,
                                "Lineseal": oresponse.results[0].Lineseal,
                                "Vesselno": oresponse.results[0].Vesselno,
                                "shipmenttype": oresponse.results[0].shipmenttype,
                                "Precarrier": oresponse.results[0].Precarrier,
                                "Portofdischarge": oresponse.results[0].Portofdischarge,
                                "Portofloading": oresponse.results[0].Portofloading,
                                "Epcgno": oresponse.results[0].Epcgno,
                                "Epcgdate": oresponse.results[0].Epcgdate,
                                "Remarks": oresponse.results[0].Remarks,
                                "Remarks1": oresponse.results[0].Remarks1,
                                "Remarks2": oresponse.results[0].Remarks2,
                                "PaymentTerms": oresponse.results[0].PaymentTerms,
                                "Deliveryterms": oresponse.results[0].Deliveryterms,
                                "Incotermslocation": oresponse.results[0].Incotermslocation,
                                "Shipmentmark": oresponse.results[0].Shipmentmark,
                                "Shipmentdate": oresponse.results[0].Shipmentdate,
                                "Weightofcontainer": oresponse.results[0].Weightofcontainer,
                                "Exportname1": "SUDIVA SPINNERS PVT. LTD.",
                                "Street1": "N.H.48",
                                "Street2": "Village: Dhunwalia",
                                "Street3": "Post-Sareri",
                                "City": "BHILWARA-311024(RAJ.)",
                                "Country": "INDIA",
                                "Exporteriecno": oresponse.results[0].Exporteriecno,
                                "Authorisedsigntory": oresponse.results[0].Authorisedsigntory,
                                "Authorisedsigntoryno": "7230051055",
                                "Designation": oresponse.results[0].Designation,
                                "Nameofcustomsbroker": oresponse.results[0].Nameofcustomsbroker,
                                "Maxperwt": oresponse.results[0].Maxperwt,
                                "Contareweight": oresponse.results[0].Contareweight,
                                "Weighslip": oresponse.results[0].Weighslip,
                                "Bldate": oresponse.results[0].Bldate
                            }
                            this.getView().setModel(new sap.ui.model.json.JSONModel(invoiceData), "oPayloadData")
                            this.getView().byId("idDescription").setValue(oresponse.results[0].Descgoods)
                            this.getView().byId("idMarks").setValue(oresponse.results[0].Marksndnumber)
                        }

                        oModel.read("/YCONSIGNEDATA", {
                            filters: [oFilter, oFilter2],
                            urlParameters: {
                                "$top": "500000"
                            },
                            success: function (oresponse) {
                                if (oresponse.results.length === 0) {
                                    oModel.read("/YEINVOICE_CDS", {
                                        filters: [oFilter1],
                                        success: function (oresponse) {
                                            oBusyDialog.close();
                                            var oBuyerData = {
                                                "Docno": "",
                                                "Doctype": "PS",
                                                "Billtobuyrname": oresponse.results[0].CustomerName,
                                                "Billtostreet1": oresponse.results[0].StreetName,
                                                "Billtostreet2": "",
                                                "Billtostreet3": "",
                                                "Billtocity": oresponse.results[0].CityName,
                                                "Billtocountry": oresponse.results[0].billltocountry,
                                                "Constoname": oresponse.results[0].SHIPTONAME,
                                                "Constostreet1": oresponse.results[0].SHIPTOADDRSS,
                                                "Constostreet2": "",
                                                "Constostreet3": "",
                                                "Constocity": oresponse.results[0].SHIPTOCITY,
                                                "Constocountry": oresponse.results[0].shiptocountry,
                                                "Notifyname": "",
                                                "Notifystreet1": "",
                                                "Notifystreet2": "",
                                                "Notifystreet3": "",
                                                "Notifycity": "",
                                                "Notifycountry": "",
                                                "Notify2name": "",
                                                "Notify2street1": "",
                                                "Notify2street2": "",
                                                "Notify2street3": "",
                                                "Notify2city": "",
                                                "Notify2country": "",
                                                "Conslctoname": "",
                                                "Conslctostreet1": "",
                                                "Conslctostreet2": "",
                                                "Conslctostreet3": "",
                                                "Conslctocity": "",
                                                "Conslctocountry": "",
                                                "Notify3name": "",
                                                "Notify3street1": "",
                                                "Notify3street2": "",
                                                "Notify3street3": "",
                                                "Notify3city": "",
                                                "Notify3country": ""
                                            }
                                            this.getView().setModel(new sap.ui.model.json.JSONModel(oBuyerData), "oBuyerPayload")
                                        }.bind(this)
                                    })
                                } else if (oresponse.results.length != 0) {
                                    oModel.read("/YCONSIGNEDATA", {
                                        filters: [oFilter, oFilter2],
                                        urlParameters: {
                                            "$top": "500000"
                                        },
                                        success: function (oresponse) {
                                            oBusyDialog.close();
                                            var oBuyerData = {
                                                "Docno": "",
                                                "Doctype": "PS",
                                                "Billtobuyrname": oresponse.results[0].Billtobuyrname,
                                                "Billtostreet1": oresponse.results[0].Billtostreet1,
                                                "Billtostreet2": oresponse.results[0].Billtostreet2,
                                                "Billtostreet3": oresponse.results[0].Billtostreet3,
                                                "Billtocity": oresponse.results[0].Billtocity,
                                                "Billtocountry": oresponse.results[0].Billtocountry,
                                                "Constoname": oresponse.results[0].Constoname,
                                                "Constostreet1": oresponse.results[0].Constostreet1,
                                                "Constostreet2": oresponse.results[0].Constostreet2,
                                                "Constostreet3": oresponse.results[0].Constostreet3,
                                                "Constocity": oresponse.results[0].Constocity,
                                                "Constocountry": oresponse.results[0].Constocountry,
                                                "Notifyname": oresponse.results[0].Notifyname,
                                                "Notifystreet1": oresponse.results[0].Notifystreet1,
                                                "Notifystreet2": oresponse.results[0].Notifystreet2,
                                                "Notifystreet3": oresponse.results[0].Notifystreet3,
                                                "Notifycity": oresponse.results[0].Notifycity,
                                                "Notifycountry": oresponse.results[0].Notifycountry,
                                                "Notify2name": oresponse.results[0].Notify2name,
                                                "Notify2street1": oresponse.results[0].Notify2street1,
                                                "Notify2street2": oresponse.results[0].Notify2street2,
                                                "Notify2street3": oresponse.results[0].Notify2street3,
                                                "Notify2city": oresponse.results[0].Notify2city,
                                                "Notify2country": oresponse.results[0].Notify2country,
                                                "Conslctoname": oresponse.results[0].Conslctoname,
                                                "Conslctostreet1": oresponse.results[0].Conslctostreet1,
                                                "Conslctostreet2": oresponse.results[0].Conslctostreet2,
                                                "Conslctostreet3": oresponse.results[0].Conslctostreet3,
                                                "Conslctocity": oresponse.results[0].Conslctocity,
                                                "Conslctocountry": oresponse.results[0].Conslctocountry,
                                                "Notify3name": oresponse.results[0].Notify3name,
                                                "Notify3street1": oresponse.results[0].Notify3street1,
                                                "Notify3street2": oresponse.results[0].Notify3street2,
                                                "Notify3street3": oresponse.results[0].Notify3street3,
                                                "Notify3city": oresponse.results[0].Notify3city,
                                                "Notify3country": oresponse.results[0].Notify3country
                                            }
                                            this.getView().setModel(new sap.ui.model.json.JSONModel(oBuyerData), "oBuyerPayload")
                                        }.bind(this)
                                    })
                                }
                            }.bind(this)
                        })

                        oModel.read("/Zcalculation", {
                            filters: [oFilter, oFilter2],
                            urlParameters: {
                                "$top": "500000"
                            },
                            success: function (oresponse) {
                                if (oresponse.results.length === 0) {
                                    oModel.read("/YEINVOICE_CDS", {
                                        filters: [oFilter1],
                                        success: function (oresponse) {
                                            oBusyDialog.close();
                                            var freight = parseFloat(oresponse.results[0].frt1_exim + oresponse.results[0].frt2_exim).toFixed(2);
                                            var assessable = parseFloat(oresponse.results[0].assesible * oresponse.results[0].exchangerate).toFixed(2);
                                            var commission = parseFloat(oresponse.results[0].COMMISION1_exim + oresponse.results[0].commision_exim).toFixed(2);
                                            var grandtotal = parseFloat(oresponse.results[0].docuhead_netamt + oresponse.results[0].docuhead_total_tax).toFixed(2);
                                            if (oresponse.results[0].LcDate === null) {
                                                var date1 = new Date();
                                                var date = date1.getFullYear() + "-" + Number(date1.getMonth() + 1) + "-" + date1.getDate()
                                            } else {
                                                var lcdate = oresponse.results[0].LcDate
                                                var lcdate1 = new Date(lcdate)
                                                var date = lcdate1.getFullYear() + "-" + Number(lcdate1.getMonth() + 1) + "-" + lcdate1.getDate()
                                            }
                                            var oCalculation = {
                                                "Docno": oresponse.results[0].BillingDocument,
                                                "Doctype": "PS",
                                                "Totalqty": oresponse.results[0].totalnetquantity,
                                                "Totalnetqty": oresponse.results[0].totalnetquantity,
                                                "Totalgrosswt": oresponse.results[0].totalgrossquantity,
                                                "Totalpackages": oresponse.results[0].zpackage,
                                                "Typeofpackages": "",
                                                "Doccurrency": oresponse.results[0].trancurr,
                                                "Exchangerate": oresponse.results[0].exchangerate,
                                                "Commission": commission,
                                                "Insurance": oresponse.results[0].INSURANCE_exim,
                                                "Insurancepre": oresponse.results[0].INSURANCEPREMIUM,
                                                "Freight": freight,
                                                "Oceanfreight": oresponse.results[0].OCEANFREIGHT_exim,
                                                "Dutycalculation": oresponse.results[0].INSURANCEPREMIUM,
                                                "Assessablevalueinrs": assessable,
                                                "Gst": oresponse.results[0].gst_exim,
                                                "Invoiceamount": oresponse.results[0].docuhead_netamt,
                                                "Addamt": oresponse.results[0].ADDAMT_exim,
                                                "Lessamt": oresponse.results[0].DISCOUNT_exim,
                                                "Grandtotalamount": grandtotal,
                                                "Amountinwords": "",
                                                "Lcno": oresponse.results[0].LcNo,
                                                "Lcdate": date,
                                                "Issueingbank": oresponse.results[0].Issueingbank,
                                                "Bank": "",
                                                "Adcodebank": "",
                                                "Buyername": "",
                                                "Street1": "",
                                                "Street2": "",
                                                "Street3": "",
                                                "Stufffileno": "",
                                                "Stufffilpermdate": "",
                                                "Exportunder": "",
                                                "Advancelicense": ""
                                            }
                                            this.getView().setModel(new sap.ui.model.json.JSONModel(oCalculation), "oCalculationPayload")
                                        }.bind(this)
                                    })
                                } else {
                                    oModel.read("/Zcalculation", {
                                        filters: [oFilter, oFilter2],
                                        success: function (oresponse) {

                                            if (oresponse.results[0].Lcdate1 === null) {
                                                var lcdate1 = oresponse.results[0].Lcdate
                                            } else {
                                                var oDate = oresponse.results[0].Lcdate1;
                                                lcdate1 = oDate.getFullYear() + '-' + Number(oDate.getMonth() + 1) + '-' + oDate.getDate();
                                            }

                                            var oCalculationObject = {
                                                "Docno": oresponse.results[0].Docno,
                                                "Doctype": "PS",
                                                "Totalqty": oresponse.results[0].Totalqty,
                                                "Totalnetqty": oresponse.results[0].Totalnetqty,
                                                "Totalgrosswt": oresponse.results[0].Totalgrosswt,
                                                "Totalpackages": oresponse.results[0].Totalpackages,
                                                "Typeofpackages": oresponse.results[0].Typeofpackages,
                                                "Doccurrency": oresponse.results[0].Doccurrency,
                                                "Exchangerate": oresponse.results[0].Exchangerate,
                                                "Commission": parseFloat(oresponse.results[0].Commission).toFixed(2),
                                                "Insurance": oresponse.results[0].Insurance,
                                                "Insurancepre": oresponse.results[0].Insurancepre,
                                                "Freight": parseFloat(oresponse.results[0].Freight).toFixed(2),
                                                "Oceanfreight": oresponse.results[0].Oceanfreight,
                                                "Dutycalculation": oresponse.results[0].Dutycalculation,
                                                "Assessablevalueinrs": parseFloat(oresponse.results[0].Assessablevalueinrs).toFixed(2),
                                                "Gst": oresponse.results[0].Gst,
                                                "Invoiceamount": oresponse.results[0].Invoiceamount,
                                                "Addamt": oresponse.results[0].Addamt,
                                                "Lessamt": oresponse.results[0].Lessamt,
                                                "Grandtotalamount": parseFloat(oresponse.results[0].Grandtotalamount).toFixed(2),
                                                "Amountinwords": oresponse.results[0].Amountinwords,
                                                "Lcno": oresponse.results[0].Lcno,
                                                "Lcdate": lcdate1,
                                                "Issueingbank": oresponse.results[0].Issueingbank,
                                                "Bank": oresponse.results[0].Bank,
                                                "Adcodebank": oresponse.results[0].Adcodebank,
                                                "Buyername": oresponse.results[0].Buyername,
                                                "Street1": oresponse.results[0].Street1,
                                                "Street2": oresponse.results[0].Street2,
                                                "Street3": oresponse.results[0].Street3,
                                                "Shippingline": oresponse.results[0].Shippingline,
                                                "Etddate": oresponse.results[0].Etddate,
                                                "Etadate": oresponse.results[0].Etadate,
                                                "Stufffileno": oresponse.results[0].Stufffileno,
                                                "Stufffilpermdate": oresponse.results[0].Stufffilpermdate,
                                                "Exportunder": oresponse.results[0].Exportunder,
                                                "Advancelicense": oresponse.results[0].Advancelicense,
                                                "Frightchargetype": oresponse.results[0].Frightchargetype,
                                                "Foreignbank": oresponse.results[0].Foreignbank
                                            }
                                            this.getView().setModel(new sap.ui.model.json.JSONModel(oCalculationObject), "oCalculationPayload")
                                        }.bind(this)
                                    })

                                }

                                var aNewArr = [];
                                var oTableModel = this.getView().getModel("oTableItemModel");

                                if (oTableModel.getProperty("/aTableItem").length > 0) {
                                    oTableModel.setProperty("/aTableItem", aNewArr)
                                    oModel.read("/Draft_Bl", {
                                        filters: [oFilter, oFilter2],
                                        success: function (oresponse) {
                                            if (oresponse.results.length > 0) {
                                                oresponse.results.map(function (items) {
                                                    var invObject = {
                                                        "ItemNum": items.Litem,
                                                        "MaterialCode": items.Material,
                                                        "MaterialDescription": items.Mdesp,
                                                        "Lotno": items.Lot,
                                                        "Fromorto": items.Fromto
                                                    }
                                                    aNewArr.push(invObject);
                                                })
                                                this.getView().getModel("oTableItemModel").setProperty("/aTableItem", aNewArr)
                                                this.getView().setModel(new sap.ui.model.json.JSONModel(oresponse.results[0]), "oDetailModel")
                                            } else {
                                                oModel.read("/YEINVOICE_CDS", {
                                                    filters: [oFilter1],
                                                    success: function (oresponse) {
                                                        oresponse.results.map(function (items) {
                                                            var invObject = {
                                                                "ItemNum": items.BillingDocumentItem,
                                                                "DeliveryNumber": items.DELIVERY_NUMBER,
                                                                "ContainerNumber": items.containernumber,
                                                                "MaterialCode": items.Material,
                                                                "MaterialDescription": items.MaterialDescription,
                                                                "Lotno": items.YY1_LotNo_DLI,
                                                                "Fromorto": ""
                                                            }
                                                            aNewArr.push(invObject);
                                                        })

                                                        this.getView().getModel("oTableItemModel").setProperty("/aTableItem", aNewArr)
                                                    }.bind(this)
                                                })
                                            }

                                        }.bind(this)
                                    })
                                } else {
                                    oModel.read("/Draft_Bl", {
                                        filters: [oFilter, oFilter2],
                                        success: function (oresponse) {
                                            if (oresponse.results.length > 0) {
                                                oresponse.results.map(function (items) {
                                                    var invObject = {
                                                        "ItemNum": items.Litem,
                                                        "MaterialCode": items.Material,
                                                        "MaterialDescription": items.Mdesp,
                                                        "Lotno": items.Lot,
                                                        "Fromorto": items.Fromto
                                                    }
                                                    aNewArr.push(invObject);
                                                })
                                                this.getView().getModel("oTableItemModel").setProperty("/aTableItem", aNewArr)
                                                this.getView().setModel(new sap.ui.model.json.JSONModel(oresponse.results[0]), "oDetailModel")
                                            } else {
                                                oModel.read("/YEINVOICE_CDS", {
                                                    filters: [oFilter1],
                                                    success: function (oresponse) {
                                                        oresponse.results.map(function (items) {
                                                            var invObject = {
                                                                "ItemNum": items.BillingDocumentItem,
                                                                "DeliveryNumber": items.DELIVERY_NUMBER,
                                                                "ContainerNumber": items.containernumber,
                                                                "MaterialCode": items.Material,
                                                                "MaterialDescription": items.MaterialDescription,
                                                                "Lotno": items.YY1_LotNo_DLI,
                                                                "Fromorto": ""
                                                            }
                                                            aNewArr.push(invObject);
                                                        })

                                                        this.getView().getModel("oTableItemModel").setProperty("/aTableItem", aNewArr)
                                                    }.bind(this)
                                                })
                                            }

                                        }.bind(this)
                                    })
                                }

                            }.bind(this)
                        })

                    }.bind(this),
                    error: function () {
                        oBusyDialog.close();
                    }
                })
            },

            lessInvoiceAmount: function (oEvent) {
                var invoiceAmount = Number(this.getView().byId("idInvAmt").getValue());
                var lessAmount = Number(oEvent.getParameters().value);
                var grandTotalAmount = invoiceAmount - lessAmount;
                this.getView().byId("idGrandTotalAmt").setValue((grandTotalAmount).toString());
                this.getView().byId("idAddAmt").setValue();
            },
            addInvoiceAmount: function (oEvent) {
                var invoiceAmount = Number(this.getView().byId("idInvAmt").getValue());
                var addAmount = Number(oEvent.getParameters().value);
                var grandTotalAmount = invoiceAmount + addAmount;
                this.getView().byId("idGrandTotalAmt").setValue((grandTotalAmount).toString());
                this.getView().byId("idLessAmt").setValue();
            },

            onSaveGeneral: function () {
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Saving Data",
                    text: "Please wait"
                });
                oBusyDialog.open();
                var oModel = this.getView().getModel();
                var oGeneralData = this.getView().getModel("oPayloadData");
                var sInput = this.getView().byId("idDoc").getValue();
                var oFilter = new sap.ui.model.Filter("Docno", "EQ", sInput)

                var oDate = new Date();
                var newDate = new Date(oDate.getTime() - oDate.getTimezoneOffset() * 60000);
                var newDate1 = newDate.toISOString().slice(0, 16);
                // var yourDate = oDate.toISOString().split('T')[0];
                // var oDate2 = yourDate.replace(/\-/g, "");
                // var oDate1 = oDate.getDate() + '-' + Number(oDate.getMonth() + 1) + '-' + oDate.getFullYear();
                oGeneralData.getData().DocDate = newDate1;
                oGeneralData.getData().RefreanceDate = newDate1;
                oGeneralData.getData().Peformadate = newDate1;
                oGeneralData.getData().Deliverydate = newDate1;
                oGeneralData.getData().LrDate = newDate1;
                oGeneralData.getData().Epcgdate = newDate1;
                oGeneralData.getData().Shipmentdate = newDate1;

                oModel.read("/generaltab_", {
                    filters: [oFilter],
                    success: function (oresponse) {
                        if (oresponse.results.length === 0) {
                            oModel.create("/generaltab_", oGeneralData.getData(), {
                                method: "POST",
                                success: function (oresponse) {
                                    oBusyDialog.close();
                                    this.getView().getModel("oPayloadData").refresh(true);
                                }.bind(this),
                                error: function () {
                                    oBusyDialog.close();
                                }
                            })
                        } else {
                            this.onUpdateGeneralData();
                            oBusyDialog.close()
                        }
                    }.bind(this)
                })
            },

            onUpdateGeneralData: function () {
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Updating Data",
                    text: "Please wait"
                });
                oBusyDialog.open();
                var oModel = this.getView().getModel();
                var sInput = this.getView().byId("idDoc").getValue();
                var oGeneralData = this.getView().getModel("oPayloadData");

                oModel.update("/generaltab_(Docno='" + sInput + "',Doctype='" + oGeneralData.getData().Doctype + "')", oGeneralData.getData(), {
                    success: function (data) {
                        oBusyDialog.close();
                    },
                    error: function (e) {
                        oBusyDialog.close();
                    }
                });
            },

            onSaveBuyerData: function () {
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Saving Data",
                    text: "Please wait"
                });
                oBusyDialog.open();
                var keyValue = this.getView().byId("idIconBar").getSelectedKey();
                var sInput = this.getView().byId("idDoc").getValue();
                var oBuyerDataModel = this.getView().getModel("oBuyerPayload");
                var oModel = this.getView().getModel();
                var oFilter = new sap.ui.model.Filter("Docno", "EQ", sInput)
                oBuyerDataModel.getData().Docno = this.getView().byId("idDoc").getValue();
                oBuyerDataModel.getData().Doctype = this.getView().byId("idDocType").getValue();

                oModel.read("/YCONSIGNEDATA", {
                    filters: [oFilter],
                    success: function (oresponse) {
                        if (oresponse.results.length === 0) {
                            oModel.create("/YCONSIGNEDATA", oBuyerDataModel.getData(), {
                                method: "POST",
                                success: function (oresponse) {
                                    oBusyDialog.close();
                                    this.getView().getModel("oBuyerPayload").refresh(true);
                                }.bind(this),
                                error: function () {
                                    oBusyDialog.close();
                                }
                            })
                        } else {
                            this.onUpdateBuyerData();
                            oBusyDialog.close();
                        }
                    }.bind(this)
                })
            },

            onUpdateBuyerData: function () {
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Updating Data",
                    text: "Please wait"
                });
                oBusyDialog.open();
                var oModel = this.getView().getModel();
                var sInput = this.getView().byId("idDoc").getValue();
                var oBuyerDataModel = this.getView().getModel("oBuyerPayload");
                oBuyerDataModel.getData().Docno = this.getView().byId("idDoc").getValue();
                var oGeneralData = this.getView().getModel("oPayloadData");

                oModel.update("/YCONSIGNEDATA(Docno='" + sInput + "',Doctype='" + oGeneralData.getData().Doctype + "')", oBuyerDataModel.getData(), {
                    success: function (data) {
                        // MessageBox.success("Data updated successfully", {
                        // onClose: function (oAction) {
                        //     if (oAction === MessageBox.Action.OK) {
                        //         window.location.reload();
                        //     }
                        // }
                        // });
                        oBusyDialog.close();
                    },
                    error: function (e) {
                        oBusyDialog.close();
                    }
                });
            },

            onUpdateCalculationData: function () {
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Updating Data",
                    text: "Please wait"
                });
                oBusyDialog.open();
                var oModel = this.getView().getModel();
                var sInput = this.getView().byId("idDoc").getValue();
                var oCalculationModel = this.getView().getModel("oCalculationPayload");
                oModel.update("/Zcalculation(Docno='" + sInput + "',Doctype='" + oCalculationModel.getData().Doctype + "')", oCalculationModel.getData(), {
                    success: function () {
                        MessageBox.success("Data updated successfully");
                        oBusyDialog.close();
                    }.bind(this),
                    error: function (error) {
                        oBusyDialog.close();
                        MessageBox.show(error);
                    }
                })
            },

            onSaveCalculation: function () {
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Saving Data",
                    text: "Please wait"
                });
                oBusyDialog.open();
                var sInput = this.getView().byId("idDoc").getValue();
                var oModel = this.getView().getModel();
                var oCalculationModel = this.getView().getModel("oCalculationPayload");
                var oFilter = new sap.ui.model.Filter("Docno", "EQ", sInput);

                oCalculationModel.getData().Doctype = this.getView().byId("idDocType").getValue();
                oCalculationModel.getData().Docno = this.getView().byId("idDoc").getValue();

                var TotalQty = this.getView().byId("idTotalQuan").getValue();
                var TotalNetWt = this.getView().byId("idTotalNetWt").getValue();
                var TotalGrossWt = this.getView().byId("idTotalGrossWt").getValue();
                var DocCurrency = this.getView().byId("idDocCurr").getValue();
                var ExchangeRate = this.getView().byId("idExchange").getValue();
                var Commission = this.getView().byId("idCommission").getValue();
                var Insurance = this.getView().byId("idInsurance").getValue();
                var Freight = this.getView().byId("idFreight").getValue();
                var InsurancePremium = this.getView().byId("idInsurPre").getValue();
                var OceanFreight = this.getView().byId("idOceanFreight").getValue();
                var DutyCalculation = this.getView().byId("idDutyCalc").getValue();
                var AssessableValue = this.getView().byId("idAssessableValue").getValue();
                var GST = this.getView().byId("idGst").getValue();
                var InvoiceAmount = this.getView().byId("idInvAmt").getValue();
                var AddAmount = this.getView().byId("idAddAmt").getValue();
                var LessAmount = this.getView().byId("idLessAmt").getValue();
                var GrandTotalAmount = this.getView().byId("idGrandTotalAmt").getValue();

                if (TotalQty.length === 0) {
                    oCalculationModel.getData().Totalqty = "0.00";
                } if (TotalNetWt.length === 0) {
                    oCalculationModel.getData().Totalnetqty = "0.00";
                } if (TotalGrossWt.length === 0) {
                    oCalculationModel.getData().Totalgrosswt = "0.00";
                } if (DocCurrency.length === 0) {
                    oCalculationModel.getData().Doccurrency = "0.00";
                } if (ExchangeRate.length === 0) {
                    oCalculationModel.getData().Exchangerate = "0.00";
                } if (Commission.length === 0) {
                    oCalculationModel.getData().Commission = "0.00";
                } if (Insurance.length === 0) {
                    oCalculationModel.getData().Insurance = "0.00";
                } if (Freight.length === 0) {
                    oCalculationModel.getData().Freight = "0.00";
                } if (InsurancePremium.length === 0) {
                    oCalculationModel.getData().Insurancepre = "0.00";
                } if (OceanFreight.length === 0) {
                    oCalculationModel.getData().Oceanfreight = "0.00";
                } if (DutyCalculation.length === 0) {
                    oCalculationModel.getData().Dutycalculation = "0.00";
                } if (AssessableValue.length === 0) {
                    oCalculationModel.getData().Assessablevalueinrs = "0.00";
                } if (GST.length === 0) {
                    oCalculationModel.getData().Gst = "0.00";
                } if (InvoiceAmount.length === 0) {
                    oCalculationModel.getData().Invoiceamount = "0.00";
                } if (AddAmount.length === 0) {
                    oCalculationModel.getData().Addamt = "0.00";
                } if (LessAmount.length === 0) {
                    oCalculationModel.getData().Lessamt = "0.00";
                } if (GrandTotalAmount.length === 0) {
                    oCalculationModel.getData().Grandtotalamount = "0.00";
                }

                // oCalculationModel.getData().Totalqty = "0.00";
                // oCalculationModel.getData().Totalnetqty = "0.00";
                // oCalculationModel.getData().Totalgrosswt = "0.00";
                // oCalculationModel.getData().Doccurrency = "0.00";
                // oCalculationModel.getData().Exchangerate = "0.00";
                // oCalculationModel.getData().Commission = "0.00";
                // oCalculationModel.getData().Insurance = "0.00";
                // oCalculationModel.getData().Insurancepre = "0.00";
                // oCalculationModel.getData().Freight = "0.00";
                // oCalculationModel.getData().Oceanfreight = "0.00";
                // oCalculationModel.getData().Dutycalculation = "0.00";
                // oCalculationModel.getData().Assessablevalueinrs = "0.00";
                // oCalculationModel.getData().Gst = "0.00";
                // oCalculationModel.getData().Invoiceamount = "0.00";
                // oCalculationModel.getData().Addamt = "0.00";
                // oCalculationModel.getData().Lessamt = "0.00";
                // oCalculationModel.getData().Grandtotalamount = "0.00";
                oModel.read("/Zcalculation", {
                    filters: [oFilter],
                    success: function (oresponse) {
                        if (oresponse.results.length === 0) {
                            oModel.create("/Zcalculation", oCalculationModel.getData(), {
                                success: function () {
                                    oBusyDialog.close();
                                }.bind(this),
                                error: function () {

                                }
                            })
                        } else {
                            this.onUpdateCalculationData();
                            oBusyDialog.close();
                        }
                    }.bind(this)
                })
            },

            onSave: function () {
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Saving Data",
                    text: "Please wait"
                });
                oBusyDialog.open();
                var oModel = this.getView().getModel();
                var oGeneralData = this.getView().getModel("oPayloadData");
                var oBuyerDataModel = this.getView().getModel("oBuyerPayload");
                var oCalculationModel = this.getView().getModel("oCalculationPayload");
                var DocType = this.getView().byId("idDocType").getValue();
                var sInput = this.getView().byId("idDoc").getValue();
                var oFilter = new sap.ui.model.Filter("Docno", "EQ", sInput);
                var oFilter2 = new sap.ui.model.Filter("Doctype", "EQ", DocType);
                var checkBoxValue = this.getView().byId("idCheckBox").getSelected();

                var invoiceDate = this.getView().byId("idInvDate").getValue();
                var referenceDate = this.getView().byId("idReferenceDate").getValue();
                var performaInvoiceDate = this.getView().byId("idPerformaInvoiceDate").getValue();
                var deliveryDate = this.getView().byId("idDeliveryDate").getValue();
                var lrDate = this.getView().byId("idLrDate").getValue();
                var epcgDate = this.getView().byId("idEPCGDate").getValue();
                var shipmentDate = this.getView().byId("idShipmentDate").getValue();

                if (invoiceDate === "") {
                    var newDate1 = null
                } else {
                    var oDate = new Date(invoiceDate);
                    var newDate = new Date(oDate.getTime() - oDate.getTimezoneOffset() * 60000);
                    var newDate1 = newDate.toISOString().slice(0, 16);
                }

                if (referenceDate === "") {
                    var oReferenceDate = null
                } else {
                    var oDate1 = new Date(referenceDate);
                    var referencedate = new Date(oDate1.getTime() - oDate1.getTimezoneOffset() * 60000);
                    var oReferenceDate = referencedate.toISOString().slice(0, 16);
                }

                if (performaInvoiceDate === "") {
                    var oPerformaInvoiceDate = null
                } else {
                    var oDate2 = new Date(performaInvoiceDate);
                    var performainvoicedate = new Date(oDate2.getTime() - oDate2.getTimezoneOffset() * 60000);
                    var oPerformaInvoiceDate = performainvoicedate.toISOString().slice(0, 16);
                }

                if (deliveryDate === "") {
                    var oDeliveryDate = null
                } else {
                    var oDate3 = new Date(deliveryDate);
                    var deliverydate = new Date(oDate3.getTime() - oDate3.getTimezoneOffset() * 60000);
                    var oDeliveryDate = deliverydate.toISOString().slice(0, 16);
                }

                if (lrDate === "") {
                    var oLrDate = null
                } else {
                    var oDate4 = new Date(lrDate);
                    var lrdate = new Date(oDate4.getTime() - oDate4.getTimezoneOffset() * 60000);
                    var oLrDate = lrdate.toISOString().slice(0, 16);
                }

                if (epcgDate === "") {
                    var oEpcgDate = null
                } else {
                    var oDate5 = new Date(epcgDate);
                    var epcgdate = new Date(oDate5.getTime() - oDate5.getTimezoneOffset() * 60000);
                    var oEpcgDate = epcgdate.toISOString().slice(0, 16);
                }

                if (shipmentDate === "") {
                    var oShipmentDate = null
                } else {
                    var oDate6 = new Date(shipmentDate);
                    var shipmentdate = new Date(oDate6.getTime() - oDate6.getTimezoneOffset() * 60000);
                    var oShipmentDate = shipmentdate.toISOString().slice(0, 16);
                }

                // var yourDate = oDate.toISOString().split('T')[0];
                // var oDate2 = yourDate.replace(/\-/g, "");
                // var oDate1 = oDate.getDate() + '-' + Number(oDate.getMonth() + 1) + '-' + oDate.getFullYear();
                oGeneralData.getData().DocDate = newDate1;
                oGeneralData.getData().RefreanceDate = oReferenceDate;
                oGeneralData.getData().Peformadate = oPerformaInvoiceDate;
                oGeneralData.getData().Deliverydate = oDeliveryDate;
                oGeneralData.getData().LrDate = oLrDate;
                oGeneralData.getData().Epcgdate = oEpcgDate;
                oGeneralData.getData().Shipmentdate = oShipmentDate;

                oModel.read("/generaltab_", {
                    filters: [oFilter, oFilter2],
                    success: function (oresponse) {
                        if (oresponse.results.length === 0) {
                            oModel.create("/generaltab_", oGeneralData.getData(), {
                                method: "POST",
                                success: function (oresponse) {
                                    oBusyDialog.close();
                                    this.getView().getModel("oPayloadData").refresh(true);
                                }.bind(this),
                                error: function () {
                                    oBusyDialog.close();
                                }
                            })
                        } else {
                            this.onUpdateGeneralData();
                            oBusyDialog.close();
                        }

                        oBuyerDataModel.getData().Docno = this.getView().byId("idDoc").getValue();
                        oBuyerDataModel.getData().Doctype = this.getView().byId("idDocType").getValue();
                        if (checkBoxValue === true) {
                            oBuyerDataModel.getData().Tobecontinue = "X";
                        } else {
                            oBuyerDataModel.getData().Tobecontinue = " ";
                        }

                        oModel.read("/YCONSIGNEDATA", {
                            filters: [oFilter, oFilter2],
                            success: function (oresponse) {
                                if (oresponse.results.length === 0) {
                                    oModel.create("/YCONSIGNEDATA", oBuyerDataModel.getData(), {
                                        method: "POST",
                                        success: function (oresponse) {
                                            oBusyDialog.close();
                                            // MessageBox.success("Data saved successfully", {
                                            // onClose: function (oAction) {
                                            //     if (oAction === MessageBox.Action.OK) {
                                            //         window.location.reload();
                                            //     }
                                            // }
                                            // })
                                            this.getView().getModel("oBuyerPayload").refresh(true);
                                        }.bind(this),
                                        error: function () {
                                            oBusyDialog.close();
                                        }
                                    })
                                } else {
                                    this.onUpdateBuyerData();
                                    oBusyDialog.close();
                                }
                            }.bind(this)
                        })

                        oCalculationModel.getData().Doctype = this.getView().byId("idDocType").getValue();
                        oCalculationModel.getData().Docno = this.getView().byId("idDoc").getValue();

                        var TotalQty = this.getView().byId("idTotalQuan").getValue();
                        var TotalNetWt = this.getView().byId("idTotalNetWt").getValue();
                        var TotalGrossWt = this.getView().byId("idTotalGrossWt").getValue();
                        var DocCurrency = this.getView().byId("idDocCurr").getValue();
                        var ExchangeRate = this.getView().byId("idExchange").getValue();
                        var Commission = this.getView().byId("idCommission").getValue();
                        var Insurance = this.getView().byId("idInsurance").getValue();
                        var Freight = this.getView().byId("idFreight").getValue();
                        var InsurancePremium = this.getView().byId("idInsurPre").getValue();
                        var OceanFreight = this.getView().byId("idOceanFreight").getValue();
                        var DutyCalculation = this.getView().byId("idDutyCalc").getValue();
                        var AssessableValue = this.getView().byId("idAssessableValue").getValue();
                        var GST = this.getView().byId("idGst").getValue();
                        var InvoiceAmount = this.getView().byId("idInvAmt").getValue();
                        var AddAmount = this.getView().byId("idAddAmt").getValue();
                        var LessAmount = this.getView().byId("idLessAmt").getValue();
                        var GrandTotalAmount = this.getView().byId("idGrandTotalAmt").getValue();

                        if (TotalQty.length === 0) {
                            oCalculationModel.getData().Totalqty = "0.00";
                        } if (TotalNetWt.length === 0) {
                            oCalculationModel.getData().Totalnetqty = "0.00";
                        } if (TotalGrossWt.length === 0) {
                            oCalculationModel.getData().Totalgrosswt = "0.00";
                        } if (DocCurrency.length === 0) {
                            oCalculationModel.getData().Doccurrency = "0.00";
                        } if (ExchangeRate.length === 0) {
                            oCalculationModel.getData().Exchangerate = "0.00";
                        } if (Commission.length === 0) {
                            oCalculationModel.getData().Commission = "0.0000";
                        } if (Insurance.length === 0) {
                            oCalculationModel.getData().Insurance = "0.00";
                        } if (Freight.length === 0) {
                            oCalculationModel.getData().Freight = "0.00000";
                        } if (InsurancePremium.length === 0) {
                            oCalculationModel.getData().Insurancepre = "0.00";
                        } if (OceanFreight.length === 0) {
                            oCalculationModel.getData().Oceanfreight = "0.00";
                        } if (DutyCalculation.length === 0) {
                            oCalculationModel.getData().Dutycalculation = "0.00";
                        } if (AssessableValue.length === 0) {
                            oCalculationModel.getData().Assessablevalueinrs = "0.00";
                        } if (GST.length === 0) {
                            oCalculationModel.getData().Gst = "0.00";
                        } if (InvoiceAmount.length === 0) {
                            oCalculationModel.getData().Invoiceamount = "0.00";
                        } if (AddAmount.length === 0) {
                            oCalculationModel.getData().Addamt = "0.00";
                        } if (LessAmount.length === 0) {
                            oCalculationModel.getData().Lessamt = "0.00";
                        } if (GrandTotalAmount.length === 0) {
                            oCalculationModel.getData().Grandtotalamount = "0.0000";
                        }

                        oCalculationModel.getData().Totalpackages = this.getView().byId("idTotalPack").getValue().toString();

                        var lcdate = this.getView().byId("idLcDate").getValue();
                        var oDate = new Date(lcdate);
                        var newDate = new Date(oDate.getTime() - oDate.getTimezoneOffset() * 60000);
                        var lcdate1 = newDate.toISOString().slice(0, 16);

                        oCalculationModel.getData().Lcdate1 = lcdate1
                        // oCalculationModel.getData().Totalqty = "0.00";
                        // oCalculationModel.getData().Totalnetqty = "0.00";
                        // oCalculationModel.getData().Totalgrosswt = "0.00";
                        // oCalculationModel.getData().Doccurrency = "0.00";
                        // oCalculationModel.getData().Exchangerate = "0.00";
                        // oCalculationModel.getData().Commission = "0.00";
                        // oCalculationModel.getData().Insurance = "0.00";
                        // oCalculationModel.getData().Insurancepre = "0.00";
                        // oCalculationModel.getData().Freight = "0.00";
                        // oCalculationModel.getData().Oceanfreight = "0.00";
                        // oCalculationModel.getData().Dutycalculation = "0.00";
                        // oCalculationModel.getData().Assessablevalueinrs = "0.00";
                        // oCalculationModel.getData().Gst = "0.00";
                        // oCalculationModel.getData().Invoiceamount = "0.00";
                        // oCalculationModel.getData().Addamt = "0.00";
                        // oCalculationModel.getData().Lessamt = "0.00";
                        // oCalculationModel.getData().Grandtotalamount = "0.00";
                        oModel.read("/Zcalculation", {
                            filters: [oFilter, oFilter2],
                            success: function (oresponse) {
                                if (oresponse.results.length === 0) {
                                    oModel.create("/Zcalculation", oCalculationModel.getData(), {
                                        success: function () {
                                            oBusyDialog.close();
                                            MessageBox.success("Data saved successfully", {
                                                // onClose: function (oAction) {
                                                //     if (oAction === MessageBox.Action.OK) {
                                                //         window.location.reload();
                                                //     }
                                                // }
                                            })
                                        }.bind(this),
                                        error: function () {
                                            oBusyDialog.close();
                                            MessageBox.success("Data saved successfully")
                                        }
                                    })
                                } else {
                                    this.onUpdateCalculationData();
                                    oBusyDialog.close();
                                }
                            }.bind(this)
                        })

                        this.onSaveItemDetails();

                    }.bind(this)
                })
            },

            onSaveItemDetails: function () {
                var oModel = this.getView().getModel();
                var oTableDataModel = this.getView().getModel("oTableItemModel").getProperty("/aTableItem");
                var Doctype = this.getView().byId("idDocType").getValue();
                var Docnum = this.getView().byId("idDoc").getValue();
                var oFilter = new sap.ui.model.Filter("Docno", "EQ", Docnum)
                var oFilter1 = new sap.ui.model.Filter("Doctype", "EQ", Doctype)
                var Details = this.getView().byId("idDetails").getValue();
                var aNewArr = [];

                oTableDataModel.map(function (items) {
                    var oFilter2 = new sap.ui.model.Filter("Litem", "EQ", items.ItemNum)
                    oModel.read("/Draft_Bl", {
                        filters: [oFilter, oFilter1, oFilter2],
                        success: function (oresponse) {
                            if (oresponse.results.length > 0) {
                                var obj1 = {
                                    "Docno": Docnum,
                                    // "Deliveryno": items.DeliveryNumber,
                                    // "Containerno": items.ContainerNumber,
                                    "Doctype": Doctype,
                                    "Litem": items.ItemNum,
                                    "Material": items.MaterialCode,
                                    "Mdesp": items.MaterialDescription,
                                    "Lot": items.Lotno,
                                    "Fromto": items.Fromorto,
                                    "Details": Details
                                }
                                oModel.update("/Draft_Bl(Docno='" + Docnum + "',Doctype='" + Doctype + "',Litem='" + items.ItemNum + "')", obj1, {
                                    success: function (oresponse) {

                                    }
                                })
                            } else {
                                var obj = {
                                    "Docno": Docnum,
                                    // "Deliveryno": items.DeliveryNumber,
                                    // "Containerno": items.ContainerNumber,
                                    "Doctype": Doctype,
                                    "Litem": items.ItemNum,
                                    "Material": items.MaterialCode,
                                    "Mdesp": items.MaterialDescription,
                                    "Lot": items.Lotno,
                                    "Fromto": items.Fromorto,
                                    "Details": Details
                                }
                                oModel.create("/Draft_Bl", obj, {
                                    success: function (oresponse) {

                                    }
                                })
                            }
                        }
                    })
                })
            },

            onSaveBL: function () {
                var oModel = this.getView().getModel();
                var Docnumber = this.getView().byId("idDoc").getValue();
                var Doctype = this.getView().byId("idDocType").getValue();
                var Marks = this.getView().byId("idMarks").getValue();
                var Description = this.getView().byId("idDescription").getValue();

                var obj = {
                    "Docno": Docnumber,
                    "Doctype": Doctype,
                    "Marksndnumber": Marks,
                    "Descgoods": Description
                }

                oModel.update("/generaltab_(Docno='" + Docnumber + "',Doctype='" + Doctype + "')", obj, {
                    success: function (oresponse) {

                    }
                })
            },

            // onSelect: function () {
            //     var oModel = this.getView().getModel();
            //     var keyValue = this.getView().byId("idIconBar").getSelectedKey();
            //     var sInput = Number(this.getView().byId("idDoc").getValue());
            //     var oFilter = new sap.ui.model.Filter("Docno", "EQ", sInput);
            //     var oFilter1 = new sap.ui.model.Filter("BillingDocument", "EQ", sInput);

            //     if (keyValue === '2') {
            //         oModel.read("/YCONSIGNEDATA", {
            //             filters: [oFilter],
            //             success: function (oresponse) {
            //                 if (oresponse.results.length === 0) {
            //                     oModel.read("/YEINVOICE_CDS", {
            //                         filters: [oFilter1],
            //                         success: function (oresponse) {
            //                             var oBuyerData = {
            //                                 "Docno": "",
            //                                 "Billtobuyrname": oresponse.results[0].CustomerName,
            //                                 "Billtostreet1": oresponse.results[0].StreetName,
            //                                 "Billtostreet2": "",
            //                                 "Billtostreet3": "",
            //                                 "Billtocity": oresponse.results[0].CityName,
            //                                 "Billtocountry": oresponse.results[0].Region,
            //                                 "Constoname": oresponse.results[0].SHIPTONAME,
            //                                 "Constostreet1": oresponse.results[0].SHIPTOADDRSS,
            //                                 "Constostreet2": "",
            //                                 "Constostreet3": "",
            //                                 "Constocity": oresponse.results[0].SHIPTOCITY,
            //                                 "Constocountry": "",
            //                                 "Notifyname": "",
            //                                 "Notifystreet1": "",
            //                                 "Notifystreet2": "",
            //                                 "Notifystreet3": "",
            //                                 "Notifycity": "",
            //                                 "Notifycountry": "",
            //                                 "Notify2name": "",
            //                                 "Notify2street1": "",
            //                                 "Notify2street2": "",
            //                                 "Notify2street3": "",
            //                                 "Notify2city": "",
            //                                 "Notify2country": "",
            //                                 "Conslctoname": "",
            //                                 "Conslctostreet1": "",
            //                                 "Conslctostreet2": "",
            //                                 "Conslctostreet3": "",
            //                                 "Conslctocity": "",
            //                                 "Conslctocountry": "",
            //                                 "Notify3name": "",
            //                                 "Notify3street1": "",
            //                                 "Notify3street2": "",
            //                                 "Notify3street3": "",
            //                                 "Notify3city": "",
            //                                 "Notify3country": ""
            //                             }
            //                             this.getView().setModel(new sap.ui.model.json.JSONModel(oBuyerData), "oBuyerPayload")
            //                         }.bind(this)
            //                     })
            //                 } else {
            //                     var oBuyerData = {
            //                         "Docno": "",
            //                         "Billtobuyrname": oresponse.results[0].Billtobuyrname,
            //                         "Billtostreet1": oresponse.results[0].Billtostreet1,
            //                         "Billtostreet2": oresponse.results[0].Billtostreet2,
            //                         "Billtostreet3": oresponse.results[0].Billtostreet3,
            //                         "Billtocity": oresponse.results[0].Billtocity,
            //                         "Billtocountry": oresponse.results[0].Billtocountry,
            //                         "Constoname": oresponse.results[0].CustomerName,
            //                         "Constostreet1": oresponse.results[0].Constostreet1,
            //                         "Constostreet2": oresponse.results[0].Conslctostreet2,
            //                         "Constostreet3": oresponse.results[0].Conslctostreet3,
            //                         "Constocity": oresponse.results[0].Constocity,
            //                         "Constocountry": oresponse.results[0].Constocountry,
            //                         "Notifyname": oresponse.results[0].Notifyname,
            //                         "Notifystreet1": oresponse.results[0].Notifystreet1,
            //                         "Notifystreet2": oresponse.results[0].Notify2street2,
            //                         "Notifystreet3": oresponse.results[0].Notifystreet3,
            //                         "Notifycity": oresponse.results[0].Notifycity,
            //                         "Notifycountry": oresponse.results[0].Notifycountry,
            //                         "Notify2name": oresponse.results[0].Notify2name,
            //                         "Notify2street1": oresponse.results[0].Notify2street1,
            //                         "Notify2street2": oresponse.results[0].Notify2street2,
            //                         "Notify2street3": oresponse.results[0].Notify2street3,
            //                         "Notify2city": oresponse.results[0].Notify2city,
            //                         "Notify2country": oresponse.results[0].Notify2country,
            //                         "Conslctoname": oresponse.results[0].Conslctoname,
            //                         "Conslctostreet1": oresponse.results[0].Conslctostreet1,
            //                         "Conslctostreet2": oresponse.results[0].Conslctostreet2,
            //                         "Conslctostreet3": oresponse.results[0].Conslctostreet3,
            //                         "Conslctocity": oresponse.results[0].Conslctocity,
            //                         "Conslctocountry": oresponse.results[0].Conslctocountry,
            //                         "Notify3name": oresponse.results[0].Notify3name,
            //                         "Notify3street1": oresponse.results[0].Notify3street1,
            //                         "Notify3street2": oresponse.results[0].Notify3street2,
            //                         "Notify3street3": oresponse.results[0].Notify3street3,
            //                         "Notify3city": oresponse.results[0].Notify3city,
            //                         "Notify3country": oresponse.results[0].Notify3country
            //                     }
            //                     this.getView().setModel(new sap.ui.model.json.JSONModel(oBuyerData), "oBuyerPayload")
            //                 }
            //             }.bind(this)
            //         })
            //     }
            // }


            SaveEximData: function () {
                var that = this;
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Saving Data",
                    text: "Please wait"
                });
                oBusyDialog.open();
                // var oModel = that.getView().getModel();
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZEXIM_V2API")
                var oGeneralData = that.getView().getModel("oPayloadData");
                var oBuyerDataModel = that.getView().getModel("oBuyerPayload");
                var oCalculationModel = that.getView().getModel("oCalculationPayload");
                var DocType = that.getView().byId("idDocType").getValue();
                var sInput = that.getView().byId("idDoc").getValue();
                var oFilter = new sap.ui.model.Filter("Docno", "EQ", sInput);
                var oFilter2 = new sap.ui.model.Filter("Doctype", "EQ", DocType);
                var checkBoxValue = that.getView().byId("idCheckBox").getSelected();

                var invoiceDate = that.getView().byId("idInvDate").getValue();
                var referenceDate = that.getView().byId("idReferenceDate").getValue();
                var performaInvoiceDate = that.getView().byId("idPerformaInvoiceDate").getValue();
                var deliveryDate = that.getView().byId("idDeliveryDate").getValue();
                var lrDate = that.getView().byId("idLrDate").getValue();
                var epcgDate = that.getView().byId("idEPCGDate").getValue();
                var shipmentDate = that.getView().byId("idShipmentDate").getValue();

                if (invoiceDate === "") {
                    var newDate1 = null
                } else {
                    var oDate = new Date(invoiceDate);
                    var newDate = new Date(oDate.getTime() - oDate.getTimezoneOffset() * 60000);
                    var newDate1 = newDate.toISOString().slice(0, 16);
                }

                if (referenceDate === "") {
                    var oReferenceDate = null
                } else {
                    var oDate1 = new Date(referenceDate);
                    var referencedate = new Date(oDate1.getTime() - oDate1.getTimezoneOffset() * 60000);
                    var oReferenceDate = referencedate.toISOString().slice(0, 16);
                }

                if (performaInvoiceDate === "") {
                    var oPerformaInvoiceDate = null
                } else {
                    var oDate2 = new Date(performaInvoiceDate);
                    var performainvoicedate = new Date(oDate2.getTime() - oDate2.getTimezoneOffset() * 60000);
                    var oPerformaInvoiceDate = performainvoicedate.toISOString().slice(0, 16);
                }

                if (deliveryDate === "") {
                    var oDeliveryDate = null
                } else {
                    var oDate3 = new Date(deliveryDate);
                    var deliverydate = new Date(oDate3.getTime() - oDate3.getTimezoneOffset() * 60000);
                    var oDeliveryDate = deliverydate.toISOString().slice(0, 16);
                }

                if (lrDate === "") {
                    var oLrDate = null
                } else {
                    var oDate4 = new Date(lrDate);
                    var lrdate = new Date(oDate4.getTime() - oDate4.getTimezoneOffset() * 60000);
                    var oLrDate = lrdate.toISOString().slice(0, 16);
                }

                if (epcgDate === "") {
                    var oEpcgDate = null
                } else {
                    var oDate5 = new Date(epcgDate);
                    var epcgdate = new Date(oDate5.getTime() - oDate5.getTimezoneOffset() * 60000);
                    var oEpcgDate = epcgdate.toISOString().slice(0, 16);
                }

                if (shipmentDate === "") {
                    var oShipmentDate = null
                } else {
                    var oDate6 = new Date(shipmentDate);
                    var shipmentdate = new Date(oDate6.getTime() - oDate6.getTimezoneOffset() * 60000);
                    var oShipmentDate = shipmentdate.toISOString().slice(0, 16);
                }

                oGeneralData.getData().DocDate = newDate1;
                oGeneralData.getData().RefreanceDate = oReferenceDate;
                oGeneralData.getData().Peformadate = oPerformaInvoiceDate;
                oGeneralData.getData().Deliverydate = oDeliveryDate;
                oGeneralData.getData().LrDate = oLrDate;
                oGeneralData.getData().Epcgdate = oEpcgDate;
                oGeneralData.getData().Shipmentdate = oShipmentDate;
                oModel.read("/generaltab_", {
                    filters: [oFilter, oFilter2],
                    success: function (oresponse) {
                        if (oresponse.results.length === 0) {
                            oModel.create("/generaltab_", oGeneralData.getData(), {
                                method: "POST",
                                success: function (oresponse) {
                                    oBusyDialog.close();
                                    that.getView().getModel("oPayloadData").refresh(true);
                                    oBuyerDataModel.getData().Docno = that.getView().byId("idDoc").getValue();
                                    oBuyerDataModel.getData().Doctype = that.getView().byId("idDocType").getValue();
                                    if (checkBoxValue === true) {
                                        oBuyerDataModel.getData().Tobecontinue = "X";
                                    } else {
                                        oBuyerDataModel.getData().Tobecontinue = " ";
                                    }

                                    oModel.read("/YCONSIGNEDATA", {
                                        filters: [oFilter, oFilter2],
                                        success: function (oresponse) {
                                            if (oresponse.results.length === 0) {
                                                oModel.create("/YCONSIGNEDATA", oBuyerDataModel.getData(), {
                                                    method: "POST",
                                                    success: function (oresponse) {
                                                        oBusyDialog.close();
                                                        that.getView().getModel("oBuyerPayload").refresh(true);
                                                        oCalculationModel.getData().Doctype = that.getView().byId("idDocType").getValue();
                                                        oCalculationModel.getData().Docno = that.getView().byId("idDoc").getValue();

                                                        var TotalQty = that.getView().byId("idTotalQuan").getValue();
                                                        var TotalNetWt = that.getView().byId("idTotalNetWt").getValue();
                                                        var TotalGrossWt = that.getView().byId("idTotalGrossWt").getValue();
                                                        var DocCurrency = that.getView().byId("idDocCurr").getValue();
                                                        var ExchangeRate = that.getView().byId("idExchange").getValue();
                                                        var Commission = that.getView().byId("idCommission").getValue();
                                                        var Insurance = that.getView().byId("idInsurance").getValue();
                                                        var Freight = that.getView().byId("idFreight").getValue();
                                                        var InsurancePremium = that.getView().byId("idInsurPre").getValue();
                                                        var OceanFreight = that.getView().byId("idOceanFreight").getValue();
                                                        var DutyCalculation = that.getView().byId("idDutyCalc").getValue();
                                                        var AssessableValue = that.getView().byId("idAssessableValue").getValue();
                                                        var GST = that.getView().byId("idGst").getValue();
                                                        var InvoiceAmount = that.getView().byId("idInvAmt").getValue();
                                                        var AddAmount = that.getView().byId("idAddAmt").getValue();
                                                        var LessAmount = that.getView().byId("idLessAmt").getValue();
                                                        var GrandTotalAmount = that.getView().byId("idGrandTotalAmt").getValue();

                                                        if (TotalQty.length === 0) {
                                                            oCalculationModel.getData().Totalqty = "0.00";
                                                        } if (TotalNetWt.length === 0) {
                                                            oCalculationModel.getData().Totalnetqty = "0.00";
                                                        } if (TotalGrossWt.length === 0) {
                                                            oCalculationModel.getData().Totalgrosswt = "0.00";
                                                        } if (DocCurrency.length === 0) {
                                                            oCalculationModel.getData().Doccurrency = "0.00";
                                                        } if (ExchangeRate.length === 0) {
                                                            oCalculationModel.getData().Exchangerate = "0.00";
                                                        } if (Commission.length === 0) {
                                                            oCalculationModel.getData().Commission = "0.0000";
                                                        } if (Insurance.length === 0) {
                                                            oCalculationModel.getData().Insurance = "0.00";
                                                        } if (Freight.length === 0) {
                                                            oCalculationModel.getData().Freight = "0.00000";
                                                        } if (InsurancePremium.length === 0) {
                                                            oCalculationModel.getData().Insurancepre = "0.00";
                                                        } if (OceanFreight.length === 0) {
                                                            oCalculationModel.getData().Oceanfreight = "0.00";
                                                        } if (DutyCalculation.length === 0) {
                                                            oCalculationModel.getData().Dutycalculation = "0.00";
                                                        } if (AssessableValue.length === 0) {
                                                            oCalculationModel.getData().Assessablevalueinrs = "0.00";
                                                        } if (GST.length === 0) {
                                                            oCalculationModel.getData().Gst = "0.00";
                                                        } if (InvoiceAmount.length === 0) {
                                                            oCalculationModel.getData().Invoiceamount = "0.00";
                                                        } if (AddAmount.length === 0) {
                                                            oCalculationModel.getData().Addamt = "0.00";
                                                        } if (LessAmount.length === 0) {
                                                            oCalculationModel.getData().Lessamt = "0.00";
                                                        } if (GrandTotalAmount.length === 0) {
                                                            oCalculationModel.getData().Grandtotalamount = "0.0000";
                                                        }

                                                        oCalculationModel.getData().Totalpackages = that.getView().byId("idTotalPack").getValue().toString();

                                                        var lcdate = that.getView().byId("idLcDate").getValue();
                                                        var oDate = new Date(lcdate);
                                                        var newDate = new Date(oDate.getTime() - oDate.getTimezoneOffset() * 60000);
                                                        var lcdate1 = newDate.toISOString().slice(0, 16);

                                                        oCalculationModel.getData().Lcdate1 = lcdate1
                                                        oModel.read("/Zcalculation", {
                                                            filters: [oFilter, oFilter2],
                                                            success: function (oresponse) {
                                                                if (oresponse.results.length === 0) {
                                                                    oModel.create("/Zcalculation", oCalculationModel.getData(), {
                                                                        success: function () {
                                                                            oBusyDialog.close();
                                                                            MessageBox.success("Data saved successfully")
                                                                        }.bind(this),
                                                                        error: function () {
                                                                            oBusyDialog.close();
                                                                            MessageBox.error("Calculation Data was not saved")
                                                                        }
                                                                    })
                                                                } else {
                                                                    // that.onUpdateCalculationData();
                                                                    oBusyDialog.close();
                                                                }
                                                            }.bind(this)
                                                        })


                                                    }.bind(this),
                                                    error: function () {
                                                        oBusyDialog.close();
                                                        MessageBox.error("Buyer Data was not saved");
                                                    }
                                                })
                                            } else {
                                                // that.onUpdateBuyerData();
                                                oBusyDialog.close();
                                            }
                                        }.bind(this)
                                    })
                                }.bind(this),
                                error: function () {
                                    MessageBox.error("Data not saved");
                                    oBusyDialog.close();
                                }
                            })
                        } else {
                            oBusyDialog.close();
                            that.UpdateEximData();
                        }
                    }.bind(this),
                    error: function () {
                        oBusyDialog.close();
                    }
                })

            },

            UpdateEximData: function () {
                var that = this;
                that.onSaveGeneral();
                that.onSaveBuyerData();
                that.onSaveCalculation();
                that.onSaveItemDetails();
                // that.onSaveBL();
            },

            changeDesignationACAuthorized: function(oEvent){
                var val = oEvent.mParameters.value;
                if(val == "Maneesh Gupta"){this.getView().byId("Designation").setValue("Ast. Manager")}
                else if(val == "Anant Pareek"){this.getView().byId("Designation").setValue("")}
                else if(val == "Mahesh Bihani Ji"){this.getView().byId("Designation").setValue("")}
                else if(val == "Anil Jhanwar"){this.getView().byId("Designation").setValue("Dypt. Manager")}
            },






        });
    });

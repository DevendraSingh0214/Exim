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

        return Controller.extend("zexim.controller.PostShipment", {
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

                UIComponent.getRouterFor(this).getRoute('PostShipment').attachPatternMatched(this._onRouteMatch, this);
            },

            _onRouteMatch: function () {
                var oDate = new Date();
                var currentDate = new Date()
                // var currentDate1 = (currentDate.getDate()).toString().padStart(2, "0") + "-" + (currentDate.getMonth() + 1).toString().padStart(2, "0") + "-" + currentDate.getFullYear();
                const currentDate1 = `${currentDate.getDate() < 10 ? '0' : ''}${currentDate.getDate()}-${currentDate.getMonth() + 1 < 10 ? '0' : ''}${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
                var oPayloadObject = {
                    "Docno": "",
                    "Doctype": "PO",
                    "DocDate": currentDate1,
                    "RefreanceNo": "",
                    "RefreanceDate": currentDate1,
                    "Peformano": "",
                    "PerformaNoMore": "",
                    "Peformadate": currentDate1,
                    "Deliveryno": "",
                    "Deliverydate": currentDate1,
                    "TransporterName": "",
                    "Lrno": "",
                    "LrDate": currentDate1,
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
                    "Epcgdate": currentDate1,
                    "Remarks": "",
                    "Remarks1": "",
                    "Remarks2": "",
                    "PaymentTerms": "",
                    "Deliveryterms": "",
                    "Incotermslocation": "",
                    "Shipmentmark": "",
                    "Shipmentdate": currentDate1,
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
                    "Weighslip": "",
                    "Marksndnumber": "",
                    "Descgoods": "",
                    "Blno": "",
                    "Bldate": "",
                    "Descgoodsother": "",
                    "Detailsbylc": "",
                    "Otherdetails": "",
                    "Billofexchange": "",
                    "Nonegotiable": ""
                }
                this.getView().setModel(new sap.ui.model.json.JSONModel(oPayloadObject), "oPayloadData")

                var oBuyerPayloadObject = {
                    "Docno": "",
                    "Doctype": "PO",
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
                    "Notify3country": "",
                    "Taxid": "",
                    "Secondbuyer": "",
                    "Secondbuyername": "",
                    "Secondstreet1": "",
                    "Secondstreet2": "",
                    "Secondstreet3": "",
                    "Secondcity": "",
                    "Secondcountry": ""
                }
                this.getView().setModel(new sap.ui.model.json.JSONModel(oBuyerPayloadObject), "oBuyerPayload")

                var oCalculationObject = {
                    "Docno": "",
                    "Doctype": "PO",
                    "FobValue": "",
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
                    "Stufffileno": "",
                    "Stufffilpermdate": "",
                    "Exportunder": "",
                    "Advancelicense": "",
                    "Frightchargetype": "",
                    "Buyerinsname": "",
                    "Buyerinsaddress1": "",
                    "Buyerinsaddress2": "",
                    "Buyerinsaddress3": "",
                    "Buyerinsaddress4": "",
                    "Covernoteno": "",
                    "Covernotedate": "",
                    "Etddate": "",
                    "Etadate": "",
                    "Foreignbank": "",
                    "Draweesiftcode": "",
                    "Countryfinaldest": "",
                    "Shippingadvicedate": "",
                    "Boeheader": "",
                    "Boeitem": "",
                    "Boebanksname": "",
                    "Lcdate1": "",
                    "Documentthrough": ""
                }
                this.getView().setModel(new sap.ui.model.json.JSONModel(oCalculationObject), "oCalculationPayload")

                var oSettingObject = {
                    editable: true
                }
                this.getView().setModel(new sap.ui.model.json.JSONModel(oSettingObject), "oGeneralModel")
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
                this.CallExportData_TabData();
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZEXIM_V2API")
                var oGeneralData = this.getView().getModel("oPayloadData");
                var DocType = oGeneralData.getData().Doctype
                var sInput = this.getView().byId("idDoc").getValue();
                var oFilter = new sap.ui.model.Filter("Docno", "EQ", sInput);
                var oFilter1 = new sap.ui.model.Filter("BillingDocument", "EQ", sInput);
                var oFilter2 = new sap.ui.model.Filter("Doctype", "EQ", DocType);

                var oDate = new Date();
                var newDate = new Date(oDate.getTime() - oDate.getTimezoneOffset() * 60000);
                var newDate1 = newDate.toISOString().slice(0, 16);




                oModel.read("/generaltab_", {
                    filters: [oFilter, oFilter2],
                    success: function (oresponse) {
                        if (oresponse.results.length === 0) {
                            oModel.read("/YEINVOICE_CDS", {
                                filters: [oFilter1],
                                success: function (oresponse) {
                                    oBusyDialog.close();
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
                                        "Doctype": "PO",
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
                            var docType = "PO";

                            const InvoiceDate = new Date(oresponse.results[0].DocDate);
                            const InvoiceDate1 = `${InvoiceDate.getDate() < 10 ? '0' : ''}${InvoiceDate.getDate()}-${InvoiceDate.getMonth() + 1 < 10 ? '0' : ''}${InvoiceDate.getMonth() + 1}-${InvoiceDate.getFullYear()}`;
                            var invoiceData = {
                                "Docno": oresponse.results[0].Docno,
                                "Doctype": docType,
                                "DocDate": oresponse.results[0].DocDate,
                                "RefreanceNo": oresponse.results[0].RefreanceNo,
                                "RefreanceDate": oresponse.results[0].RefreanceDate,
                                "Peformano": oresponse.results[0].Peformano,
                                "PerformaNoMore": oresponse.results[0].PerformaNoMore,
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
                                "Marksndnumber": oresponse.results[0].Marksndnumber,
                                "Descgoods": oresponse.results[0].Descgoods,
                                "Descgoodsother": oresponse.results[0].Descgoodsother,
                                "Detailsbylc": oresponse.results[0].Detailsbylc,
                                "Otherdetails": oresponse.results[0].Otherdetails,
                                "Billofexchange": oresponse.results[0].Billofexchange,
                                "Nonegotiable": oresponse.results[0].Nonegotiable,
                                "Bldate": oresponse.results[0].Bldate,
                                "Blno": oresponse.results[0].Blno
                            }
                            this.getView().setModel(new sap.ui.model.json.JSONModel(invoiceData), "oPayloadData")
                        }

                        oModel.read("/YCONSIGNEDATA", {
                            filters: [oFilter, oFilter2],
                            success: function (oresponse) {
                                if (oresponse.results.length === 0) {
                                    oModel.read("/YEINVOICE_CDS", {
                                        filters: [oFilter1],
                                        success: function (oresponse) {
                                            oBusyDialog.close();
                                            var oBuyerData = {
                                                "Docno": "",
                                                "Doctype": "PO",
                                                "Billtobuyrname": oresponse.results[0].CustomerName,
                                                "Billtostreet1": oresponse.results[0].billtostreet1,
                                                "Billtostreet2": oresponse.results[0].billtostreet2,
                                                "Billtostreet3": oresponse.results[0].billltostreet3,
                                                "Billtocity": oresponse.results[0].CityName,
                                                "Billtocountry": oresponse.results[0].billltocountry,
                                                "Constoname": oresponse.results[0].SHIPTONAME,
                                                "Constostreet1": oresponse.results[0].shiptostreet1,
                                                "Constostreet2": oresponse.results[0].shiptostreet2,
                                                "Constostreet3": oresponse.results[0].shiptostreet3,
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
                                        success: function (oresponse) {
                                            oBusyDialog.close();
                                            var oBuyerData = {
                                                "Docno": "",
                                                "Doctype": "PO",
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
                                                "Notify3country": oresponse.results[0].Notify3country,
                                                "Taxid": oresponse.results[0].Taxid,
                                                "Secondbuyer": oresponse.results[0].Secondbuyer,
                                                "Secondbuyername": oresponse.results[0].Secondbuyername,
                                                "Secondstreet1": oresponse.results[0].Secondstreet1,
                                                "Secondstreet2": oresponse.results[0].Secondstreet2,
                                                "Secondstreet3": oresponse.results[0].Secondstreet3,
                                                "Secondcity": oresponse.results[0].Secondcity,
                                                "Secondcountry": oresponse.results[0].Secondcountry
                                            }
                                            this.getView().setModel(new sap.ui.model.json.JSONModel(oBuyerData), "oBuyerPayload")
                                        }.bind(this)
                                    })
                                }
                            }.bind(this)
                        })

                        oModel.read("/Zcalculation", {
                            filters: [oFilter, oFilter2],
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
                                                var date = "";
                                            } else {
                                                var lcdate = oresponse.results[0].LcDate
                                                var lcdate1 = new Date(lcdate)
                                                date = lcdate1.getFullYear() + "-" + Number(lcdate1.getMonth() + 1) + "-" + lcdate1.getDate()
                                            }
                                            var oCalculation = {
                                                "Docno": oresponse.results[0].BillingDocument,
                                                "Doctype": "PO",
                                                "FobValue": "",
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
                                                "Invoiceamount": parseFloat(oresponse.results[0].docuhead_netamt).toFixed(2),
                                                "Addamt": oresponse.results[0].ADDAMT_exim,
                                                "Lessamt": oresponse.results[0].DISCOUNT_exim,
                                                "Grandtotalamount": grandtotal < 1 ? "" : grandtotal,
                                                "Amountinwords": "",
                                                "Lcno": oresponse.results[0].LcNo,
                                                "Lcdate": date,
                                                "Issueingbank": oresponse.results[0].BankName,
                                                "Bank": "",
                                                "Adcodebank": "",
                                                "Buyername": "",
                                                "Street1": "",
                                                "Street2": "",
                                                "Street3": "",
                                                "Stufffileno": "",
                                                "Stufffilpermdate": "",
                                                "Exportunder": "",
                                                "Advancelicense": "",
                                                "Countryfinaldest": oresponse.results[0].shiptocountry
                                            }
                                            this.getView().setModel(new sap.ui.model.json.JSONModel(oCalculation), "oCalculationPayload")
                                        }.bind(this)
                                    })
                                } else {
                                    oModel.read("/Zcalculation", {
                                        filters: [oFilter],
                                        success: function (oresponse) {
                                            if (oresponse.results[0].Lcdate1 === null) {
                                                var lcdate1 = oresponse.results[0].Lcdate
                                            } else {
                                                var oDate = oresponse.results[0].Lcdate1;
                                                lcdate1 = oDate.getFullYear() + '-' + Number(oDate.getMonth() + 1) + '-' + oDate.getDate();
                                            }
                                            var oCalculationObject = {
                                                "Docno": oresponse.results[0].Docno,
                                                "Doctype": "PO",
                                                "FobValue": oresponse.results[0].FobValue,
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
                                                "Invoiceamount": parseFloat(oresponse.results[0].Invoiceamount).toFixed(2),
                                                "Addamt": oresponse.results[0].Addamt,
                                                "Lessamt": oresponse.results[0].Lessamt,
                                                "Grandtotalamount": parseFloat(oresponse.results[0].Grandtotalamount).toFixed(2) < 1 ? "" : parseFloat(oresponse.results[0].Grandtotalamount).toFixed(2),
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
                                                "Buyerinsaddress1": oresponse.results[0].Buyerinsaddress1,
                                                "Buyerinsaddress2": oresponse.results[0].Buyerinsaddress2,
                                                "Buyerinsaddress3": oresponse.results[0].Buyerinsaddress3,
                                                "Buyerinsaddress4": oresponse.results[0].Buyerinsaddress4,
                                                "Stufffileno": oresponse.results[0].Stufffileno,
                                                "Stufffilpermdate": oresponse.results[0].Stufffilpermdate,
                                                "Exportunder": oresponse.results[0].Exportunder,
                                                "Advancelicense": oresponse.results[0].Advancelicense,
                                                "Frightchargetype": oresponse.results[0].Frightchargetype,
                                                "Covernoteno": oresponse.results[0].Covernoteno,
                                                "Covernotedate": oresponse.results[0].Covernotedate,
                                                "Etddate": oresponse.results[0].Etddate,
                                                "Etadate": oresponse.results[0].Etadate,
                                                "Foreignbank": oresponse.results[0].Foreignbank,
                                                "Draweesiftcode": oresponse.results[0].Draweesiftcode,
                                                "Countryfinaldest": oresponse.results[0].Countryfinaldest,
                                                "Shippingadvicedate": oresponse.results[0].Shippingadvicedate,
                                                "Boeheader": oresponse.results[0].Boeheader,
                                                "Boeitem": oresponse.results[0].Boeitem,
                                                "Boebanksname": oresponse.results[0].Boebanksname,
                                                "Documentthrough": oresponse.results[0].Documentthrough
                                            }
                                            this.getView().setModel(new sap.ui.model.json.JSONModel(oCalculationObject), "oCalculationPayload")
                                        }.bind(this)
                                    })
                                }
                            }.bind(this)
                        })

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
                                                "DeliveryNumber": items.Deliveryno,
                                                "ContainerNumber": items.Containerno,
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
                                                "DeliveryNumber": items.Deliveryno,
                                                "ContainerNumber": items.Containerno,
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

                    }.bind(this),
                    error: function () {
                        oBusyDialog.close();
                    }
                })
            },
            CallExportData_TabData: function () {
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Fetching Data",
                    text: "Please wait"
                });
                oBusyDialog.open();
                var that = this;
                var oModel_ExportData = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZEXPORT_DATA_BIND");
                var DocType = that.getView().byId("idDocType").getValue();
                var sInput = that.getView().byId("idDoc").getValue();
                var oFilter = new sap.ui.model.Filter("Docno", "EQ", sInput);
                var oFilter2 = new sap.ui.model.Filter("Doctype", "EQ", DocType);

                oModel_ExportData.read("/ZEXPORT_DATA_CDS", {
                    filters: [oFilter, oFilter2],
                    success: function (oresponse) {
                        oBusyDialog.close();
                        if (oresponse.results.length != 0) {
                            if (oresponse.results[0].DocDate == "" || oresponse.results[0].DocDate == "0.00" || oresponse.results[0].DocDate == null) {
                                this.getView().byId("idInvDate").setValue()
                            } else {
                                const InvoiceDate = new Date(oresponse.results[0].DocDate);
                                const InvoiceDate1 = `${InvoiceDate.getFullYear()}-${InvoiceDate.getMonth() + 1 < 10 ? '0' : ''}${InvoiceDate.getMonth() + 1}-${InvoiceDate.getDate() < 10 ? '0' : ''}${InvoiceDate.getDate()}`;
                                this.getView().byId("idInvDate").setValue(InvoiceDate1)
                            }
                            if (oresponse.results[0].Sbdate == "" || oresponse.results[0].Sbdate == "0.00" || oresponse.results[0].Sbdate == null) {
                                this.getView().byId("ExportData_SbDate").setValue()
                            } else {
                                const ExportData_SbDate = new Date(oresponse.results[0].Sbdate);
                                const ExportData_SbDate1 = `${ExportData_SbDate.getFullYear()}-${ExportData_SbDate.getMonth() + 1 < 10 ? '0' : ''}${ExportData_SbDate.getMonth() + 1}-${ExportData_SbDate.getDate() < 10 ? '0' : ''}${ExportData_SbDate.getDate()}`;
                                this.getView().byId("ExportData_SbDate").setValue(ExportData_SbDate1)
                            }


                            if (oresponse.results[0].Leodate == "" || oresponse.results[0].Leodate == "0.00" || oresponse.results[0].Leodate == null) {
                                this.getView().byId("ExportData_LeoDate").setValue()
                            } else {
                                const ExportData_LeoDate = new Date(oresponse.results[0].Leodate);
                                const ExportData_LeoDate1 = `${ExportData_LeoDate.getFullYear()}-${ExportData_LeoDate.getMonth() + 1 < 10 ? '0' : ''}${ExportData_LeoDate.getMonth() + 1}-${ExportData_LeoDate.getDate() < 10 ? '0' : ''}${ExportData_LeoDate.getDate()}`;
                                this.getView().byId("ExportData_LeoDate").setValue(ExportData_LeoDate1)
                            }

                            if (oresponse.results[0].Bldate == "" || oresponse.results[0].Bldate == "0.00" || oresponse.results[0].Bldate == null) {
                                this.getView().byId("ExportData_BlDate").setValue()
                            } else {
                                const ExportData_BlDate = new Date(oresponse.results[0].Bldate);
                                const ExportData_BlDate1 = `${ExportData_BlDate.getFullYear()}-${ExportData_BlDate.getMonth() + 1 < 10 ? '0' : ''}${ExportData_BlDate.getMonth() + 1}-${ExportData_BlDate.getDate() < 10 ? '0' : ''}${ExportData_BlDate.getDate()}`;
                                this.getView().byId("ExportData_BlDate").setValue(ExportData_BlDate1)
                            }

                            if (oresponse.results[0].Sobdate == "" || oresponse.results[0].Sobdate == "0.00" || oresponse.results[0].Sobdate == null) {
                                this.getView().byId("ExportData_SobDate").setValue()
                            } else {
                                const ExportData_SobDate = new Date(oresponse.results[0].Sobdate);
                                const ExportData_SobDate1 = `${ExportData_SobDate.getFullYear()}-${ExportData_SobDate.getMonth() + 1 < 10 ? '0' : ''}${ExportData_SobDate.getMonth() + 1}-${ExportData_SobDate.getDate() < 10 ? '0' : ''}${ExportData_SobDate.getDate()}`;
                                this.getView().byId("ExportData_SobDate").setValue(ExportData_SobDate1)
                            }
                            this.getView().byId("ExportData_ShippingBillNo").setValue(oresponse.results[0].Shippingbillno);
                            this.getView().byId("ExportData_BlNumber").setValue(oresponse.results[0].Blnumber);
                            this.getView().byId("ExportData_ShippingLine").setValue(oresponse.results[0].Shippingline);
                            this.getView().byId("ExportData_Forwarder").setValue(oresponse.results[0].Forwarder);
                        }
                    }.bind(this)
                })
            },

            CallEximAllData: function () {
                var oBusy = new sap.m.BusyDialog({
                    text: "Please Wait"
                });
                oBusy.open();
                var that = this;
                var oGeneralData = that.getView().getModel("oPayloadData");
                var DocType = oGeneralData.getData().Doctype
                var sInput = that.getView().byId("idDoc").getValue();
                var oFilter = new sap.ui.model.Filter("Docno", "EQ", sInput);
                var oFilter1 = new sap.ui.model.Filter("BillingDocument", "EQ", sInput);
                var oFilter2 = new sap.ui.model.Filter("Doctype", "EQ", DocType);

                var oDate = new Date();
                var newDate = new Date(oDate.getTime() - oDate.getTimezoneOffset() * 60000);
                var newDate1 = newDate.toISOString().slice(0, 16);
                // Assuming you have already instantiated your ODataModel
                var fetchedData = [];
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZEXIM_V2API")
                var entitySets = ["generaltab_", "YCONSIGNEDATA", "Zcalculation", "ZEXPORT_DATA_CDS", "Draft_Bl"];
                entitySets.forEach(function (entitySet) {
                    oModel.read("/" + entitySet, {
                        filters: [oFilter, oFilter2],
                        success: function (data) {
                            if (entitySet == "generaltab_") {
                                if (data.results.length != 0) {
                                    var docType = "PO";
                                    const InvoiceDate = new Date(data.results[0].DocDate);
                                    const InvoiceDate1 = `${InvoiceDate.getDate() < 10 ? '0' : ''}${InvoiceDate.getDate()}-${InvoiceDate.getMonth() + 1 < 10 ? '0' : ''}${InvoiceDate.getMonth() + 1}-${InvoiceDate.getFullYear()}`;
                                    var invoiceData = {
                                        "Docno": data.results[0].Docno,
                                        "Doctype": docType,
                                        "DocDate": data.results[0].DocDate,
                                        "RefreanceNo": data.results[0].RefreanceNo,
                                        "RefreanceDate": data.results[0].RefreanceDate,
                                        "Peformano": data.results[0].Peformano,
                                        "PerformaNoMore": data.results[0].PerformaNoMore,
                                        "Peformadate": data.results[0].Peformadate,
                                        "Deliveryno": data.results[0].Deliveryno,
                                        "Deliverydate": data.results[0].Deliverydate,
                                        "TransporterName": data.results[0].TransporterName,
                                        "Lrno": data.results[0].Lrno,
                                        "LrDate": data.results[0].LrDate,
                                        "TruckNo": data.results[0].TruckNo,
                                        "Containerno": data.results[0].Containerno,
                                        "Containersize": data.results[0].Containersize,
                                        "RfidNo": data.results[0].RfidNo,
                                        "Lineseal": data.results[0].Lineseal,
                                        "Vesselno": data.results[0].Vesselno,
                                        "shipmenttype": data.results[0].shipmenttype,
                                        "Precarrier": data.results[0].Precarrier,
                                        "Portofdischarge": data.results[0].Portofdischarge,
                                        "Portofloading": data.results[0].Portofloading,
                                        "Epcgno": data.results[0].Epcgno,
                                        "Epcgdate": data.results[0].Epcgdate,
                                        "Remarks": data.results[0].Remarks,
                                        "Remarks1": data.results[0].Remarks1,
                                        "Remarks2": data.results[0].Remarks2,
                                        "PaymentTerms": data.results[0].PaymentTerms,
                                        "Deliveryterms": data.results[0].Deliveryterms,
                                        "Incotermslocation": data.results[0].Incotermslocation,
                                        "Shipmentmark": data.results[0].Shipmentmark,
                                        "Shipmentdate": data.results[0].Shipmentdate,
                                        "Weightofcontainer": data.results[0].Weightofcontainer,
                                        "Exportname1": "SUDIVA SPINNERS PVT. LTD.",
                                        "Street1": "N.H.48",
                                        "Street2": "Village: Dhunwalia",
                                        "Street3": "Post-Sareri",
                                        "City": "BHILWARA-311024(RAJ.)",
                                        "Country": "INDIA",
                                        "Exporteriecno": data.results[0].Exporteriecno,
                                        "Authorisedsigntory": data.results[0].Authorisedsigntory,
                                        "Authorisedsigntoryno": "7230051055",
                                        "Designation": data.results[0].Designation,
                                        "Nameofcustomsbroker": data.results[0].Nameofcustomsbroker,
                                        "Maxperwt": data.results[0].Maxperwt,
                                        "Contareweight": data.results[0].Contareweight,
                                        "Weighslip": data.results[0].Weighslip,
                                        "Marksndnumber": data.results[0].Marksndnumber,
                                        "Descgoods": data.results[0].Descgoods,
                                        "Descgoodsother": data.results[0].Descgoodsother,
                                        "Detailsbylc": data.results[0].Detailsbylc,
                                        "Otherdetails": data.results[0].Otherdetails,
                                        "Billofexchange": data.results[0].Billofexchange,
                                        "Nonegotiable": data.results[0].Nonegotiable,
                                        "Bldate": data.results[0].Bldate,
                                        "Blno": data.results[0].Blno
                                    }
                                    that.getView().setModel(new sap.ui.model.json.JSONModel(invoiceData), "oPayloadData")
                                } else {
                                    oModel.read("/YEINVOICE_CDS", {
                                        filters: [oFilter1],
                                        success: function (oresponse) {
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
                                            var oInvoiceData = {
                                                "Docno": oresponse.results[0].BillingDocument,
                                                "Doctype": "PO",
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
                                            that.getView().setModel(new sap.ui.model.json.JSONModel(oInvoiceData), "oPayloadData")
                                        }.bind(this),
                                        error: function () {
                                        }
                                    })
                                }
                            }
                            else if (entitySet == "YCONSIGNEDATA") {
                                if (data.results.length != 0) {
                                    var oBuyerData = {
                                        "Docno": "",
                                        "Doctype": "PO",
                                        "Billtobuyrname": data.results[0].Billtobuyrname,
                                        "Billtostreet1": data.results[0].Billtostreet1,
                                        "Billtostreet2": data.results[0].Billtostreet2,
                                        "Billtostreet3": data.results[0].Billtostreet3,
                                        "Billtocity": data.results[0].Billtocity,
                                        "Billtocountry": data.results[0].Billtocountry,
                                        "Constoname": data.results[0].Constoname,
                                        "Constostreet1": data.results[0].Constostreet1,
                                        "Constostreet2": data.results[0].Constostreet2,
                                        "Constostreet3": data.results[0].Constostreet3,
                                        "Constocity": data.results[0].Constocity,
                                        "Constocountry": data.results[0].Constocountry,
                                        "Notifyname": data.results[0].Notifyname,
                                        "Notifystreet1": data.results[0].Notifystreet1,
                                        "Notifystreet2": data.results[0].Notifystreet2,
                                        "Notifystreet3": data.results[0].Notifystreet3,
                                        "Notifycity": data.results[0].Notifycity,
                                        "Notifycountry": data.results[0].Notifycountry,
                                        "Notify2name": data.results[0].Notify2name,
                                        "Notify2street1": data.results[0].Notify2street1,
                                        "Notify2street2": data.results[0].Notify2street2,
                                        "Notify2street3": data.results[0].Notify2street3,
                                        "Notify2city": data.results[0].Notify2city,
                                        "Notify2country": data.results[0].Notify2country,
                                        "Conslctoname": data.results[0].Conslctoname,
                                        "Conslctostreet1": data.results[0].Conslctostreet1,
                                        "Conslctostreet2": data.results[0].Conslctostreet2,
                                        "Conslctostreet3": data.results[0].Conslctostreet3,
                                        "Conslctocity": data.results[0].Conslctocity,
                                        "Conslctocountry": data.results[0].Conslctocountry,
                                        "Notify3name": data.results[0].Notify3name,
                                        "Notify3street1": data.results[0].Notify3street1,
                                        "Notify3street2": data.results[0].Notify3street2,
                                        "Notify3street3": data.results[0].Notify3street3,
                                        "Notify3city": data.results[0].Notify3city,
                                        "Notify3country": data.results[0].Notify3country,
                                        "Taxid": data.results[0].Taxid,
                                        "Secondbuyer": data.results[0].Secondbuyer,
                                        "Secondbuyername": data.results[0].Secondbuyername,
                                        "Secondstreet1": data.results[0].Secondstreet1,
                                        "Secondstreet2": data.results[0].Secondstreet2,
                                        "Secondstreet3": data.results[0].Secondstreet3,
                                        "Secondcity": data.results[0].Secondcity,
                                        "Secondcountry": data.results[0].Secondcountry
                                    }
                                    that.getView().setModel(new sap.ui.model.json.JSONModel(oBuyerData), "oBuyerPayload")
                                } else {
                                    oModel.read("/YEINVOICE_CDS", {
                                        filters: [oFilter1],
                                        success: function (oresponse) {
                                            var oBuyerData = {
                                                "Docno": "",
                                                "Doctype": "PO",
                                                "Billtobuyrname": oresponse.results[0].CustomerName,
                                                "Billtostreet1": oresponse.results[0].billtostreet1,
                                                "Billtostreet2": oresponse.results[0].billtostreet2,
                                                "Billtostreet3": oresponse.results[0].billltostreet3,
                                                "Billtocity": oresponse.results[0].CityName,
                                                "Billtocountry": oresponse.results[0].billltocountry,
                                                "Constoname": oresponse.results[0].SHIPTONAME,
                                                "Constostreet1": oresponse.results[0].shiptostreet1,
                                                "Constostreet2": oresponse.results[0].shiptostreet2,
                                                "Constostreet3": oresponse.results[0].shiptostreet3,
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
                                            that.getView().setModel(new sap.ui.model.json.JSONModel(oBuyerData), "oBuyerPayload")
                                        }.bind(this)
                                    })
                                }
                            }
                            else if (entitySet == "Zcalculation") {
                                if (data.results.length != 0) {
                                    if (data.results[0].Lcdate1 === null) {
                                        var lcdate1 = data.results[0].Lcdate
                                    } else {
                                        var oDate = data.results[0].Lcdate1;
                                        lcdate1 = oDate.getFullYear() + '-' + Number(oDate.getMonth() + 1) + '-' + oDate.getDate();
                                    }
                                    var oCalculationObject = {
                                        "Docno": data.results[0].Docno,
                                        "Doctype": "PO",
                                        "FobValue": data.results[0].FobValue,
                                        "Totalqty": data.results[0].Totalqty,
                                        "Totalnetqty": data.results[0].Totalnetqty,
                                        "Totalgrosswt": data.results[0].Totalgrosswt,
                                        "Totalpackages": data.results[0].Totalpackages,
                                        "Typeofpackages": data.results[0].Typeofpackages,
                                        "Doccurrency": data.results[0].Doccurrency,
                                        "Exchangerate": data.results[0].Exchangerate,
                                        "Commission": parseFloat(data.results[0].Commission).toFixed(2),
                                        "Insurance": data.results[0].Insurance,
                                        "Insurancepre": data.results[0].Insurancepre,
                                        "Freight": parseFloat(data.results[0].Freight).toFixed(2),
                                        "Oceanfreight": data.results[0].Oceanfreight,
                                        "Dutycalculation": data.results[0].Dutycalculation,
                                        "Assessablevalueinrs": parseFloat(data.results[0].Assessablevalueinrs).toFixed(2),
                                        "Gst": data.results[0].Gst,
                                        "Invoiceamount": parseFloat(data.results[0].Invoiceamount).toFixed(2),
                                        "Addamt": data.results[0].Addamt,
                                        "Lessamt": data.results[0].Lessamt,
                                        "Grandtotalamount": parseFloat(data.results[0].Grandtotalamount).toFixed(2) < 1 ? "" : parseFloat(data.results[0].Grandtotalamount).toFixed(2),
                                        "Amountinwords": data.results[0].Amountinwords,
                                        "Lcno": data.results[0].Lcno,
                                        "Lcdate": lcdate1,
                                        "Issueingbank": data.results[0].Issueingbank,
                                        "Bank": data.results[0].Bank,
                                        "Adcodebank": data.results[0].Adcodebank,
                                        "Buyername": data.results[0].Buyername,
                                        "Street1": data.results[0].Street1,
                                        "Street2": data.results[0].Street2,
                                        "Street3": data.results[0].Street3,
                                        "Buyerinsaddress1": data.results[0].Buyerinsaddress1,
                                        "Buyerinsaddress2": data.results[0].Buyerinsaddress2,
                                        "Buyerinsaddress3": data.results[0].Buyerinsaddress3,
                                        "Buyerinsaddress4": data.results[0].Buyerinsaddress4,
                                        "Stufffileno": data.results[0].Stufffileno,
                                        "Stufffilpermdate": data.results[0].Stufffilpermdate,
                                        "Exportunder": data.results[0].Exportunder,
                                        "Advancelicense": data.results[0].Advancelicense,
                                        "Frightchargetype": data.results[0].Frightchargetype,
                                        "Covernoteno": data.results[0].Covernoteno,
                                        "Covernotedate": data.results[0].Covernotedate,
                                        "Etddate": data.results[0].Etddate,
                                        "Etadate": data.results[0].Etadate,
                                        "Foreignbank": data.results[0].Foreignbank,
                                        "Draweesiftcode": data.results[0].Draweesiftcode,
                                        "Countryfinaldest": data.results[0].Countryfinaldest,
                                        "Shippingadvicedate": data.results[0].Shippingadvicedate,
                                        "Boeheader": data.results[0].Boeheader,
                                        "Boeitem": data.results[0].Boeitem,
                                        "Boebanksname": data.results[0].Boebanksname,
                                        "Documentthrough": data.results[0].Documentthrough
                                    }
                                    that.getView().setModel(new sap.ui.model.json.JSONModel(oCalculationObject), "oCalculationPayload")
                                } else {
                                    oModel.read("/YEINVOICE_CDS", {
                                        filters: [oFilter1],
                                        success: function (oresponse) {
                                            oBusyDialog.close();
                                            var freight = parseFloat(oresponse.results[0].frt1_exim + oresponse.results[0].frt2_exim).toFixed(2);
                                            var assessable = parseFloat(oresponse.results[0].assesible * oresponse.results[0].exchangerate).toFixed(2);
                                            var commission = parseFloat(oresponse.results[0].COMMISION1_exim + oresponse.results[0].commision_exim).toFixed(2);
                                            var grandtotal = parseFloat(oresponse.results[0].docuhead_netamt + oresponse.results[0].docuhead_total_tax).toFixed(2);

                                            if (oresponse.results[0].LcDate === null) {
                                                var date = "";
                                            } else {
                                                var lcdate = oresponse.results[0].LcDate
                                                var lcdate1 = new Date(lcdate)
                                                date = lcdate1.getFullYear() + "-" + Number(lcdate1.getMonth() + 1) + "-" + lcdate1.getDate()
                                            }
                                            var oCalculation = {
                                                "Docno": oresponse.results[0].BillingDocument,
                                                "Doctype": "PO",
                                                "FobValue": "",
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
                                                "Invoiceamount": parseFloat(oresponse.results[0].docuhead_netamt).toFixed(2),
                                                "Addamt": oresponse.results[0].ADDAMT_exim,
                                                "Lessamt": oresponse.results[0].DISCOUNT_exim,
                                                "Grandtotalamount": grandtotal < 1 ? "" : grandtotal,
                                                "Amountinwords": "",
                                                "Lcno": oresponse.results[0].LcNo,
                                                "Lcdate": date,
                                                "Issueingbank": oresponse.results[0].BankName,
                                                "Bank": "",
                                                "Adcodebank": "",
                                                "Buyername": "",
                                                "Street1": "",
                                                "Street2": "",
                                                "Street3": "",
                                                "Stufffileno": "",
                                                "Stufffilpermdate": "",
                                                "Exportunder": "",
                                                "Advancelicense": "",
                                                "Countryfinaldest": oresponse.results[0].shiptocountry
                                            }
                                            that.getView().setModel(new sap.ui.model.json.JSONModel(oCalculation), "oCalculationPayload")
                                        }.bind(this)
                                    })
                                }
                            }
                            else if (entitySet == "ZEXPORT_DATA_CDS") {
                                if (data.results.length != 0) {
                                    if (data.results[0].DocDate == "" || data.results[0].DocDate == "0.00" || data.results[0].DocDate == null) {
                                        that.getView().byId("idInvDate").setValue()
                                    } else {
                                        const InvoiceDate = new Date(data.results[0].DocDate);
                                        const InvoiceDate1 = `${InvoiceDate.getFullYear()}-${InvoiceDate.getMonth() + 1 < 10 ? '0' : ''}${InvoiceDate.getMonth() + 1}-${InvoiceDate.getDate() < 10 ? '0' : ''}${InvoiceDate.getDate()}`;
                                        that.getView().byId("idInvDate").setValue(InvoiceDate1)
                                    }
                                    if (data.results[0].Sbdate == "" || data.results[0].Sbdate == "0.00" || data.results[0].Sbdate == null) {
                                        that.getView().byId("ExportData_SbDate").setValue()
                                    } else {
                                        const ExportData_SbDate = new Date(data.results[0].Sbdate);
                                        const ExportData_SbDate1 = `${ExportData_SbDate.getFullYear()}-${ExportData_SbDate.getMonth() + 1 < 10 ? '0' : ''}${ExportData_SbDate.getMonth() + 1}-${ExportData_SbDate.getDate() < 10 ? '0' : ''}${ExportData_SbDate.getDate()}`;
                                        that.getView().byId("ExportData_SbDate").setValue(ExportData_SbDate1)
                                    }

                                    if (data.results[0].Leodate == "" || data.results[0].Leodate == "0.00" || data.results[0].Leodate == null) {
                                        that.getView().byId("ExportData_LeoDate").setValue()
                                    } else {
                                        const ExportData_LeoDate = new Date(data.results[0].Leodate);
                                        const ExportData_LeoDate1 = `${ExportData_LeoDate.getFullYear()}-${ExportData_LeoDate.getMonth() + 1 < 10 ? '0' : ''}${ExportData_LeoDate.getMonth() + 1}-${ExportData_LeoDate.getDate() < 10 ? '0' : ''}${ExportData_LeoDate.getDate()}`;
                                        that.getView().byId("ExportData_LeoDate").setValue(ExportData_LeoDate1)
                                    }

                                    if (data.results[0].Bldate == "" || data.results[0].Bldate == "0.00" || data.results[0].Bldate == null) {
                                        that.getView().byId("ExportData_BlDate").setValue()
                                    } else {
                                        const ExportData_BlDate = new Date(data.results[0].Bldate);
                                        const ExportData_BlDate1 = `${ExportData_BlDate.getFullYear()}-${ExportData_BlDate.getMonth() + 1 < 10 ? '0' : ''}${ExportData_BlDate.getMonth() + 1}-${ExportData_BlDate.getDate() < 10 ? '0' : ''}${ExportData_BlDate.getDate()}`;
                                        that.getView().byId("ExportData_BlDate").setValue(ExportData_BlDate1)
                                    }

                                    if (data.results[0].Sobdate == "" || data.results[0].Sobdate == "0.00" || data.results[0].Sobdate == null) {
                                        that.getView().byId("ExportData_SobDate").setValue()
                                    } else {
                                        const ExportData_SobDate = new Date(data.results[0].Sobdate);
                                        const ExportData_SobDate1 = `${ExportData_SobDate.getFullYear()}-${ExportData_SobDate.getMonth() + 1 < 10 ? '0' : ''}${ExportData_SobDate.getMonth() + 1}-${ExportData_SobDate.getDate() < 10 ? '0' : ''}${ExportData_SobDate.getDate()}`;
                                        that.getView().byId("ExportData_SobDate").setValue(ExportData_SobDate1)
                                    }
                                    that.getView().byId("ExportData_ShippingBillNo").setValue(data.results[0].Shippingbillno);
                                    that.getView().byId("ExportData_BlNumber").setValue(data.results[0].Blnumber);
                                    that.getView().byId("ExportData_ShippingLine").setValue(data.results[0].Shippingline);
                                    that.getView().byId("ExportData_Forwarder").setValue(data.results[0].Forwarder);
                                } else {

                                }
                            }
                            else if (entitySet == "Draft_Bl") {
                                var aNewArr = [];
                                var oTableModel = that.getView().getModel("oTableItemModel");
                                if (data.results.length != 0) {
                                    data.results.map(function (items) {
                                        var invObject = {
                                            "ItemNum": items.Litem,
                                            "DeliveryNumber": items.Deliveryno,
                                            "ContainerNumber": items.Containerno,
                                            "MaterialCode": items.Material,
                                            "MaterialDescription": items.Mdesp,
                                            "Lotno": items.Lot,
                                            "Fromorto": items.Fromto
                                        }
                                        aNewArr.push(invObject);
                                    })
                                    that.getView().getModel("oTableItemModel").setProperty("/aTableItem", aNewArr)
                                    that.getView().setModel(new sap.ui.model.json.JSONModel(data.results[0]), "oDetailModel")
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

                                            that.getView().getModel("oTableItemModel").setProperty("/aTableItem", aNewArr)
                                        }.bind(this)
                                    })
                                }
                            }
                            fetchedData.push(entitySet);
                            if (fetchedData.length === entitySets.length) {
                                oBusy.close();
                                console.log("All data fetched:", fetchedData);
                            }
                        },
                        error: function (error) {
                            oBusy.close();
                            console.error("Error fetching data from " + entitySet + ":", error);
                        }
                    });
                });
            },






            saveEximMultipleData: function () {
                var that = this;
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Saving Data",
                    text: "Please wait"
                });
                oBusyDialog.open();
                var oGeneralData = that.getView().getModel("oPayloadData");
                var oBuyerDataModel = that.getView().getModel("oBuyerPayload");
                var oCalculationModel = that.getView().getModel("oCalculationPayload");
                var DocType = that.getView().byId("idDocType").getValue();
                var sInput = that.getView().byId("idDoc").getValue();
                var oFilter = new sap.ui.model.Filter("Docno", "EQ", sInput);
                var oFilter2 = new sap.ui.model.Filter("Doctype", "EQ", DocType);
                // var checkBoxValue = that.getView().byId("idCheckBox").getSelected();

                var invoiceDate = that.getView().byId("idInvDate").getValue();
                var referenceDate = that.getView().byId("idReferenceDate").getValue();
                var performaInvoiceDate = that.getView().byId("idPerformaInvoiceDate").getValue();
                var deliveryDate = that.getView().byId("idDeliveryDate").getValue();
                var lrDate = that.getView().byId("idLrDate").getValue();
                var epcgDate = that.getView().byId("idEPCGDate").getValue();
                var shipmentDate = that.getView().byId("idShipmentDate").getValue();
                var bldate = that.getView().byId("idBlDate").getValue();

                if (invoiceDate == "") {
                    oGeneralData.getData().DocDate = null;
                } else {
                    var oDate = new Date(invoiceDate);
                    var newDate = new Date(oDate.getTime() - oDate.getTimezoneOffset() * 60000);
                    var newDate1 = newDate.toISOString().slice(0, 16);
                    oGeneralData.getData().DocDate = newDate1;
                }
                if (referenceDate == "") {
                    oGeneralData.getData().RefreanceDate = null;
                } else {
                    var oDate1 = new Date(referenceDate);
                    var referencedate = new Date(oDate1.getTime() - oDate1.getTimezoneOffset() * 60000);
                    var oReferenceDate = referencedate.toISOString().slice(0, 16);
                    oGeneralData.getData().RefreanceDate = oReferenceDate;
                }
                if (performaInvoiceDate == "") {
                    oGeneralData.getData().Peformadate = null;
                } else {
                    var oDate2 = new Date(performaInvoiceDate);
                    var performainvoicedate = new Date(oDate2.getTime() - oDate2.getTimezoneOffset() * 60000);
                    var oPerformaInvoiceDate = performainvoicedate.toISOString().slice(0, 16);
                    oGeneralData.getData().Peformadate = oPerformaInvoiceDate;
                }
                if (deliveryDate != "") {
                    var oDate3 = new Date(deliveryDate);
                    var deliverydate = new Date(oDate3.getTime() - oDate3.getTimezoneOffset() * 60000);
                    var oDeliveryDate = deliverydate.toISOString().slice(0, 16);
                    oGeneralData.getData().Deliverydate = oDeliveryDate;
                } else {
                    oGeneralData.getData().Deliverydate = null;
                }
                if (lrDate === "") {
                    var oLrDate = null
                    oGeneralData.getData().LrDate = oLrDate;
                } else {
                    var oDate4 = new Date(lrDate);
                    var lrdate = new Date(oDate4.getTime() - oDate4.getTimezoneOffset() * 60000);
                    var oLrDate = lrdate.toISOString().slice(0, 16);
                    oGeneralData.getData().LrDate = oLrDate;
                }

                if (epcgDate == "") {
                    oGeneralData.getData().Epcgdate = null;
                } else {
                    var oDate5 = new Date(epcgDate);
                    var epcgdate = new Date(oDate5.getTime() - oDate5.getTimezoneOffset() * 60000);
                    var oEpcgDate = epcgdate.toISOString().slice(0, 16);
                    oGeneralData.getData().Epcgdate = oEpcgDate;
                }
                if (shipmentDate == "") {
                    oGeneralData.getData().Shipmentdate = null;
                } else {
                    var oDate6 = new Date(shipmentDate);
                    var shipmentdate = new Date(oDate6.getTime() - oDate6.getTimezoneOffset() * 60000);
                    var oShipmentDate = shipmentdate.toISOString().slice(0, 16);
                    oGeneralData.getData().Shipmentdate = oShipmentDate;
                }
                if (bldate != "") {
                    oGeneralData.getData().Bldate = bldate
                } else {
                    oGeneralData.getData().Bldate = "";
                }


                var oFilter = new sap.ui.model.Filter("Docno", "EQ", sInput);
                var oFilter2 = new sap.ui.model.Filter("Doctype", "EQ", DocType);
                var fetchedData = [];

                //Buyer tab Data 
                var oBuyerDataModel = that.getView().getModel("oBuyerPayload");
                oBuyerDataModel.getData().Docno = that.getView().byId("idDoc").getValue();
                oBuyerDataModel.getData().Doctype = that.getView().byId("idDocType").getValue();


                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZEXIM_V2API")
                var entitySets = ["generaltab_", "YCONSIGNEDATA", "Zcalculation", "ZEXPORT_DATA_CDS", "Draft_Bl"];
                entitySets.forEach(function (entitySet) {
                    if (entitySet == "Draft_Bl") {
                        var oTableDataModel = that.getView().getModel("oTableItemModel").getProperty("/aTableItem");
                        var Doctype = that.getView().byId("idDocType").getValue();
                        var Docnum = that.getView().byId("idDoc").getValue();
                        var oFilter3 = new sap.ui.model.Filter("Docno", "EQ", Docnum)
                        var oFilter4 = new sap.ui.model.Filter("Doctype", "EQ", Doctype)
                        var Details = that.getView().byId("idDetails").getValue();
                        var aNewArr = [];
                        oTableDataModel.map(function (items, index, arr) {
                            var oFilter5 = new sap.ui.model.Filter("Litem", "EQ", items.ItemNum)
                            oModel.read("/Draft_Bl", {
                                filters: [oFilter3, oFilter4, oFilter5],
                                success: function (oresponse) {
                                    if (oresponse.results.length > 0) {
                                        var Doctype = that.getView().byId("idDocType").getValue();
                                        var Docnum = that.getView().byId("idDoc").getValue();
                                        var obj1 = {
                                            "Docno": Docnum,
                                            "Deliveryno": items.DeliveryNumber,
                                            "Containerno": items.ContainerNumber,
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
                                                if (index == arr.length - 1) {
                                                    fetchedData.push(entitySet);
                                                    if (fetchedData.length === entitySets.length) {
                                                        oBusyDialog.close();
                                                        MessageBox.success("Data Save Successfully")
                                                        // console.log("All data fetched:", fetchedData);
                                                    }
                                                }
                                            },
                                            error: function (e) {
                                                if (index == arr.length - 1) {
                                                    fetchedData.push(entitySet);
                                                    if (fetchedData.length === entitySets.length) {
                                                        oBusyDialog.close();
                                                        MessageBox.success("Data Save Successfully")
                                                        // console.log("All data fetched:", fetchedData);
                                                    }
                                                }
                                            }
                                        })
                                    } else {
                                        var Doctype = that.getView().byId("idDocType").getValue();
                                        var Docnum = that.getView().byId("idDoc").getValue();
                                        var obj = {
                                            "Docno": Docnum,
                                            "Deliveryno": items.DeliveryNumber,
                                            "Containerno": items.ContainerNumber,
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
                                                if (index == arr.length - 1) {
                                                    fetchedData.push(entitySet);
                                                    if (fetchedData.length === entitySets.length) {
                                                        oBusyDialog.close();
                                                        MessageBox.success("Data Save Successfully")
                                                        // console.log("All data fetched:", fetchedData);
                                                    }
                                                }
                                            },
                                            error: function (e) {
                                                if (index == arr.length - 1) {
                                                    fetchedData.push(entitySet);
                                                    if (fetchedData.length === entitySets.length) {
                                                        oBusyDialog.close();
                                                        MessageBox.success("Data Save Successfully")
                                                        // console.log("All data fetched:", fetchedData);
                                                    }
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        })
                        // fetchedData.push(entitySet);
                    }
                    else {
                        oModel.read("/" + entitySet, {
                            filters: [oFilter, oFilter2],
                            success: function (data) {
                                if (entitySet == "generaltab_") {
                                    var sInput = that.getView().byId("idDoc").getValue();
                                    var oGeneralData = that.getView().getModel("oPayloadData");
                                    if (data.results.length != 0) {
                                        oModel.update("/generaltab_(Docno='" + sInput + "',Doctype='" + oGeneralData.getData().Doctype + "')", oGeneralData.getData(), {
                                            success: function (data) {
                                                that.getView().getModel("oPayloadData").refresh(true);
                                            },
                                            error: function (e) {
                                            }
                                        });
                                    } else {
                                        oModel.create("/generaltab_", oGeneralData.getData(), {
                                            method: "POST",
                                            success: function (oresponse) {
                                                that.getView().getModel("oPayloadData").refresh(true);
                                            }.bind(this),
                                            error: function () {
                                            }
                                        })
                                    }
                                }
                                else if (entitySet == "YCONSIGNEDATA") {
                                    if (data.results.length === 0) {
                                        var oBuyerDataModel = that.getView().getModel("oBuyerPayload");
                                        oModel.create("/YCONSIGNEDATA", oBuyerDataModel.getData(), {
                                            method: "POST",
                                            success: function (oresponse) {
                                                that.getView().getModel("oBuyerPayload").refresh(true);
                                            }.bind(this),
                                            error: function () {
                                            }
                                        })
                                    } else {
                                        var sInput = that.getView().byId("idDoc").getValue();
                                        var oGeneralData = that.getView().getModel("oPayloadData");
                                        var oBuyerDataModel = that.getView().getModel("oBuyerPayload");
                                        oModel.update("/YCONSIGNEDATA(Docno='" + sInput + "',Doctype='" + oGeneralData.getData().Doctype + "')", oBuyerDataModel.getData(), {
                                            success: function (data) {
                                            },
                                            error: function (e) {
                                            }
                                        });
                                    }
                                }
                                else if (entitySet == "Zcalculation") {
                                    if (data.results.length === 0) {
                                        var oCalculationModel = that.getView().getModel("oCalculationPayload");
                                        oModel.create("/Zcalculation", oCalculationModel.getData(), {
                                            success: function () {
                                            }.bind(this),
                                            error: function () {
                                            }
                                        })
                                    } else {
                                        var sInput = that.getView().byId("idDoc").getValue();
                                        var GrandTotalAmount = that.getView().byId("idGrandTotalAmt").getValue();
                                        var oCalculationModel = that.getView().getModel("oCalculationPayload");
                                        if (GrandTotalAmount === "") {
                                            oCalculationModel.getData().Grandtotalamount = "0.00";
                                        } else {
                                            oCalculationModel.getData().Grandtotalamount = GrandTotalAmount;
                                        }
                                        oModel.update("/Zcalculation(Docno='" + sInput + "',Doctype='" + oCalculationModel.getData().Doctype + "')", oCalculationModel.getData(), {
                                            success: function () {
                                            }.bind(this),
                                            error: function (error) {
                                            }
                                        })
                                    }
                                }
                                // else if (entitySet == "Draft_Bl") {
                                //     if (data.results.length != 0) {

                                //     } else {

                                //     }
                                // }
                                else if (entitySet == "ZEXPORT_DATA_CDS") {
                                    var DocType = that.getView().byId("idDocType").getValue();
                                    var sInput = that.getView().byId("idDoc").getValue();
                                    if (that.getView().byId("idInvDate").getValue() != "") {
                                        var InvoiceDate = new Date(that.getView().byId("idInvDate").getValue());
                                        var InvoiceDate1 = new Date(InvoiceDate.getTime() - InvoiceDate.getTimezoneOffset() * 60000);
                                        var InvoiceDate2 = InvoiceDate1.toISOString().slice(0, 16);
                                    }

                                    if (that.getView().byId("ExportData_SbDate").getValue() != "") {
                                        var ExportData_SbDate = new Date(that.getView().byId("ExportData_SbDate").getValue());
                                        var ExportData_SbDate1 = new Date(ExportData_SbDate.getTime() - ExportData_SbDate.getTimezoneOffset() * 60000);
                                        var ExportData_SbDate2 = ExportData_SbDate1.toISOString().slice(0, 16);
                                    }

                                    if (that.getView().byId("ExportData_LeoDate").getValue() != "") {
                                        var ExportData_LeoDate = new Date(that.getView().byId("ExportData_LeoDate").getValue());
                                        var ExportData_LeoDate1 = new Date(ExportData_LeoDate.getTime() - ExportData_LeoDate.getTimezoneOffset() * 60000);
                                        var ExportData_LeoDate2 = ExportData_LeoDate1.toISOString().slice(0, 16);
                                    }

                                    if (that.getView().byId("ExportData_BlDate").getValue() != "") {
                                        var ExportData_BlDate = new Date(that.getView().byId("ExportData_BlDate").getValue());
                                        var ExportData_BlDate1 = new Date(ExportData_BlDate.getTime() - ExportData_BlDate.getTimezoneOffset() * 60000);
                                        var ExportData_BlDate2 = ExportData_BlDate1.toISOString().slice(0, 16);
                                    }

                                    if (that.getView().byId("ExportData_SobDate").getValue() != "") {
                                        var ExportData_SobDate = new Date(that.getView().byId("ExportData_SobDate").getValue());
                                        var ExportData_SobDate1 = new Date(ExportData_SobDate.getTime() - ExportData_SobDate.getTimezoneOffset() * 60000);
                                        var ExportData_SobDate2 = ExportData_SobDate1.toISOString().slice(0, 16);
                                    }
                                    var ExportData_OBJECT = {
                                        "Docno": that.getView().byId("idDoc").getValue(),
                                        "Doctype": that.getView().byId("idDocType").getValue(),
                                        "DocDate": that.getView().byId("idInvDate").getValue() == "" ? null : InvoiceDate2,
                                        "Shippingbillno": that.getView().byId("ExportData_ShippingBillNo").getValue(),
                                        "Sbdate": that.getView().byId("ExportData_SbDate").getValue() == "" ? null : ExportData_SbDate2,
                                        "Leodate": that.getView().byId("ExportData_LeoDate").getValue() == "" ? null : ExportData_LeoDate2,
                                        "Blnumber": that.getView().byId("ExportData_BlNumber").getValue(),
                                        "Bldate": that.getView().byId("ExportData_BlDate").getValue() == "" ? null : ExportData_BlDate2,
                                        "Sobdate": that.getView().byId("ExportData_SobDate").getValue() == "" ? null : ExportData_SobDate2,
                                        "Shippingline": that.getView().byId("ExportData_ShippingLine").getValue(),
                                        "Forwarder": that.getView().byId("ExportData_Forwarder").getValue(),
                                    }

                                    if (data.results.length != 0) {
                                        oModel.update("/ZEXPORT_DATA_CDS(Docno='" + sInput + "',Doctype='" + DocType + "')", ExportData_OBJECT, {
                                            success: function () {
                                            }.bind(this),
                                            error: function (error) {
                                            }
                                        })
                                    } else {
                                        oModel.create("/ZEXPORT_DATA_CDS", ExportData_OBJECT, {
                                            success: function () {
                                            }.bind(this),
                                            error: function () {
                                            }
                                        })

                                    }
                                }
                                fetchedData.push(entitySet);
                                if (fetchedData.length === entitySets.length) {
                                    oBusyDialog.close();
                                    MessageBox.success("Data Save Successfully")
                                    // console.log("All data fetched:", fetchedData);
                                }
                            },
                            error: function (error) {
                                oBusyDialog.close();
                                MessageBox.error("Error fetching data from " + entitySet + ":", error);
                            }
                        });
                    }
                });
            },
            changeDesignationACAuthorized: function(oEvent){
                var val = oEvent.mParameters.value;
                if(val == "Maneesh Gupta"){this.getView().byId("Designation_ComboBox").setValue("Ast. Manager")}
                else if(val == "Anant Pareek"){this.getView().byId("Designation_ComboBox").setValue("")}
                else if(val == "Mahesh Bihani Ji"){this.getView().byId("Designation_ComboBox").setValue("")}
                else if(val == "Anil Jhanwar"){this.getView().byId("Designation_ComboBox").setValue("Dypt. Manager")}
            },



            
        });
    });

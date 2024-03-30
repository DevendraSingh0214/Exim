sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageBox",
    'sap/m/p13n/Engine',
    'sap/m/p13n/SelectionController',
    'sap/m/p13n/MetadataHelper',
    'sap/m/table/ColumnWidthController'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, MessageBox, Engine, SelectionController, MetadataHelper, ColumnWidthController) {
        "use strict";
        return Controller.extend("zexim.controller.DrawBackReport", {
            onInit: function () {
                this._registerForP13n();
                this.getView().setModel(new sap.ui.model.json.JSONModel, "oTableDataModel");
                this.getView().getModel("oTableDataModel").setProperty("/aTableData", []);
            },
            GetTableData: function () {
                var that = this;
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZDRAW_BACK_SER_BINDING")
                var aNewArr = that.getView().getModel("oTableDataModel").getProperty("/aTableData");
                oModel.read("/ZDRAW_BACK_REPORT_CDS", {
                    urlParameters: {
                        "$top": "5000"
                    },
                    success: function (oresponse) {
                        oresponse.results.map(function (items) {

                            var obj = {
                                "InvoiceNumber": items.InvoiceNumber,
                                // "InvoiceDate": items.InvoiceDate,
                                "SBNumber": items.SbNo,
                                // "SBDate": items.SbDate,
                                // "Fob": items.FobValue,
                                "Forwarder": items.Forwarder,
                                "BlNo": items.BlNo,
                                "ContainerNumber": items.ContainerNumber,
                                "HScode": items.HsnCode,
                                // "NetWt": items.Totalnetqty,
                                "DBKSrl": items.DbkSrl,
                                // "DBK_Percentage": items.Dbkper,
                                // "DBKCap": items.DbkCap,
                                "DBK_Percentage_Amount": Number(items.FobValue) * Number(items.Dbkper),
                                "DBK_Cab_Amount": Number(items.Totalnetqty) * Number(items.DbkCap),
                                "FinalDBKValue": (Number(items.FobValue) * Number(items.Dbkper)) < (Number(items.Totalnetqty) * Number(items.DbkCap)) ? Number(items.FobValue) * Number(items.Dbkper) : Number(items.Totalnetqty) * Number(items.DbkCap),
                            }
                            if (items.FobValue == "" ) {
                                obj["Fob"] = "";
                            } else {
                                obj["Fob"] = items.FobValue;
                            }
                            if (items.Dbkper == "" ) {
                                obj["DBK_Percentage"] = "";
                            } else {
                                obj["DBK_Percentage"] = items.Dbkper;
                            }
                            if (items.DbkCap == "" ) {
                                obj["DBKCap"] = "";
                            } else {
                                obj["DBKCap"] = items.DbkCap;
                            }
                            if (items.Totalnetqty == "" ) {
                                obj["NetWt"] = "";
                            } else {
                                obj["NetWt"] = items.Totalnetqty;
                            }

                            // if ((items.FobValue != "") && (items.Dbkper != "" )) {
                            //     obj["DBK_Percentage_Amount"] = Number(items.FobValue) * Number(items.Dbkper);
                            // } else {
                            //     obj["DBK_Percentage_Amount"] = "";
                            // }
                            // if ((items.DbkCap != "" || items.DbkCap != "0.00" || items.DbkCap != null) && (items.Totalnetqty != "" || items.Totalnetqty != "0.00" || items.Totalnetqty != null)) {
                            //     obj["DBK_Cab_Amount"] = Number(items.Totalnetqty) * Number(items.DbkCap);
                            // } else {
                            //     obj["DBK_Cab_Amount"] = "";
                            // }
                            // if (items.FobValue != "" && items.Dbkper != "" && items.DbkCap != "" && items.Totalnetqty != "") {
                            //     obj["FinalDBKValue"] = "";
                            // } else {
                            //     obj["FinalDBKValue"] = Number(items.FobValue) * Number(items.Dbkper) > Number(items.Totalnetqty) * Number(items.DbkCap) ? Number(items.FobValue) * Number(items.Dbkper) : Number(items.Totalnetqty) * Number(items.DbkCap);
                            // }
                            if (items.InvoiceDate == "" || items.InvoiceDate == "0.00" || items.InvoiceDate == null) {
                                obj["InvoiceDate"] = "";
                            } else {
                                const InvoiceDate = new Date(items.InvoiceDate);
                                const InvoiceDate1 = `${InvoiceDate.getFullYear()}-${InvoiceDate.getMonth() + 1 < 10 ? '0' : ''}${InvoiceDate.getMonth() + 1}-${InvoiceDate.getDate() < 10 ? '0' : ''}${InvoiceDate.getDate()}`;
                                obj["InvoiceDate"] = InvoiceDate1;
                            }
                            if (items.SbDate == "" || items.SbDate == "0.00" || items.SbDate == null) {
                                obj["SBDate"] = "";
                            } else {
                                const SbDate = new Date(items.SbDate);
                                const SbDate1 = `${SbDate.getFullYear()}-${SbDate.getMonth() + 1 < 10 ? '0' : ''}${SbDate.getMonth() + 1}-${SbDate.getDate() < 10 ? '0' : ''}${SbDate.getDate()}`;
                                obj["SBDate"] = SbDate1;
                            }
                            aNewArr.push(obj)
                        })
                        that.getView().getModel("oTableDataModel").setProperty("/aTableData", aNewArr);
                    }.bind(this)
                })
            },






            _registerForP13n: function () {
                const oTable = this.byId("FirstTable");
                this.oMetadataHelper = new MetadataHelper([
                    {
                        key: "TDSBase_col",
                        label: "TDS Base",
                        path: "TDSBase"
                    }
                ]);

                this._mIntialWidth = {
                    "SRN_col": "11rem",
                };

                Engine.getInstance().register(oTable, {
                    helper: this.oMetadataHelper,
                    controller: {
                        Columns: new SelectionController({
                            targetAggregation: "columns",
                            control: oTable
                        }),
                        ColumnWidth: new ColumnWidthController({
                            control: oTable
                        })
                    }
                });

                Engine.getInstance().attachStateChange(this.handleStateChange.bind(this));
            },
            openPersoDialog: function (oEvt) {
                const oTable = this.byId("FirstTable");

                Engine.getInstance().show(oTable, ["Columns"], {
                    contentHeight: "35rem",
                    contentWidth: "32rem",
                    source: oEvt.getSource()
                });
            },
            handleStateChange: function (oEvt) {
                const oTable = this.byId("FirstTable");
                const oState = oEvt.getParameter("state");
                if (!oState) {
                    return;
                }
                oTable.getColumns().forEach(function (oColumn) {
                    const sKey = this.getView().getLocalId(oColumn.getId());
                    const sColumnWidth = oState.ColumnWidth[sKey];
                    oColumn.setWidth(sColumnWidth || this._mIntialWidth[sKey]);
                    oColumn.setVisible(false);
                }.bind(this));

                oState.Columns.forEach(function (oProp, iIndex) {
                    const oCol = this.byId(oProp.key);
                    oCol.setVisible(true);
                    oTable.removeColumn(oCol);
                    oTable.insertColumn(oCol, iIndex);
                }.bind(this));
            },
        });
    });

jQuery.sap.require("test.resources.utils.utility");

/**
 * First Application View - this is the application's starting point. It builds the application window.   
 */
sap.ui.jsview("test.resources.newView1", {

      getControllerName : function() {
         return "test.resources.newView1";
    	 
      },
      
      createContent : function(oController) {
		var oShell = this.createShell();
       	oShell.addContent(this.createFlightTable());	
       	return oShell;
       	
      },

      createShell:function(oController){
      
    	  var oShell = sap.ui.ux3.Shell("ID_FlightShell",{
    	      appIcon: "images/SAPLogo.gif",
    		  appTitle: oBundle.getText("APP_TITLE"),
    		  showLogoutButton:false,
    		  showSearchTool: false,
    		  showInspectorTool: false,
    		  showFeederTool: false,
    		  worksetItems: [new sap.ui.ux3.NavigationItem("navItemList",{key: "FlightList",text:oBundle.getText("WORKSET_TITLE")})]
    	  });
    	  return oShell;
      },
      
      /**
	 * Returns a table with the required columns, each column is bound for a specific odata service property   
	 * @returns {sap.ui.table.Table}
	 */
      createFlightTable:function(){
      
    	var oTable = new sap.ui.table.Table("ID_FlightTable", {
    		visibleRowCount  : 20,
  			selectionMode: sap.ui.table.SelectionMode.None
  		});
    	
 
     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("FLIGHT_CARRID")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "carrid"),
			sortProperty: "carrid",
			filterProperty: "carrid"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("FLIGHT_CONNID")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "connid"),
			sortProperty: "connid",
			filterProperty: "connid"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("FLIGHT_FLDATE")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "fldate",new sap.ui.model.type.DateTime({style: "medium"})),
			sortProperty: "fldate",
			filterProperty: "fldate"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("FLIGHT_PRICE")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "PRICE"),
			sortProperty: "PRICE",
			filterProperty: "PRICE"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("FLIGHT_CURRENCY")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "CURRENCY"),
			filterProperty: "CURRENCY"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("FLIGHT_PLANETYPE")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "PLANETYPE"),
			sortProperty: "PLANETYPE",
			filterProperty: "PLANETYPE"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("FLIGHT_SEATSMAX")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "SEATSMAX"),
			sortProperty: "SEATSMAX",
			filterProperty: "SEATSMAX"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("FLIGHT_SEATSOCC")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "SEATSOCC"),
			sortProperty: "SEATSOCC",
			filterProperty: "SEATSOCC"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("FLIGHT_PAYMENTSUM")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "PAYMENTSUM"),
			sortProperty: "PAYMENTSUM",
			filterProperty: "PAYMENTSUM"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("FLIGHT_SEATSMAX_B")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "SEATSMAX_B"),
			sortProperty: "SEATSMAX_B",
			filterProperty: "SEATSMAX_B"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("FLIGHT_SEATSOCC_B")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "SEATSOCC_B"),
			sortProperty: "SEATSOCC_B",
			filterProperty: "SEATSOCC_B"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("FLIGHT_SEATSMAX_F")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "SEATSMAX_F"),
			sortProperty: "SEATSMAX_F",
			filterProperty: "SEATSMAX_F"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("FLIGHT_SEATSOCC_F")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "SEATSOCC_F"),
			sortProperty: "SEATSOCC_F",
			filterProperty: "SEATSOCC_F"
 		}));
 		return oTable;   		
      }
      
});

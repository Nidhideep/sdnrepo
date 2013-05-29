/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */

jQuery.sap.declare("sap.me.TabContainerRenderer");

/**
 * @class TabContainer renderer.
 * @static
 */
sap.me.TabContainerRenderer = {};

/**
 * Renders the HTML for the given control, using the provided
 * {@link sap.ui.core.RenderManager}.
 * 
 * @param {sap.ui.core.RenderManager}
 *            oRm the RenderManager that can be used for writing to the render
 *            output buffer
 * @param {sap.ui.core.Control}
 *            oControl an object representation of the control that should be
 *            rendered
 */
sap.me.TabContainerRenderer.render = function(oRm, oControl) {
	// Return immediately if control is invisible
	if (!oControl.getVisible()) {
		return;
	}
	// write the HTML into the render manager
	oRm.write("<div");
	oRm.writeControlData(oControl);
	oRm.addClass("sapUIMeTabContainer");
	oRm.writeClasses();
	oRm.writeStyles();
	oRm.write(">");
	// Buttons
	oRm.write("<div ");
	oRm.addClass("sapUIMeTabContainerButtons");
	oRm.writeClasses();
	oRm.write(">");
	var btn = oControl.getAggregation("tabs");
	var badges = oControl.getAggregation("badges");
	if (btn) {
		if (jQuery.isArray(btn)) {
			for ( var i = 0; i < btn.length; i++) {
				var sTabName = btn[i].getCustomData();
				if (oControl._getContentForBtn(btn[i].getId())) { // render button just for tab with content
					oRm.write("<div ");
					oRm.addClass("sapUIMeTabContainerTab");
					oRm.writeClasses();
					oRm.write(">");
					if( badges && badges[i].getText() != ""){
						oRm.renderControl(badges[i]);
					}
					oRm.renderControl(btn[i]);
					oRm.write("</div>");
				}
			}
		} else if (btn) {
			oRm.write("<div ");
			oRm.addClass("sapUIMeTabContainerTab");
			oRm.writeClasses();
			oRm.write(">");
			if( badges && badges[0].getText() != ""){
				oRm.renderControl(badges[0]);
			}
			oRm.renderControl(btn);
			oRm.write("</div>");
		}
	}
	oRm.write("</div>");
	// Content
	var iIndex = oControl.getSelectedTab();
	var oContent = oControl._getContentForBtn(btn[iIndex].getId());
	if (oContent != undefined) {
		oRm.write("<div ");
		oRm.addClass("sapUIMeTabContainerContent");
		oRm.writeClasses();
		oRm.write(">");
		oRm.write("<div id='" + oControl.getId() + "-arrow'");
		oRm.addClass("sapUIMeTabContainerContentArrow");
		oRm.writeClasses();
		oRm.write(">");
		oRm.write("</div>");
		oRm.write("<div id='" + oControl.getId() + "-container'");
		oRm.write(" style='height:auto'");
		oRm.addClass("sapUIMeTabContainerTabContent");
		oRm.writeClasses();
		oRm.write(">");
		oRm.renderControl(oContent);
		oRm.write("</div>");
		oRm.write("</div>");
	}
	oRm.write("</div>");
};

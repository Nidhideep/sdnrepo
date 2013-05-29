/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.suite.ui.commons.NoteTakerFeederRenderer");sap.suite.ui.commons.NoteTakerFeederRenderer={};
sap.suite.ui.commons.NoteTakerFeederRenderer.render=function(r,c){r.write("<div");r.writeControlData(c);r.addClass("sapSuiteUiCommonsNoteTakerFeeder");r.writeClasses();r.writeAttribute("tabindex","0");r.writeAccessibilityState(c,{role:'region',describedby:c.getId()+"-header"});r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-header");r.addClass("sapSuiteUiCommonsNoteTakerFeederHeader");r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-header-text");r.writeAccessibilityState(c,{role:'heading'});r.write(">");r.writeEscaped(c._rb.getText("NOTETAKERFEEDER_TITLE"));r.write("</div>");r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-tag-panel");r.addClass("sapSuiteUiCommonsNoteTakerFeederTagPanel");r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-left-toolbar");r.addClass("sapSuiteUiCommonsNoteTakerFeederLeftPanel");r.writeClasses();r.write(">");r.renderControl(c._oTagButton);r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-right-toolbar");r.addClass("sapSuiteUiCommonsNoteTakerFeederRightPanel");r.writeClasses();r.write(">");r.renderControl(c._oThumbUpButton);r.renderControl(c._oThumbDownButton);r.renderControl(c._oAddAttachButton);r.renderControl(c._oFileUploader);r.write("</div>");r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-attachment-panel");r.addClass("sapSuiteUiCommonsNoteTakerFeederAttachmentPanel");r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-attachment-content");r.addClass("sapSuiteUiCommonsNoteTakerFeederAttachmentContent");r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-attachment-name");r.addClass("sapSuiteUiCommonsNtfAttachmentNamelbl");r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-attachment-image");r.addClass("sapSuiteUiCommonsNtfAttachImg");r.writeClasses();r.write("/>");r.renderControl(c._oAttachmentLink);r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-attachment-loading");r.addClass("sapSuiteUiCommonsNtfLoadingLbl");r.writeClasses();r.write(">");r.renderControl(c._oAttachmentLoadingLabel);r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-attachment-delete");r.addClass("sapSuiteUiCommonsNtfDeleteBtn");r.writeClasses();r.write(">");r.renderControl(c._oDeleteAttachButton);r.write("</div>");r.write("</div>");r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-title-panel");r.addClass("sapSuiteUiCommonsNoteTakerFeederTitlePanel");r.writeClasses();r.write(">");r.renderControl(c._oTitle);r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-body");if(c._oAddAttachButton.getEnabled()){r.addClass("sapSuiteUiCommonsNoteTakerFeederBody")}else{r.addClass("sapSuiteUiCommonsNoteTakerFeederBodySmaller")}r.writeClasses();r.write(">");r.renderControl(c._oBody);r.write("</div>");r.renderControl(c._oAddButton);r.write("<div");r.writeAttribute("id",c.getId()+"-selectTag-panel");r.addClass("sapSuiteUiCommonsNoteTakerFeederSelectTagPanel");r.addClass("sapUiShd");r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-selectTag-arrow");r.addClass("sapSuiteUiCommonsNoteTakerFeederSelectTagArrow");r.writeClasses();r.write(">");r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-selectTag-header");r.addClass("sapSuiteUiCommonsNoteTakerFeederSelectTagHeader");r.writeClasses();r.write(">");r.writeEscaped(c._rb.getText("NOTETAKERFEEDER_TOOLPOPUP_TITLE"));r.write("</div>");r.write("<div>");r.renderControl(c._oTagInput);r.write("</div>");r.write("<div>");r.renderControl(c._oTagList);r.write("</div>");r.write("<div");r.addClass("sapSuiteUiCommonsNoteTakerFeederSelectTagButtons");r.writeClasses();r.write(">");r.renderControl(c._oAddTagButton);r.renderControl(c._oCancelTagButton);r.write("</div>");r.write("</div>");r.write("</div>")};

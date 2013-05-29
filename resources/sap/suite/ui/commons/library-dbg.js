/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */

/* -----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying
 * source files only (*.type, *.js) or they will be lost after the next generation.
 * ----------------------------------------------------------------------------------- */

/**
 * Initialization Code and shared classes of library sap.suite.ui.commons (1.12.1)
 */
jQuery.sap.declare("sap.suite.ui.commons.library");
jQuery.sap.require("sap.ui.core.Core");
/**
 * SAP UI library: sap.suite.ui.commons
 *
 * @namespace
 * @name sap.suite.ui.commons
 * @public
 */


// library dependencies
jQuery.sap.require("sap.ui.core.library");
jQuery.sap.require("sap.ui.commons.library");

// delegate further initialization of this library to the Core
sap.ui.getCore().initLibrary({
  name : "sap.suite.ui.commons",
  dependencies : ["sap.ui.core","sap.ui.commons"],
  types: [],
  interfaces: [],
  controls: [
    "sap.suite.ui.commons.DateRangeScroller",
    "sap.suite.ui.commons.DateRangeSlider",
    "sap.suite.ui.commons.DateRangeSliderInternal",
    "sap.suite.ui.commons.NoteTaker",
    "sap.suite.ui.commons.NoteTakerCard",
    "sap.suite.ui.commons.NoteTakerFeeder",
    "sap.suite.ui.commons.SplitButton"
  ],
  elements: [],
  version: "1.12.1"});


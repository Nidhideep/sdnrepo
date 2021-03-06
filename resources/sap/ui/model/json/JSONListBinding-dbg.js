/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */

// Provides the JSON model implementation of a list binding
jQuery.sap.declare("sap.ui.model.json.JSONListBinding");
jQuery.sap.require("sap.ui.model.ListBinding");
jQuery.sap.require("sap.ui.model.ChangeReason");


/**
 *
 * @class
 * List binding implementation for JSON format
 *
 * @param sPath
 * @param [oModel]
 * @name sap.ui.model.json.JSONListBinding
 * @extends sap.ui.model.ListBinding
 */
sap.ui.model.ListBinding.extend("sap.ui.model.json.JSONListBinding", /** @lends sap.ui.model.json.JSONListBinding */ {
	
	constructor : function(oModel, sPath, oContext, oSorter, aFilters, mParameters){
		sap.ui.model.ListBinding.apply(this, arguments);
		this.update();
	},

	metadata : {
	  publicMethods : [
			"getLength"
	  ]
	}
	
});

/**
 * Creates a new subclass of class sap.ui.model.json.JSONListBinding with name <code>sClassName</code> 
 * and enriches it with the information contained in <code>oClassInfo</code>.
 * 
 * For a detailed description of <code>oClassInfo</code> or <code>FNMetaImpl</code> 
 * see {@link sap.ui.base.Object.extend Object.extend}.
 *   
 * @param {string} sClassName name of the class to be created
 * @param {object} [oClassInfo] object literal with informations about the class  
 * @param {function} [FNMetaImpl] alternative constructor for a metadata object
 * @return {function} the created class / constructor function
 * @public
 * @static
 * @name sap.ui.model.json.JSONListBinding.extend
 * @function
 */


/**
 * Return contexts for the list or a specified subset of contexts
 * @param {int} [iStartIndex=0] the startIndex where to start the retrieval of contexts
 * @param {int} [iLength=length of the list] determines how many contexts to retrieve beginning from the start index.
 * Default is the whole list length.
 *
 * @return {Array} the contexts array
 * @protected
 */
sap.ui.model.json.JSONListBinding.prototype.getContexts = function(iStartIndex, iLength) {
	this.iLastStartIndex = iStartIndex;
	this.iLastLength = iLength;
	
	if (!iStartIndex) {
		iStartIndex = 0;
	}
	if (!iLength) {
		iLength = Math.min(this.iLength, this.oModel.iSizeLimit);
	}

	var aContexts = this._getContexts(iStartIndex, iLength),
		oContextData = {};
	
	for (var i = 0; i < aContexts.length; i++) {
		oContextData[aContexts[i].getPath()] = aContexts[i].getObject();
	}
	
	//Check diff
	if (this.bUseExtendedChangeDetection && this.aLastContexts && iStartIndex < this.iLastEndIndex) {
		var that = this;
		var aDiff = jQuery.sap.arrayDiff(this.aLastContexts, aContexts, function(oOldContext, oNewContext) {
			return jQuery.sap.equal(
					oOldContext && that.oLastContextData && that.oLastContextData[oOldContext.getPath()],
					oNewContext && oContextData && oContextData[oNewContext.getPath()]
				);
		});
		aContexts.diff = aDiff;
	}

	this.iLastEndIndex = iStartIndex + iLength;
	this.aLastContexts = aContexts.slice(0);
	this.oLastContextData = jQuery.extend(true, {}, oContextData);
	return aContexts;
};

/**
 * Return contexts for the list or a specified subset of contexts
 * @param {int} [iStartIndex=0] the startIndex where to start the retrieval of contexts
 * @param {int} [iLength=length of the list] determines how many contexts to retrieve beginning from the start index.
 * Default is the whole list length.
 *
 * @return {Array} the contexts array
 * @private
 */
sap.ui.model.json.JSONListBinding.prototype._getContexts = function(iStartIndex, iLength) {
	if (!iStartIndex) {
		iStartIndex = 0;
	}
	if (!iLength) {
		iLength = Math.min(this.iLength, this.oModel.iSizeLimit);
	}
	
	var iEndIndex = Math.min(iStartIndex + iLength, this.aIndices.length),
	oContext,
	aContexts = [],
	sPrefix = this.oModel.resolve(this.sPath, this.oContext) + "/";

	for (var i = iStartIndex; i < iEndIndex; i++) {
		oContext = this.oModel.getContext(sPrefix + this.aIndices[i]);
		aContexts.push(oContext);
	}
	
	return aContexts;
};

/**
 * Setter for context
 * @param {Object} oContext the new context object
 */
sap.ui.model.json.JSONListBinding.prototype.setContext = function(oContext) {
	if (this.oContext != oContext) {
		this.oContext = oContext;
		this.update();
		this._fireChange({reason: sap.ui.model.ChangeReason.Context});
	}
};

/**
 * Return the length of the list
 *
 * @return {int} the length
 * @protected
 */
sap.ui.model.json.JSONListBinding.prototype.getLength = function() {
	return this.iLength;
};

/**
 * Return the length of the list
 *
 * @return {int} the length
 */
sap.ui.model.json.JSONListBinding.prototype._getLength = function() {
	return this.aIndices.length;
};


/**
 * Update the list, indices array and apply sorting and filtering
 * @private
 */
sap.ui.model.json.JSONListBinding.prototype.update = function(){
	var oList = this.oModel._getObject(this.sPath, this.oContext);
	if (oList && jQuery.isArray(oList)) {
		if (this.bUseExtendedChangeDetection) {
			this.oList = jQuery.extend(true, [], oList);
		} else {
			this.oList = oList.slice(0);
		}
		this.updateIndices();
		this.applyFilter();
		this.applySort();
		this.iLength = this._getLength();
	}
	else {
		this.oList = null;
		this.aIndices = [];
		this.iLength = 0;
	}
};

/**
 * Check whether this Binding would provide new values and in case it changed,
 * inform interested parties about this.
 * 
 * @param {boolean} bForceupdate
 * 
 */
sap.ui.model.json.JSONListBinding.prototype.checkUpdate = function(bForceupdate){
	if (!this.bUseExtendedChangeDetection) {
		var oList = this.oModel._getObject(this.sPath, this.oContext);
		if (!jQuery.sap.equal(this.oList, oList) || bForceupdate) {
			this.update();
			this._fireChange({reason: sap.ui.model.ChangeReason.Change});
		}
	} else {
		var bChangeDetected = false;
		var that = this;
		
		//If the list has changed we need to update the indices first
		var oList = this.oModel._getObject(this.sPath, this.oContext);
		if (!jQuery.sap.equal(this.oList, oList)) {
			this.update();
		}
		
		//Get contexts for visible area and compare with stored contexts
		var aContexts = this._getContexts(this.iLastStartIndex, this.iLastLength);
		if (this.aLastContexts) {
			if (this.aLastContexts.length != aContexts.length) {
				bChangeDetected = true;
			} else {
				jQuery.each(this.aLastContexts, function(iIndex, oContext) {
					if (!jQuery.sap.equal(aContexts[iIndex].getObject(), that.oLastContextData[oContext.getPath()])) {
						bChangeDetected = true;
						return false;
					}
				});
			}
		} else {
			bChangeDetected = true;
		}
		if (bChangeDetected || bForceupdate) {
			this._fireChange({reason: sap.ui.model.ChangeReason.Change});
		}
	}
};

/**
 * Get indices of the list
 */
sap.ui.model.json.JSONListBinding.prototype.updateIndices = function(){
	this.aIndices = [];
	for (var i = 0; i < this.oList.length; i++) {
		this.aIndices.push(i);
	}

};

/**
 * @see sap.ui.model.ListBinding.prototype.sort
 *
 */
sap.ui.model.json.JSONListBinding.prototype.sort = function(oSorter){
	if (!oSorter) {
		this.oSorter = null;
		this.updateIndices();
		this.applyFilter();
	} else {
		this.oSorter = oSorter;
		this.applySort();
	}
	this._fireChange({reason: sap.ui.model.ChangeReason.Sort});
	// TODO remove this if the sorter event gets removed which is deprecated
	this._fireSort({sorter: oSorter}); 
	return this;
};

/**
 * Sorts the list
 * @private
 */
sap.ui.model.json.JSONListBinding.prototype.applySort = function(){
	if (!this.oSorter) {
		return;
	}
	var that = this,
		aSortValues = [],
		oValue,
		fnCompare = this.oSorter.fnCompare;
	if (!fnCompare) {
		fnCompare = function(a, b) {
			if (b == null) {
				return -1;
			}
			if (a == null) {
				return 1;
			}
			if (typeof a == "string" && typeof b == "string") {
				return a.localeCompare(b);
			}
			if (a < b) {
				return -1;
			}
			if (a > b) {
				return 1;
			}
			return 0;
		}
	}
	jQuery.each(this.aIndices, function(i, iIndex) {
		oValue = that.oModel._getObject(that.oSorter.sPath, that.oList[iIndex]);
		if (typeof oValue == "string") {
			oValue = oValue.toLocaleUpperCase();
		}
		aSortValues[iIndex] = oValue;
	});
	this.aIndices.sort(function(a, b) {
		var valueA = aSortValues[a],
			valueB = aSortValues[b],
			returnValue = fnCompare(valueA, valueB);
		if (that.oSorter.bDescending) {
			returnValue = -returnValue;
		}
		return returnValue;
	});
};

/**
 * Filters the list.
 * 
 * Filters are first grouped according to their binding path.
 * All filters belonging to a group are ORed and after that the
 * results of all groups are ANDed.
 * Usually this means, all filters applied to a single table column
 * are ORed, while filters on different table columns are ANDed.
 * 
 * @param {sap.ui.model.Filter[]} aFilters Array of filter objects
 * @return {sap.ui.model.ListBinding} returns <code>this</code> to facilitate method chaining 
 * 
 * @public
 */
sap.ui.model.json.JSONListBinding.prototype.filter = function(aFilters){
	this.updateIndices();
	if (!aFilters || !jQuery.isArray(aFilters) || aFilters.length == 0) {
		this.aFilters = null;
		this.iLength = this._getLength();
	} else {
		this.aFilters = aFilters;
		this.applyFilter();
	}
	this.applySort();
	this._fireChange({reason: sap.ui.model.ChangeReason.Filter});
	// TODO remove this if the filter event gets removed which is deprecated
	this._fireFilter({filters: aFilters}); 
	return this;
};

/**
 * Filters the list
 * Filters are first grouped according to their binding path.
 * All filters belonging to a group are ORed and after that the
 * results of all groups are ANDed.
 * Usually this means, all filters applied to a single table column
 * are ORed, while filters on different table columns are ANDed.
 *
 * @private
 */
sap.ui.model.json.JSONListBinding.prototype.applyFilter = function(){
	if (!this.aFilters) {
		return;
	}
	var that = this,
		oFilterGroups = {},
		aFilterGroup,
		aFiltered = [],
		bGroupFiltered = false,
		bFiltered = true;
	jQuery.each(this.aIndices, function(i, iIndex) {
		bFiltered = true;
		jQuery.each(that.aFilters, function(j, oFilter) {
			aFilterGroup = oFilterGroups[oFilter.sPath];
			if (!aFilterGroup) {
				aFilterGroup = oFilterGroups[oFilter.sPath] = [];
			}
			aFilterGroup.push(oFilter);
		});
		jQuery.each(oFilterGroups, function(sPath, aFilterGroup) {
			var oValue = that.oModel._getObject(sPath, that.oList[iIndex]);
			if (typeof oValue == "string") {
				oValue = oValue.toUpperCase();
			}
			bGroupFiltered = false;
			jQuery.each(aFilterGroup, function(j, oFilter) {
				var fnTest = that.getFilterFunction(oFilter);
				if (oValue != undefined && fnTest(oValue)) {
					bGroupFiltered = true;
					return false;
				}
			});
			if (!bGroupFiltered) {
				bFiltered = false;
				return false;
			}
		});
		if (bFiltered) {
			aFiltered.push(iIndex);
		}
	});
	this.aIndices = aFiltered;
	this.iLength = aFiltered.length;
};

/**
 * Provides a JS filter function for the given filter
 */
sap.ui.model.json.JSONListBinding.prototype.getFilterFunction = function(oFilter){
	if (oFilter.fnTest) {
		return oFilter.fnTest;
	}
	var oValue1 = oFilter.oValue1,
		oValue2 = oFilter.oValue2;
	if (typeof oValue1 == "string") {
		oValue1 = oValue1.toUpperCase();
	}
	if (typeof oValue2 == "string") {
		oValue2 = oValue2.toUpperCase();
	}
	switch (oFilter.sOperator) {
		case "EQ":
			oFilter.fnTest = function(value) { return value == oValue1; }; break;
		case "NE":
			oFilter.fnTest = function(value) { return value != oValue1; }; break;
		case "LT":
			oFilter.fnTest = function(value) { return value < oValue1; }; break;
		case "LE":
			oFilter.fnTest = function(value) { return value <= oValue1; }; break;
		case "GT":
			oFilter.fnTest = function(value) { return value > oValue1; }; break;
		case "GE":
			oFilter.fnTest = function(value) { return value >= oValue1; }; break;
		case "BT":
			oFilter.fnTest = function(value) { return (value >= oValue1) && (value <= oValue2); }; break;
		case "Contains":
			oFilter.fnTest = function(value) {
				if (typeof value != "string") {
					throw new Error("Only \"String\" values are supported for the FilterOperator: \"Contains\".");
				}
				return value.indexOf(oValue1) != -1; 
			}; 
			break;
		case "StartsWith":
			oFilter.fnTest = function(value) { 
				if (typeof value != "string") {
					throw new Error("Only \"String\" values are supported for the FilterOperator: \"StartsWith\".");
				}
				return value.indexOf(oValue1) == 0; 
			}; 
			break;
		case "EndsWith":
			oFilter.fnTest = function(value) { 
				if (typeof value != "string") {
					throw new Error("Only \"String\" values are supported for the FilterOperator: \"EndsWith\".");
				}
				var iPos = value.indexOf(oValue1);
				if (iPos == -1){
					return false;					
				}
				return iPos == value.length - new String(oFilter.oValue1).length; 
			}; 
			break;
		default:
			oFilter.fnTest = function(value) { return true; };
	}
	return oFilter.fnTest;
};

/**
 * Get distinct values
 *
 * @param {String} sPath
 *
 * @protected
 */
sap.ui.model.json.JSONListBinding.prototype.getDistinctValues = function(sPath){
	var aResult = [],
		oMap = {},
		sValue,
		that = this;
	jQuery.each(this.oList, function(i, oContext) {
		sValue = that.oModel.getProperty(sPath, oContext);
		if (!oMap[sValue]) {
			oMap[sValue] = true;
			aResult.push(sValue);
		}
	});
	return aResult;
};

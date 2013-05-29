/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */

// Provides static class sap.ui.base.BindingParser
jQuery.sap.declare("sap.ui.base.BindingParser");
jQuery.sap.require("jquery.sap.script");

(function() {
	
	/**
	 * Regular expression to check for a (new) object literal
	 */
	var rObject = /^\{\s*[a-zA-Z_][a-zA-Z0-9_]*\s*:/;
	
	/**
	 * Regular expression to split the binding string into hard coded string fragments and embedded bindings.
	 * 
	 * Also handles escaping of '{' and '}'.
	 */
	var rFragments = /(\\[\\\{\}])|(\{)/g;

	/**
	 * Helper to create a formatter function. Only used to reduce the closure size of the formatter
	 */
	function makeFormatter(aFragments) {
		return function(aValues) {
			var aResult = [],
				l=aFragments.length,
				i;
			
			for(i=0; i<l; i++) {
				if ( typeof aFragments[i] === "number" ) {
					// a numerical fragment references the part with the same number 
					aResult.push(arguments[aFragments[i]])
				} else {
					// anything else is a string fragment 
					aResult.push(aFragments[i]);
				}
			}
			return aResult.join('');
		};
	}

	/**
	 * @static
	 * @class
	 */
	sap.ui.base.BindingParser = {};
	
	sap.ui.base.BindingParser.simpleParser = function(sString, oContext) {

		if ( jQuery.sap.startsWith(sString, "{") && jQuery.sap.endsWith(sString, "}") ) {
			return { path : sString.slice(1,-1) };
		}
	
	};
	
	sap.ui.base.BindingParser.complexParser = function(sString, oContext, bUnescape) {
		var parseObject=jQuery.sap.parseJS,
			oBindingInfo = {parts:[]},
			aFragments=[],
			bUnescaped,
			oParseResult,
			p=0,
			m,end;

		function resolveRef(o,sProp) {
			if ( typeof o[sProp] === "string" ) {
				if ( jQuery.sap.startsWith(o[sProp], ".") ) {
					o[sProp] = jQuery.proxy(jQuery.sap.getObject(o[sProp].slice(1), undefined, oContext), oContext);
				} else {
					o[sProp] = jQuery.sap.getObject(o[sProp]);
				} 
			}
		}

		function resolveType(o,sProp) {
			var FNType;
			if ( typeof o[sProp] === "string" ) {
				if ( jQuery.sap.startsWith(o[sProp], ".") ) {
					FNType = jQuery.sap.getObject(o[sProp].slice(1), undefined, oContext);
				} else {
					FNType = jQuery.sap.getObject(o[sProp]);
				} 
				// TODO find another solution for the type parameters?
				o[sProp] = new FNType(o.formatOptions, o.constraints);
				delete o.formatOptions;
				delete o.constraints;
			}
		}

		while ( m=rFragments.exec(sString) ) {
			
			// check for a skipped literal string fragment  
			if ( p < m.index ) {
				aFragments.push(sString.slice(p, m.index));
			}
			
			// handle the different kinds of matches
			if ( m[1] ) {
				
				// an escaped opening bracket, closing bracket or backslash
				aFragments.push(m[1].slice(1));
				bUnescaped = true;
				
			} else { // embedded binding
				
				if ( rObject.test(sString.slice(m.index)) ) {
					
					oParseResult = parseObject(sString, m.index);
					resolveType(oParseResult.result,'type');
					resolveRef(oParseResult.result,'formatter');
					resolveRef(oParseResult.result,'factory'); // list binding
					aFragments.push(oBindingInfo.parts.length);
					oBindingInfo.parts.push(oParseResult.result);
					rFragments.lastIndex = oParseResult.at;
					
				} else {
					
					// TODO find closing brace via regex as well?
					end = sString.indexOf('}', m.index);
					if ( end < m.index ) {
						throw new SyntaxError("no closing braces found in '" + sString + "' after pos:" + m.index);
					}
					aFragments.push(oBindingInfo.parts.length);
					oBindingInfo.parts.push({path:sString.slice(m.index+1, end)});
					rFragments.lastIndex = end+1;
					
				}
			}
			
			// remember where we are
			p = rFragments.lastIndex;
		}
		
		// check for a trailing literal string fragment  
		if ( p < sString.length ) {
			aFragments.push(sString.slice(p));
		}

		// only if a part has been found we can return a binding info
		if (oBindingInfo.parts.length > 0) {
			if ( aFragments.length === 1 /* implies: && typeof aFragments[0] === "number" */ ) {
				// special case: a single binding only
				return oBindingInfo.parts[0];
			} else /* if ( aFragments.length > 1 ) */ {
				// create the formatter function from the fragments
				oBindingInfo.formatter = makeFormatter(aFragments);
				return oBindingInfo;
			}
		} else if ( bUnescape && bUnescaped ) {
			return aFragments.join('');
		}
		
	};
	
}());

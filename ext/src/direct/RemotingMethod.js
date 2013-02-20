/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

Pre-release code in the Ext repository is intended for development purposes only and will
not always be stable. 

Use of pre-release code is permitted with your application at your own risk under standard
Ext license terms. Public redistribution is prohibited.

For early licensing, please contact us at licensing@sencha.com

Build date: 2013-02-13 19:36:35 (686c47f8f04c589246d9f000f87d2d6392c82af5)
*/
/**
 * @private
 * Small utility class used internally to represent a Direct method.
 */
Ext.define('Ext.direct.RemotingMethod', {

    constructor: function(config) {
        var me = this,
            params = Ext.isDefined(config.params) ? config.params : config.len,
            name, pLen, p, param;

        me.name = config.name;
        me.formHandler = config.formHandler;

        if (Ext.isNumeric(params)) {
            // given only the number of parameters
            me.len = params;
            me.ordered = true;
        }
        else {
            /*
             * Given an array of either
             * a) String
             * b) Objects with a name property. We may want to encode extra info in here later
             */
            me.params = {};
			pLen = params.length;

            for (p = 0; p < pLen; p++) {
                param = params[p];
                name  = Ext.isObject(param) ? param.name : param;
                me.params[name] = true;
            }
        }
    },
    
    getArgs: function(params, paramOrder, paramsAsHash) {
        var me = this,
            args = [],
            i, len;
        
        if (me.ordered) {
            if (me.len > 0) {
                // If a paramOrder was specified, add the params into the argument list in that order.
                if (paramOrder) {
                    for (i = 0, len = paramOrder.length; i < len; i++) {
                        args.push(params[paramOrder[i]]);
                    }
                }
                else if (paramsAsHash) {
                    // If paramsAsHash was specified, add all the params as a single object argument.
                    args.push(params);
                }
            }
        }
        else {
            args.push(params);
        } 
        
        return args;
    },

    /**
     * Takes the arguments for the Direct function and splits the arguments
     * from the scope and the callback.
     *
     * @param {Array} args The arguments passed to the direct call
     *
     * @return {Object} An object with 3 properties: args, callback & scope.
     */
    getCallData: function(args) {
        var me = this,
            data = null,
            len  = me.len,
            params = me.params,
            callback, scope, name, options;

        if (me.ordered) {
            callback = args[len];
            scope    = args[len + 1];
            options  = args[len + 2];
            
            if (len !== 0) {
                data = args.slice(0, len);
            }
        }
        else {
            data     = Ext.apply({}, args[0]);
            callback = args[1];
            scope    = args[2];
            options  = args[3];

            // filter out any non-existent properties
            for (name in data) {
                if (data.hasOwnProperty(name) && !params[name]) {
                    delete data[name];
                }
            }
        }

        return {
            data: data,
            callback: callback,
            scope: scope,
            options: options
        };
    }
});

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
 * @author Ed Spencer
 * @class Ext.data.Errors
 *
 * <p>Wraps a collection of validation error responses and provides convenient functions for
 * accessing and errors for specific fields.</p>
 *
 * <p>Usually this class does not need to be instantiated directly - instances are instead created
 * automatically when {@link Ext.data.Model#validate validate} on a model instance:</p>
 *
<pre><code>
//validate some existing model instance - in this case it returned 2 failures messages
var errors = myModel.validate();

errors.isValid(); //false

errors.length; //2
errors.getByField('name');  // [{field: 'name',  message: 'must be present'}]
errors.getByField('title'); // [{field: 'title', message: 'is too short'}]
</code></pre>
 */
Ext.define('Ext.data.Errors', {
    extend: 'Ext.util.MixedCollection',

    /**
     * Returns true if there are no errors in the collection
     * @return {Boolean}
     */
    isValid: function() {
        return this.length === 0;
    },

    /**
     * Returns all of the errors for the given field
     * @param {String} fieldName The field to get errors for
     * @return {Object[]} All errors for the given field
     */
    getByField: function(fieldName) {
        var errors = [],
            error, i;

        for (i = 0; i < this.length; i++) {
            error = this.items[i];

            if (error.field == fieldName) {
                errors.push(error);
            }
        }

        return errors;
    }
});

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
 */
Ext.define('Ext.layout.component.ProgressBar', {

    /* Begin Definitions */

    alias: ['layout.progressbar'],

    extend: 'Ext.layout.component.Auto',

    /* End Definitions */

    type: 'progressbar',

    beginLayout: function (ownerContext) {
        var me = this,
            i, textEls;

        me.callParent(arguments);

        if (!ownerContext.textEls) {
            textEls = me.owner.textEl; // an Ext.Element or CompositeList (raw DOM el's)

            if (textEls.isComposite) {
                ownerContext.textEls = [];
                textEls = textEls.elements;
                for (i = textEls.length; i--; ) {
                    ownerContext.textEls[i] = ownerContext.getEl(Ext.get(textEls[i]));
                }
            } else {
                ownerContext.textEls = [ ownerContext.getEl('textEl') ];
            }
        }
    },

    calculate: function(ownerContext) {
        var me = this,
            i, textEls, width;

        me.callParent(arguments);

        if (Ext.isNumber(width = ownerContext.getProp('width'))) {
            width -= ownerContext.getBorderInfo().width;
            textEls = ownerContext.textEls;

            for (i = textEls.length; i--; ) {
                textEls[i].setWidth(width);
            }
        } else {
            me.done = false;
        }
    }
});

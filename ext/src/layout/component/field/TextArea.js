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
 * Layout class for {@link Ext.form.field.TextArea} fields. Handles sizing the textarea field.
 * @private
 */
Ext.define('Ext.layout.component.field.TextArea', {
    extend: 'Ext.layout.component.field.Text',
    alias: 'layout.textareafield',

    type: 'textareafield',
    
    canGrowWidth: false,
    
    naturalSizingProp: 'cols',
    
    beginLayout: function(ownerContext){
        this.callParent(arguments);
        ownerContext.target.inputEl.setStyle('height', '');
    },

    measureContentHeight: function (ownerContext) {
        var me = this,
            owner = me.owner,
            height = me.callParent(arguments),
            inputContext, inputEl, value, max, curWidth, calcHeight;

        if (owner.grow && !ownerContext.state.growHandled) {
            inputContext = ownerContext.inputContext;
            inputEl = owner.inputEl;
            curWidth = inputEl.getWidth(true); //subtract border/padding to get the available width for the text

            // Get and normalize the field value for measurement
            value = Ext.util.Format.htmlEncode(inputEl.dom.value) || '&#160;';
            value += owner.growAppend;
            
            // Translate newlines to <br> tags
            value = value.replace(/\n/g, '<br/>');

            // Find the height that contains the whole text value
            calcHeight = Ext.util.TextMetrics.measure(inputEl, value, curWidth).height +
                         inputContext.getBorderInfo().height + inputContext.getPaddingInfo().height;

            // Constrain
            calcHeight = Ext.Number.constrain(calcHeight, owner.growMin, owner.growMax);
            inputContext.setHeight(calcHeight);
            ownerContext.state.growHandled = true;
            
            // Now that we've set the inputContext, we need to recalculate the width
            inputContext.domBlock(me, 'height');
            height = NaN;
        }
        return height;
    }
});

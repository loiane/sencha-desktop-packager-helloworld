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
 * Provides a container for arranging a group of related Buttons in a tabular manner.
 *
 *     @example
 *     Ext.create('Ext.panel.Panel', {
 *         title: 'Panel with ButtonGroup',
 *         width: 300,
 *         height:200,
 *         renderTo: document.body,
 *         bodyPadding: 10,
 *         html: 'HTML Panel Content',
 *         tbar: [{
 *             xtype: 'buttongroup',
 *             columns: 3,
 *             title: 'Clipboard',
 *             items: [{
 *                 text: 'Paste',
 *                 scale: 'large',
 *                 rowspan: 3,
 *                 iconCls: 'add',
 *                 iconAlign: 'top',
 *                 cls: 'btn-as-arrow'
 *             },{
 *                 xtype:'splitbutton',
 *                 text: 'Menu Button',
 *                 scale: 'large',
 *                 rowspan: 3,
 *                 iconCls: 'add',
 *                 iconAlign: 'top',
 *                 arrowAlign:'bottom',
 *                 menu: [{ text: 'Menu Item 1' }]
 *             },{
 *                 xtype:'splitbutton', text: 'Cut', iconCls: 'add16', menu: [{text: 'Cut Menu Item'}]
 *             },{
 *                 text: 'Copy', iconCls: 'add16'
 *             },{
 *                 text: 'Format', iconCls: 'add16'
 *             }]
 *         }]
 *     });
 *
 */
Ext.define('Ext.container.ButtonGroup', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.buttongroup',
    alternateClassName: 'Ext.ButtonGroup',

    requires: ['Ext.layout.container.Table'],

    /**
     * @cfg {Number} columns
     * The `columns` configuration property passed to the {@link #layout configured layout manager}.
     * See {@link Ext.layout.container.Table#columns}.
     */

    /**
     * @cfg {String} baseCls
     * @inheritdoc
     */
    baseCls: Ext.baseCSSPrefix + 'btn-group',

    /**
     * @cfg {Ext.enums.Layout/Object} layout
     * @inheritdoc
     */
    layout: {
        type: 'table'
    },

    defaultType: 'button',

    /**
     * @cfg {Boolean} frame
     * @inheritdoc
     */
    frame: true,

    /**
     * @cfg {Boolean} defaultButtonUI
     * A default {@link Ext.Component#ui ui} to use for {@link Ext.button.Button Button} items
     */

    frameHeader: false,

    titleAlign: 'center',

    noTitleCls: 'notitle',

    initComponent : function() {
        // Copy the component's columns config to the layout if specified
        var me = this,
            cols = me.columns;

        if (cols) {
            me.layout = Ext.apply({}, {columns: cols}, me.layout);
        }

        if (!me.title) {
            me.addClsWithUI(me.noTitleCls);
        }
        me.callParent(arguments);
    },

    // private
    onBeforeAdd: function(component) {
        if (component.isButton) {
            if (this.defaultButtonUI && component.ui === 'default' &&
                !component.hasOwnProperty('ui')) {
                component.ui = this.defaultButtonUI;
            } else {
                component.ui = component.ui + '-toolbar';
            }
        }
        this.callParent(arguments);
    },

    //private
    applyDefaults: function(c) {
        if (!Ext.isString(c)) {
            c = this.callParent(arguments);
        }
        return c;
    }

    /**
     * @cfg {Array} tools
     * @private
     */
    /**
     * @cfg {Boolean} collapsible
     * @private
     */
    /**
     * @cfg {Boolean} collapseMode
     * @private
     */
    /**
     * @cfg {Boolean} animCollapse
     * @private
     */
    /**
     * @cfg {Boolean} closable
     * @private
     */
});

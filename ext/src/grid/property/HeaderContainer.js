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
 * A custom HeaderContainer for the {@link Ext.grid.property.Grid}.
 * Generally it should not need to be used directly.
 */
Ext.define('Ext.grid.property.HeaderContainer', {

    extend: 'Ext.grid.header.Container',

    alternateClassName: 'Ext.grid.PropertyColumnModel',
    
    nameWidth: 115,

    // @private strings used for locale support
    //<locale>
    nameText : 'Name',
    //</locale>
    //<locale>
    valueText : 'Value',
    //</locale>
    //<locale>
    dateFormat : 'm/j/Y',
    //</locale>
    //<locale>
    trueText: 'true',
    //</locale>
    //<locale>
    falseText: 'false',
    //</locale>

    // @private
    nameColumnCls: Ext.baseCSSPrefix + 'grid-property-name',

    /**
     * Creates new HeaderContainer.
     * @param {Ext.grid.property.Grid} grid The grid this store will be bound to
     * @param {Object} source The source data config object
     */
    constructor : function(grid, store) {
        var me = this;
        
        me.grid = grid;
        me.store = store;
        me.callParent([{
            enableColumnResize: Ext.isDefined(grid.enableColumnResize) ? grid.enableColumnResize : me.enableColumnResize,
            enableColumnMove: Ext.isDefined(grid.enableColumnMove) ? grid.enableColumnMove : me.enableColumnMove,
            items: [{
                header: me.nameText,
                width: grid.nameColumnWidth || me.nameWidth,
                sortable: grid.sortableColumns,
                dataIndex: grid.nameField,
                renderer: Ext.Function.bind(me.renderProp, me),
                itemId: grid.nameField,
                menuDisabled :true,
                tdCls: me.nameColumnCls
            }, {
                header: me.valueText,
                renderer: Ext.Function.bind(me.renderCell, me),
                getEditor: Ext.Function.bind(me.getCellEditor, me),
                sortable: grid.sortableColumns,
                flex: 1,
                fixed: true,
                dataIndex: grid.valueField,
                itemId: grid.valueField,
                menuDisabled: true
            }]
        }]);
    },
    
    getCellEditor: function(record){
        return this.grid.getCellEditor(record, this);
    },

    // @private
    // Render a property name cell
    renderProp : function(v) {
        return this.getPropertyName(v);
    },

    // @private
    // Render a property value cell
    renderCell : function(val, meta, rec) {
        var me = this,
            grid = me.grid,
            renderer = grid.getConfig(rec.get(grid.nameField), 'renderer'),
            result = val;

        if (renderer) {
            return renderer.apply(me, arguments);
        }
        if (Ext.isDate(val)) {
            result = me.renderDate(val);
        } else if (Ext.isBoolean(val)) {
            result = me.renderBool(val);
        }
        return Ext.util.Format.htmlEncode(result);
    },

    // @private
    renderDate : Ext.util.Format.date,

    // @private
    renderBool : function(bVal) {
        return this[bVal ? 'trueText' : 'falseText'];
    },

    // @private
    // Renders custom property names instead of raw names if defined in the Grid
    getPropertyName : function(name) {
        return this.grid.getConfig(name, 'displayName', name);
    }
});

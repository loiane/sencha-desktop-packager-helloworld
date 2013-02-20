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
 * A layout that arranges items vertically down a Container. This layout optionally divides available vertical space
 * between child items containing a numeric `flex` configuration.
 *
 * This layout may also be used to set the widths of child items by configuring it with the {@link #align} option.
 *
 *     @example
 *     Ext.create('Ext.Panel', {
 *         width: 500,
 *         height: 400,
 *         title: "VBoxLayout Panel",
 *         layout: {
 *             type: 'vbox',
 *             align: 'center'
 *         },
 *         renderTo: document.body,
 *         items: [{
 *             xtype: 'panel',
 *             title: 'Inner Panel One',
 *             width: 250,
 *             flex: 2
 *         },
 *         {
 *             xtype: 'panel',
 *             title: 'Inner Panel Two',
 *             width: 250,
 *             flex: 4
 *         },
 *         {
 *             xtype: 'panel',
 *             title: 'Inner Panel Three',
 *             width: '50%',
 *             flex: 4
 *         }]
 *     });
 */
Ext.define('Ext.layout.container.VBox', {

    /* Begin Definitions */

    alias: ['layout.vbox'],
    extend: 'Ext.layout.container.Box',
    alternateClassName: 'Ext.layout.VBoxLayout',

    /* End Definitions */

    /**
     * @cfg {String} align
     * Controls how the child items of the container are aligned. Acceptable configuration values for this property are:
     *
     * - **left** : **Default** child items are aligned horizontally at the **left** side of the container.
     * - **center** : child items are aligned horizontally at the **mid-width** of the container.
     * - **right** : child items are aligned horizontally at the **right** of the container.
     * - **stretch** : child items are stretched horizontally to fill the width of the container.
     * - **stretchmax** : child items are stretched horizontally to the size of the largest item.
     */
    align : 'left', // left, center, stretch, strechmax
    
    /**
     * @cfg {Boolean} constrainAlign
     * Limits the size of {@link #align aligned} components to the size of the container under certain circumstances.
     * Firstly, the container width must not be determined by the width of the child components. Secondly, the child
     * components must have their width {@link Ext.AbstractComponent#shrinkWrap shrinkwrapped}.
     */
    constrainAlign: false,

    type: 'vbox',

    direction: 'vertical',

    horizontal: false,

    names: {
        // parallel
        beforeX: 'top',
        leftCap: 'Top',
        afterX: 'bottom',
        width: 'height',
        contentWidth: 'contentHeight',
        minWidth: 'minHeight',
        maxWidth: 'maxHeight',
        widthCap: 'Height',
        widthModel: 'heightModel',
        widthIndex: 1,
        x: 'y',
        scrollLeft: 'scrollTop',
        overflowX: 'overflowY',
        hasOverflowX: 'hasOverflowY',
        invalidateScrollX: 'invalidateScrollY',
        parallelMargins: 'tb',

        // perpendicular
        center: 'center',
        beforeY: 'left',
        afterY: 'right',
        height: 'width',
        contentHeight: 'contentWidth',
        minHeight: 'minWidth',
        maxHeight: 'maxWidth',
        heightCap: 'Width',
        heightModel: 'widthModel',
        heightIndex: 0,
        y: 'x',
        scrollTop: 'scrollLeft',
        overflowY: 'overflowX',
        hasOverflowY: 'hasOverflowX',
        invalidateScrollY: 'invalidateScrollX',
        perpendicularMargins: 'lr',

        // Methods
        getWidth: 'getHeight',
        getHeight: 'getWidth',
        setWidth: 'setHeight',
        setHeight: 'setWidth',
        gotWidth: 'gotHeight',
        gotHeight: 'gotWidth',
        setContentWidth: 'setContentHeight',
        setContentHeight: 'setContentWidth',
        setWidthInDom: 'setHeightInDom',
        setHeightInDom: 'setWidthInDom'
    },

    sizePolicy: {
        flex: {
            '': {
                readsWidth : 1,
                readsHeight: 0,
                setsWidth  : 0,
                setsHeight : 1
            },
            stretch: {
                readsWidth : 0,
                readsHeight: 0,
                setsWidth  : 1,
                setsHeight : 1
            },
            stretchmax: {
                readsWidth : 1,
                readsHeight: 0,
                setsWidth  : 1,
                setsHeight : 1
            }
        },
        '': {
            readsWidth : 1,
            readsHeight: 1,
            setsWidth  : 0,
            setsHeight : 0
        },
        stretch: {
            readsWidth : 0,
            readsHeight: 1,
            setsWidth  : 1,
            setsHeight : 0
        },
        stretchmax: {
            readsWidth : 1,
            readsHeight: 1,
            setsWidth  : 1,
            setsHeight : 0
        }
    }
});

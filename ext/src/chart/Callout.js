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
 * @class Ext.chart.Callout
 * A mixin providing callout functionality for Ext.chart.series.Series.
 */
Ext.define('Ext.chart.Callout', {

    /* Begin Definitions */

    /* End Definitions */

    constructor: function(config) {
        if (config.callouts) {
            config.callouts.styles = Ext.applyIf(config.callouts.styles || {}, {
                color: "#000",
                font: "11px Helvetica, sans-serif"
            });
            this.callouts = Ext.apply(this.callouts || {}, config.callouts);
            this.calloutsArray = [];
        }
    },

    renderCallouts: function() {
        if (!this.callouts) {
            return;
        }

        var me = this,
            items = me.items,
            animate = me.chart.animate,
            config = me.callouts,
            styles = config.styles,
            group = me.calloutsArray,
            store = me.chart.getChartStore(),
            len = store.getCount(),
            ratio = items.length / len,
            previouslyPlacedCallouts = [],
            i,
            count,
            j,
            p,
            item,
            label,
            storeItem,
            display;
            
        for (i = 0, count = 0; i < len; i++) {
            for (j = 0; j < ratio; j++) {
                item = items[count];
                label = group[count];
                storeItem = store.getAt(i);
                
                display = (!config.filter || config.filter(storeItem));
                
                if (!display && !label) {
                    count++;
                    continue;               
                }
                
                if (!label) {
                    group[count] = label = me.onCreateCallout(storeItem, item, i, display, j, count);
                }
                for (p in label) {
                    if (label[p] && label[p].setAttributes) {
                        label[p].setAttributes(styles, true);
                    }
                }
                if (!display) {
                    for (p in label) {
                        if (label[p]) {
                            if (label[p].setAttributes) {
                                label[p].setAttributes({
                                    hidden: true
                                }, true);
                            } else if(label[p].setVisible) {
                                label[p].setVisible(false);
                            }
                        }
                    }
                }
                if (config && config.renderer) {
                    config.renderer(label, storeItem);
                }
                me.onPlaceCallout(label, storeItem, item, i, display, animate,
                                  j, count, previouslyPlacedCallouts);
                previouslyPlacedCallouts.push(label);
                count++;
            }
        }
        this.hideCallouts(count);
    },

    onCreateCallout: function(storeItem, item, i, display) {
        var me = this,
            group = me.calloutsGroup,
            config = me.callouts,
            styles = (config ? config.styles : undefined),
            width = (styles ? styles.width : 0),
            height = (styles ? styles.height : 0),
            chart = me.chart,
            surface = chart.surface,
            calloutObj = {
                //label: false,
                //box: false,
                lines: false
            };

        calloutObj.lines = surface.add(Ext.apply({},
        {
            type: 'path',
            path: 'M0,0',
            stroke: me.getLegendColor() || '#555'
        },
        styles));

        if (config.items) {
            calloutObj.panel = new Ext.Panel({
                style: "position: absolute;",    
                width: width,
                height: height,
                items: config.items,
                renderTo: chart.el
            });
        }

        return calloutObj;
    },

    hideCallouts: function(index) {
        var calloutsArray = this.calloutsArray,
            len = calloutsArray.length,
            co,
            p;
        while (len-->index) {
            co = calloutsArray[len];
            for (p in co) {
                if (co[p]) {
                    co[p].hide(true);
                }
            }
        }
    }
});

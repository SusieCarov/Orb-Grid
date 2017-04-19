(function() {

var config = function() {
    return {
        // default is null, which wil extend as much as it needs
        // width: 1000,
        // height: 645,
        
        // dataSource is set up in data.js
    	dataSource: orb.demo.data,
        
        // also could be 'rows'. This moves the quantity and Amount labels
    	dataHeadersLocation: 'columns',
        
        //allows rearranging of fields between column and row
        canMoveFields: false,
        
        theme: 'blue',
        toolbar: {
            visible: true
        },
        
        //display grandTotal options
    	grandTotal: {
    		rowsvisible: true,
    		columnsvisible: true
    	},
        
        // options for grouping subcategories by parent to create subTotal
    	subTotal: {
    		visible: true, //show total for parent category
            collapsible: true, //whether can be collapsed
            collapsed: true //subcategories start collapsed if true
    	},
        
        fields: [
            {
                name: '0',
                caption: 'Entity'
            },
            {
                name: '1',
                caption: 'Product',
                subTotal: {visible: false}
            },
            {
                name: '2',
                caption: 'Company',
                sort: {
                    order: 'asc'
                }
            },
            {
                name: '3',
                caption: 'Class'
            },
            {
                name: '4',
                caption: 'Category',
                sort: {
                    order: 'desc'
                }
            },
            {
                name: '5',
                caption: 'Quantity',
//                dataSettings: {aggregateFunc: sum}
            },
            {
                name: '6',
                caption: 'Amount',
                dataSettings: {
                    aggregateFunc: 'avg',
                    formatFunc: function(value) {
                        return Number(value).toFixed(0);
                    }
                }
            }
        ],
        rows    : [ 'Company',  'Category', 'Product'],
        columns : [ 'Class', 'Entity' ],
        data    : [ 'Quantity', 'Amount' ],
        preFilters : {
            'Company': { 'Matches': /n/ },
            'Amount'      : { '>':  40 }
        }
    };
};

window.onload = function() {
    var pgridElem = document.getElementById('demo-pgrid');
    var sideMenuElement = document.getElementById('sidenav');
    var topMenuButton = document.getElementById('linkstoggle');
    var topMenuElement = document.getElementById('headerlinks');

    if(pgridElem) {
        new orb.pgridwidget(config()).render(pgridElem);
    }

    if(sideMenuElement) {
        new toggler({
            menu: sideMenuElement,
            onOpen: function(elem, compactMode) {
                elem.style.overflow = 'auto';
                elem.style.height = 'auto';

                if(compactMode) {
                    var menuHeight = elem.offsetHeight;
                    elem.style.height = Math.min((getWindowSize().height - 74 - 24), menuHeight) + 'px';
                }
            },
            onClose: function(elem) {
                elem.style.overflow = 'hidden';
                elem.style.height = '30px';
            },
            isCompactMode: function() {
                return getStyle(sideMenuElement, 'cursor') === 'pointer';
            }
        });
    }
    if(topMenuElement) {
        new toggler({
            button: topMenuButton,
            menu: topMenuElement,
            onOpen: function(elem) {
                topMenuElement.style.height = 'auto';
                topMenuButton.style.borderRadius = '3px 3px 0 0';
            },
            onClose: function(elem) {
                topMenuElement.style.height = '27px';
                topMenuButton.style.borderRadius = '3px';
            },
            isCompactMode: function() {
                return getStyle(topMenuButton.parentNode, 'display') === 'block';
            }
        });
    }
};

var togglers = [];

function toggler(options) {

    var self = this;

    this.options = options;
    
    this.openMenu = function(force) {
        if(force || self.collapsed) {

            // close all open menus except current one
            for(var i = 0; i < togglers.length; i++) {
                if(togglers[i] != self) {
                    togglers[i].closeMenu();
                }
            }

            self.collapsed = false;
            self.options.onOpen(self.options.menu, self.options.isCompactMode());
        }
        self.options.menu.scrollTop = 0;
    };

    this.closeMenu = function() {
        if(!self.collapsed && self.options.isCompactMode()) {
            self.collapsed = true;
            self.options.onClose(self.options.menu);
        }
        self.options.menu.scrollTop = 0;
    }

    this.ensureMenu = function() {
        if(!self.options.isCompactMode()) {
            self.openMenu(true);
        } else {
            self.closeMenu();
        }
    }

    function init() {

        togglers.push(self);

        addEventListener(window, 'resize', self.ensureMenu);
        addEventListener(document, 'click', self.closeMenu);

        self.options.button = self.options.button || self.options.menu;

        addEventListener(self.options.button, 'click', function(e) {
            if(self.collapsed) {
                self.openMenu();

                if(e.stopPropagation) {
                    e.stopPropagation();
                } else {
                    e.cancelBubble = true;
                }

                if(e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
            }
        });

        self.collapsed = self.options.isCompactMode();
    }

    init();
}

function addEventListener(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback);
    }
    else {
        element.attachEvent('on' + eventName, callback);
    }
}

function getWindowSize() {
    var win = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        w = win.innerWidth || e.clientWidth || g.clientWidth,
        h = win.innerHeight|| e.clientHeight|| g.clientHeight;
    return { width: w, height: h};
}

function getStyle(element, styleProp) {
    if(element && styleProp) {
        if (element.currentStyle) {
            return element.currentStyle[styleProp];
        } else if (window.getComputedStyle) {
            return window.getComputedStyle(element, null).getPropertyValue(styleProp);
        }
    }
    return null;
};

}());
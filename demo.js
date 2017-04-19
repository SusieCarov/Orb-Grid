 // data source
  var data = [
   ['Contoso Florida', 'Proseware LCD17W E202 Black', 'Proseware, Inc.', 'Economy', 'Monitors', 4, 509.55],
['Contoso New Jersey', 'Adventure Works CRT15 E101 Black', 'Adventure Works', 'Economy', 'Monitors', 4, 351],
['Contoso New Jersey', 'Adventure Works CRT15 E101 Black', 'Adventure Works', 'Deluxe', 'Monitors', 0, 0],
['Contoso Japan', 'WWI Projector 480p LCD12 Silver', 'Wide World Importers', 'Regular', 'Projectors & Screens', 9, 2038.1],
['Contoso Quebec', 'Proseware Screen 80in E1010 Black', 'Proseware, Inc.', 'Economy', 'Projectors & Screens', 4, 419.65],
['Contoso North America Online Store', 'Adventure Works LCD15 E100 White', 'Adventure Works', 'Economy', 'Monitors', 4, 381.15],
['Contoso Massachusetts', 'WWI CRT17 E106 Black', 'Wide World Importers', 'Economy', 'Monitors', 4, 391.05],
['Contoso Iran', 'WWI Projector 480p LCD12 Silver', 'Wide World Importers', 'Regular', 'Projectors & Screens', 9, 2038.1],
['Contoso Denmark', 'WWI Screen 85in E1010 White', 'Wide World Importers', 'Economy', 'Projectors & Screens', 4, 549.05],
['Contoso South Carolina', 'Proseware Screen 80in E1010 Silver', 'Proseware, Inc.', 'Economy', 'Projectors & Screens', 4, 425.1]
  ];

  // pivot grid options
  var config = {
    dataSource: data,
    dataHeadersLocation: 'columns',
    theme: 'blue',
    toolbar: {
        visible: true
    },
    grandTotal: {
        rowsvisible: true,
        columnsvisible: true
    },
    subTotal: {
        visible: true,
        collapsed: true
    },
    fields: [
        { name: '0', caption: 'Entity' },
        { name: '1', caption: 'Product' },
        { name: '2', caption: 'Manufacturer', sort: { order: 'asc' } },
        { name: '3', caption: 'Class' },
        { name: '4', caption: 'Category', sort: { order: 'desc' } },
        { name: '5', caption: 'Quantity' },
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
    rows    : [ 'Manufacturer', 'Category' ],
    columns : [ 'Class' ],
    data    : [ 'Quantity', 'Amount' ],
    preFilters : {
        'Manufacturer': { 'Matches': /n/ },
        'Amount'      : { '>':  40 }
    },
    width: 1110,
    height: 645
  };

  // instantiate and show the pivot grid
  new orb.pgridwidget(config).render(document.getElementById('pgrid'));
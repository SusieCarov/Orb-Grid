/**
 * orb v1.0.9, Pivot grid javascript library.
 *
 * Copyright (c) 2014-2015 Najmeddine Nouri <devnajm@gmail.com>.
 *
 * @version v1.0.9
 * @link http://nnajm.github.io/orb/
 * @license MIT
 */

"use strict";
! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var t;
        "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self), t.orb = e()
    }
}(function() {
    return function e(t, n, o) {
        function r(i, l) {
            if (!n[i]) {
                if (!t[i]) {
                    var s = "function" == typeof require && require;
                    if (!l && s) return s(i, !0);
                    if (a) return a(i, !0);
                    var u = new Error("Cannot find module '" + i + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var c = n[i] = {
                    exports: {}
                };
                t[i][0].call(c.exports, function(e) {
                    var n = t[i][1][e];
                    return r(n ? n : e)
                }, c, c.exports, e, t, n, o)
            }
            return n[i].exports
        }
        for (var a = "function" == typeof require && require, i = 0; i < o.length; i++) r(o[i]);
        return r
    }({
        1: [function(e, t) {
            t.exports.utils = e("./orb.utils"), t.exports.pgrid = e("./orb.pgrid"), t.exports.pgridwidget = e("./orb.ui.pgridwidget"), t.exports.query = e("./orb.query"), t.exports.export = e("./orb.export.excel")
        }, {
            "./orb.export.excel": 6,
            "./orb.pgrid": 8,
            "./orb.query": 9,
            "./orb.ui.pgridwidget": 15,
            "./orb.utils": 17
        }],
        2: [function(e, t) {
            function n(e, t, n, r) {
                var a = 0,
                    i = 0,
                    l = ("all" === t ? n : t).length;
                return l > 0 && (r || l > 1 ? (o(e, t, n, function(e) {
                    i += e
                }), i /= l, o(e, t, n, function(e) {
                    a += (e - i) * (e - i)
                }), a /= r ? l : l - 1) : a = 0 / 0), a
            }

            function o(e, t, n, o) {
                var r = "all" === t;
                if (t = r ? n : t, t.length > 0)
                    for (var a = 0; a < t.length; a++) o((r ? t[a] : n[t[a]])[e])
            }
            var r = t.exports = {
                toAggregateFunc: function(e) {
                    return e ? "string" == typeof e && r[e] ? r[e] : "function" == typeof e ? e : r.sum : r.sum
                },
                count: function(e, t, n) {
                    return "all" === t ? n.length : t.length
                },
                sum: function(e, t, n) {
                    var r = 0;
                    return o(e, t, n, function(e) {
                        r += e
                    }), r
                },
                min: function(e, t, n) {
                    var r = null;
                    return o(e, t, n, function(e) {
                        (null == r || r > e) && (r = e)
                    }), r
                },
                max: function(e, t, n) {
                    var r = null;
                    return o(e, t, n, function(e) {
                        (null == r || e > r) && (r = e)
                    }), r
                },
                avg: function(e, t, n) {
                    var r = 0,
                        a = ("all" === t ? n : t).length;
                    return a > 0 && (o(e, t, n, function(e) {
                        r += e
                    }), r /= a), r
                },
                prod: function(e, t, n) {
                    var r, a = ("all" === t ? n : t).length;
                    return a > 0 && (r = 1, o(e, t, n, function(e) {
                        r *= e
                    })), r
                },
                stdev: function(e, t, o) {
                    return Math.sqrt(n(e, t, o, !1))
                },
                stdevp: function(e, t, o) {
                    return Math.sqrt(n(e, t, o, !0))
                },
                "var": function(e, t, o) {
                    return n(e, t, o, !1)
                },
                varp: function(e, t, o) {
                    return n(e, t, o, !0)
                }
            }
        }, {}],
        3: [function(e, t) {
            var n = e("./orb.utils"),
                o = e("./orb.dimension"),
                r = {
                    COLUMNS: 1,
                    ROWS: 2,
                    DATA: 3
                };
            t.exports = function(e, t) {
                function a(e) {
                    for (var t = 0; t < l.fields.length; t++)
                        if (l.fields[t].name === e.name) return t;
                    return -1
                }

                function i() {
                    if (null != l.pgrid.filteredDataSource && l.dimensionsCount > 0) {
                        var e = l.pgrid.filteredDataSource;
                        if (null != e && n.isArray(e) && e.length > 0)
                            for (var t = 0, r = e.length; r > t; t++)
                                for (var a = e[t], i = l.root, u = 0; u < l.dimensionsCount; u++) {
                                    var c = l.dimensionsCount - u,
                                        d = l.fields[u],
                                        p = a[d.name],
                                        h = i.subdimvals;
                                    void 0 !== h[p] ? i = h[p] : (i.values.push(p), i = new o(++s, i, p, d, c, !1, u == l.dimensionsCount - 1), h[p] = i, i.rowIndexes = [], l.dimensionsByDepth[c].push(i)), i.rowIndexes.push(t)
                                }
                    }
                }
                var l = this,
                    s = 0;
                null != e && null != e.config && (this.pgrid = e, this.type = t, this.fields = function() {
                    switch (t) {
                        case r.COLUMNS:
                            return l.pgrid.config.columnFields;
                        case r.ROWS:
                            return l.pgrid.config.rowFields;
                        case r.DATA:
                            return l.pgrid.config.dataFields;
                        default:
                            return []
                    }
                }(), this.dimensionsCount = null, this.root = null, this.dimensionsByDepth = null, this.update = function() {
                    l.dimensionsCount = l.fields.length, l.root = new o(++s, null, null, null, l.dimensionsCount + 1, !0), l.dimensionsByDepth = {};
                    for (var e = 1; e <= l.dimensionsCount; e++) l.dimensionsByDepth[e] = [];
                    i();
                    for (var t = 0; t < l.fields.length; t++) {
                        var n = l.fields[t];
                        ("asc" === n.sort.order || "desc" === n.sort.order) && l.sort(n, !0)
                    }
                }, this.sort = function(e, t) {
                    if (null != e) {
                        t !== !0 && (e.sort.order = "asc" !== e.sort.order ? "asc" : "desc");
                        for (var n = l.dimensionsCount - a(e), o = n === l.dimensionsCount ? [l.root] : l.dimensionsByDepth[n + 1], r = 0; r < o.length; r++) o[r].values.sort(), "desc" === e.sort.order && o[r].values.reverse()
                    }
                })
            }, t.exports.Type = r
        }, {
            "./orb.dimension": 5,
            "./orb.utils": 17
        }],
        4: [function(e, t) {
            function n(e, t, n) {
                for (var o = 0; o < t.length; o++)
                    if (null != t[o][e]) return t[o][e];
                return n
            }

            function o() {
                for (var e = {
                        configs: [],
                        sorts: [],
                        subtotals: [],
                        functions: []
                    }, t = 0; t < arguments.length; t++) {
                    var n = arguments[t] || {};
                    e.configs.push(n), e.sorts.push(n.sort || {}), e.subtotals.push(n.subTotal || {}), e.functions.push({
                        aggregateFuncName: n.aggregateFuncName,
                        aggregateFunc: 0 === t ? n.aggregateFunc : n.aggregateFunc ? n.aggregateFunc() : null,
                        formatFunc: 0 === t ? n.formatFunc : n.formatFunc ? n.formatFunc() : null
                    })
                }
                return e
            }

            function r(e, t, r, a) {
                var i, l;
                if (a) switch (t) {
                    case u.Type.ROWS:
                        i = e.rowSettings, l = a.rowSettings;
                        break;
                    case u.Type.COLUMNS:
                        i = e.columnSettings, l = a.columnSettings;
                        break;
                    case u.Type.DATA:
                        i = e.dataSettings, l = a.dataSettings;
                        break;
                    default:
                        i = null, l = null
                } else i = null, l = null;
                var s = o(r, l, i, a, e);
                return new h({
                    name: n("name", s.configs, ""),
                    caption: n("caption", s.configs, ""),
                    sort: {
                        order: n("order", s.sorts, null),
                        customfunc: n("customfunc", s.sorts, null)
                    },
                    subTotal: {
                        visible: n("visible", s.subtotals, !0),
                        collapsible: n("collapsible", s.subtotals, !0),
                        collapsed: n("collapsed", s.subtotals, !1) && n("collapsible", s.subtotals, !0)
                    },
                    aggregateFuncName: n("aggregateFuncName", s.functions, "sum"),
                    aggregateFunc: n("aggregateFunc", s.functions, c.sum),
                    formatFunc: n("formatFunc", s.functions, null)
                }, !1)
            }

            function a(e) {
                e = e || {}, this.rowsvisible = void 0 !== e.rowsvisible ? e.rowsvisible : !0, this.columnsvisible = void 0 !== e.columnsvisible ? e.columnsvisible : !0
            }

            function i(e, t) {
                var n = {
                    visible: t === !0 ? !0 : void 0,
                    collapsible: t === !0 ? !0 : void 0,
                    collapsed: t === !0 ? !1 : void 0
                };
                e = e || {}, this.visible = void 0 !== e.visible ? e.visible : n.visible, this.collapsible = void 0 !== e.collapsible ? e.collapsible : n.collapsible, this.collapsed = void 0 !== e.collapsed ? e.collapsed : n.collapsed
            }

            function l(e) {
                e = e || {}, this.order = e.order, this.customfunc = e.customfunc
            }
            var s = e("./orb.utils"),
                u = e("./orb.axe"),
                c = e("./orb.aggregation"),
                d = e("./orb.filtering"),
                p = e("./orb.themes"),
                h = t.exports.field = function(e, t) {
                    function n(e) {
                        return null != e ? e.toString() : ""
                    }
                    e = e || {}, this.name = e.name, this.caption = e.caption || this.name, this.sort = new l(e.sort), this.subTotal = new i(e.subTotal);
                    var o, r;
                    this.aggregateFunc = function(e) {
                        return e ? void(o = c.toAggregateFunc(e)) : o
                    }, this.formatFunc = function(e) {
                        return e ? void(r = e) : r
                    }, this.aggregateFuncName = e.aggregateFuncName || (e.aggregateFunc ? s.isString(e.aggregateFunc) ? e.aggregateFunc : "custom" : null), this.aggregateFunc(e.aggregateFunc), this.formatFunc(e.formatFunc || n), t !== !1 && ((this.rowSettings = new h(e.rowSettings, !1)).name = this.name, (this.columnSettings = new h(e.columnSettings, !1)).name = this.name, (this.dataSettings = new h(e.dataSettings, !1)).name = this.name)
                };
            t.exports.config = function(e) {
                function t(e) {
                    return "string" == typeof e ? {
                        name: l.captionToName(e)
                    } : e
                }

                function n(e, t) {
                    var n = o(e, t);
                    return n > -1 ? e[n] : null
                }

                function o(e, t) {
                    for (var n = 0; n < e.length; n++)
                        if (e[n].name === t) return n;
                    return -1
                }
                var l = this;
                this.dataSource = e.dataSource || [], this.canMoveFields = void 0 !== e.canMoveFields ? !!e.canMoveFields : !0, this.dataHeadersLocation = "columns" === e.dataHeadersLocation ? "columns" : "rows", this.grandTotal = new a(e.grandTotal), this.subTotal = new i(e.subTotal, !0), this.width = e.width, this.height = e.height, this.toolbar = e.toolbar, this.theme = p, p.current(e.theme), this.rowSettings = new h(e.rowSettings, !1), this.columnSettings = new h(e.columnSettings, !1), this.dataSettings = new h(e.dataSettings, !1), this.dataSourceFieldNames = [], this.dataSourceFieldCaptions = [], this.captionToName = function(e) {
                    var t = l.dataSourceFieldCaptions.indexOf(e);
                    return t >= 0 ? l.dataSourceFieldNames[t] : e
                }, this.nameToCaption = function(e) {
                    var t = l.dataSourceFieldNames.indexOf(e);
                    return t >= 0 ? l.dataSourceFieldCaptions[t] : e
                }, this.setTheme = function(e) {
                    return l.theme.current() !== l.theme.current(e)
                }, this.allFields = (e.fields || []).map(function(e) {
                    var t = new h(e);
                    return l.dataSourceFieldNames.push(t.name), l.dataSourceFieldCaptions.push(t.caption), t
                }), this.rowFields = (e.rows || []).map(function(e) {
                    return e = t(e), r(l, u.Type.ROWS, e, n(l.allFields, e.name))
                }), this.columnFields = (e.columns || []).map(function(e) {
                    return e = t(e), r(l, u.Type.COLUMNS, e, n(l.allFields, e.name))
                }), this.dataFields = (e.data || []).map(function(e) {
                    return e = t(e), r(l, u.Type.DATA, e, n(l.allFields, e.name))
                }), this.dataFieldsCount = this.dataFields ? this.dataFields.length || 1 : 1;
                var c = {
                    subtotals: {
                        rows: void 0 !== l.rowSettings.subTotal.visible ? l.rowSettings.subTotal.visible : !0,
                        columns: void 0 !== l.columnSettings.subTotal.visible ? l.columnSettings.subTotal.visible : !0
                    }
                };
                this.getField = function(e) {
                    return n(l.allFields, e)
                }, this.getRowField = function(e) {
                    return n(l.rowFields, e)
                }, this.getColumnField = function(e) {
                    return n(l.columnFields, e)
                }, this.getDataField = function(e) {
                    return n(l.dataFields, e)
                }, this.availablefields = function() {
                    return l.allFields.filter(function(e) {
                        var t = function(t) {
                            return e.name !== t.name
                        };
                        return l.dataFields.every(t) && l.rowFields.every(t) && l.columnFields.every(t)
                    })
                }, this.getDataSourceFieldCaptions = function() {
                    var e;
                    if (l.dataSource && (e = l.dataSource[0])) {
                        for (var t = s.ownProperties(e), n = [], o = 0; o < t.length; o++) n.push(l.nameToCaption(t[o]));
                        return n
                    }
                    return null
                }, this.getPreFilters = function() {
                    var t = {};
                    return e.preFilters && s.ownProperties(e.preFilters).forEach(function(n) {
                        var o = e.preFilters[n];
                        if (s.isArray(o)) t[l.captionToName(n)] = new d.expressionFilter(null, null, o, !1);
                        else {
                            var r = s.ownProperties(o)[0];
                            r && (t[l.captionToName(n)] = new d.expressionFilter(r, o[r]))
                        }
                    }), t
                }, this.moveField = function(e, t, a, i) {
                    var s, c, d, p, h = n(l.allFields, e);
                    if (h) {
                        switch (t) {
                            case u.Type.ROWS:
                                s = l.rowFields;
                                break;
                            case u.Type.COLUMNS:
                                s = l.columnFields;
                                break;
                            case u.Type.DATA:
                                s = l.dataFields
                        }
                        switch (a) {
                            case u.Type.ROWS:
                                d = l.rowFields, p = l.getRowField(e);
                                break;
                            case u.Type.COLUMNS:
                                d = l.columnFields, p = l.getColumnField(e);
                                break;
                            case u.Type.DATA:
                                d = l.dataFields, p = l.getDataField(e)
                        }
                        if (s || d) {
                            var f = l.areSubtotalsVisible(a);
                            if (s) {
                                if (c = o(s, e), t === a && (c == s.length - 1 && null == i || c === i - 1)) return !1;
                                s.splice(c, 1)
                            }
                            var g = r(l, a, p, h);
                            return f || g.subTotal.visible === !1 || (g.subTotal.visible = null), d && (null != i ? d.splice(i, 0, g) : d.push(g)), l.dataFieldsCount = l.dataFields ? l.dataFields.length || 1 : 1, !0
                        }
                    }
                }, this.toggleSubtotals = function(e) {
                    var t, n, o = !l.areSubtotalsVisible(e);
                    if (e === u.Type.ROWS) c.subtotals.rows = o, n = l.rowFields;
                    else {
                        if (e !== u.Type.COLUMNS) return !1;
                        c.subtotals.columns = o, n = l.columnFields
                    }
                    for (o = o === !1 ? null : !0, t = 0; t < n.length; t++) n[t].subTotal.visible !== !1 && (n[t].subTotal.visible = o);
                    return !0
                }, this.areSubtotalsVisible = function(e) {
                    return e === u.Type.ROWS ? c.subtotals.rows : e === u.Type.COLUMNS ? c.subtotals.columns : null
                }, this.toggleGrandtotal = function(e) {
                    var t = !l.isGrandtotalVisible(e);
                    if (e === u.Type.ROWS) l.grandTotal.rowsvisible = t;
                    else {
                        if (e !== u.Type.COLUMNS) return !1;
                        l.grandTotal.columnsvisible = t
                    }
                    return !0
                }, this.isGrandtotalVisible = function(e) {
                    return e === u.Type.ROWS ? l.grandTotal.rowsvisible : e === u.Type.COLUMNS ? l.grandTotal.columnsvisible : !1
                }
            }
        }, {
            "./orb.aggregation": 2,
            "./orb.axe": 3,
            "./orb.filtering": 7,
            "./orb.themes": 11,
            "./orb.utils": 17
        }],
        5: [function(e, t) {
            t.exports = function(e, t, n, o, r, a, i) {
                var l = this;
                this.id = e, this.parent = t, this.value = n, this.isRoot = a, this.isLeaf = i, this.field = o, this.depth = r, this.values = [], this.subdimvals = {}, this.rowIndexes = null, this.getRowIndexes = function(e) {
                    if (null == l.rowIndexes) {
                        l.rowIndexes = [];
                        for (var t = 0; t < l.values.length; t++) l.subdimvals[l.values[t]].getRowIndexes(l.rowIndexes)
                    }
                    if (null != e) {
                        for (var n = 0; n < l.rowIndexes.length; n++) e.push(l.rowIndexes[n]);
                        return e
                    }
                    return l.rowIndexes
                }
            }
        }, {}],
        6: [function(e, t) {
            var n = e("./orb.utils"),
                o = e("./orb.ui.header"),
                r = e("./orb.themes"),
                a = "data:application/vnd.ms-excel;base64,",
                i = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv=Content-Type content="text/html; charset=UTF-8"><!--[if gte mso 9]><xml> <x:ExcelWorkbook>  <x:ExcelWorksheets>   <x:ExcelWorksheet>    <x:Name>###sheetname###</x:Name>    <x:WorksheetOptions>     <x:ProtectContents>False</x:ProtectContents>     <x:ProtectObjects>False</x:ProtectObjects>     <x:ProtectScenarios>False</x:ProtectScenarios>    </x:WorksheetOptions>   </x:ExcelWorksheet>  </x:ExcelWorksheets>  <x:ProtectStructure>False</x:ProtectStructure>  <x:ProtectWindows>False</x:ProtectWindows> </x:ExcelWorkbook></xml><![endif]--></head><body>',
                l = "</body></html>";
            t.exports = function(e) {
                function t(e) {
                    return "<td " + m + '><font color="' + h + '">' + e + "</font></td>"
                }

                function s(e, n, o, r) {
                    var a, i = r || "<tr>";
                    for (a = 0; n > a; a++) i += "<td></td>";
                    for (i += e.reduce(function(e, n) {
                            return e += t(n.caption)
                        }, ""), a = 0; o > a; a++) i += "<td></td>";
                    return i + "</tr>"
                }

                function u(e) {
                    return n.btoa(unescape(encodeURIComponent(e)))
                }
                var c = e.pgrid.config,
                    d = r.current();
                d = "bootstrap" === d ? "white" : d;
                var p = "white" === d,
                    h = p ? "black" : "white",
                    f = r.themes[d],
                    g = r.utils.fadeoutColor(f, .1),
                    m = 'style="font-weight: bold; color: ' + h + "; background-color: " + f + ';" bgcolor="' + f + '"',
                    v = 'style="background-color: ' + g + ';" bgcolor="' + g + '"',
                    b = Math.max(c.dataFields.length + 1, e.layout.pivotTable.width),
                    y = s(c.dataFields, 0, b - c.dataFields.length, '<tr><td><font color="#ccc">Data</font></td>'),
                    x = '<tr><td style="height: 22px;" colspan="' + b + '"></td></tr>',
                    C = s(c.columnFields, e.layout.rowHeaders.width, b - (e.layout.rowHeaders.width + c.columnFields.length)),
                    T = function() {
                        for (var n, r = "", a = 0; a < e.columns.headers.length; a++) {
                            var i = e.columns.headers[a],
                                l = "<tr>";
                            if (a < e.columns.headers.length - 1)
                                for (n = 0; n < e.layout.rowHeaders.width; n++) l += "<td></td>";
                            else l += c.rowFields.reduce(function(e, n) {
                                return e += t(n.caption)
                            }, "");
                            l += i.reduce(function(e, t) {
                                var n = t.type === o.HeaderType.DATA_HEADER ? t.value.caption : t.value;
                                return e += "<td " + v + ' colspan="' + t.hspan(!0) + '" rowspan="' + t.vspan(!0) + '">' + n + "</td>"
                            }, ""), r += l + "</tr>"
                        }
                        return r
                    }(),
                    w = function() {
                        for (var t = "", n = 0; n < e.rows.headers.length; n++) {
                            var o = e.rows.headers[n],
                                r = "<tr>";
                            r += o.reduce(function(e, t) {
                                return e += "<td " + v + ' colspan="' + t.hspan(!0) + '" rowspan="' + t.vspan(!0) + '">' + t.value + "</td>"
                            }, "");
                            var a = e.dataRows[n];
                            r += a.reduce(function(e, t, n) {
                                var o = c.dataFields[n %= c.dataFields.length].formatFunc,
                                    r = null == t.value ? "" : o ? o()(t.value) : t.value;
                                return e += "<td>" + r + "</td>"
                            }, ""), t += r + "</tr>"
                        }
                        return t
                    }();
                return a + u(i + "<table>" + y + x + C + T + w + "</table>" + l)
            }
        }, {
            "./orb.themes": 11,
            "./orb.ui.header": 14,
            "./orb.utils": 17
        }],
        7: [function(e, t) {
            var n = e("./orb.utils"),
                o = t.exports = {
                    ALL: "#All#",
                    NONE: "#None#",
                    BLANK: '#Blank#"'
                };
            o.expressionFilter = function(e, t, a, i) {
                var l = this;
                this.operator = r.get(e), this.regexpMode = !1, this.term = t || null, this.term && this.operator && this.operator.regexpSupported && n.isRegExp(this.term) && (this.regexpMode = !0, this.term.ignoreCase || (this.term = new RegExp(this.term.source, "i"))), this.staticValue = a, this.excludeStatic = i, this.test = function(e) {
                    if (n.isArray(l.staticValue)) {
                        var t = l.staticValue.indexOf(e) >= 0;
                        return l.excludeStatic && !t || !l.excludeStatic && t
                    }
                    return l.term ? l.operator.func(e, l.term) : l.staticValue === !0 || l.staticValue === o.ALL ? !0 : l.staticValue === !1 || l.staticValue === o.NONE ? !1 : !0
                }, this.isAlwaysTrue = function() {
                    return !(l.term || n.isArray(l.staticValue) || l.staticValue === o.NONE || l.staticValue === !1)
                }
            };
            var r = o.Operators = {
                get: function(e) {
                    switch (e) {
                        case r.MATCH.name:
                            return r.MATCH;
                        case r.NOTMATCH.name:
                            return r.NOTMATCH;
                        case r.EQ.name:
                            return r.EQ;
                        case r.NEQ.name:
                            return r.NEQ;
                        case r.GT.name:
                            return r.GT;
                        case r.GTE.name:
                            return r.GTE;
                        case r.LT.name:
                            return r.LT;
                        case r.LTE.name:
                            return r.LTE;
                        default:
                            return r.NONE
                    }
                },
                NONE: null,
                MATCH: {
                    name: "Matches",
                    func: function(e, t) {
                        return e ? e.toString().search(n.isRegExp(t) ? t : new RegExp(t, "i")) >= 0 : !t
                    },
                    regexpSupported: !0
                },
                NOTMATCH: {
                    name: "Does Not Match",
                    func: function(e, t) {
                        return e ? e.toString().search(n.isRegExp(t) ? t : new RegExp(t, "i")) < 0 : !!t
                    },
                    regexpSupported: !0
                },
                EQ: {
                    name: "=",
                    func: function(e, t) {
                        return e == t
                    },
                    regexpSupported: !1
                },
                NEQ: {
                    name: "<>",
                    func: function(e, t) {
                        return e != t
                    },
                    regexpSupported: !1
                },
                GT: {
                    name: ">",
                    func: function(e, t) {
                        return e > t
                    },
                    regexpSupported: !1
                },
                GTE: {
                    name: ">=",
                    func: function(e, t) {
                        return e >= t
                    },
                    regexpSupported: !1
                },
                LT: {
                    name: "<",
                    func: function(e, t) {
                        return t > e
                    },
                    regexpSupported: !1
                },
                LTE: {
                    name: "<=",
                    func: function(e, t) {
                        return t >= e
                    },
                    regexpSupported: !1
                }
            }
        }, {
            "./orb.utils": 17
        }],
        8: [function(e, t) {
            var n = e("./orb.axe"),
                o = e("./orb.config").config,
                r = e("./orb.filtering"),
                a = e("./orb.query"),
                i = e("./orb.utils");
            t.exports = function(e) {
                function t(e) {
                    e !== !1 && l(), h.rows.update(), h.columns.update(), c()
                }

                function l() {
                    var e = i.ownProperties(h.filters);
                    if (e.length > 0) {
                        h.filteredDataSource = [];
                        for (var t = 0; t < h.config.dataSource.length; t++) {
                            for (var n = h.config.dataSource[t], o = !1, r = 0; r < e.length; r++) {
                                var a = e[r],
                                    l = h.filters[a];
                                if (l && !l.test(n[a])) {
                                    o = !0;
                                    break
                                }
                            }
                            o || h.filteredDataSource.push(n)
                        }
                    } else h.filteredDataSource = h.config.dataSource
                }

                function s(e, t, n, o, r) {
                    var a = {};
                    if (h.config.dataFieldsCount > 0) {
                        var i;
                        if (null == e) i = t;
                        else if (null == t) i = e;
                        else {
                            i = [];
                            for (var l = 0; l < e.length; l++) {
                                var s = e[l];
                                if (s >= 0) {
                                    var u = t.indexOf(s);
                                    u >= 0 && (e[l] = 0 - (s + 2), i.push(s))
                                }
                            }
                        }
                        var c, d = i && 0 === i.length,
                            f = (h.filteredDataSource, []);
                        if (o)
                            for (var g = 0; g < o.length; g++) c = h.config.getDataField(o[g]), r || (c ? r = c.aggregateFunc() : (c = h.config.getField(o[g]), c && (r = c.dataSettings ? c.dataSettings.aggregateFunc() : c.aggregateFunc()))), c && r && f.push({
                                field: c,
                                aggregateFunc: r
                            });
                        else
                            for (var m = 0; m < h.config.dataFieldsCount; m++) c = h.config.dataFields[m] || p, (r || c.aggregateFunc) && f.push({
                                field: c,
                                aggregateFunc: r || c.aggregateFunc()
                            });
                        for (var v = 0; v < f.length; v++) c = f[v], a[c.field.name] = d ? null : c.aggregateFunc(c.field.name, i || "all", h.filteredDataSource, n || e, t)
                    }
                    return a
                }

                function u(e) {
                    if (e) {
                        var t = {},
                            n = "r" + e.id;
                        if (void 0 === d[n] && (d[n] = e.isRoot ? null : d[e.parent.id] || e.getRowIndexes()), t[h.columns.root.id] = s(e.isRoot ? null : d[n].slice(0), null), h.columns.dimensionsCount > 0)
                            for (var o = 0, r = [h.columns.root]; o < r.length;) {
                                for (var a = r[o], i = e.isRoot ? null : a.isRoot ? d[n].slice(0) : d["c" + a.id].slice(0), l = 0; l < a.values.length; l++) {
                                    var u = a.subdimvals[a.values[l]],
                                        c = "c" + u.id;
                                    if (void 0 === d[c] && (d[c] = d[c] || u.getRowIndexes().slice(0)), t[u.id] = s(i, d[c], e.isRoot ? null : e.getRowIndexes()), !u.isLeaf && (r.push(u), i)) {
                                        d[c] = [];
                                        for (var p = 0; p < i.length; p++) {
                                            var f = i[p]; - 1 != f && 0 > f && (d[c].push(0 - (f + 2)), i[p] = -1)
                                        }
                                    }
                                }
                                d["c" + a.id] = void 0, o++
                            }
                        return t
                    }
                }

                function c() {
                    if (h.dataMatrix = {}, d = {}, h.dataMatrix[h.rows.root.id] = u(h.rows.root), h.rows.dimensionsCount > 0)
                        for (var e, t = [h.rows.root], n = 0; n < t.length;) {
                            e = t[n];
                            for (var o = 0; o < e.values.length; o++) {
                                var r = e.subdimvals[e.values[o]];
                                h.dataMatrix[r.id] = u(r), r.isLeaf || t.push(r)
                            }
                            n++
                        }
                }
                var d, p = {
                        name: "#undefined#"
                    },
                    h = this;
                this.config = new o(e), this.filters = h.config.getPreFilters(), this.filteredDataSource = h.config.dataSource, this.rows = new n(h, n.Type.ROWS), this.columns = new n(h, n.Type.COLUMNS), this.dataMatrix = {}, this.moveField = function(e, n, o, r) {
                    return h.config.moveField(e, n, o, r) ? (t(!1), !0) : !1
                }, this.applyFilter = function(e, n, o, a, i) {
                    h.filters[e] = new r.expressionFilter(n, o, a, i), t()
                }, this.refreshData = function(e) {
                    h.config.dataSource = e, t()
                }, this.getFieldValues = function(e, t) {
                    for (var n = [], o = [], r = !1, a = 0; a < h.config.dataSource.length; a++) {
                        var l = h.config.dataSource[a],
                            s = l[e];
                        void 0 !== t ? (t === !0 || "function" == typeof t && t(s)) && n.push(s) : s ? n.push(s) : r = !0
                    }
                    if (n.length > 1) {
                        i.isNumber(n[0]) || i.isDate(n[0]) ? n.sort(function(e, t) {
                            return e ? t ? e - t : 1 : t ? -1 : 0
                        }) : n.sort();
                        for (var u = 0; u < n.length; u++)(0 === u || n[u] !== o[o.length - 1]) && o.push(n[u])
                    } else o = n;
                    return o.containsBlank = r, o
                }, this.getFieldFilter = function(e) {
                    return h.filters[e]
                }, this.isFieldFiltered = function(e) {
                    var t = h.getFieldFilter(e);
                    return null != t && !t.isAlwaysTrue()
                }, this.getData = function(e, t, n, o) {
                    var r;
                    if (t && n) {
                        var a = e || (h.config.dataFields[0] || p).name,
                            i = h.config.getDataField(a);
                        r = !i || o && i.aggregateFunc != o ? h.calcAggregation(t.isRoot ? null : t.getRowIndexes().slice(0), n.isRoot ? null : n.getRowIndexes().slice(0), [a], o)[a] : h.dataMatrix[t.id] && h.dataMatrix[t.id][n.id] ? h.dataMatrix[t.id][n.id][a] : null
                    }
                    return void 0 === r ? null : r
                }, this.calcAggregation = function(e, t, n, o) {
                    return s(e, t, e, n, o)
                }, this.query = a(h), t()
            }
        }, {
            "./orb.axe": 3,
            "./orb.config": 4,
            "./orb.filtering": 7,
            "./orb.query": 9,
            "./orb.utils": 17
        }],
        9: [function(e, t) {
            var n = e("./orb.utils"),
                o = e("./orb.axe"),
                r = e("./orb.aggregation"),
                a = function(e, t, o) {
                    var a = this;
                    this.source = e, this.query = t, this.filters = o, this.extractResult = function(e, t, n) {
                        if (n.multi === !0) {
                            for (var o = {}, r = 0; r < t.multiFieldNames.length; r++) o[t.multiFieldNames[r]] = e[a.getCaptionName(t.multiFieldNames[r])];
                            return o
                        }
                        return e[n.datafieldname]
                    }, this.measureFunc = function(e, t, n, o) {
                        var r = {
                            datafieldname: a.getCaptionName(e),
                            multi: t,
                            aggregateFunc: n
                        };
                        return function(e) {
                            e = a.cleanOptions(e, arguments, r);
                            var n = a.compute(e, o, t);
                            return a.extractResult(n, e, r)
                        }
                    }, this.setDefaultAggFunctions = function(e) {
                        var t = a.query.val ? "val_" : "val";
                        a.query[t] = a.measureFunc(void 0, !0, void 0, e);
                        for (var o = n.ownProperties(r), i = 0; i < o.length; i++) {
                            var l = o[i];
                            "toAggregateFunc" !== l && (a.query[l] = a.measureFunc(void 0, !0, r[l], e))
                        }
                    }
                },
                i = function(e) {
                    function t(e, t) {
                        return function(n) {
                            return n.value === t.val && (!e || e.some(function(e) {
                                var t = n.parent;
                                if (t)
                                    for (; t.depth < e.depth;) t = t.parent;
                                return t === e
                            }))
                        }
                    }
                    a.call(this, e, {}, {});
                    var n = this;
                    this.getCaptionName = function(e) {
                        return n.source.config.captionToName(e)
                    }, this.cleanOptions = function(e, t, o) {
                        var a = {
                            fieldNames: []
                        };
                        if (o.multi === !0) {
                            e && "object" == typeof e ? (a.aggregateFunc = e.aggregateFunc, a.multiFieldNames = e.fields) : (a.aggregateFunc = o.aggregateFunc, a.multiFieldNames = t);
                            for (var i = 0; i < a.multiFieldNames.length; i++) a.fieldNames.push(n.getCaptionName(a.multiFieldNames[i]))
                        } else a.aggregateFunc = e, a.fieldNames.push(o.datafieldname);
                        return a.aggregateFunc && (a.aggregateFunc = r.toAggregateFunc(a.aggregateFunc)), a
                    }, this.setup = function(e) {
                        var t, r = n.source.config.rowFields,
                            a = n.source.config.columnFields,
                            i = n.source.config.dataFields;
                        for (t = 0; t < r.length; t++) n.slice(r[t], o.Type.ROWS, r.length - t);
                        for (t = 0; t < a.length; t++) n.slice(a[t], o.Type.COLUMNS, a.length - t);
                        for (t = 0; t < i.length; t++) {
                            var l = i[t],
                                s = l.name,
                                u = l.caption || s;
                            n.query[s] = n.query[u] = n.measureFunc(s)
                        }
                        if (e)
                            for (var c in e) e.hasOwnProperty(c) && n.query[c](e[c]);
                        return n.setDefaultAggFunctions(), n.query
                    }, this.slice = function(e, t, o) {
                        n.query[e.name] = n.query[e.caption || e.name] = function(r) {
                            var a = {
                                name: e.name,
                                val: r,
                                depth: o
                            };
                            return (n.filters[t] = n.filters[t] || []).push(a), n.query
                        }
                    }, this.applyFilters = function(e) {
                        if (n.filters[e]) {
                            for (var r = n.filters[e].sort(function(e, t) {
                                    return t.depth - e.depth
                                }), a = n.source[e === o.Type.ROWS ? "rows" : "columns"], i = 0, l = null; i < r.length;) {
                                var s = r[i];
                                l = a.dimensionsByDepth[s.depth].filter(t(l, s)), i++
                            }
                            return l
                        }
                        return null
                    }, this.compute = function(e) {
                        var t, r = n.applyFilters(o.Type.ROWS) || [n.source.rows.root],
                            a = n.applyFilters(o.Type.COLUMNS) || [n.source.columns.root];
                        if (1 === r.length && 1 === a.length) {
                            t = {};
                            for (var i = 0; i < e.fieldNames.length; i++) t[e.fieldNames[i]] = n.source.getData(e.fieldNames[i], r[0], a[0], e.aggregateFunc)
                        } else {
                            for (var l = [], s = [], u = 0; u < r.length; u++) l = l.concat(r[u].getRowIndexes());
                            for (var c = 0; c < a.length; c++) s = s.concat(a[c].getRowIndexes());
                            t = n.source.calcAggregation(l, s, e.fieldNames, e.aggregateFunc)
                        }
                        return t
                    }
                },
                l = function(e) {
                    a.call(this, e, {}, []);
                    var t = this,
                        o = {};
                    this.setCaptionName = function(e, t) {
                        o[e || t] = t
                    }, this.getCaptionName = function(e) {
                        return o[e] || e
                    }, this.cleanOptions = function(e, n, o) {
                        var r = {
                            fieldNames: []
                        };
                        if (o.multi === !0) {
                            e && "object" == typeof e ? (r.aggregateFunc = e.aggregateFunc, r.multiFieldNames = e.fields) : (r.aggregateFunc = o.aggregateFunc, r.multiFieldNames = n);
                            for (var a = 0; a < r.multiFieldNames.length; a++) r.fieldNames.push(t.getCaptionName(r.multiFieldNames[a]))
                        } else r.aggregateFunc = e || o.aggregateFunc, r.fieldNames.push(o.datafieldname);
                        return r
                    }, this.setup = function(e) {
                        if (t.query.slice = function(e, n) {
                                var o = {
                                    name: e,
                                    val: n
                                };
                                return t.filters.push(o), t.query
                            }, e)
                            for (var o = n.ownProperties(e), r = 0; r < o.length; r++) {
                                var a = o[r],
                                    i = e[a],
                                    l = i.caption || i.name;
                                i.name = a, t.setCaptionName(l, a), i.toAggregate ? t.query[a] = t.query[l] = t.measureFunc(a, !1, i.aggregateFunc) : t.slice(i)
                            }
                        return t.setDefaultAggFunctions(e), t.query
                    }, this.slice = function(e) {
                        t.query[e.name] = t.query[e.caption || e.name] = function(n) {
                            return t.query.slice(e.name, n)
                        }
                    }, this.applyFilters = function() {
                        for (var e = [], n = 0; n < t.source.length; n++) {
                            for (var o = t.source[n], r = !0, a = 0; a < t.filters.length; a++) {
                                var i = t.filters[a];
                                if (o[i.name] !== i.val) {
                                    r = !1;
                                    break
                                }
                            }
                            r && e.push(n)
                        }
                        return e
                    }, this.compute = function(e, n, o) {
                        for (var a = t.applyFilters(), i = {}, l = 0; l < e.fieldNames.length; l++) {
                            var s = e.fieldNames[l],
                                u = r.toAggregateFunc(o === !0 ? e.aggregateFunc || (n && n[s] ? n[s].aggregateFunc : void 0) : e.aggregateFunc);
                            i[s] = u(s, a || "all", t.source, a, null)
                        }
                        return i
                    }
                };
            t.exports = function(e, t) {
                return n.isArray(e) ? new l(e).setup(t) : function(t) {
                    return new i(e).setup(t)
                }
            }
        }, {
            "./orb.aggregation": 2,
            "./orb.axe": 3,
            "./orb.utils": 17
        }],
        10: [function(e, t) {
            t.exports = function() {
                var e = {};
                this.set = function(t, n) {
                    e[t] = n
                }, this.get = function(t) {
                    return e[t]
                }
            }
        }, {}],
        11: [function(e, t) {
            t.exports = function() {
                function e() {
                    return "bootstrap" === t
                }
                var t = "blue",
                    n = {};
                n.themes = {
                    red: "#C72C48",
                    blue: "#5bc0de",
                    green: "#3fb618",
                    orange: "#df691a",
                    flower: "#A74AC7",
                    gray: "#808080",
                    black: "#000000",
                    white: "#FFFFFF"
                }, n.current = function(e) {
                    return e && (t = n.validateTheme(e)), t
                }, n.validateTheme = function(e) {
                    return e = (e || "").toString().trim(), n.themes[e] || "bootstrap" === e ? e : "blue"
                }, n.getPivotClasses = function() {
                    return {
                        container: "orb-container orb-" + t,
                        table: "orb" + (e() ? " table" : "")
                    }
                }, n.getButtonClasses = function() {
                    return {
                        pivotButton: "fld-btn" + (e() ? " btn btn-default btn-xs" : ""),
                        orbButton: "orb-btn" + (e() ? " btn btn-default btn-xs" : ""),
                        scrollBar: e() ? " btn btn-default btn-xs" : ""
                    }
                }, n.getFilterClasses = function() {
                    return {
                        container: "orb-" + t + " orb fltr-cntnr"
                    }
                }, n.getGridClasses = function() {
                    return {
                        table: e() ? "table table-condensed" : "orb-table"
                    }
                }, n.getDialogClasses = function(n) {
                    var o = {
                        overlay: "orb-overlay orb-overlay-" + (n ? "visible" : "hidden") + " orb-" + t,
                        dialog: "orb-dialog",
                        content: "",
                        header: "orb-dialog-header",
                        title: "",
                        body: "orb-dialog-body"
                    };
                    return e() && (o.overlay += " modal", o.dialog += " modal-dialog", o.content = "modal-content", o.header += " modal-header", o.title = "modal-title", o.body += " modal-body"), o
                };
                var o = n.utils = {
                    hexToRgb: function(e) {
                        var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
                        return t ? {
                            r: parseInt(t[1], 16),
                            g: parseInt(t[2], 16),
                            b: parseInt(t[3], 16)
                        } : null
                    },
                    rgbaToHex: function(e) {
                        var t = e.match(/rgba\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+(?:\.\d+)?)\s*\)/);
                        if (t) {
                            var n = parseFloat(t[4]);
                            return "#" + o.applyAlphaAndToHex(t[1], n) + o.applyAlphaAndToHex(t[2], n) + o.applyAlphaAndToHex(t[3], n)
                        }
                        return null
                    },
                    applyAlphaAndToHex: function(e, t) {
                        return (Math.floor(t * parseInt(e) + 255 * (1 - t)) + 256).toString(16).substr(1, 2)
                    },
                    fadeoutColor: function(e, t) {
                        return e = o.hexToRgb(e), "#" + o.applyAlphaAndToHex(e.r, t) + o.applyAlphaAndToHex(e.g, t) + o.applyAlphaAndToHex(e.b, t)
                    }
                };
                return n
            }()
        }, {}],
        12: [function(e, t) {
            var n = e("./orb.axe"),
                o = e("./orb.ui.header");
            t.exports = function(e) {
                var t = this;
                this.axe = e, this.headers = [], this.dataFieldsCount = function() {
                    return "columns" === t.axe.pgrid.config.dataHeadersLocation && t.axe.type === n.Type.COLUMNS || "rows" === t.axe.pgrid.config.dataHeadersLocation && t.axe.type === n.Type.ROWS ? t.axe.pgrid.config.dataFieldsCount : 1
                }, this.isMultiDataFields = function() {
                    return t.dataFieldsCount() > 1
                }, this.toggleFieldExpansion = function(e, t) {
                    for (var n, r = [], a = !0, i = 0; i < this.headers.length; i++)
                        for (n = 0; n < this.headers[i].length; n++) {
                            var l = this.headers[i][n];
                            l.type !== o.HeaderType.SUB_TOTAL || null != e && l.dim.field.name != e.name || (r.push(l), a = a && l.expanded)
                        }
                    if (void 0 !== t && (a = !t), r.length > 0) {
                        for (n = 0; n < r.length; n++) a ? r[n].collapse() : r[n].expand();
                        return !0
                    }
                    return !1
                }
            }
        }, {
            "./orb.axe": 3,
            "./orb.ui.header": 14
        }],
        13: [function(e, t) {
            var n = e("./orb.axe"),
                o = e("./orb.ui.axe"),
                r = e("./orb.ui.header");
            t.exports = function(e) {
                function t() {
                    function e(e) {
                        e && e.dim.field.subTotal.visible && t.push(e.subtotalHeader)
                    }
                    var t = [];
                    if (i.headers.length > 0) {
                        var n = i.headers[i.headers.length - 1],
                            o = n[0];
                        if (o) {
                            for (var a, l = o.parent, s = 0; s < n.length; s++) {
                                if (o = n[s], a = o.parent, a != l) {
                                    if (e(l), null != a)
                                        for (var u = a.parent, c = l ? l.parent : null; u != c && null != c;) e(c), u = u ? u.parent : null, c = c ? c.parent : null;
                                    l = a
                                }
                                if (t.push(n[s]), s === n.length - 1)
                                    for (; null != l;) e(l), l = l.parent
                            }
                            i.axe.pgrid.config.grandTotal.columnsvisible && i.axe.dimensionsCount > 1 && t.push(i.headers[0][i.headers[0].length - 1])
                        }
                    }
                    if (i.isMultiDataFields()) {
                        i.leafsHeaders = [];
                        for (var d = 0; d < t.length; d++)
                            for (var p = 0; p < i.dataFieldsCount(); p++) i.leafsHeaders.push(new r.dataHeader(i.axe.pgrid.config.dataFields[p], t[d]));
                        i.headers.push(i.leafsHeaders)
                    } else i.leafsHeaders = t
                }

                function a(e, t) {
                    for (var o = t[t.length - 1], a = i.axe.root.depth === e ? [null] : t[i.axe.root.depth - e - 1].filter(function(e) {
                            return e.type !== r.HeaderType.SUB_TOTAL
                        }), l = 0; l < a.length; l++)
                        for (var s = a[l], u = null == s ? i.axe.root : s.dim, c = 0; c < u.values.length; c++) {
                            var d, p = u.values[c],
                                h = u.subdimvals[p];
                            d = !h.isLeaf && h.field.subTotal.visible ? new r.header(n.Type.COLUMNS, r.HeaderType.SUB_TOTAL, h, s, i.dataFieldsCount()) : null;
                            var f = new r.header(n.Type.COLUMNS, null, h, s, i.dataFieldsCount(), d);
                            o.push(f), !h.isLeaf && h.field.subTotal.visible && o.push(d)
                        }
                }
                var i = this;
                o.call(i, e), this.leafsHeaders = null, this.build = function() {
                    if (i.headers = [], null != i.axe) {
                        if (i.axe.root.values.length > 0 || i.axe.pgrid.config.grandTotal.columnsvisible) {
                            for (var e = i.axe.root.depth; e > 1; e--) i.headers.push([]), a(e, i.headers);
                            i.axe.pgrid.config.grandTotal.columnsvisible && (i.headers[0] = i.headers[0] || []).push(new r.header(n.Type.COLUMNS, r.HeaderType.GRAND_TOTAL, i.axe.root, null, i.dataFieldsCount()))
                        }
                        0 === i.headers.length && i.headers.push([new r.header(n.Type.COLUMNS, r.HeaderType.INNER, i.axe.root, null, i.dataFieldsCount())]), t()
                    }
                }, this.build()
            }
        }, {
            "./orb.axe": 3,
            "./orb.ui.axe": 12,
            "./orb.ui.header": 14
        }],
        14: [function(e, t) {
            function n(e) {
                this.axetype = e.axetype, this.type = e.type, this.template = e.template, this.value = e.value, this.expanded = !0, this.cssclass = e.cssclass, this.hspan = e.hspan || function() {
                    return 1
                }, this.vspan = e.vspan || function() {
                    return 1
                }, this.visible = e.isvisible || function() {
                    return !0
                }, this.key = this.axetype + this.type + this.value, this.getState = function() {
                    return r.get(this.key)
                }, this.setState = function(e) {
                    r.set(this.key, e)
                }
            }
            var o = e("./orb.axe"),
                r = new(e("./orb.state")),
                a = t.exports.HeaderType = {
                    EMPTY: 1,
                    DATA_HEADER: 2,
                    DATA_VALUE: 3,
                    FIELD_BUTTON: 4,
                    INNER: 5,
                    WRAPPER: 6,
                    SUB_TOTAL: 7,
                    GRAND_TOTAL: 8,
                    getHeaderClass: function(e, t) {
                        var n = t === o.Type.ROWS ? "header-row" : t === o.Type.COLUMNS ? "header-col" : "";
                        switch (e) {
                            case a.EMPTY:
                            case a.FIELD_BUTTON:
                                n = "empty";
                                break;
                            case a.INNER:
                                n = "header " + n;
                                break;
                            case a.WRAPPER:
                                n = "header " + n;
                                break;
                            case a.SUB_TOTAL:
                                n = "header header-st " + n;
                                break;
                            case a.GRAND_TOTAL:
                                n = "header header-gt " + n
                        }
                        return n
                    },
                    getCellClass: function(e, t) {
                        var n = "";
                        switch (e) {
                            case a.GRAND_TOTAL:
                                n = "cell-gt";
                                break;
                            case a.SUB_TOTAL:
                                n = t === a.GRAND_TOTAL ? "cell-gt" : "cell-st";
                                break;
                            default:
                                n = t === a.GRAND_TOTAL ? "cell-gt" : t === a.SUB_TOTAL ? "cell-st" : ""
                        }
                        return n
                    }
                };
            t.exports.header = function(e, t, r, i, l, s) {
                function u() {
                    if (f.type === a.SUB_TOTAL) {
                        for (var e = f.parent; null != e;) {
                            if (e.subtotalHeader && !e.subtotalHeader.expanded) return !1;
                            e = e.parent
                        }
                        return !0
                    }
                    var t = f.dim.isRoot || f.dim.isLeaf || !f.dim.field.subTotal.visible || f.subtotalHeader.expanded;
                    if (!t) return !1;
                    for (var n = f.parent; null != n && (!n.dim.field.subTotal.visible || null != n.subtotalHeader && n.subtotalHeader.expanded);) n = n.parent;
                    return null == n || null == n.subtotalHeader ? t : n.subtotalHeader.expanded
                }

                function c(e) {
                    var t, n = 0,
                        o = !1;
                    if (g || e || f.visible()) {
                        if (f.dim.isLeaf) return l;
                        if (f.subheaders.length > 0)
                            for (var r = 0; r < f.subheaders.length; r++) {
                                var a = f.subheaders[r];
                                a.dim.isLeaf ? n += l : (t = g ? a.vspan() : a.hspan(), n += t, 0 === r && 0 === t && (o = !0))
                            } else n += l;
                        return n + (o ? 1 : 0)
                    }
                    return n
                }
                var d, p, h, f = this,
                    g = e === o.Type.ROWS;
                switch (t = t || (1 === r.depth ? a.INNER : a.WRAPPER)) {
                    case a.GRAND_TOTAL:
                        h = "Grand Total", d = g ? r.depth - 1 || 1 : l, p = g ? l : r.depth - 1 || 1;
                        break;
                    case a.SUB_TOTAL:
                        h = r.value, d = g ? r.depth : l, p = g ? l : r.depth;
                        break;
                    default:
                        h = r.value, d = g ? 1 : null, p = g ? null : 1
                }
                n.call(this, {
                    axetype: e,
                    type: t,
                    template: g ? "cell-template-row-header" : "cell-template-column-header",
                    value: h,
                    cssclass: a.getHeaderClass(t, e),
                    hspan: null != d ? function() {
                        return d
                    } : c,
                    vspan: null != p ? function() {
                        return p
                    } : c,
                    isvisible: u
                }), this.subtotalHeader = s, this.parent = i, this.subheaders = [], this.dim = r, this.expanded = this.getState() ? this.getState().expanded : t !== a.SUB_TOTAL || !r.field.subTotal.collapsed, this.expand = function() {
                    f.expanded = !0, this.setState({
                        expanded: f.expanded
                    })
                }, this.collapse = function() {
                    f.expanded = !1, this.setState({
                        expanded: f.expanded
                    })
                }, null != i && i.subheaders.push(this)
            }, t.exports.dataHeader = function(e, t) {
                n.call(this, {
                    axetype: null,
                    type: a.DATA_HEADER,
                    template: "cell-template-dataheader",
                    value: e,
                    cssclass: a.getHeaderClass(t.type, t.axetype),
                    isvisible: t.visible
                }), this.parent = t
            }, t.exports.dataCell = function(e, t, o, r) {
                this.rowDimension = o.type === a.DATA_HEADER ? o.parent.dim : o.dim, this.columnDimension = r.type === a.DATA_HEADER ? r.parent.dim : r.dim, this.rowType = o.type === a.DATA_HEADER ? o.parent.type : o.type, this.colType = r.type === a.DATA_HEADER ? r.parent.type : r.type, this.datafield = e.config.dataFieldsCount > 1 ? "rows" === e.config.dataHeadersLocation ? o.value : r.value : e.config.dataFields[0], n.call(this, {
                    axetype: null,
                    type: a.DATA_VALUE,
                    template: "cell-template-datavalue",
                    value: e.getData(this.datafield ? this.datafield.name : null, this.rowDimension, this.columnDimension),
                    cssclass: "cell " + a.getCellClass(this.rowType, this.colType),
                    isvisible: t
                })
            }, t.exports.buttonCell = function(e) {
                n.call(this, {
                    axetype: null,
                    type: a.FIELD_BUTTON,
                    template: "cell-template-fieldbutton",
                    value: e,
                    cssclass: a.getHeaderClass(a.FIELD_BUTTON)
                })
            }, t.exports.emptyCell = function(e, t) {
                n.call(this, {
                    axetype: null,
                    type: a.EMPTY,
                    template: "cell-template-empty",
                    value: null,
                    cssclass: a.getHeaderClass(a.EMPTY),
                    hspan: function() {
                        return e
                    },
                    vspan: function() {
                        return t
                    }
                })
            }
        }, {
            "./orb.axe": 3,
            "./orb.state": 10
        }],
        15: [function(e, t) {
            var n = e("./orb.axe"),
                o = e("./orb.pgrid"),
                r = e("./orb.ui.header"),
                a = e("./orb.ui.rows"),
                i = e("./orb.ui.cols"),
                l = e("./react/orb.react.compiled");
            t.exports = function(e) {
                function t() {
                    function e(e, t) {
                        return function() {
                            return e() && t()
                        }
                    }
                    c.rows = new a(c.pgrid.rows), c.columns = new i(c.pgrid.columns);
                    var t = c.rows.headers,
                        n = c.columns.leafsHeaders;
                    c.layout = {
                        rowHeaders: {
                            width: (c.pgrid.rows.fields.length || 1) + ("rows" === c.pgrid.config.dataHeadersLocation && c.pgrid.config.dataFieldsCount > 1 ? 1 : 0),
                            height: t.length
                        },
                        columnHeaders: {
                            width: c.columns.leafsHeaders.length,
                            height: (c.pgrid.columns.fields.length || 1) + ("columns" === c.pgrid.config.dataHeadersLocation && c.pgrid.config.dataFieldsCount > 1 ? 1 : 0)
                        }
                    }, c.layout.pivotTable = {
                        width: c.layout.rowHeaders.width + c.layout.columnHeaders.width,
                        height: c.layout.rowHeaders.height + c.layout.columnHeaders.height
                    };
                    var o, l = [];
                    if (t.length > 0)
                        for (var s = 0; s < t.length; s++) {
                            var u = t[s],
                                d = u[u.length - 1];
                            o = [];
                            for (var p = 0; p < n.length; p++) {
                                var h = n[p],
                                    f = e(d.visible, h.visible);
                                o[p] = new r.dataCell(c.pgrid, f, d, h)
                            }
                            l.push(o)
                        }
                    c.dataRows = l
                }
                var s, u, c = this,
                    d = l.Dialog.create();
                this.pgrid = new o(e), this.rows = null, this.columns = null, this.dataRows = [], this.layout = {
                    rowHeaders: {
                        width: null,
                        height: null
                    },
                    columnHeaders: {
                        width: null,
                        height: null
                    },
                    pivotTable: {
                        width: null,
                        height: null
                    }
                }, this.sort = function(e, o) {
                    if (e === n.Type.ROWS) c.pgrid.rows.sort(o);
                    else {
                        if (e !== n.Type.COLUMNS) return;
                        c.pgrid.columns.sort(o)
                    }
                    t()
                }, this.refreshData = function(e) {
                    c.pgrid.refreshData(e), t(), u.setProps({})
                }, this.applyFilter = function(e, n, o, r, a) {
                    c.pgrid.applyFilter(e, n, o, r, a), t()
                }, this.moveField = function(e, n, o, r) {
                    return c.pgrid.moveField(e, n, o, r) ? (t(), !0) : !1
                }, this.toggleFieldExpansion = function(e, t, o) {
                    return e === n.Type.ROWS ? c.rows.toggleFieldExpansion(t, o) : e === n.Type.COLUMNS ? c.columns.toggleFieldExpansion(t, o) : !1
                }, this.toggleSubtotals = function(e) {
                    return c.pgrid.config.toggleSubtotals(e) ? (t(), !0) : !1
                }, this.areSubtotalsVisible = function(e) {
                    return c.pgrid.config.areSubtotalsVisible(e)
                }, this.toggleGrandtotal = function(e) {
                    return c.pgrid.config.toggleGrandtotal(e) ? (t(), !0) : !1
                }, this.isGrandtotalVisible = function(e) {
                    return c.pgrid.config.isGrandtotalVisible(e)
                }, this.changeTheme = function(e) {
                    u.changeTheme(e)
                }, this.render = function(e) {
                    if (s = e) {
                        var t = React.createFactory(l.PivotTable),
                            n = t({
                                pgridwidget: c
                            });
                        u = React.render(n, e)
                    }
                }, this.drilldown = function(e) {
                    if (e) {
                        var t, n = e.columnDimension.getRowIndexes(),
                            o = e.rowDimension.getRowIndexes().filter(function(e) {
                                return n.indexOf(e) >= 0
                            }).map(function(e) {
                                return c.pgrid.filteredDataSource[e]
                            });
                        t = e.rowType === r.HeaderType.GRAND_TOTAL && e.colType === r.HeaderType.GRAND_TOTAL ? "Grand total" : e.rowType === r.HeaderType.GRAND_TOTAL ? e.columnDimension.value + "/Grand total " : e.colType === r.HeaderType.GRAND_TOTAL ? e.rowDimension.value + "/Grand total " : e.rowDimension.value + "/" + e.columnDimension.value;
                        var a = window.getComputedStyle(u.getDOMNode(), null);
                        d.show({
                            title: t,
                            comp: {
                                type: l.Grid,
                                props: {
                                    headers: c.pgrid.config.getDataSourceFieldCaptions(),
                                    data: o,
                                    theme: c.pgrid.config.theme
                                }
                            },
                            theme: c.pgrid.config.theme,
                            style: {
                                fontFamily: a.getPropertyValue("font-family"),
                                fontSize: a.getPropertyValue("font-size")
                            }
                        })
                    }
                }, t()
            }
        }, {
            "./orb.axe": 3,
            "./orb.pgrid": 8,
            "./orb.ui.cols": 13,
            "./orb.ui.header": 14,
            "./orb.ui.rows": 16,
            "./react/orb.react.compiled": 18
        }],
        16: [function(e, t) {
            var n = e("./orb.axe"),
                o = e("./orb.ui.axe"),
                r = e("./orb.ui.header");
            t.exports = function(e) {
                function t(e, t) {
                    if (i.isMultiDataFields())
                        for (var n = e[e.length - 1], o = 0; o < i.dataFieldsCount(); o++) n.push(new r.dataHeader(i.axe.pgrid.config.dataFields[o], t)), o < i.dataFieldsCount() - 1 && e.push(n = [])
                }

                function a(e, o) {
                    if (o.values.length > 0)
                        for (var l = e.length - 1, s = e[l], u = s.length > 0 ? s[s.length - 1] : null, c = 0; c < o.values.length; c++) {
                            var d, p = o.values[c],
                                h = o.subdimvals[p];
                            d = !h.isLeaf && h.field.subTotal.visible ? new r.header(n.Type.ROWS, r.HeaderType.SUB_TOTAL, h, u, i.dataFieldsCount()) : null;
                            var f = new r.header(n.Type.ROWS, null, h, u, i.dataFieldsCount(), d);
                            c > 0 && e.push(s = []), s.push(f), h.isLeaf ? t(e, f) : (a(e, h), h.field.subTotal.visible && (e.push([d]), t(e, d)))
                        }
                }
                var i = this;
                o.call(i, e), this.build = function() {
                    var e, o = [];
                    if (null != i.axe) {
                        if ((i.axe.root.values.length > 0 || i.axe.pgrid.config.grandTotal.rowsvisible) && (o.push([]), a(o, i.axe.root), i.axe.pgrid.config.grandTotal.rowsvisible)) {
                            var l = o[o.length - 1];
                            e = new r.header(n.Type.ROWS, r.HeaderType.GRAND_TOTAL, i.axe.root, null, i.dataFieldsCount()), 0 === l.length ? l.push(e) : o.push([e])
                        }
                        0 === o.length && o.push([e = new r.header(n.Type.ROWS, r.HeaderType.INNER, i.axe.root, null, i.dataFieldsCount())]), e && t(o, e)
                    }
                    i.headers = o
                }, this.build()
            }
        }, {
            "./orb.axe": 3,
            "./orb.ui.axe": 12,
            "./orb.ui.header": 14
        }],
        17: [function(e, t) {
            (function(e) {
                t.exports = {
                        ns: function(e, t) {
                            var n = e.split("."),
                                o = 0;
                            for (t = t || window; o < n.length;) t[n[o]] = t[n[o]] || {}, t = t[n[o]], o++;
                            return t
                        },
                        ownProperties: function(e) {
                            var t = [];
                            for (var n in e) e.hasOwnProperty(n) && t.push(n);
                            return t
                        },
                        isArray: function(e) {
                            return "[object Array]" === Object.prototype.toString.apply(e)
                        },
                        isNumber: function(e) {
                            return "[object Number]" === Object.prototype.toString.apply(e)
                        },
                        isDate: function(e) {
                            return "[object Date]" === Object.prototype.toString.apply(e)
                        },
                        isString: function(e) {
                            return "[object String]" === Object.prototype.toString.apply(e)
                        },
                        isRegExp: function(e) {
                            return "[object RegExp]" === Object.prototype.toString.apply(e)
                        },
                        escapeRegex: function(e) {
                            return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
                        },
                        findInArray: function(e, t) {
                            if (this.isArray(e) && t)
                                for (var n = 0; n < e.length; n++) {
                                    var o = e[n];
                                    if (t(o)) return o
                                }
                            return void 0
                        },
                        jsonStringify: function(e, t) {
                            function n(e, n) {
                                return t && t.indexOf(e) > -1 ? void 0 : n
                            }
                            return JSON.stringify(e, n, 2)
                        }
                    },
                    function(t) {
                        function n(e) {
                            this.message = e
                        }
                        var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                        n.prototype = new Error, n.prototype.name = "InvalidCharacterError", t.btoa = e && e.btoa ? function(t) {
                            return e.btoa(t)
                        } : function(e) {
                            for (var t, r, a = String(e), i = 0, l = o, s = ""; a.charAt(0 | i) || (l = "=", i % 1); s += l.charAt(63 & t >> 8 - i % 1 * 8)) {
                                if (r = a.charCodeAt(i += .75), r > 255) throw new n("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                                t = t << 8 | r
                            }
                            return s
                        }, t.atob = e && e.atob ? function(t) {
                            return e.atob(t)
                        } : function(e) {
                            var t = String(e).replace(/=+$/, "");
                            if (t.length % 4 == 1) throw new n("'atob' failed: The string to be decoded is not correctly encoded.");
                            for (var r, a, i = 0, l = 0, s = ""; a = t.charAt(l++); ~a && (r = i % 4 ? 64 * r + a : a, i++ % 4) ? s += String.fromCharCode(255 & r >> (-2 * i & 6)) : 0) a = o.indexOf(a);
                            return s
                        }
                    }(t.exports)
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        18: [function(e, t) {
            function n(e) {
                if (e && e.node) {
                    for (var t = e.node, n = [], o = 0; o < t.rows.length; o++) {
                        for (var r = t.rows[o], a = 0, i = null, l = 0; l < r.cells.length; l++) {
                            var s = r.cells[l];
                            if (s.__orb._visible)
                                for (var u = Math.ceil(s.__orb._textWidth / s.__orb._colSpan + s.__orb._paddingLeft + s.__orb._paddingRight + s.__orb._borderLeftWidth + s.__orb._borderRightWidth), c = (s.__orb._rowSpan > 1 && s.__orb._rowSpan >= t.rows.length - o, 0); c < s.__orb._colSpan; c++) {
                                    for (i = n[a]; i && i.inhibit > 0;) i.inhibit--, a++, i = n[a];
                                    n.length - 1 < a ? n.push({
                                        width: u
                                    }) : u > n[a].width && (n[a].width = u), n[a].inhibit = s.__orb._rowSpan - 1, a++
                                }
                        }
                        for (i = n[a]; i;) i.inhibit > 0 && i.inhibit--, a++, i = n[a]
                    }
                    e.size.width = 0, e.widthArray = n.map(function(t) {
                        return e.size.width += t.width, t.width
                    })
                }
            }

            function o(e) {
                {
                    var t = e.cell,
                        n = t.cssclass;
                    "cell-template-empty" === t.template
                }
                return t.visible() || (n += " cell-hidden"), t.type === c.HeaderType.SUB_TOTAL && t.expanded && (n += " header-st-exp"), t.type === c.HeaderType.GRAND_TOTAL && (1 === t.dim.depth ? n += " header-nofields" : t.dim.depth > 2 && (n += " header-gt-exp")), e.leftmost && (n += " " + ("cell-template-datavalue" === t.template ? "cell" : "header") + "-leftmost"), e.topmost && (n += " cell-topmost"), n
            }

            function r(e) {
                var t = this;
                this.scrollBarComp = e, this.callback = null, this.raise = function() {
                    t.callback && t.callback(t.scrollBarComp.getScrollPercent())
                }
            }

            function a(e, t) {
                function n(e, t) {
                    return null == t ? "none" != e.parentNode.parentNode.style.display : void(e.parentNode.parentNode.style.display = t ? "" : "none")
                }

                function o() {
                    if (t) {
                        var e = {
                            values: t.staticValue,
                            toExclude: t.excludeStatic
                        };
                        t.term ? (h = !0, g = t.operator, u.toggleRegexpButtonVisibility(), t.regexpMode ? (f = !0, u.toggleRegexpButtonState(), m = t.term.source) : m = t.term, v.searchBox.value = m, u.applyFilterTerm(t.operator, t.term)) : i = e, u.updateCheckboxes(e), u.updateAllCheckbox()
                    }
                }

                function r() {
                    u.toggleRegexpButtonVisibility(), v.filterContainer.addEventListener("click", u.valueChecked), v.searchBox.addEventListener("keyup", u.searchChanged), v.clearSearchButton.addEventListener("click", u.clearSearchBox), v.okButton.addEventListener("click", function() {
                        var t = u.getCheckedValues();
                        e.onFilter(g.name, g.regexpSupported && h && f ? new RegExp(m, "i") : m, t.values, t.toExclude)
                    }), v.cancelButton.addEventListener("click", function() {
                        e.destroy()
                    })
                }

                function a(e, t, n) {
                    var o = 301,
                        r = 223,
                        a = {
                            x: 0,
                            y: 0
                        },
                        i = !1;
                    this.resizeMouseDown = function(e) {
                        0 === e.button && (i = !0, document.body.style.cursor = "se-resize", a.x = e.pageX, a.y = e.pageY, e.stopPropagation(), e.preventDefault())
                    }, this.resizeMouseUp = function() {
                        return i = !1, document.body.style.cursor = "auto", !0
                    }, this.resizeMouseMove = function(l) {
                        if (i) {
                            var s = n.getBoundingClientRect(),
                                u = e.getBoundingClientRect(),
                                c = t.getBoundingClientRect(),
                                d = u.right - u.left,
                                p = u.bottom - u.top,
                                h = {
                                    x: o >= d && l.pageX < s.left ? 0 : l.pageX - a.x,
                                    y: r >= p && l.pageY < s.top ? 0 : l.pageY - a.y
                                },
                                f = d + h.x,
                                g = p + h.y;
                            a.x = l.pageX, a.y = l.pageY, f >= o && (e.style.width = f + "px"), g >= r && (e.style.height = g + "px", t.style.height = c.bottom - c.top + h.y + "px"), l.stopPropagation(), l.preventDefault()
                        }
                    }, n.addEventListener("mousedown", this.resizeMouseDown), document.addEventListener("mouseup", this.resizeMouseUp), document.addEventListener("mousemove", this.resizeMouseMove)
                }
                var i, l, u = this,
                    c = "indeterminate",
                    h = !1,
                    f = !1,
                    g = d.Operators.MATCH,
                    m = "",
                    v = {
                        filterContainer: null,
                        checkboxes: {},
                        searchBox: null,
                        operatorBox: null,
                        allCheckbox: null,
                        addCheckbox: null,
                        enableRegexButton: null,
                        clearSearchButton: null,
                        okButton: null,
                        cancelButton: null,
                        resizeGrip: null
                    };
                this.init = function(e) {
                    v.filterContainer = e, v.checkboxes = {}, v.searchBox = v.filterContainer.rows[0].cells[2].children[0].rows[0].cells[0].children[0], v.clearSearchButton = v.filterContainer.rows[0].cells[2].children[0].rows[0].cells[1].children[0], v.operatorBox = v.filterContainer.rows[0].cells[0].children[0], v.okButton = v.filterContainer.rows[2].cells[0].children[0], v.cancelButton = v.filterContainer.rows[2].cells[0].children[1], v.resizeGrip = v.filterContainer.rows[2].cells[1].children[0];
                    for (var t = v.filterContainer.rows[1].cells[0].children[0].rows, n = 0; n < t.length; n++) {
                        var i = t[n].cells[0].children[0];
                        v.checkboxes[i.value] = i
                    }
                    v.allCheckbox = v.checkboxes[d.ALL], v.addCheckbox = null, v.enableRegexButton = v.filterContainer.rows[0].cells[1], l = new a(v.filterContainer.parentNode, v.filterContainer.rows[1].cells[0].children[0], v.resizeGrip), o(), r()
                }, this.onOperatorChanged = function(e) {
                    g.name !== e && (g = d.Operators.get(e), u.toggleRegexpButtonVisibility(), u.searchChanged("operatorChanged"))
                }, this.clearSearchBox = function() {
                    v.searchBox.value = "", u.searchChanged()
                }, this.toggleRegexpButtonVisibility = function() {
                    g.regexpSupported ? (v.enableRegexButton.addEventListener("click", u.regexpActiveChanged), p.removeClass(v.enableRegexButton, "srchtyp-col-hidden")) : (v.enableRegexButton.removeEventListener("click", u.regexpActiveChanged), p.addClass(v.enableRegexButton, "srchtyp-col-hidden"))
                }, this.toggleRegexpButtonState = function() {
                    v.enableRegexButton.className = v.enableRegexButton.className.replace("srchtyp-col-active", ""), f ? p.addClass(v.enableRegexButton, "srchtyp-col-active") : p.removeClass(v.enableRegexButton, "srchtyp-col-active")
                }, this.regexpActiveChanged = function() {
                    f = !f, u.toggleRegexpButtonState(), u.searchChanged("regexModeChanged")
                }, this.valueChecked = function(e) {
                    var t = e.target;
                    t && t.type && "checkbox" === t.type && (t == v.allCheckbox ? u.updateCheckboxes({
                        values: v.allCheckbox.checked
                    }) : u.updateAllCheckbox())
                }, this.applyFilterTerm = function(t, o) {
                    var r = o ? !1 : !0,
                        a = t.regexpSupported && h ? f ? o : s.escapeRegex(o) : o;
                    n(v.allCheckbox, r);
                    for (var i = 0; i < e.values.length; i++) {
                        var l = e.values[i],
                            u = v.checkboxes[l],
                            c = !h || t.func(l, a);
                        n(u, c), u.checked = c
                    }
                }, this.searchChanged = function(e) {
                    var t = (v.searchBox.value || "").trim();
                    if ("operatorChanged" === e || "regexModeChanged" === e && t || t != m) {
                        m = t;
                        var n = h;
                        h = "" !== t, h && !n && (i = u.getCheckedValues()), ("operatorChanged" !== e || h) && u.applyFilterTerm(g, t), !h && n && u.updateCheckboxes(i), u.updateAllCheckbox()
                    }
                }, this.getCheckedValues = function() {
                    if (h || v.allCheckbox.indeterminate) {
                        var t, o, r, a, i = 0,
                            l = 0;
                        for (o = 0; o < e.values.length; o++) r = e.values[o], a = v.checkboxes[r], n(a) && (i++, a.checked && l++);
                        var s = !1;
                        if (0 === l) t = d.NONE;
                        else if (l == i) t = d.ALL;
                        else
                            for (t = [], s = l > i / 2 + 1, o = 0; o < e.values.length; o++) r = e.values[o], a = v.checkboxes[r], n(a) && (!s && a.checked || s && !a.checked) && t.push(r);
                        return {
                            values: t,
                            toExclude: s
                        }
                    }
                    return {
                        values: v.allCheckbox.checked ? d.ALL : d.NONE,
                        toExclude: !1
                    }
                }, this.updateCheckboxes = function(t) {
                    for (var o = t ? t.values : null, r = s.isArray(o) ? null : null == o || o === d.ALL ? !0 : o === d.NONE ? !1 : !!o, a = 0; a < e.values.length; a++) {
                        var i = e.values[a],
                            l = v.checkboxes[i];
                        if (n(l))
                            if (null != r) l.checked = r;
                            else {
                                var u = o.indexOf(i) >= 0;
                                l.checked = t.toExclude ? !u : u
                            }
                    }
                }, this.updateAllCheckbox = function() {
                    if (!h) {
                        for (var t = null, n = 0; n < e.values.length; n++) {
                            var o = v.checkboxes[e.values[n]];
                            if (null == t) t = o.checked;
                            else if (t !== o.checked) {
                                t = c;
                                break
                            }
                        }
                        t === c ? (v.allCheckbox.indeterminate = !0, v.allCheckbox.checked = !1) : (v.allCheckbox.indeterminate = !1, v.allCheckbox.checked = t)
                    }
                }
            }

            function i() {
                var e = document.createElement("div");
                return e.className = "orb-overlay orb-overlay-hidden", document.body.appendChild(e), e
            }
            var l = "undefined" == typeof window ? e("react") : window.React,
                s = e("../orb.utils"),
                u = e("../orb.axe"),
                c = e("../orb.ui.header"),
                d = e("../orb.filtering"),
                p = e("./orb.react.utils"),
                h = t.exports,
                f = 1,
                g = {};
            t.exports.PivotTable = l.createClass({
                id: f++,
                pgrid: null,
                pgridwidget: null,
                getInitialState: function() {
                    return h.DragManager.init(this), g[this.id] = [], this.registerThemeChanged(this.updateClasses), this.pgridwidget = this.props.pgridwidget, this.pgrid = this.pgridwidget.pgrid, {}
                },
                sort: function(e, t) {
                    this.pgridwidget.sort(e, t), this.setProps({})
                },
                moveButton: function(e, t, n) {
                    this.pgridwidget.moveField(e.props.field.name, e.props.axetype, t, n) && this.setProps({})
                },
                toggleFieldExpansion: function(e, t, n) {
                    this.pgridwidget.toggleFieldExpansion(e, t, n) && this.setProps({})
                },
                toggleSubtotals: function(e) {
                    this.pgridwidget.toggleSubtotals(e) && this.setProps({})
                },
                toggleGrandtotal: function(e) {
                    this.pgridwidget.toggleGrandtotal(e) && this.setProps({})
                },
                expandRow: function(e) {
                    e.expand(), this.setProps({})
                },
                collapseRow: function(e) {
                    e.subtotalHeader.collapse(), this.setProps({})
                },
                applyFilter: function(e, t, n, o, r) {
                    this.pgridwidget.applyFilter(e, t, n, o, r), this.setProps({})
                },
                registerThemeChanged: function(e) {
                    e && g[this.id].push(e)
                },
                unregisterThemeChanged: function(e) {
                    var t;
                    e && (t = g[this.id].indexOf(e)) >= 0 && g[this.id].splice(t, 1)
                },
                changeTheme: function(e) {
                    if (this.pgridwidget.pgrid.config.setTheme(e))
                        for (var t = 0; t < g[this.id].length; t++) g[this.id][t]()
                },
                updateClasses: function() {
                    var e = this.getDOMNode(),
                        t = this.pgridwidget.pgrid.config.theme.getPivotClasses();
                    e.className = t.container, e.children[1].className = t.table
                },
                componentDidUpdate: function() {
                    this.synchronizeCompsWidths()
                },
                componentDidMount: function() {
                    var e = this.refs.dataCellsContainer.getDOMNode(),
                        t = this.refs.dataCellsTable.getDOMNode(),
                        n = this.refs.colHeadersContainer.getDOMNode(),
                        o = this.refs.rowHeadersContainer.getDOMNode();
                    this.refs.horizontalScrollBar.setScrollClient(e, function(o) {
                        var r = Math.ceil(o * (p.getSize(t).width - p.getSize(e).width));
                        n.scrollLeft = r, e.scrollLeft = r
                    }), this.refs.verticalScrollBar.setScrollClient(e, function(n) {
                        var r = Math.ceil(n * (p.getSize(t).height - p.getSize(e).height));
                        o.scrollTop = r, e.scrollTop = r
                    }), this.synchronizeCompsWidths()
                },
                onWheel: function(e) {
                    var t, n, o;
                    e.currentTarget == (t = this.refs.colHeadersContainer.getDOMNode()) ? (n = this.refs.horizontalScrollBar, o = e.deltaX || e.deltaY) : (e.currentTarget == (t = this.refs.rowHeadersContainer.getDOMNode()) || e.currentTarget == (t = this.refs.dataCellsContainer.getDOMNode())) && (n = this.refs.verticalScrollBar, o = e.deltaY), n && n.scroll(o, e.deltaMode) && (e.stopPropagation(), e.preventDefault())
                },
                synchronizeCompsWidths: function() {
                    var e = this,
                        t = e.refs.pivotWrapperTable.getDOMNode(),
                        o = function() {
                            var t = {};
                            return ["pivotContainer", "dataCellsContainer", "dataCellsTable", "upperbuttonsRow", "columnbuttonsRow", "colHeadersContainer", "rowHeadersContainer", "rowButtonsContainer", "toolbar", "horizontalScrollBar", "verticalScrollBar"].forEach(function(n) {
                                e.refs[n] && (t[n] = {
                                    node: e.refs[n].getDOMNode()
                                }, t[n].size = p.getSize(t[n].node))
                            }), t
                        }();
                    o.colHeadersTable = {
                        node: o.colHeadersContainer.node.children[0]
                    }, o.colHeadersTable.size = p.getSize(o.colHeadersTable.node), o.rowHeadersTable = {
                        node: o.rowHeadersContainer.node.children[0]
                    }, o.rowHeadersTable.size = p.getSize(o.rowHeadersTable.node);
                    var r = p.getSize(o.rowButtonsContainer.node.children[0]).width;
                    n(o.dataCellsTable), n(o.colHeadersTable), n(o.rowHeadersTable);
                    for (var a = [], i = 0, l = 0; l < o.dataCellsTable.widthArray.length; l++) {
                        var s = Math.max(o.dataCellsTable.widthArray[l], o.colHeadersTable.widthArray[l]);
                        a.push(s), i += s
                    }
                    var u = Math.max(o.rowHeadersTable.size.width, r, 67),
                        c = u - o.rowHeadersTable.size.width;
                    c > 0 && (o.rowHeadersTable.size.width += c, o.rowHeadersTable.widthArray[o.rowHeadersTable.widthArray.length - 1] += c), p.updateTableColGroup(o.dataCellsTable.node, a), p.updateTableColGroup(o.colHeadersTable.node, a), p.updateTableColGroup(o.rowHeadersTable.node, o.rowHeadersTable.widthArray), o.dataCellsTable.node.style.width = i + "px", o.colHeadersTable.node.style.width = i + "px", o.rowHeadersTable.node.style.width = u + "px";
                    var d = Math.min(i + 1, o.pivotContainer.size.width - u - o.verticalScrollBar.size.width);
                    o.dataCellsContainer.node.style.width = d + "px", o.colHeadersContainer.node.style.width = d + "px";
                    var h = this.pgridwidget.pgrid.config.height;
                    if (h) {
                        var f = Math.ceil(Math.min(h - (o.toolbar ? o.toolbar.size.height + 17 : 0) - o.upperbuttonsRow.size.height - o.columnbuttonsRow.size.height - o.colHeadersTable.size.height - o.horizontalScrollBar.size.height, o.dataCellsTable.size.height));
                        o.dataCellsContainer.node.style.height = f + "px", o.rowHeadersContainer.node.style.height = f + "px"
                    }
                    p.updateTableColGroup(t, [u, d, o.verticalScrollBar.size.width, Math.max(o.pivotContainer.size.width - (u + d + o.verticalScrollBar.size.width), 0)]), this.refs.horizontalScrollBar.refresh(), this.refs.verticalScrollBar.refresh()
                },
                render: function() {
                    var e = this,
                        t = this.pgridwidget.pgrid.config,
                        n = h.Toolbar,
                        o = h.PivotTableUpperButtons,
                        r = h.PivotTableColumnButtons,
                        a = h.PivotTableRowButtons,
                        i = h.PivotTableRowHeaders,
                        l = h.PivotTableColumnHeaders,
                        s = h.PivotTableDataCells,
                        u = h.HorizontalScrollBar,
                        c = h.VerticalScrollBar,
                        d = t.theme.getPivotClasses(),
                        p = {};
                    return t.width && (p.width = t.width), t.height && (p.height = t.height), React.createElement("div", {
                        className: d.container,
                        style: p,
                        ref: "pivotContainer"
                    }, t.toolbar && t.toolbar.visible ? React.createElement("div", {
                        ref: "toolbar",
                        className: "orb-toolbar"
                    }, React.createElement(n, {
                        pivotTableComp: e
                    })) : null, React.createElement("table", {
                        id: "tbl-" + e.id,
                        ref: "pivotWrapperTable",
                        className: d.table,
                        style: {
                            tableLayout: "fixed"
                        }
                    }, React.createElement("colgroup", null, React.createElement("col", {
                        ref: "column1"
                    }), React.createElement("col", {
                        ref: "column2"
                    }), React.createElement("col", {
                        ref: "column3"
                    }), React.createElement("col", {
                        ref: "column4"
                    })), React.createElement("tbody", null, React.createElement("tr", {
                        ref: "upperbuttonsRow"
                    }, React.createElement("td", {
                        colSpan: "4"
                    }, React.createElement(o, {
                        pivotTableComp: e
                    }))), React.createElement("tr", {
                        ref: "columnbuttonsRow"
                    }, React.createElement("td", null), React.createElement("td", {
                        style: {
                            padding: "11px 4px !important"
                        }
                    }, React.createElement(r, {
                        pivotTableComp: e
                    })), React.createElement("td", {
                        colSpan: "2"
                    })), React.createElement("tr", null, React.createElement("td", {
                        style: {
                            position: "relative"
                        }
                    }, React.createElement(a, {
                        pivotTableComp: e,
                        ref: "rowButtonsContainer"
                    })), React.createElement("td", null, React.createElement(l, {
                        pivotTableComp: e,
                        ref: "colHeadersContainer"
                    })), React.createElement("td", {
                        colSpan: "2"
                    })), React.createElement("tr", null, React.createElement("td", null, React.createElement(i, {
                        pivotTableComp: e,
                        ref: "rowHeadersContainer"
                    })), React.createElement("td", null, React.createElement("div", {
                        className: "inner-table-container data-cntr",
                        ref: "dataCellsContainer",
                        onWheel: this.onWheel
                    }, React.createElement(s, {
                        pivotTableComp: e,
                        ref: "dataCellsTable"
                    }))), React.createElement("td", null, React.createElement(c, {
                        pivotTableComp: e,
                        ref: "verticalScrollBar"
                    })), React.createElement("td", null)), React.createElement("tr", null, React.createElement("td", null), React.createElement("td", null, React.createElement(u, {
                        pivotTableComp: e,
                        ref: "horizontalScrollBar"
                    })), React.createElement("td", {
                        colSpan: "2"
                    })))), React.createElement("div", {
                        className: "orb-overlay orb-overlay-hidden",
                        id: "drilldialog" + e.id
                    }))
                }
            }), t.exports.PivotRow = l.createClass({
                render: function() {
                    var e, t = this,
                        n = h.PivotCell,
                        o = (this.props.row.length - 1, this.props.row[0], !1),
                        r = t.props.layoutInfos,
                        a = {},
                        i = !1;
                    return e = this.props.row.map(function(e, a) {
                        var l = !1;
                        return e.visible() && r && (e.dim ? (e.dim.isRoot && void 0 === r.topMostCells[e.dim.depth - 1] || !e.dim.isRoot && void 0 === r.topMostCells[e.dim.depth] && (e.dim.parent.isRoot || r.topMostCells[e.dim.depth + 1] === e.dim.parent)) && (i = !0, r.topMostCells[e.dim.depth] = e.dim) : r.topMostCells[0] || (i = r.topMostCells[0] = !0), o || t.props.axetype !== u.Type.DATA && t.props.axetype !== u.Type.COLUMNS || 0 !== r.lastLeftMostCellVSpan || (l = o = !0, r.lastLeftMostCellVSpan = e.vspan() - 1)), React.createElement(n, {
                            key: a,
                            cell: e,
                            leftmost: l,
                            topmost: i,
                            pivotTableComp: t.props.pivotTableComp
                        })
                    }), r && r.lastLeftMostCellVSpan > 0 && !o && r.lastLeftMostCellVSpan--, React.createElement("tr", {
                        style: a
                    }, e)
                }
            });
            var m = null,
                v = null;
            t.exports.PivotCell = l.createClass({
                expand: function() {
                    this.props.pivotTableComp.expandRow(this.props.cell)
                },
                collapse: function() {
                    this.props.pivotTableComp.collapseRow(this.props.cell)
                },
                updateCellInfos: function() {
                    var e = this.getDOMNode(),
                        t = this.props.cell;
                    if (e.__orb = e.__orb || {}, t.visible()) {
                        var n = this.refs.cellContent.getDOMNode(),
                            o = (e.textContent, []),
                            r = null == m,
                            a = !this.props.leftmost && null == v;
                        if (r && o.push("padding-left"), a && o.push("border-left-width"), o.length > 0) {
                            var i = p.getStyle(e, o, !0);
                            r && (m = parseFloat(i[0])), a && (v = parseFloat(i[r ? 1 : 0]))
                        }
                        p.removeClass(e, "cell-hidden"), e.__orb._visible = !0, e.__orb._textWidth = p.getSize(n).width, e.__orb._colSpan = this.props.cell.hspan(!0) || 1, e.__orb._rowSpan = this.props.cell.vspan(!0) || 1, e.__orb._paddingLeft = m, e.__orb._paddingRight = m, e.__orb._borderLeftWidth = this.props.leftmost ? 0 : v, e.__orb._borderRightWidth = 0
                    } else e.__orb._visible = !1
                },
                componentDidMount: function() {
                    this.updateCellInfos()
                },
                componentDidUpdate: function() {
                    this.updateCellInfos()
                },
                shouldComponentUpdate: function(e) {
                    return !e.cell || e.cell != this.props.cell || this._latestVisibleState || e.cell.visible() ? !0 : !1
                },
                _latestVisibleState: !1,
                render: function() {
                    var e, t, n = this,
                        r = this.props.cell,
                        a = [],
                        i = !1;
                    switch (this._latestVisibleState = r.visible(), r.template) {
                        case "cell-template-row-header":
                        case "cell-template-column-header":
                            var l = r.type === c.HeaderType.WRAPPER && r.dim.field.subTotal.visible && r.dim.field.subTotal.collapsible,
                                s = r.type === c.HeaderType.SUB_TOTAL && !r.expanded;
                            l || s ? (i = !0, a.push(React.createElement("table", {
                                key: "header-value",
                                ref: "cellContent"
                            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                                className: "orb-tgl-btn"
                            }, React.createElement("div", {
                                className: "orb-tgl-btn-" + (l ? "down" : "right"),
                                onClick: l ? this.collapse : this.expand
                            })), React.createElement("td", {
                                className: "hdr-val"
                            }, React.createElement("div", {
                                dangerouslySetInnerHTML: {
                                    __html: r.value || "&#160;"
                                }
                            }))))))) : e = (r.value || "&#160;") + (r.type === c.HeaderType.SUB_TOTAL ? " Total" : "");
                            break;
                        case "cell-template-dataheader":
                            e = r.value.caption;
                            break;
                        case "cell-template-datavalue":
                            e = r.datafield && r.datafield.formatFunc ? r.datafield.formatFunc()(r.value) : r.value, t = function() {
                                n.props.pivotTableComp.pgridwidget.drilldown(r, n.props.pivotTableComp.id)
                            }
                    }
                    if (!i) {
                        var u;
                        switch (r.template) {
                            case "cell-template-datavalue":
                                u = "cell-data";
                                break;
                            default:
                                "cell-template-dataheader" != r.template && r.type !== c.HeaderType.GRAND_TOTAL && (u = "hdr-val")
                        }
                        a.push(React.createElement("div", {
                            key: "cell-value",
                            ref: "cellContent",
                            className: u
                        }, React.createElement("div", {
                            dangerouslySetInnerHTML: {
                                __html: e || "&#160;"
                            }
                        })))
                    }
                    return React.createElement("td", {
                        className: o(this.props),
                        onDoubleClick: t,
                        colSpan: r.hspan(),
                        rowSpan: r.vspan()
                    }, React.createElement("div", null, a))
                }
            });
            var b = t.exports.DragManager = function() {
                function e(e, t) {
                    return !(e.right < t.left || e.left > t.right || e.bottom < t.top || e.top > t.bottom)
                }

                function t(e, t) {
                    l ? r(l, function() {
                        l = e, o(e, t)
                    }) : (l = e, o(e, t))
                }

                function n(e) {
                    s ? r(s, function() {
                        s = e, o(e)
                    }) : (s = e, o(e))
                }

                function o(e, t) {
                    e && e.onDragOver ? e.onDragOver(t) : t && t()
                }

                function r(e, t) {
                    e && e.onDragEnd ? e.onDragEnd(t) : t && t()
                }
                var a = null,
                    i = null,
                    l = null,
                    s = null,
                    u = null,
                    c = [],
                    d = [],
                    h = !1;
                return {
                    init: function(e) {
                        h = !0, a = e
                    },
                    setDragElement: function(e) {
                        var o = i;
                        if (i = e, i != o)
                            if (null == e) {
                                if (l) {
                                    var r = null != s ? s.position : null;
                                    a.moveButton(o, l.component.props.axetype, r)
                                }
                                u = null, t(null), n(null)
                            } else u = i.getDOMNode()
                    },
                    registerTarget: function(e, t, n, o) {
                        c.push({
                            component: e,
                            axetype: t,
                            onDragOver: n,
                            onDragEnd: o
                        })
                    },
                    unregisterTarget: function(e) {
                        for (var t, n = 0; n < c.length; n++)
                            if (c[n].component == e) {
                                t = n;
                                break
                            }
                        null != t && c.splice(t, 1)
                    },
                    registerIndicator: function(e, t, n, o, r) {
                        d.push({
                            component: e,
                            axetype: t,
                            position: n,
                            onDragOver: o,
                            onDragEnd: r
                        })
                    },
                    unregisterIndicator: function(e) {
                        for (var t, n = 0; n < d.length; n++)
                            if (d[n].component == e) {
                                t = n;
                                break
                            }
                        null != t && d.splice(t, 1)
                    },
                    elementMoved: function() {
                        if (null != i) {
                            var o, r = u.getBoundingClientRect();
                            p.forEach(c, function(t) {
                                if (!o) {
                                    var n = t.component.getDOMNode().getBoundingClientRect(),
                                        a = e(r, n);
                                    if (a) return void(o = t)
                                }
                            }, !0), o && t(o, function() {
                                var t = null;
                                if (p.forEach(d, function(n) {
                                        if (!t) {
                                            var a = n.component.props.axetype === i.props.axetype && n.component.props.position === i.props.position,
                                                l = n.component.props.axetype === o.component.props.axetype;
                                            if (l && !a) {
                                                var s = n.component.getDOMNode().getBoundingClientRect(),
                                                    u = e(r, s);
                                                if (u) return void(t = n)
                                            }
                                        }
                                    }), !t) {
                                    var a = d.filter(function(e) {
                                        return e.component.props.axetype === o.component.props.axetype
                                    });
                                    a.length > 0 && (t = a[a.length - 1])
                                }
                                n(t)
                            })
                        }
                    }
                }
            }();
            t.exports.DropIndicator = l.createClass({
                displayName: "DropIndicator",
                getInitialState: function() {
                    return b.registerIndicator(this, this.props.axetype, this.props.position, this.onDragOver, this.onDragEnd), {
                        isover: !1
                    }
                },
                componentWillUnmount: function() {
                    b.unregisterIndicator(this)
                },
                onDragOver: function(e) {
                    this.isMounted() ? this.setState({
                        isover: !0
                    }, e) : e && e()
                },
                onDragEnd: function(e) {
                    this.isMounted() ? this.setState({
                        isover: !1
                    }, e) : e && e()
                },
                render: function() {
                    var e = "drp-indic";
                    this.props.isFirst && (e += " drp-indic-first"), this.props.isLast && (e += " drp-indic-last");
                    var t = {};
                    return this.state.isover && (e += " drp-indic-over"), React.createElement("div", {
                        style: t,
                        className: e
                    })
                }
            });
            var y = 0;
            t.exports.DropTarget = l.createClass({
                getInitialState: function() {
                    return this.dtid = ++y, {
                        isover: !1
                    }
                },
                componentDidMount: function() {
                    b.registerTarget(this, this.props.axetype, this.onDragOver, this.onDragEnd)
                },
                componentWillUnmount: function() {
                    b.unregisterTarget(this)
                },
                onDragOver: function(e) {
                    this.isMounted() ? this.setState({
                        isover: !0
                    }, e) : e && e()
                },
                onDragEnd: function(e) {
                    this.isMounted() ? this.setState({
                        isover: !1
                    }, e) : e && e()
                },
                render: function() {
                    var e = this,
                        n = t.exports.DropIndicator,
                        o = this.props.buttons.map(function(t, o) {
                            return o < e.props.buttons.length - 1 ? [React.createElement("td", null, React.createElement(n, {
                                isFirst: 0 === o,
                                position: o,
                                axetype: e.props.axetype
                            })), React.createElement("td", null, t)] : [React.createElement("td", null, React.createElement(n, {
                                isFirst: 0 === o,
                                position: o,
                                axetype: e.props.axetype
                            })), React.createElement("td", null, t), React.createElement("td", null, React.createElement(n, {
                                isLast: !0,
                                position: null,
                                axetype: e.props.axetype
                            }))]
                        }),
                        r = e.props.axetype === u.Type.ROWS ? {
                            position: "absolute",
                            left: 0,
                            bottom: 11
                        } : null;
                    return React.createElement("div", {
                        className: "drp-trgt" + (this.state.isover ? " drp-trgt-over" : "") + (0 === o.length ? " drp-trgt-empty" : ""),
                        style: r
                    }, React.createElement("table", null, React.createElement("tbody", null, React.createElement("tr", null, o))))
                }
            });
            var x = 0;
            t.exports.PivotButton = l.createClass({
                displayName: "PivotButton",
                getInitialState: function() {
                    return this.pbid = ++x, {
                        pos: {
                            x: 0,
                            y: 0
                        },
                        startpos: {
                            x: 0,
                            y: 0
                        },
                        mousedown: !1,
                        dragging: !1
                    }
                },
                onFilterMouseDown: function(e) {
                    if (0 === e.button) {
                        var t = this.refs.filterButton.getDOMNode(),
                            n = p.getOffset(t),
                            o = document.createElement("div"),
                            r = React.createFactory(h.FilterPanel),
                            a = r({
                                field: this.props.field.name,
                                pivotTableComp: this.props.pivotTableComp
                            });
                        o.className = this.props.pivotTableComp.pgrid.config.theme.getFilterClasses().container, o.style.top = n.y + "px", o.style.left = n.x + "px", document.body.appendChild(o), React.render(a, o), e.stopPropagation(), e.preventDefault()
                    }
                },
                componentDidUpdate: function() {
                    this.props.pivotTableComp.pgrid.config.canMoveFields && (this.state.mousedown ? this.state.mousedown && (b.setDragElement(this), document.addEventListener("mousemove", this.onMouseMove)) : (b.setDragElement(null), document.removeEventListener("mousemove", this.onMouseMove)))
                },
                componentDidMount: function() {
                    this.props.pivotTableComp.registerThemeChanged(this.updateClasses)
                },
                componentWillUnmount: function() {
                    this.props.pivotTableComp.unregisterThemeChanged(this.updateClasses), document.removeEventListener("mousemove", this.onMouseMove)
                },
                onMouseDown: function(e) {
                    if (0 === e.button) {
                        if (e.ctrlKey) this.props.pivotTableComp.toggleFieldExpansion(this.props.axetype, this.props.field);
                        else {
                            var t = p.getOffset(this.getDOMNode());
                            this.setState({
                                mousedown: !0,
                                mouseoffset: {
                                    x: t.x - e.pageX,
                                    y: t.y - e.pageY
                                },
                                startpos: {
                                    x: e.pageX,
                                    y: e.pageY
                                }
                            })
                        }
                        e.stopPropagation(), e.preventDefault()
                    }
                },
                onMouseUp: function(e) {
                    var t = this.state.dragging;
                    this.setState({
                        mousedown: !1,
                        dragging: !1,
                        size: null,
                        pos: {
                            x: 0,
                            y: 0
                        }
                    }), e.ctrlKey || t || this.props.pivotTableComp.sort(this.props.axetype, this.props.field)
                },
                onMouseMove: function(e) {
                    if (this.props.pivotTableComp.pgrid.config.canMoveFields && this.state.mousedown) {
                        var t = null;
                        t = this.state.dragging ? this.state.size : p.getSize(this.getDOMNode());
                        var n = {
                            x: e.pageX + this.state.mouseoffset.x,
                            y: e.pageY + this.state.mouseoffset.y
                        };
                        this.setState({
                            dragging: !0,
                            size: t,
                            pos: n
                        }), b.elementMoved(), e.stopPropagation(), e.preventDefault()
                    }
                },
                updateClasses: function() {
                    this.getDOMNode().className = this.props.pivotTableComp.pgrid.config.theme.getButtonClasses().pivotButton
                },
                render: function() {
                    var e = this,
                        t = {
                            left: e.state.pos.x + "px",
                            top: e.state.pos.y + "px",
                            position: e.state.dragging ? "fixed" : "",
                            zIndex: 101
                        };
                    e.state.size && (t.width = e.state.size.width + "px");
                    var n = "asc" === e.props.field.sort.order ? "sort-asc" : "desc" === e.props.field.sort.order ? "sort-desc" : "",
                        o = (e.state.dragging ? "" : "fltr-btn") + (this.props.pivotTableComp.pgrid.isFieldFiltered(this.props.field.name) ? " fltr-btn-active" : ""),
                        r = "";
                    return e.props.axetype === u.Type.DATA && (r = React.createElement("small", null, " (" + e.props.field.aggregateFuncName + ")")), React.createElement("div", {
                        key: e.props.field.name,
                        className: this.props.pivotTableComp.pgrid.config.theme.getButtonClasses().pivotButton,
                        onMouseDown: this.onMouseDown,
                        onMouseUp: this.onMouseUp,
                        style: t
                    }, React.createElement("table", null, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                        className: "caption"
                    }, e.props.field.caption, r), React.createElement("td", null, React.createElement("div", {
                        className: "sort-indicator " + n
                    })), React.createElement("td", {
                        className: "filter"
                    }, React.createElement("div", {
                        ref: "filterButton",
                        className: o,
                        onMouseDown: e.state.dragging ? null : this.onFilterMouseDown
                    }))))))
                }
            }), t.exports.PivotTableUpperButtons = l.createClass({
                render: function() {
                    var e, t = this,
                        n = h.PivotButton,
                        o = h.DropTarget,
                        r = this.props.pivotTableComp.pgridwidget.pgrid.config;
                    if (r.canMoveFields) {
                        var a = r.availablefields().map(function(e, o) {
                            return React.createElement(n, {
                                key: e.name,
                                field: e,
                                axetype: null,
                                position: o,
                                pivotTableComp: t.props.pivotTableComp
                            })
                        });
                        e = React.createElement("tr", null, React.createElement("td", {
                            className: "flds-grp-cap av-flds text-muted"
                        }, React.createElement("div", null, "Fields")), React.createElement("td", {
                            className: "av-flds"
                        }, React.createElement(o, {
                            buttons: a,
                            axetype: null
                        })))
                    } else e = null;
                    var i = r.dataFields.map(function(e, o) {
                            return React.createElement(n, {
                                key: e.name,
                                field: e,
                                axetype: u.Type.DATA,
                                position: o,
                                pivotTableComp: t.props.pivotTableComp
                            })
                        }),
                        l = React.createElement("tr", null, React.createElement("td", {
                            className: "flds-grp-cap text-muted"
                        }, React.createElement("div", null, "Data")), React.createElement("td", {
                            className: "empty"
                        }, React.createElement(o, {
                            buttons: i,
                            axetype: u.Type.DATA
                        })));
                    return React.createElement("table", {
                        className: "inner-table upper-buttons"
                    }, React.createElement("tbody", null, e, l))
                }
            }), t.exports.PivotTableColumnButtons = l.createClass({
                render: function() {
                    var e = this,
                        t = h.PivotButton,
                        n = h.DropTarget,
                        o = this.props.pivotTableComp.pgridwidget.pgrid.config,
                        r = o.columnFields.map(function(n, o) {
                            return React.createElement(t, {
                                key: n.name,
                                field: n,
                                axetype: u.Type.COLUMNS,
                                position: o,
                                pivotTableComp: e.props.pivotTableComp
                            })
                        });
                    return React.createElement(n, {
                        buttons: r,
                        axetype: u.Type.COLUMNS
                    })
                }
            }), t.exports.PivotTableRowButtons = l.createClass({
                render: function() {
                    var e = this,
                        t = h.PivotButton,
                        n = h.DropTarget,
                        o = this.props.pivotTableComp.pgridwidget.pgrid.config,
                        r = o.rowFields.map(function(n, o) {
                            return React.createElement(t, {
                                key: n.name,
                                field: n,
                                axetype: u.Type.ROWS,
                                position: o,
                                pivotTableComp: e.props.pivotTableComp
                            })
                        });
                    return React.createElement(n, {
                        buttons: r,
                        axetype: u.Type.ROWS
                    })
                }
            }), t.exports.PivotTableColumnHeaders = l.createClass({
                render: function() {
                    var e = this,
                        t = h.PivotRow,
                        n = this.props.pivotTableComp.pgridwidget,
                        o = 0 === n.columns.headers.length ? "" : " columns-cntr",
                        r = {
                            lastLeftMostCellVSpan: 0,
                            topMostCells: {}
                        },
                        a = n.columns.headers.map(function(n, o) {
                            return React.createElement(t, {
                                key: o,
                                row: n,
                                axetype: u.Type.COLUMNS,
                                pivotTableComp: e.props.pivotTableComp,
                                layoutInfos: r
                            })
                        });
                    return React.createElement("div", {
                        className: "inner-table-container" + o,
                        ref: "colHeadersContainer",
                        onWheel: this.props.pivotTableComp.onWheel
                    }, React.createElement("table", {
                        className: "inner-table"
                    }, React.createElement("colgroup", null), React.createElement("tbody", null, a)))
                }
            }), t.exports.PivotTableRowHeaders = l.createClass({
                setColGroup: function(e) {
                    var t = this.getDOMNode(),
                        n = this.refs.colgroup.getDOMNode();
                    t.style.tableLayout = "auto", n.innerHTML = "";
                    for (var o = 0; o < e.length; o++) {
                        var r = document.createElement("col");
                        r.style.width = e[o] + 8 + "px", n.appendChild(r)
                    }
                    t.style.tableLayout = "fixed"
                },
                render: function() {
                    var e = this,
                        t = h.PivotRow,
                        n = this.props.pivotTableComp.pgridwidget,
                        o = 0 === n.rows.headers.length ? "" : " rows-cntr",
                        r = {
                            lastLeftMostCellVSpan: 0,
                            topMostCells: {}
                        },
                        a = n.rows.headers.map(function(n, o) {
                            return React.createElement(t, {
                                key: o,
                                row: n,
                                axetype: u.Type.ROWS,
                                layoutInfos: r,
                                pivotTableComp: e.props.pivotTableComp
                            })
                        });
                    return React.createElement("div", {
                        className: "inner-table-container" + o,
                        ref: "rowHeadersContainer",
                        onWheel: this.props.pivotTableComp.onWheel
                    }, React.createElement("table", {
                        className: "inner-table"
                    }, React.createElement("colgroup", {
                        ref: "colgroup"
                    }), React.createElement("tbody", null, a)))
                }
            }), t.exports.PivotTableDataCells = l.createClass({
                render: function() {
                    var e = this,
                        t = h.PivotRow,
                        n = this.props.pivotTableComp.pgridwidget,
                        o = {
                            lastLeftMostCellVSpan: 0,
                            topMostCells: {}
                        },
                        r = n.dataRows.map(function(n, r) {
                            return React.createElement(t, {
                                key: r,
                                row: n,
                                axetype: u.Type.DATA,
                                layoutInfos: o,
                                pivotTableComp: e.props.pivotTableComp
                            })
                        });
                    return React.createElement("table", {
                        className: "inner-table"
                    }, React.createElement("colgroup", null), React.createElement("tbody", null, r))
                }
            });
            var C = {
                scrollEvent: null,
                scrollClient: null,
                getInitialState: function() {
                    return {
                        size: 16,
                        mousedown: !1,
                        thumbOffset: 0
                    }
                },
                componentDidMount: function() {
                    this.scrollEvent = new r(this)
                },
                componentDidUpdate: function() {
                    this.state.mousedown ? this.state.mousedown && (document.addEventListener("mousemove", this.onMouseMove), document.addEventListener("mouseup", this.onMouseUp)) : (document.removeEventListener("mousemove", this.onMouseMove), document.removeEventListener("mouseup", this.onMouseUp))
                },
                componentWillUnmount: function() {
                    document.removeEventListener("mousemove", this.onMouseMove), document.removeEventListener("mouseup", this.onMouseUp)
                },
                onMouseDown: function(e) {
                    if (0 === e.button) {
                        var t = this.refs.scrollThumb.getDOMNode(),
                            n = p.getParentOffset(t);
                        p.addClass(t, "orb-scrollthumb-hover"), this.setState({
                            mousedown: !0,
                            mouseoffset: e[this.mousePosProp],
                            thumbOffset: n[this.posProp]
                        }), e.stopPropagation(), e.preventDefault()
                    }
                },
                onMouseUp: function() {
                    if (this.state.mousedown) {
                        var e = this.refs.scrollThumb.getDOMNode();
                        p.removeClass(e, "orb-scrollthumb-hover")
                    }
                    this.setState({
                        mousedown: !1
                    })
                },
                onMouseMove: function(e) {
                    if (this.state.mousedown) {
                        e.stopPropagation(), e.preventDefault();
                        var t = e[this.mousePosProp] - this.state.mouseoffset;
                        this.state.mouseoffset = e[this.mousePosProp], this.scroll(t)
                    }
                },
                getScrollSize: function() {
                    return null != this.scrollClient ? p.getSize(this.scrollClient)[this.sizeProp] : p.getSize(this.getDOMNode())[this.sizeProp]
                },
                setScrollClient: function(e, t) {
                    this.scrollClient = e, this.scrollEvent.callback = t
                },
                getScrollPercent: function() {
                    var e = this.getScrollSize() - this.state.size;
                    return 0 >= e ? 0 : this.state.thumbOffset / e
                },
                refresh: function() {
                    if (this.scrollClient) {
                        var e = this.scrollClient.children[0],
                            t = p.getSize(this.scrollClient),
                            n = p.getSize(e),
                            o = this.getScrollSize(),
                            r = t[this.sizeProp] >= n[this.sizeProp] ? 0 : t[this.sizeProp] / n[this.sizeProp] * o;
                        this.setState({
                            containerSize: o,
                            size: r,
                            thumbOffset: Math.min(this.state.thumbOffset, o - r)
                        }, this.scrollEvent.raise)
                    }
                },
                scroll: function(e, t) {
                    if (this.state.size > 0) {
                        1 == t && (e *= 8);
                        var n = this.getScrollSize() - this.state.size,
                            o = this.state.thumbOffset + e;
                        return 0 > o && (o = 0), o > n && (o = n), this.setState({
                            thumbOffset: o
                        }, this.scrollEvent.raise), !0
                    }
                    return !1
                },
                onWheel: function(e) {
                    this.scroll(e.deltaY, e.deltaMode), e.stopPropagation(), e.preventDefault()
                },
                render: function() {
                    var e = {
                        padding: 0
                    };
                    e[this.sizeProp] = this.state.size, e[this.offsetCssProp] = this.state.thumbOffset;
                    var t = {};
                    t[this.sizeProp] = this.state.containerSize;
                    var n = "orb-scrollthumb " + this.props.pivotTableComp.pgrid.config.theme.getButtonClasses().scrollBar,
                        o = this.state.size <= 0 ? null : React.createElement("div", {
                            className: n,
                            style: e,
                            ref: "scrollThumb",
                            onMouseDown: this.onMouseDown
                        });
                    return React.createElement("div", {
                        className: this.cssClass,
                        style: t,
                        onWheel: this.onWheel
                    }, o)
                }
            };
            t.exports.HorizontalScrollBar = l.createClass({
                mixins: [C],
                posProp: "x",
                mousePosProp: "pageX",
                sizeProp: "width",
                offsetCssProp: "left",
                cssClass: "orb-h-scrollbar"
            }), t.exports.VerticalScrollBar = l.createClass({
                mixins: [C],
                posProp: "y",
                mousePosProp: "pageY",
                sizeProp: "height",
                offsetCssProp: "top",
                cssClass: "orb-v-scrollbar"
            }), t.exports.FilterPanel = l.createClass({
                pgridwidget: null,
                values: null,
                filterManager: null,
                getInitialState: function() {
                    return this.pgridwidget = this.props.pivotTableComp.pgridwidget, {}
                },
                destroy: function() {
                    var e = this.getDOMNode().parentNode;
                    React.unmountComponentAtNode(e), e.parentNode.removeChild(e)
                },
                onFilter: function(e, t, n, o) {
                    this.props.pivotTableComp.applyFilter(this.props.field, e, t, n, o), this.destroy()
                },
                onMouseDown: function(e) {
                    for (var t = this.getDOMNode().parentNode, n = e.target; null != n;) {
                        if (n == t) return !0;
                        n = n.parentNode
                    }
                    this.destroy()
                },
                onMouseWheel: function(e) {
                    for (var t = this.refs.valuesTable.getDOMNode(), n = e.target; null != n;) {
                        if (n == t) return void(t.scrollHeight <= t.clientHeight && (e.stopPropagation(), e.preventDefault()));
                        n = n.parentNode
                    }
                    this.destroy()
                },
                componentWillMount: function() {
                    document.addEventListener("mousedown", this.onMouseDown), document.addEventListener("wheel", this.onMouseWheel), window.addEventListener("resize", this.destroy)
                },
                componentDidMount: function() {
                    this.filterManager.init(this.getDOMNode())
                },
                componentWillUnmount: function() {
                    document.removeEventListener("mousedown", this.onMouseDown), document.removeEventListener("wheel", this.onMouseWheel), window.removeEventListener("resize", this.destroy)
                },
                render: function() {
                    function e(e, t) {
                        return n.push(React.createElement("tr", {
                            key: e
                        }, React.createElement("td", {
                            className: "fltr-chkbox"
                        }, React.createElement("input", {
                            type: "checkbox",
                            value: e,
                            defaultChecked: "checked"
                        })), React.createElement("td", {
                            className: "fltr-val",
                            title: t || e
                        }, t || e)))
                    }
                    var t = h.Dropdown,
                        n = [];
                    this.filterManager = new a(this, this.pgridwidget.pgrid.getFieldFilter(this.props.field)), this.values = this.pgridwidget.pgrid.getFieldValues(this.props.field), e(d.ALL, "(Show All)"), this.values.containsBlank && e(d.BLANK, "(Blank)");
                    for (var o = 0; o < this.values.length; o++) e(this.values[o]);
                    var r = this.props.pivotTableComp.pgrid.config.theme.getButtonClasses().orbButton,
                        i = window.getComputedStyle(this.props.pivotTableComp.getDOMNode(), null),
                        l = {
                            fontFamily: i.getPropertyValue("font-family"),
                            fontSize: i.getPropertyValue("font-size")
                        },
                        s = this.pgridwidget.pgrid.getFieldFilter(this.props.field);
                    return React.createElement("table", {
                        className: "fltr-scntnr",
                        style: l
                    }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                        className: "srchop-col"
                    }, React.createElement(t, {
                        values: [d.Operators.MATCH.name, d.Operators.NOTMATCH.name, d.Operators.EQ.name, d.Operators.NEQ.name, d.Operators.GT.name, d.Operators.GTE.name, d.Operators.LT.name, d.Operators.LTE.name],
                        selectedValue: s && s.operator ? s.operator.name : d.Operators.MATCH.name,
                        onValueChanged: this.filterManager.onOperatorChanged
                    })), React.createElement("td", {
                        className: "srchtyp-col",
                        title: "Enable/disable Regular expressions"
                    }, ".*"), React.createElement("td", {
                        className: "srchbox-col"
                    }, React.createElement("table", {
                        style: {
                            width: "100%"
                        }
                    }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null, React.createElement("input", {
                        type: "text",
                        placeholder: "search"
                    })), React.createElement("td", null, React.createElement("div", {
                        className: "srchclear-btn",
                        onClick: this.clearFilter
                    }, "x"))))))), React.createElement("tr", null, React.createElement("td", {
                        colSpan: "3",
                        className: "fltr-vals-col"
                    }, React.createElement("table", {
                        className: "fltr-vals-tbl",
                        ref: "valuesTable"
                    }, React.createElement("tbody", null, n)))), React.createElement("tr", {
                        className: "bottom-row"
                    }, React.createElement("td", {
                        className: "cnfrm-btn-col",
                        colSpan: "2"
                    }, React.createElement("input", {
                        type: "button",
                        className: r,
                        value: "Ok",
                        style: {
                            "float": "left"
                        }
                    }), React.createElement("input", {
                        type: "button",
                        className: r,
                        value: "Cancel",
                        style: {
                            "float": "left"
                        }
                    })), React.createElement("td", {
                        className: "resize-col"
                    }, React.createElement("div", null)))))
                }
            }), t.exports.Dropdown = l.createClass({
                openOrClose: function(e) {
                    var t = this.refs.valueElement.getDOMNode(),
                        n = this.refs.valuesList.getDOMNode();
                    n.style.display = e.target === t && "none" === n.style.display ? "block" : "none"
                },
                onMouseEnter: function() {
                    var e = this.refs.valueElement.getDOMNode();
                    e.className = "orb-tgl-btn-down", e.style.backgroundPosition = "right center"
                },
                onMouseLeave: function() {
                    this.refs.valueElement.getDOMNode().className = ""
                },
                componentDidMount: function() {
                    document.addEventListener("click", this.openOrClose)
                },
                componentWillUnmount: function() {
                    document.removeEventListener("click", this.openOrClose)
                },
                selectValue: function(e) {
                    for (var t = this.refs.valuesList.getDOMNode(), n = e.target, o = !1; !o && null != n;) {
                        if (n.parentNode == t) {
                            o = !0;
                            break
                        }
                        n = n.parentNode
                    }
                    if (o) {
                        var r = n.textContent,
                            a = this.refs.valueElement.getDOMNode();
                        a.textContent != r && (a.textContent = r, this.props.onValueChanged && this.props.onValueChanged(r))
                    }
                },
                render: function() {
                    for (var e = [], t = 0; t < this.props.values.length; t++) e.push(React.createElement("li", {
                        key: "item" + t,
                        dangerouslySetInnerHTML: {
                            __html: this.props.values[t]
                        }
                    }));
                    return React.createElement("div", {
                        className: "orb-select"
                    }, React.createElement("div", {
                        ref: "valueElement",
                        dangerouslySetInnerHTML: {
                            __html: this.props.selectedValue
                        },
                        onMouseEnter: this.onMouseEnter,
                        onMouseLeave: this.onMouseLeave
                    }), React.createElement("ul", {
                        ref: "valuesList",
                        style: {
                            display: "none"
                        },
                        onClick: this.selectValue
                    }, e))
                }
            }), t.exports.Grid = l.createClass({
                render: function() {
                    var e = this.props.data,
                        t = this.props.headers,
                        n = this.props.theme.getGridClasses(),
                        o = [];
                    if (t && t.length > 0) {
                        for (var r = [], a = 0; a < t.length; a++) r.push(React.createElement("th", {
                            key: "h" + a
                        }, t[a]));
                        o.push(React.createElement("tr", {
                            key: "h"
                        }, r))
                    }
                    if (e && e.length > 0)
                        for (var i = 0; i < e.length; i++) {
                            var l = [];
                            if (s.isArray(e[i]))
                                for (var u = 0; u < e[i].length; u++) l.push(React.createElement("td", {
                                    key: i + "" + u
                                }, e[i][u]));
                            else
                                for (var c in e[i]) e[i].hasOwnProperty(c) && l.push(React.createElement("td", {
                                    key: i + "" + c
                                }, e[i][c]));
                            o.push(React.createElement("tr", {
                                key: i
                            }, l))
                        }
                    return React.createElement("table", {
                        className: n.table
                    }, React.createElement("tbody", null, o))
                }
            });
            var T = t.exports.Dialog = l.createClass({
                statics: {
                    create: function() {
                        var e = React.createFactory(T),
                            t = i();
                        return {
                            show: function(n) {
                                React.render(e(n), t)
                            }
                        }
                    }
                },
                overlayElement: null,
                setOverlayClass: function(e) {
                    this.overlayElement.className = this.props.theme.getDialogClasses(e).overlay
                },
                componentDidMount: function() {
                    this.overlayElement = this.getDOMNode().parentNode, this.setOverlayClass(!0), this.overlayElement.addEventListener("click", this.close);
                    var e = this.overlayElement.children[0],
                        t = e.children[0].children[1],
                        n = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
                        o = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                        r = 2 * o / 3;
                    r = 301 > r ? 301 : r;
                    var a = e.offsetWidth + (e.offsetHeight > r ? 11 : 0),
                        i = e.offsetHeight > r ? r : e.offsetHeight;
                    e.style.top = (o > i ? (o - i) / 2 : 0) + "px", e.style.left = (n > a ? (n - a) / 2 : 0) + "px", e.style.height = i + "px", t.style.width = a + "px", t.style.height = i - 45 + "px"
                },
                close: function(e) {
                    (e.target == this.overlayElement || "button-close" === e.target.className) && (this.overlayElement.removeEventListener("click", this.close), React.unmountComponentAtNode(this.overlayElement), this.setOverlayClass(!1))
                },
                render: function() {
                    if (this.props.comp) {
                        var e = React.createElement(this.props.comp.type, this.props.comp.props),
                            t = this.props.theme.getDialogClasses();
                        return React.createElement("div", {
                            className: t.dialog,
                            style: this.props.style || {}
                        }, React.createElement("div", {
                            className: t.content
                        }, React.createElement("div", {
                            className: t.header
                        }, React.createElement("div", {
                            className: "button-close",
                            onClick: this.close
                        }), React.createElement("div", {
                            className: t.title
                        }, this.props.title)), React.createElement("div", {
                            className: t.body
                        }, e)))
                    }
                }
            });
            t.exports.Toolbar = l.createClass({
                _toInit: [],
                componentDidMount: function() {
                    for (var e = 0; e < this._toInit.length; e++) {
                        var t = this._toInit[e];
                        t.init(this.props.pivotTableComp, this.refs[t.ref].getDOMNode())
                    }
                },
                componentDidUpdate: function() {
                    for (var e = 0; e < this._toInit.length; e++) {
                        var t = this._toInit[e];
                        t.init(this.props.pivotTableComp, this.refs[t.ref].getDOMNode())
                    }
                },
                createCallback: function(e) {
                    if (null != e) {
                        var t = this.props.pivotTableComp;
                        return function(n) {
                            e(t, n.target)
                        }
                    }
                    return null
                },
                render: function() {
                    var e = this.props.pivotTableComp.pgridwidget.pgrid.config;
                    if (e.toolbar && e.toolbar.visible) {
                        for (var t = e.toolbar.buttons ? R.buttons.concat(e.toolbar.buttons) : R.buttons, n = [], o = 0; o < t.length; o++) {
                            var r = t[o],
                                a = "btn" + o;
                            n.push("separator" == r.type ? React.createElement("div", {
                                key: o,
                                className: "orb-tlbr-sep"
                            }) : "label" == r.type ? React.createElement("div", {
                                key: o,
                                className: "orb-tlbr-lbl"
                            }, r.text) : React.createElement("div", {
                                key: o,
                                className: "orb-tlbr-btn " + r.cssClass,
                                title: r.tooltip,
                                ref: a,
                                onClick: this.createCallback(r.action)
                            })), r.init && this._toInit.push({
                                ref: a,
                                init: r.init
                            })
                        }
                        return React.createElement("div", null, n)
                    }
                    return React.createElement("div", null)
                }
            });
            var w = e("../orb.export.excel"),
                R = {
                    exportToExcel: function(e) {
                        var t = document.createElement("a");
                        t.download = "orbpivotgrid.xls", t.href = w(e.props.pgridwidget), document.body.appendChild(t), t.click(), document.body.removeChild(t)
                    },
                    expandAllRows: function(e) {
                        e.toggleFieldExpansion(u.Type.ROWS, null, !0)
                    },
                    collapseAllRows: function(e) {
                        e.toggleFieldExpansion(u.Type.ROWS, null, !1)
                    },
                    expandAllColumns: function(e) {
                        e.toggleFieldExpansion(u.Type.COLUMNS, null, !0)
                    },
                    collapseAllColumns: function(e) {
                        e.toggleFieldExpansion(u.Type.COLUMNS, null, !1)
                    },
                    updateSubtotalsButton: function(e, t, n) {
                        var o = t.pgridwidget.areSubtotalsVisible(e);
                        n.style.display = null === o ? "none" : "";
                        var r = "",
                            a = "";
                        o ? (r = "subtotals-visible", a = "subtotals-hidden") : (r = "subtotals-hidden", a = "subtotals-visible"), p.removeClass(n, a), p.addClass(n, r)
                    },
                    initSubtotals: function(e) {
                        var t = this;
                        return function(n, o) {
                            t.updateSubtotalsButton(e, n, o)
                        }
                    },
                    toggleSubtotals: function(e) {
                        var t = this;
                        return function(n, o) {
                            n.toggleSubtotals(e), t.updateSubtotalsButton(e, n, o)
                        }
                    },
                    updateGrandtotalButton: function(e, t, n) {
                        var o = t.pgridwidget.isGrandtotalVisible(e);
                        n.style.display = null === o ? "none" : "";
                        var r = "",
                            a = "";
                        o ? (r = "grndtotal-visible", a = "grndtotal-hidden") : (r = "grndtotal-hidden", a = "grndtotal-visible"), p.removeClass(n, a), p.addClass(n, r)
                    },
                    initGrandtotal: function(e) {
                        var t = this;
                        return function(n, o) {
                            t.updateGrandtotalButton(e, n, o)
                        }
                    },
                    toggleGrandtotal: function(e) {
                        var t = this;
                        return function(n, o) {
                            n.toggleGrandtotal(e), t.updateGrandtotalButton(e, n, o)
                        }
                    }
                };
            R.buttons = [{
                type: "label",
                text: "Rows:"
            }, {
                type: "button",
                tooltip: "Expand all rows",
                cssClass: "expand-all",
                action: R.expandAllRows
            }, {
                type: "button",
                tooltip: "Collapse all rows",
                cssClass: "collapse-all",
                action: R.collapseAllRows
            }, {
                type: "button",
                tooltip: "Toggle rows sub totals",
                init: R.initSubtotals(u.Type.ROWS),
                action: R.toggleSubtotals(u.Type.ROWS)
            }, {
                type: "button",
                tooltip: "Toggle rows grand total",
                init: R.initGrandtotal(u.Type.ROWS),
                action: R.toggleGrandtotal(u.Type.ROWS)
            }, {
                type: "separator"
            }, {
                type: "label",
                text: "Columns:"
            }, {
                type: "button",
                tooltip: "Expand all columns",
                cssClass: "expand-all",
                action: R.expandAllColumns
            }, {
                type: "button",
                tooltip: "Collapse all columns",
                cssClass: "collapse-all",
                action: R.collapseAllColumns
            }, {
                type: "button",
                tooltip: "Toggle columns sub totals",
                init: R.initSubtotals(u.Type.COLUMNS),
                action: R.toggleSubtotals(u.Type.COLUMNS)
            }, {
                type: "button",
                tooltip: "Toggle columns grand total",
                init: R.initGrandtotal(u.Type.COLUMNS),
                action: R.toggleGrandtotal(u.Type.COLUMNS)
            }, {
                type: "separator"
            }, {
                type: "label",
                text: "Export:"
            }, {
                type: "button",
                tooltip: "Export to Excel",
                cssClass: "export-xls",
                action: R.exportToExcel
            }]
        }, {
            "../orb.axe": 3,
            "../orb.export.excel": 6,
            "../orb.filtering": 7,
            "../orb.ui.header": 14,
            "../orb.utils": 17,
            "./orb.react.utils": 19,
            react: void 0
        }],
        19: [function(e, t) {
            t.exports.forEach = function(e, t, n) {
                var o;
                if (e)
                    for (var r = 0, a = e.length; a > r && (o = t(e[r], r), void 0 === o || n !== !0); r++);
                return o
            }, t.exports.removeClass = function(e, t) {
                if (e && t)
                    for (; e.className.indexOf(t) >= 0;) e.className = e.className.replace(t, "")
            }, t.exports.addClass = function(e, t) {
                e && t && e.className.indexOf(t) < 0 && (e.className += " " + t)
            }, t.exports.getOffset = function(e) {
                if (e) {
                    var t = e.getBoundingClientRect();
                    return {
                        x: t.left,
                        y: t.top
                    }
                }
                return {
                    x: 0,
                    y: 0
                }
            }, t.exports.getParentOffset = function(e) {
                if (e) {
                    var t = e.getBoundingClientRect(),
                        n = null != e.parentNode ? e.parentNode.getBoundingClientRect() : {
                            top: 0,
                            left: 0
                        };
                    return {
                        x: t.left - n.left,
                        y: t.top - n.top
                    }
                }
                return {
                    x: 0,
                    y: 0
                }
            }, t.exports.getSize = function(e) {
                if (e) {
                    var t = e.getBoundingClientRect();
                    return {
                        width: t.right - t.left,
                        height: t.bottom - t.top
                    }
                }
                return {
                    width: 0,
                    height: 0
                }
            }, t.exports.getStyle = function(e, t, n) {
                var o = [];
                if (e && t) {
                    var r, a;
                    e.currentStyle ? (r = e.currentStyle, a = function(e) {
                        return r[e]
                    }) : window && window.getComputedStyle && (r = window.getComputedStyle(e, null), a = function(e) {
                        return r.getPropertyValue(e)
                    });
                    for (var i = 0; i < t.length; i++) {
                        var l = a(t[i]);
                        o.push(l && n !== !0 ? Math.ceil(parseFloat(l)) : l)
                    }
                }
                return o
            }, t.exports.isVisible = function(e) {
                return e ? "none" !== e.style.display && (0 !== e.offsetWidth || 0 !== e.offsetHeight) : !1
            }, t.exports.updateTableColGroup = function(e, t) {
                if (e) {
                    var n = e.firstChild;
                    if (n && "COLGROUP" === n.nodeName) {
                        e.style.tableLayout = "auto", e.style.width = "", n.innerHTML = "";
                        for (var o = 0; o < t.length; o++) {
                            var r = document.createElement("col");
                            r.style.width = t[o] + "px", n.appendChild(r)
                        }
                        e.style.tableLayout = "fixed"
                    }
                }
            }
        }, {}]
    }, {}, [1])(1)
});
//# sourceMappingURL=orb.min.js.map
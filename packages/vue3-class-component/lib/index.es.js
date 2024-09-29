import * as U from "vue";
import { isRef as H, isReactive as ce, watch as Ge, watchEffect as $e, inject as Le, provide as Be, markRaw as Je, defineComponent as Ye, reactive as qe, onUnmounted as ze } from "vue";
var le = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var de;
(function(n) {
  (function(a) {
    var o = typeof globalThis == "object" ? globalThis : typeof le == "object" ? le : typeof self == "object" ? self : typeof this == "object" ? this : b(), h = f(n);
    typeof o.Reflect < "u" && (h = f(o.Reflect, h)), a(h, o), typeof o.Reflect > "u" && (o.Reflect = n);
    function f(P, g) {
      return function(A, S) {
        Object.defineProperty(P, A, { configurable: !0, writable: !0, value: S }), g && g(A, S);
      };
    }
    function _() {
      try {
        return Function("return this;")();
      } catch {
      }
    }
    function w() {
      try {
        return (0, eval)("(function() { return this; })()");
      } catch {
      }
    }
    function b() {
      return _() || w();
    }
  })(function(a, o) {
    var h = Object.prototype.hasOwnProperty, f = typeof Symbol == "function", _ = f && typeof Symbol.toPrimitive < "u" ? Symbol.toPrimitive : "@@toPrimitive", w = f && typeof Symbol.iterator < "u" ? Symbol.iterator : "@@iterator", b = typeof Object.create == "function", P = { __proto__: [] } instanceof Array, g = !b && !P, A = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: b ? function() {
        return B(/* @__PURE__ */ Object.create(null));
      } : P ? function() {
        return B({ __proto__: null });
      } : function() {
        return B({});
      },
      has: g ? function(e, t) {
        return h.call(e, t);
      } : function(e, t) {
        return t in e;
      },
      get: g ? function(e, t) {
        return h.call(e, t) ? e[t] : void 0;
      } : function(e, t) {
        return e[t];
      }
    }, S = Object.getPrototypeOf(Function), C = typeof Map == "function" && typeof Map.prototype.entries == "function" ? Map : We(), V = typeof Set == "function" && typeof Set.prototype.entries == "function" ? Set : xe(), N = typeof WeakMap == "function" ? WeakMap : Fe(), D = f ? Symbol.for("@reflect-metadata:registry") : void 0, F = Ve(), Y = De(F);
    function ve(e, t, r, i) {
      if (p(r)) {
        if (!re(e))
          throw new TypeError();
        if (!ne(t))
          throw new TypeError();
        return Pe(e, t);
      } else {
        if (!re(e))
          throw new TypeError();
        if (!R(t))
          throw new TypeError();
        if (!R(i) && !p(i) && !j(i))
          throw new TypeError();
        return j(i) && (i = void 0), r = I(r), be(e, t, r, i);
      }
    }
    a("decorate", ve);
    function Ee(e, t) {
      function r(i, d) {
        if (!R(i))
          throw new TypeError();
        if (!p(d) && !ke(d))
          throw new TypeError();
        X(e, t, i, d);
      }
      return r;
    }
    a("metadata", Ee);
    function ye(e, t, r, i) {
      if (!R(r))
        throw new TypeError();
      return p(i) || (i = I(i)), X(e, t, r, i);
    }
    a("defineMetadata", ye);
    function we(e, t, r) {
      if (!R(t))
        throw new TypeError();
      return p(r) || (r = I(r)), q(e, t, r);
    }
    a("hasMetadata", we);
    function Te(e, t, r) {
      if (!R(t))
        throw new TypeError();
      return p(r) || (r = I(r)), G(e, t, r);
    }
    a("hasOwnMetadata", Te);
    function ge(e, t, r) {
      if (!R(t))
        throw new TypeError();
      return p(r) || (r = I(r)), z(e, t, r);
    }
    a("getMetadata", ge);
    function Re(e, t, r) {
      if (!R(t))
        throw new TypeError();
      return p(r) || (r = I(r)), Q(e, t, r);
    }
    a("getOwnMetadata", Re);
    function Me(e, t) {
      if (!R(e))
        throw new TypeError();
      return p(t) || (t = I(t)), Z(e, t);
    }
    a("getMetadataKeys", Me);
    function Oe(e, t) {
      if (!R(e))
        throw new TypeError();
      return p(t) || (t = I(t)), K(e, t);
    }
    a("getOwnMetadataKeys", Oe);
    function me(e, t, r) {
      if (!R(t))
        throw new TypeError();
      if (p(r) || (r = I(r)), !R(t))
        throw new TypeError();
      p(r) || (r = I(r));
      var i = x(
        t,
        r,
        /*Create*/
        !1
      );
      return p(i) ? !1 : i.OrdinaryDeleteMetadata(e, t, r);
    }
    a("deleteMetadata", me);
    function Pe(e, t) {
      for (var r = e.length - 1; r >= 0; --r) {
        var i = e[r], d = i(t);
        if (!p(d) && !j(d)) {
          if (!ne(d))
            throw new TypeError();
          t = d;
        }
      }
      return t;
    }
    function be(e, t, r, i) {
      for (var d = e.length - 1; d >= 0; --d) {
        var M = e[d], m = M(t, r, i);
        if (!p(m) && !j(m)) {
          if (!R(m))
            throw new TypeError();
          i = m;
        }
      }
      return i;
    }
    function q(e, t, r) {
      var i = G(e, t, r);
      if (i)
        return !0;
      var d = L(t);
      return j(d) ? !1 : q(e, d, r);
    }
    function G(e, t, r) {
      var i = x(
        t,
        r,
        /*Create*/
        !1
      );
      return p(i) ? !1 : te(i.OrdinaryHasOwnMetadata(e, t, r));
    }
    function z(e, t, r) {
      var i = G(e, t, r);
      if (i)
        return Q(e, t, r);
      var d = L(t);
      if (!j(d))
        return z(e, d, r);
    }
    function Q(e, t, r) {
      var i = x(
        t,
        r,
        /*Create*/
        !1
      );
      if (!p(i))
        return i.OrdinaryGetOwnMetadata(e, t, r);
    }
    function X(e, t, r, i) {
      var d = x(
        r,
        i,
        /*Create*/
        !0
      );
      d.OrdinaryDefineOwnMetadata(e, t, r, i);
    }
    function Z(e, t) {
      var r = K(e, t), i = L(e);
      if (i === null)
        return r;
      var d = Z(i, t);
      if (d.length <= 0)
        return r;
      if (r.length <= 0)
        return d;
      for (var M = new V(), m = [], v = 0, u = r; v < u.length; v++) {
        var s = u[v], c = M.has(s);
        c || (M.add(s), m.push(s));
      }
      for (var l = 0, E = d; l < E.length; l++) {
        var s = E[l], c = M.has(s);
        c || (M.add(s), m.push(s));
      }
      return m;
    }
    function K(e, t) {
      var r = x(
        e,
        t,
        /*create*/
        !1
      );
      return r ? r.OrdinaryOwnMetadataKeys(e, t) : [];
    }
    function ee(e) {
      if (e === null)
        return 1;
      switch (typeof e) {
        case "undefined":
          return 0;
        case "boolean":
          return 2;
        case "string":
          return 3;
        case "symbol":
          return 4;
        case "number":
          return 5;
        case "object":
          return e === null ? 1 : 6;
        default:
          return 6;
      }
    }
    function p(e) {
      return e === void 0;
    }
    function j(e) {
      return e === null;
    }
    function Ae(e) {
      return typeof e == "symbol";
    }
    function R(e) {
      return typeof e == "object" ? e !== null : typeof e == "function";
    }
    function Ue(e, t) {
      switch (ee(e)) {
        case 0:
          return e;
        case 1:
          return e;
        case 2:
          return e;
        case 3:
          return e;
        case 4:
          return e;
        case 5:
          return e;
      }
      var r = t === 3 ? "string" : t === 5 ? "number" : "default", i = oe(e, _);
      if (i !== void 0) {
        var d = i.call(e, r);
        if (R(d))
          throw new TypeError();
        return d;
      }
      return Se(e, r === "default" ? "number" : r);
    }
    function Se(e, t) {
      if (t === "string") {
        var r = e.toString;
        if (W(r)) {
          var i = r.call(e);
          if (!R(i))
            return i;
        }
        var d = e.valueOf;
        if (W(d)) {
          var i = d.call(e);
          if (!R(i))
            return i;
        }
      } else {
        var d = e.valueOf;
        if (W(d)) {
          var i = d.call(e);
          if (!R(i))
            return i;
        }
        var M = e.toString;
        if (W(M)) {
          var i = M.call(e);
          if (!R(i))
            return i;
        }
      }
      throw new TypeError();
    }
    function te(e) {
      return !!e;
    }
    function Ce(e) {
      return "" + e;
    }
    function I(e) {
      var t = Ue(
        e,
        3
        /* String */
      );
      return Ae(t) ? t : Ce(t);
    }
    function re(e) {
      return Array.isArray ? Array.isArray(e) : e instanceof Object ? e instanceof Array : Object.prototype.toString.call(e) === "[object Array]";
    }
    function W(e) {
      return typeof e == "function";
    }
    function ne(e) {
      return typeof e == "function";
    }
    function ke(e) {
      switch (ee(e)) {
        case 3:
          return !0;
        case 4:
          return !0;
        default:
          return !1;
      }
    }
    function $(e, t) {
      return e === t || e !== e && t !== t;
    }
    function oe(e, t) {
      var r = e[t];
      if (r != null) {
        if (!W(r))
          throw new TypeError();
        return r;
      }
    }
    function ae(e) {
      var t = oe(e, w);
      if (!W(t))
        throw new TypeError();
      var r = t.call(e);
      if (!R(r))
        throw new TypeError();
      return r;
    }
    function ie(e) {
      return e.value;
    }
    function ue(e) {
      var t = e.next();
      return t.done ? !1 : t;
    }
    function fe(e) {
      var t = e.return;
      t && t.call(e);
    }
    function L(e) {
      var t = Object.getPrototypeOf(e);
      if (typeof e != "function" || e === S || t !== S)
        return t;
      var r = e.prototype, i = r && Object.getPrototypeOf(r);
      if (i == null || i === Object.prototype)
        return t;
      var d = i.constructor;
      return typeof d != "function" || d === e ? t : d;
    }
    function Ie() {
      var e;
      !p(D) && typeof o.Reflect < "u" && !(D in o.Reflect) && typeof o.Reflect.defineMetadata == "function" && (e = je(o.Reflect));
      var t, r, i, d = new N(), M = {
        registerProvider: m,
        getProvider: u,
        setProvider: c
      };
      return M;
      function m(l) {
        if (!Object.isExtensible(M))
          throw new Error("Cannot add provider to a frozen registry.");
        switch (!0) {
          case e === l:
            break;
          case p(t):
            t = l;
            break;
          case t === l:
            break;
          case p(r):
            r = l;
            break;
          case r === l:
            break;
          default:
            i === void 0 && (i = new V()), i.add(l);
            break;
        }
      }
      function v(l, E) {
        if (!p(t)) {
          if (t.isProviderFor(l, E))
            return t;
          if (!p(r)) {
            if (r.isProviderFor(l, E))
              return t;
            if (!p(i))
              for (var T = ae(i); ; ) {
                var O = ue(T);
                if (!O)
                  return;
                var k = ie(O);
                if (k.isProviderFor(l, E))
                  return fe(T), k;
              }
          }
        }
        if (!p(e) && e.isProviderFor(l, E))
          return e;
      }
      function u(l, E) {
        var T = d.get(l), O;
        return p(T) || (O = T.get(E)), p(O) && (O = v(l, E), p(O) || (p(T) && (T = new C(), d.set(l, T)), T.set(E, O))), O;
      }
      function s(l) {
        if (p(l))
          throw new TypeError();
        return t === l || r === l || !p(i) && i.has(l);
      }
      function c(l, E, T) {
        if (!s(T))
          throw new Error("Metadata provider not registered.");
        var O = u(l, E);
        if (O !== T) {
          if (!p(O))
            return !1;
          var k = d.get(l);
          p(k) && (k = new C(), d.set(l, k)), k.set(E, T);
        }
        return !0;
      }
    }
    function Ve() {
      var e;
      return !p(D) && R(o.Reflect) && Object.isExtensible(o.Reflect) && (e = o.Reflect[D]), p(e) && (e = Ie()), !p(D) && R(o.Reflect) && Object.isExtensible(o.Reflect) && Object.defineProperty(o.Reflect, D, {
        enumerable: !1,
        configurable: !1,
        writable: !1,
        value: e
      }), e;
    }
    function De(e) {
      var t = new N(), r = {
        isProviderFor: function(s, c) {
          var l = t.get(s);
          return p(l) ? !1 : l.has(c);
        },
        OrdinaryDefineOwnMetadata: m,
        OrdinaryHasOwnMetadata: d,
        OrdinaryGetOwnMetadata: M,
        OrdinaryOwnMetadataKeys: v,
        OrdinaryDeleteMetadata: u
      };
      return F.registerProvider(r), r;
      function i(s, c, l) {
        var E = t.get(s), T = !1;
        if (p(E)) {
          if (!l)
            return;
          E = new C(), t.set(s, E), T = !0;
        }
        var O = E.get(c);
        if (p(O)) {
          if (!l)
            return;
          if (O = new C(), E.set(c, O), !e.setProvider(s, c, r))
            throw E.delete(c), T && t.delete(s), new Error("Wrong provider for target.");
        }
        return O;
      }
      function d(s, c, l) {
        var E = i(
          c,
          l,
          /*Create*/
          !1
        );
        return p(E) ? !1 : te(E.has(s));
      }
      function M(s, c, l) {
        var E = i(
          c,
          l,
          /*Create*/
          !1
        );
        if (!p(E))
          return E.get(s);
      }
      function m(s, c, l, E) {
        var T = i(
          l,
          E,
          /*Create*/
          !0
        );
        T.set(s, c);
      }
      function v(s, c) {
        var l = [], E = i(
          s,
          c,
          /*Create*/
          !1
        );
        if (p(E))
          return l;
        for (var T = E.keys(), O = ae(T), k = 0; ; ) {
          var se = ue(O);
          if (!se)
            return l.length = k, l;
          var He = ie(se);
          try {
            l[k] = He;
          } catch (Ne) {
            try {
              fe(O);
            } finally {
              throw Ne;
            }
          }
          k++;
        }
      }
      function u(s, c, l) {
        var E = i(
          c,
          l,
          /*Create*/
          !1
        );
        if (p(E) || !E.delete(s))
          return !1;
        if (E.size === 0) {
          var T = t.get(c);
          p(T) || (T.delete(l), T.size === 0 && t.delete(T));
        }
        return !0;
      }
    }
    function je(e) {
      var t = e.defineMetadata, r = e.hasOwnMetadata, i = e.getOwnMetadata, d = e.getOwnMetadataKeys, M = e.deleteMetadata, m = new N(), v = {
        isProviderFor: function(u, s) {
          var c = m.get(u);
          return !p(c) && c.has(s) ? !0 : d(u, s).length ? (p(c) && (c = new V(), m.set(u, c)), c.add(s), !0) : !1;
        },
        OrdinaryDefineOwnMetadata: t,
        OrdinaryHasOwnMetadata: r,
        OrdinaryGetOwnMetadata: i,
        OrdinaryOwnMetadataKeys: d,
        OrdinaryDeleteMetadata: M
      };
      return v;
    }
    function x(e, t, r) {
      var i = F.getProvider(e, t);
      if (!p(i))
        return i;
      if (r) {
        if (F.setProvider(e, t, Y))
          return Y;
        throw new Error("Illegal state.");
      }
    }
    function We() {
      var e = {}, t = [], r = (
        /** @class */
        function() {
          function v(u, s, c) {
            this._index = 0, this._keys = u, this._values = s, this._selector = c;
          }
          return v.prototype["@@iterator"] = function() {
            return this;
          }, v.prototype[w] = function() {
            return this;
          }, v.prototype.next = function() {
            var u = this._index;
            if (u >= 0 && u < this._keys.length) {
              var s = this._selector(this._keys[u], this._values[u]);
              return u + 1 >= this._keys.length ? (this._index = -1, this._keys = t, this._values = t) : this._index++, { value: s, done: !1 };
            }
            return { value: void 0, done: !0 };
          }, v.prototype.throw = function(u) {
            throw this._index >= 0 && (this._index = -1, this._keys = t, this._values = t), u;
          }, v.prototype.return = function(u) {
            return this._index >= 0 && (this._index = -1, this._keys = t, this._values = t), { value: u, done: !0 };
          }, v;
        }()
      ), i = (
        /** @class */
        function() {
          function v() {
            this._keys = [], this._values = [], this._cacheKey = e, this._cacheIndex = -2;
          }
          return Object.defineProperty(v.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: !0,
            configurable: !0
          }), v.prototype.has = function(u) {
            return this._find(
              u,
              /*insert*/
              !1
            ) >= 0;
          }, v.prototype.get = function(u) {
            var s = this._find(
              u,
              /*insert*/
              !1
            );
            return s >= 0 ? this._values[s] : void 0;
          }, v.prototype.set = function(u, s) {
            var c = this._find(
              u,
              /*insert*/
              !0
            );
            return this._values[c] = s, this;
          }, v.prototype.delete = function(u) {
            var s = this._find(
              u,
              /*insert*/
              !1
            );
            if (s >= 0) {
              for (var c = this._keys.length, l = s + 1; l < c; l++)
                this._keys[l - 1] = this._keys[l], this._values[l - 1] = this._values[l];
              return this._keys.length--, this._values.length--, $(u, this._cacheKey) && (this._cacheKey = e, this._cacheIndex = -2), !0;
            }
            return !1;
          }, v.prototype.clear = function() {
            this._keys.length = 0, this._values.length = 0, this._cacheKey = e, this._cacheIndex = -2;
          }, v.prototype.keys = function() {
            return new r(this._keys, this._values, d);
          }, v.prototype.values = function() {
            return new r(this._keys, this._values, M);
          }, v.prototype.entries = function() {
            return new r(this._keys, this._values, m);
          }, v.prototype["@@iterator"] = function() {
            return this.entries();
          }, v.prototype[w] = function() {
            return this.entries();
          }, v.prototype._find = function(u, s) {
            if (!$(this._cacheKey, u)) {
              this._cacheIndex = -1;
              for (var c = 0; c < this._keys.length; c++)
                if ($(this._keys[c], u)) {
                  this._cacheIndex = c;
                  break;
                }
            }
            return this._cacheIndex < 0 && s && (this._cacheIndex = this._keys.length, this._keys.push(u), this._values.push(void 0)), this._cacheIndex;
          }, v;
        }()
      );
      return i;
      function d(v, u) {
        return v;
      }
      function M(v, u) {
        return u;
      }
      function m(v, u) {
        return [v, u];
      }
    }
    function xe() {
      var e = (
        /** @class */
        function() {
          function t() {
            this._map = new C();
          }
          return Object.defineProperty(t.prototype, "size", {
            get: function() {
              return this._map.size;
            },
            enumerable: !0,
            configurable: !0
          }), t.prototype.has = function(r) {
            return this._map.has(r);
          }, t.prototype.add = function(r) {
            return this._map.set(r, r), this;
          }, t.prototype.delete = function(r) {
            return this._map.delete(r);
          }, t.prototype.clear = function() {
            this._map.clear();
          }, t.prototype.keys = function() {
            return this._map.keys();
          }, t.prototype.values = function() {
            return this._map.keys();
          }, t.prototype.entries = function() {
            return this._map.entries();
          }, t.prototype["@@iterator"] = function() {
            return this.keys();
          }, t.prototype[w] = function() {
            return this.keys();
          }, t;
        }()
      );
      return e;
    }
    function Fe() {
      var e = 16, t = A.create(), r = i();
      return (
        /** @class */
        function() {
          function u() {
            this._key = i();
          }
          return u.prototype.has = function(s) {
            var c = d(
              s,
              /*create*/
              !1
            );
            return c !== void 0 ? A.has(c, this._key) : !1;
          }, u.prototype.get = function(s) {
            var c = d(
              s,
              /*create*/
              !1
            );
            return c !== void 0 ? A.get(c, this._key) : void 0;
          }, u.prototype.set = function(s, c) {
            var l = d(
              s,
              /*create*/
              !0
            );
            return l[this._key] = c, this;
          }, u.prototype.delete = function(s) {
            var c = d(
              s,
              /*create*/
              !1
            );
            return c !== void 0 ? delete c[this._key] : !1;
          }, u.prototype.clear = function() {
            this._key = i();
          }, u;
        }()
      );
      function i() {
        var u;
        do
          u = "@@WeakMap@@" + v();
        while (A.has(t, u));
        return t[u] = !0, u;
      }
      function d(u, s) {
        if (!h.call(u, r)) {
          if (!s)
            return;
          Object.defineProperty(u, r, { value: A.create() });
        }
        return u[r];
      }
      function M(u, s) {
        for (var c = 0; c < s; ++c)
          u[c] = Math.random() * 255 | 0;
        return u;
      }
      function m(u) {
        if (typeof Uint8Array == "function") {
          var s = new Uint8Array(u);
          return typeof crypto < "u" ? crypto.getRandomValues(s) : typeof msCrypto < "u" ? msCrypto.getRandomValues(s) : M(s, u), s;
        }
        return M(new Array(u), u);
      }
      function v() {
        var u = m(e);
        u[6] = u[6] & 79 | 64, u[8] = u[8] & 191 | 128;
        for (var s = "", c = 0; c < e; ++c) {
          var l = u[c];
          (c === 4 || c === 6 || c === 8) && (s += "-"), l < 16 && (s += "0"), s += l.toString(16).toLowerCase();
        }
        return s;
      }
    }
    function B(e) {
      return e.__ = void 0, delete e.__, e;
    }
  });
})(de || (de = {}));
var y = /* @__PURE__ */ ((n) => (n.TYPE_METADATA = "design:type", n.PARAMTYPES_METADATA = "design:paramtypes", n.RETURNTYPE_METADATA = "design:returntype", n.INJECTABLE_WATERMARK = "__injectable__", n.REQUEST_SERVICE = "__request__", n.GLOBAL = "__global__", n.ROUTE_ARGS_METADATA = "__routeArguments__", n.CUSTOM_ROUTE_ARGS_METADATA = "__customRouteArguments__", n.PARSE_INT_PIPE = "__parseIntPipe__", n.DEFAULT_VALUE_PIPE = "__defaultValuePipe__", n.INJECTIONS = "__injections__", n.SLEEPTIMER = "__sleepTimer__", n.TIMEOUT = "__timeout__", n.OPTIONAL = "__optional__", n.VERSION = "__version__", n.METADATATYPE = "__metadataType__", n.TOKEN = "__token__", n.CATCH_METADATA = "design:catch", n.REQUEST_METADATA = "design:request", n.INTERCEPTORSREQ_METADATA = "design:interceptorsreq", n.INTERCEPTORSRES_METADATA = "design:interceptorsres", n.TIMEOUTCALLBACK_METADATA = "design:timeoutcallback", n.MIDDLEWARECONFIGPROXYEXCLUDE_METADATA = "design:exclude", n.MIDDLEWARECONFIGPROXYFORROUTES_METADATA = "design:forRoutes", n.VUE3_OPTIONS = "__vue3Options__", n.VUE3_WATCHS = "__vue3Watchs__", n.VUE3_SETUP_METHODS = "__vue3SetupMethods", n.VUE3_SETUP_PROPS = "__vue3SetupProps", n.VUE3_WATCH_EFFECT = "__vue3WatchEffect", n.VUE3_INJECT = "__vue3Inject", n.VUE3_PROVIDE = "__vue3Provide", n.VUE3_PROP = "__Vue3Prop", n.VUE3_MARK_RAW = "__Vue3MarkRaw", n))(y || {});
const he = [
  // "mounted",
  // "setup",
  // "beforeMount",
  // "beforeUpdate",
  // "updated",
  // "beforeUnmount",
  // "unmounted",
  // "activated",
  // "deactivated",
  // "errorCaptured",
  // "render",
  "computed",
  "emit",
  "expose",
  "getCurrentInstance",
  "watch",
  "ref",
  "reactive"
];
function _e(n, a) {
  return Object.getOwnPropertyDescriptor(n, a);
}
function Qe(n, a) {
  Object.keys(n).forEach((o) => {
    const h = n[o];
    if (typeof h == "function" && !h.hasOwnProperty("prototype") && !he.includes(o)) {
      console.warn(
        `The method named "${o}" cannot be an arrow method! It will loose the responsiveness.`
      );
      const f = _e(n, o), _ = f == null ? void 0 : f.value;
      _ && (n[o] = function(...w) {
        console.warn(
          `The method named "${o}" cannot be an arrow method! It will loose the responsiveness.`
        ), _(...w);
      });
    }
  });
}
function Xe(n, a, o) {
  const h = Reflect.getMetadata(
    y.VUE3_SETUP_PROPS,
    o
  ), f = {};
  if (h)
    for (const [P, { propertyKey: g, cb: A }] of h) {
      const S = A == null ? void 0 : A();
      f[g] = S, "render" in a && Object.defineProperty(a, g, {
        get: () => S,
        enumerable: !0,
        configurable: !0
      });
    }
  const _ = Reflect.ownKeys(a), w = /* @__PURE__ */ new Map();
  return _.forEach((P) => {
    const g = a[P];
    H(g) && w.set(P, g);
  }), new Proxy(n, {
    get(P, g, A) {
      const S = w.get(g);
      return S || (["props", "attrs", "emit", "slots", "expose"].includes(
        g
      ) ? a[g] : "render" in a && Object.keys(f).includes(g) && typeof f[g] ? f[g] : Reflect.get(P, g, A));
    },
    set(P, g, A, S) {
      var V;
      const C = _e(
        o.prototype,
        g
      );
      return typeof (C == null ? void 0 : C.set) == "function" ? ((V = C == null ? void 0 : C.set) == null || V.call(P, A), !0) : Reflect.set(P, g, A, S);
    }
  });
}
function Ze(n, a, o) {
  Reflect.ownKeys(o.prototype).forEach((f) => {
    typeof n[f] == "function" && f !== "constructor" && !H(n[f]) && !he.includes(f) && (n[f] = n[f].bind(a));
    const _ = Object.getOwnPropertyDescriptor(
      o.prototype,
      f
    );
    _ && typeof _.get == "function" && Reflect.defineProperty(n, f, {
      get: () => {
        var w;
        return (w = _.get) == null ? void 0 : w.call(a);
      },
      enumerable: !0,
      configurable: !0
    });
  });
}
function Ke(n) {
  const a = n.props;
  if (a)
    for (const o in a)
      Object.defineProperty(n, o, {
        get: () => n.props[o],
        enumerable: !0,
        configurable: !0
      });
}
function et(n, a, o, h) {
  try {
    Qe(a, h), Ze(a, h, n), Ke(a);
  } catch (f) {
    console.log("bindingInstance err:", f);
  }
}
function tt(n, a) {
  var o;
  try {
    const h = Reflect.getMetadata(
      y.VUE3_SETUP_METHODS,
      n
    );
    if (!h)
      return;
    for (const [f, _] of h)
      (o = a == null ? void 0 : a[_.propertyKey]) == null || o.call(a);
  } catch (h) {
    console.log("setupMethodsResolver err:", h);
  }
}
function rt(n, a) {
  try {
    const o = Reflect.getMetadata(
      y.VUE3_SETUP_PROPS,
      n
    );
    if (!o)
      return;
    for (const [h, { propertyKey: f, cb: _ }] of o)
      if (f && _) {
        const w = _ == null ? void 0 : _();
        Object.defineProperty(a, f, {
          get: () => w,
          enumerable: !0,
          configurable: !0
        });
      }
  } catch (o) {
    console.log("setupPropsResolver err:", o);
  }
}
function nt(n, a) {
  try {
    const o = Reflect.getMetadata(y.VUE3_WATCHS, n);
    if (o)
      for (const [h, f] of o) {
        const { propertyKey: _ } = f;
        let w;
        if (Array.isArray(_) && (w = _.map((b) => {
          const P = a[b];
          return H(P) || ce(P) ? a[b] : () => a[b];
        })), typeof _ == "string") {
          const b = a[_];
          w = H(b) || ce(b) ? a[_] : () => a[_];
        }
        w && Ge(
          w,
          a[f.methodKey],
          f.options || {}
        );
      }
  } catch (o) {
    console.log("watcherResolver error!", o);
  }
}
function ot(n, a) {
  try {
    const o = Reflect.getMetadata(
      y.VUE3_WATCH_EFFECT,
      n
    );
    if (o)
      for (const [h, f] of o)
        $e(a == null ? void 0 : a[f.propertyKey], f.options);
  } catch (o) {
    console.log("watchEffectResolver error!", o);
  }
}
function at(n, a) {
  try {
    const o = Reflect.getMetadata(y.VUE3_INJECT, n);
    if (!o)
      return;
    for (const [h, { propertyKey: f, defaultValue: _ }] of o)
      f && Object.defineProperty(a, f, {
        get: () => Le(f, _),
        enumerable: !0,
        configurable: !0
      });
  } catch (o) {
    console.log("injectResolver err:", o);
  }
}
function it(n, a) {
  try {
    const o = Reflect.getMetadata(y.VUE3_PROVIDE, n);
    if (!o)
      return;
    for (const [h, { propertyKey: f, alias: _ }] of o)
      f && Be(_ || f, a[f]);
  } catch (o) {
    console.log("provideResolver err:", o);
  }
}
function ut(n) {
  try {
    const a = Reflect.getMetadata(y.VUE3_PROP, n);
    if (!a)
      return;
    const o = {};
    for (const [h, { propertyKey: f, options: _ }] of a)
      o[f] = _;
    return o;
  } catch (a) {
    console.log("provideResolver err:", a);
  }
}
function ft(n, a) {
  try {
    const o = Reflect.getMetadata(
      y.VUE3_MARK_RAW,
      n
    );
    if (!o)
      return;
    for (const [h, { propertyKey: f }] of o) {
      const _ = a[f], w = Je({ value: _ });
      Object.defineProperty(a, f, {
        get: () => w.value,
        set: (b) => {
          w.value = b;
        },
        enumerable: !0,
        configurable: !0
      });
    }
  } catch (o) {
    console.log("markRwaResolver err:", o);
  }
}
const pt = /* @__PURE__ */ new Map();
function st(n) {
  const a = Reflect.getMetadata(
    y.VUE3_OPTIONS,
    n
  );
  if (!a)
    throw "this constructor is not decoreted by 'Component'";
  const o = ut(n);
  return a.props = {
    ...a.props,
    ...o
  }, Ye({
    ...a,
    setup(h, f) {
      let _ = new n(h, f), w = qe(_), b = Xe(
        w,
        _,
        n
      );
      return ze(() => {
        b = null, w = null, _ = null;
      }), et(
        n,
        _,
        w,
        b
      ), ft(n, _), it(n, w), at(n, w), tt(n, w), nt(n, w), ot(n, w), typeof _.setup == "function" && _.setup(h, f), typeof _.render == "function" && "render" in _ ? () => w.render() : w;
    }
  });
}
const vt = (n) => (console.warn(
  "'defineBaseComponent' is unsafe, please change to use 'toComponent'."
), st(n));
function J(n = {}) {
  return typeof n == "function" ? J()(n) : function(a) {
    Reflect.defineMetadata(y.VUE3_OPTIONS, n || {}, a);
  };
}
const Et = (n = {}) => (console.warn(
  "'ComponentOptions' is unsafe, please change to use 'Component'."
), J(n)), yt = (n = {}) => (console.warn("'Options' is unsafe, please change to use 'Component'."), J(n));
function wt(n, a) {
  return function(o, h, f) {
    const _ = Reflect.getMetadata(y.VUE3_WATCHS, o.constructor) || /* @__PURE__ */ new Map();
    _.set(`${h}${y.VUE3_WATCHS}`, {
      options: a,
      methodKey: h,
      propertyKey: n
    }), Reflect.defineMetadata(
      y.VUE3_WATCHS,
      _,
      o.constructor
    );
  };
}
function Tt(n) {
  return function(a, o, h) {
    if (o && typeof (h == null ? void 0 : h.value) == "function") {
      const f = Reflect.getMetadata(
        y.VUE3_SETUP_METHODS,
        a.constructor
      ) || /* @__PURE__ */ new Map();
      f.set(`${o}${y.VUE3_SETUP_METHODS}`, {
        propertyKey: o
      }), Reflect.defineMetadata(
        y.VUE3_SETUP_METHODS,
        f,
        a.constructor
      );
    } else {
      const f = Reflect.getMetadata(
        y.VUE3_SETUP_PROPS,
        a.constructor
      ) || /* @__PURE__ */ new Map();
      f.set(`${o}${y.VUE3_SETUP_PROPS}`, {
        propertyKey: o,
        cb: n
      }), Reflect.defineMetadata(
        y.VUE3_SETUP_PROPS,
        f,
        a.constructor
      );
    }
  };
}
function gt(n = {}) {
  return function(a, o, h) {
    const f = Reflect.getMetadata(
      y.VUE3_WATCH_EFFECT,
      a.constructor
    ) || /* @__PURE__ */ new Map();
    f.set(`${o}${y.VUE3_WATCH_EFFECT}`, {
      options: n,
      propertyKey: o
    }), Reflect.defineMetadata(
      y.VUE3_WATCH_EFFECT,
      f,
      a.constructor
    );
  };
}
function ct(n, a) {
  return a ? ct()(n, a) : function(o, h) {
    const f = Reflect.getMetadata(y.VUE3_INJECT, o.constructor) || /* @__PURE__ */ new Map();
    f.set(`${h}${y.VUE3_INJECT}`, {
      defaultValue: n,
      propertyKey: h
    }), Reflect.defineMetadata(
      y.VUE3_INJECT,
      f,
      o.constructor
    );
  };
}
function lt(n, a) {
  return a ? lt()(n, a) : function(o, h) {
    const f = Reflect.getMetadata(y.VUE3_PROVIDE, o.constructor) || /* @__PURE__ */ new Map();
    f.set(`${h}${y.VUE3_PROVIDE}`, {
      alias: n,
      propertyKey: h
    }), Reflect.defineMetadata(
      y.VUE3_PROVIDE,
      f,
      o.constructor
    );
  };
}
function Rt(n = {}) {
  return function(a, o) {
    const h = Reflect.getMetadata(y.VUE3_PROP, a.constructor) || /* @__PURE__ */ new Map();
    h.set(`${o}${y.VUE3_PROP}`, {
      propertyKey: o,
      options: n
    }), Reflect.defineMetadata(
      y.VUE3_PROP,
      h,
      a.constructor
    );
  };
}
function Mt(n, a) {
  const o = Reflect.getMetadata(y.VUE3_MARK_RAW, n.constructor) || /* @__PURE__ */ new Map();
  o.set(`${a}${y.VUE3_MARK_RAW}`, {
    propertyKey: a
  }), Reflect.defineMetadata(
    y.VUE3_MARK_RAW,
    o,
    n.constructor
  );
}
class dt {
  /**
   * 生命周期 setup
   * 提供一个setup钩子，满足组件需要在setup阶段进行的操作
   */
  setup() {
  }
  /**
   * 生命周期 onBeforeMount
   * 组件挂载到节点上之前执行的函数
   *
   * @protected
   * @memberof Lifecycle
   */
  beforeMount() {
  }
  /**
   * 生命周期 onMounted
   * 组件挂载完成后执行的函数
   *
   * @protected
   * @memberof Lifecycle
   */
  mounted() {
  }
  /**
   * 生命周期 onBeforeUpdate
   * 组件更新之前执行的函数
   *
   * @protected
   * @memberof Lifecycle
   */
  beforeUpdate() {
  }
  /**
   * 生命周期 onUpdated
   * 组件更新完成之后执行的函数
   *
   * @protected
   * @memberof Lifecycle
   */
  updated() {
  }
  /**
   * 生命周期 onBeforeUnmount
   * 组件卸载之前执行的函数
   *
   * @protected
   * @memberof Lifecycle
   */
  beforeUnmount() {
  }
  /**
   * 生命周期 onUnmounted
   * 组件卸载完成后执行的函数
   *
   * @protected
   * @memberof Lifecycle
   */
  unmounted() {
  }
  /**
   * 生命周期 onActivated
   * 被包含在 <keep-alive> 中的组件，会多出两个生命周期钩子函数，被激活时执行
   *
   * @protected
   * @memberof Lifecycle
   */
  activated() {
  }
  /**
   * 生命周期 onDeactivated
   * 比如从 A 组件，切换到 B 组件，A 组件消失时执行
   *
   * @protected
   * @memberof Lifecycle
   */
  deactivated() {
  }
  /**
   * 生命周期 onErrorCaptured
   * 当捕获一个来自子孙组件的异常时激活钩子函数
   *
   * @protected
   * @memberof Lifecycle
   */
  errorCaptured() {
  }
}
class ht extends dt {
  constructor(a, o) {
    super(), this.getCurrentInstance = U.getCurrentInstance, this.watch = U.watch, this.computed = U.computed, this.ref = U.ref, this.toRaw = U.toRaw, this.reactive = U.reactive, this.vue = U, this.props = a, this.emit = o.emit, this.attrs = o.attrs, this.expose = o.expose, this.slots = o.slots, U.onBeforeMount(() => {
      this.beforeMount();
    }), U.onMounted(() => {
      this.mounted();
    }), U.onBeforeUpdate(() => {
      this.beforeUpdate();
    }), U.onUpdated(() => {
      this.updated();
    }), U.onBeforeUnmount(() => {
      this.beforeUnmount();
    }), U.onUnmounted(() => {
      this.unmounted();
    }), U.onActivated(() => {
      this.activated();
    }), U.onDeactivated(() => {
      this.deactivated();
    }), U.onErrorCaptured(() => {
      this.errorCaptured();
    }), this.executeSetup();
  }
  executeSetup() {
    rt(this.constructor, this);
  }
}
class pe extends ht {
  constructor(a, o) {
    super(a, o), this.store = pe.store, this.__warningTips__();
  }
  __warningTips__() {
    console.warn("'BaseView' is unsafe, please change to use 'Vue'.");
  }
  /**
   * 兼容老API
   * @param store
   */
  static useStore(a) {
    this.store = a;
  }
}
export {
  pe as BaseView,
  J as Component,
  Et as ComponentOptions,
  ct as Inject,
  Mt as MarkRaw,
  yt as Options,
  Rt as Prop,
  lt as Provide,
  pt as RouterContainer,
  Tt as Setup,
  ht as Vue,
  wt as Watch,
  gt as WatchEffect,
  vt as defineBaseComponent,
  st as toComponent
};

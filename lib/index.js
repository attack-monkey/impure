"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncImpure = exports.impure = void 0;
exports.impure = function (fn1) { return ({
    then: function (fn2) { fn2(fn1()); }
}); };
exports.asyncImpure = function (fn) {
    new Promise(function (resolve) { return fn(resolve); });
};

"use strict";
exports.__esModule = true;
exports.RemoteCart = void 0;
var axios_1 = require("axios");
var RemoteCart = /** @class */ (function () {
    function RemoteCart() {
        this.url = "";
    }
    RemoteCart.prototype.go = function (url) {
        if (url === void 0) { url = ""; }
        this.url = url;
        return this;
    };
    RemoteCart.prototype.list = function (onSuccess) {
        this.simpleCall(onSuccess);
    };
    RemoteCart.prototype.clean = function (onSuccess) {
        this.removeCall(onSuccess);
    };
    RemoteCart.prototype.add = function (item, onSuccess) {
        var _this = this;
        axios_1["default"].post(this.url, {
            attributes: JSON.stringify(item.attributes)
        }).then(function (response) {
            onSuccess(response.data);
        })["catch"](function (error) {
            _this.handleError(error);
        });
    };
    RemoteCart.prototype.remove = function (item, onSuccess) {
        this.removeCall(onSuccess);
    };
    RemoteCart.prototype.find = function (id, onSuccess) {
        this.simpleCall(onSuccess);
    };
    RemoteCart.prototype.total = function (attributeName, onSuccess) {
        this.simpleCall(onSuccess);
    };
    RemoteCart.prototype.numberOfItems = function (onSuccess) {
        this.simpleCall(onSuccess);
    };
    RemoteCart.prototype.handleError = function (error) {
        console.log(error);
    };
    RemoteCart.prototype.simpleCall = function (onSuccess) {
        var _this = this;
        axios_1["default"].get(this.url).then(function (response) {
            onSuccess(response.data);
        })["catch"](function (error) {
            _this.handleError(error);
        });
    };
    RemoteCart.prototype.removeCall = function (onSuccess) {
        var _this = this;
        axios_1["default"]["delete"](this.url).then(function (response) {
            onSuccess(response.data);
        })["catch"](function (error) {
            _this.handleError(error);
        });
    };
    return RemoteCart;
}());
exports.RemoteCart = RemoteCart;

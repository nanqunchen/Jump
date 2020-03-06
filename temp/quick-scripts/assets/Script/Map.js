(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Map.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '53ab4Z2DCZDWKWO/1KswmH2', 'Map', __filename);
// Script/Map.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tiles = [];
        _this.ground = null;
        _this.initLand = null;
        _this.gapWidth = 0;
        _this.speed = 0;
        _this.landHeight = 0;
        _this.tilePool = new cc.NodePool();
        _this.canvas = null;
        _this.lead = null;
        _this.leadInitY = null;
        _this.arangItemHeight = [-40, 50, -60, 80, 0];
        _this.lastItem = null;
        return _this;
    }
    Map.prototype.init = function (canvas, lead) {
        this.canvas = canvas;
        this.lead = lead;
        this.initLand.y = this.lead.y -
            this.lead.height / 2 -
            this.landHeight / 2;
        this.leadInitY = this.initLand.y;
        this.initLand.runAction(cc.repeatForever(cc.moveBy(1, cc.v2(-this.speed, 0))));
    };
    Map.prototype.start = function () { };
    Map.prototype.lateUpdate = function () {
        var firstItem = this.ground.children[0];
        if (firstItem && firstItem.x < -1370) {
            firstItem.stopAllActions();
            this.tilePool.put(firstItem);
        }
        if (!this.lastItem || this.canvas.width > this.lastItem.x) {
            this.renderGround(this.lastItem);
        }
    };
    Map.prototype.renderGround = function (lastItem) {
        var node = null;
        if (this.tilePool.size() > 0) {
            node = this.tilePool.get();
        }
        else {
            node = cc.instantiate(this.tiles[Math.floor(Math.random() * this.tiles.length)]);
        }
        node.setParent(this.ground);
        node.x = lastItem ?
            lastItem.x +
                lastItem.width / 2 +
                node.width / 2 +
                this.gapWidth
            :
                this.initLand.width / 2 +
                    node.width / 2 +
                    this.gapWidth;
        node.y = this.leadInitY +
            this.arangItemHeight[Math.floor(Math.random() * this.arangItemHeight.length)];
        this.lastItem = node;
        node.runAction(cc.repeatForever(cc.moveBy(1, cc.v2(-this.speed, 0))));
    };
    Map.prototype.createItem = function () {
        var tile = null;
        tile = this.tiles[Math.floor(Math.random() * this.tiles.length)];
        return cc.instantiate(tile);
    };
    __decorate([
        property([cc.Prefab])
    ], Map.prototype, "tiles", void 0);
    __decorate([
        property(cc.Node)
    ], Map.prototype, "ground", void 0);
    __decorate([
        property(cc.Node)
    ], Map.prototype, "initLand", void 0);
    __decorate([
        property
    ], Map.prototype, "gapWidth", void 0);
    __decorate([
        property
    ], Map.prototype, "speed", void 0);
    __decorate([
        property
    ], Map.prototype, "landHeight", void 0);
    Map = __decorate([
        ccclass
    ], Map);
    return Map;
}(cc.Component));
exports.default = Map;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Map.js.map
        
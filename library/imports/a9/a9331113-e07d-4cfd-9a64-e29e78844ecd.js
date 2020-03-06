"use strict";
cc._RF.push(module, 'a9331ET4H1M/Zpk4p54hE7N', 'Game');
// Script/Game.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.canvas = null;
        _this.lead = null;
        _this.ground = null;
        _this.scoreLabel = null;
        _this.restartButton = null;
        _this.record = 0;
        _this.score = -1;
        return _this;
    }
    Game.prototype.onLoad = function () {
        cc.director.getCollisionManager().enabled = true;
        this.lead.getComponent('Lead').init(this.canvas, this);
        this.ground.getComponent('Map').init(this.canvas, this.lead);
        this.restartButton.on(cc.Node.EventType.TOUCH_START, this.restart);
    };
    Game.prototype.getScore = function () {
        this.score += 1;
        this.scoreLabel.string = this.score.toString();
    };
    Game.prototype.end = function () {
        cc.director.pause();
        this.restartButton.active = true;
    };
    Game.prototype.restart = function () {
        cc.director.loadScene('game');
        cc.director.resume();
    };
    __decorate([
        property(cc.Node)
    ], Game.prototype, "canvas", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "lead", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "ground", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "scoreLabel", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "restartButton", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

cc._RF.pop();
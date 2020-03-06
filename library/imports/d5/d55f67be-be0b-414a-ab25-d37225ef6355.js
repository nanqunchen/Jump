"use strict";
cc._RF.push(module, 'd55f6e+vgtBSqsl03Il72NV', 'Lead');
// Script/Lead.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
// 角色动画状态机
var ROLESTATE;
(function (ROLESTATE) {
    ROLESTATE["WALK"] = "walk_right";
    ROLESTATE["JUMP"] = "jump";
    ROLESTATE["STAND"] = "stand";
    ROLESTATE["SHAKE"] = "shake";
    ROLESTATE["DROP"] = "drop";
})(ROLESTATE || (ROLESTATE = {}));
var Lead = /** @class */ (function (_super) {
    __extends(Lead, _super);
    function Lead() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lead = null;
        _this.jumpStep = null;
        _this.gameInstant = null;
        // 皮肤管理
        // TODO
        _this.skin = null;
        // 动画状态管理
        // TODO
        _this.currState = null;
        _this.anim = null;
        // 游戏画板动作管理
        _this.touchpad = null;
        // 着陆块
        _this.land = null;
        return _this;
    }
    // 代替 onLoad 方法
    Lead.prototype.init = function (touchpad, game) {
        var _this = this;
        this.gameInstant = game;
        this.anim = this.lead.getComponent(cc.Animation);
        this.touchpad = touchpad;
        this.touchpad.on(cc.Node.EventType.TOUCH_START, function () { _this.act(ROLESTATE.JUMP); }, this);
        this.act(ROLESTATE.WALK);
    };
    Lead.prototype.start = function () {
        this.loadSkin('');
    };
    Lead.prototype.onDestroy = function () {
        var _this = this;
        this.touchpad.off(cc.Node.EventType.TOUCH_START, function () { _this.act(ROLESTATE.JUMP); }, this);
    };
    Lead.prototype.loadSkin = function (skin) {
        // load the skin configs
    };
    Lead.prototype.act = function (state) {
        var _this = this;
        switch (state) {
            case this.currState:
                // 重复表演当前状态时，不执行任何动画
                break;
            case ROLESTATE.WALK:
                this.currState = ROLESTATE.WALK;
                this.anim.play(ROLESTATE.WALK);
                break;
            case ROLESTATE.JUMP:
                if (this.currState === ROLESTATE.DROP) {
                    break;
                }
                else {
                    this.currState = ROLESTATE.JUMP;
                    this.anim.play(ROLESTATE.JUMP);
                    this.lead.runAction(cc.sequence(cc.jumpTo(.6, cc.v2(this.lead.x, this.lead.y + 100), 150, 1), cc.moveTo(.1, cc.v2(this.lead.x, this.lead.y)), cc.callFunc(function () {
                        _this.act(ROLESTATE.DROP);
                    }, this)));
                    break;
                }
            case ROLESTATE.SHAKE:
                break;
            case ROLESTATE.DROP:
                this.currState = ROLESTATE.DROP;
                // TODO 新的动画
                // this.anim.play(ROLESTATE.DROP)
                this.anim.stop();
                // TODO 跑步继续，跳跃的话播放最后一针
                this.lead.runAction(cc.moveBy(.7, cc.v2(0, -500)));
                break;
            case ROLESTATE.STAND:
                break;
        }
    };
    Lead.prototype.update = function () {
        if (this.land) {
            if (this.currState != ROLESTATE.JUMP) {
                if (this.land.world.aabb.xMax <
                    this.lead.convertToWorldSpaceAR(cc.Vec2.ZERO).x) {
                    this.act(ROLESTATE.DROP);
                }
            }
        }
    };
    Lead.prototype.onCollisionEnter = function (other, self) {
        this.land = other;
        if (other.world.aabb.yMax > self.world.aabb.yMin + 20) {
            this.gameInstant.end();
        }
        else {
            this.lead.stopAllActions();
            this.act(ROLESTATE.WALK);
            this.lead.y += other.world.aabb.yMax - self.world.aabb.yMin;
            this.gameInstant.getScore();
        }
    };
    __decorate([
        property(cc.Node)
    ], Lead.prototype, "lead", void 0);
    __decorate([
        property
    ], Lead.prototype, "jumpStep", void 0);
    Lead = __decorate([
        ccclass
    ], Lead);
    return Lead;
}(cc.Component));
exports.default = Lead;

cc._RF.pop();
window.__require = function t(e, o, i) {
function n(r, c) {
if (!o[r]) {
if (!e[r]) {
var s = r.split("/");
s = s[s.length - 1];
if (!e[s]) {
var l = "function" == typeof __require && __require;
if (!c && l) return l(s, !0);
if (a) return a(s, !0);
throw new Error("Cannot find module '" + r + "'");
}
}
var d = o[r] = {
exports: {}
};
e[r][0].call(d.exports, function(t) {
return n(e[r][1][t] || t);
}, d, d.exports, t, e, o, i);
}
return o[r].exports;
}
for (var a = "function" == typeof __require && __require, r = 0; r < i.length; r++) n(i[r]);
return n;
}({
Game: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "a9331ET4H1M/Zpk4p54hE7N", "Game");
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator, n = i.ccclass, a = i.property, r = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.canvas = null;
e.lead = null;
e.ground = null;
e.scoreLabel = null;
e.restartButton = null;
e.record = 0;
e.score = -1;
return e;
}
e.prototype.onLoad = function() {
cc.director.getCollisionManager().enabled = !0;
this.lead.getComponent("Lead").init(this.canvas, this);
this.ground.getComponent("Map").init(this.canvas, this.lead);
this.restartButton.on(cc.Node.EventType.TOUCH_START, this.restart);
};
e.prototype.getScore = function() {
this.score += 1;
this.scoreLabel.string = this.score.toString();
};
e.prototype.end = function() {
cc.director.pause();
this.restartButton.active = !0;
};
e.prototype.restart = function() {
cc.director.loadScene("game");
cc.director.resume();
};
__decorate([ a(cc.Node) ], e.prototype, "canvas", void 0);
__decorate([ a(cc.Node) ], e.prototype, "lead", void 0);
__decorate([ a(cc.Node) ], e.prototype, "ground", void 0);
__decorate([ a(cc.Label) ], e.prototype, "scoreLabel", void 0);
__decorate([ a(cc.Node) ], e.prototype, "restartButton", void 0);
return e = __decorate([ n ], e);
}(cc.Component);
o.default = r;
cc._RF.pop();
}, {} ],
Lead: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "d55f6e+vgtBSqsl03Il72NV", "Lead");
Object.defineProperty(o, "__esModule", {
value: !0
});
var i, n = cc._decorator, a = n.ccclass, r = n.property;
(function(t) {
t.WALK = "walk_right";
t.JUMP = "jump";
t.STAND = "stand";
t.SHAKE = "shake";
t.DROP = "drop";
})(i || (i = {}));
var c = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.lead = null;
e.jumpStep = null;
e.gameInstant = null;
e.skin = null;
e.currState = null;
e.anim = null;
e.touchpad = null;
e.land = null;
return e;
}
e.prototype.init = function(t, e) {
var o = this;
this.gameInstant = e;
this.anim = this.lead.getComponent(cc.Animation);
this.touchpad = t;
this.touchpad.on(cc.Node.EventType.TOUCH_START, function() {
o.act(i.JUMP);
}, this);
this.act(i.WALK);
};
e.prototype.start = function() {
this.loadSkin("");
};
e.prototype.onDestroy = function() {
var t = this;
this.touchpad.off(cc.Node.EventType.TOUCH_START, function() {
t.act(i.JUMP);
}, this);
};
e.prototype.loadSkin = function(t) {};
e.prototype.act = function(t) {
var e = this;
switch (t) {
case this.currState:
break;

case i.WALK:
this.currState = i.WALK;
this.anim.play(i.WALK);
break;

case i.JUMP:
if (this.currState === i.DROP) break;
this.currState = i.JUMP;
this.anim.play(i.JUMP);
this.lead.runAction(cc.sequence(cc.jumpTo(.6, cc.v2(this.lead.x, this.lead.y + 100), 150, 1), cc.moveTo(.1, cc.v2(this.lead.x, this.lead.y)), cc.callFunc(function() {
e.act(i.DROP);
}, this)));
break;

case i.SHAKE:
break;

case i.DROP:
this.currState = i.DROP;
this.anim.stop();
this.lead.runAction(cc.moveBy(.7, cc.v2(0, -500)));
break;

case i.STAND:
}
};
e.prototype.update = function() {
this.land && this.currState != i.JUMP && this.land.world.aabb.xMax < this.lead.convertToWorldSpaceAR(cc.Vec2.ZERO).x && this.act(i.DROP);
};
e.prototype.onCollisionEnter = function(t, e) {
this.land = t;
if (t.world.aabb.yMax > e.world.aabb.yMin + 20) this.gameInstant.end(); else {
this.lead.stopAllActions();
this.act(i.WALK);
this.lead.y += t.world.aabb.yMax - e.world.aabb.yMin;
this.gameInstant.getScore();
}
};
__decorate([ r(cc.Node) ], e.prototype, "lead", void 0);
__decorate([ r ], e.prototype, "jumpStep", void 0);
return e = __decorate([ a ], e);
}(cc.Component);
o.default = c;
cc._RF.pop();
}, {} ],
Map: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "53ab4Z2DCZDWKWO/1KswmH2", "Map");
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator, n = i.ccclass, a = i.property, r = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.tiles = [];
e.ground = null;
e.initLand = null;
e.gapWidth = 0;
e.speed = 0;
e.landHeight = 0;
e.tilePool = new cc.NodePool();
e.canvas = null;
e.lead = null;
e.leadInitY = null;
e.arangItemHeight = [ -40, 50, -60, 80, 0 ];
e.lastItem = null;
return e;
}
e.prototype.init = function(t, e) {
this.canvas = t;
this.lead = e;
this.initLand.y = this.lead.y - this.lead.height / 2 - this.landHeight / 2;
this.leadInitY = this.initLand.y;
this.initLand.runAction(cc.repeatForever(cc.moveBy(1, cc.v2(-this.speed, 0))));
};
e.prototype.start = function() {};
e.prototype.lateUpdate = function() {
var t = this.ground.children[0];
if (t && t.x < -1370) {
t.stopAllActions();
this.tilePool.put(t);
}
(!this.lastItem || this.canvas.width > this.lastItem.x) && this.renderGround(this.lastItem);
};
e.prototype.renderGround = function(t) {
var e = null;
(e = this.tilePool.size() > 0 ? this.tilePool.get() : cc.instantiate(this.tiles[Math.floor(Math.random() * this.tiles.length)])).setParent(this.ground);
e.x = t ? t.x + t.width / 2 + e.width / 2 + this.gapWidth : this.initLand.width / 2 + e.width / 2 + this.gapWidth;
e.y = this.leadInitY + this.arangItemHeight[Math.floor(Math.random() * this.arangItemHeight.length)];
this.lastItem = e;
e.runAction(cc.repeatForever(cc.moveBy(1, cc.v2(-this.speed, 0))));
};
e.prototype.createItem = function() {
var t;
t = this.tiles[Math.floor(Math.random() * this.tiles.length)];
return cc.instantiate(t);
};
__decorate([ a([ cc.Prefab ]) ], e.prototype, "tiles", void 0);
__decorate([ a(cc.Node) ], e.prototype, "ground", void 0);
__decorate([ a(cc.Node) ], e.prototype, "initLand", void 0);
__decorate([ a ], e.prototype, "gapWidth", void 0);
__decorate([ a ], e.prototype, "speed", void 0);
__decorate([ a ], e.prototype, "landHeight", void 0);
return e = __decorate([ n ], e);
}(cc.Component);
o.default = r;
cc._RF.pop();
}, {} ]
}, {}, [ "Game", "Lead", "Map" ]);
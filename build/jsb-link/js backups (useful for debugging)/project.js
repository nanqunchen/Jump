window.__require = function t(e, o, n) {
function i(a, c) {
if (!o[a]) {
if (!e[a]) {
var s = a.split("/");
s = s[s.length - 1];
if (!e[s]) {
var d = "function" == typeof __require && __require;
if (!c && d) return d(s, !0);
if (r) return r(s, !0);
throw new Error("Cannot find module '" + a + "'");
}
}
var l = o[a] = {
exports: {}
};
e[a][0].call(l.exports, function(t) {
return i(e[a][1][t] || t);
}, l, l.exports, t, e, o, n);
}
return o[a].exports;
}
for (var r = "function" == typeof __require && __require, a = 0; a < n.length; a++) i(n[a]);
return i;
}({
Game: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "a9331ET4H1M/Zpk4p54hE7N", "Game");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = cc._decorator, i = n.ccclass, r = n.property, a = function(t) {
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
__decorate([ r(cc.Node) ], e.prototype, "canvas", void 0);
__decorate([ r(cc.Node) ], e.prototype, "lead", void 0);
__decorate([ r(cc.Node) ], e.prototype, "ground", void 0);
__decorate([ r(cc.Label) ], e.prototype, "scoreLabel", void 0);
__decorate([ r(cc.Node) ], e.prototype, "restartButton", void 0);
return e = __decorate([ i ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {} ],
Lead: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "d55f6e+vgtBSqsl03Il72NV", "Lead");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n, i = cc._decorator, r = i.ccclass, a = i.property;
(function(t) {
t.WALK = "walk_right";
t.JUMP = "jump";
t.STAND = "stand";
t.SHAKE = "shake";
t.DROP = "drop";
})(n || (n = {}));
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
o.act(n.JUMP);
}, this);
this.act(n.WALK);
};
e.prototype.start = function() {
this.loadSkin("");
};
e.prototype.onDestroy = function() {
var t = this;
this.touchpad.off(cc.Node.EventType.TOUCH_START, function() {
t.act(n.JUMP);
}, this);
};
e.prototype.loadSkin = function(t) {};
e.prototype.act = function(t) {
var e = this;
switch (t) {
case this.currState:
break;

case n.WALK:
this.currState = n.WALK;
this.anim.play(n.WALK);
break;

case n.JUMP:
if (this.currState === n.DROP) break;
this.currState = n.JUMP;
this.anim.play(n.JUMP);
this.lead.runAction(cc.sequence(cc.jumpTo(.6, cc.v2(this.lead.x, this.lead.y + 100), 150, 1), cc.moveTo(.1, cc.v2(this.lead.x, this.lead.y)), cc.callFunc(function() {
e.act(n.DROP);
}, this)));
break;

case n.SHAKE:
break;

case n.DROP:
this.currState = n.DROP;
this.anim.stop();
this.lead.runAction(cc.moveBy(.7, cc.v2(0, -500)));
break;

case n.STAND:
}
};
e.prototype.update = function() {
this.land && this.land.world.aabb.xMax < this.lead.convertToWorldSpaceAR(cc.Vec2.ZERO).x && this.currState != n.JUMP && this.act(n.DROP);
};
e.prototype.onCollisionEnter = function(t, e) {
this.land = t;
if (t.world.aabb.yMax > e.world.aabb.yMin + 20) this.gameInstant.end(); else {
this.lead.stopAllActions();
this.act(n.WALK);
this.lead.y += t.world.aabb.yMax - e.world.aabb.yMin;
this.gameInstant.getScore();
}
};
__decorate([ a(cc.Node) ], e.prototype, "lead", void 0);
__decorate([ a ], e.prototype, "jumpStep", void 0);
return e = __decorate([ r ], e);
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
var n = cc._decorator, i = n.ccclass, r = n.property, a = function(t) {
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
var t = this.ground.children[0], e = this.ground.children[this.ground.children.length - 1];
if (t && t.x < -1370) {
t.stopAllActions();
this.tilePool.put(t);
}
(!e || this.canvas.width > e.x) && this.renderGround(e);
};
e.prototype.renderGround = function(t) {
var e = null;
(e = this.tilePool.size() > 0 ? this.tilePool.get() : cc.instantiate(this.tiles[Math.floor(Math.random() * this.tiles.length)])).setParent(this.ground);
e.x = t ? t.x + t.width / 2 + e.width / 2 + this.gapWidth : this.initLand.width / 2 + e.width / 2 + this.gapWidth;
e.y = this.leadInitY + this.arangItemHeight[Math.floor(Math.random() * this.arangItemHeight.length)];
e.runAction(cc.repeatForever(cc.moveBy(1, cc.v2(-this.speed, 0))));
};
e.prototype.createItem = function() {
var t;
t = this.tiles[Math.floor(Math.random() * this.tiles.length)];
return cc.instantiate(t);
};
__decorate([ r([ cc.Prefab ]) ], e.prototype, "tiles", void 0);
__decorate([ r(cc.Node) ], e.prototype, "ground", void 0);
__decorate([ r(cc.Node) ], e.prototype, "initLand", void 0);
__decorate([ r ], e.prototype, "gapWidth", void 0);
__decorate([ r ], e.prototype, "speed", void 0);
__decorate([ r ], e.prototype, "landHeight", void 0);
return e = __decorate([ i ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {} ]
}, {}, [ "Game", "Lead", "Map" ]);
const {ccclass, property} = cc._decorator;

@ccclass
export default class Map extends cc.Component {
    @property([cc.Prefab])
    tiles: cc.Prefab[] = [];

    @property(cc.Node)
    ground: cc.Node = null;

    @property(cc.Node)
    initLand: cc.Node = null;

    @property
    gapWidth: number = 0;

    @property
    speed: number = 0;

    @property
    landHeight: number = 0;

    private tilePool = new cc.NodePool();
    private canvas: cc.Node = null;
    private lead: cc.Node = null;
    private leadInitY: number = null;
    private arangItemHeight: number[] = [-40, 50, -60, 80, 0];
    private lastItem: cc.Node = null;


    init(canvas: cc.Node, lead: cc.Node) {
        this.canvas = canvas;
        this.lead = lead;
        this.initLand.y = this.lead.y - 
            this.lead.height / 2 -
            this.landHeight / 2; 
        this.leadInitY = this.initLand.y;
        this.initLand.runAction(cc.repeatForever(
            cc.moveBy(1, cc.v2(-this.speed, 0))
            )
        );
    }

    start() {}

    lateUpdate() {
        let firstItem = this.ground.children[0];
        if(firstItem && firstItem.x < -1370) {
            firstItem.stopAllActions();
            this.tilePool.put(firstItem);
        }
        if(!this.lastItem || this.canvas.width > this.lastItem.x) {
            this.renderGround(this.lastItem);
        }
    }

    renderGround(lastItem: cc.Node) {
        let node: cc.Node = null;
        if(this.tilePool.size() > 0) {
            node = this.tilePool.get();
        }else {
            node = cc.instantiate(
                this.tiles[Math.floor(
                    Math.random() * this.tiles.length
                    )]
                );
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
                    this.gapWidth
                    ;
        node.y = this.leadInitY + 
            this.arangItemHeight[Math.floor(Math.random() * this.arangItemHeight.length)];
        this.lastItem = node;
        node.runAction(cc.repeatForever(
            cc.moveBy(1, cc.v2(-this.speed, 0))
            )
        );
    }

    createItem() {
        let tile: cc.Prefab = null;
        tile = this.tiles[Math.floor(Math.random() * this.tiles.length)];
        return cc.instantiate(tile);
    }
}

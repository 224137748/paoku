// 背景类
class BackgroundPanel extends egret.DisplayObjectContainer {
    private cloud1: egret.Bitmap;
    private cloud2: egret.Bitmap;
    private sky: egret.Bitmap;
    private timeThremper: number = 0;
    private timer:number = 150; 
    public constructor(texture:egret.SpriteSheet) {
        super();
        this.sky = new egret.Bitmap();
        this.sky.texture = texture.getTexture('sky');
        this.addChild(this.sky);
        this.cloud1 = new egret.Bitmap();
        this.cloud1.texture = texture.getTexture('cloud1');
        this.addChild(this.cloud1);
        this.cloud2 = new egret.Bitmap();
        this.cloud2.texture = texture.getTexture('cloud2');
        
        this.addChild(this.cloud2);
        this.timeThremper = egret.getTimer();
        this.init();
    }
    // 初始化位置信息
    public init() {
        this.cloud1.x = -9;
        this.cloud1.y = 302;
        this.cloud2.x = 268;
        this.cloud2.y = 330;
        this.timeThremper = egret.getTimer();
    }
    private _a:number = 0;
    private _b:number = 0;
    private _c:number = 0;
    private _d:number = 0;
    public draw(pass:number) {
        this.timeThremper += pass;
        if (this.timeThremper > this.timer) {
        // console.log(pass);
            if (this.cloud1.x >= -9) {
                this._a = -1;
            } else if (this.cloud1.x <-18) {
                this._a = 1;
            }
            if (this.cloud1.y >= 310){
                this._b = -1;
            } else if (this.cloud1.y <=302) {
                this._b =1;
            }
            if (this.cloud2.x <= 268) {
                this._c = 1;
            } else if (this.cloud2.x >280) {
                this._c = -1;
            }
            if (this.cloud2.y <= 330) {
                this._d = 1;
            } else if (this.cloud2.y > 342){
                this._d = -1;
            }
            this.cloud1.x += this._a;
            this.cloud1.y += this._b;
            this.cloud2.x += this._c;
            this.cloud2.y += this._d;
            this.timeThremper = this.timeThremper % this.timer;
        }
    }
}
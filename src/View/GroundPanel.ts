// 绘制绿地，广告牌
class GroundPanel extends egret.DisplayObjectContainer{
    private dadi: egret.Bitmap;
    private num: number = Config.bg_number;
    // 广告栏的x坐标
    private _x:Array<number> = [];
    private _x2:Array<number> = [];
    // 广告栏Y坐标
    private _y:Array<number> = [];
    // 放大系数
    private large:Array<number> = [];
    // 生命池
    private alive:Array<boolean> = [];
    private sped:number = Config.speed;
    private picType:Array<string> = [];
    private _tree:egret.Bitmap;
    private _tree2:egret.Bitmap;
    private _building:egret.Bitmap;
    private _door:egret.Bitmap;
    private _tower:egret.Bitmap;
    // 改变广告栏的
    private changeType:number = 0;
    private types:Array<string> = ['tree', 'tower', 'building', 'door'];
    private bg:egret.Bitmap;
    // 计时器
    private calcuTime: number = 0;
    
    public constructor(texture:egret.SpriteSheet){
        super();
        this.bg = new egret.Bitmap();
        this.bg.texture = texture.getTexture('background');
        this.bg.y = 560;
        this.addChild(this.bg);
        // 初始化所有的
        this._tree = new egret.Bitmap();
        this._tree.texture = texture.getTexture('trr');
        this._tree2 = new egret.Bitmap();
        this._tree2.texture = texture.getTexture('trr');
        this._building = new egret.Bitmap();
        this._building.texture = texture.getTexture('building');
        this._door = new egret.Bitmap();
        this._door.texture = texture.getTexture('advDoor');
        this._tower = new egret.Bitmap();
        this._tower.texture = texture.getTexture('advs');
        this.init();
    }
    public init(){
        // 初始化生命值
        for(var i = 0; i < this.num; i++){
            this.alive[i] = false;
        }
        this.Monitor();
    }
    // 绘制场景
    public draw(pass:number) {
        for (var i = 0; i < this.num; i++) {
            if (this.alive[i]) {
                var pic:egret.Bitmap;
                var pic2:egret.Bitmap;
                // ['tree', 'tower', 'building', 'door'];
                switch (this.picType[i]) {
                    case 'tree':
                        pic = this._tree;
                        pic2 = this._tree2;
                        pic.x = this._x[i];
                        pic.y = this._y[i];

                        pic2.anchorOffsetX = pic2.width / 2;
                        pic2.anchorOffsetY = pic2.height / 2;
                        pic2.scaleX = pic2.scaleY = this.large[i];
                        this.addChild(pic2);
                        pic2.x = this._x2[i];
                        pic2.y = this._y[i];
                        this._x2[i] += 0.05 *pass * this.sped;   
                        this._x[i] -= 0.05 * pass * this.sped;
                        this._y[i] += 0.045 *pass * this.sped;
                        this.large[i] += 0.0003 *pass * this.sped;
                        this.addChildAt(pic, 1);
                        if (this._x[i] < -pic.width) {
                            this.alive[i] = false;
                            this.removeChild(pic2);
                            this.removeChild(pic);
                        }
                        break;
                    case 'tower':
                        pic = this._tower;
                        pic.x = this._x[i];
                        pic.y = this._y[i];
                        this._x[i] -= 0.045 * pass * this.sped;
                        this._y[i] += 0.045 * pass * this.sped;
                        this.large[i] += 0.000075 *pass * this.sped;
                        this.addChildAt(pic, 1);
                        if (this._x[i] < -pic.width) {
                            this.alive[i] = false;
                            this.removeChild(pic);
                        }
                        break;
                    case 'building':
                        pic = this._building;
                        pic.x = this._x[i];
                        pic.y = this._y[i];
                        this._x[i] += 0.045 * pass * this.sped;
                        this._y[i] += 0.045 *pass * this.sped;
                        this.large[i] += 0.000095 *pass * this.sped;
                        this.addChildAt(pic, 1);
                        if (this._x[i] > 750 + pic.width) {
                            this.alive[i] = false;
                            this.removeChild(pic);
                        }
                        break;
                    case 'door':
                        pic = this._door;
                        pic.x = this._x[i];
                        pic.y = this._y[i];
                        this.large[i] += 0.00015 *pass * this.sped;
                        this.addChildAt(pic, 1);
                        if(this.large[i] > 1.48) {
                            this.alive[i] = false;
                            this.removeChild(pic);
                        }
                        break;
                }
                pic.anchorOffsetX = pic.width / 2;
                pic.anchorOffsetY = pic.height / 2;
                pic.scaleX = pic.scaleY = this.large[i];
            }
        }
        // 间隔时间
        this.calcuTime += pass;
        if(this.calcuTime >= 1800) {
            this.calcuTime %= 1800;
            this.Monitor();
        }
    }
    // 控制显示 景物场景数量
    private Monitor () {
        var num = 0;
        for (var i = 0; i < this.num; i++){
            if (this.alive[i]) {
                num++;
            }
        }
        // 控制显示数量
        if (num < 4) {
            this.addPIC();
        }
    }
    // 增加一个图片
    private addPIC(){
        for(var i = 0; i < this.num; i++){
            if(!this.alive[i]){
                this.born(i);
                return;
            }
        }
    }
    // 生成一个 特定的移动场景
    private born(index:number):void{
        switch (this.changeType) {
            case 0:
                this._x[index] = 257;
                this._x2[index] = 497;
                this._y[index] = 540;
                this.large[index] = 0.57;
                break;
            case 1:
                this._x[index] = 250;
                this._y[index] = 534;
                this.large[index] = 0.3363;
                break;
            case 2:
                this._x[index] = 555;
                this._y[index] = 534;
                this.large[index] = 0.6389;
                break;
            case 3:
                this._x[index] = 375;
                this._y[index] = 480;
                this.large[index] = 0.53;
                break;
        }
        this.picType[index] = this.types[this.changeType];
        this.alive[index] = true;
        this.changeType++;
        if(this.changeType >= 4){
            this.changeType = this.changeType % 4;
        }
    }
}
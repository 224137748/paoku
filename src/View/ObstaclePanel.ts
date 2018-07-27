class ObstaclePanel extends egret.DisplayObjectContainer{
    // 障碍物的坐标
    private _x:Array<number> = [];
    private _y:Array<number> = [];
    // 障碍物的位置类别 左 - 中 - 右
    private picType:Array<number> = [];
    private large:Array<number> = [];
    private sped:number = Config.speed;

    // 生命池
    private alive:Array<boolean> = [];

    // 随机出现礼物或者障碍物 'obsracle' or 'gift'
    private MType:Array<string> = [];
    // 用于碰撞检测计算得分，判断是那种类型的障碍物   0-obstacle1障碍物 1-小龙虾 2-三角障碍物
    private IdType:Array<number> = [];
    // 初始化定义bitmap类型
    private BitMapType:Array<egret.Bitmap> = [];
    
    private num:number = Config.obstacle_num;
    private textures:egret.SpriteSheet;

    // 计时器
    private calcuTime: number = 0;

    // 长安汽车
    public car:Car;
    
    public constructor(textures:egret.SpriteSheet){
        super()
        this.textures = textures;
        this.car = new Car();
		this.addChild(this.car);
        console.log(this.car._car.x,this.car._car.y,this.car._car.width,this.car._car.height)
        this.init();
    }

    private longxia():egret.Bitmap{
        var bit:egret.Bitmap = new egret.Bitmap();
        bit.texture = this.textures.getTexture('obstacle2');
        return bit;
    };
    private sanjiao():egret.Bitmap{
        var bit:egret.Bitmap = new egret.Bitmap();
        bit.texture = this.textures.getTexture('obstacle3');
        return bit;
    };
    private yuanzhu():egret.Bitmap{
        var bit:egret.Bitmap = new egret.Bitmap();
        bit.texture = this.textures.getTexture('obstacle1');
        return bit;
    };
    public init() {
        for(var i = 0; i < this.num; i++) {
            this.alive[i] = false;
        }
        this.obstacleMonitor();
    }

    private born(i) {
        this.alive[i] = true;
        this._y[i] = 558;
        this.picType[i] = Math.random() * 3 | 0;
        //  0==左  1==中  2 == 右
        switch (this.picType[i]) {
            case 0:
                this._x[i] = 313;
                break;
            case 1: 
                this._x[i] = 375;
                break;
            case 2:
                this._x[i] = 433;
                break;
        }
        // 0-圆柱障碍物 1-小龙虾 2-三角障碍物
        this.IdType[i] = Math.random() * 3 | 0;
        switch (this.IdType[i]){
            case 0:
                this.large[i] = 0.3235;
                this.BitMapType[i] = this.yuanzhu();
                break;
            case 1:
                this.large[i] = 0.47142;
                this.BitMapType[i] = this.longxia();
                break;
            case 2:
                this.large[i] = 1;
                this.BitMapType[i] = this.sanjiao();
                break;
        }
    }
    // 绘制图形
    public draw (pass:number) {
        for(var i = 0; i < this.num; i++) {
            if(this.alive[i]) {
                var pic:egret.Bitmap = this.BitMapType[i];
                pic.x = this._x[i];
                pic.y = this._y[i];
                pic.anchorOffsetX  = pic.width / 2;
                pic.anchorOffsetY = pic.height / 2;
                pic.scaleX = pic.scaleY = this.large[i];
                this.addChildAt(pic, 0);
                // 变化过程 左中右
                switch (this.picType[i]) {
                    case 0:
                        this._x[i] -= 0.03 * pass * this.sped;
                        this.large[i] += 0.0001 * pass * this.sped;
                        break;
                    case 1:
                        this.large[i] += 0.00012 * pass * this.sped;
                        break;
                    case 2:
                        this._x[i] += 0.03 * pass * this.sped;
                        this.large[i] += 0.0001 * pass * this.sped;
                        break;
                }
                this._y[i] += 0.07* pass * this.sped;
                if (this._y[i] >= 943) {
                    this.setChildIndex(pic, 10);
                }
                if(this._y[i] > (this.stage.stageHeight+pic.height/2)){
                    this.alive[i] = false;
                    this.removeChild(pic);
                }
                
            }
        }
        this.calcuTime += pass;
        if(this.calcuTime >= 2800) {
            this.calcuTime %= 2800;
            this.obstacleMonitor();
        }
        // 汽车动画
		this.car.draw(pass);
        // 计算碰撞检测

    }

    private obstacleMonitor(){
        var num = 0;
        for(var i = 0; i < this.num; i++) {
            if (this.alive[i]) {
                num++;
            }
        }
        if(num < 6) {
            this.addObstacle();
            return;
        }
    }
    private addObstacle(){
        for(var i = 0; i< this.num; i++){
            if(!this.alive[i]){
                this.born(i);
                return;
            }
        }
    }
    // 对障碍物和礼物分别进行碰撞检测
    public collisionZA(){
        // console.log(this.car._car.x,this.car._car.y,this.car._car.width,this.car._car.height)
        var runY_bottom = this.car._car.y + this.car._car.height * 0.5;
        for(var i = 0; i < this.num; i++) {
            if(this.alive[i]) {
                var picBitmap:egret.Bitmap = this.BitMapType[i];
                // 如果是障碍物
                if(this.MType[i] === 'obsracle') {
                    var len = runY_bottom - (this._y[i] + picBitmap.height * 0.5);
                    
                }
            }
        }
    }
}
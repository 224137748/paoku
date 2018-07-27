class Car extends egret.Sprite{
    // 车子 左 中 右方向
    public directType:string = 'm';
    // 车子是否跳跃
    public jump:boolean = false;
    // 控制动画
    public angle:number = 0;
    // 汽车的中坐标；
    private constY:number = 943;
    // 汽车的横坐标
    private constX:number = 375;

    public _car:egret.Bitmap;
    public constructor(){
        super();
        var data = RES.getRes('runner_json');
        this._car = new egret.Bitmap();
        this._car.texture = data.getTexture('car');
        this._car.x = 375;
        this._car.y = 943;
        this._car.anchorOffsetX = this._car.width/2;
        this._car.anchorOffsetY = this._car.height/2;
        this.touchEnabled = true;
        this.addChild(this._car);
    }
    public draw(pass:number) {
        if (this.jump) {
            this.angle += 0.004 * pass;
            if(this.angle>Math.PI){
                this.angle = Math.PI;
                this.jump = false;
                this.angle = 0;
            }
            var sin = Math.sin(this.angle);
            console.log('sin', sin)
            this._car.y = this.constY - 150 *sin;
        }
        switch (this.directType) {
        case 'l':
            this._car.x = this.lerpDistance(this.constX - 230, this._car.x, 0.92);
            break;
        case 'r':
            this._car.x = this.lerpDistance(this.constX + 230, this._car.x, 0.92);
            break;
        case 'm':
            this._car.x = this.lerpDistance(this.constX , this._car.x, 0.92);
            break;
        default:
            break;
        }
    }
    // 递减函数,ratio越大，变化越慢
    private lerpDistance(aim, cur, ratio) {
        var delta = cur - aim;
        return aim + delta * ratio;
    }

}
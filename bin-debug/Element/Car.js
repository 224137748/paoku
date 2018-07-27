var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Car = (function (_super) {
    __extends(Car, _super);
    function Car() {
        var _this = _super.call(this) || this;
        // 车子 左 中 右方向
        _this.directType = 'm';
        // 车子是否跳跃
        _this.jump = false;
        // 控制动画
        _this.angle = 0;
        // 汽车的中坐标；
        _this.constY = 943;
        // 汽车的横坐标
        _this.constX = 375;
        var data = RES.getRes('runner_json');
        _this._car = new egret.Bitmap();
        _this._car.texture = data.getTexture('car');
        _this._car.x = 375;
        _this._car.y = 943;
        _this._car.anchorOffsetX = _this._car.width / 2;
        _this._car.anchorOffsetY = _this._car.height / 2;
        _this.touchEnabled = true;
        _this.addChild(_this._car);
        return _this;
    }
    Car.prototype.draw = function (pass) {
        if (this.jump) {
            this.angle += 0.004 * pass;
            if (this.angle > Math.PI) {
                this.angle = Math.PI;
                this.jump = false;
                this.angle = 0;
            }
            var sin = Math.sin(this.angle);
            console.log('sin', sin);
            this._car.y = this.constY - 150 * sin;
        }
        switch (this.directType) {
            case 'l':
                this._car.x = this.lerpDistance(this.constX - 230, this._car.x, 0.92);
                break;
            case 'r':
                this._car.x = this.lerpDistance(this.constX + 230, this._car.x, 0.92);
                break;
            case 'm':
                this._car.x = this.lerpDistance(this.constX, this._car.x, 0.92);
                break;
            default:
                break;
        }
    };
    // 递减函数,ratio越大，变化越慢
    Car.prototype.lerpDistance = function (aim, cur, ratio) {
        var delta = cur - aim;
        return aim + delta * ratio;
    };
    return Car;
}(egret.Sprite));
__reflect(Car.prototype, "Car");
//# sourceMappingURL=Car.js.map
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
// 背景类
var BackgroundPanel = (function (_super) {
    __extends(BackgroundPanel, _super);
    function BackgroundPanel(texture) {
        var _this = _super.call(this) || this;
        _this.timeThremper = 0;
        _this.timer = 150;
        _this._a = 0;
        _this._b = 0;
        _this._c = 0;
        _this._d = 0;
        _this.sky = new egret.Bitmap();
        _this.sky.texture = texture.getTexture('sky');
        _this.addChild(_this.sky);
        _this.cloud1 = new egret.Bitmap();
        _this.cloud1.texture = texture.getTexture('cloud1');
        _this.addChild(_this.cloud1);
        _this.cloud2 = new egret.Bitmap();
        _this.cloud2.texture = texture.getTexture('cloud2');
        _this.addChild(_this.cloud2);
        _this.timeThremper = egret.getTimer();
        _this.init();
        return _this;
    }
    // 初始化位置信息
    BackgroundPanel.prototype.init = function () {
        this.cloud1.x = -9;
        this.cloud1.y = 302;
        this.cloud2.x = 268;
        this.cloud2.y = 330;
        this.timeThremper = egret.getTimer();
    };
    BackgroundPanel.prototype.draw = function (pass) {
        this.timeThremper += pass;
        if (this.timeThremper > this.timer) {
            // console.log(pass);
            if (this.cloud1.x >= -9) {
                this._a = -1;
            }
            else if (this.cloud1.x < -18) {
                this._a = 1;
            }
            if (this.cloud1.y >= 310) {
                this._b = -1;
            }
            else if (this.cloud1.y <= 302) {
                this._b = 1;
            }
            if (this.cloud2.x <= 268) {
                this._c = 1;
            }
            else if (this.cloud2.x > 280) {
                this._c = -1;
            }
            if (this.cloud2.y <= 330) {
                this._d = 1;
            }
            else if (this.cloud2.y > 342) {
                this._d = -1;
            }
            this.cloud1.x += this._a;
            this.cloud1.y += this._b;
            this.cloud2.x += this._c;
            this.cloud2.y += this._d;
            this.timeThremper = this.timeThremper % this.timer;
        }
    };
    return BackgroundPanel;
}(egret.DisplayObjectContainer));
__reflect(BackgroundPanel.prototype, "BackgroundPanel");
//# sourceMappingURL=BackgroundPanel.js.map
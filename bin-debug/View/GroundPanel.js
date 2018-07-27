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
// 绘制绿地，广告牌
var GroundPanel = (function (_super) {
    __extends(GroundPanel, _super);
    function GroundPanel(texture) {
        var _this = _super.call(this) || this;
        _this.num = Config.bg_number;
        // 广告栏的x坐标
        _this._x = [];
        _this._x2 = [];
        // 广告栏Y坐标
        _this._y = [];
        // 放大系数
        _this.large = [];
        // 生命池
        _this.alive = [];
        _this.sped = Config.speed;
        _this.picType = [];
        // 改变广告栏的
        _this.changeType = 0;
        _this.types = ['tree', 'tower', 'building', 'door'];
        // 计时器
        _this.calcuTime = 0;
        _this.bg = new egret.Bitmap();
        _this.bg.texture = texture.getTexture('background');
        _this.bg.y = 560;
        _this.addChild(_this.bg);
        // 初始化所有的
        _this._tree = new egret.Bitmap();
        _this._tree.texture = texture.getTexture('trr');
        _this._tree2 = new egret.Bitmap();
        _this._tree2.texture = texture.getTexture('trr');
        _this._building = new egret.Bitmap();
        _this._building.texture = texture.getTexture('building');
        _this._door = new egret.Bitmap();
        _this._door.texture = texture.getTexture('advDoor');
        _this._tower = new egret.Bitmap();
        _this._tower.texture = texture.getTexture('advs');
        _this.init();
        return _this;
    }
    GroundPanel.prototype.init = function () {
        // 初始化生命值
        for (var i = 0; i < this.num; i++) {
            this.alive[i] = false;
        }
        this.Monitor();
    };
    // 绘制场景
    GroundPanel.prototype.draw = function (pass) {
        for (var i = 0; i < this.num; i++) {
            if (this.alive[i]) {
                var pic;
                var pic2;
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
                        this._x2[i] += 0.05 * pass * this.sped;
                        this._x[i] -= 0.05 * pass * this.sped;
                        this._y[i] += 0.045 * pass * this.sped;
                        this.large[i] += 0.0003 * pass * this.sped;
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
                        this.large[i] += 0.000075 * pass * this.sped;
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
                        this._y[i] += 0.045 * pass * this.sped;
                        this.large[i] += 0.000095 * pass * this.sped;
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
                        this.large[i] += 0.00015 * pass * this.sped;
                        this.addChildAt(pic, 1);
                        if (this.large[i] > 1.48) {
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
        if (this.calcuTime >= 1800) {
            this.calcuTime %= 1800;
            this.Monitor();
        }
    };
    // 控制显示 景物场景数量
    GroundPanel.prototype.Monitor = function () {
        var num = 0;
        for (var i = 0; i < this.num; i++) {
            if (this.alive[i]) {
                num++;
            }
        }
        // 控制显示数量
        if (num < 4) {
            this.addPIC();
        }
    };
    // 增加一个图片
    GroundPanel.prototype.addPIC = function () {
        for (var i = 0; i < this.num; i++) {
            if (!this.alive[i]) {
                this.born(i);
                return;
            }
        }
    };
    // 生成一个 特定的移动场景
    GroundPanel.prototype.born = function (index) {
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
        if (this.changeType >= 4) {
            this.changeType = this.changeType % 4;
        }
    };
    return GroundPanel;
}(egret.DisplayObjectContainer));
__reflect(GroundPanel.prototype, "GroundPanel");
//# sourceMappingURL=GroundPanel.js.map
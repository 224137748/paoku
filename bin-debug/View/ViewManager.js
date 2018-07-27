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
// 新建视图管理器， 用于控制视图，发送事件
var ViewManager = (function (_super) {
    __extends(ViewManager, _super);
    function ViewManager(root, textures) {
        var _this = _super.call(this) || this;
        // 记录当前时间戳
        _this.time = 0;
        _this._rootView = root;
        _this._textures = textures;
        _this.backgroundPanel = new BackgroundPanel(textures);
        root.addChild(_this.backgroundPanel);
        _this.groundPanel = new GroundPanel(textures);
        root.addChild(_this.groundPanel);
        _this.obstaclePanel = new ObstaclePanel(textures);
        root.addChild(_this.obstaclePanel);
        return _this;
    }
    // 实例化所有显示内容
    ViewManager.prototype.init = function () {
        // 初始化背景位置
        this.backgroundPanel.init();
        this.groundPanel.init();
    };
    ViewManager.prototype.draw = function (timeStamp) {
        var pass = timeStamp - this.time;
        // console.log('timeStamp', timeStamp, pass);
        // 循环序列帧 时间间隔
        // console.log('pass++', pass);
        this.time = timeStamp;
        // 绘制图形开始
        // egret.ticker.pause();
        // 绘制天空、云朵 
        this.backgroundPanel.draw(pass);
        // 绘制草地，广告栏，树、建筑
        this.groundPanel.draw(pass);
        // 绘制障碍物
        this.obstaclePanel.draw(pass);
        return false;
    };
    return ViewManager;
}(egret.EventDispatcher));
__reflect(ViewManager.prototype, "ViewManager");
//# sourceMappingURL=ViewManager.js.map
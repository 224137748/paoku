var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config = (function () {
    function Config() {
    }
    // 速度增长系数
    Config.speed = 1.8;
    // 广告栏数量
    Config.bg_number = 8;
    // 障碍物数量
    Config.obstacle_num = 8;
    // touch操作灵敏度
    Config.touchlm = 50;
    return Config;
}());
__reflect(Config.prototype, "Config");
//# sourceMappingURL=Config.js.map
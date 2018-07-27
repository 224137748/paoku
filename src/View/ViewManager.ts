// 新建视图管理器， 用于控制视图，发送事件
class ViewManager extends egret.EventDispatcher {
	private _rootView: egret.DisplayObjectContainer;
	private _textures: egret.SpriteSheet;
	// 头部背景，云朵，天空
	private backgroundPanel:BackgroundPanel;
	private groundPanel:GroundPanel;
	public obstaclePanel:ObstaclePanel;
	

	public constructor(root: egret.DisplayObjectContainer, textures:egret.SpriteSheet) {
		super();
		this._rootView = root;
		this._textures = textures;
		this.backgroundPanel =  new BackgroundPanel(textures);
		root.addChild(this.backgroundPanel);
		this.groundPanel = new GroundPanel(textures);
		root.addChild(this.groundPanel);
		this.obstaclePanel = new ObstaclePanel(textures);
		root.addChild(this.obstaclePanel);
		
		
		
	}
	// 实例化所有显示内容
    public init():void{
		// 初始化背景位置
		this.backgroundPanel.init();
		this.groundPanel.init();

    }
	// 记录当前时间戳
	public time:number = 0;
	public draw(timeStamp:number) {
		var pass:number = timeStamp - this.time;
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
	}

	
}
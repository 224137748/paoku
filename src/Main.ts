//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            console.log("app 进入后台");
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            console.log("app 进入前台");
            // egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        // 加载资源
        await this.loadResource()
        // 
        this.createGameScene();
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    // 视图管理器
    private viewManger:ViewManager;
    protected createGameScene(): void {
        this.viewManger = new ViewManager(this, RES.getRes('runner_json'));
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private _touchStatus:boolean = false;
    private _startX:number;
    private _startY:number;
    private _endX:number;
    private _endY:number;
    private GameOver:boolean = false
    // 开始游戏
    private startGame(evt:egret.Event) {
        if (!this.GameOver) {
            console.log('startGame');
            // gameLoop循环开始  注意传入的this，指针
            this.viewManger.time = egret.getTimer();
            egret.ticker.resume();
            egret.startTick(this.viewManger.draw, this.viewManger);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
            this.GameOver = true
        }
    }
    
    // 绑定touchSatrt
    private touchBegin(evt:egret.TouchEvent) {
        console.log('TOUCH_BEGIN', evt.stageX, evt.stageY)
        this._touchStatus = true
        this._startX = evt.stageX;
        this._startY = evt.stageY;
        // this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    }
    private touchEnd(evt:egret.TouchEvent) {
        if(this._touchStatus) {
            this._endX = evt.stageX;
            this._endY = evt.stageY;
            if (Math.abs(this._endX - this._startX) < Math.abs(this._endY - this._startY) && (this._endY - this._startY) < Config.touchlm) {
                this.viewManger.obstaclePanel.car.jump = true;
            }
            if (Math.abs(this._endX - this._startX) > Math.abs(this._endY - this._startY) && (this._endX - this._startX) > 0) { //==>向右滑
                switch (this.viewManger.obstaclePanel.car.directType) {
                    case 'l':
                        this.viewManger.obstaclePanel.car.directType = 'm';
                        break;
                    case 'm':
                        this.viewManger.obstaclePanel.car.directType = 'r';
                        break;
                }

            } else if (Math.abs(this._endX - this._startX) > Math.abs(this._endY - this._startY) && (this._endX - this._startX) < 0) { //==>向左滑动
                switch (this.viewManger.obstaclePanel.car.directType) {
                    case 'r':
                        this.viewManger.obstaclePanel.car.directType = 'm';
                        break;
                    case 'm':
                        this.viewManger.obstaclePanel.car.directType = 'l';
                        break;
                }
            }

        }
        console.log('move', evt.stageX, evt.stageY)
        console.log(this.viewManger.obstaclePanel.car.jump)
    }
    // private touchEnd(){
    //     this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    // }
    
}

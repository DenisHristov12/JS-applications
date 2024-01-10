export class LoginComponent {
    constructor(authService, renderHandler, templateFunction, router){
        this.authService = authService;
        this.renderHandler = renderHandler;
        this.templateFunction = templateFunction;
        this.router = router;
        this._loginHandler = this._loginHandler.bind(this);
        this._showView = this._showView.bind(this);
    }

    async _showView(){
        let template = this.templateFunction(this._loginHandler);
        this.renderHandler(template);
    }

    async _loginHandler(e){
      console.log("here");
    }
}
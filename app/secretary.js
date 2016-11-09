System.register(["@angular/core", "@angular/platform-browser", "@angular/platform-browser-dynamic", "@angular/router", "./cabinetMedicalModule", "./Components/ComposantApp"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, platform_browser_1, platform_browser_dynamic_1, router_1, cabinetMedicalModule_1, ComposantApp_1;
    var AppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (cabinetMedicalModule_1_1) {
                cabinetMedicalModule_1 = cabinetMedicalModule_1_1;
            },
            function (ComposantApp_1_1) {
                ComposantApp_1 = ComposantApp_1_1;
            }],
        execute: function() {
            AppModule = class AppModule {
            };
            AppModule = __decorate([
                core_1.NgModule({
                    imports: [platform_browser_1.BrowserModule, cabinetMedicalModule_1.CabinetMedicalModule],
                    declarations: [],
                    bootstrap: [ComposantApp_1.ComposantApp],
                    directives: [router_1.ROUTER_PROVIDERS]
                }), 
                __metadata('design:paramtypes', [])
            ], AppModule);
            exports_1("AppModule", AppModule);
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
        }
    }
});
//enableProdMode();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlY3JldGFyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQWVBO1lBQXdCLENBQUM7WUFOekI7Z0JBQUMsZUFBUSxDQUFDO29CQUNOLE9BQU8sRUFBTyxDQUFFLGdDQUFhLEVBQUUsMkNBQW9CLENBQUU7b0JBQ3JELFlBQVksRUFBRSxFQUFFO29CQUNoQixTQUFTLEVBQUssQ0FBRSwyQkFBWSxDQUFFO29CQUM5QixVQUFVLEVBQUksQ0FBRSx5QkFBZ0IsQ0FBRTtpQkFDckMsQ0FBQzs7eUJBQUE7WUFDRixpQ0FBeUIsQ0FBQTtZQUd6QixpREFBc0IsRUFBRSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7OztBQUVwRCxtQkFBbUIiLCJmaWxlIjoic2VjcmV0YXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSAgICAgICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSAgICAgICAgICAgIGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XG5pbXBvcnQgeyBwbGF0Zm9ybUJyb3dzZXJEeW5hbWljIH0gICBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljXCI7XG5pbXBvcnQgeyBST1VURVJfUFJPVklERVJTIH0gICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG4vL2ltcG9ydCB7IHByb3ZpZGUgfSAgICAgICAgICAgICAgICAgIGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IENhYmluZXRNZWRpY2FsTW9kdWxlIH0gICAgIGZyb20gXCIuL2NhYmluZXRNZWRpY2FsTW9kdWxlXCI7XG5pbXBvcnQgeyBDb21wb3NhbnRBcHAgfSAgICAgICAgICAgICBmcm9tIFwiLi9Db21wb25lbnRzL0NvbXBvc2FudEFwcFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHMgICAgIDogWyBCcm93c2VyTW9kdWxlLCBDYWJpbmV0TWVkaWNhbE1vZHVsZSBdLFxuICAgIGRlY2xhcmF0aW9uczogW10sXG4gICAgYm9vdHN0cmFwICAgOiBbIENvbXBvc2FudEFwcCBdLFxuICAgIGRpcmVjdGl2ZXMgIDogWyBST1VURVJfUFJPVklERVJTIF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XG5cblxucGxhdGZvcm1Ccm93c2VyRHluYW1pYygpLmJvb3RzdHJhcE1vZHVsZShBcHBNb2R1bGUpO1xuXG4vL2VuYWJsZVByb2RNb2RlKCk7XG4iXSwic291cmNlUm9vdCI6IiJ9

System.register(["@angular/core", "@angular/platform-browser", "@angular/platform-browser-dynamic", "./cabinetMedicalModule", "./Components/ComposantApp"], function(exports_1, context_1) {
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
    var core_1, platform_browser_1, platform_browser_dynamic_1, cabinetMedicalModule_1, ComposantApp_1;
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
                    bootstrap: [ComposantApp_1.ComposantApp]
                }), 
                __metadata('design:paramtypes', [])
            ], AppModule);
            exports_1("AppModule", AppModule);
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
        }
    }
});
//enableProdMode();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlY3JldGFyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQWFBO1lBQXdCLENBQUM7WUFMekI7Z0JBQUMsZUFBUSxDQUFDO29CQUNOLE9BQU8sRUFBTyxDQUFFLGdDQUFhLEVBQUUsMkNBQW9CLENBQUU7b0JBQ3JELFlBQVksRUFBRSxFQUFFO29CQUNoQixTQUFTLEVBQUssQ0FBRSwyQkFBWSxDQUFFO2lCQUNqQyxDQUFDOzt5QkFBQTtZQUNGLGlDQUF5QixDQUFBO1lBR3pCLGlEQUFzQixFQUFFLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O0FBRXBELG1CQUFtQiIsImZpbGUiOiJzZWNyZXRhcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9ICAgICAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9ICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcbmltcG9ydCB7IHBsYXRmb3JtQnJvd3NlckR5bmFtaWMgfSAgIGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWNcIjtcbi8vaW1wb3J0IHsgcHJvdmlkZSB9ICAgICAgICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgQ2FiaW5ldE1lZGljYWxNb2R1bGUgfSAgICAgZnJvbSBcIi4vY2FiaW5ldE1lZGljYWxNb2R1bGVcIjtcbmltcG9ydCB7IENvbXBvc2FudEFwcCB9ICAgICAgICAgICAgIGZyb20gXCIuL0NvbXBvbmVudHMvQ29tcG9zYW50QXBwXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0cyAgICAgOiBbIEJyb3dzZXJNb2R1bGUsIENhYmluZXRNZWRpY2FsTW9kdWxlIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXSxcbiAgICBib290c3RyYXAgICA6IFsgQ29tcG9zYW50QXBwIF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XG5cblxucGxhdGZvcm1Ccm93c2VyRHluYW1pYygpLmJvb3RzdHJhcE1vZHVsZShBcHBNb2R1bGUpO1xuXG4vL2VuYWJsZVByb2RNb2RlKCk7XG4iXSwic291cmNlUm9vdCI6IiJ9

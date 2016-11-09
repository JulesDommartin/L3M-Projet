System.register(["@angular/core", "@angular/router", "../Components/ComposantSecretaire"], function(exports_1, context_1) {
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
    var core_1, router_1, ComposantSecretaire_1;
    var SecretaryRoutingModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ComposantSecretaire_1_1) {
                ComposantSecretaire_1 = ComposantSecretaire_1_1;
            }],
        execute: function() {
            SecretaryRoutingModule = class SecretaryRoutingModule {
            };
            SecretaryRoutingModule = __decorate([
                core_1.NgModule({
                    imports: [
                        router_1.RouterModule.forChild([
                            {
                                path: "secretaire",
                                component: ComposantSecretaire_1.ComposantSecretaire
                            }
                        ])
                    ],
                    exports: [
                        router_1.RouterModule
                    ]
                }), 
                __metadata('design:paramtypes', [])
            ], SecretaryRoutingModule);
            exports_1("SecretaryRoutingModule", SecretaryRoutingModule);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vZHVsZXMvcm91dGluZy5zZWNyZXRhcnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBaUJBO1lBQXFDLENBQUM7WUFidEM7Z0JBQUMsZUFBUSxDQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxxQkFBWSxDQUFDLFFBQVEsQ0FBQzs0QkFDbEI7Z0NBQ0ksSUFBSSxFQUFFLFlBQVk7Z0NBQ2xCLFNBQVMsRUFBRSx5Q0FBbUI7NkJBQ2pDO3lCQUNKLENBQUM7cUJBQ0w7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLHFCQUFZO3FCQUNmO2lCQUNKLENBQUM7O3NDQUFBO1lBQ0YsMkRBQXNDLENBQUEiLCJmaWxlIjoiTW9kdWxlcy9yb3V0aW5nLnNlY3JldGFyeS5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9ICAgICBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IENvbXBvc2FudFNlY3JldGFpcmUgfSBmcm9tIFwiLi4vQ29tcG9uZW50cy9Db21wb3NhbnRTZWNyZXRhaXJlXCI7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhdGg6IFwic2VjcmV0YWlyZVwiLFxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBDb21wb3NhbnRTZWNyZXRhaXJlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdKVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBSb3V0ZXJNb2R1bGVcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNlY3JldGFyeVJvdXRpbmdNb2R1bGUge31cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==

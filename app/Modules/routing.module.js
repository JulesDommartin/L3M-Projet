System.register(["@angular/core", "@angular/router", "../Components/ComposantSecretaire", "../Components/ComposantOnlyPatient", "../Components/ComposantAddPatient"], function(exports_1, context_1) {
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
    var core_1, router_1, ComposantSecretaire_1, ComposantOnlyPatient_1, ComposantAddPatient_1;
    var AppRoutingModule;
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
            },
            function (ComposantOnlyPatient_1_1) {
                ComposantOnlyPatient_1 = ComposantOnlyPatient_1_1;
            },
            function (ComposantAddPatient_1_1) {
                ComposantAddPatient_1 = ComposantAddPatient_1_1;
            }],
        execute: function() {
            AppRoutingModule = class AppRoutingModule {
            };
            AppRoutingModule = __decorate([
                core_1.NgModule({
                    imports: [
                        router_1.RouterModule.forRoot([
                            {
                                path: "",
                                redirectTo: "/secretaire",
                                pathMatch: "full"
                            },
                            {
                                path: "secretaire",
                                component: ComposantSecretaire_1.ComposantSecretaire
                            },
                            {
                                path: "patient/:numero",
                                component: ComposantOnlyPatient_1.ComposantOnlyPatient
                            },
                            {
                                path: "addPatient",
                                component: ComposantAddPatient_1.ComposantAddPatient
                            }
                        ])
                    ],
                    exports: [
                        router_1.RouterModule
                    ]
                }), 
                __metadata('design:paramtypes', [])
            ], AppRoutingModule);
            exports_1("AppRoutingModule", AppRoutingModule);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vZHVsZXMvcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFnQ0E7WUFBK0IsQ0FBQztZQTFCaEM7Z0JBQUMsZUFBUSxDQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxxQkFBWSxDQUFDLE9BQU8sQ0FBQzs0QkFDakI7Z0NBQ0ksSUFBSSxFQUFFLEVBQUU7Z0NBQ1IsVUFBVSxFQUFFLGFBQWE7Z0NBQ3pCLFNBQVMsRUFBRSxNQUFNOzZCQUNwQjs0QkFDRDtnQ0FDSSxJQUFJLEVBQUUsWUFBWTtnQ0FDbEIsU0FBUyxFQUFFLHlDQUFtQjs2QkFDakM7NEJBQ0Q7Z0NBQ0ksSUFBSSxFQUFFLGlCQUFpQjtnQ0FDdkIsU0FBUyxFQUFFLDJDQUFvQjs2QkFDbEM7NEJBQ0Q7Z0NBQ0ksSUFBSSxFQUFFLFlBQVk7Z0NBQ2xCLFNBQVMsRUFBRSx5Q0FBbUI7NkJBQ2pDO3lCQUNKLENBQUM7cUJBQ0w7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLHFCQUFZO3FCQUNmO2lCQUNKLENBQUM7O2dDQUFBO1lBQ0YsK0NBQWdDLENBQUEiLCJmaWxlIjoiTW9kdWxlcy9yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gICAgIGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge0NvbXBvc2FudFNlY3JldGFpcmV9IGZyb20gXCIuLi9Db21wb25lbnRzL0NvbXBvc2FudFNlY3JldGFpcmVcIjtcbmltcG9ydCB7Q29tcG9zYW50T25seVBhdGllbnR9IGZyb20gXCIuLi9Db21wb25lbnRzL0NvbXBvc2FudE9ubHlQYXRpZW50XCI7XG5pbXBvcnQge0NvbXBvc2FudEFkZFBhdGllbnR9IGZyb20gXCIuLi9Db21wb25lbnRzL0NvbXBvc2FudEFkZFBhdGllbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JSb290KFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoOiBcIlwiLFxuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG86IFwiL3NlY3JldGFpcmVcIixcbiAgICAgICAgICAgICAgICBwYXRoTWF0Y2g6IFwiZnVsbFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6IFwic2VjcmV0YWlyZVwiLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogQ29tcG9zYW50U2VjcmV0YWlyZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoOiBcInBhdGllbnQvOm51bWVyb1wiLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogQ29tcG9zYW50T25seVBhdGllbnRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogXCJhZGRQYXRpZW50XCIsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBDb21wb3NhbnRBZGRQYXRpZW50XG4gICAgICAgICAgICB9XG4gICAgICAgIF0pXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFJvdXRlck1vZHVsZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwUm91dGluZ01vZHVsZSB7fVxuIl0sInNvdXJjZVJvb3QiOiIifQ==

System.register(["@angular/core", "@angular/router", "../Components/ComposantSecretaire", "../Components/ComposantOnlyPatient"], function(exports_1, context_1) {
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
    var core_1, router_1, ComposantSecretaire_1, ComposantOnlyPatient_1;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vZHVsZXMvcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUEyQkE7WUFBK0IsQ0FBQztZQXRCaEM7Z0JBQUMsZUFBUSxDQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxxQkFBWSxDQUFDLE9BQU8sQ0FBQzs0QkFDakI7Z0NBQ0ksSUFBSSxFQUFFLEVBQUU7Z0NBQ1IsVUFBVSxFQUFFLGFBQWE7Z0NBQ3pCLFNBQVMsRUFBRSxNQUFNOzZCQUNwQjs0QkFDRDtnQ0FDSSxJQUFJLEVBQUUsWUFBWTtnQ0FDbEIsU0FBUyxFQUFFLHlDQUFtQjs2QkFDakM7NEJBQ0Q7Z0NBQ0ksSUFBSSxFQUFFLGlCQUFpQjtnQ0FDdkIsU0FBUyxFQUFFLDJDQUFvQjs2QkFDbEM7eUJBQ0osQ0FBQztxQkFDTDtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wscUJBQVk7cUJBQ2Y7aUJBQ0osQ0FBQzs7Z0NBQUE7WUFDRiwrQ0FBZ0MsQ0FBQSIsImZpbGUiOiJNb2R1bGVzL3JvdXRpbmcubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSAgICAgZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge0NvbXBvc2FudFNlY3JldGFpcmV9IGZyb20gXCIuLi9Db21wb25lbnRzL0NvbXBvc2FudFNlY3JldGFpcmVcIjtcclxuaW1wb3J0IHtDb21wb3NhbnRPbmx5UGF0aWVudH0gZnJvbSBcIi4uL0NvbXBvbmVudHMvQ29tcG9zYW50T25seVBhdGllbnRcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvclJvb3QoW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogXCIvc2VjcmV0YWlyZVwiLFxyXG4gICAgICAgICAgICAgICAgcGF0aE1hdGNoOiBcImZ1bGxcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiBcInNlY3JldGFpcmVcIixcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogQ29tcG9zYW50U2VjcmV0YWlyZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiBcInBhdGllbnQvOm51bWVyb1wiLFxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBDb21wb3NhbnRPbmx5UGF0aWVudFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSlcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgUm91dGVyTW9kdWxlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHt9XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=

System.register(["@angular/core", "@angular/router", "../Components/ComposantSecretaire", "../Components/ComposantOnlyPatient", "../Components/ComposantAddPatient", "../Components/ComposantEditPatient"], function(exports_1, context_1) {
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
    var core_1, router_1, ComposantSecretaire_1, ComposantOnlyPatient_1, ComposantAddPatient_1, ComposantEditPatient_1;
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
            },
            function (ComposantEditPatient_1_1) {
                ComposantEditPatient_1 = ComposantEditPatient_1_1;
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
                            },
                            {
                                path: "editPatient/:numero",
                                component: ComposantEditPatient_1.ComposantEditPatient
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vZHVsZXMvcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFxQ0E7WUFBK0IsQ0FBQztZQTlCaEM7Z0JBQUMsZUFBUSxDQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxxQkFBWSxDQUFDLE9BQU8sQ0FBQzs0QkFDakI7Z0NBQ0ksSUFBSSxFQUFFLEVBQUU7Z0NBQ1IsVUFBVSxFQUFFLGFBQWE7Z0NBQ3pCLFNBQVMsRUFBRSxNQUFNOzZCQUNwQjs0QkFDRDtnQ0FDSSxJQUFJLEVBQUUsWUFBWTtnQ0FDbEIsU0FBUyxFQUFFLHlDQUFtQjs2QkFDakM7NEJBQ0Q7Z0NBQ0ksSUFBSSxFQUFFLGlCQUFpQjtnQ0FDdkIsU0FBUyxFQUFFLDJDQUFvQjs2QkFDbEM7NEJBQ0Q7Z0NBQ0ksSUFBSSxFQUFFLFlBQVk7Z0NBQ2xCLFNBQVMsRUFBRSx5Q0FBbUI7NkJBQ2pDOzRCQUNEO2dDQUNJLElBQUksRUFBQyxxQkFBcUI7Z0NBQzFCLFNBQVMsRUFBRSwyQ0FBb0I7NkJBQ2xDO3lCQUNKLENBQUM7cUJBQ0w7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLHFCQUFZO3FCQUNmO2lCQUNKLENBQUM7O2dDQUFBO1lBQ0YsK0NBQWdDLENBQUEiLCJmaWxlIjoiTW9kdWxlcy9yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7Q29tcG9zYW50U2VjcmV0YWlyZX0gICAgZnJvbSBcIi4uL0NvbXBvbmVudHMvQ29tcG9zYW50U2VjcmV0YWlyZVwiO1xyXG5pbXBvcnQge0NvbXBvc2FudE9ubHlQYXRpZW50fSAgIGZyb20gXCIuLi9Db21wb25lbnRzL0NvbXBvc2FudE9ubHlQYXRpZW50XCI7XHJcbmltcG9ydCB7Q29tcG9zYW50QWRkUGF0aWVudH0gICAgZnJvbSBcIi4uL0NvbXBvbmVudHMvQ29tcG9zYW50QWRkUGF0aWVudFwiO1xyXG5pbXBvcnQge0NvbXBvc2FudEVkaXRQYXRpZW50fSAgIGZyb20gXCIuLi9Db21wb25lbnRzL0NvbXBvc2FudEVkaXRQYXRpZW50XCI7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JSb290KFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogXCJcIixcclxuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG86IFwiL3NlY3JldGFpcmVcIixcclxuICAgICAgICAgICAgICAgIHBhdGhNYXRjaDogXCJmdWxsXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogXCJzZWNyZXRhaXJlXCIsXHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IENvbXBvc2FudFNlY3JldGFpcmVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogXCJwYXRpZW50LzpudW1lcm9cIixcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogQ29tcG9zYW50T25seVBhdGllbnRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogXCJhZGRQYXRpZW50XCIsXHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IENvbXBvc2FudEFkZFBhdGllbnRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDpcImVkaXRQYXRpZW50LzpudW1lcm9cIixcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogQ29tcG9zYW50RWRpdFBhdGllbnRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0pXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIFJvdXRlck1vZHVsZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwUm91dGluZ01vZHVsZSB7fVxyXG4iXSwic291cmNlUm9vdCI6IiJ9

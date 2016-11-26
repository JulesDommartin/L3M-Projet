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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJvdXRlcy9yb3V0aW5nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQXFDQTtZQUErQixDQUFDO1lBOUJoQztnQkFBQyxlQUFRLENBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLHFCQUFZLENBQUMsT0FBTyxDQUFDOzRCQUNqQjtnQ0FDSSxJQUFJLEVBQUUsRUFBRTtnQ0FDUixVQUFVLEVBQUUsYUFBYTtnQ0FDekIsU0FBUyxFQUFFLE1BQU07NkJBQ3BCOzRCQUNEO2dDQUNJLElBQUksRUFBRSxZQUFZO2dDQUNsQixTQUFTLEVBQUUseUNBQW1COzZCQUNqQzs0QkFDRDtnQ0FDSSxJQUFJLEVBQUUsaUJBQWlCO2dDQUN2QixTQUFTLEVBQUUsMkNBQW9COzZCQUNsQzs0QkFDRDtnQ0FDSSxJQUFJLEVBQUUsWUFBWTtnQ0FDbEIsU0FBUyxFQUFFLHlDQUFtQjs2QkFDakM7NEJBQ0Q7Z0NBQ0ksSUFBSSxFQUFDLHFCQUFxQjtnQ0FDMUIsU0FBUyxFQUFFLDJDQUFvQjs2QkFDbEM7eUJBQ0osQ0FBQztxQkFDTDtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wscUJBQVk7cUJBQ2Y7aUJBQ0osQ0FBQzs7Z0NBQUE7WUFDRiwrQ0FBZ0MsQ0FBQSIsImZpbGUiOiJSb3V0ZXMvcm91dGluZy5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9ICAgICAgICAgICAgIGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9ICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge0NvbXBvc2FudFNlY3JldGFpcmV9ICAgIGZyb20gXCIuLi9Db21wb25lbnRzL0NvbXBvc2FudFNlY3JldGFpcmVcIjtcclxuaW1wb3J0IHtDb21wb3NhbnRPbmx5UGF0aWVudH0gICBmcm9tIFwiLi4vQ29tcG9uZW50cy9Db21wb3NhbnRPbmx5UGF0aWVudFwiO1xyXG5pbXBvcnQge0NvbXBvc2FudEFkZFBhdGllbnR9ICAgIGZyb20gXCIuLi9Db21wb25lbnRzL0NvbXBvc2FudEFkZFBhdGllbnRcIjtcclxuaW1wb3J0IHtDb21wb3NhbnRFZGl0UGF0aWVudH0gICBmcm9tIFwiLi4vQ29tcG9uZW50cy9Db21wb3NhbnRFZGl0UGF0aWVudFwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yUm9vdChbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhdGg6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICByZWRpcmVjdFRvOiBcIi9zZWNyZXRhaXJlXCIsXHJcbiAgICAgICAgICAgICAgICBwYXRoTWF0Y2g6IFwiZnVsbFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhdGg6IFwic2VjcmV0YWlyZVwiLFxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBDb21wb3NhbnRTZWNyZXRhaXJlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhdGg6IFwicGF0aWVudC86bnVtZXJvXCIsXHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IENvbXBvc2FudE9ubHlQYXRpZW50XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhdGg6IFwiYWRkUGF0aWVudFwiLFxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBDb21wb3NhbnRBZGRQYXRpZW50XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhdGg6XCJlZGl0UGF0aWVudC86bnVtZXJvXCIsXHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IENvbXBvc2FudEVkaXRQYXRpZW50XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdKVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBSb3V0ZXJNb2R1bGVcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcFJvdXRpbmdNb2R1bGUge31cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==

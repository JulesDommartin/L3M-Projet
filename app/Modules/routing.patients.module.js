System.register(["@angular/core", "@angular/router", "../Components/ComposantPatient"], function(exports_1, context_1) {
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
    var core_1, router_1, ComposantPatient_1;
    var PatientsRoutingModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ComposantPatient_1_1) {
                ComposantPatient_1 = ComposantPatient_1_1;
            }],
        execute: function() {
            PatientsRoutingModule = class PatientsRoutingModule {
            };
            PatientsRoutingModule = __decorate([
                core_1.NgModule({
                    imports: [
                        router_1.RouterModule.forChild([
                            { path: "patient/:numero", component: ComposantPatient_1.ComposantPatient },
                        ])
                    ],
                    exports: [
                        router_1.RouterModule
                    ]
                }), 
                __metadata('design:paramtypes', [])
            ], PatientsRoutingModule);
            exports_1("PatientsRoutingModule", PatientsRoutingModule);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vZHVsZXMvcm91dGluZy5wYXRpZW50cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFnQkE7WUFBb0MsQ0FBQztZQVZyQztnQkFBQyxlQUFRLENBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLHFCQUFZLENBQUMsUUFBUSxDQUFDOzRCQUNsQixFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRyxTQUFTLEVBQUUsbUNBQWdCLEVBQUU7eUJBQzVELENBQUM7cUJBQ0w7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLHFCQUFZO3FCQUNmO2lCQUNKLENBQUM7O3FDQUFBO1lBQ0YseURBQXFDLENBQUEiLCJmaWxlIjoiTW9kdWxlcy9yb3V0aW5nLnBhdGllbnRzLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gICAgIGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7Q29tcG9zYW50UGF0aWVudH0gZnJvbSBcIi4uL0NvbXBvbmVudHMvQ29tcG9zYW50UGF0aWVudFwiO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoW1xuICAgICAgICAgICAgeyBwYXRoOiBcInBhdGllbnQvOm51bWVyb1wiLCAgY29tcG9uZW50OiBDb21wb3NhbnRQYXRpZW50IH0sXG4gICAgICAgIF0pXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFJvdXRlck1vZHVsZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgUGF0aWVudHNSb3V0aW5nTW9kdWxlIHt9XG4iXSwic291cmNlUm9vdCI6IiJ9

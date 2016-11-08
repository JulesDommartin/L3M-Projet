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
                            { path: "secretaire", component: ComposantSecretaire_1.ComposantSecretaire },
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vZHVsZXMvcm91dGluZy5zZWNyZXRhcnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBY0E7WUFBcUMsQ0FBQztZQVZ0QztnQkFBQyxlQUFRLENBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLHFCQUFZLENBQUMsUUFBUSxDQUFDOzRCQUNsQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUcsU0FBUyxFQUFFLHlDQUFtQixFQUFFO3lCQUMxRCxDQUFDO3FCQUNMO29CQUNELE9BQU8sRUFBRTt3QkFDTCxxQkFBWTtxQkFDZjtpQkFDSixDQUFDOztzQ0FBQTtZQUNGLDJEQUFzQyxDQUFBIiwiZmlsZSI6Ik1vZHVsZXMvcm91dGluZy5zZWNyZXRhcnkubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSAgICAgZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBDb21wb3NhbnRTZWNyZXRhaXJlIH0gZnJvbSBcIi4uL0NvbXBvbmVudHMvQ29tcG9zYW50U2VjcmV0YWlyZVwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoW1xyXG4gICAgICAgICAgICB7IHBhdGg6IFwic2VjcmV0YWlyZVwiLCAgY29tcG9uZW50OiBDb21wb3NhbnRTZWNyZXRhaXJlIH0sXHJcbiAgICAgICAgXSlcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgUm91dGVyTW9kdWxlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWNyZXRhcnlSb3V0aW5nTW9kdWxlIHt9XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=

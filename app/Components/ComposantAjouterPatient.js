System.register(["@angular/core", "@angular/router"], function(exports_1, context_1) {
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
    var core_1, router_1;
    var htmlTemplate, ComposantAjouterPatient;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            htmlTemplate = `
    <p>On test</p>
`;
            ComposantAjouterPatient = class ComposantAjouterPatient {
                constructor(router) {
                    this.router = router;
                }
            };
            ComposantAjouterPatient = __decorate([
                core_1.Component({
                    selector: "composant-ajouter-patient",
                    template: htmlTemplate
                }), 
                __metadata('design:paramtypes', [router_1.Router])
            ], ComposantAjouterPatient);
            exports_1("ComposantAjouterPatient", ComposantAjouterPatient);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50QWpvdXRlclBhdGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztRQUdNLFlBQVk7Ozs7Ozs7Ozs7WUFBWixZQUFZLEdBQUc7O0NBRXBCLENBQUM7WUFLRjtnQkFDSSxZQUFvQixNQUFlO29CQUFmLFdBQU0sR0FBTixNQUFNLENBQVM7Z0JBRW5DLENBQUM7WUFDTCxDQUFDO1lBUkQ7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDUCxRQUFRLEVBQUcsMkJBQTJCO29CQUN0QyxRQUFRLEVBQUcsWUFBWTtpQkFDMUIsQ0FBQzs7dUNBQUE7WUFDRiw2REFJQyxDQUFBIiwiZmlsZSI6IkNvbXBvbmVudHMvQ29tcG9zYW50QWpvdXRlclBhdGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cbmNvbnN0IGh0bWxUZW1wbGF0ZSA9IGBcbiAgICA8cD5PbiB0ZXN0PC9wPlxuYDtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yXHQ6IFwiY29tcG9zYW50LWFqb3V0ZXItcGF0aWVudFwiLFxuICAgIHRlbXBsYXRlXHQ6IGh0bWxUZW1wbGF0ZVxufSlcbmV4cG9ydCBjbGFzcyBDb21wb3NhbnRBam91dGVyUGF0aWVudCB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXIgOiBSb3V0ZXIpIHtcblxuICAgIH1cbn1cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9

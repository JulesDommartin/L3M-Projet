System.register(["@angular/core"], function(exports_1, context_1) {
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
    var core_1;
    var htmlTemplate, ComposantApp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            htmlTemplate = `
    <div>
        <h1 alx-dragdrop>IHM de la secrétaire</h1>
        <router-outlet></router-outlet>
    </div>
`;
            ComposantApp = class ComposantApp {
            };
            ComposantApp = __decorate([
                core_1.Component({
                    selector: "app-cabinet",
                    template: htmlTemplate
                }), 
                __metadata('design:paramtypes', [])
            ], ComposantApp);
            exports_1("ComposantApp", ComposantApp);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50QXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7UUFFTSxZQUFZOzs7Ozs7O1lBQVosWUFBWSxHQUFHOzs7OztDQUtwQixDQUFDO1lBS0Y7WUFDQSxDQUFDO1lBTEQ7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDUCxRQUFRLEVBQUcsYUFBYTtvQkFDeEIsUUFBUSxFQUFHLFlBQVk7aUJBQzFCLENBQUM7OzRCQUFBO1lBQ0YsdUNBQ0MsQ0FBQSIsImZpbGUiOiJDb21wb25lbnRzL0NvbXBvc2FudEFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuY29uc3QgaHRtbFRlbXBsYXRlID0gYFxyXG4gICAgPGRpdj5cclxuICAgICAgICA8aDEgYWx4LWRyYWdkcm9wPklITSBkZSBsYSBzZWNyw6l0YWlyZTwvaDE+XHJcbiAgICAgICAgPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxyXG4gICAgPC9kaXY+XHJcbmA7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3JcdDogXCJhcHAtY2FiaW5ldFwiLFxyXG4gICAgdGVtcGxhdGVcdDogaHRtbFRlbXBsYXRlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb21wb3NhbnRBcHAge1xyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9

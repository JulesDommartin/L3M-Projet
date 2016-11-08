System.register(["@Services/cabinetMedicalService", "@angular/core"], function(exports_1, context_1) {
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
    var NF, core_1;
    var htmlTemplate, ComposantPatient;
    return {
        setters:[
            function (NF_1) {
                NF = NF_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            htmlTemplate = `
    <div class="patient-non-affecte">
        <span><b>Nom : </b> {{patient.nom}}</span>
        <span><b>Prénom : </b>{{patient.prenom}}</span>
        <span><b>Numéro de sécu : </b>{{patient.numeroSecuriteSociale}}</span>
    </div>
`;
            ComposantPatient = class ComposantPatient {
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], ComposantPatient.prototype, "patient", void 0);
            ComposantPatient = __decorate([
                core_1.Component({
                    selector: "composant-patient",
                    template: htmlTemplate
                }), 
                __metadata('design:paramtypes', [])
            ], ComposantPatient);
            exports_1("ComposantPatient", ComposantPatient);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50UGF0aWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBR00sWUFBWTs7Ozs7Ozs7OztZQUFaLFlBQVksR0FBRzs7Ozs7O0NBTXBCLENBQUM7WUFLRjtZQUVBLENBQUM7WUFERztnQkFBQyxZQUFLLEVBQUU7OzZEQUFBO1lBTFo7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDUCxRQUFRLEVBQUcsbUJBQW1CO29CQUM5QixRQUFRLEVBQUcsWUFBWTtpQkFDMUIsQ0FBQzs7Z0NBQUE7WUFDRiwrQ0FFQyxDQUFBIiwiZmlsZSI6IkNvbXBvbmVudHMvQ29tcG9zYW50UGF0aWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE5GIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmNvbnN0IGh0bWxUZW1wbGF0ZSA9IGBcbiAgICA8ZGl2IGNsYXNzPVwicGF0aWVudC1ub24tYWZmZWN0ZVwiPlxuICAgICAgICA8c3Bhbj48Yj5Ob20gOiA8L2I+IHt7cGF0aWVudC5ub219fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4+PGI+UHLDqW5vbSA6IDwvYj57e3BhdGllbnQucHJlbm9tfX08L3NwYW4+XG4gICAgICAgIDxzcGFuPjxiPk51bcOpcm8gZGUgc8OpY3UgOiA8L2I+e3twYXRpZW50Lm51bWVyb1NlY3VyaXRlU29jaWFsZX19PC9zcGFuPlxuICAgIDwvZGl2PlxuYDtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yXHQ6IFwiY29tcG9zYW50LXBhdGllbnRcIixcbiAgICB0ZW1wbGF0ZVx0OiBodG1sVGVtcGxhdGVcbn0pXG5leHBvcnQgY2xhc3MgQ29tcG9zYW50UGF0aWVudCB7XG4gICAgQElucHV0KCkgcGF0aWVudCA6IE5GLlBhdGllbnRJbnRlcmZhY2U7XG59XG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==

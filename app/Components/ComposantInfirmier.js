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
    var htmlTemplate, ComposantInfirmier;
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
    <div class="infirmier">
        <div class="identite-infirmier">
            <span>Infirmier numéro : <i>{{infirmier.id}}</i></span>
            <h4>{{infirmier.nom}}</h4>
            <span>{{infirmier.prenom}}</span>
        </div>
        <img class="photo-infirmier" src="../data/{{infirmier.photo}}"/>
        <div class="patients-infirmier">
            <table *ngIf="infirmier.patients.length > 0" class="table-infirmier">
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Numéro de sécu</th>
                </tr>
                <tr class="patient-infirmier" *ngFor="let patient of infirmier.patients" [alx-draggable]="patient">
                    <td>{{patient.nom}}</td>
                    <td>{{patient.prenom}}</td>
                    <td>{{patient.numeroSecuriteSociale}}</td>
                </tr>
            </table>
        </div>
    </div>
`;
            ComposantInfirmier = class ComposantInfirmier {
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], ComposantInfirmier.prototype, "infirmier", void 0);
            ComposantInfirmier = __decorate([
                core_1.Component({
                    selector: "composant-infirmier",
                    template: htmlTemplate
                }), 
                __metadata('design:paramtypes', [])
            ], ComposantInfirmier);
            exports_1("ComposantInfirmier", ComposantInfirmier);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50SW5maXJtaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7UUFHTSxZQUFZOzs7Ozs7Ozs7O1lBQVosWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXVCcEIsQ0FBQztZQUtGO1lBRUEsQ0FBQztZQURHO2dCQUFDLFlBQUssRUFBRTs7aUVBQUE7WUFMWjtnQkFBQyxnQkFBUyxDQUFDO29CQUNQLFFBQVEsRUFBRyxxQkFBcUI7b0JBQ2hDLFFBQVEsRUFBRyxZQUFZO2lCQUMxQixDQUFDOztrQ0FBQTtZQUNGLG1EQUVDLENBQUEiLCJmaWxlIjoiQ29tcG9uZW50cy9Db21wb3NhbnRJbmZpcm1pZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBORiBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xuaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5jb25zdCBodG1sVGVtcGxhdGUgPSBgXG4gICAgPGRpdiBjbGFzcz1cImluZmlybWllclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWRlbnRpdGUtaW5maXJtaWVyXCI+XG4gICAgICAgICAgICA8c3Bhbj5JbmZpcm1pZXIgbnVtw6lybyA6IDxpPnt7aW5maXJtaWVyLmlkfX08L2k+PC9zcGFuPlxuICAgICAgICAgICAgPGg0Pnt7aW5maXJtaWVyLm5vbX19PC9oND5cbiAgICAgICAgICAgIDxzcGFuPnt7aW5maXJtaWVyLnByZW5vbX19PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGltZyBjbGFzcz1cInBob3RvLWluZmlybWllclwiIHNyYz1cIi4uL2RhdGEve3tpbmZpcm1pZXIucGhvdG99fVwiLz5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhdGllbnRzLWluZmlybWllclwiPlxuICAgICAgICAgICAgPHRhYmxlICpuZ0lmPVwiaW5maXJtaWVyLnBhdGllbnRzLmxlbmd0aCA+IDBcIiBjbGFzcz1cInRhYmxlLWluZmlybWllclwiPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPk5vbTwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5QcsOpbm9tPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPk51bcOpcm8gZGUgc8OpY3U8L3RoPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwicGF0aWVudC1pbmZpcm1pZXJcIiAqbmdGb3I9XCJsZXQgcGF0aWVudCBvZiBpbmZpcm1pZXIucGF0aWVudHNcIiBbYWx4LWRyYWdnYWJsZV09XCJwYXRpZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD57e3BhdGllbnQubm9tfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+e3twYXRpZW50LnByZW5vbX19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPnt7cGF0aWVudC5udW1lcm9TZWN1cml0ZVNvY2lhbGV9fTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuYDtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yXHQ6IFwiY29tcG9zYW50LWluZmlybWllclwiLFxuICAgIHRlbXBsYXRlXHQ6IGh0bWxUZW1wbGF0ZVxufSlcbmV4cG9ydCBjbGFzcyBDb21wb3NhbnRJbmZpcm1pZXIge1xuICAgIEBJbnB1dCgpIGluZmlybWllciA6IE5GLkluZmlybWllckludGVyZmFjZTtcbn1cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9

System.register(["@Services/cabinetMedicalService", "@angular/core", "@angular/router"], function(exports_1, context_1) {
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
    var NF, core_1, router_1;
    var htmlTemplate, ComposantInfirmier;
    return {
        setters:[
            function (NF_1) {
                NF = NF_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
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
                <tr class="patient-infirmier" 
                        (click)="onClick(patient)" 
                        *ngFor="let patient of infirmier.patients" 
                        [alx-draggable]="patient">
                    <td>{{patient.nom}}</td>
                    <td>{{patient.prenom}}</td>
                    <td>{{patient.numeroSecuriteSociale}}</td>
                </tr>
            </table>
        </div>
    </div>
`;
            ComposantInfirmier = class ComposantInfirmier {
                constructor(router) {
                    this.router = router;
                }
                onClick(patient) {
                    this.router.navigate(["/patient", patient.numeroSecuriteSociale]);
                }
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
                __metadata('design:paramtypes', [router_1.Router])
            ], ComposantInfirmier);
            exports_1("ComposantInfirmier", ComposantInfirmier);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50SW5maXJtaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7UUFLTSxZQUFZOzs7Ozs7Ozs7Ozs7O1lBQVosWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTBCcEIsQ0FBQztZQUtGO2dCQUdJLFlBQW9CLE1BQWU7b0JBQWYsV0FBTSxHQUFOLE1BQU0sQ0FBUztnQkFBRyxDQUFDO2dCQUV2QyxPQUFPLENBQUMsT0FBeUI7b0JBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RFLENBQUM7WUFFTCxDQUFDO1lBUkc7Z0JBQUMsWUFBSyxFQUFFOztpRUFBQTtZQUxaO2dCQUFDLGdCQUFTLENBQUM7b0JBQ1AsUUFBUSxFQUFHLHFCQUFxQjtvQkFDaEMsUUFBUSxFQUFHLFlBQVk7aUJBQzFCLENBQUM7O2tDQUFBO1lBQ0YsbURBU0MsQ0FBQSIsImZpbGUiOiJDb21wb25lbnRzL0NvbXBvc2FudEluZmlybWllci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE5GIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1BhdGllbnRJbnRlcmZhY2V9IGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5jb25zdCBodG1sVGVtcGxhdGUgPSBgXG4gICAgPGRpdiBjbGFzcz1cImluZmlybWllclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWRlbnRpdGUtaW5maXJtaWVyXCI+XG4gICAgICAgICAgICA8c3Bhbj5JbmZpcm1pZXIgbnVtw6lybyA6IDxpPnt7aW5maXJtaWVyLmlkfX08L2k+PC9zcGFuPlxuICAgICAgICAgICAgPGg0Pnt7aW5maXJtaWVyLm5vbX19PC9oND5cbiAgICAgICAgICAgIDxzcGFuPnt7aW5maXJtaWVyLnByZW5vbX19PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGltZyBjbGFzcz1cInBob3RvLWluZmlybWllclwiIHNyYz1cIi4uL2RhdGEve3tpbmZpcm1pZXIucGhvdG99fVwiLz5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhdGllbnRzLWluZmlybWllclwiPlxuICAgICAgICAgICAgPHRhYmxlICpuZ0lmPVwiaW5maXJtaWVyLnBhdGllbnRzLmxlbmd0aCA+IDBcIiBjbGFzcz1cInRhYmxlLWluZmlybWllclwiPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPk5vbTwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5QcsOpbm9tPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPk51bcOpcm8gZGUgc8OpY3U8L3RoPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwicGF0aWVudC1pbmZpcm1pZXJcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrKHBhdGllbnQpXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgcGF0aWVudCBvZiBpbmZpcm1pZXIucGF0aWVudHNcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIFthbHgtZHJhZ2dhYmxlXT1cInBhdGllbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRkPnt7cGF0aWVudC5ub219fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD57e3BhdGllbnQucHJlbm9tfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+e3twYXRpZW50Lm51bWVyb1NlY3VyaXRlU29jaWFsZX19PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5gO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3JcdDogXCJjb21wb3NhbnQtaW5maXJtaWVyXCIsXG4gICAgdGVtcGxhdGVcdDogaHRtbFRlbXBsYXRlXG59KVxuZXhwb3J0IGNsYXNzIENvbXBvc2FudEluZmlybWllciB7XG4gICAgQElucHV0KCkgaW5maXJtaWVyICA6IE5GLkluZmlybWllckludGVyZmFjZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyIDogUm91dGVyKSB7fVxuXG4gICAgb25DbGljayhwYXRpZW50OiBQYXRpZW50SW50ZXJmYWNlKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9wYXRpZW50XCIsIHBhdGllbnQubnVtZXJvU2VjdXJpdGVTb2NpYWxlXSk7XG4gICAgfVxuXG59XG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==

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
                    <th>Options</th>
                </tr>
                <tr class="patient-infirmier" 
                        (click)="onClick(patient)" 
                        *ngFor="let patient of infirmier.patients" 
                        [alx-draggable]="patient">
                    <td>{{patient.nom}}</td>
                    <td>{{patient.prenom}}</td>
                    <td>{{patient.numeroSecuriteSociale}}</td>
                    <td>
                        <span title="Voir les infos du patient" 
                                alt="Voir les infos du patient" 
                                (click)="viewPatient(patient.numeroSecuriteSociale)">
                            <fa [name]="'eye'"></fa>
                        </span>
                        <span title="Modifier les infos du patient" 
                                alt="Modifier les infos du patient" 
                                (click)="editPatient(patient.numeroSecuriteSociale)">
                            <fa [name]="'pencil'"></fa>
                        </span>
                    </td>
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
                viewPatient(numero) {
                    this.router.navigate(["/patient", numero]);
                }
                editPatient(numero) {
                    this.router.navigate(["/editPatient", numero]);
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], ComposantInfirmier.prototype, "infirmier", void 0);
            ComposantInfirmier = __decorate([
                core_1.Component({
                    selector: "composant-infirmier",
                    template: htmlTemplate,
                    styleUrls: ["node_modules/font-awesome/css/font-awesome.css"]
                }), 
                __metadata('design:paramtypes', [router_1.Router])
            ], ComposantInfirmier);
            exports_1("ComposantInfirmier", ComposantInfirmier);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50SW5maXJtaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7UUFLTSxZQUFZOzs7Ozs7Ozs7Ozs7O1lBQVosWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F1Q3BCLENBQUM7WUFNRjtnQkFHSSxZQUFvQixNQUFlO29CQUFmLFdBQU0sR0FBTixNQUFNLENBQVM7Z0JBQUcsQ0FBQztnQkFFdkMsT0FBTyxDQUFDLE9BQXlCO29CQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDO2dCQUVELFdBQVcsQ0FBQyxNQUFlO29CQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxDQUFDO2dCQUVELFdBQVcsQ0FBQyxNQUFlO29CQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxDQUFDO1lBRUwsQ0FBQztZQWhCRztnQkFBQyxZQUFLLEVBQUU7O2lFQUFBO1lBTlo7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDUCxRQUFRLEVBQUcscUJBQXFCO29CQUNoQyxRQUFRLEVBQUcsWUFBWTtvQkFDdkIsU0FBUyxFQUFLLENBQUMsZ0RBQWdELENBQUM7aUJBQ25FLENBQUM7O2tDQUFBO1lBQ0YsbURBaUJDLENBQUEiLCJmaWxlIjoiQ29tcG9uZW50cy9Db21wb3NhbnRJbmZpcm1pZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBORiBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xuaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtQYXRpZW50SW50ZXJmYWNlfSBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuY29uc3QgaHRtbFRlbXBsYXRlID0gYFxuICAgIDxkaXYgY2xhc3M9XCJpbmZpcm1pZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlkZW50aXRlLWluZmlybWllclwiPlxuICAgICAgICAgICAgPHNwYW4+SW5maXJtaWVyIG51bcOpcm8gOiA8aT57e2luZmlybWllci5pZH19PC9pPjwvc3Bhbj5cbiAgICAgICAgICAgIDxoND57e2luZmlybWllci5ub219fTwvaDQ+XG4gICAgICAgICAgICA8c3Bhbj57e2luZmlybWllci5wcmVub219fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxpbWcgY2xhc3M9XCJwaG90by1pbmZpcm1pZXJcIiBzcmM9XCIuLi9kYXRhL3t7aW5maXJtaWVyLnBob3RvfX1cIi8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYXRpZW50cy1pbmZpcm1pZXJcIj5cbiAgICAgICAgICAgIDx0YWJsZSAqbmdJZj1cImluZmlybWllci5wYXRpZW50cy5sZW5ndGggPiAwXCIgY2xhc3M9XCJ0YWJsZS1pbmZpcm1pZXJcIj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5Ob208L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+UHLDqW5vbTwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5OdW3DqXJvIGRlIHPDqWN1PC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPk9wdGlvbnM8L3RoPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwicGF0aWVudC1pbmZpcm1pZXJcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrKHBhdGllbnQpXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgcGF0aWVudCBvZiBpbmZpcm1pZXIucGF0aWVudHNcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIFthbHgtZHJhZ2dhYmxlXT1cInBhdGllbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRkPnt7cGF0aWVudC5ub219fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD57e3BhdGllbnQucHJlbm9tfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+e3twYXRpZW50Lm51bWVyb1NlY3VyaXRlU29jaWFsZX19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gdGl0bGU9XCJWb2lyIGxlcyBpbmZvcyBkdSBwYXRpZW50XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIlZvaXIgbGVzIGluZm9zIGR1IHBhdGllbnRcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInZpZXdQYXRpZW50KHBhdGllbnQubnVtZXJvU2VjdXJpdGVTb2NpYWxlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmYSBbbmFtZV09XCInZXllJ1wiPjwvZmE+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiB0aXRsZT1cIk1vZGlmaWVyIGxlcyBpbmZvcyBkdSBwYXRpZW50XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIk1vZGlmaWVyIGxlcyBpbmZvcyBkdSBwYXRpZW50XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJlZGl0UGF0aWVudChwYXRpZW50Lm51bWVyb1NlY3VyaXRlU29jaWFsZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmEgW25hbWVdPVwiJ3BlbmNpbCdcIj48L2ZhPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbmA7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3Rvclx0OiBcImNvbXBvc2FudC1pbmZpcm1pZXJcIixcbiAgICB0ZW1wbGF0ZVx0OiBodG1sVGVtcGxhdGUsXG4gICAgc3R5bGVVcmxzICAgOiBbXCJub2RlX21vZHVsZXMvZm9udC1hd2Vzb21lL2Nzcy9mb250LWF3ZXNvbWUuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIENvbXBvc2FudEluZmlybWllciB7XG4gICAgQElucHV0KCkgaW5maXJtaWVyICA6IE5GLkluZmlybWllckludGVyZmFjZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyIDogUm91dGVyKSB7fVxuXG4gICAgb25DbGljayhwYXRpZW50OiBQYXRpZW50SW50ZXJmYWNlKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9wYXRpZW50XCIsIHBhdGllbnQubnVtZXJvU2VjdXJpdGVTb2NpYWxlXSk7XG4gICAgfVxuXG4gICAgdmlld1BhdGllbnQobnVtZXJvIDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9wYXRpZW50XCIsIG51bWVyb10pO1xuICAgIH1cblxuICAgIGVkaXRQYXRpZW50KG51bWVybyA6IHN0cmluZykge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvZWRpdFBhdGllbnRcIixudW1lcm9dKTtcbiAgICB9XG5cbn1cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9

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
    var htmlTemplate, ComposantSecretaire;
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
    <p *ngIf="!initDone">CHARGEMENT...</p>
    <section *ngIf="initDone && !addPatient" class="cabinet">
        <h2>Mon beau cabinet médical</h2>
        <br/><br/>
        <input class="ajouter-patient" type="button" name="ajouter-patient" value=" + Ajouter un patient" (click)="ajouterPatient()"/>
        
        <h2>Les infirmiers : </h2>
        <div *ngFor="let infirmier of cabinet.infirmiers"
                                alx-dropzone
                                [alx-accept-fct]="acceptPatient"
                                alx-dragstart-css="drag-start-infirmier"
                                alx-draghover-css="drag-hover-infirmier"
                                (alx-ondrop)="affecterPatient($event, infirmier)">
            <composant-infirmier [infirmier]="infirmier" [cabinet]="cabinet"></composant-infirmier>
        </div>
        
        
        <h2>Les patients non affectés : </h2>
        
        <div *ngFor="let patient of cabinet.patientsNonAffectes">
            <composant-patient [patient]="patient" [alx-draggable]="patient"></composant-patient>
        </div>
        
    </section>
`;
            ComposantSecretaire = class ComposantSecretaire {
                constructor(cms, router) {
                    this.cms = cms;
                    this.router = router;
                    this.initDone = false;
                    this.addPatient = false;
                    this.adresse = {};
                    this.this = this;
                    this.acceptPatient = (data) => {
                        if (data.nom && data.prenom && data.numeroSecuriteSociale) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                }
                ngOnInit() {
                    //console.log("Appelez le service pour formatter et obtenir les données du cabinet\n", this);
                    this.cms.getData("/data/cabinetInfirmier.xml").then((cabinet) => {
                        console.log("\t=> cabinetJS:", cabinet);
                        this.cabinet = cabinet;
                        this.initDone = true;
                    }, (err) => { console.error("Erreur lors du chargement du cabinet", "/data/cabinetInfirmier.xml", "\n", err); });
                }
                affecterPatient(patient, infirmier) {
                    this.cms.affecterPatient(patient.numeroSecuriteSociale, infirmier.id);
                    this.desaffecterPatient(patient, this.cabinet.infirmiers);
                    infirmier.patients.push(patient);
                }
                desaffecterPatient(patient, infirmiers) {
                    for (let inf of infirmiers) {
                        if (inf.patients.indexOf(patient) !== -1) {
                            inf.patients.splice(inf.patients.indexOf(patient), 1);
                        }
                    }
                    if (this.cabinet.patientsNonAffectes.indexOf(patient) !== -1)
                        this.cabinet.patientsNonAffectes.splice(this.cabinet.patientsNonAffectes.indexOf(patient), 1);
                }
                ajouterPatient() {
                    this.router.navigate(["/addPatient"]);
                }
            };
            ComposantSecretaire = __decorate([
                core_1.Component({
                    template: htmlTemplate
                }), 
                __metadata('design:paramtypes', [NF.ServiceCabinetMedical, router_1.Router])
            ], ComposantSecretaire);
            exports_1("ComposantSecretaire", ComposantSecretaire);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50U2VjcmV0YWlyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBTU0sWUFBWTs7Ozs7Ozs7Ozs7OztZQUFaLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXlCcEIsQ0FBQztZQUlGO2dCQU1JLFlBQXFCLEdBQTZCLEVBQVUsTUFBZTtvQkFBdEQsUUFBRyxHQUFILEdBQUcsQ0FBMEI7b0JBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUztvQkFMM0UsYUFBUSxHQUFnRCxLQUFLLENBQUM7b0JBRXZELGVBQVUsR0FBdUMsS0FBSyxDQUFDO29CQUN2RCxZQUFPLEdBQXNDLEVBQUUsQ0FBQztvQkFDdkQsU0FBSSxHQUFHLElBQUksQ0FBQztvQkFZTCxrQkFBYSxHQUFHLENBQUMsSUFBSTt3QkFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7NEJBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ2hCLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQzt3QkFDakIsQ0FBQztvQkFDTCxDQUFDLENBQUM7Z0JBaEJGLENBQUM7Z0JBQ0QsUUFBUTtvQkFDSiw2RkFBNkY7b0JBQzdGLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFFLDRCQUE0QixDQUFFLENBQUMsSUFBSSxDQUFFLENBQUMsT0FBNEI7d0JBQ2hGLE9BQU8sQ0FBQyxHQUFHLENBQUUsaUJBQWlCLEVBQUUsT0FBTyxDQUFFLENBQUM7d0JBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO3dCQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztvQkFDekIsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0NBQXNDLEVBQUUsNEJBQTRCLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ILENBQUM7Z0JBVU0sZUFBZSxDQUFDLE9BQXlCLEVBQUUsU0FBNkI7b0JBQzNFLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3RFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDMUQsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7Z0JBRU0sa0JBQWtCLENBQUMsT0FBTyxFQUFFLFVBQWdDO29CQUMvRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3hDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUMxRCxDQUFDO29CQUNMLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ3pELElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN0RyxDQUFDO2dCQUVNLGNBQWM7b0JBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztZQUdMLENBQUM7WUFqREQ7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDUCxRQUFRLEVBQUcsWUFBWTtpQkFDMUIsQ0FBQztvREFPK0IscUJBQXFCO21DQVBwRDtZQUNGLHFEQThDQyxDQUFBIiwiZmlsZSI6IkNvbXBvbmVudHMvQ29tcG9zYW50U2VjcmV0YWlyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE5GIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtJbmZpcm1pZXJJbnRlcmZhY2V9IGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge1BhdGllbnRJbnRlcmZhY2V9IGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5jb25zdCBodG1sVGVtcGxhdGUgPSBgXG4gICAgPHAgKm5nSWY9XCIhaW5pdERvbmVcIj5DSEFSR0VNRU5ULi4uPC9wPlxuICAgIDxzZWN0aW9uICpuZ0lmPVwiaW5pdERvbmUgJiYgIWFkZFBhdGllbnRcIiBjbGFzcz1cImNhYmluZXRcIj5cbiAgICAgICAgPGgyPk1vbiBiZWF1IGNhYmluZXQgbcOpZGljYWw8L2gyPlxuICAgICAgICA8YnIvPjxici8+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImFqb3V0ZXItcGF0aWVudFwiIHR5cGU9XCJidXR0b25cIiBuYW1lPVwiYWpvdXRlci1wYXRpZW50XCIgdmFsdWU9XCIgKyBBam91dGVyIHVuIHBhdGllbnRcIiAoY2xpY2spPVwiYWpvdXRlclBhdGllbnQoKVwiLz5cbiAgICAgICAgXG4gICAgICAgIDxoMj5MZXMgaW5maXJtaWVycyA6IDwvaDI+XG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGluZmlybWllciBvZiBjYWJpbmV0LmluZmlybWllcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHgtZHJvcHpvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2FseC1hY2NlcHQtZmN0XT1cImFjY2VwdFBhdGllbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHgtZHJhZ3N0YXJ0LWNzcz1cImRyYWctc3RhcnQtaW5maXJtaWVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx4LWRyYWdob3Zlci1jc3M9XCJkcmFnLWhvdmVyLWluZmlybWllclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhbHgtb25kcm9wKT1cImFmZmVjdGVyUGF0aWVudCgkZXZlbnQsIGluZmlybWllcilcIj5cbiAgICAgICAgICAgIDxjb21wb3NhbnQtaW5maXJtaWVyIFtpbmZpcm1pZXJdPVwiaW5maXJtaWVyXCIgW2NhYmluZXRdPVwiY2FiaW5ldFwiPjwvY29tcG9zYW50LWluZmlybWllcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgPGgyPkxlcyBwYXRpZW50cyBub24gYWZmZWN0w6lzIDogPC9oMj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHBhdGllbnQgb2YgY2FiaW5ldC5wYXRpZW50c05vbkFmZmVjdGVzXCI+XG4gICAgICAgICAgICA8Y29tcG9zYW50LXBhdGllbnQgW3BhdGllbnRdPVwicGF0aWVudFwiIFthbHgtZHJhZ2dhYmxlXT1cInBhdGllbnRcIj48L2NvbXBvc2FudC1wYXRpZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgPC9zZWN0aW9uPlxuYDtcbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlXHQ6IGh0bWxUZW1wbGF0ZVxufSlcbmV4cG9ydCBjbGFzcyBDb21wb3NhbnRTZWNyZXRhaXJlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBpbml0RG9uZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBjYWJpbmV0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBORi5DYWJpbmV0SW50ZXJmYWNlO1xuICAgIHB1YmxpYyBhZGRQYXRpZW50ICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGFkcmVzc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFueSA9IHt9O1xuICAgIHRoaXMgPSB0aGlzO1xuICAgIGNvbnN0cnVjdG9yXHRcdChwdWJsaWMgY21zOiBORi5TZXJ2aWNlQ2FiaW5ldE1lZGljYWwsIHByaXZhdGUgcm91dGVyIDogUm91dGVyKSB7IC8vIENlIGNvbXBvc2FudCBkw6lwZW5kIGR1IHNlcnZpY2UgZGUgY2FiaW5ldCBtw6lkaWNhbFxuICAgIH1cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkFwcGVsZXogbGUgc2VydmljZSBwb3VyIGZvcm1hdHRlciBldCBvYnRlbmlyIGxlcyBkb25uw6llcyBkdSBjYWJpbmV0XFxuXCIsIHRoaXMpO1xuICAgICAgICB0aGlzLmNtcy5nZXREYXRhKCBcIi9kYXRhL2NhYmluZXRJbmZpcm1pZXIueG1sXCIgKS50aGVuKCAoY2FiaW5ldDogTkYuQ2FiaW5ldEludGVyZmFjZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coIFwiXFx0PT4gY2FiaW5ldEpTOlwiLCBjYWJpbmV0ICk7XG4gICAgICAgICAgICB0aGlzLmNhYmluZXQgPSBjYWJpbmV0O1xuICAgICAgICAgICAgdGhpcy5pbml0RG9uZSA9IHRydWU7XG4gICAgICAgIH0sIChlcnIpID0+IHtjb25zb2xlLmVycm9yKFwiRXJyZXVyIGxvcnMgZHUgY2hhcmdlbWVudCBkdSBjYWJpbmV0XCIsIFwiL2RhdGEvY2FiaW5ldEluZmlybWllci54bWxcIiwgXCJcXG5cIiwgZXJyKTt9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWNjZXB0UGF0aWVudCA9IChkYXRhKSA9PiB7XG4gICAgICAgIGlmIChkYXRhLm5vbSAmJiBkYXRhLnByZW5vbSAmJiBkYXRhLm51bWVyb1NlY3VyaXRlU29jaWFsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHVibGljIGFmZmVjdGVyUGF0aWVudChwYXRpZW50OiBQYXRpZW50SW50ZXJmYWNlLCBpbmZpcm1pZXI6IEluZmlybWllckludGVyZmFjZSkge1xuICAgICAgICB0aGlzLmNtcy5hZmZlY3RlclBhdGllbnQocGF0aWVudC5udW1lcm9TZWN1cml0ZVNvY2lhbGUsIGluZmlybWllci5pZCk7XG4gICAgICAgIHRoaXMuZGVzYWZmZWN0ZXJQYXRpZW50KHBhdGllbnQsIHRoaXMuY2FiaW5ldC5pbmZpcm1pZXJzKTtcbiAgICAgICAgaW5maXJtaWVyLnBhdGllbnRzLnB1c2gocGF0aWVudCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlc2FmZmVjdGVyUGF0aWVudChwYXRpZW50LCBpbmZpcm1pZXJzOiBJbmZpcm1pZXJJbnRlcmZhY2VbXSkge1xuICAgICAgICBmb3IgKGxldCBpbmYgb2YgaW5maXJtaWVycykge1xuICAgICAgICAgICAgaWYgKGluZi5wYXRpZW50cy5pbmRleE9mKHBhdGllbnQpICE9PSAtIDEpIHtcbiAgICAgICAgICAgICAgICBpbmYucGF0aWVudHMuc3BsaWNlKGluZi5wYXRpZW50cy5pbmRleE9mKHBhdGllbnQpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jYWJpbmV0LnBhdGllbnRzTm9uQWZmZWN0ZXMuaW5kZXhPZihwYXRpZW50KSAhPT0gLTEpXG4gICAgICAgICAgICB0aGlzLmNhYmluZXQucGF0aWVudHNOb25BZmZlY3Rlcy5zcGxpY2UodGhpcy5jYWJpbmV0LnBhdGllbnRzTm9uQWZmZWN0ZXMuaW5kZXhPZihwYXRpZW50KSwgMSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFqb3V0ZXJQYXRpZW50KCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvYWRkUGF0aWVudFwiXSk7XG4gICAgfVxuXG5cbn1cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9

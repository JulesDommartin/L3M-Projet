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
            <composant-infirmier [infirmier]="infirmier"></composant-infirmier>
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50U2VjcmV0YWlyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBTU0sWUFBWTs7Ozs7Ozs7Ozs7OztZQUFaLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXlCcEIsQ0FBQztZQUlGO2dCQU1JLFlBQXFCLEdBQTZCLEVBQVUsTUFBZTtvQkFBdEQsUUFBRyxHQUFILEdBQUcsQ0FBMEI7b0JBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUztvQkFMM0UsYUFBUSxHQUFnRCxLQUFLLENBQUM7b0JBRXZELGVBQVUsR0FBdUMsS0FBSyxDQUFDO29CQUN2RCxZQUFPLEdBQXNDLEVBQUUsQ0FBQztvQkFDdkQsU0FBSSxHQUFHLElBQUksQ0FBQztvQkFZTCxrQkFBYSxHQUFHLENBQUMsSUFBSTt3QkFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7NEJBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ2hCLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQzt3QkFDakIsQ0FBQztvQkFDTCxDQUFDLENBQUM7Z0JBaEJGLENBQUM7Z0JBQ0QsUUFBUTtvQkFDSiw2RkFBNkY7b0JBQzdGLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFFLDRCQUE0QixDQUFFLENBQUMsSUFBSSxDQUFFLENBQUMsT0FBNEI7d0JBQ2hGLE9BQU8sQ0FBQyxHQUFHLENBQUUsaUJBQWlCLEVBQUUsT0FBTyxDQUFFLENBQUM7d0JBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO3dCQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztvQkFDekIsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0NBQXNDLEVBQUUsNEJBQTRCLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ILENBQUM7Z0JBVU0sZUFBZSxDQUFDLE9BQXlCLEVBQUUsU0FBNkI7b0JBQzNFLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3RFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDMUQsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7Z0JBRU0sa0JBQWtCLENBQUMsT0FBTyxFQUFFLFVBQWdDO29CQUMvRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3hDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUMxRCxDQUFDO29CQUNMLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ3pELElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN0RyxDQUFDO2dCQUVNLGNBQWM7b0JBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztZQUdMLENBQUM7WUFqREQ7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDUCxRQUFRLEVBQUcsWUFBWTtpQkFDMUIsQ0FBQztvREFPK0IscUJBQXFCO21DQVBwRDtZQUNGLHFEQThDQyxDQUFBIiwiZmlsZSI6IkNvbXBvbmVudHMvQ29tcG9zYW50U2VjcmV0YWlyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE5GIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XHJcbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7SW5maXJtaWVySW50ZXJmYWNlfSBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xyXG5pbXBvcnQge1BhdGllbnRJbnRlcmZhY2V9IGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XHJcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5jb25zdCBodG1sVGVtcGxhdGUgPSBgXHJcbiAgICA8cCAqbmdJZj1cIiFpbml0RG9uZVwiPkNIQVJHRU1FTlQuLi48L3A+XHJcbiAgICA8c2VjdGlvbiAqbmdJZj1cImluaXREb25lICYmICFhZGRQYXRpZW50XCIgY2xhc3M9XCJjYWJpbmV0XCI+XHJcbiAgICAgICAgPGgyPk1vbiBiZWF1IGNhYmluZXQgbcOpZGljYWw8L2gyPlxyXG4gICAgICAgIDxici8+PGJyLz5cclxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJham91dGVyLXBhdGllbnRcIiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cImFqb3V0ZXItcGF0aWVudFwiIHZhbHVlPVwiICsgQWpvdXRlciB1biBwYXRpZW50XCIgKGNsaWNrKT1cImFqb3V0ZXJQYXRpZW50KClcIi8+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPGgyPkxlcyBpbmZpcm1pZXJzIDogPC9oMj5cclxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBpbmZpcm1pZXIgb2YgY2FiaW5ldC5pbmZpcm1pZXJzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHgtZHJvcHpvbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYWx4LWFjY2VwdC1mY3RdPVwiYWNjZXB0UGF0aWVudFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx4LWRyYWdzdGFydC1jc3M9XCJkcmFnLXN0YXJ0LWluZmlybWllclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx4LWRyYWdob3Zlci1jc3M9XCJkcmFnLWhvdmVyLWluZmlybWllclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFseC1vbmRyb3ApPVwiYWZmZWN0ZXJQYXRpZW50KCRldmVudCwgaW5maXJtaWVyKVwiPlxyXG4gICAgICAgICAgICA8Y29tcG9zYW50LWluZmlybWllciBbaW5maXJtaWVyXT1cImluZmlybWllclwiPjwvY29tcG9zYW50LWluZmlybWllcj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICA8aDI+TGVzIHBhdGllbnRzIG5vbiBhZmZlY3TDqXMgOiA8L2gyPlxyXG4gICAgICAgIFxyXG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHBhdGllbnQgb2YgY2FiaW5ldC5wYXRpZW50c05vbkFmZmVjdGVzXCI+XHJcbiAgICAgICAgICAgIDxjb21wb3NhbnQtcGF0aWVudCBbcGF0aWVudF09XCJwYXRpZW50XCIgW2FseC1kcmFnZ2FibGVdPVwicGF0aWVudFwiPjwvY29tcG9zYW50LXBhdGllbnQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgXHJcbiAgICA8L3NlY3Rpb24+XHJcbmA7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgdGVtcGxhdGVcdDogaHRtbFRlbXBsYXRlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb21wb3NhbnRTZWNyZXRhaXJlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGluaXREb25lICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgY2FiaW5ldCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogTkYuQ2FiaW5ldEludGVyZmFjZTtcclxuICAgIHB1YmxpYyBhZGRQYXRpZW50ICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgYWRyZXNzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYW55ID0ge307XHJcbiAgICB0aGlzID0gdGhpcztcclxuICAgIGNvbnN0cnVjdG9yXHRcdChwdWJsaWMgY21zOiBORi5TZXJ2aWNlQ2FiaW5ldE1lZGljYWwsIHByaXZhdGUgcm91dGVyIDogUm91dGVyKSB7IC8vIENlIGNvbXBvc2FudCBkw6lwZW5kIGR1IHNlcnZpY2UgZGUgY2FiaW5ldCBtw6lkaWNhbFxyXG4gICAgfVxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkFwcGVsZXogbGUgc2VydmljZSBwb3VyIGZvcm1hdHRlciBldCBvYnRlbmlyIGxlcyBkb25uw6llcyBkdSBjYWJpbmV0XFxuXCIsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY21zLmdldERhdGEoIFwiL2RhdGEvY2FiaW5ldEluZmlybWllci54bWxcIiApLnRoZW4oIChjYWJpbmV0OiBORi5DYWJpbmV0SW50ZXJmYWNlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcIlxcdD0+IGNhYmluZXRKUzpcIiwgY2FiaW5ldCApO1xyXG4gICAgICAgICAgICB0aGlzLmNhYmluZXQgPSBjYWJpbmV0O1xyXG4gICAgICAgICAgICB0aGlzLmluaXREb25lID0gdHJ1ZTtcclxuICAgICAgICB9LCAoZXJyKSA9PiB7Y29uc29sZS5lcnJvcihcIkVycmV1ciBsb3JzIGR1IGNoYXJnZW1lbnQgZHUgY2FiaW5ldFwiLCBcIi9kYXRhL2NhYmluZXRJbmZpcm1pZXIueG1sXCIsIFwiXFxuXCIsIGVycik7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFjY2VwdFBhdGllbnQgPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhLm5vbSAmJiBkYXRhLnByZW5vbSAmJiBkYXRhLm51bWVyb1NlY3VyaXRlU29jaWFsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgYWZmZWN0ZXJQYXRpZW50KHBhdGllbnQ6IFBhdGllbnRJbnRlcmZhY2UsIGluZmlybWllcjogSW5maXJtaWVySW50ZXJmYWNlKSB7XHJcbiAgICAgICAgdGhpcy5jbXMuYWZmZWN0ZXJQYXRpZW50KHBhdGllbnQubnVtZXJvU2VjdXJpdGVTb2NpYWxlLCBpbmZpcm1pZXIuaWQpO1xyXG4gICAgICAgIHRoaXMuZGVzYWZmZWN0ZXJQYXRpZW50KHBhdGllbnQsIHRoaXMuY2FiaW5ldC5pbmZpcm1pZXJzKTtcclxuICAgICAgICBpbmZpcm1pZXIucGF0aWVudHMucHVzaChwYXRpZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVzYWZmZWN0ZXJQYXRpZW50KHBhdGllbnQsIGluZmlybWllcnM6IEluZmlybWllckludGVyZmFjZVtdKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5mIG9mIGluZmlybWllcnMpIHtcclxuICAgICAgICAgICAgaWYgKGluZi5wYXRpZW50cy5pbmRleE9mKHBhdGllbnQpICE9PSAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGluZi5wYXRpZW50cy5zcGxpY2UoaW5mLnBhdGllbnRzLmluZGV4T2YocGF0aWVudCksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNhYmluZXQucGF0aWVudHNOb25BZmZlY3Rlcy5pbmRleE9mKHBhdGllbnQpICE9PSAtMSlcclxuICAgICAgICAgICAgdGhpcy5jYWJpbmV0LnBhdGllbnRzTm9uQWZmZWN0ZXMuc3BsaWNlKHRoaXMuY2FiaW5ldC5wYXRpZW50c05vbkFmZmVjdGVzLmluZGV4T2YocGF0aWVudCksIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBham91dGVyUGF0aWVudCgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvYWRkUGF0aWVudFwiXSk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=

System.register(["@angular/core", "@Services/cabinetMedicalService", "@angular/forms", "@angular/router", "./Abstract.ComposantPatient", "angular2-google-maps/core"], function(exports_1, context_1) {
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
    var core_1, NF, forms_1, router_1, Abstract_ComposantPatient_1, core_2;
    var ComposantEditPatient;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (NF_1) {
                NF = NF_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Abstract_ComposantPatient_1_1) {
                Abstract_ComposantPatient_1 = Abstract_ComposantPatient_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            ComposantEditPatient = class ComposantEditPatient extends Abstract_ComposantPatient_1.AbstractComposantPatient {
                constructor(cms, router, fb, route, __loader) {
                    super(cms, router, fb);
                    this.cms = cms;
                    this.route = route;
                    this.__loader = __loader;
                    this.title = "Modifier un patient";
                }
                ngOnInit() {
                    this.route.params.forEach((params) => {
                        this.numero = params["numero"];
                        console.log(params);
                    });
                    this.cms.getPatientById(this.numero).then((res) => {
                        this.patient = res;
                        console.log(res);
                        this.__loader.load().then(() => {
                            this.geocoder = new google.maps.Geocoder();
                            this.infoWindow = new google.maps.InfoWindow();
                            this.map = new google.maps.Map(document.querySelector(".map"), {
                                zoom: 12
                            });
                            let patientAdresse = this.patient.adresse.ville + " "
                                + this.patient.adresse.numero + " "
                                + this.patient.adresse.rue + " "
                                + this.patient.adresse.codePostal;
                            console.log(patientAdresse);
                            this.geocoder.geocode({ "address": patientAdresse }, (results, status) => {
                                if (status === google.maps.GeocoderStatus.OK) {
                                    this.marker = new google.maps.Marker({
                                        position: results[0].geometry.location,
                                        map: this.map
                                    });
                                    this.map.setCenter(results[0].geometry.location);
                                    this.infoWindow.setContent(results[0].formatted_address);
                                    this.infoWindow.open(this.map, this.marker);
                                    this.setAdresse(this.patient.adresse);
                                }
                                else {
                                    console.log("Error - ", results, " & Status - ", status);
                                }
                            });
                        });
                        this.loadPatientInfos();
                    });
                }
                loadPatientInfos() {
                    this.editPatientForm.controls["patientName"].setValue(this.patient.nom);
                    this.editPatientForm.controls["patientForname"].setValue(this.patient.prenom);
                    this.editPatientForm.controls["patientNumber"].setValue(this.patient.numeroSecuriteSociale);
                    this.editPatientForm.controls["patientSex"].setValue(this.patient.sexe);
                }
                submitPatient(event, f) {
                    event.preventDefault();
                    console.log(f);
                    if (f.valid) {
                        /*this.cms.AjouterPatient(f).then((dataPatient) => {
                            //Ajouter le patient dans le cabinet
                            let patient: PatientInterface = {
                                nom:                    dataPatient.patientName         || "",
                                prenom:                 dataPatient.patientForname      || "",
                                numeroSecuriteSociale:  dataPatient.patientNumber       || "",
                                sexe:                   dataPatient.patientSex          || sexeEnum.M,
                                adresse: {
                                    ville:              dataPatient.patientCity         || "",
                                    codePostal:         dataPatient.patientPostalCode   || null,
                                    rue:                dataPatient.patientStreet       || "",
                                    numero:             dataPatient.patientStreetNumber || null,
                                    etage:              dataPatient.patientFloor        || ""
                                }
                            };
                            this.router.navigate(["/secretaire"]);
                            console.log(patient);
                        });*/
                        this.router.navigate(["/secretaire"]);
                        console.log("On modifiera le patient lorsque l'on aura ajouté la fonction au serveur");
                    }
                    else {
                        console.log("Error");
                    }
                }
            };
            ComposantEditPatient = __decorate([
                core_1.Component({
                    templateUrl: "ts/Views/edit.patient.html",
                    styleUrls: ["node_modules/font-awesome/css/font-awesome.css"]
                }), 
                __metadata('design:paramtypes', [NF.ServiceCabinetMedical, router_1.Router, forms_1.FormBuilder, router_1.ActivatedRoute, core_2.MapsAPILoader])
            ], ComposantEditPatient);
            exports_1("ComposantEditPatient", ComposantEditPatient);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50RWRpdFBhdGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFhQSwwREFBMEMsb0RBQXdCO2dCQVE5RCxZQUFtQixHQUF1QyxFQUM5QyxNQUE0QixFQUM1QixFQUFpQyxFQUN6QixLQUE0QixFQUM1QixRQUEyQjtvQkFDM0MsTUFBTSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUxSLFFBQUcsR0FBSCxHQUFHLENBQW9DO29CQUd0QyxVQUFLLEdBQUwsS0FBSyxDQUF1QjtvQkFDNUIsYUFBUSxHQUFSLFFBQVEsQ0FBbUI7b0JBRTNDLElBQUksQ0FBQyxLQUFLLEdBQUcscUJBQXFCLENBQUM7Z0JBQ3ZDLENBQUM7Z0JBRUQsUUFBUTtvQkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFjO3dCQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDeEIsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUc7d0JBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO3dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQzs0QkFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQzdDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFD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O29CQUNmLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUNWOzs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFpQks7d0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO3dCQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLHlFQUF5RSxDQUFDLENBQUM7b0JBQzNGLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDekIsQ0FBQztnQkFDTCxDQUFDO1lBRUwsQ0FBQztZQS9GRDtnQkFBQyxnQkFBUyxDQUFDO29CQUNQLFdBQVcsRUFBRyw0QkFBNEI7b0JBQzFDLFNBQVMsRUFBSyxDQUFDLGdEQUFnRCxDQUFDO2lCQUNuRSxDQUFDO29EQVN1QyxxQkFBcUI7b0NBVDVEO1lBQ0YsdURBMkZDLENBQUEiLCJmaWxlIjoiQ29tcG9uZW50cy9Db21wb3NhbnRFZGl0UGF0aWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9ICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgTkYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge05nRm9ybSwgRm9ybUJ1aWxkZXJ9ICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge3NleGVFbnVtfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIkBTZXJ2aWNlcy9jYWJpbmV0TWVkaWNhbFNlcnZpY2VcIjtcbmltcG9ydCB7Um91dGVyLCBQYXJhbXMsIEFjdGl2YXRlZFJvdXRlfSAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge1BhdGllbnRJbnRlcmZhY2V9ICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIkBTZXJ2aWNlcy9jYWJpbmV0TWVkaWNhbFNlcnZpY2VcIjtcbmltcG9ydCB7QWJzdHJhY3RDb21wb3NhbnRQYXRpZW50fSAgICAgICAgICAgICAgICAgICBmcm9tIFwiLi9BYnN0cmFjdC5Db21wb3NhbnRQYXRpZW50XCI7XG5pbXBvcnQge01hcHNBUElMb2FkZXJ9IGZyb20gXCJhbmd1bGFyMi1nb29nbGUtbWFwcy9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsXHQ6IFwidHMvVmlld3MvZWRpdC5wYXRpZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHMgICA6IFtcIm5vZGVfbW9kdWxlcy9mb250LWF3ZXNvbWUvY3NzL2ZvbnQtYXdlc29tZS5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQ29tcG9zYW50RWRpdFBhdGllbnQgZXh0ZW5kcyBBYnN0cmFjdENvbXBvc2FudFBhdGllbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHRpdGxlICAgICAgIDogc3RyaW5nO1xuICAgIHBhdGllbnQgICAgIDogUGF0aWVudEludGVyZmFjZTtcbiAgICBudW1lcm8gICAgICA6IHN0cmluZztcbiAgICBnZW9jb2RlciAgICA6IGdvb2dsZS5tYXBzLkdlb2NvZGVyO1xuICAgIG1hcCAgICAgICAgIDogZ29vZ2xlLm1hcHMuTWFwO1xuICAgIG1hcmtlciAgICAgIDogZ29vZ2xlLm1hcHMuTWFya2VyO1xuICAgIGluZm9XaW5kb3cgIDogZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdztcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY21zICAgICAgICAgIDogTkYuU2VydmljZUNhYmluZXRNZWRpY2FsLFxuICAgICAgICAgICAgICAgIHJvdXRlciAgICAgICAgICAgICAgOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgZmIgICAgICAgICAgICAgICAgICA6IEZvcm1CdWlsZGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGUgICAgICAgOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9fbG9hZGVyICAgIDogTWFwc0FQSUxvYWRlcikge1xuICAgICAgICBzdXBlcihjbXMsIHJvdXRlciwgZmIpO1xuICAgICAgICB0aGlzLnRpdGxlID0gXCJNb2RpZmllciB1biBwYXRpZW50XCI7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zLmZvckVhY2goKHBhcmFtczogUGFyYW1zKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm51bWVybyA9IHBhcmFtc1tcIm51bWVyb1wiXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNtcy5nZXRQYXRpZW50QnlJZCh0aGlzLm51bWVybykudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhdGllbnQgPSByZXM7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgdGhpcy5fX2xvYWRlci5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW9jb2RlciAgID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcCAgICAgICAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFwXCIpLCB7XG4gICAgICAgICAgICAgICAgICAgIHpvb206IDEyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbGV0IHBhdGllbnRBZHJlc3NlIDogc3RyaW5nID0gdGhpcy5wYXRpZW50LmFkcmVzc2UudmlsbGUgKyBcIiBcIlxuICAgICAgICAgICAgICAgICAgICArIHRoaXMucGF0aWVudC5hZHJlc3NlLm51bWVybyArIFwiIFwiXG4gICAgICAgICAgICAgICAgICAgICsgdGhpcy5wYXRpZW50LmFkcmVzc2UucnVlICsgXCIgXCJcbiAgICAgICAgICAgICAgICAgICAgKyB0aGlzLnBhdGllbnQuYWRyZXNzZS5jb2RlUG9zdGFsO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhdGllbnRBZHJlc3NlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdlb2NvZGVyLmdlb2NvZGUoIHsgXCJhZGRyZXNzXCI6IHBhdGllbnRBZHJlc3NlfSwgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiAgICA6IHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwICAgICAgICAgOiB0aGlzLm1hcFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcC5zZXRDZW50ZXIocmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cuc2V0Q29udGVudChyZXN1bHRzWzBdLmZvcm1hdHRlZF9hZGRyZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5vcGVuKHRoaXMubWFwLCB0aGlzLm1hcmtlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFkcmVzc2UodGhpcy5wYXRpZW50LmFkcmVzc2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFwiLCByZXN1bHRzLCBcIiAmIFN0YXR1cyAtIFwiLCBzdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubG9hZFBhdGllbnRJbmZvcygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkUGF0aWVudEluZm9zKCkge1xuICAgICAgICB0aGlzLmVkaXRQYXRpZW50Rm9ybS5jb250cm9sc1tcInBhdGllbnROYW1lXCJdICAgIC5zZXRWYWx1ZSh0aGlzLnBhdGllbnQubm9tKTtcbiAgICAgICAgdGhpcy5lZGl0UGF0aWVudEZvcm0uY29udHJvbHNbXCJwYXRpZW50Rm9ybmFtZVwiXSAuc2V0VmFsdWUodGhpcy5wYXRpZW50LnByZW5vbSk7XG4gICAgICAgIHRoaXMuZWRpdFBhdGllbnRGb3JtLmNvbnRyb2xzW1wicGF0aWVudE51bWJlclwiXSAgLnNldFZhbHVlKHRoaXMucGF0aWVudC5udW1lcm9TZWN1cml0ZVNvY2lhbGUpO1xuICAgICAgICB0aGlzLmVkaXRQYXRpZW50Rm9ybS5jb250cm9sc1tcInBhdGllbnRTZXhcIl0gICAgIC5zZXRWYWx1ZSh0aGlzLnBhdGllbnQuc2V4ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN1Ym1pdFBhdGllbnQoZXZlbnQ6IEV2ZW50LCBmOiBOZ0Zvcm0pIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc29sZS5sb2coZik7XG4gICAgICAgIGlmIChmLnZhbGlkKSB7XG4gICAgICAgICAgICAvKnRoaXMuY21zLkFqb3V0ZXJQYXRpZW50KGYpLnRoZW4oKGRhdGFQYXRpZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgLy9Bam91dGVyIGxlIHBhdGllbnQgZGFucyBsZSBjYWJpbmV0XG4gICAgICAgICAgICAgICAgbGV0IHBhdGllbnQ6IFBhdGllbnRJbnRlcmZhY2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5vbTogICAgICAgICAgICAgICAgICAgIGRhdGFQYXRpZW50LnBhdGllbnROYW1lICAgICAgICAgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgcHJlbm9tOiAgICAgICAgICAgICAgICAgZGF0YVBhdGllbnQucGF0aWVudEZvcm5hbWUgICAgICB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBudW1lcm9TZWN1cml0ZVNvY2lhbGU6ICBkYXRhUGF0aWVudC5wYXRpZW50TnVtYmVyICAgICAgIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHNleGU6ICAgICAgICAgICAgICAgICAgIGRhdGFQYXRpZW50LnBhdGllbnRTZXggICAgICAgICAgfHwgc2V4ZUVudW0uTSxcbiAgICAgICAgICAgICAgICAgICAgYWRyZXNzZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlsbGU6ICAgICAgICAgICAgICBkYXRhUGF0aWVudC5wYXRpZW50Q2l0eSAgICAgICAgIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlUG9zdGFsOiAgICAgICAgIGRhdGFQYXRpZW50LnBhdGllbnRQb3N0YWxDb2RlICAgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1ZTogICAgICAgICAgICAgICAgZGF0YVBhdGllbnQucGF0aWVudFN0cmVldCAgICAgICB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtZXJvOiAgICAgICAgICAgICBkYXRhUGF0aWVudC5wYXRpZW50U3RyZWV0TnVtYmVyIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBldGFnZTogICAgICAgICAgICAgIGRhdGFQYXRpZW50LnBhdGllbnRGbG9vciAgICAgICAgfHwgXCJcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvc2VjcmV0YWlyZVwiXSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGF0aWVudCk7XG4gICAgICAgICAgICB9KTsqL1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3NlY3JldGFpcmVcIl0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPbiBtb2RpZmllcmEgbGUgcGF0aWVudCBsb3JzcXVlIGwnb24gYXVyYSBham91dMOpIGxhIGZvbmN0aW9uIGF1IHNlcnZldXJcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==

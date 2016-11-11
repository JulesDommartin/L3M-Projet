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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50RWRpdFBhdGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFhQSwwREFBMEMsb0RBQXdCO2dCQVE5RCxZQUFtQixHQUF1QyxFQUM5QyxNQUE0QixFQUM1QixFQUFpQyxFQUN6QixLQUE0QixFQUM1QixRQUEyQjtvQkFDM0MsTUFBTSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUxSLFFBQUcsR0FBSCxHQUFHLENBQW9DO29CQUd0QyxVQUFLLEdBQUwsS0FBSyxDQUF1QjtvQkFDNUIsYUFBUSxHQUFSLFFBQVEsQ0FBbUI7b0JBRTNDLElBQUksQ0FBQyxLQUFLLEdBQUcscUJBQXFCLENBQUM7Z0JBQ3ZDLENBQUM7Z0JBRUQsUUFBUTtvQkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFjO3dCQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDeEIsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUc7d0JBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO3dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQzs0QkFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQzdDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFD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O29CQUNmLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUNWOzs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFpQks7d0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO3dCQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLHlFQUF5RSxDQUFDLENBQUM7b0JBQzNGLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDekIsQ0FBQztnQkFDTCxDQUFDO1lBRUwsQ0FBQztZQS9GRDtnQkFBQyxnQkFBUyxDQUFDO29CQUNQLFdBQVcsRUFBRyw0QkFBNEI7b0JBQzFDLFNBQVMsRUFBSyxDQUFDLGdEQUFnRCxDQUFDO2lCQUNuRSxDQUFDO29EQVN1QyxxQkFBcUI7b0NBVDVEO1lBQ0YsdURBMkZDLENBQUEiLCJmaWxlIjoiQ29tcG9uZW50cy9Db21wb3NhbnRFZGl0UGF0aWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9ICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgKiBhcyBORiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIkBTZXJ2aWNlcy9jYWJpbmV0TWVkaWNhbFNlcnZpY2VcIjtcclxuaW1wb3J0IHtOZ0Zvcm0sIEZvcm1CdWlsZGVyfSAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQge3NleGVFbnVtfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIkBTZXJ2aWNlcy9jYWJpbmV0TWVkaWNhbFNlcnZpY2VcIjtcclxuaW1wb3J0IHtSb3V0ZXIsIFBhcmFtcywgQWN0aXZhdGVkUm91dGV9ICAgICAgICAgICAgIGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtQYXRpZW50SW50ZXJmYWNlfSAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XHJcbmltcG9ydCB7QWJzdHJhY3RDb21wb3NhbnRQYXRpZW50fSAgICAgICAgICAgICAgICAgICBmcm9tIFwiLi9BYnN0cmFjdC5Db21wb3NhbnRQYXRpZW50XCI7XHJcbmltcG9ydCB7TWFwc0FQSUxvYWRlcn0gZnJvbSBcImFuZ3VsYXIyLWdvb2dsZS1tYXBzL2NvcmVcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgdGVtcGxhdGVVcmxcdDogXCJ0cy9WaWV3cy9lZGl0LnBhdGllbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzICAgOiBbXCJub2RlX21vZHVsZXMvZm9udC1hd2Vzb21lL2Nzcy9mb250LWF3ZXNvbWUuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb21wb3NhbnRFZGl0UGF0aWVudCBleHRlbmRzIEFic3RyYWN0Q29tcG9zYW50UGF0aWVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICB0aXRsZSAgICAgICA6IHN0cmluZztcclxuICAgIHBhdGllbnQgICAgIDogUGF0aWVudEludGVyZmFjZTtcclxuICAgIG51bWVybyAgICAgIDogc3RyaW5nO1xyXG4gICAgZ2VvY29kZXIgICAgOiBnb29nbGUubWFwcy5HZW9jb2RlcjtcclxuICAgIG1hcCAgICAgICAgIDogZ29vZ2xlLm1hcHMuTWFwO1xyXG4gICAgbWFya2VyICAgICAgOiBnb29nbGUubWFwcy5NYXJrZXI7XHJcbiAgICBpbmZvV2luZG93ICA6IGdvb2dsZS5tYXBzLkluZm9XaW5kb3c7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY21zICAgICAgICAgIDogTkYuU2VydmljZUNhYmluZXRNZWRpY2FsLFxyXG4gICAgICAgICAgICAgICAgcm91dGVyICAgICAgICAgICAgICA6IFJvdXRlcixcclxuICAgICAgICAgICAgICAgIGZiICAgICAgICAgICAgICAgICAgOiBGb3JtQnVpbGRlcixcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGUgICAgICAgOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgX19sb2FkZXIgICAgOiBNYXBzQVBJTG9hZGVyKSB7XHJcbiAgICAgICAgc3VwZXIoY21zLCByb3V0ZXIsIGZiKTtcclxuICAgICAgICB0aGlzLnRpdGxlID0gXCJNb2RpZmllciB1biBwYXRpZW50XCI7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXJhbXMuZm9yRWFjaCgocGFyYW1zOiBQYXJhbXMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5udW1lcm8gPSBwYXJhbXNbXCJudW1lcm9cIl07XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jbXMuZ2V0UGF0aWVudEJ5SWQodGhpcy5udW1lcm8pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnQgPSByZXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX19sb2FkZXIubG9hZCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW9jb2RlciAgID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXAgICAgICAgID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hcFwiKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHpvb206IDEyXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGxldCBwYXRpZW50QWRyZXNzZSA6IHN0cmluZyA9IHRoaXMucGF0aWVudC5hZHJlc3NlLnZpbGxlICsgXCIgXCJcclxuICAgICAgICAgICAgICAgICAgICArIHRoaXMucGF0aWVudC5hZHJlc3NlLm51bWVybyArIFwiIFwiXHJcbiAgICAgICAgICAgICAgICAgICAgKyB0aGlzLnBhdGllbnQuYWRyZXNzZS5ydWUgKyBcIiBcIlxyXG4gICAgICAgICAgICAgICAgICAgICsgdGhpcy5wYXRpZW50LmFkcmVzc2UuY29kZVBvc3RhbDtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhdGllbnRBZHJlc3NlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIuZ2VvY29kZSggeyBcImFkZHJlc3NcIjogcGF0aWVudEFkcmVzc2V9LCAocmVzdWx0cywgc3RhdHVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gZ29vZ2xlLm1hcHMuR2VvY29kZXJTdGF0dXMuT0spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uICAgIDogcmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcCAgICAgICAgIDogdGhpcy5tYXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwLnNldENlbnRlcihyZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93LnNldENvbnRlbnQocmVzdWx0c1swXS5mb3JtYXR0ZWRfYWRkcmVzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5vcGVuKHRoaXMubWFwLCB0aGlzLm1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWRyZXNzZSh0aGlzLnBhdGllbnQuYWRyZXNzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFwiLCByZXN1bHRzLCBcIiAmIFN0YXR1cyAtIFwiLCBzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUGF0aWVudEluZm9zKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZFBhdGllbnRJbmZvcygpIHtcclxuICAgICAgICB0aGlzLmVkaXRQYXRpZW50Rm9ybS5jb250cm9sc1tcInBhdGllbnROYW1lXCJdICAgIC5zZXRWYWx1ZSh0aGlzLnBhdGllbnQubm9tKTtcclxuICAgICAgICB0aGlzLmVkaXRQYXRpZW50Rm9ybS5jb250cm9sc1tcInBhdGllbnRGb3JuYW1lXCJdIC5zZXRWYWx1ZSh0aGlzLnBhdGllbnQucHJlbm9tKTtcclxuICAgICAgICB0aGlzLmVkaXRQYXRpZW50Rm9ybS5jb250cm9sc1tcInBhdGllbnROdW1iZXJcIl0gIC5zZXRWYWx1ZSh0aGlzLnBhdGllbnQubnVtZXJvU2VjdXJpdGVTb2NpYWxlKTtcclxuICAgICAgICB0aGlzLmVkaXRQYXRpZW50Rm9ybS5jb250cm9sc1tcInBhdGllbnRTZXhcIl0gICAgIC5zZXRWYWx1ZSh0aGlzLnBhdGllbnQuc2V4ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN1Ym1pdFBhdGllbnQoZXZlbnQ6IEV2ZW50LCBmOiBOZ0Zvcm0pIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGYpO1xyXG4gICAgICAgIGlmIChmLnZhbGlkKSB7XHJcbiAgICAgICAgICAgIC8qdGhpcy5jbXMuQWpvdXRlclBhdGllbnQoZikudGhlbigoZGF0YVBhdGllbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vQWpvdXRlciBsZSBwYXRpZW50IGRhbnMgbGUgY2FiaW5ldFxyXG4gICAgICAgICAgICAgICAgbGV0IHBhdGllbnQ6IFBhdGllbnRJbnRlcmZhY2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9tOiAgICAgICAgICAgICAgICAgICAgZGF0YVBhdGllbnQucGF0aWVudE5hbWUgICAgICAgICB8fCBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZW5vbTogICAgICAgICAgICAgICAgIGRhdGFQYXRpZW50LnBhdGllbnRGb3JuYW1lICAgICAgfHwgXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBudW1lcm9TZWN1cml0ZVNvY2lhbGU6ICBkYXRhUGF0aWVudC5wYXRpZW50TnVtYmVyICAgICAgIHx8IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V4ZTogICAgICAgICAgICAgICAgICAgZGF0YVBhdGllbnQucGF0aWVudFNleCAgICAgICAgICB8fCBzZXhlRW51bS5NLFxyXG4gICAgICAgICAgICAgICAgICAgIGFkcmVzc2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlsbGU6ICAgICAgICAgICAgICBkYXRhUGF0aWVudC5wYXRpZW50Q2l0eSAgICAgICAgIHx8IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVQb3N0YWw6ICAgICAgICAgZGF0YVBhdGllbnQucGF0aWVudFBvc3RhbENvZGUgICB8fCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydWU6ICAgICAgICAgICAgICAgIGRhdGFQYXRpZW50LnBhdGllbnRTdHJlZXQgICAgICAgfHwgXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtZXJvOiAgICAgICAgICAgICBkYXRhUGF0aWVudC5wYXRpZW50U3RyZWV0TnVtYmVyIHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV0YWdlOiAgICAgICAgICAgICAgZGF0YVBhdGllbnQucGF0aWVudEZsb29yICAgICAgICB8fCBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9zZWNyZXRhaXJlXCJdKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhdGllbnQpO1xyXG4gICAgICAgICAgICB9KTsqL1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvc2VjcmV0YWlyZVwiXSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT24gbW9kaWZpZXJhIGxlIHBhdGllbnQgbG9yc3F1ZSBsJ29uIGF1cmEgYWpvdXTDqSBsYSBmb25jdGlvbiBhdSBzZXJ2ZXVyXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=

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
    var core_1, NF, forms_1, cabinetMedicalService_1, router_1, Abstract_ComposantPatient_1, core_2;
    var ComposantEditPatient;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (NF_1) {
                NF = NF_1;
                cabinetMedicalService_1 = NF_1;
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
                    });
                    this.cms.getPatientById(this.numero).then((res) => {
                        this.patient = res;
                        console.log(res);
                        /*this.__loader.load().then(() => {
                            this.geocoder   = new google.maps.Geocoder();
                            this.infoWindow = new google.maps.InfoWindow();
                            this.map        = new google.maps.Map(document.querySelector(".map"), {
                                zoom: 12
                            });
                            let patientAdresse : string = this.patient.adresse.ville + " "
                                + this.patient.adresse.numero + " "
                                + this.patient.adresse.rue + " "
                                + this.patient.adresse.codePostal;
                            console.log(patientAdresse);
                            this.geocoder.geocode( { "address": patientAdresse}, (results, status) => {
                                if (status === google.maps.GeocoderStatus.OK) {
                                    this.marker = new google.maps.Marker({
                                        position    : results[0].geometry.location,
                                        map         : this.map
                                    });
                                    this.map.setCenter(results[0].geometry.location);
                                    this.infoWindow.setContent(results[0].formatted_address);
                                    this.infoWindow.open(this.map, this.marker);
                                    this.setAdresse(this.patient.adresse);
                                } else {
                                    console.log("Error - ", results, " & Status - ", status);
                                }
                            });
                        });*/
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
                        this.cms.AjouterPatient(f).then((dataPatient) => {
                            //Ajouter le patient dans le cabinet
                            let patient = {
                                nom: dataPatient.patientName || "",
                                prenom: dataPatient.patientForname || "",
                                numeroSecuriteSociale: dataPatient.patientNumber || "",
                                sexe: dataPatient.patientSex || cabinetMedicalService_1.sexeEnum.M,
                                adresse: {
                                    ville: dataPatient.patientCity || "",
                                    codePostal: dataPatient.patientPostalCode || null,
                                    rue: dataPatient.patientStreet || "",
                                    numero: dataPatient.patientStreetNumber || null,
                                    etage: dataPatient.patientFloor || "",
                                    latlng: undefined,
                                }
                            };
                            let infId = null;
                            this.cms.cabinet.infirmiers.forEach((inf) => {
                                if (inf.patients.filter((val) => {
                                    return val.numeroSecuriteSociale === patient.numeroSecuriteSociale;
                                }).length === 1) {
                                    infId = inf.id;
                                }
                            });
                            if (infId) {
                                this.cms.affecterPatient(this.patient.numeroSecuriteSociale, infId)
                                    .then(() => {
                                    console.log(this.cms.cabinet.infirmiers.filter((inf) => {
                                        return inf.id === infId;
                                    }));
                                    this.cms.cabinet.infirmiers.filter((inf) => {
                                        return inf.id === infId;
                                    })[0].patients.push(patient);
                                    this.router.navigate(["/secretaire"]);
                                    console.log("Patient modifié");
                                })
                                    .catch((err) => {
                                    console.log("Erreur : " + err);
                                });
                            }
                        });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50RWRpdFBhdGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBYUEsMERBQTBDLG9EQUF3QjtnQkFLOUQsWUFBbUIsR0FBdUMsRUFDOUMsTUFBNEIsRUFDNUIsRUFBaUMsRUFDekIsS0FBNEIsRUFDNUIsUUFBMkI7b0JBQzNDLE1BQU0sR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFMUixRQUFHLEdBQUgsR0FBRyxDQUFvQztvQkFHdEMsVUFBSyxHQUFMLEtBQUssQ0FBdUI7b0JBQzVCLGFBQVEsR0FBUixRQUFRLENBQW1CO29CQUUzQyxJQUFJLENBQUMsS0FBSyxHQUFHLHFCQUFxQixDQUFDO2dCQUN2QyxDQUFDO2dCQUVELFFBQVE7b0JBQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBYzt3QkFDckMsSUFBSSxDQUFDLE1BQU0sR0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3ZDLENBQUMsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHO3dCQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQzt3QkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBeUJLO3dCQUNMLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUM1QixDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUVELGdCQUFnQjtvQkFDWixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FB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QUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQ0FDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO29DQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0NBQ25DLENBQUMsQ0FBQztxQ0FDRCxLQUFLLENBQUUsQ0FBQyxHQUFHO29DQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dDQUNuQyxDQUFDLENBQUMsQ0FBQzs0QkFDUCxDQUFDO3dCQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDekIsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQWxIRDtnQkFBQyxnQkFBUyxDQUFDO29CQUNQLFdBQVcsRUFBRyw0QkFBNEI7b0JBQzFDLFNBQVMsRUFBSyxDQUFDLGdEQUFnRCxDQUFDO2lCQUNuRSxDQUFDO29EQU11QyxxQkFBcUI7b0NBTjVEO1lBQ0YsdURBOEdDLENBQUEiLCJmaWxlIjoiQ29tcG9uZW50cy9Db21wb3NhbnRFZGl0UGF0aWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9ICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgTkYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge05nRm9ybSwgRm9ybUJ1aWxkZXJ9ICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge3NleGVFbnVtfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIkBTZXJ2aWNlcy9jYWJpbmV0TWVkaWNhbFNlcnZpY2VcIjtcbmltcG9ydCB7Um91dGVyLCBQYXJhbXMsIEFjdGl2YXRlZFJvdXRlfSAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge1BhdGllbnRJbnRlcmZhY2V9ICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIkBTZXJ2aWNlcy9jYWJpbmV0TWVkaWNhbFNlcnZpY2VcIjtcbmltcG9ydCB7QWJzdHJhY3RDb21wb3NhbnRQYXRpZW50fSAgICAgICAgICAgICAgICAgICBmcm9tIFwiLi9BYnN0cmFjdC5Db21wb3NhbnRQYXRpZW50XCI7XG5pbXBvcnQge01hcHNBUElMb2FkZXJ9IGZyb20gXCJhbmd1bGFyMi1nb29nbGUtbWFwcy9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsXHQ6IFwidHMvVmlld3MvZWRpdC5wYXRpZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHMgICA6IFtcIm5vZGVfbW9kdWxlcy9mb250LWF3ZXNvbWUvY3NzL2ZvbnQtYXdlc29tZS5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQ29tcG9zYW50RWRpdFBhdGllbnQgZXh0ZW5kcyBBYnN0cmFjdENvbXBvc2FudFBhdGllbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHRpdGxlICAgICAgIDogc3RyaW5nO1xuICAgIHBhdGllbnQgICAgIDogUGF0aWVudEludGVyZmFjZTtcbiAgICBudW1lcm8gICAgICA6IHN0cmluZztcbiAgICBjYWJpbmV0ICAgICA6IE5GLkNhYmluZXRJbnRlcmZhY2U7XG4gICAgY29uc3RydWN0b3IocHVibGljIGNtcyAgICAgICAgICA6IE5GLlNlcnZpY2VDYWJpbmV0TWVkaWNhbCxcbiAgICAgICAgICAgICAgICByb3V0ZXIgICAgICAgICAgICAgIDogUm91dGVyLFxuICAgICAgICAgICAgICAgIGZiICAgICAgICAgICAgICAgICAgOiBGb3JtQnVpbGRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlICAgICAgIDogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfX2xvYWRlciAgICA6IE1hcHNBUElMb2FkZXIpIHtcbiAgICAgICAgc3VwZXIoY21zLCByb3V0ZXIsIGZiKTtcbiAgICAgICAgdGhpcy50aXRsZSA9IFwiTW9kaWZpZXIgdW4gcGF0aWVudFwiO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnJvdXRlLnBhcmFtcy5mb3JFYWNoKChwYXJhbXM6IFBhcmFtcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5udW1lcm8gICAgID0gcGFyYW1zW1wibnVtZXJvXCJdO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jbXMuZ2V0UGF0aWVudEJ5SWQodGhpcy5udW1lcm8pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYXRpZW50ID0gcmVzO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgIC8qdGhpcy5fX2xvYWRlci5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW9jb2RlciAgID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcCAgICAgICAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFwXCIpLCB7XG4gICAgICAgICAgICAgICAgICAgIHpvb206IDEyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbGV0IHBhdGllbnRBZHJlc3NlIDogc3RyaW5nID0gdGhpcy5wYXRpZW50LmFkcmVzc2UudmlsbGUgKyBcIiBcIlxuICAgICAgICAgICAgICAgICAgICArIHRoaXMucGF0aWVudC5hZHJlc3NlLm51bWVybyArIFwiIFwiXG4gICAgICAgICAgICAgICAgICAgICsgdGhpcy5wYXRpZW50LmFkcmVzc2UucnVlICsgXCIgXCJcbiAgICAgICAgICAgICAgICAgICAgKyB0aGlzLnBhdGllbnQuYWRyZXNzZS5jb2RlUG9zdGFsO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhdGllbnRBZHJlc3NlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdlb2NvZGVyLmdlb2NvZGUoIHsgXCJhZGRyZXNzXCI6IHBhdGllbnRBZHJlc3NlfSwgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiAgICA6IHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwICAgICAgICAgOiB0aGlzLm1hcFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcC5zZXRDZW50ZXIocmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cuc2V0Q29udGVudChyZXN1bHRzWzBdLmZvcm1hdHRlZF9hZGRyZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5vcGVuKHRoaXMubWFwLCB0aGlzLm1hcmtlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFkcmVzc2UodGhpcy5wYXRpZW50LmFkcmVzc2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFwiLCByZXN1bHRzLCBcIiAmIFN0YXR1cyAtIFwiLCBzdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTsqL1xuICAgICAgICAgICAgdGhpcy5sb2FkUGF0aWVudEluZm9zKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvYWRQYXRpZW50SW5mb3MoKSB7XG4gICAgICAgIHRoaXMuZWRpdFBhdGllbnRGb3JtLmNvbnRyb2xzW1wicGF0aWVudE5hbWVcIl0gICAgLnNldFZhbHVlKHRoaXMucGF0aWVudC5ub20pO1xuICAgICAgICB0aGlzLmVkaXRQYXRpZW50Rm9ybS5jb250cm9sc1tcInBhdGllbnRGb3JuYW1lXCJdIC5zZXRWYWx1ZSh0aGlzLnBhdGllbnQucHJlbm9tKTtcbiAgICAgICAgdGhpcy5lZGl0UGF0aWVudEZvcm0uY29udHJvbHNbXCJwYXRpZW50TnVtYmVyXCJdICAuc2V0VmFsdWUodGhpcy5wYXRpZW50Lm51bWVyb1NlY3VyaXRlU29jaWFsZSk7XG4gICAgICAgIHRoaXMuZWRpdFBhdGllbnRGb3JtLmNvbnRyb2xzW1wicGF0aWVudFNleFwiXSAgICAgLnNldFZhbHVlKHRoaXMucGF0aWVudC5zZXhlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3VibWl0UGF0aWVudChldmVudDogRXZlbnQsIGY6IE5nRm9ybSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhmKTtcbiAgICAgICAgaWYgKGYudmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMuY21zLkFqb3V0ZXJQYXRpZW50KGYpLnRoZW4oKGRhdGFQYXRpZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgLy9Bam91dGVyIGxlIHBhdGllbnQgZGFucyBsZSBjYWJpbmV0XG4gICAgICAgICAgICAgICAgbGV0IHBhdGllbnQ6IFBhdGllbnRJbnRlcmZhY2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5vbTogICAgICAgICAgICAgICAgICAgIGRhdGFQYXRpZW50LnBhdGllbnROYW1lICAgICAgICAgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgcHJlbm9tOiAgICAgICAgICAgICAgICAgZGF0YVBhdGllbnQucGF0aWVudEZvcm5hbWUgICAgICB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBudW1lcm9TZWN1cml0ZVNvY2lhbGU6ICBkYXRhUGF0aWVudC5wYXRpZW50TnVtYmVyICAgICAgIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHNleGU6ICAgICAgICAgICAgICAgICAgIGRhdGFQYXRpZW50LnBhdGllbnRTZXggICAgICAgICAgfHwgc2V4ZUVudW0uTSxcbiAgICAgICAgICAgICAgICAgICAgYWRyZXNzZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlsbGU6ICAgICAgICAgICAgICBkYXRhUGF0aWVudC5wYXRpZW50Q2l0eSAgICAgICAgIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlUG9zdGFsOiAgICAgICAgIGRhdGFQYXRpZW50LnBhdGllbnRQb3N0YWxDb2RlICAgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1ZTogICAgICAgICAgICAgICAgZGF0YVBhdGllbnQucGF0aWVudFN0cmVldCAgICAgICB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtZXJvOiAgICAgICAgICAgICBkYXRhUGF0aWVudC5wYXRpZW50U3RyZWV0TnVtYmVyIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBldGFnZTogICAgICAgICAgICAgIGRhdGFQYXRpZW50LnBhdGllbnRGbG9vciAgICAgICAgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdGxuZzogICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBsZXQgaW5mSWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuY21zLmNhYmluZXQuaW5maXJtaWVycy5mb3JFYWNoKChpbmYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZi5wYXRpZW50cy5maWx0ZXIoKHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5udW1lcm9TZWN1cml0ZVNvY2lhbGUgPT09IHBhdGllbnQubnVtZXJvU2VjdXJpdGVTb2NpYWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZJZCA9IGluZi5pZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChpbmZJZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNtcy5hZmZlY3RlclBhdGllbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdGllbnQubnVtZXJvU2VjdXJpdGVTb2NpYWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mSWRcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jbXMuY2FiaW5ldC5pbmZpcm1pZXJzLmZpbHRlciggKGluZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmYuaWQgPT09IGluZklkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbXMuY2FiaW5ldC5pbmZpcm1pZXJzLmZpbHRlciggKGluZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmYuaWQgPT09IGluZklkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlbMF0ucGF0aWVudHMucHVzaChwYXRpZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9zZWNyZXRhaXJlXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGF0aWVudCBtb2RpZmnDqVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycmV1ciA6IFwiICsgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=

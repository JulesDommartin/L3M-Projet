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
                                    etage: dataPatient.patientFloor || ""
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50RWRpdFBhdGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBYUEsMERBQTBDLG9EQUF3QjtnQkFLOUQsWUFBbUIsR0FBdUMsRUFDOUMsTUFBNEIsRUFDNUIsRUFBaUMsRUFDekIsS0FBNEIsRUFDNUIsUUFBMkI7b0JBQzNDLE1BQU0sR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFMUixRQUFHLEdBQUgsR0FBRyxDQUFvQztvQkFHdEMsVUFBSyxHQUFMLEtBQUssQ0FBdUI7b0JBQzVCLGFBQVEsR0FBUixRQUFRLENBQW1CO29CQUUzQyxJQUFJLENBQUMsS0FBSyxHQUFHLHFCQUFxQixDQUFDO2dCQUN2QyxDQUFDO2dCQUVELFFBQVE7b0JBQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBYzt3QkFDckMsSUFBSSxDQUFDLE1BQU0sR0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3ZDLENBQUMsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHO3dCQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQzt3QkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBeUJLO3dCQUNMLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUM1QixDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUVELGdCQUFnQjtvQkFDWixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FB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LENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29DQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7b0NBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQ0FDbkMsQ0FBQyxDQUFDO3FDQUNELEtBQUssQ0FBRSxDQUFDLEdBQUc7b0NBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0NBQ25DLENBQUMsQ0FBQyxDQUFDOzRCQUNQLENBQUM7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN6QixDQUFDO2dCQUNMLENBQUM7WUFFTCxDQUFDO1lBbEhEO2dCQUFDLGdCQUFTLENBQUM7b0JBQ1AsV0FBVyxFQUFHLDRCQUE0QjtvQkFDMUMsU0FBUyxFQUFLLENBQUMsZ0RBQWdELENBQUM7aUJBQ25FLENBQUM7b0RBTXVDLHFCQUFxQjtvQ0FONUQ7WUFDRix1REE4R0MsQ0FBQSIsImZpbGUiOiJDb21wb25lbnRzL0NvbXBvc2FudEVkaXRQYXRpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBORiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIkBTZXJ2aWNlcy9jYWJpbmV0TWVkaWNhbFNlcnZpY2VcIjtcbmltcG9ydCB7TmdGb3JtLCBGb3JtQnVpbGRlcn0gICAgICAgICAgICAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7c2V4ZUVudW19ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xuaW1wb3J0IHtSb3V0ZXIsIFBhcmFtcywgQWN0aXZhdGVkUm91dGV9ICAgICAgICAgICAgIGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7UGF0aWVudEludGVyZmFjZX0gICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xuaW1wb3J0IHtBYnN0cmFjdENvbXBvc2FudFBhdGllbnR9ICAgICAgICAgICAgICAgICAgIGZyb20gXCIuL0Fic3RyYWN0LkNvbXBvc2FudFBhdGllbnRcIjtcbmltcG9ydCB7TWFwc0FQSUxvYWRlcn0gZnJvbSBcImFuZ3VsYXIyLWdvb2dsZS1tYXBzL2NvcmVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmxcdDogXCJ0cy9WaWV3cy9lZGl0LnBhdGllbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJscyAgIDogW1wibm9kZV9tb2R1bGVzL2ZvbnQtYXdlc29tZS9jc3MvZm9udC1hd2Vzb21lLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBDb21wb3NhbnRFZGl0UGF0aWVudCBleHRlbmRzIEFic3RyYWN0Q29tcG9zYW50UGF0aWVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgdGl0bGUgICAgICAgOiBzdHJpbmc7XG4gICAgcGF0aWVudCAgICAgOiBQYXRpZW50SW50ZXJmYWNlO1xuICAgIG51bWVybyAgICAgIDogc3RyaW5nO1xuICAgIGNhYmluZXQgICAgIDogTkYuQ2FiaW5ldEludGVyZmFjZTtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY21zICAgICAgICAgIDogTkYuU2VydmljZUNhYmluZXRNZWRpY2FsLFxuICAgICAgICAgICAgICAgIHJvdXRlciAgICAgICAgICAgICAgOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgZmIgICAgICAgICAgICAgICAgICA6IEZvcm1CdWlsZGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGUgICAgICAgOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9fbG9hZGVyICAgIDogTWFwc0FQSUxvYWRlcikge1xuICAgICAgICBzdXBlcihjbXMsIHJvdXRlciwgZmIpO1xuICAgICAgICB0aGlzLnRpdGxlID0gXCJNb2RpZmllciB1biBwYXRpZW50XCI7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zLmZvckVhY2goKHBhcmFtczogUGFyYW1zKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm51bWVybyAgICAgPSBwYXJhbXNbXCJudW1lcm9cIl07XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNtcy5nZXRQYXRpZW50QnlJZCh0aGlzLm51bWVybykudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhdGllbnQgPSByZXM7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgLyp0aGlzLl9fbG9hZGVyLmxvYWQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdlb2NvZGVyICAgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuICAgICAgICAgICAgICAgIHRoaXMubWFwICAgICAgICA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXBcIiksIHtcbiAgICAgICAgICAgICAgICAgICAgem9vbTogMTJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsZXQgcGF0aWVudEFkcmVzc2UgOiBzdHJpbmcgPSB0aGlzLnBhdGllbnQuYWRyZXNzZS52aWxsZSArIFwiIFwiXG4gICAgICAgICAgICAgICAgICAgICsgdGhpcy5wYXRpZW50LmFkcmVzc2UubnVtZXJvICsgXCIgXCJcbiAgICAgICAgICAgICAgICAgICAgKyB0aGlzLnBhdGllbnQuYWRyZXNzZS5ydWUgKyBcIiBcIlxuICAgICAgICAgICAgICAgICAgICArIHRoaXMucGF0aWVudC5hZHJlc3NlLmNvZGVQb3N0YWw7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGF0aWVudEFkcmVzc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIuZ2VvY29kZSggeyBcImFkZHJlc3NcIjogcGF0aWVudEFkcmVzc2V9LCAocmVzdWx0cywgc3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzLk9LKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uICAgIDogcmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAgICAgICAgICA6IHRoaXMubWFwXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwLnNldENlbnRlcihyZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5zZXRDb250ZW50KHJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93Lm9wZW4odGhpcy5tYXAsIHRoaXMubWFya2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWRyZXNzZSh0aGlzLnBhdGllbnQuYWRyZXNzZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gXCIsIHJlc3VsdHMsIFwiICYgU3RhdHVzIC0gXCIsIHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pOyovXG4gICAgICAgICAgICB0aGlzLmxvYWRQYXRpZW50SW5mb3MoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZFBhdGllbnRJbmZvcygpIHtcbiAgICAgICAgdGhpcy5lZGl0UGF0aWVudEZvcm0uY29udHJvbHNbXCJwYXRpZW50TmFtZVwiXSAgICAuc2V0VmFsdWUodGhpcy5wYXRpZW50Lm5vbSk7XG4gICAgICAgIHRoaXMuZWRpdFBhdGllbnRGb3JtLmNvbnRyb2xzW1wicGF0aWVudEZvcm5hbWVcIl0gLnNldFZhbHVlKHRoaXMucGF0aWVudC5wcmVub20pO1xuICAgICAgICB0aGlzLmVkaXRQYXRpZW50Rm9ybS5jb250cm9sc1tcInBhdGllbnROdW1iZXJcIl0gIC5zZXRWYWx1ZSh0aGlzLnBhdGllbnQubnVtZXJvU2VjdXJpdGVTb2NpYWxlKTtcbiAgICAgICAgdGhpcy5lZGl0UGF0aWVudEZvcm0uY29udHJvbHNbXCJwYXRpZW50U2V4XCJdICAgICAuc2V0VmFsdWUodGhpcy5wYXRpZW50LnNleGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdWJtaXRQYXRpZW50KGV2ZW50OiBFdmVudCwgZjogTmdGb3JtKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGYpO1xuICAgICAgICBpZiAoZi52YWxpZCkge1xuICAgICAgICAgICAgdGhpcy5jbXMuQWpvdXRlclBhdGllbnQoZikudGhlbigoZGF0YVBhdGllbnQpID0+IHtcbiAgICAgICAgICAgICAgICAvL0Fqb3V0ZXIgbGUgcGF0aWVudCBkYW5zIGxlIGNhYmluZXRcbiAgICAgICAgICAgICAgICBsZXQgcGF0aWVudDogUGF0aWVudEludGVyZmFjZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbm9tOiAgICAgICAgICAgICAgICAgICAgZGF0YVBhdGllbnQucGF0aWVudE5hbWUgICAgICAgICB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBwcmVub206ICAgICAgICAgICAgICAgICBkYXRhUGF0aWVudC5wYXRpZW50Rm9ybmFtZSAgICAgIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIG51bWVyb1NlY3VyaXRlU29jaWFsZTogIGRhdGFQYXRpZW50LnBhdGllbnROdW1iZXIgICAgICAgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgc2V4ZTogICAgICAgICAgICAgICAgICAgZGF0YVBhdGllbnQucGF0aWVudFNleCAgICAgICAgICB8fCBzZXhlRW51bS5NLFxuICAgICAgICAgICAgICAgICAgICBhZHJlc3NlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWxsZTogICAgICAgICAgICAgIGRhdGFQYXRpZW50LnBhdGllbnRDaXR5ICAgICAgICAgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVQb3N0YWw6ICAgICAgICAgZGF0YVBhdGllbnQucGF0aWVudFBvc3RhbENvZGUgICB8fCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcnVlOiAgICAgICAgICAgICAgICBkYXRhUGF0aWVudC5wYXRpZW50U3RyZWV0ICAgICAgIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1lcm86ICAgICAgICAgICAgIGRhdGFQYXRpZW50LnBhdGllbnRTdHJlZXROdW1iZXIgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV0YWdlOiAgICAgICAgICAgICAgZGF0YVBhdGllbnQucGF0aWVudEZsb29yICAgICAgICB8fCBcIlwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGxldCBpbmZJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5jbXMuY2FiaW5ldC5pbmZpcm1pZXJzLmZvckVhY2goKGluZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mLnBhdGllbnRzLmZpbHRlcigodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsLm51bWVyb1NlY3VyaXRlU29jaWFsZSA9PT0gcGF0aWVudC5udW1lcm9TZWN1cml0ZVNvY2lhbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZklkID0gaW5mLmlkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGluZklkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY21zLmFmZmVjdGVyUGF0aWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGF0aWVudC5udW1lcm9TZWN1cml0ZVNvY2lhbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZJZFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNtcy5jYWJpbmV0LmluZmlybWllcnMuZmlsdGVyKCAoaW5mKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZi5pZCA9PT0gaW5mSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNtcy5jYWJpbmV0LmluZmlybWllcnMuZmlsdGVyKCAoaW5mKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZi5pZCA9PT0gaW5mSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVswXS5wYXRpZW50cy5wdXNoKHBhdGllbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3NlY3JldGFpcmVcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQYXRpZW50IG1vZGlmacOpXCIpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyZXVyIDogXCIgKyBlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9

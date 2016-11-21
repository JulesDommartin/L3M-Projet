System.register(["@angular/core", "@angular/http", "rxjs/add/operator/toPromise", "angular2-notifications"], function(exports_1, context_1) {
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
    var core_1, http_1, angular2_notifications_1;
    var sexeEnum, ServiceCabinetMedical;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            }],
        execute: function() {
            (function (sexeEnum) {
                sexeEnum[sexeEnum["M"] = 0] = "M";
                sexeEnum[sexeEnum["F"] = 1] = "F";
            })(sexeEnum || (sexeEnum = {}));
            exports_1("sexeEnum", sexeEnum);
            ServiceCabinetMedical = class ServiceCabinetMedical {
                constructor(_http, _service) {
                    this._http = _http;
                    this._service = _service;
                } // Le service CabinetMedical a besoin du service Http
                getData(url) {
                    return this._http.get(url).toPromise().then((res) => {
                        let cabinet = {
                            infirmiers: [],
                            patientsNonAffectes: []
                        };
                        let parser = new DOMParser();
                        let doc = parser.parseFromString(res.text(), "text/xml");
                        let adresseElement = doc.querySelectorAll("cabinet adresse")[0];
                        this.cabinetAdresse = {
                            "numero": adresseElement.querySelector("numéro").textContent,
                            "rue": adresseElement.querySelector("rue").textContent,
                            "ville": adresseElement.querySelector("ville").textContent,
                            "codePostal": adresseElement.querySelector("codePostal").textContent
                        };
                        Array.from(doc.querySelectorAll("infirmier")).forEach((el) => {
                            let infirmier = this.parseInfirmier(el);
                            cabinet.infirmiers.push(infirmier);
                        });
                        Array.from(doc.querySelectorAll("patient")).forEach((el) => {
                            let patient = this.parsePatient(el);
                            if (!patient.id) {
                                cabinet.patientsNonAffectes.push(patient.patient);
                            }
                            else {
                                let inf = cabinet.infirmiers.filter((el) => { return el.id === patient.id; });
                                if (inf.length === 0) {
                                    console.log("Il n'existe aucun infirmier de cet id, opération impossible.");
                                }
                                else if (inf.length === 1) {
                                    inf[0].patients.push(patient.patient);
                                }
                                else {
                                    console.log("Il existe plusieurs infirmiers de cet id, opération impossible.");
                                }
                            }
                        });
                        this.cabinet = cabinet;
                        return cabinet;
                    }); // Fin de this._http.get
                }
                affecterPatient(idPatient, idInf) {
                    return this._http.post("/affectation", { infirmier: idInf, patient: idPatient }).toPromise().then((res) => {
                        if (res.status === 200) {
                            console.log("Le patient a été affecté");
                            this._service.success("Succès", "Le patient a été affecté");
                        }
                        else {
                            console.log("Une erreur s'est produite : " + res.status + " : " + res.statusText);
                            this._service.error("Erreur", res.status + " : " + res.statusText);
                        }
                    })
                        .catch((err) => {
                        console.log(err);
                        this._service.error("Erreur", err);
                    });
                }
                parseInfirmier(el) {
                    let id = el.getAttribute("id");
                    let nom = el.querySelector("nom").textContent || "";
                    let prenom = el.querySelector("prénom").textContent || "";
                    let photo = el.querySelector("photo").textContent || "";
                    let infirmier = {
                        id: id,
                        nom: nom,
                        prenom: prenom,
                        photo: photo,
                        patients: []
                    };
                    return infirmier;
                }
                parsePatient(el) {
                    let id = el.getAttribute("id");
                    let nom = el.querySelector("nom").textContent || "";
                    let prenom = el.querySelector("prénom").textContent || "";
                    let sexe = this.getSexe(el.querySelector("sexe").textContent);
                    let naissance = el.querySelector("naissance").textContent || "";
                    let numéro = el.querySelector("numéro").textContent || "";
                    let adresse = this.parseAdresse(el.querySelector("adresse")) || {};
                    let patient = {
                        id: id,
                        nom: nom,
                        prenom: prenom,
                        sexe: sexe,
                        naissance: naissance,
                        numeroSecuriteSociale: numéro,
                        adresse: adresse,
                    };
                    if (el.querySelector("visite").getAttribute("intervenant") !== undefined) {
                        return {
                            patient: patient,
                            id: el.querySelector("visite").getAttribute("intervenant")
                        };
                    }
                    else {
                        return {
                            patient: patient,
                            id: undefined
                        };
                    }
                }
                parseAdresse(el) {
                    let ville = (el.querySelector("ville")) ? el.querySelector("ville").textContent : "";
                    let codePostal = (el.querySelector("codePostal")) ? el.querySelector("codePostal").textContent : "";
                    let rue = (el.querySelector("rue")) ? el.querySelector("rue").textContent : "";
                    let numero = (el.querySelector("numéro")) ? el.querySelector("numéro").textContent : "";
                    let etage = (el.querySelector("étage")) ? el.querySelector("étage").textContent : null;
                    let adresse = {
                        ville: ville,
                        codePostal: codePostal,
                        rue: rue,
                        numero: numero,
                        etage: etage
                    };
                    return adresse;
                }
                getSexe(sexe) {
                    if (sexe === "M") {
                        return sexeEnum.M;
                    }
                    else if (sexe === "F") {
                        return sexeEnum.F;
                    }
                    else
                        return null;
                }
                AjouterPatient(f) {
                    let controls = f.value;
                    return this._http.post("./addPatient", controls).toPromise()
                        .then(() => {
                        return controls;
                    })
                        .catch((err) => {
                        return err;
                    });
                }
                getPatientById(numero) {
                    return this.getData("/data/cabinetInfirmier.xml").then((res) => {
                        let cabinet = res;
                        let patients = cabinet.patientsNonAffectes;
                        cabinet.infirmiers.forEach((value) => {
                            patients = patients.concat(value.patients);
                        });
                        if (patients.filter((value) => { return value.numeroSecuriteSociale === numero; }).length === 0) {
                            return undefined;
                        }
                        else {
                            return patients.filter((value) => { return value.numeroSecuriteSociale === numero; })[0];
                        }
                    })
                        .catch((err) => {
                        console.log(err);
                    });
                }
            };
            ServiceCabinetMedical = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http, angular2_notifications_1.NotificationsService])
            ], ServiceCabinetMedical);
            exports_1("ServiceCabinetMedical", ServiceCabinetMedical);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFNQSxXQUFZLFFBQVE7Z0JBQUUsaUNBQUMsQ0FBQTtnQkFBRSxpQ0FBQyxDQUFBO1lBQUEsQ0FBQyxFQUFmLFFBQVEsS0FBUixRQUFRLFFBQU87NENBQUE7WUEyQjNCO2dCQUdJLFlBQW9CLEtBQVcsRUFBUyxRQUErQjtvQkFBbkQsVUFBSyxHQUFMLEtBQUssQ0FBTTtvQkFBUyxhQUFRLEdBQVIsUUFBUSxDQUF1QjtnQkFBRyxDQUFDLENBQUMscURBQXFEO2dCQUNqSSxPQUFPLENBQUUsR0FBVztvQkFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBRSxDQUFDLEdBQWE7d0JBQ3ZELElBQUksT0FBTyxHQUFzQjs0QkFDN0IsVUFBVSxFQUFZLEVBQUU7NEJBQ3hCLG1CQUFtQixFQUFHLEVBQUU7eUJBQzNCLENBQUM7d0JBQ0YsSUFBSSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQzt3QkFDN0IsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7d0JBQ3pELElBQUksY0FBYyxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoRSxJQUFJLENBQUMsY0FBYyxHQUFHOzRCQUNsQixRQUFRLEVBQU0sY0FBYyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBSyxXQUFXOzRCQUNwRSxLQUFLLEVBQVMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBUSxXQUFXOzRCQUNwRSxPQUFPLEVBQU8sY0FBYyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMs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QyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDNUYsTUFBTSxDQUFDLFNBQVMsQ0FBQzt3QkFDckIsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDSixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssT0FBTSxNQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixLQUFLLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzRixDQUFDO29CQUNMLENBQUMsQ0FBQzt5QkFDRyxLQUFLLENBQUMsQ0FBRSxHQUFHO3dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3JCLENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUM7WUFFTCxDQUFDO1lBbktEO2dCQUFDLGlCQUFVLEVBQUU7O3FDQUFBO1lBQ2IseURBa0tDLENBQUEiLCJmaWxlIjoiU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSAgICAgZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SHR0cCwgUmVzcG9uc2V9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2VcIjtcbmltcG9ydCB7TmdGb3JtfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7Tm90aWZpY2F0aW9uc1NlcnZpY2V9IGZyb20gXCJhbmd1bGFyMi1ub3RpZmljYXRpb25zXCI7XG5cbmV4cG9ydCBlbnVtIHNleGVFbnVtIHtNLCBGfVxuZXhwb3J0IGludGVyZmFjZSBQYXRpZW50SW50ZXJmYWNlIHtcbiAgICBwcmVub20gICAgICAgICAgICAgICAgICA6IHN0cmluZztcbiAgICBub20gICAgICAgICAgICAgICAgICAgICA6IHN0cmluZztcbiAgICBzZXhlICAgICAgICAgICAgICAgICAgICA6IHNleGVFbnVtO1xuICAgIG51bWVyb1NlY3VyaXRlU29jaWFsZSAgIDogc3RyaW5nO1xuICAgIGFkcmVzc2UgICAgICAgICAgICAgICAgIDoge1xuICAgICAgICB2aWxsZSAgICAgICA6IHN0cmluZztcbiAgICAgICAgY29kZVBvc3RhbCAgOiBudW1iZXI7XG4gICAgICAgIHJ1ZSAgICAgICAgIDogc3RyaW5nO1xuICAgICAgICBudW1lcm8gICAgICA6IHN0cmluZztcbiAgICAgICAgZXRhZ2UgICAgICAgOiBzdHJpbmc7XG4gICAgfTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSW5maXJtaWVySW50ZXJmYWNlIHtcbiAgICBpZCAgICAgICAgICA6IHN0cmluZztcbiAgICBwcmVub20gICAgICA6IHN0cmluZztcbiAgICBub20gICAgICAgICA6IHN0cmluZztcbiAgICBwaG90byAgICAgICA6IHN0cmluZztcbiAgICBwYXRpZW50cyAgICA6IFBhdGllbnRJbnRlcmZhY2VbXTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgQ2FiaW5ldEludGVyZmFjZSB7XG4gICAgaW5maXJtaWVycyAgICAgICAgICA6IEluZmlybWllckludGVyZmFjZVtdO1xuICAgIHBhdGllbnRzTm9uQWZmZWN0ZXMgOiBQYXRpZW50SW50ZXJmYWNlICBbXTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZpY2VDYWJpbmV0TWVkaWNhbCB7XG4gICAgcHVibGljIGNhYmluZXQ7XG4gICAgcHVibGljIGNhYmluZXRBZHJlc3NlO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHAsIHB1YmxpYyBfc2VydmljZSA6IE5vdGlmaWNhdGlvbnNTZXJ2aWNlKSB7fSAvLyBMZSBzZXJ2aWNlIENhYmluZXRNZWRpY2FsIGEgYmVzb2luIGR1IHNlcnZpY2UgSHR0cFxuICAgIGdldERhdGEoIHVybDogc3RyaW5nICkgOiBQcm9taXNlPENhYmluZXRJbnRlcmZhY2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHVybCkudG9Qcm9taXNlKCkudGhlbiggKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGxldCBjYWJpbmV0IDogQ2FiaW5ldEludGVyZmFjZSA9IHtcbiAgICAgICAgICAgICAgICBpbmZpcm1pZXJzICAgICAgICAgIDogW10sXG4gICAgICAgICAgICAgICAgcGF0aWVudHNOb25BZmZlY3RlcyA6IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgICAgICAgIGxldCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHJlcy50ZXh0KCksIFwidGV4dC94bWxcIik7XG4gICAgICAgICAgICBsZXQgYWRyZXNzZUVsZW1lbnQgPSBkb2MucXVlcnlTZWxlY3RvckFsbChcImNhYmluZXQgYWRyZXNzZVwiKVswXTtcbiAgICAgICAgICAgIHRoaXMuY2FiaW5ldEFkcmVzc2UgPSB7XG4gICAgICAgICAgICAgICAgXCJudW1lcm9cIiAgICA6IGFkcmVzc2VFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJudW3DqXJvXCIpICAgIC50ZXh0Q29udGVudCxcbiAgICAgICAgICAgICAgICBcInJ1ZVwiICAgICAgIDogYWRyZXNzZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcInJ1ZVwiKSAgICAgICAudGV4dENvbnRlbnQsXG4gICAgICAgICAgICAgICAgXCJ2aWxsZVwiICAgICA6IGFkcmVzc2VFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ2aWxsZVwiKSAgICAgLnRleHRDb250ZW50LFxuICAgICAgICAgICAgICAgIFwiY29kZVBvc3RhbFwiOiBhZHJlc3NlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiY29kZVBvc3RhbFwiKS50ZXh0Q29udGVudFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIEFycmF5LmZyb20oZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbmZpcm1pZXJcIikpLmZvckVhY2goKGVsOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBpbmZpcm1pZXIgPSB0aGlzLnBhcnNlSW5maXJtaWVyKGVsKTtcbiAgICAgICAgICAgICAgICBjYWJpbmV0LmluZmlybWllcnMucHVzaChpbmZpcm1pZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBBcnJheS5mcm9tKGRvYy5xdWVyeVNlbGVjdG9yQWxsKFwicGF0aWVudFwiKSkuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGF0aWVudCA9IHRoaXMucGFyc2VQYXRpZW50KGVsKTtcbiAgICAgICAgICAgICAgICBpZiAoIXBhdGllbnQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FiaW5ldC5wYXRpZW50c05vbkFmZmVjdGVzLnB1c2gocGF0aWVudC5wYXRpZW50KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5mIDogSW5maXJtaWVySW50ZXJmYWNlW10gPSBjYWJpbmV0LmluZmlybWllcnMuZmlsdGVyKChlbCkgPT4ge3JldHVybiBlbC5pZCA9PT0gcGF0aWVudC5pZDt9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSWwgbidleGlzdGUgYXVjdW4gaW5maXJtaWVyIGRlIGNldCBpZCwgb3DDqXJhdGlvbiBpbXBvc3NpYmxlLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbmYubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZbMF0ucGF0aWVudHMucHVzaChwYXRpZW50LnBhdGllbnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJbCBleGlzdGUgcGx1c2lldXJzIGluZmlybWllcnMgZGUgY2V0IGlkLCBvcMOpcmF0aW9uIGltcG9zc2libGUuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmNhYmluZXQgPSBjYWJpbmV0O1xuICAgICAgICAgICAgcmV0dXJuIGNhYmluZXQ7XG4gICAgICAgIH0pOyAvLyBGaW4gZGUgdGhpcy5faHR0cC5nZXRcbiAgICB9XG5cbiAgICBhZmZlY3RlclBhdGllbnQoaWRQYXRpZW50OiBzdHJpbmcsIGlkSW5mOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdChcIi9hZmZlY3RhdGlvblwiLCB7aW5maXJtaWVyOiBpZEluZiwgcGF0aWVudDogaWRQYXRpZW50fSkudG9Qcm9taXNlKCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMZSBwYXRpZW50IGEgw6l0w6kgYWZmZWN0w6lcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VydmljZS5zdWNjZXNzKFwiU3VjY8Ooc1wiLCBcIkxlIHBhdGllbnQgYSDDqXTDqSBhZmZlY3TDqVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmUgZXJyZXVyIHMnZXN0IHByb2R1aXRlIDogXCIgKyByZXMuc3RhdHVzICsgXCIgOiBcIiArIHJlcy5zdGF0dXNUZXh0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmVycm9yKFwiRXJyZXVyXCIsIHJlcy5zdGF0dXMgKyBcIiA6IFwiICsgcmVzLnN0YXR1c1RleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZXJyb3IoXCJFcnJldXJcIiwgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGFyc2VJbmZpcm1pZXIoZWwgOiBFbGVtZW50KSA6IEluZmlybWllckludGVyZmFjZSB7XG4gICAgICAgIGxldCBpZCAgICAgID0gZWwuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gICAgICAgIGxldCBub20gICAgID0gZWwucXVlcnlTZWxlY3RvcihcIm5vbVwiKSAgIC50ZXh0Q29udGVudCB8fCBcIlwiO1xuICAgICAgICBsZXQgcHJlbm9tICA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCJwcsOpbm9tXCIpLnRleHRDb250ZW50IHx8IFwiXCI7XG4gICAgICAgIGxldCBwaG90byAgID0gZWwucXVlcnlTZWxlY3RvcihcInBob3RvXCIpIC50ZXh0Q29udGVudCB8fCBcIlwiO1xuXG4gICAgICAgIGxldCBpbmZpcm1pZXIgOiBJbmZpcm1pZXJJbnRlcmZhY2UgPSA8SW5maXJtaWVySW50ZXJmYWNlPntcbiAgICAgICAgICAgIGlkICAgICAgOiBpZCxcbiAgICAgICAgICAgIG5vbSAgICAgOiBub20sXG4gICAgICAgICAgICBwcmVub20gIDogcHJlbm9tLFxuICAgICAgICAgICAgcGhvdG8gICA6IHBob3RvLFxuICAgICAgICAgICAgcGF0aWVudHM6IFtdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBpbmZpcm1pZXI7XG4gICAgfVxuXG4gICAgcGFyc2VQYXRpZW50KGVsIDogRWxlbWVudCkge1xuICAgICAgICBsZXQgaWQgICAgICAgICAgPSBlbC5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgbGV0IG5vbSAgICAgICAgID0gZWwucXVlcnlTZWxlY3RvcihcIm5vbVwiKSAgICAgICAgICAgICAgIC50ZXh0Q29udGVudCAgICB8fCBcIlwiO1xuICAgICAgICBsZXQgcHJlbm9tICAgICAgPSBlbC5xdWVyeVNlbGVjdG9yKFwicHLDqW5vbVwiKSAgICAgICAgICAgIC50ZXh0Q29udGVudCAgICB8fCBcIlwiO1xuICAgICAgICBsZXQgc2V4ZSAgICAgICAgPSB0aGlzLmdldFNleGUoZWwucXVlcnlTZWxlY3RvcihcInNleGVcIikgLnRleHRDb250ZW50KTtcbiAgICAgICAgbGV0IG5haXNzYW5jZSAgID0gZWwucXVlcnlTZWxlY3RvcihcIm5haXNzYW5jZVwiKSAgICAgICAgIC50ZXh0Q29udGVudCAgICB8fCBcIlwiO1xuICAgICAgICBsZXQgbnVtw6lybyAgICAgID0gZWwucXVlcnlTZWxlY3RvcihcIm51bcOpcm9cIikgICAgICAgICAgICAudGV4dENvbnRlbnQgICAgfHwgXCJcIjtcbiAgICAgICAgbGV0IGFkcmVzc2UgICAgID0gdGhpcy5wYXJzZUFkcmVzc2UoZWwucXVlcnlTZWxlY3RvcihcImFkcmVzc2VcIikpICAgICAgICB8fCB7fTtcbiAgICAgICAgbGV0IHBhdGllbnQgOiBQYXRpZW50SW50ZXJmYWNlID0gPFBhdGllbnRJbnRlcmZhY2U+e1xuICAgICAgICAgICAgaWQgICAgICAgICAgICAgICAgICAgICAgOiBpZCxcbiAgICAgICAgICAgIG5vbSAgICAgICAgICAgICAgICAgICAgIDogbm9tLFxuICAgICAgICAgICAgcHJlbm9tICAgICAgICAgICAgICAgICAgOiBwcmVub20sXG4gICAgICAgICAgICBzZXhlICAgICAgICAgICAgICAgICAgICA6IHNleGUsXG4gICAgICAgICAgICBuYWlzc2FuY2UgICAgICAgICAgICAgICA6IG5haXNzYW5jZSxcbiAgICAgICAgICAgIG51bWVyb1NlY3VyaXRlU29jaWFsZSAgIDogbnVtw6lybyxcbiAgICAgICAgICAgIGFkcmVzc2UgICAgICAgICAgICAgICAgIDogYWRyZXNzZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGVsLnF1ZXJ5U2VsZWN0b3IoXCJ2aXNpdGVcIikuZ2V0QXR0cmlidXRlKFwiaW50ZXJ2ZW5hbnRcIikgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwYXRpZW50IDogcGF0aWVudCxcbiAgICAgICAgICAgICAgICBpZCAgICAgIDogZWwucXVlcnlTZWxlY3RvcihcInZpc2l0ZVwiKS5nZXRBdHRyaWJ1dGUoXCJpbnRlcnZlbmFudFwiKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcGF0aWVudCA6IHBhdGllbnQsXG4gICAgICAgICAgICAgICAgaWQgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhcnNlQWRyZXNzZShlbCA6IEVsZW1lbnQpIDogYW55IHtcbiAgICAgICAgbGV0IHZpbGxlICAgICAgID0gKGVsLnF1ZXJ5U2VsZWN0b3IoXCJ2aWxsZVwiKSkgICAgICAgPyBlbC5xdWVyeVNlbGVjdG9yKFwidmlsbGVcIikgICAgIC50ZXh0Q29udGVudCA6IFwiXCI7XG4gICAgICAgIGxldCBjb2RlUG9zdGFsICA9IChlbC5xdWVyeVNlbGVjdG9yKFwiY29kZVBvc3RhbFwiKSkgID8gZWwucXVlcnlTZWxlY3RvcihcImNvZGVQb3N0YWxcIikudGV4dENvbnRlbnQgOiBcIlwiO1xuICAgICAgICBsZXQgcnVlICAgICAgICAgPSAoZWwucXVlcnlTZWxlY3RvcihcInJ1ZVwiKSkgICAgICAgICA/IGVsLnF1ZXJ5U2VsZWN0b3IoXCJydWVcIikgICAgICAgLnRleHRDb250ZW50IDogXCJcIjtcbiAgICAgICAgbGV0IG51bWVybyAgICAgID0gKGVsLnF1ZXJ5U2VsZWN0b3IoXCJudW3DqXJvXCIpKSAgICAgID8gZWwucXVlcnlTZWxlY3RvcihcIm51bcOpcm9cIikgICAgLnRleHRDb250ZW50IDogXCJcIjtcbiAgICAgICAgbGV0IGV0YWdlICAgICAgID0gKGVsLnF1ZXJ5U2VsZWN0b3IoXCLDqXRhZ2VcIikpICAgICAgID8gZWwucXVlcnlTZWxlY3RvcihcIsOpdGFnZVwiKSAgICAgLnRleHRDb250ZW50IDogbnVsbDtcblxuICAgICAgICBsZXQgYWRyZXNzZSA9IHtcbiAgICAgICAgICAgIHZpbGxlICAgICAgIDogdmlsbGUsXG4gICAgICAgICAgICBjb2RlUG9zdGFsICA6IGNvZGVQb3N0YWwsXG4gICAgICAgICAgICBydWUgICAgICAgICA6IHJ1ZSxcbiAgICAgICAgICAgIG51bWVybyAgICAgIDogbnVtZXJvLFxuICAgICAgICAgICAgZXRhZ2UgICAgICAgOiBldGFnZVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBhZHJlc3NlO1xuICAgIH1cblxuICAgIGdldFNleGUoc2V4ZSA6IHN0cmluZykgOiBzZXhlRW51bSB7XG4gICAgICAgIGlmIChzZXhlID09PSBcIk1cIikge1xuICAgICAgICAgICAgcmV0dXJuIHNleGVFbnVtLk07XG4gICAgICAgIH0gZWxzZSBpZiAoc2V4ZSA9PT0gXCJGXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXhlRW51bS5GO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIEFqb3V0ZXJQYXRpZW50IChmOiBOZ0Zvcm0pIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IGNvbnRyb2xzID0gZi52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCggXCIuL2FkZFBhdGllbnRcIiwgY29udHJvbHMgKS50b1Byb21pc2UoKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udHJvbHM7XG4gICAgICAgICAgICB9IClcbiAgICAgICAgICAgIC5jYXRjaCggKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRQYXRpZW50QnlJZChudW1lcm86IHN0cmluZyk6IFByb21pc2U8UGF0aWVudEludGVyZmFjZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRhKFwiL2RhdGEvY2FiaW5ldEluZmlybWllci54bWxcIikudGhlbigoIHJlcyApID0+IHtcbiAgICAgICAgICAgIGxldCBjYWJpbmV0ICAgICA6IENhYmluZXRJbnRlcmZhY2UgPSByZXM7XG4gICAgICAgICAgICBsZXQgcGF0aWVudHMgICAgOiBQYXRpZW50SW50ZXJmYWNlW10gPSBjYWJpbmV0LnBhdGllbnRzTm9uQWZmZWN0ZXM7XG5cbiAgICAgICAgICAgIGNhYmluZXQuaW5maXJtaWVycy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHBhdGllbnRzID0gcGF0aWVudHMuY29uY2F0KHZhbHVlLnBhdGllbnRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHBhdGllbnRzLmZpbHRlcigodmFsdWUpID0+IHtyZXR1cm4gdmFsdWUubnVtZXJvU2VjdXJpdGVTb2NpYWxlID09PSBudW1lcm87fSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGllbnRzLmZpbHRlcigodmFsdWUpID0+IHtyZXR1cm4gdmFsdWUubnVtZXJvU2VjdXJpdGVTb2NpYWxlID09PSBudW1lcm87fSlbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKCBlcnIgKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==

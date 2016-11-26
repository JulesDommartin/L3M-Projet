System.register(["@angular/core", "@angular/http", "rxjs/add/operator/toPromise", "angular2-notifications", "angular2-google-maps/core"], function(exports_1, context_1) {
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
    var core_1, http_1, angular2_notifications_1, core_2;
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
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            (function (sexeEnum) {
                sexeEnum[sexeEnum["M"] = 0] = "M";
                sexeEnum[sexeEnum["F"] = 1] = "F";
            })(sexeEnum || (sexeEnum = {}));
            exports_1("sexeEnum", sexeEnum);
            ServiceCabinetMedical = class ServiceCabinetMedical {
                constructor(_http, _service, _load) {
                    this._http = _http;
                    this._service = _service;
                    this._load = _load;
                    this.Promesse = Promise.resolve();
                } // Le service CabinetMedical a besoin du service Http
                getData(url) {
                    return this._http.get(url).toPromise().then((res) => {
                        return this._load.load().then(() => {
                            this.geocoder = new google.maps.Geocoder();
                        }).then(() => {
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
                                let data = this.parsePatient(el);
                                this.Promesse = this.Promesse.then(data.fctPromesse, data.fctPromesse);
                                if (!data.intervenantId) {
                                    cabinet.patientsNonAffectes.push(data.patient);
                                }
                                else {
                                    let inf = cabinet.infirmiers.find(inf => inf.id === data.intervenantId);
                                    if (!inf) {
                                        console.error("Il n'existe aucun infirmier de cet id, opération impossible.");
                                    }
                                    else {
                                        inf.patients.push(data.patient);
                                    }
                                }
                            });
                            this.cabinet = cabinet;
                            return cabinet;
                        });
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
                    let nom = el.querySelector("nom").textContent || "";
                    let prenom = el.querySelector("prénom").textContent || "";
                    let sexe = this.getSexe(el.querySelector("sexe").textContent);
                    let numéro = el.querySelector("numéro").textContent || "";
                    let adresse = this.parseAdresse(el.querySelector("adresse"));
                    let patient = {
                        nom: nom,
                        prenom: prenom,
                        sexe: sexe,
                        numeroSecuriteSociale: numéro,
                        adresse: adresse,
                    };
                    let result;
                    if (el.querySelector("visite").getAttribute("intervenant") !== undefined) {
                        result = {
                            patient: patient,
                            intervenantId: el.querySelector("visite").getAttribute("intervenant"),
                            fctPromesse: () => this.geocodeP(patient)
                        };
                    }
                    else {
                        result = {
                            patient: patient,
                            intervenantId: undefined,
                            fctPromesse: () => this.geocodeP(patient)
                        };
                    }
                    return result;
                }
                geocodeP(patient) {
                    let adresse = patient.adresse.ville + " "
                        + patient.adresse.rue + " "
                        + patient.adresse.codePostal + " "
                        + patient.adresse.numero;
                    return new Promise((resolve, reject) => {
                        this.geocoder.geocode({ "address": adresse }, (results, status) => {
                            if (status === google.maps.GeocoderStatus.OK) {
                                // Mise à jour pour le patient
                                patient.adresse.latlng = results[0].geometry.location;
                                resolve(results);
                            }
                            else {
                                reject(status);
                            }
                        });
                    });
                }
                parseAdresse(el) {
                    let ville = (el.querySelector("ville")) ? el.querySelector("ville").textContent : "";
                    let codePostal = (el.querySelector("codePostal")) ? el.querySelector("codePostal").textContent : "";
                    let rue = (el.querySelector("rue")) ? el.querySelector("rue").textContent : "";
                    let numero = (el.querySelector("numéro")) ? el.querySelector("numéro").textContent : "";
                    let etage = (el.querySelector("étage")) ? el.querySelector("étage").textContent : null;
                    return {
                        ville: ville,
                        codePostal: +codePostal,
                        rue: rue,
                        numero: numero,
                        etage: etage,
                        latlng: undefined
                    };
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
                __metadata('design:paramtypes', [http_1.Http, angular2_notifications_1.NotificationsService, core_2.MapsAPILoader])
            ], ServiceCabinetMedical);
            exports_1("ServiceCabinetMedical", ServiceCabinetMedical);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFPQSxXQUFZLFFBQVE7Z0JBQUUsaUNBQUMsQ0FBQTtnQkFBRSxpQ0FBQyxDQUFBO1lBQUEsQ0FBQyxFQUFmLFFBQVEsS0FBUixRQUFRLFFBQU87NENBQUE7WUFnQzNCO2dCQUtJLFlBQW9CLEtBQVcsRUFBUyxRQUErQixFQUFVLEtBQXFCO29CQUFsRixVQUFLLEdBQUwsS0FBSyxDQUFNO29CQUFTLGFBQVEsR0FBUixRQUFRLENBQXVCO29CQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO29CQUYvRixhQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUlwQyxDQUFDLENBQUMscURBQXFEO2dCQUN2RCxPQUFPLENBQUUsR0FBVztvQkFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBRSxDQUFDLEdBQWE7d0JBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBRTs0QkFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQy9DLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBRTs0QkFDRCxJQUFJLE9BQU8sR0FBc0I7Z0NBQzdCLFVBQVUsRUFBWSxFQUFFO2dDQUN4QixtQkFBbUIsRUFBRyxFQUFFOzZCQUMzQixDQUFDOzRCQUNGLElBQUksTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7NEJBQzdCLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDOzRCQUN6RCxJQUFJLGNBQWMsR0FB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Q0FBQyxDQUFDOzRCQUNKLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxPQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMscUJBQXFCLEtBQUssTUFBTSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNGLENBQUM7b0JBQ0wsQ0FBQyxDQUFDO3lCQUNHLEtBQUssQ0FBQyxDQUFFLEdBQUc7d0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDckIsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQztZQUVMLENBQUM7WUEzTEQ7Z0JBQUMsaUJBQVUsRUFBRTs7cUNBQUE7WUFDYix5REEwTEMsQ0FBQSIsImZpbGUiOiJTZXJ2aWNlcy9jYWJpbmV0TWVkaWNhbFNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9ICAgICBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtIdHRwLCBSZXNwb25zZX0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZVwiO1xuaW1wb3J0IHtOZ0Zvcm19IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtOb3RpZmljYXRpb25zU2VydmljZX0gZnJvbSBcImFuZ3VsYXIyLW5vdGlmaWNhdGlvbnNcIjtcbmltcG9ydCB7IE1hcHNBUElMb2FkZXIgfSBmcm9tIFwiYW5ndWxhcjItZ29vZ2xlLW1hcHMvY29yZVwiO1xuXG5leHBvcnQgZW51bSBzZXhlRW51bSB7TSwgRn1cbnR5cGUgdHlwZUFkcmVzc2UgPSB7XG4gICAgdmlsbGUgICAgICAgOiBzdHJpbmc7XG4gICAgY29kZVBvc3RhbCAgOiBudW1iZXI7XG4gICAgcnVlICAgICAgICAgOiBzdHJpbmc7XG4gICAgbnVtZXJvICAgICAgOiBzdHJpbmc7XG4gICAgZXRhZ2UgICAgICAgOiBzdHJpbmc7XG4gICAgbGF0bG5nICAgICAgOiBnb29nbGUubWFwcy5MYXRMbmdcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF0aWVudEludGVyZmFjZSB7XG4gICAgcHJlbm9tICAgICAgICAgICAgICAgICAgOiBzdHJpbmc7XG4gICAgbm9tICAgICAgICAgICAgICAgICAgICAgOiBzdHJpbmc7XG4gICAgc2V4ZSAgICAgICAgICAgICAgICAgICAgOiBzZXhlRW51bTtcbiAgICBudW1lcm9TZWN1cml0ZVNvY2lhbGUgICA6IHN0cmluZztcbiAgICBhZHJlc3NlICAgICAgICAgICAgICAgICA6IHR5cGVBZHJlc3NlO1xufVxuZXhwb3J0IGludGVyZmFjZSBJbmZpcm1pZXJJbnRlcmZhY2Uge1xuICAgIGlkICAgICAgICAgIDogc3RyaW5nO1xuICAgIHByZW5vbSAgICAgIDogc3RyaW5nO1xuICAgIG5vbSAgICAgICAgIDogc3RyaW5nO1xuICAgIHBob3RvICAgICAgIDogc3RyaW5nO1xuICAgIHBhdGllbnRzICAgIDogUGF0aWVudEludGVyZmFjZVtdO1xufVxuZXhwb3J0IGludGVyZmFjZSBDYWJpbmV0SW50ZXJmYWNlIHtcbiAgICBpbmZpcm1pZXJzICAgICAgICAgIDogSW5maXJtaWVySW50ZXJmYWNlW107XG4gICAgcGF0aWVudHNOb25BZmZlY3RlcyA6IFBhdGllbnRJbnRlcmZhY2UgIFtdO1xufVxuXG50eXBlIGZjdFByb21BZCA9ICgpID0+IFByb21pc2U8YW55PjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZpY2VDYWJpbmV0TWVkaWNhbCB7XG4gICAgcHVibGljIGNhYmluZXQ7XG4gICAgcHVibGljIGNhYmluZXRBZHJlc3NlO1xuICAgIHB1YmxpYyBQcm9tZXNzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIHByaXZhdGUgZ2VvY29kZXIgOiBnb29nbGUubWFwcy5HZW9jb2RlcjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwLCBwdWJsaWMgX3NlcnZpY2UgOiBOb3RpZmljYXRpb25zU2VydmljZSwgcHJpdmF0ZSBfbG9hZCA6IE1hcHNBUElMb2FkZXIpIHtcblxuICAgIH0gLy8gTGUgc2VydmljZSBDYWJpbmV0TWVkaWNhbCBhIGJlc29pbiBkdSBzZXJ2aWNlIEh0dHBcbiAgICBnZXREYXRhKCB1cmw6IHN0cmluZyApIDogUHJvbWlzZTxDYWJpbmV0SW50ZXJmYWNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh1cmwpLnRvUHJvbWlzZSgpLnRoZW4oIChyZXM6IFJlc3BvbnNlKSA6IFByb21pc2U8Q2FiaW5ldEludGVyZmFjZT4gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWQubG9hZCgpLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdlb2NvZGVyID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XG4gICAgICAgICAgICB9KS50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjYWJpbmV0IDogQ2FiaW5ldEludGVyZmFjZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmlybWllcnMgICAgICAgICAgOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGllbnRzTm9uQWZmZWN0ZXMgOiBbXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhyZXMudGV4dCgpLCBcInRleHQveG1sXCIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYWRyZXNzZUVsZW1lbnQgPSBkb2MucXVlcnlTZWxlY3RvckFsbChcImNhYmluZXQgYWRyZXNzZVwiKVswXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWJpbmV0QWRyZXNzZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibnVtZXJvXCIgICAgOiBhZHJlc3NlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwibnVtw6lyb1wiKSAgICAudGV4dENvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJ1ZVwiICAgICAgIDogYWRyZXNzZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcInJ1ZVwiKSAgICAgICAudGV4dENvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpbGxlXCIgICAgIDogYWRyZXNzZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcInZpbGxlXCIpICAgICAudGV4dENvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvZGVQb3N0YWxcIjogYWRyZXNzZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcImNvZGVQb3N0YWxcIikudGV4dENvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuZnJvbShkb2MucXVlcnlTZWxlY3RvckFsbChcImluZmlybWllclwiKSkuZm9yRWFjaCgoZWw6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5maXJtaWVyID0gdGhpcy5wYXJzZUluZmlybWllcihlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWJpbmV0LmluZmlybWllcnMucHVzaChpbmZpcm1pZXIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuZnJvbShkb2MucXVlcnlTZWxlY3RvckFsbChcInBhdGllbnRcIikpLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMucGFyc2VQYXRpZW50KGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUHJvbWVzc2UgPSB0aGlzLlByb21lc3NlLnRoZW4oIGRhdGEuZmN0UHJvbWVzc2UsIGRhdGEuZmN0UHJvbWVzc2UgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0YS5pbnRlcnZlbmFudElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FiaW5ldC5wYXRpZW50c05vbkFmZmVjdGVzLnB1c2goZGF0YS5wYXRpZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluZiA6IEluZmlybWllckludGVyZmFjZSA9IGNhYmluZXQuaW5maXJtaWVycy5maW5kKCBpbmYgPT4gaW5mLmlkID09PSBkYXRhLmludGVydmVuYW50SWQgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWluZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiSWwgbidleGlzdGUgYXVjdW4gaW5maXJtaWVyIGRlIGNldCBpZCwgb3DDqXJhdGlvbiBpbXBvc3NpYmxlLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmYucGF0aWVudHMucHVzaChkYXRhLnBhdGllbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FiaW5ldCA9IGNhYmluZXQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWJpbmV0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pOyAvLyBGaW4gZGUgdGhpcy5faHR0cC5nZXRcbiAgICB9XG5cbiAgICBhZmZlY3RlclBhdGllbnQoaWRQYXRpZW50OiBzdHJpbmcsIGlkSW5mOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdChcIi9hZmZlY3RhdGlvblwiLCB7aW5maXJtaWVyOiBpZEluZiwgcGF0aWVudDogaWRQYXRpZW50fSkudG9Qcm9taXNlKCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMZSBwYXRpZW50IGEgw6l0w6kgYWZmZWN0w6lcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VydmljZS5zdWNjZXNzKFwiU3VjY8Ooc1wiLCBcIkxlIHBhdGllbnQgYSDDqXTDqSBhZmZlY3TDqVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmUgZXJyZXVyIHMnZXN0IHByb2R1aXRlIDogXCIgKyByZXMuc3RhdHVzICsgXCIgOiBcIiArIHJlcy5zdGF0dXNUZXh0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmVycm9yKFwiRXJyZXVyXCIsIHJlcy5zdGF0dXMgKyBcIiA6IFwiICsgcmVzLnN0YXR1c1RleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZXJyb3IoXCJFcnJldXJcIiwgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGFyc2VJbmZpcm1pZXIoZWwgOiBFbGVtZW50KSA6IEluZmlybWllckludGVyZmFjZSB7XG4gICAgICAgIGxldCBpZCAgICAgID0gZWwuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gICAgICAgIGxldCBub20gICAgID0gZWwucXVlcnlTZWxlY3RvcihcIm5vbVwiKSAgIC50ZXh0Q29udGVudCB8fCBcIlwiO1xuICAgICAgICBsZXQgcHJlbm9tICA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCJwcsOpbm9tXCIpLnRleHRDb250ZW50IHx8IFwiXCI7XG4gICAgICAgIGxldCBwaG90byAgID0gZWwucXVlcnlTZWxlY3RvcihcInBob3RvXCIpIC50ZXh0Q29udGVudCB8fCBcIlwiO1xuXG4gICAgICAgIGxldCBpbmZpcm1pZXIgOiBJbmZpcm1pZXJJbnRlcmZhY2UgPSA8SW5maXJtaWVySW50ZXJmYWNlPntcbiAgICAgICAgICAgIGlkICAgICAgOiBpZCxcbiAgICAgICAgICAgIG5vbSAgICAgOiBub20sXG4gICAgICAgICAgICBwcmVub20gIDogcHJlbm9tLFxuICAgICAgICAgICAgcGhvdG8gICA6IHBob3RvLFxuICAgICAgICAgICAgcGF0aWVudHM6IFtdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBpbmZpcm1pZXI7XG4gICAgfVxuXG4gICAgcGFyc2VQYXRpZW50KGVsIDogRWxlbWVudCkgOiB7cGF0aWVudDogUGF0aWVudEludGVyZmFjZSwgaW50ZXJ2ZW5hbnRJZDogc3RyaW5nLCBmY3RQcm9tZXNzZTogZmN0UHJvbUFkfSB7XG4gICAgICAgIGxldCBub20gICAgICAgICA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCJub21cIikgICAgICAgICAgICAgICAudGV4dENvbnRlbnQgICAgfHwgXCJcIjtcbiAgICAgICAgbGV0IHByZW5vbSAgICAgID0gZWwucXVlcnlTZWxlY3RvcihcInByw6lub21cIikgICAgICAgICAgICAudGV4dENvbnRlbnQgICAgfHwgXCJcIjtcbiAgICAgICAgbGV0IHNleGUgICAgICAgID0gdGhpcy5nZXRTZXhlKGVsLnF1ZXJ5U2VsZWN0b3IoXCJzZXhlXCIpIC50ZXh0Q29udGVudCk7XG4gICAgICAgIGxldCBudW3DqXJvICAgICAgPSBlbC5xdWVyeVNlbGVjdG9yKFwibnVtw6lyb1wiKSAgICAgICAgICAgIC50ZXh0Q29udGVudCAgICB8fCBcIlwiO1xuICAgICAgICBsZXQgYWRyZXNzZSAgICAgPSB0aGlzLnBhcnNlQWRyZXNzZShlbC5xdWVyeVNlbGVjdG9yKFwiYWRyZXNzZVwiKSk7XG4gICAgICAgIGxldCBwYXRpZW50IDogUGF0aWVudEludGVyZmFjZSA9IHtcbiAgICAgICAgICAgIG5vbSAgICAgICAgICAgICAgICAgICAgIDogbm9tLFxuICAgICAgICAgICAgcHJlbm9tICAgICAgICAgICAgICAgICAgOiBwcmVub20sXG4gICAgICAgICAgICBzZXhlICAgICAgICAgICAgICAgICAgICA6IHNleGUsXG4gICAgICAgICAgICBudW1lcm9TZWN1cml0ZVNvY2lhbGUgICA6IG51bcOpcm8sXG4gICAgICAgICAgICBhZHJlc3NlICAgICAgICAgICAgICAgICA6IGFkcmVzc2UsXG4gICAgICAgIH07XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIGlmIChlbC5xdWVyeVNlbGVjdG9yKFwidmlzaXRlXCIpLmdldEF0dHJpYnV0ZShcImludGVydmVuYW50XCIpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICBwYXRpZW50ICAgICAgICAgOiBwYXRpZW50LFxuICAgICAgICAgICAgICAgIGludGVydmVuYW50SWQgICA6IGVsLnF1ZXJ5U2VsZWN0b3IoXCJ2aXNpdGVcIikuZ2V0QXR0cmlidXRlKFwiaW50ZXJ2ZW5hbnRcIiksXG4gICAgICAgICAgICAgICAgZmN0UHJvbWVzc2UgICAgIDogKCkgPT4gdGhpcy5nZW9jb2RlUChwYXRpZW50KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICBwYXRpZW50ICAgICAgICAgOiBwYXRpZW50LFxuICAgICAgICAgICAgICAgIGludGVydmVuYW50SWQgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBmY3RQcm9tZXNzZSAgICAgOiAoKSA9PiB0aGlzLmdlb2NvZGVQKHBhdGllbnQpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGdlb2NvZGVQKHBhdGllbnQ6IFBhdGllbnRJbnRlcmZhY2UpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IGFkcmVzc2UgOiBzdHJpbmcgPSAgcGF0aWVudC5hZHJlc3NlLnZpbGxlICsgXCIgXCJcbiAgICAgICAgICAgICsgcGF0aWVudC5hZHJlc3NlLnJ1ZSArIFwiIFwiXG4gICAgICAgICAgICArIHBhdGllbnQuYWRyZXNzZS5jb2RlUG9zdGFsICsgXCIgXCJcbiAgICAgICAgICAgICsgcGF0aWVudC5hZHJlc3NlLm51bWVybztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdlb2NvZGVyLmdlb2NvZGUoe1wiYWRkcmVzc1wiOiBhZHJlc3NlfSxcbiAgICAgICAgICAgICAgICAocmVzdWx0cyA6IGdvb2dsZS5tYXBzLkdlb2NvZGVyUmVzdWx0W10sIHN0YXR1cyA6IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzLk9LKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNaXNlIMOgIGpvdXIgcG91ciBsZSBwYXRpZW50XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRpZW50LmFkcmVzc2UubGF0bG5nID0gcmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3Qoc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwYXJzZUFkcmVzc2UoZWwgOiBFbGVtZW50KSA6IHR5cGVBZHJlc3NlIHtcbiAgICAgICAgbGV0IHZpbGxlICAgICAgID0gKGVsLnF1ZXJ5U2VsZWN0b3IoXCJ2aWxsZVwiKSkgICAgICAgPyBlbC5xdWVyeVNlbGVjdG9yKFwidmlsbGVcIikgICAgIC50ZXh0Q29udGVudCA6IFwiXCI7XG4gICAgICAgIGxldCBjb2RlUG9zdGFsICA9IChlbC5xdWVyeVNlbGVjdG9yKFwiY29kZVBvc3RhbFwiKSkgID8gZWwucXVlcnlTZWxlY3RvcihcImNvZGVQb3N0YWxcIikudGV4dENvbnRlbnQgOiBcIlwiO1xuICAgICAgICBsZXQgcnVlICAgICAgICAgPSAoZWwucXVlcnlTZWxlY3RvcihcInJ1ZVwiKSkgICAgICAgICA/IGVsLnF1ZXJ5U2VsZWN0b3IoXCJydWVcIikgICAgICAgLnRleHRDb250ZW50IDogXCJcIjtcbiAgICAgICAgbGV0IG51bWVybyAgICAgID0gKGVsLnF1ZXJ5U2VsZWN0b3IoXCJudW3DqXJvXCIpKSAgICAgID8gZWwucXVlcnlTZWxlY3RvcihcIm51bcOpcm9cIikgICAgLnRleHRDb250ZW50IDogXCJcIjtcbiAgICAgICAgbGV0IGV0YWdlICAgICAgID0gKGVsLnF1ZXJ5U2VsZWN0b3IoXCLDqXRhZ2VcIikpICAgICAgID8gZWwucXVlcnlTZWxlY3RvcihcIsOpdGFnZVwiKSAgICAgLnRleHRDb250ZW50IDogbnVsbDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlsbGUgICAgICAgOiB2aWxsZSxcbiAgICAgICAgICAgIGNvZGVQb3N0YWwgIDorY29kZVBvc3RhbCxcbiAgICAgICAgICAgIHJ1ZSAgICAgICAgIDogcnVlLFxuICAgICAgICAgICAgbnVtZXJvICAgICAgOiBudW1lcm8sXG4gICAgICAgICAgICBldGFnZSAgICAgICA6IGV0YWdlLFxuICAgICAgICAgICAgbGF0bG5nICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRTZXhlKHNleGUgOiBzdHJpbmcpIDogc2V4ZUVudW0ge1xuICAgICAgICBpZiAoc2V4ZSA9PT0gXCJNXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXhlRW51bS5NO1xuICAgICAgICB9IGVsc2UgaWYgKHNleGUgPT09IFwiRlwiKSB7XG4gICAgICAgICAgICByZXR1cm4gc2V4ZUVudW0uRjtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBBam91dGVyUGF0aWVudCAoZjogTmdGb3JtKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGxldCBjb250cm9scyA9IGYudmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QoIFwiLi9hZGRQYXRpZW50XCIsIGNvbnRyb2xzICkudG9Qcm9taXNlKClcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRyb2xzO1xuICAgICAgICAgICAgfSApXG4gICAgICAgICAgICAuY2F0Y2goIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0UGF0aWVudEJ5SWQobnVtZXJvOiBzdHJpbmcpOiBQcm9taXNlPFBhdGllbnRJbnRlcmZhY2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0YShcIi9kYXRhL2NhYmluZXRJbmZpcm1pZXIueG1sXCIpLnRoZW4oKCByZXMgKSA9PiB7XG4gICAgICAgICAgICBsZXQgY2FiaW5ldCAgICAgOiBDYWJpbmV0SW50ZXJmYWNlID0gcmVzO1xuICAgICAgICAgICAgbGV0IHBhdGllbnRzICAgIDogUGF0aWVudEludGVyZmFjZVtdID0gY2FiaW5ldC5wYXRpZW50c05vbkFmZmVjdGVzO1xuXG4gICAgICAgICAgICBjYWJpbmV0LmluZmlybWllcnMuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICBwYXRpZW50cyA9IHBhdGllbnRzLmNvbmNhdCh2YWx1ZS5wYXRpZW50cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChwYXRpZW50cy5maWx0ZXIoKHZhbHVlKSA9PiB7cmV0dXJuIHZhbHVlLm51bWVyb1NlY3VyaXRlU29jaWFsZSA9PT0gbnVtZXJvO30pLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXRpZW50cy5maWx0ZXIoKHZhbHVlKSA9PiB7cmV0dXJuIHZhbHVlLm51bWVyb1NlY3VyaXRlU29jaWFsZSA9PT0gbnVtZXJvO30pWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCggZXJyICkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=

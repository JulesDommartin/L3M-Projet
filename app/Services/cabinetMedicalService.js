System.register(["@angular/core", "@angular/http", "rxjs/add/operator/toPromise"], function(exports_1, context_1) {
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
    var core_1, http_1;
    var sexeEnum, ServiceCabinetMedical;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            (function (sexeEnum) {
                sexeEnum[sexeEnum["M"] = 0] = "M";
                sexeEnum[sexeEnum["F"] = 1] = "F";
            })(sexeEnum || (sexeEnum = {}));
            exports_1("sexeEnum", sexeEnum);
            ServiceCabinetMedical = class ServiceCabinetMedical {
                constructor(_http) {
                    this._http = _http;
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
                        }
                        else {
                            console.log("Une erreur s'est produite : " + res.status + " : " + res.statusText);
                        }
                    })
                        .catch((err) => {
                        console.log(err);
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
                    let sexe = this.getSexe(el.querySelector("sexe").textContent) || "";
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
                    else if (sexe === "F")
                        return sexeEnum.F;
                    return null;
                }
                AjouterPatient(f) {
                    let controls = f.value;
                    return this._http.post("./addPatient", controls).toPromise().then(() => controls);
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
                __metadata('design:paramtypes', [http_1.Http])
            ], ServiceCabinetMedical);
            exports_1("ServiceCabinetMedical", ServiceCabinetMedical);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLQSxXQUFZLFFBQVE7Z0JBQUUsaUNBQUMsQ0FBQTtnQkFBRSxpQ0FBQyxDQUFBO1lBQUEsQ0FBQyxFQUFmLFFBQVEsS0FBUixRQUFRLFFBQU87NENBQUE7WUEyQjNCO2dCQUdJLFlBQW9CLEtBQVc7b0JBQVgsVUFBSyxHQUFMLEtBQUssQ0FBTTtnQkFBRyxDQUFDLENBQUMscURBQXFEO2dCQUN6RixPQUFPLENBQUUsR0FBVztvQkFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBRSxDQUFDLEdBQWE7d0JBQ3ZELElBQUksT0FBTyxHQUFzQjs0QkFDN0IsVUFBVSxFQUFZLEVBQUU7NEJBQ3hCLG1CQUFtQixFQUFHLEVBQUU7eUJBQzNCLENBQUM7d0JBQ0YsSUFBSSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQzt3QkFDN0IsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7d0JBQ3pELElBQUksY0FBYyxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoRSxJQUFJLENBQUMsY0FBYyxHQUFHOzRCQUNsQixRQUFRLEVBQU0sY0FBYyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBSyxXQUFXOzRCQUNwRSxLQUFLLEVBQVMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBUSxXQUFXOzRCQUNwRSxPQUFPLEVBQU8sY0FBYyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBTSxXQUFXOzRCQUNwRSxZQUFZLEVBQUUsY0FBYyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXO3lCQUN2RSxDQUFDO3dCQUNGLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBZTs0QkFDbEUsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDeEMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3ZDLENBQUMsQ0FBQyxDQUFDO3dCQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRTs0QkFDbkQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQ0FDZCxPQUFPLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDdEQsQ0FBQzs0QkFBQyxJQUFJLENBQUMsQ0FBQztnQ0FDSixJQUFJLEdBQUcsR0FBMEIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE9BQU0sTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO2dDQUNuRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsOERBQThELENBQUMsQ0FBQztnQ0FDaEYsQ0FBQztnQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUMxQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0NBQzFDLENBQUM7Z0NBQUMsSUFBSSxDQUFDLENBQUM7b0NBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDO2dDQUNuRixDQUFDOzRCQUNMLENBQUM7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7d0JBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7d0JBQ3ZCLE1BQU0sQ0FBQyxPQUFPLENBQUM7b0JBQ25CLENBQUMsQ0FBQyxDQUFDLENBQUMsd0JBQXdCO2dCQUNoQyxDQUFDO2dCQUVELGVBQWUsQ0FBQyxTQUFpQixFQUFFLEtBQWE7b0JBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUc7d0JBQ2hHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO3dCQUM1QyxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUN0RixDQUFDO29CQUNMLENBQUMsQ0FBQzt5QkFDRCxLQUFLLENBQUMsQ0FBQyxHQUFHO3dCQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3JCLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBRUQsY0FBYyxDQUFDLEVBQVk7b0JBQ3ZCLElBQUksRUFBRSxHQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BDLElBQUksR0FBRyxHQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUksV0FBVyxJQUFJLEVBQUUsQ0FBQztvQkFDM0QsSUFBSSxNQUFNLEdBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO29CQUMzRCxJQUFJLEtBQUssR0FBSyxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFFLFdBQVcsSUFBSSxFQUFFLENBQUM7b0JBRTNELElBQUksU0FBUyxHQUE0Qzt3QkFDckQsRUFBRSxFQUFRLEVBQUU7d0JBQ1osR0FBRyxFQUFPLEdBQUc7d0JBQ2IsTUFBTSxFQUFJLE1BQU07d0JBQ2hCLEtBQUssRUFBSyxLQUFLO3dCQUNmLFFBQVEsRUFBRSxFQUFFO3FCQUNmLENBQUM7b0JBQ0YsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDckIsQ0FBQztnQkFFRCxZQUFZLENBQUMsRUFBWTtvQkFDckIsSUFBSSxFQUFFLEdBQVksRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxHQUFHLEdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBZ0IsV0FBVyxJQUFJLEVBQUUsQ0FBQztvQkFDM0UsSUFBSSxNQUFNLEdBQVEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBYSxXQUFXLElBQUksRUFBRSxDQUFDO29CQUMzRSxJQUFJLElBQUksR0FBVSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUUsV0FBVyxDQUFDLElBQUcsRUFBRSxDQUFDO29CQUMzRSxJQUFJLFNBQVMsR0FBSyxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFVLFdBQVcsSUFBSSxFQUFFLENBQUM7b0JBQzNFLElBQUksTUFBTSxHQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQWEsV0FBVyxJQUFJLEVBQUUsQ0FBQztvQkFDM0UsSUFBSSxPQUFPLEdBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQU8sRUFBRSxDQUFDO29CQUMxRSxJQUFJLE9BQU8sR0FBd0M7d0JBQy9DLEVBQUUsRUFBd0IsRUFBRTt3QkFDNUIsR0FBRyxFQUF1QixHQUFHO3dCQUM3QixNQUFNLEVBQW9CLE1BQU07d0JBQ2hDLElBQUksRUFBc0IsSUFBSTt3QkFDOUIsU0FBUyxFQUFpQixTQUFTO3dCQUNuQyxxQkFBcUIsRUFBSyxNQUFNO3dCQUNoQyxPQUFPLEVBQW1CLE9BQU87cUJBQ3BDLENBQUM7b0JBQ0YsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDdkUsTUFBTSxDQUFDOzRCQUNILE9BQU8sRUFBRyxPQUFPOzRCQUNqQixFQUFFLEVBQVEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO3lCQUNuRSxDQUFDO29CQUNOLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osTUFBTSxDQUFDOzRCQUNILE9BQU8sRUFBRyxPQUFPOzRCQUNqQixFQUFFLEVBQVEsU0FBUzt5QkFDdEIsQ0FBQztvQkFDTixDQUFDO2dCQUNMLENBQUM7Z0JBRUQsWUFBWSxDQUFDLEVBQVk7b0JBQ3JCLElBQUksS0FBSyxHQUFTLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztvQkFDdEcsSUFBSSxVQUFVLEdBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO29CQUN0RyxJQUFJLEdBQUcsR0FBVyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFRLFdBQVcsR0FBRyxFQUFFLENBQUM7b0JBQ3RHLElBQUksTUFBTSxHQUFRLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUssV0FBVyxHQUFHLEVBQUUsQ0FBQztvQkFDdEcsSUFBSSxLQUFLLEdBQVMsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBTSxXQUFXLEdBQUcsSUFBSSxDQUFDO29CQUV4RyxJQUFJLE9BQU8sR0FBRzt3QkFDVixLQUFLLEVBQVMsS0FBSzt3QkFDbkIsVUFBVSxFQUFJLFVBQVU7d0JBQ3hCLEdBQUcsRUFBVyxHQUFHO3dCQUNqQixNQUFNLEVBQVEsTUFBTTt3QkFDcEIsS0FBSyxFQUFTLEtBQUs7cUJBQ3RCLENBQUM7b0JBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQztnQkFDbkIsQ0FBQztnQkFFRCxPQUFPLENBQUMsSUFBYTtvQkFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ2YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUM7d0JBQ3BCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELGNBQWMsQ0FBRSxDQUFTO29CQUNyQixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBRSxNQUFNLFFBQVEsQ0FBRSxDQUFDO2dCQUMxRixDQUFDO2dCQUVELGNBQWMsQ0FBQyxNQUFjO29CQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFFLEdBQUc7d0JBQ3hELElBQUksT0FBTyxHQUEwQixHQUFHLENBQUM7d0JBQ3pDLElBQUksUUFBUSxHQUEyQixPQUFPLENBQUMsbUJBQW1CLENBQUM7d0JBRW5FLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSzs0QkFDN0IsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUMvQyxDQUFDLENBQUMsQ0FBQzt3QkFDSCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxPQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMscUJBQXFCLEtBQUssTUFBTSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzVGLE1BQU0sQ0FBQyxTQUFTLENBQUM7d0JBQ3JCLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ0osTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLE9BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsS0FBSyxNQUFNLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0YsQ0FBQztvQkFDTCxDQUFDLENBQUM7eUJBQ0csS0FBSyxDQUFDLENBQUUsR0FBRzt3QkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNyQixDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO1lBRUwsQ0FBQztZQXpKRDtnQkFBQyxpQkFBVSxFQUFFOztxQ0FBQTtZQUNiLHlEQXdKQyxDQUFBIiwiZmlsZSI6IlNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gICAgIGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0h0dHAsIFJlc3BvbnNlfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlXCI7XG5pbXBvcnQge05nRm9ybX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbmV4cG9ydCBlbnVtIHNleGVFbnVtIHtNLCBGfVxuZXhwb3J0IGludGVyZmFjZSBQYXRpZW50SW50ZXJmYWNlIHtcbiAgICBwcmVub20gICAgICAgICAgICAgICAgICA6IHN0cmluZztcbiAgICBub20gICAgICAgICAgICAgICAgICAgICA6IHN0cmluZztcbiAgICBzZXhlICAgICAgICAgICAgICAgICAgICA6IHNleGVFbnVtO1xuICAgIG51bWVyb1NlY3VyaXRlU29jaWFsZSAgIDogc3RyaW5nO1xuICAgIGFkcmVzc2UgICAgICAgICAgICAgICAgIDoge1xuICAgICAgICB2aWxsZSAgICAgICA6IHN0cmluZztcbiAgICAgICAgY29kZVBvc3RhbCAgOiBudW1iZXI7XG4gICAgICAgIHJ1ZSAgICAgICAgIDogc3RyaW5nO1xuICAgICAgICBudW1lcm8gICAgICA6IHN0cmluZztcbiAgICAgICAgZXRhZ2UgICAgICAgOiBzdHJpbmc7XG4gICAgfTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSW5maXJtaWVySW50ZXJmYWNlIHtcbiAgICBpZCAgICAgICAgICA6IHN0cmluZztcbiAgICBwcmVub20gICAgICA6IHN0cmluZztcbiAgICBub20gICAgICAgICA6IHN0cmluZztcbiAgICBwaG90byAgICAgICA6IHN0cmluZztcbiAgICBwYXRpZW50cyAgICA6IFBhdGllbnRJbnRlcmZhY2VbXTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgQ2FiaW5ldEludGVyZmFjZSB7XG4gICAgaW5maXJtaWVycyAgICAgICAgICA6IEluZmlybWllckludGVyZmFjZVtdO1xuICAgIHBhdGllbnRzTm9uQWZmZWN0ZXMgOiBQYXRpZW50SW50ZXJmYWNlICBbXTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZpY2VDYWJpbmV0TWVkaWNhbCB7XG4gICAgcHVibGljIGNhYmluZXQ7XG4gICAgcHVibGljIGNhYmluZXRBZHJlc3NlO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHApIHt9IC8vIExlIHNlcnZpY2UgQ2FiaW5ldE1lZGljYWwgYSBiZXNvaW4gZHUgc2VydmljZSBIdHRwXG4gICAgZ2V0RGF0YSggdXJsOiBzdHJpbmcgKSA6IFByb21pc2U8Q2FiaW5ldEludGVyZmFjZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodXJsKS50b1Byb21pc2UoKS50aGVuKCAocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGNhYmluZXQgOiBDYWJpbmV0SW50ZXJmYWNlID0ge1xuICAgICAgICAgICAgICAgIGluZmlybWllcnMgICAgICAgICAgOiBbXSxcbiAgICAgICAgICAgICAgICBwYXRpZW50c05vbkFmZmVjdGVzIDogW11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICAgICAgbGV0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcocmVzLnRleHQoKSwgXCJ0ZXh0L3htbFwiKTtcbiAgICAgICAgICAgIGxldCBhZHJlc3NlRWxlbWVudCA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKFwiY2FiaW5ldCBhZHJlc3NlXCIpWzBdO1xuICAgICAgICAgICAgdGhpcy5jYWJpbmV0QWRyZXNzZSA9IHtcbiAgICAgICAgICAgICAgICBcIm51bWVyb1wiICAgIDogYWRyZXNzZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcIm51bcOpcm9cIikgICAgLnRleHRDb250ZW50LFxuICAgICAgICAgICAgICAgIFwicnVlXCIgICAgICAgOiBhZHJlc3NlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwicnVlXCIpICAgICAgIC50ZXh0Q29udGVudCxcbiAgICAgICAgICAgICAgICBcInZpbGxlXCIgICAgIDogYWRyZXNzZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcInZpbGxlXCIpICAgICAudGV4dENvbnRlbnQsXG4gICAgICAgICAgICAgICAgXCJjb2RlUG9zdGFsXCI6IGFkcmVzc2VFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjb2RlUG9zdGFsXCIpLnRleHRDb250ZW50XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgQXJyYXkuZnJvbShkb2MucXVlcnlTZWxlY3RvckFsbChcImluZmlybWllclwiKSkuZm9yRWFjaCgoZWw6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGluZmlybWllciA9IHRoaXMucGFyc2VJbmZpcm1pZXIoZWwpO1xuICAgICAgICAgICAgICAgIGNhYmluZXQuaW5maXJtaWVycy5wdXNoKGluZmlybWllcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIEFycmF5LmZyb20oZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoXCJwYXRpZW50XCIpKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBwYXRpZW50ID0gdGhpcy5wYXJzZVBhdGllbnQoZWwpO1xuICAgICAgICAgICAgICAgIGlmICghcGF0aWVudC5pZCkge1xuICAgICAgICAgICAgICAgICAgICBjYWJpbmV0LnBhdGllbnRzTm9uQWZmZWN0ZXMucHVzaChwYXRpZW50LnBhdGllbnQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmYgOiBJbmZpcm1pZXJJbnRlcmZhY2VbXSA9IGNhYmluZXQuaW5maXJtaWVycy5maWx0ZXIoKGVsKSA9PiB7cmV0dXJuIGVsLmlkID09PSBwYXRpZW50LmlkO30pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJbCBuJ2V4aXN0ZSBhdWN1biBpbmZpcm1pZXIgZGUgY2V0IGlkLCBvcMOpcmF0aW9uIGltcG9zc2libGUuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZlswXS5wYXRpZW50cy5wdXNoKHBhdGllbnQucGF0aWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklsIGV4aXN0ZSBwbHVzaWV1cnMgaW5maXJtaWVycyBkZSBjZXQgaWQsIG9ww6lyYXRpb24gaW1wb3NzaWJsZS5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuY2FiaW5ldCA9IGNhYmluZXQ7XG4gICAgICAgICAgICByZXR1cm4gY2FiaW5ldDtcbiAgICAgICAgfSk7IC8vIEZpbiBkZSB0aGlzLl9odHRwLmdldFxuICAgIH1cblxuICAgIGFmZmVjdGVyUGF0aWVudChpZFBhdGllbnQ6IHN0cmluZywgaWRJbmY6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KFwiL2FmZmVjdGF0aW9uXCIsIHtpbmZpcm1pZXI6IGlkSW5mLCBwYXRpZW50OiBpZFBhdGllbnR9KS50b1Byb21pc2UoKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxlIHBhdGllbnQgYSDDqXTDqSBhZmZlY3TDqVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmUgZXJyZXVyIHMnZXN0IHByb2R1aXRlIDogXCIgKyByZXMuc3RhdHVzICsgXCIgOiBcIiArIHJlcy5zdGF0dXNUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBhcnNlSW5maXJtaWVyKGVsIDogRWxlbWVudCkgOiBJbmZpcm1pZXJJbnRlcmZhY2Uge1xuICAgICAgICBsZXQgaWQgICAgICA9IGVsLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgICBsZXQgbm9tICAgICA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCJub21cIikgICAudGV4dENvbnRlbnQgfHwgXCJcIjtcbiAgICAgICAgbGV0IHByZW5vbSAgPSBlbC5xdWVyeVNlbGVjdG9yKFwicHLDqW5vbVwiKS50ZXh0Q29udGVudCB8fCBcIlwiO1xuICAgICAgICBsZXQgcGhvdG8gICA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCJwaG90b1wiKSAudGV4dENvbnRlbnQgfHwgXCJcIjtcblxuICAgICAgICBsZXQgaW5maXJtaWVyIDogSW5maXJtaWVySW50ZXJmYWNlID0gPEluZmlybWllckludGVyZmFjZT57XG4gICAgICAgICAgICBpZCAgICAgIDogaWQsXG4gICAgICAgICAgICBub20gICAgIDogbm9tLFxuICAgICAgICAgICAgcHJlbm9tICA6IHByZW5vbSxcbiAgICAgICAgICAgIHBob3RvICAgOiBwaG90byxcbiAgICAgICAgICAgIHBhdGllbnRzOiBbXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gaW5maXJtaWVyO1xuICAgIH1cblxuICAgIHBhcnNlUGF0aWVudChlbCA6IEVsZW1lbnQpIHtcbiAgICAgICAgbGV0IGlkICAgICAgICAgID0gZWwuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gICAgICAgIGxldCBub20gICAgICAgICA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCJub21cIikgICAgICAgICAgICAgICAudGV4dENvbnRlbnQgfHwgXCJcIjtcbiAgICAgICAgbGV0IHByZW5vbSAgICAgID0gZWwucXVlcnlTZWxlY3RvcihcInByw6lub21cIikgICAgICAgICAgICAudGV4dENvbnRlbnQgfHwgXCJcIjtcbiAgICAgICAgbGV0IHNleGUgICAgICAgID0gdGhpcy5nZXRTZXhlKGVsLnF1ZXJ5U2VsZWN0b3IoXCJzZXhlXCIpIC50ZXh0Q29udGVudCl8fCBcIlwiO1xuICAgICAgICBsZXQgbmFpc3NhbmNlICAgPSBlbC5xdWVyeVNlbGVjdG9yKFwibmFpc3NhbmNlXCIpICAgICAgICAgLnRleHRDb250ZW50IHx8IFwiXCI7XG4gICAgICAgIGxldCBudW3DqXJvICAgICAgPSBlbC5xdWVyeVNlbGVjdG9yKFwibnVtw6lyb1wiKSAgICAgICAgICAgIC50ZXh0Q29udGVudCB8fCBcIlwiO1xuICAgICAgICBsZXQgYWRyZXNzZSAgICAgPSB0aGlzLnBhcnNlQWRyZXNzZShlbC5xdWVyeVNlbGVjdG9yKFwiYWRyZXNzZVwiKSkgICAgfHwge307XG4gICAgICAgIGxldCBwYXRpZW50IDogUGF0aWVudEludGVyZmFjZSA9IDxQYXRpZW50SW50ZXJmYWNlPntcbiAgICAgICAgICAgIGlkICAgICAgICAgICAgICAgICAgICAgIDogaWQsXG4gICAgICAgICAgICBub20gICAgICAgICAgICAgICAgICAgICA6IG5vbSxcbiAgICAgICAgICAgIHByZW5vbSAgICAgICAgICAgICAgICAgIDogcHJlbm9tLFxuICAgICAgICAgICAgc2V4ZSAgICAgICAgICAgICAgICAgICAgOiBzZXhlLFxuICAgICAgICAgICAgbmFpc3NhbmNlICAgICAgICAgICAgICAgOiBuYWlzc2FuY2UsXG4gICAgICAgICAgICBudW1lcm9TZWN1cml0ZVNvY2lhbGUgICA6IG51bcOpcm8sXG4gICAgICAgICAgICBhZHJlc3NlICAgICAgICAgICAgICAgICA6IGFkcmVzc2UsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChlbC5xdWVyeVNlbGVjdG9yKFwidmlzaXRlXCIpLmdldEF0dHJpYnV0ZShcImludGVydmVuYW50XCIpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcGF0aWVudCA6IHBhdGllbnQsXG4gICAgICAgICAgICAgICAgaWQgICAgICA6IGVsLnF1ZXJ5U2VsZWN0b3IoXCJ2aXNpdGVcIikuZ2V0QXR0cmlidXRlKFwiaW50ZXJ2ZW5hbnRcIilcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHBhdGllbnQgOiBwYXRpZW50LFxuICAgICAgICAgICAgICAgIGlkICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJzZUFkcmVzc2UoZWwgOiBFbGVtZW50KSA6IGFueSB7XG4gICAgICAgIGxldCB2aWxsZSAgICAgICA9IChlbC5xdWVyeVNlbGVjdG9yKFwidmlsbGVcIikpICAgICAgID8gZWwucXVlcnlTZWxlY3RvcihcInZpbGxlXCIpICAgICAudGV4dENvbnRlbnQgOiBcIlwiO1xuICAgICAgICBsZXQgY29kZVBvc3RhbCAgPSAoZWwucXVlcnlTZWxlY3RvcihcImNvZGVQb3N0YWxcIikpICA/IGVsLnF1ZXJ5U2VsZWN0b3IoXCJjb2RlUG9zdGFsXCIpLnRleHRDb250ZW50IDogXCJcIjtcbiAgICAgICAgbGV0IHJ1ZSAgICAgICAgID0gKGVsLnF1ZXJ5U2VsZWN0b3IoXCJydWVcIikpICAgICAgICAgPyBlbC5xdWVyeVNlbGVjdG9yKFwicnVlXCIpICAgICAgIC50ZXh0Q29udGVudCA6IFwiXCI7XG4gICAgICAgIGxldCBudW1lcm8gICAgICA9IChlbC5xdWVyeVNlbGVjdG9yKFwibnVtw6lyb1wiKSkgICAgICA/IGVsLnF1ZXJ5U2VsZWN0b3IoXCJudW3DqXJvXCIpICAgIC50ZXh0Q29udGVudCA6IFwiXCI7XG4gICAgICAgIGxldCBldGFnZSAgICAgICA9IChlbC5xdWVyeVNlbGVjdG9yKFwiw6l0YWdlXCIpKSAgICAgICA/IGVsLnF1ZXJ5U2VsZWN0b3IoXCLDqXRhZ2VcIikgICAgIC50ZXh0Q29udGVudCA6IG51bGw7XG5cbiAgICAgICAgbGV0IGFkcmVzc2UgPSB7XG4gICAgICAgICAgICB2aWxsZSAgICAgICA6IHZpbGxlLFxuICAgICAgICAgICAgY29kZVBvc3RhbCAgOiBjb2RlUG9zdGFsLFxuICAgICAgICAgICAgcnVlICAgICAgICAgOiBydWUsXG4gICAgICAgICAgICBudW1lcm8gICAgICA6IG51bWVybyxcbiAgICAgICAgICAgIGV0YWdlICAgICAgIDogZXRhZ2VcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gYWRyZXNzZTtcbiAgICB9XG5cbiAgICBnZXRTZXhlKHNleGUgOiBzdHJpbmcpIDogc2V4ZUVudW0ge1xuICAgICAgICBpZiAoc2V4ZSA9PT0gXCJNXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXhlRW51bS5NO1xuICAgICAgICB9IGVsc2UgaWYgKHNleGUgPT09IFwiRlwiKVxuICAgICAgICAgICAgcmV0dXJuIHNleGVFbnVtLkY7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIEFqb3V0ZXJQYXRpZW50IChmOiBOZ0Zvcm0pIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IGNvbnRyb2xzID0gZi52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCggXCIuL2FkZFBhdGllbnRcIiwgY29udHJvbHMgKS50b1Byb21pc2UoKS50aGVuKCAoKSA9PiBjb250cm9scyApO1xuICAgIH1cblxuICAgIGdldFBhdGllbnRCeUlkKG51bWVybzogc3RyaW5nKTogUHJvbWlzZTxQYXRpZW50SW50ZXJmYWNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERhdGEoXCIvZGF0YS9jYWJpbmV0SW5maXJtaWVyLnhtbFwiKS50aGVuKCggcmVzICkgPT4ge1xuICAgICAgICAgICAgbGV0IGNhYmluZXQgICAgIDogQ2FiaW5ldEludGVyZmFjZSA9IHJlcztcbiAgICAgICAgICAgIGxldCBwYXRpZW50cyAgICA6IFBhdGllbnRJbnRlcmZhY2VbXSA9IGNhYmluZXQucGF0aWVudHNOb25BZmZlY3RlcztcblxuICAgICAgICAgICAgY2FiaW5ldC5pbmZpcm1pZXJzLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgcGF0aWVudHMgPSBwYXRpZW50cy5jb25jYXQodmFsdWUucGF0aWVudHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAocGF0aWVudHMuZmlsdGVyKCh2YWx1ZSkgPT4ge3JldHVybiB2YWx1ZS5udW1lcm9TZWN1cml0ZVNvY2lhbGUgPT09IG51bWVybzt9KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF0aWVudHMuZmlsdGVyKCh2YWx1ZSkgPT4ge3JldHVybiB2YWx1ZS5udW1lcm9TZWN1cml0ZVNvY2lhbGUgPT09IG51bWVybzt9KVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoIGVyciApID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6IiJ9

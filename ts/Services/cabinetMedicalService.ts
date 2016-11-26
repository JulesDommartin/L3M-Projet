import {Injectable}     from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {NgForm} from "@angular/forms";
import {NotificationsService} from "angular2-notifications";
import { MapsAPILoader } from "angular2-google-maps/core";

export enum sexeEnum {M, F}
type typeAdresse = {
    ville       : string;
    codePostal  : number;
    rue         : string;
    numero      : string;
    etage       : string;
    latlng      : google.maps.LatLng
};

export interface PatientInterface {
    prenom                  : string;
    nom                     : string;
    sexe                    : sexeEnum;
    numeroSecuriteSociale   : string;
    adresse                 : typeAdresse;
}
export interface InfirmierInterface {
    id          : string;
    prenom      : string;
    nom         : string;
    photo       : string;
    patients    : PatientInterface[];
}
export interface CabinetInterface {
    infirmiers          : InfirmierInterface[];
    patientsNonAffectes : PatientInterface  [];
}

type fctPromAd = () => Promise<any>;

@Injectable()
export class ServiceCabinetMedical {
    public cabinet;
    public cabinetAdresse;
    public Promesse = Promise.resolve();
    private geocoder : google.maps.Geocoder;
    constructor(private _http: Http, public _service : NotificationsService, private _load : MapsAPILoader) {

    } // Le service CabinetMedical a besoin du service Http
    getData( url: string ) : Promise<CabinetInterface> {
        return this._http.get(url).toPromise().then( (res: Response) : Promise<CabinetInterface> => {
            return this._load.load().then( () => {
                this.geocoder = new google.maps.Geocoder();
            }).then( () => {
                    let cabinet : CabinetInterface = {
                        infirmiers          : [],
                        patientsNonAffectes : []
                    };
                    let parser = new DOMParser();
                    let doc = parser.parseFromString(res.text(), "text/xml");
                    let adresseElement = doc.querySelectorAll("cabinet adresse")[0];
                    this.cabinetAdresse = {
                        "numero"    : adresseElement.querySelector("numéro")    .textContent,
                        "rue"       : adresseElement.querySelector("rue")       .textContent,
                        "ville"     : adresseElement.querySelector("ville")     .textContent,
                        "codePostal": adresseElement.querySelector("codePostal").textContent
                    };
                    Array.from(doc.querySelectorAll("infirmier")).forEach((el: HTMLElement) => {
                        let infirmier = this.parseInfirmier(el);
                        cabinet.infirmiers.push(infirmier);
                    });
                    Array.from(doc.querySelectorAll("patient")).forEach((el) => {
                        let data = this.parsePatient(el);
                        this.Promesse = this.Promesse.then( data.fctPromesse, data.fctPromesse );
                        if (!data.intervenantId) {
                            cabinet.patientsNonAffectes.push(data.patient);
                        } else {
                            let inf : InfirmierInterface = cabinet.infirmiers.find( inf => inf.id === data.intervenantId );
                            if (!inf) {
                                console.error("Il n'existe aucun infirmier de cet id, opération impossible.");
                            } else {
                                inf.patients.push(data.patient);
                            }
                        }
                    });
                    this.cabinet = cabinet;
                    return cabinet;
            });
        }); // Fin de this._http.get
    }

    affecterPatient(idPatient: string, idInf: string) {
        return this._http.post("/affectation", {infirmier: idInf, patient: idPatient}).toPromise().then((res) => {
            if (res.status === 200) {
                console.log("Le patient a été affecté");
                this._service.success("Succès", "Le patient a été affecté");
            } else {
                console.log("Une erreur s'est produite : " + res.status + " : " + res.statusText);
                this._service.error("Erreur", res.status + " : " + res.statusText);
            }
        })
        .catch((err) => {
            console.log(err);
            this._service.error("Erreur", err);
        });
    }

    parseInfirmier(el : Element) : InfirmierInterface {
        let id      = el.getAttribute("id");
        let nom     = el.querySelector("nom")   .textContent || "";
        let prenom  = el.querySelector("prénom").textContent || "";
        let photo   = el.querySelector("photo") .textContent || "";

        let infirmier : InfirmierInterface = <InfirmierInterface>{
            id      : id,
            nom     : nom,
            prenom  : prenom,
            photo   : photo,
            patients: []
        };
        return infirmier;
    }

    parsePatient(el : Element) : {patient: PatientInterface, intervenantId: string, fctPromesse: fctPromAd} {
        let nom         = el.querySelector("nom")               .textContent    || "";
        let prenom      = el.querySelector("prénom")            .textContent    || "";
        let sexe        = this.getSexe(el.querySelector("sexe") .textContent);
        let numéro      = el.querySelector("numéro")            .textContent    || "";
        let adresse     = this.parseAdresse(el.querySelector("adresse"));
        let patient : PatientInterface = {
            nom                     : nom,
            prenom                  : prenom,
            sexe                    : sexe,
            numeroSecuriteSociale   : numéro,
            adresse                 : adresse,
        };
        let result;
        if (el.querySelector("visite").getAttribute("intervenant") !== undefined) {
            result = {
                patient         : patient,
                intervenantId   : el.querySelector("visite").getAttribute("intervenant"),
                fctPromesse     : () => this.geocodeP(patient)
            };
        } else {
            result = {
                patient         : patient,
                intervenantId   : undefined,
                fctPromesse     : () => this.geocodeP(patient)
            };
        }
        return result;
    }
    geocodeP(patient: PatientInterface) : Promise<any> {
        let adresse : string =  patient.adresse.ville + " "
            + patient.adresse.rue + " "
            + patient.adresse.codePostal + " "
            + patient.adresse.numero;
        return new Promise( (resolve, reject) => {
            this.geocoder.geocode({"address": adresse},
                (results : google.maps.GeocoderResult[], status : google.maps.GeocoderStatus) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        // Mise à jour pour le patient
                        patient.adresse.latlng = results[0].geometry.location;
                        resolve(results);
                    } else {
                        reject(status);
                    }
                }
            );
        });
    }
    parseAdresse(el : Element) : typeAdresse {
        let ville       = (el.querySelector("ville"))       ? el.querySelector("ville")     .textContent : "";
        let codePostal  = (el.querySelector("codePostal"))  ? el.querySelector("codePostal").textContent : "";
        let rue         = (el.querySelector("rue"))         ? el.querySelector("rue")       .textContent : "";
        let numero      = (el.querySelector("numéro"))      ? el.querySelector("numéro")    .textContent : "";
        let etage       = (el.querySelector("étage"))       ? el.querySelector("étage")     .textContent : null;

        return {
            ville       : ville,
            codePostal  :+codePostal,
            rue         : rue,
            numero      : numero,
            etage       : etage,
            latlng      : undefined
        };
    }

    getSexe(sexe : string) : sexeEnum {
        if (sexe === "M") {
            return sexeEnum.M;
        } else if (sexe === "F") {
            return sexeEnum.F;
        } else
            return null;
    }

    AjouterPatient (f: NgForm) : Promise<any> {
        let controls = f.value;
        return this._http.post( "./addPatient", controls ).toPromise()
            .then( () => {
                return controls;
            } )
            .catch( (err) => {
                return err;
            });
    }

    getPatientById(numero: string): Promise<PatientInterface> {
        return this.getData("/data/cabinetInfirmier.xml").then(( res ) => {
            let cabinet     : CabinetInterface = res;
            let patients    : PatientInterface[] = cabinet.patientsNonAffectes;

            cabinet.infirmiers.forEach((value) => {
                patients = patients.concat(value.patients);
            });
            if (patients.filter((value) => {return value.numeroSecuriteSociale === numero;}).length === 0) {
                return undefined;
            } else {
                return patients.filter((value) => {return value.numeroSecuriteSociale === numero;})[0];
            }
        })
            .catch(( err ) => {
                console.log(err);
            });
    }

}

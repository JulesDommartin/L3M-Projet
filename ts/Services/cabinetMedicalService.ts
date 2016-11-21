import {Injectable}     from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {NgForm} from "@angular/forms";
import {NotificationsService} from "angular2-notifications";

export enum sexeEnum {M, F}
export interface PatientInterface {
    prenom                  : string;
    nom                     : string;
    sexe                    : sexeEnum;
    numeroSecuriteSociale   : string;
    adresse                 : {
        ville       : string;
        codePostal  : number;
        rue         : string;
        numero      : string;
        etage       : string;
    };
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

@Injectable()
export class ServiceCabinetMedical {
    public cabinet;
    public cabinetAdresse;
    constructor(private _http: Http, public _service : NotificationsService) {} // Le service CabinetMedical a besoin du service Http
    getData( url: string ) : Promise<CabinetInterface> {
        return this._http.get(url).toPromise().then( (res: Response) => {
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
                let patient = this.parsePatient(el);
                if (!patient.id) {
                    cabinet.patientsNonAffectes.push(patient.patient);
                } else {
                    let inf : InfirmierInterface[] = cabinet.infirmiers.filter((el) => {return el.id === patient.id;});
                    if (inf.length === 0) {
                        console.log("Il n'existe aucun infirmier de cet id, opération impossible.");
                    } else if (inf.length === 1) {
                        inf[0].patients.push(patient.patient);
                    } else {
                        console.log("Il existe plusieurs infirmiers de cet id, opération impossible.");
                    }
                }
            });
            this.cabinet = cabinet;
            return cabinet;
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

    parsePatient(el : Element) {
        let id          = el.getAttribute("id");
        let nom         = el.querySelector("nom")               .textContent    || "";
        let prenom      = el.querySelector("prénom")            .textContent    || "";
        let sexe        = this.getSexe(el.querySelector("sexe") .textContent);
        let naissance   = el.querySelector("naissance")         .textContent    || "";
        let numéro      = el.querySelector("numéro")            .textContent    || "";
        let adresse     = this.parseAdresse(el.querySelector("adresse"))        || {};
        let patient : PatientInterface = <PatientInterface>{
            id                      : id,
            nom                     : nom,
            prenom                  : prenom,
            sexe                    : sexe,
            naissance               : naissance,
            numeroSecuriteSociale   : numéro,
            adresse                 : adresse,
        };
        if (el.querySelector("visite").getAttribute("intervenant") !== undefined) {
            return {
                patient : patient,
                id      : el.querySelector("visite").getAttribute("intervenant")
            };
        } else {
            return {
                patient : patient,
                id      : undefined
            };
        }
    }

    parseAdresse(el : Element) : any {
        let ville       = (el.querySelector("ville"))       ? el.querySelector("ville")     .textContent : "";
        let codePostal  = (el.querySelector("codePostal"))  ? el.querySelector("codePostal").textContent : "";
        let rue         = (el.querySelector("rue"))         ? el.querySelector("rue")       .textContent : "";
        let numero      = (el.querySelector("numéro"))      ? el.querySelector("numéro")    .textContent : "";
        let etage       = (el.querySelector("étage"))       ? el.querySelector("étage")     .textContent : null;

        let adresse = {
            ville       : ville,
            codePostal  : codePostal,
            rue         : rue,
            numero      : numero,
            etage       : etage
        };

        return adresse;
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

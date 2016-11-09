import {Component} from "@angular/core";

const htmlTemplate = `
    <div>
        <h1 alx-dragdrop>IHM de la secrétaire</h1>
        <router-outlet></router-outlet>
    </div>
`;
@Component({
    selector	: "app-cabinet",
    template	: htmlTemplate
})
export class ComposantApp {
}


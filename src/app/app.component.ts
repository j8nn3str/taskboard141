import { Component } from '@angular/core';
import * as asanaSecrets from '../configurations/asana/private/auth'

declare var require: any; // not having this will result in an error

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'taskboard141';

  results: Object;
  ngOnInit() {
    this.getResults()
  }

  getResults() {
    const asana = require('node_modules/asana/dist/asana-min.js')
    const client = asana.Client.create().useAccessToken(asanaSecrets.my_access_token);

    client.tasks.findByProject(asanaSecrets.projectID, 'opt_expand=memberships,opt_fields=resource_subtype').then(collection => {
      collection.fetch(200).then((tasks: any) => {
        this.results = tasks;
        console.log(this.results)
      });
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {

  data: any;

  constructor(public http: HttpClient) {

  }

  load() {

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('assets/data/questions.json')
 //       .map((res: Response) => res)
        .subscribe(function(data) {
          console.log(data.questions);
          this.data = data.questions;
          resolve(this.data);
      });
    });

  }

}

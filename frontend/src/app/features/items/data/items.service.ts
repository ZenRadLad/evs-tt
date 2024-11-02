import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { delay, Observable } from "rxjs";
import { Item } from "./item.model";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ItemsService {
  readonly http = inject(HttpClient);
  readonly itemsApiUrl = `${environment.API_URL}/items`;

  getItems(): Observable<Item[]> {
    return this.http
      .get<Item[]>(this.itemsApiUrl)
      .pipe
      // test loading data UI
      // delay(5000) // 5 second delay
      ();
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsApiUrl, item);
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "./item.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ItemsService {
  readonly http = inject(HttpClient);
  readonly itemsApiUrl = `${environment.API_URL}/items`;

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.itemsApiUrl}`);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsApiUrl, item);
  }
}

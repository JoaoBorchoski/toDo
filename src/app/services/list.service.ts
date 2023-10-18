import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../interfaces/list.interface';
import { PoNotificationService } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  baseURL = 'http://localhost:3001/toDo';

  constructor(
    private http: HttpClient,
    public poNotification: PoNotificationService
  ) {}

  getList(): Observable<List[]> {
    return this.http.get<List[]>(this.baseURL);
  }

  newItem(item: List): Observable<List> {
    return this.http.post<List>(this.baseURL, item);
  }

  getItemById(id: number) {
    const url = `${this.baseURL}/${id}`;
    return this.http.get<List>(url);
  }

  deleteItem(id: number) {
    const url = `${this.baseURL}/${id}`;
    return this.http.delete<List>(url);
  }

  update(item: List): Observable<List> {
    const url = `${this.baseURL}/${item.id}`;

    return this.http.put<List>(url, item);
  }
}

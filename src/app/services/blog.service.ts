import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"

@Injectable({
    providedIn: 'root',
})
export class BlogService {
    constructor(private http: HttpClient) { }

    getBlogListByAdmin(page: number | 1, limit: number | 10,): Observable<any> {
        return this.http.get<any>('/blog/list', {
            params: {
                page: page,
                limit: limit,
            }
        })
    }
}
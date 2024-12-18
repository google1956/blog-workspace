import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"

@Injectable({
    providedIn: 'root',
})
export class BlogService {
    constructor(private http: HttpClient) { }

    getBlogView(page: number | 1, limit: number | 10,): Observable<any> {
        return this.http.get<any>('/blog/view', {
            params: {
                // page: page,
                // limit: limit,
            }
        })
    }

    getBlogListByAdmin(page: number | 1, limit: number | 10,): Observable<any> {
        return this.http.get<any>('/blog/list', {
            params: {
                page: page,
                limit: limit,
            }
        })
    }

    getBlogById(blogId: string): Observable<any> {
        return this.http.get<any>(`/blog/id/${blogId}`)
    }

    createBlog(payload: any): Observable<any> {
        return this.http.post<any>('/blog/create', payload)
    }

    updateBlog(blogId: string, payload: any): Observable<any> {
        return this.http.put<any>(`/blog/update/${blogId}`, payload)
    }

    updateStatus(blogId: string, payload: any): Observable<any> {
        return this.http.put<any>(`/blog/status/${blogId}`, payload)
    }

    getBlogDetails(blogId: string): Observable<any> {
        return this.http.get<any>(`/blog/details/id/${blogId}`)
    }

    updateBlogDetails(blogId: string, payload: any): Observable<any> {
        return this.http.put<any>(`/blog/details/${blogId}`, payload)
    }
}
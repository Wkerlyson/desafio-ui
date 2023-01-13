import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Upload, upload } from '../utils/upload';

@Injectable({ providedIn: 'root' })
export class UploadService {

    endpoint = "http://localhost:8080/v1/agente";

    constructor(private http: HttpClient) { }

    upload(file: File): Observable<Upload> {
        const data = new FormData();
        data.append('file', file);

        return this.http
            .post(this.endpoint, data, {
                reportProgress: true,
                observe: 'events',
            })
            .pipe(upload(), shareReplay());
    }
}
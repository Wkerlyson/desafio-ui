import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Upload, upload } from './upload';

@Injectable({ providedIn: 'root' })
export class UploadService {
    constructor(private http: HttpClient) { }

    upload(file: File): Observable<Upload> {
        const data = new FormData();
        data.append('file', file);
        return this.http
            .post('http://localhost:8080/v1/agente', data, {
                reportProgress: true,
                observe: 'events',
            })
            .pipe(upload());
    }
}
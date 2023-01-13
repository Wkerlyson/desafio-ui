import {
    HttpEvent,
    HttpEventType,
    HttpProgressEvent,
    HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

function isHttpResponse<T>(event: HttpEvent<T>): event is HttpResponse<T> {
    return event.type === HttpEventType.Response;
}

export interface Upload {
    state: 'PENDING' | 'DONE'
}


export function upload(): (source: Observable<HttpEvent<any>>
) => Observable<Upload> {
    const initialState: Upload = { state: 'PENDING' };
    const reduceState = (upload: Upload, event: HttpEvent<any>): Upload => {
        if (isHttpResponse(event)) {
            return {
                state: 'DONE'
            };
        }
        return upload;
    };
    return (source) => source.pipe(scan(reduceState, initialState));
}
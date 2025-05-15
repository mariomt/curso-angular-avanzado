import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Location } from '@shared/models/location.model';

@Injectable({
  providedIn: 'root',
})
export class GeolocalitationService {
  private http = inject(HttpClient);

  getNearLocations(params?: { origin?: string }) {
    const url = new URL(`${environment.apiUrl}/api/v1/locations`);
    if (params && params.origin) {
      url.searchParams.set('origin', params.origin);
    }

    return this.http.get<Location[]>(url.toString());
  }
}

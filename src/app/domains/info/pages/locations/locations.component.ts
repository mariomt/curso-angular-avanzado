import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GeolocalitationService } from '@shared/services/geolocalitation.service';

@Component({
  selector: 'app-locations',
  imports: [],
  templateUrl: './locations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LocationsComponent {
  $origin = signal('');

  private geolocationService = inject(GeolocalitationService);

  constructor() {
    afterNextRender(() => {
      navigator.geolocation.getCurrentPosition(position => {
        const origin = `${position.coords.latitude},${position.coords.longitude}`;
        this.$origin.set(origin);
      });
    });
  }

  locationResource = rxResource({
    request: () => ({
      origin: this.$origin(),
    }),
    loader: ({ request }) => this.geolocationService.getNearLocations(request),
  });
}

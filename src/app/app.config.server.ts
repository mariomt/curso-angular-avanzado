import {
  mergeApplicationConfig,
  ApplicationConfig,
  InjectionToken,
  inject,
  RESPONSE_INIT,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideServerRouting } from '@angular/ssr';

export const SERVER_RESPONSE = new InjectionToken<ResponseInit>(
  'SERVER_RESPONSE'
);

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    {
      provide: SERVER_RESPONSE,
      useFactory: () => {
        return inject(RESPONSE_INIT, { optional: true });
      },
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

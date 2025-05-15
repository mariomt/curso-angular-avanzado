import { inject, Injectable } from '@angular/core';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { environment } from '@env/environment';

export interface PageMetaData {
  title: string;
  description: string;
  image: string;
  url: string;
}

const defaultMetaData: PageMetaData = {
  title: 'Ng Store',
  description: 'Ng Store is a store for Ng products',
  image: '',
  url: environment.domain,
};

@Injectable({
  providedIn: 'root',
})
export class MetaTagsService {
  titleService = inject(Title);
  metaService = inject(Meta);

  updateMetaTags(metadata: Partial<PageMetaData>) {
    const dataToUpdate = {
      ...defaultMetaData,
      ...metadata,
    };

    const tags = this.generateMetaDefinitions(dataToUpdate);

    tags.forEach(tag => this.metaService.updateTag(tag));
    this.titleService.setTitle(dataToUpdate.title);
  }

  private generateMetaDefinitions(metaData: PageMetaData): MetaDefinition[] {
    return [
      {
        name: 'title',
        content: metaData.title,
      },
      {
        name: 'description',
        content: metaData.description,
      },
      {
        name: 'og:title',
        content: metaData.title,
      },
      {
        name: 'og:description',
        content: metaData.description,
      },
      {
        name: 'og:image',
        content: metaData.image,
      },
      {
        name: 'og:url',
        content: metaData.url,
      },
    ];
  }
}

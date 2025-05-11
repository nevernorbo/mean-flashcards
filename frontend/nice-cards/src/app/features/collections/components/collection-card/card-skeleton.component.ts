import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'collection-card-skeleton',
  imports: [LucideAngularModule],
  template: `
    <div
      class="mb-2 flex animate-pulse justify-between border-b border-skin-color-faintest pb-2"
    >
      <!-- Title -->
      <div class="flex flex-col">
        <h4 class="mb-1 h-7 w-64 rounded-md bg-skin-color-faintest"></h4>
        <div class="h-4 w-32 rounded-md bg-skin-color-faintest"></div>
      </div>
      <!-- Creator -->
      <div class="group py-1">
        <div class="size-8 rounded-full bg-skin-color-faintest"></div>
      </div>
    </div>

    <!-- Content overview -->
    <div class="flex animate-pulse flex-wrap gap-x-2 gap-y-1">
      <span class="h-5 w-64 rounded-full bg-skin-color-faintest"></span>
      <span class="h-5 w-12 rounded-full bg-skin-color-faintest"></span>
      <span class="h-5 w-32 rounded-full bg-skin-color-faintest"></span>
      <span class="h-5 w-6 rounded-full bg-skin-color-faintest"></span>
      <span class="h-5 w-16 rounded-full bg-skin-color-faintest"></span>
      <span class="h-5 w-9 rounded-full bg-skin-color-faintest"></span>
      <span class="h-5 w-36 rounded-full bg-skin-color-faintest"></span>
      <span class="h-5 w-64 rounded-full bg-skin-color-faintest"></span>
    </div>

    <!-- Footer -->
    <div
      class="mt-auto flex animate-pulse justify-between border-t border-skin-color-faintest pt-2"
    >
      <div
        class="flex h-7 w-10 rounded-full bg-skin-color-faintest px-2 py-1 text-sm"
      ></div>
    </div>
  `,
})
export class CollectionCardSkeletonComponent {}

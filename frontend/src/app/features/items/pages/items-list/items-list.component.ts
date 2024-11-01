import { Component, inject } from "@angular/core";
import { Item } from "../../models/item.model";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ItemCardComponent } from "../../components/item-card/item-card.component";

@Component({
  selector: "app-items-list",
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  templateUrl: "./items-list.component.html",
  styleUrl: "./items-list.component.scss",
})
export class ItemsListComponent {
  readonly router = inject(Router);

  // Temporary data - will come from store later
  items: Item[] = [
    {
      name: "Configuration Signal Store NGRX",
      status: "en cours",
    },
    {
      name: "Mise en place Standalone Components",
      status: "validé",
    },
    {
      name: "Implémentation Lazy Loading Routes",
      status: "en cours",
    },
    {
      name: "Configuration Server-Side Rendering",
      status: "en cours",
    },
    {
      name: "Optimisation Change Detection",
      status: "validé",
    },
    {
      name: "Intégration Reactive Forms",
      status: "en cours",
    },
    {
      name: "Configuration ESLint & Prettier",
      status: "validé",
    },
  ];

  navigateToAdd(): void {
    this.router.navigate(["/items/new"]);
  }
}

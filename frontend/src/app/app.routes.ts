import { Routes } from "@angular/router";
import { ItemsListComponent } from "./features/items/pages/items-list/items-list.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "items",
    pathMatch: "full",
  },
  {
    path: "items",
    children: [
      {
        path: "",
        component: ItemsListComponent,
        title: "Liste des items",
      },
      {
        path: "new",
        loadComponent: () =>
          import("./features/items/pages/items-add/items-add.component").then(
            (m) => m.ItemsAddComponent
          ),
        title: "Ajouter un item",
      },
    ],
  },
  {
    path: "**",
    redirectTo: "items",
  },
];

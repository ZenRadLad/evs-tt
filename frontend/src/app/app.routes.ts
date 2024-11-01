import { Routes } from "@angular/router";
import { ItemsListComponent } from "./features/items/pages/items-list/items-list.component";
import { ItemsAddComponent } from "./features/items/pages/items-add/items-add.component";

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
        component: ItemsAddComponent,
        title: "Nouveau item",
      },
    ],
  },
  {
    path: "**",
    redirectTo: "items",
  },
];

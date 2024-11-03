import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ItemCardComponent } from "../../ui/item-card/item-card.component";
import { ItemsStore } from "../../data";

@Component({
  selector: "app-items-list",
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  providers: [ItemsStore],
  templateUrl: "./items-list.component.html",
  styleUrl: "./items-list.component.scss",
})
export class ItemsListComponent implements OnInit {
  readonly router = inject(Router);
  readonly store = inject(ItemsStore);

  ngOnInit() {
    this.store.getItems();
  }

  navigateToAdd(): void {
    this.router.navigate(["/items/new"]);
  }
}

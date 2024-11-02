import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Item, ItemStatus } from "../../data";

@Component({
  selector: "app-item-card",
  standalone: true,
  imports: [],
  templateUrl: "./item-card.component.html",
  styleUrl: "./item-card.component.scss",
})
export class ItemCardComponent {
  @Input({ required: true }) item!: Item;

  getStatusClass(status: ItemStatus): string {
    return `status-${status.replace(" ", "")}`;
  }
}

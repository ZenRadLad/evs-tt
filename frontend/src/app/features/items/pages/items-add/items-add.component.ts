import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ItemsStore, Item } from "../../data";

@Component({
  selector: "app-items-add",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ItemsStore],
  templateUrl: "./items-add.component.html",
  styleUrl: "./items-add.component.scss",
})
export class ItemsAddComponent {
  readonly router = inject(Router);
  readonly store = inject(ItemsStore);

  itemForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    status: new FormControl("en cours", [Validators.required]),
  });

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.store.addItem(this.itemForm.value as Item);
    }
  }

  onCancel(): void {
    this.router.navigate(["/items"]);
  }
}

import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-items-add",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./items-add.component.html",
  styleUrl: "./items-add.component.scss",
})
export class ItemsAddComponent {
  readonly router = inject(Router);

  itemForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    status: new FormControl("en cours", [Validators.required]),
  });

  onSubmit(): void {
    if (this.itemForm.valid) {
      console.log(this.itemForm.value);
      // TODO: Add item through service/store
      this.router.navigate(["/items"]);
    }
  }

  onCancel(): void {
    this.router.navigate(["/items"]);
  }
}

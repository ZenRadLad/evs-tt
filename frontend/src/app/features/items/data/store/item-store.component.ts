import { computed, inject } from "@angular/core";
import {
  signalStore,
  withComputed,
  withMethods,
  withState,
  patchState,
  withHooks,
} from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { Item } from "../item.model";
import { ItemsService } from "../items.service";

interface ItemsState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

export const ItemsStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    hasItems: computed(() => store.items().length > 0),
    hasError: computed(() => store.error() !== null),
  })),
  withMethods((store, itemsService = inject(ItemsService)) => ({
    // get all items
    getItems: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),

        switchMap(() =>
          itemsService.getItems().pipe(
            tapResponse({
              next: (items: Item[]) =>
                patchState(store, {
                  items,
                  loading: false,
                }),
              error: (error: Error) =>
                patchState(store, {
                  error: error.message,
                  loading: false,
                }),
            })
          )
        )
      )
    ),

    // Add item method
    addItem: rxMethod<Item>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),

        switchMap((item) =>
          itemsService.addItem(item).pipe(
            tapResponse({
              next: (newItem: Item) =>
                patchState(store, (state) => ({
                  items: [...state.items, newItem],
                  loading: false,
                })),
              error: (error: Error) =>
                patchState(store, {
                  error: error.message,
                  loading: false,
                }),
            })
          )
        )
      )
    ),

    // Reset error
    resetError: () => patchState(store, { error: null }),
  })),
  withHooks((store) => ({
    onInit: () => store.getItems(),
  }))
);

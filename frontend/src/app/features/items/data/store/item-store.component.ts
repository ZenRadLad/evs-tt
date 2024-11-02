import { inject } from "@angular/core";
import {
  signalStore,
  withMethods,
  withState,
  patchState,
  withHooks,
} from "@ngrx/signals";
import {
  addEntity,
  setAllEntities,
  withEntities,
} from "@ngrx/signals/entities";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { Item } from "../item.model";
import { ItemsService } from "../items.service";

interface ItemsState {
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  loading: false,
  error: null,
};

export const ItemsStore = signalStore(
  // use entity pattern for better efficient CRUD
  withEntities<Item>(),

  withState<ItemsState>(initialState),

  withMethods((store, itemsService = inject(ItemsService)) => ({
    loadItems: rxMethod<void>(
      pipe(
        switchMap(() => {
          patchState(store, { loading: true, error: null });

          return itemsService.getItems().pipe(
            tapResponse({
              next: (items: Item[]) => {
                patchState(store, setAllEntities(items));
                patchState(store, { loading: false });
              },
              error: (error: Error) => {
                patchState(store, {
                  error: error.message,
                  loading: false,
                });
              },
            })
          );
        })
      )
    ),

    addItem: rxMethod<Item>(
      pipe(
        switchMap((item) => {
          patchState(store, { loading: true, error: null });

          return itemsService.addItem(item).pipe(
            tapResponse({
              next: (newItem: Item) => {
                patchState(store, addEntity(newItem));
                patchState(store, { loading: false });
              },
              error: (error: Error) => {
                patchState(store, {
                  error: error.message,
                  loading: false,
                });
              },
            })
          );
        })
      )
    ),

    resetError() {
      patchState(store, { error: null });
    },
  })),

  withHooks({
    onInit(store) {
      store.loadItems();
    },
    onDestroy(store) {
      store.resetError();
    },
  })
);

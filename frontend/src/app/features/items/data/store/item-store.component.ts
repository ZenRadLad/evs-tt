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
import { pipe, switchMap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { Item } from "../item.model";
import { ItemsService } from "../items.service";
import { Router } from "@angular/router";

interface ItemsState {
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  loading: false,
  error: null,
};

export const ItemsStore = signalStore(
  withEntities<Item>(),

  withState<ItemsState>(initialState),

  withMethods(
    (store, itemsService = inject(ItemsService), router = inject(Router)) => ({
      getItems: rxMethod<void>(
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
                  router.navigate(["/items"]);
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
    })
  ),
  withHooks({
    onDestroy(store) {
      store.resetError();
    },
  })
);

export type ItemStatus = "en cours" | "validé" | "refusé";

export interface Item {
  name: string;
  status: ItemStatus;
}

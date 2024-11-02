export type ItemStatus = "en cours" | "validé" | "refusé";

export interface Item {
  id: number;
  name: string;
  status: ItemStatus;
}

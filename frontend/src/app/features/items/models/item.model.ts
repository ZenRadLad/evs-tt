export type ItemStatus = "en cours" | "validé" | "refusé";

export interface Item {
  name: string;
  status: ItemStatus;
}

export const STATUS = {
  EN_COURS: "en cours" as ItemStatus,
  VALIDE: "validé" as ItemStatus,
  REFUSE: "refusé" as ItemStatus,
} as const;

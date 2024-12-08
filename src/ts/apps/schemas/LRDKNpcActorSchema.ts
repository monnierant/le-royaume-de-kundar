import fields = foundry.data.fields;
import { VitalStat, vitalStatSchema } from "./commonSchema";

export interface LRDKNpcActorSystem {
  type: string;
  health: VitalStat;
  note: string;
}

export const lrdkNpcActorSchema = {
  type: new fields.StringField({ initial: "character" }),

  health: new fields.SchemaField(vitalStatSchema()),

  note: new fields.StringField({ initial: "" }),
};

export type LRDKNpcActorSchema = typeof lrdkNpcActorSchema;

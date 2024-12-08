import { caracList, defaultLenght } from "../../constants";
import fields = foundry.data.fields;
import {
  Carac,
  caracSchema,
  Talent,
  talentSchema,
  VitalStat,
  vitalStatSchema,
} from "./commonSchema";

export interface LRDKActorSystem {
  type: string;
  health: VitalStat;
  talents: Talent[];
  caracs: Carac[];
  damagePhysical: string;
  damageMagical: string;
  inventory: string;
  age: number;
  theme: string;
}

export const lrdkActorSchema = {
  type: new fields.StringField({ initial: "character" }),

  health: new fields.SchemaField(vitalStatSchema()),

  talents: new fields.ArrayField(new fields.SchemaField(talentSchema()), {
    initial: Array(defaultLenght.talent).fill({
      name: "",
      description: "",
      level: 0,
    }),
  }),

  caracs: new fields.ArrayField(new fields.SchemaField(caracSchema()), {
    initial: caracList.map((carac) => ({
      name: carac,
      value: 0,
    })),
  }),

  damagePhysical: new fields.StringField({ initial: "" }),
  damageMagical: new fields.StringField({ initial: "" }),

  inventory: new fields.StringField({ initial: "" }),
  age: new fields.NumberField({ initial: 0 }),
  theme: new fields.StringField({ initial: "" }),
};

export type LRDKActorSchema = typeof lrdkActorSchema;

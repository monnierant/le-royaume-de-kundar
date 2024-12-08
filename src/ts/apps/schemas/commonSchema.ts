// The import = is important so that `CaracModBaseCarr` works.
import fields = foundry.data.fields;

export interface Talent {
  name: string;
  description: string;
  level: number;
}

export const talentSchema = () => ({
  name: new fields.StringField({ initial: "" }),
  description: new fields.StringField({ initial: "" }),
  level: new fields.NumberField({ initial: 0 }),
});

export interface VitalStat {
  current: number;
  modifier: number;
}

export const vitalStatSchema = () => ({
  current: new fields.NumberField({ initial: 0 }),
  modifier: new fields.NumberField({ initial: 0 }),
});

export interface Carac {
  name: string;
  value: number;
}

export const caracSchema = () => ({
  name: new fields.StringField({ initial: "" }),
  value: new fields.NumberField({ initial: 0 }),
});

import LRDKActor from "../documents/LRDKActor";
import { VitalStat } from "../schemas/commonSchema";
import { LRDKActorSystem } from "../schemas/LRDKActorSchema";

export const StatHelpers = {
  calculateActorVital: function (
    vital: VitalStat,
    force: number,
    cnst: number
  ) {
    return {
      current: vital.current,
      max: vital.modifier + force + cnst,
      percent: Math.round(
        (vital.current / (vital.modifier + force + cnst)) * 100
      ),
    };
  },

  calculateActorHealth: function (actor: LRDKActor) {
    const syst = actor.system as any as LRDKActorSystem;

    return StatHelpers.calculateActorVital(
      syst.health,
      syst.caracs[0].value,
      syst.caracs[1].value
    );
  },

  valueToModifier: function (value: number) {
    if (value >= 18) return 3;
    if (value >= 15) return 2;
    if (value >= 12) return 1;
    if (value >= 10) return 0;
    if (value >= 7) return -1;
    if (value >= 4) return -2;
    return -3;
  },
};

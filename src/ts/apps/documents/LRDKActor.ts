import { LRDKActorSystem } from "../schemas/LRDKActorSchema";

import LRDKActorRollDialog from "../dialogs/LRDKRollDialog";

import { StatHelpers } from "../helpers/StatHelpers";

export default class LRDKActor extends Actor {
  public constructor(data: any, context: any) {
    super(data, context);
  }

  public getTalent(id: number) {
    return (this.system as any as LRDKActorSystem).talents[id];
  }

  public async rollDialog(talentId: number) {
    const dialog = new LRDKActorRollDialog(this, talentId);
    dialog.render(true);
  }

  public async updateHealth(health: number) {
    // const syst = this.system as any as LRDKActorSystem;
    const syst: LRDKActorSystem = this.system as any as LRDKActorSystem;

    const healthValue = Math.clamp(
      syst.health.current + health,
      0,
      StatHelpers.calculateActorHealth(this).max
    );

    await this.update({
      system: { health: { current: healthValue } },
    });
  }
}

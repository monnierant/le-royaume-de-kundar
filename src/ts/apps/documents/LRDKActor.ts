import { LRDKActorSystem } from "../schemas/LRDKActorSchema";

import LRDKActorRollDialog from "../dialogs/LRDKRollDialog";

import { StatHelpers } from "../helpers/StatHelpers";
import { moduleId } from "../../constants";

export default class LRDKActor extends Actor {
  public constructor(data: any, context: any) {
    super(data, context);
  }

  public getTalent(id: number) {
    return (this.system as any as LRDKActorSystem).talents[id];
  }

  public getCarac(id: number) {
    return (this.system as any as LRDKActorSystem).caracs[id];
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

  public async rollCarac(
    caracId: number,
    difficulty: number,
    modifier: number
  ) {
    const carac = this.getCarac(caracId);
    const roll = await new Roll("1d20").roll();
    const modif = StatHelpers.valueToModifier(carac.value);
    const result = roll.total + modif + modifier;

    const success = result >= difficulty;

    const content = await renderTemplate(
      `systems/${moduleId}/templates/chat/roll.hbs`,
      {
        actor: this,
        roll: roll,
        result: result,
        modif: modif,
        modifier: modifier,
        success: success,
        carac: carac,
        moduleId: moduleId,
        difficulty: difficulty,
      }
    );

    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: content,
    });
  }

  public async rollDamage(formula: string, icon: string) {
    const roll = await new Roll(formula).roll();

    const content = await renderTemplate(
      `systems/${moduleId}/templates/chat/damage.hbs`,
      {
        actor: this,
        roll: roll,
        formula: formula,
        moduleId: moduleId,
        icon: icon,
      }
    );

    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: content,
    });
  }
}

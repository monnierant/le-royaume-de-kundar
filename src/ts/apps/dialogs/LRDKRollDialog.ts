import { difficultyLevels, moduleId } from "../../constants";
import LRDKActor from "../documents/LRDKActor";
import { StatHelpers } from "../helpers/StatHelpers";

export default class LRDKActorRollDialog extends Dialog {
  // ========================================
  // Constructor
  // ========================================
  constructor(
    actor: LRDKActor,
    caracId: number,
    options: any = {},
    data: any = {}
  ) {
    // Call the parent constructor

    const _options = {
      ...options,
      ...{
        title: "Roll",
        buttons: {
          rollButton: {
            label: "Roll",
            callback: (html: JQuery) => {
              console.log("Roll");
              this._onRoll(html);
            },
            icon: '<i class="fas fa-dice"></i>',
          },
          cancelButton: {
            label: "Cancel",
            icon: '<i class="fa-solid fa-ban"></i>',
          },
        },
      },
    };

    super(_options, data);

    // Set the actor
    this.actor = actor;
    this.caracId = caracId;
  }

  // ========================================
  // Properties
  // ========================================
  public actor: LRDKActor;
  public caracId: number;
  // public roll: CowboyBebopRoll | undefined;

  // Define the template to use for this sheet
  override get template() {
    return `systems/${moduleId}/templates/dialog/roll.hbs`;
  }

  // Data to be passed to the template when rendering
  override getData() {
    let data: any = super.getData();
    data.actor = this.actor;
    data.carac = this.actor.getCarac(this.caracId);
    data.caracModifier = StatHelpers.valueToModifier(data.carac.value);
    data.difficultyLevels = difficultyLevels;
    return data;
  }

  // ========================================
  // Actions
  // ========================================
  // Roll the dice
  private async _onRoll(html: JQuery) {
    // Roll the dice
    const difficulty =
      parseInt(html.find("#lrdk-dialog-modifier-difficulty").val() as string) ??
      0;
    const modifier =
      parseInt(html.find("#lrdk-dialog-modifier-value").val() as string) ?? 0;

    await this.actor.rollCarac(
      this.caracId,
      isNaN(difficulty) ? 0 : difficulty,
      isNaN(modifier) ? 0 : modifier
    );
  }
}

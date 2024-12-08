import { difficultyLevels, moduleId } from "../../constants";
import LRDKActor from "../documents/LRDKActor";

export default class LRDKActorRollDialog extends Dialog {
  // ========================================
  // Constructor
  // ========================================
  constructor(
    actor: LRDKActor,
    talentId: number,
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
    this.talentId = talentId;
  }

  // ========================================
  // Properties
  // ========================================
  public actor: LRDKActor;
  public talentId: number;
  // public roll: CowboyBebopRoll | undefined;

  // Define the template to use for this sheet
  override get template() {
    return `systems/${moduleId}/templates/dialog/roll.hbs`;
  }

  // Data to be passed to the template when rendering
  override getData() {
    let data: any = super.getData();
    data.actor = this.actor;
    data.talent = this.actor.getTalent(this.talentId);
    data.difficultyLevels = difficultyLevels;
    return data;
  }

  // ========================================
  // Actions
  // ========================================
  // Roll the dice
  private async _onRoll(html: JQuery) {
    // Roll the dice
    let difficulty =
      parseInt(html.find("#lrdk-dialog-modifier-difficulty").val() as string) ??
      0;
    console.log("Rolling", difficulty);
    // await this.actor.rollTalent(
    //   this.talentId,
    //   isNaN(difficulty) ? 0 : difficulty
    // );
  }
}

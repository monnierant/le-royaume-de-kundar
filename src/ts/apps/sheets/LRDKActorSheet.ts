import { moduleId, difficultyLevels } from "../../constants";
import LRDKActor from "../documents/LRDKActor";
import { StatHelpers } from "../helpers/StatHelpers";

export default class LRDKItemSheet extends ActorSheet {
  constructor(object: any, options = {}) {
    super(object, { ...options, width: 500, height: 750 });
    console.log("this.actor.type", this.actor.type);
  }

  // Define the template to use for this sheet
  override get template() {
    return `systems/${moduleId}/templates/sheets/actor/actor-sheet-${this.actor.system.type}.hbs`;
  }

  // Data to be passed to the template when rendering
  override getData() {
    const data: any = super.getData();
    data.moduleId = moduleId;

    data.difficultyLevels = difficultyLevels;
    if (this.actor.system.type === "character") {
      data.health = StatHelpers.calculateActorHealth(this.actor as LRDKActor);
    }
    return data;
  }

  // Event Listeners
  override activateListeners(html: JQuery) {
    super.activateListeners(html);
    // Roll handlers, click handlers, etc. would go here.
    html.find(".lrdk-roll").on("click", this._onRollDice.bind(this));

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    html
      .find(".lrdk-health-update")
      .on("click", this._onUpdateHealth.bind(this));

    html.find(".lrdk-roll-damage").on("click", this._onRollDamage.bind(this));
  }

  // Event Handlers
  private async _onRollDice(event: JQuery.ClickEvent) {
    event.preventDefault();
    const caracId = event.currentTarget.dataset.carac;
    await (this.actor as LRDKActor).rollDialog(caracId);
  }

  private async _onRollDamage(event: JQuery.ClickEvent) {
    event.preventDefault();
    const formula = event.currentTarget.dataset.formula;
    const icon = event.currentTarget.dataset.icon;
    await (this.actor as LRDKActor).rollDamage(formula, icon);
  }

  private async _onUpdateHealth(event: JQuery.ClickEvent) {
    event.preventDefault();
    const parent = event.currentTarget.parentElement;
    const input = parent.querySelector(
      "input[name='health']"
    ) as HTMLInputElement;
    const mult = parseInt(event.currentTarget.dataset.mult) ?? 0;
    const health = parseInt(input.value) ?? 0;
    await (this.actor as LRDKActor).updateHealth(mult * health);
    this.render();
  }
}

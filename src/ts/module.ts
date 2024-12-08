// Do not remove this import. If you do Vite will think your styles are dead
// code and not include them in the build output.
import "../styles/style.scss";

import LRDKActorSheet from "./apps/sheets/LRDKActorSheet";

import { moduleId } from "./constants";
import { range } from "./handlebarsHelpers/range";
import { concat } from "./handlebarsHelpers/concat";
import { ternary } from "./handlebarsHelpers/ternary";
import { partial } from "./handlebarsHelpers/partial";
import { add } from "./handlebarsHelpers/add";
import { lrdkActorSchema } from "./apps/schemas/LRDKActorSchema";
import LRDKActorDataModel from "./apps/datamodels/LRDKActorDataModel";
import MyNpcRoleActorDataModel from "./apps/datamodels/LRDKNpcActorDataModel";
import LRDKActor from "./apps/documents/LRDKActor";
import { valueToModif } from "./handlebarsHelpers/valueToModif";

declare global {
  interface DocumentClassConfig {
    Actor: LRDKActor;
  }
}

async function preloadTemplates(): Promise<any> {
  const templatePaths = [
    `systems/${moduleId}/templates/partials/actor/header.hbs`,
    `systems/${moduleId}/templates/partials/actor/hpmpbar.hbs`,
  ];

  return loadTemplates(templatePaths);
}

Hooks.once("init", () => {
  console.log(`Initializing ${moduleId}`);

  console.log("lrdkActorSchema", lrdkActorSchema);

  Handlebars.registerHelper("partial", partial);
  Handlebars.registerHelper("range", range);
  Handlebars.registerHelper("concat", concat);
  Handlebars.registerHelper("ternary", ternary);
  Handlebars.registerHelper("add", add);
  Handlebars.registerHelper("valueToModif", valueToModif);

  Handlebars.registerHelper("divide", function (a: number, b: number) {
    return a / b;
  });

  CONFIG.Actor.dataModels.character = LRDKActorDataModel;
  CONFIG.Actor.dataModels.npc = MyNpcRoleActorDataModel;
  CONFIG.Actor.documentClass = LRDKActor;

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet(moduleId, LRDKActorSheet, { makeDefault: true });

  preloadTemplates();
});

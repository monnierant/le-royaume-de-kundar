import TypeDataModel = foundry.abstract.TypeDataModel;
import { LRDKActorSchema, lrdkActorSchema } from "../schemas/LRDKActorSchema";
import LRDKActor from "../documents/LRDKActor";

export default class LRDKActorDataModel extends TypeDataModel<
  LRDKActorSchema,
  LRDKActor
> {
  static override defineSchema() {
    return lrdkActorSchema;
  }
}

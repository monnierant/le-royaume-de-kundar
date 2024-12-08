import TypeDataModel = foundry.abstract.TypeDataModel;
import {
  LRDKNpcActorSchema,
  lrdkNpcActorSchema,
} from "../schemas/LRDKNpcActorSchema";
import LRDKActor from "../documents/LRDKActor";

export default class LRDKNpcActorDataModel extends TypeDataModel<
  LRDKNpcActorSchema,
  LRDKActor
> {
  static override defineSchema() {
    return lrdkNpcActorSchema;
  }
}

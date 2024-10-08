import { Item } from "./itemTyping";
import {
  updateAgedBrie,
  updateBackstage,
  updateSulfuras,
  updateConjured,
  updateStandard,
} from "./updateItems";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality(): Item[] {
    for (let i = 0; i < this.items.length; i++) {
      switch (this.items[i].name) {
        case "Aged Brie": {
          updateAgedBrie(this.items[i]);
          break;
        }

        case "Backstage passes to a TAFKAL80ETC concert": {
          updateBackstage(this.items[i]);
          break;
        }

        case "Sulfuras, Hand of Ragnaros": {
          updateSulfuras(this.items[i]);
          break;
        }

        case "Conjured": {
          updateConjured(this.items[i]);
          break;
        }

        default: {
          updateStandard(this.items[i]);
          break;
        }
      }
    }

    return this.items;
  }
}

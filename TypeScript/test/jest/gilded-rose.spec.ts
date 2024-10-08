import { GildedRose } from "@/gilded-rose";
import { Item } from "../../app/itemTyping";

describe("Gilded Rose", () => {
  it("should add item", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe("foo");
  });
});

describe("Standard Rules", () => {
  it("should degrade quality twice as fast if sell in date passed", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 6)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(4);
    expect(items[0].sellIn).toBe(-1);
  });

  it("should never make quality go below zero", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });
});

describe("Aged Brie", () => {
  it("should increase in quality when sell in date decreases", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 2, 6)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(7);
    expect(items[0].sellIn).toBe(1);
  });

  it("should never make quality go beyond 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 2, 50)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(1);
  });
});

describe("Sulfuras, Hand of Ragnaros", () => {
  it("should never be sold or decrease in quality", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 2, 50),
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(2);
  });
});

describe("Backstage passes", () => {
  it("should increase in quality as sell in date approaches", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 5),
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(6);
    expect(items[0].sellIn).toBe(11);
  });

  it("should increase by 2 in quality if 10 or less days available until sell in", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 5),
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(7);
    expect(items[0].sellIn).toBe(8);
  });

  it("should increase by 3 in quality if 5 or less days available until sell in", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 5),
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(8);
    expect(items[0].sellIn).toBe(3);
  });

  it("should set quality to 0 if sell in date passed", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 25),
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });
});

describe("Conjured", () => {
  it("should decrease in quality twice as fast", () => {
    const gildedRose = new GildedRose([new Item("Conjured", 2, 50)]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(48);
    expect(items[0].sellIn).toBe(1);
  });
});

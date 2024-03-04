const weaponPricing = {
    Pistols: {
        rarity_common_weapon: 200,
        rarity_uncommon_weapon: 300,
        rarity_rare_weapon: 400,
        rarity_mythical_weapon: 500,
        rarity_legendary_weapon: 600,
        rarity_ancient_weapon: 700,
    },
    SMGs: {
        rarity_common_weapon: 1000,
        rarity_uncommon_weapon: 1100,
        rarity_rare_weapon: 1200,
        rarity_mythical_weapon: 1300,
        rarity_legendary_weapon: 1400,
        rarity_ancient_weapon: 1500,
    },
    Rifles: {
        rarity_common_weapon: 1500,
        rarity_uncommon_weapon: 1750,
        rarity_rare_weapon: 2000,
        rarity_mythical_weapon: 2400,
        rarity_legendary_weapon: 2900,
        rarity_ancient_weapon: 3500,
    },
    Heavy: {
        rarity_common_weapon: 2500,
        rarity_uncommon_weapon: 2800,
        rarity_rare_weapon: 3100,
        rarity_mythical_weapon: 3450,
        rarity_legendary_weapon: 3900,
        rarity_ancient_weapon: 4500,
    },
    Knives: {
        rarity_ancient_weapon: Math.round((Math.random()*8 + 2))*50, // defined on getSkinByTeamGroupedByCategoryAndWeapon(team) to use a different seed every time
    },
    Gloves: {
        rarity_ancient: Math.round((Math.random()*8 + 2))*50, // defined on getSkinByTeamGroupedByCategoryAndWeapon(team) to use a different seed every time
    },
    null: {
        rarity_legendary_weapon: 0,
    },
}
export default weaponPricing
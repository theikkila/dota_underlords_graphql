// resolvers.js

const abilities = require('./data/abilities.json');
const synergies = require('./data/synergies.json');
const units_r = require('./data/units.json');


let alliances = {};
Object.entries(synergies).forEach(([name, payload]) => {
    payload.display_name = name;
    payload.name = name.toLowerCase();
    alliances[name.toLowerCase()] = payload
})

let units = {};
Object.entries(units_r).forEach(([uname, payload]) => {
  payload['name'] = uname;
  if (typeof payload['armor'] == 'number') payload['armor'] = [payload['armor']]
  if (typeof payload['health'] == 'number') payload['health'] = [payload['health']]
  if (typeof payload['goldCost'] == 'number') payload['goldCost'] = [payload['goldCost']]
  if (typeof payload['magicResist'] == 'number') payload['magicResist'] = [payload['magicResist']]
  if (typeof payload['attackRate'] == 'number') payload['attackRate'] = [payload['attackRate']]
  if (typeof payload['damageMax'] == 'number') payload['damageMax'] = [payload['damageMax']]
  if (typeof payload['damageMin'] == 'number') payload['damageMin'] = [payload['damageMin']]
  payload['alliances'] = payload['keywords'] ? payload['keywords'].split(' ') : [];
  units[uname] = payload
})

const getUnits = () => {
  return Promise.resolve(Object.values(units))
}

const getAbilities = (ability_names) => {
  if (!ability_names) return Promise.resolve([]);
  return Promise.resolve(ability_names.map(name => {
    const ability = abilities[name]
    ability.name = name
    if (typeof ability['damage'] == 'number') ability['damage'] = [ability['damage']]
    return ability
  }))
}

const getAlliances = (alliance_names) => {
  if (!alliance_names) return Promise.resolve([]);
  return Promise.resolve(alliance_names.map(name => alliances[name]))
}
const getAllAlliances = () => {
  return Promise.resolve(Object.values(alliances))
}

const getAlliance = (name) => {
  return Promise.resolve(alliances[name])
}

const getUnit = (name) => {
  return Promise.resolve(units[name]);
}
module.exports = {
  Query: {
    units: async () => getUnits(),
    unit: async (_, { name }) => getUnit(name),
    alliances: async () => getAllAlliances(),
    alliance: async (_, { name }) => getAlliance(name)
  },
  Unit: {
    abilities: ({abilities}) => getAbilities(abilities),
    alliances: ({alliances}) => getAlliances(alliances)
  },
  Alliance: {
    color: ({color}) => {
      let colors = color.split(" ")
      return {r: colors[0], b: colors[1], g: colors[2]}
    },
    units: ({name}) => {
      return Object.values(units).filter((unit) => unit.alliances.find(a => a == name))
    }
  },
  AllianceLevel: {
    affects_all_allies_with_keyword: ({affects_all_allies_with_keyword}) => affects_all_allies_with_keyword ? affects_all_allies_with_keyword : false
  }
};

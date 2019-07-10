const { gql } = require('apollo-server-micro');

const typeDefs = gql`
  type Query {
    units: [Unit]
    unit(name: String!): Unit
    alliances: [Alliance]
    alliance(name: String!): Alliance
  }
  type Unit {
    id: Int!,
    name: String!,
    displayName: String!,
    health: [Int]!,
    draftTier: Int!,
    movespeed: Int!,
    armor: [Int],
    attackRange: Int,
    attackRate: [Float],
    damageMax: [Int],
    damageMin: [Int],
    goldCost: [Int],
    alliances: [Alliance],
    magicResist: [Int],
    maxmana: Int,
    abilities: [Ability]
  }
  type Color {
    r: Int!,
    g: Int!,
    b: Int!
  }
  type AllianceLevel {
    id: Int!,
    unitcount: Int!,
    affects_all_allies_with_keyword: Boolean!
  }
  type Alliance {
    name: String!,
    display_name: String!,
    color: Color!,
    type: String!,
    levels: [AllianceLevel]!,
    units: [Unit]!
  }
  type Ability {
    name: String!,
    damage: [Int],
  }
`
module.exports = typeDefs;

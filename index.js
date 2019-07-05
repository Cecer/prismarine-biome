module.exports = loader

let biomes

const versionCache = {};

function loader (mcVersion) {
  if (versionCache[mcVersion] === undefined) {
    let versioned = {
        biomes: require('minecraft-data')(mcVersion).biomes
    };
    versionCache[mcVersion] = class extends Biome {
      constructor(id) {
        super(id, versioned);
      }
    };
    Object.defineProperty (versionCache[mcVersion], "name", {value: `Biome${mcVersion.replace(/\./g, "_")}`});
  }
  return versionCache[mcVersion];
}

const emptyBiome = {
  color: 0,
  height: null,
  name: '',
  rainfall: 0,
  temperature: 0
}

function Biome (id, versioned) {
  return versioned.biomes[id] || {...emptyBiome, id}
}

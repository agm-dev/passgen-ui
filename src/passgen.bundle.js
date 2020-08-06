// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiate;
(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };
  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }
  __instantiate = (m, a) => {
    System = __instantiate = undefined;
    rF(m);
    return a ? gExpA(m) : gExp(m);
  };
})();

System.register("constants", [], function (exports_1, context_1) {
    "use strict";
    var chars, numbers, symbols, words_EN, words_ES, pokemons_1st;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("chars", chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
            exports_1("numbers", numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
            exports_1("symbols", symbols = ["@", "#", "_", "-", "$", "&", "!", "%", "+", "="]);
            exports_1("words_EN", words_EN = ["able", "acid", "aged", "also", "area", "army", "away", "baby", "back", "ball", "band", "bank", "base", "bath", "bear", "beat", "been", "beer", "bell", "belt", "best", "bill", "bird", "blow", "blue", "boat", "body", "bomb", "bond", "bone", "book", "boom", "born", "boss", "both", "bowl", "bulk", "burn", "bush", "busy", "call", "calm", "came", "camp", "card", "care", "case", "cash", "cast", "cell", "chat", "chip", "city", "club", "coal", "coat", "code", "cold", "come", "cook", "cool", "cope", "copy", "CORE", "cost", "crew", "crop", "dark", "data", "date", "dawn", "days", "dead", "deal", "dean", "dear", "debt", "deep", "deny", "desk", "dial", "dick", "diet", "disc", "disk", "does", "done", "door", "dose", "down", "draw", "drew", "drop", "drug", "dual", "duke", "dust", "duty", "each", "earn", "ease", "east", "easy", "edge", "else", "even", "ever", "evil", "exit", "face", "fact", "fail", "fair", "fall", "farm", "fast", "fate", "fear", "feed", "feel", "feet", "fell", "felt", "file", "fill", "film", "find", "fine", "fire", "firm", "fish", "five", "flat", "flow", "food", "foot", "ford", "form", "fort", "four", "free", "from", "fuel", "full", "fund", "gain", "game", "gate", "gave", "gear", "gene", "gift", "girl", "give", "glad", "goal", "goes", "gold", "Golf", "gone", "good", "gray", "grew", "grey", "grow", "gulf", "hair", "half", "hall", "hand", "hang", "hard", "harm", "hate", "have", "head", "hear", "heat", "held", "hell", "help", "here", "hero", "high", "hill", "hire", "hold", "hole", "holy", "home", "hope", "host", "hour", "huge", "hung", "hunt", "hurt", "idea", "inch", "into", "iron", "item", "jack", "jane", "jean", "john", "join", "jump", "jury", "just", "keen", "keep", "kent", "kept", "kick", "kill", "kind", "king", "knee", "knew", "know", "lack", "lady", "laid", "lake", "land", "lane", "last", "late", "lead", "left", "less", "life", "lift", "like", "line", "link", "list", "live", "load", "loan", "lock", "logo", "long", "look", "lord", "lose", "loss", "lost", "love", "luck", "made", "mail", "main", "make", "male", "many", "Mark", "mass", "matt", "meal", "mean", "meat", "meet", "menu", "mere", "mike", "mile", "milk", "mill", "mind", "mine", "miss", "mode", "mood", "moon", "more", "most", "move", "much", "must", "name", "navy", "near", "neck", "need", "news", "next", "nice", "nick", "nine", "none", "nose", "note", "okay", "once", "only", "onto", "open", "oral", "over", "pace", "pack", "page", "paid", "pain", "pair", "palm", "park", "part", "pass", "past", "path", "peak", "pick", "pink", "pipe", "plan", "play", "plot", "plug", "plus", "poll", "pool", "poor", "port", "post", "pull", "pure", "push", "race", "rail", "rain", "rank", "rare", "rate", "read", "real", "rear", "rely", "rent", "rest", "rice", "rich", "ride", "ring", "rise", "risk", "road", "rock", "role", "roll", "roof", "room", "root", "rose", "rule", "rush", "ruth", "safe", "said", "sake", "sale", "salt", "same", "sand", "save", "seat", "seed", "seek", "seem", "seen", "self", "sell", "send", "sent", "sept", "ship", "shop", "shot", "show", "shut", "sick", "side", "sign", "site", "size", "skin", "slip", "slow", "snow", "soft", "soil", "sold", "sole", "some", "song", "soon", "sort", "soul", "spot", "star", "stay", "step", "stop", "such", "suit", "sure", "take", "tale", "talk", "tall", "tank", "tape", "task", "team", "tech", "tell", "tend", "term", "test", "text", "than", "that", "them", "then", "they", "thin", "this", "thus", "till", "time", "tiny", "told", "toll", "tone", "tony", "took", "tool", "tour", "town", "tree", "trip", "true", "tune", "turn", "twin", "type", "unit", "upon", "used", "user", "vary", "vast", "very", "vice", "view", "vote", "wage", "wait", "wake", "walk", "wall", "want", "ward", "warm", "wash", "wave", "ways", "weak", "wear", "week", "well", "went", "were", "west", "what", "when", "whom", "wide", "wife", "wild", "will", "wind", "wine", "wing", "wire", "wise", "wish", "with", "wood", "word", "wore", "work", "yard", "yeah", "year", "your", "zero", "zone"]);
            exports_1("words_ES", words_ES = ["abad", "acre", "acto", "afin", "agua", "aire", "alas", "alba", "alce", "algo", "amor", "arma", "asno", "asma", "ateo", "auge", "aula", "aval", "bata", "bajo", "bala", "bazo", "beta", "bola", "bolo", "bono", "bota", "boya", "buzo", "cabe", "cabo", "caja", "cama", "cana", "capa", "caro", "casa", "cata", "caza", "cazo", "cebo", "cena", "cepa", "cera", "chal", "clan", "club", "codo", "coma", "copa", "coro", "cosa", "coto", "cuba", "dado", "daga", "dama", "dato", "dedo", "diez", "dios", "diva", "doce", "doma", "duda", "dual", "ente", "eras", "ello", "fama", "faro", "fase", "feto", "fiel", "filo", "fino", "fina", "foso", "fosa", "frac", "fuga", "gasa", "gata", "gato", "gema", "gozo", "gran", "gris", "haya", "halo", "heno", "higo", "hiel", "hito", "hoja", "humo", "idem", "iris", "isla", "jefe", "jeta", "jota", "joya", "juez", "jugo", "kilo", "laca", "lado", "lago", "lana", "lata", "lava", "laxo", "laxa", "lazo", "leal", "lima", "lija", "lobo", "loco", "lodo", "lomo", "lona", "loro", "losa", "lujo", "luna", "lupa", "luto", "maga", "mago", "maja", "majo", "mapa", "mesa", "mero", "mina", "misa", "mito", "moda", "modo", "mole", "mudo", "mula", "nabo", "nada", "neto", "nido", "nota", "nube", "nudo", "nuez", "obra", "ojos", "once", "orbe", "orca", "otro", "paga", "pago", "pala", "palo", "pana", "pato", "peso", "pico", "puro", "rama", "ramo", "rana", "raro", "raso", "rato", "rico", "robo", "rudo", "roca", "roce", "rosa", "sala", "seco", "seis", "soga", "solo", "sumo", "taco", "tajo", "tasa", "toro", "tono", "tomo", "tubo", "vado", "vago", "vaho", "vara", "viga", "voto", "yate", "yema", "yeso", "yodo", "yoga", "zeta", "zinc", "zona", "zumo"]);
            exports_1("pokemons_1st", pokemons_1st = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina", "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch’d", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"]);
        }
    };
});
System.register("passgen", ["constants"], function (exports_2, context_2) {
    "use strict";
    var constants_ts_1;
    var __moduleName = context_2 && context_2.id;
    function generatePass({ type, number, caps }) {
        let source;
        switch (type) {
            case "alpha":
                source = caps ? [...constants_ts_1.chars, ...constants_ts_1.chars.map(i => i.toUpperCase())] : constants_ts_1.chars;
                break;
            case "num":
                source = constants_ts_1.numbers;
                break;
            case "alphanum":
                source = caps ? [...constants_ts_1.chars, ...constants_ts_1.chars.map(i => i.toUpperCase()), ...constants_ts_1.numbers] : [...constants_ts_1.chars, ...constants_ts_1.numbers];
                break;
            case "alphanumExt":
                source = caps ? [...constants_ts_1.chars, ...constants_ts_1.chars.map(i => i.toUpperCase()), ...constants_ts_1.numbers, ...constants_ts_1.symbols] : [...constants_ts_1.chars, ...constants_ts_1.numbers, ...constants_ts_1.symbols];
                break;
            case "words-en":
                source = caps ? [...constants_ts_1.words_EN, ...constants_ts_1.words_EN.map(i => i.toUpperCase())] : constants_ts_1.words_EN;
                break;
            case "words-es":
                source = caps ? [...constants_ts_1.words_ES, ...constants_ts_1.words_ES.map(i => i.toUpperCase())] : constants_ts_1.words_ES;
                break;
            case "pokemon-1st":
                source = caps ? [...constants_ts_1.pokemons_1st, ...constants_ts_1.pokemons_1st.map(i => i.toUpperCase())] : constants_ts_1.pokemons_1st;
                break;
        }
        const pass = [...Array(number)].map(() => {
            const randomIndex = Math.floor(Math.random() * source.length);
            return source[randomIndex];
        }).join("");
        const { entropy, relativeEntropy } = calculateEntropy(source, number, pass);
        const strength = calculateStrength(entropy);
        const relativeStrength = calculateStrength(relativeEntropy);
        return { type, number, caps, pass, entropy, strength, relativeEntropy, relativeStrength };
    }
    exports_2("generatePass", generatePass);
    function calculateEntropy(pool, number, password) {
        // e = log2(r**l)
        // e: password entropy
        // r: pool of unique characters
        // l: number of characters in the password
        const r = [...new Set(pool.flatMap(i => i.split("")))].length;
        const l = password.length;
        const R = [...new Set(pool)].length;
        const L = number;
        return {
            entropy: Math.log2(r ** l),
            relativeEntropy: Math.log2(R ** L)
        };
    }
    function calculateStrength(entropy) {
        if (entropy < 28) {
            return "very weak";
        }
        if (entropy < 36) {
            return "weak";
        }
        if (entropy < 60) {
            return "reasonable";
        }
        if (entropy < 128) {
            return "strong";
        }
        if (entropy < 200) {
            return "very strong";
        }
        return "overkill";
    }
    return {
        setters: [
            function (constants_ts_1_1) {
                constants_ts_1 = constants_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("mod", ["passgen"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_3(exports);
    }
    return {
        setters: [
            function (passgen_ts_1_1) {
                exportStar_1(passgen_ts_1_1);
            }
        ],
        execute: function () {
        }
    };
});

const __exp = __instantiate("mod", false);
export const generatePass = __exp["generatePass"];

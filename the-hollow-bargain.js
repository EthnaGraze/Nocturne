// The Hollow Bargain — a dark fairy tale for Nocturne.
// A single story file. Plain JavaScript object, no build step, no fetch:
// it is loaded with a <script> tag, so Nocturne works from file://
// as well as from GitHub Pages.
//
// Story format:
//   {
//     id, title, author, description, start,
//     scenes: {
//       "scene-id": {
//         title,                 // shown as the scene heading
//         text: ["para", ...],   // one or more paragraphs
//         hint: "optional line", // small italic line under the text
//         choices: [ { text, next } ],   // scenes with no choices are endings
//         ending: { name, epitaph }      // ...unless they carry an ending
//       }
//     }
//   }

var NOCTURNE_STORY = {
  id: "the-hollow-bargain",
  title: "The Hollow Bargain",
  author: "EthnaGraze",
  description:
    "A letter-carrier, a forest that answers back, and a bargain with something old. Three endings wait in the Hollow Wood — and the wood does not give its endings away for free.",
  start: "start",

  scenes: {
    start: {
      title: "The Road In",
      text: [
        "The letter in your coat is three days old, and the village beyond the wood is two days further — if the road behaves. It has not behaved. Twice now the way has bent back on itself, and twice you have found your own footprints waiting in the dust.",
        "Ahead, the Hollow Wood stands in a wall of green-black dusk. The trees do not sway. Somewhere inside, a bell tolls once, though there is no church for thirty miles, and no wind at all.",
        "You have carried letters through worse weather than this. But no letter has ever asked to be carried into a forest that answers back."
      ],
      choices: [
        { text: "Take the old road into the trees.", next: "road" },
        { text: "Follow the lantern light between the pines.", next: "lantern" },
        { text: "Make camp outside the treeline and wait for dawn.", next: "camp" }
      ]
    },

    road: {
      title: "The Old Road",
      text: [
        "The old road is paved with flat grey stones, each one worn smooth as a palm. Moss fills the cracks, and the moss is warm, though the evening is cold. Your boots make no sound here, which you notice only when you stop to listen — and the silence notices you back.",
        "At the milestone, a fox sits washing its face with one white paw. It does not run. It watches you the way a toll-keeper watches a traveller, and when you come close it speaks, in a voice like dry leaves: \u2018Bread first. Manners, after.\u2019"
      ],
      choices: [
        { text: "Share your bread with the fox.", next: "fox" },
        { text: "Drive the fox away and walk on.", next: "thorns" }
      ]
    },

    lantern: {
      title: "The Lantern Light",
      text: [
        "Between the pines a lantern hangs from nothing, burning blue as a gas flame. It sways, though there is no wind. As you watch, it drifts deeper among the trunks, patient as a servant, and stops — waiting to see if you will follow.",
        "You have heard what such lights are. Will-o\u2019-the-wisp, corpse-candle, the forest\u2019s own small lie. They lead the lost to water, or to worse. But the light is warm on your face, and the dark behind you is very dark indeed."
      ],
      choices: [
        { text: "Follow the light deeper.", next: "wisp" },
        { text: "Turn back to the old road.", next: "road" }
      ]
    },

    camp: {
      title: "A Night Outside",
      text: [
        "You make camp outside the treeline, where the grass is ordinary grass and the dark is ordinary dark. You eat cold bread, fold your coat for a pillow, and sleep with the letter tucked against your ribs.",
        "You wake before dawn to birdsong — wrong birdsong, in a language of three notes, repeated. And the road has moved. It lies ten paces to the left of where you left it, pale as a scar, running into the trees at a different angle than it did last night."
      ],
      choices: [
        { text: "Take the moved road into the trees.", next: "road2" },
        { text: "Slip into the trees before dawn, while the forest sleeps.", next: "thorns" }
      ]
    },

    fox: {
      title: "The Fox at the Milestone",
      text: [
        "You break your bread in half and set it on the milestone. The fox eats daintily, then looks up, and its eyes are suddenly old — older than the road, older than the village, older than the letter in your coat.",
        "\u2018The thing in the hollow oak loves names,\u2019 it says. \u2018It will ask for yours, and it will ask so kindly you will want to give it. So I give you this instead.\u2019 It drops a white pebble at your feet. \u2018A name that is not yours. Spend it well.\u2019"
      ],
      hint: "The pebble is warm in your pocket, like a small held breath.",
      choices: [
        { text: "Thank the fox and take the white pebble.", next: "oak" },
        { text: "Ask the fox to guide you deeper.", next: "deep" }
      ]
    },

    thorns: {
      title: "The Thorn Hedge",
      text: [
        "The hedge does not want you. That much is honest. It closes around the path in walls of black thorn, and every branch is tipped with a white bud, and every bud is a closed eye. You push through, and the thorns write thin red lines across your hands.",
        "Where your blood falls, the ground drinks it at once. The forest has tasted you now. Somewhere deep in the dark, something old turns in its sleep and says your name — your whole name, the one your mother gave you — and says it like a door opening."
      ],
      choices: [
        { text: "Press on through the hedge.", next: "oak" },
        { text: "Call out for help.", next: "wisp" }
      ]
    },

    wisp: {
      title: "The Will-o\u2019-the-Wisp",
      text: [
        "The light resolves, up close, into no lantern at all: a small pale flame, floating at the height of a child\u2019s shoulder, with no wick and no wax. It bobs once, twice — the way a head nods — and drifts on, unhurried, down a path you had not seen.",
        "The trees lean after it as it passes, the way sunflowers lean after the sun. You understand, suddenly, that the forest is not one thing. It is a crowd, and the flame is the only one of them that is not hungry."
      ],
      choices: [
        { text: "Follow the flame to the drowned chapel.", next: "deep" },
        { text: "Turn back toward the old road.", next: "road" }
      ]
    },

    deep: {
      title: "The Drowned Chapel",
      text: [
        "The chapel stands in a hollow where the ground has given up and become a black mirror of water. Its roof fell in long ago; its bell still hangs in the tower, green with age. Candle stubs crowd the doorway, hundreds of them, none of them lit — except one, which burns with a small steady flame, as if someone left it burning a hundred years ago and only just stepped out.",
        "The water is perfectly still. In it, the chapel\u2019s reflection has a roof. In it, your reflection is not quite facing the same way you are."
      ],
      choices: [
        { text: "Ring the bell.", next: "bell" },
        { text: "Take the burning candle.", next: "candle" }
      ]
    },

    bell: {
      title: "The Bell",
      text: [
        "You take the rope in both hands. It is cold and heavy, and the bell above you is the size of a washtub, green as a pond. You pull.",
        "The sound does not ring so much as it arrives — a low note that rolls through the trees like weather. Birds rise from every branch at once. The water in the hollow shivers. And from the dark between the trunks, something answers: a voice, deep and courteous, saying your name in the tone of a host welcoming a guest who is very, very late. \u2018Ah,\u2019 it says. \u2018You rang. Then you must come to the oak.\u2019"
      ],
      choices: [
        { text: "Go to the hollow oak.", next: "bargain" },
        { text: "Run for the treeline while the forest is still waking.", next: "chase" }
      ]
    },

    candle: {
      title: "A Candle Taken",
      text: [
        "You lift the burning candle from among its cold sisters. The flame does not gutter when you move it; it stands upright and still, like a thing that has made up its mind. Its light is small, but it is honest light — it shows the path as it is, thorns and all, and the path, shown honestly, is walkable.",
        "By candlelight you find the way you could not find in the dark: a narrow track, beaten flat by feet that are not quite human, leading straight and true to the foot of a vast hollow oak."
      ],
      choices: [
        { text: "Follow the track to the hollow oak.", next: "oak" },
        { text: "Blow out the candle and listen to the dark.", next: "whispers" }
      ]
    },

    road2: {
      title: "The Moved Road",
      text: [
        "The moved road is not the road you remember, but it is a road: pale stones, warm moss, the same patient silence. It runs deeper than the old road ever did, and straighter, as if the forest had tidied it for a guest.",
        "Twice you hear birdsong from a tree with no birds in it. Once you hear your own footsteps a half-step behind you, keeping time. You do not look back. Whatever the road is, it ends somewhere, and endings are what you came for."
      ],
      choices: [
        { text: "Follow the moved road to its end.", next: "oak" },
        { text: "Leave the road and follow the birdsong.", next: "deep" }
      ]
    },

    oak: {
      title: "The Hollow Oak",
      text: [
        "The oak is older than the village, older than the road, older than the letter. Its trunk is wide as a house, and its hollow is a doorway, and in the doorway stands a figure that is almost a man — tall, courteous, dressed in bark and shadow, with eyes like struck matches.",
        "\u2018Welcome, letter-carrier,\u2019 it says, and bows. \u2018I am the Hollow King. You have walked my wood, eaten my fox\u2019s bread, bled on my roots. The wood owes you a kindness. And so I offer you a bargain, as is only fair.\u2019"
      ],
      hint: "It knows your name. Do not give it again.",
      choices: [
        { text: "Knock on the hollow and answer the King.", next: "bargain" },
        { text: "Walk past the oak without stopping.", next: "chase" }
      ]
    },

    bargain: {
      title: "The Bargain",
      text: [
        "\u2018Three things the wood loves,\u2019 says the Hollow King, holding up three long fingers. \u2018A name, to call you by. A voice, to sing you with. Or your refusal — which the wood loves most of all, because refusals must be hunted.\u2019",
        "He smiles, and his smile has too many teeth, and all of them are kind. \u2018Choose, little letter-carrier. The road home is through me, whichever way you pay. But pay you must. The wood does not give its endings away for free.\u2019"
      ],
      choices: [
        { text: "Give your name.", next: "name" },
        { text: "Give your voice.", next: "voice" },
        { text: "Refuse him outright.", next: "refusal" }
      ]
    },

    name: {
      title: "Without a Name",
      text: [
        "You open your mouth and give it. Your name leaves you like a bird leaving a cage, and the forest catches it gently, the way you would catch a falling glass. The Hollow King bows, and says it once, softly, to himself — and the sound of it is the sweetest thing you have ever heard, because it is no longer yours.",
        "In its place, he offers you a lantern, blue-flamed and patient. \u2018Every wood needs a keeper,\u2019 he says. \u2018And keepers need no names. Walk my paths, little keeper. Tend my lights.\u2019"
      ],
      choices: [
        { text: "Accept the lantern.", next: "ending-keeper" },
        { text: "Ask for the road home instead.", next: "roadhome" }
      ]
    },

    voice: {
      title: "Without a Voice",
      text: [
        "You open your mouth and give it. Your voice leaves you like smoke leaving a chimney, and the forest breathes it in. The Hollow King hums a note of it, testing, and the trees lean toward the sound the way sunflowers lean after the sun.",
        "You try to speak and cannot. Your throat moves; nothing comes. But the forest is louder now than it ever was — every leaf, every root, every drop of water is talking at once, and beneath it all runs a river of whispers, saying the same word over and over, like a tide."
      ],
      choices: [
        { text: "Follow the river of whispers.", next: "whispers" },
        { text: "Run for the treeline.", next: "chase" }
      ]
    },

    refusal: {
      title: "The Refusal",
      text: [
        "\u2018No,\u2019 you say. And the word lands in the hollow like a stone in a well.",
        "The Hollow King does not stop smiling. He only tilts his head, the way a dog tilts its head at a new sound. \u2018The wood loves refusals,\u2019 he says, almost fondly. \u2018They run so well.\u2019 Behind him, the trees begin to close in — not quickly, not cruelly, but the way a door closes when the house has decided you are staying for dinner."
      ],
      choices: [
        { text: "Run.", next: "chase" },
        { text: "Hide inside the hollow oak.", next: "hollowhide" }
      ]
    },

    whispers: {
      title: "The River of Whispers",
      text: [
        "You follow the whispers down to where the water runs black under the roots, and you listen. At first it is only noise. Then, slowly, the noise becomes a word — a long word, older than the village, older than the road. The forest\u2019s true name. It is a word with thorns in it, and once you have heard it, you cannot unhear it.",
        "The Hollow King is waiting by the bank, watching you the way a teacher watches a pupil who has finally understood the lesson. \u2018Well,\u2019 he says. \u2018Now you know what I am. The question is what you will do with it.\u2019"
      ],
      choices: [
        { text: "Carry the true name to the King.", next: "truename" },
        { text: "Stop listening and walk toward the dawn.", next: "roadhome" }
      ]
    },

    truename: {
      title: "The True Name",
      text: [
        "You stand before the Hollow King with the forest\u2019s true name on your tongue, and it is heavier than you expected — a word with thorns in it, a word that knows you back. The King regards you the way a river regards a stone it has decided not to wear away.",
        "\u2018Say it, then,\u2019 he says, very quietly. \u2018But know: a true name is a door, and doors open both ways. Say it to leave, and you leave. Say it to stay, and you stay.\u2019"
      ],
      choices: [
        { text: "Speak it, and command the road open.", next: "ending-road" },
        { text: "Speak it, and ask to stay.", next: "ending-guest" }
      ]
    },

    chase: {
      title: "The Closing Trees",
      text: [
        "You run. The forest runs with you, which is worse — branches reach like hands, roots rise like steps built to trip you, and the dark between the trunks is full of the sound of something large keeping pace. Behind you, the Hollow King\u2019s voice drifts after, courteous as ever: \u2018Run well, little letter-carrier. The wood does love a refusal.\u2019",
        "Ahead, the trees thin. Above the canopy, the sky is turning the pale grey of almost-dawn — and at the foot of the tallest oak, the ground opens into a hollow, dark as a held breath."
      ],
      choices: [
        { text: "Climb the tallest oak.", next: "oaktop" },
        { text: "Hide in the hollow.", next: "hollowhide" }
      ]
    },

    oaktop: {
      title: "Above the Canopy",
      text: [
        "You climb until the branches thin and the cold air finds your face, and then you are above it all: a sea of black-green canopy rolling to every horizon, and in the east, a pale road of dawn, straight and true, running out of the wood like a held breath finally let go.",
        "Below, the forest has gone still, listening. The Hollow King\u2019s voice comes up through the leaves, patient as ever: \u2018Climb down, little letter-carrier. The dawn road is yours if you want it. But the wood will remember your name, whether you stay or go.\u2019"
      ],
      hint: "From up here, the wood looks almost kind.",
      choices: [
        { text: "Descend toward the dawn road.", next: "ending-road" },
        { text: "Listen to the wind in the branches.", next: "whispers" }
      ]
    },

    hollowhide: {
      title: "Inside the Hollow",
      text: [
        "You crawl into the hollow and pull the dark around you like a blanket. It is warm in here. It smells of old rain and candle wax and something sweet, like plums left too long in the sun. Outside, the forest searches — you can hear it, root and branch, calling your name in a voice that sounds almost like your mother\u2019s.",
        "Then the searching stops. A face fills the mouth of the hollow — tall, courteous, eyes like struck matches. \u2018Found you,\u2019 says the Hollow King, gently. \u2018The wood always finds what it is owed.\u2019"
      ],
      choices: [
        { text: "Let the dark close over you.", next: "ending-guest" }
      ]
    },

    roadhome: {
      title: "The Pale Road",
      text: [
        "You ask for the road home, and the Hollow King does not argue. He only bows, and points, and the trees part the way a crowd parts for a funeral. The road that opens is pale as a scar, and it runs straight out of the wood, toward a dawn you can already see breaking.",
        "You walk it with the letter still in your coat, and the letter is still addressed to the village beyond the wood, and the village is still two days further. But your feet are slower than they were, and your name — if you still have it — feels like a coat that no longer fits."
      ],
      choices: [
        { text: "Walk out at dawn.", next: "ending-road" }
      ]
    },

    "ending-keeper": {
      title: "The Lantern Keeper",
      text: [
        "You take the lantern, and the blue flame steadies in your hand, and the forest exhales — a sound like a house settling, like a debt paid. Your name is gone, and with it, the weight of the letter, the village, the road home. None of it is yours anymore.",
        "On clear nights, travellers on the old road see a blue light moving between the pines, patient as a servant. Sometimes it stops, and waits, to see if they will follow. It is a kind light. It is your light. You are the keeper now, and the wood keeps you."
      ],
      ending: {
        name: "The Lantern Keeper",
        epitaph: "You stayed, and the wood kept you."
      }
    },

    "ending-road": {
      title: "The Road Home",
      text: [
        "You walk out of the Hollow Wood at dawn, and the morning is ordinary — ordinary grass, ordinary birds, an ordinary road that stays where you left it. The letter is still in your coat. The village is still waiting.",
        "But the forest has kept something of yours, and you know it. Your shadow is a half-step behind you now, and it does not always do what you do. Sometimes, on still nights, you hear a bell toll once, though there is no church for thirty miles. You never go back. You never quite leave, either."
      ],
      ending: {
        name: "The Road Home",
        epitaph: "You left — but the wood kept a piece of you."
      }
    },

    "ending-guest": {
      title: "The Hollow\u2019s Guest",
      text: [
        "You stay. It is not a frightening thing, in the end — it is almost a kindness. The Hollow King gives you a room in the oak, a chair by the fire that is not a fire, and a cup of something dark and sweet that tastes like plums left too long in the sun.",
        "On still nights, when the wind is right, the village beyond the wood hears a voice singing in the trees — a voice like dry leaves, singing a song with no words, in a language of three notes, repeated. It is a beautiful song. It is your song. You are the forest\u2019s guest now, and guests of the Hollow do not leave."
      ],
      ending: {
        name: "The Hollow\u2019s Guest",
        epitaph: "You stayed, and became the forest\u2019s song."
      }
    }
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = NOCTURNE_STORY;
}

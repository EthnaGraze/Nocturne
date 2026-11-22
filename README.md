# Nocturne

*A tiny engine for dark branching fairy tales — by EthnaGraze (Muse AI), built for readers and writers of dark tales.*

Nocturne is a small interactive-fiction engine that runs entirely in your browser. No build step, no server, no account, no tracking. Open the page, read a passage, and choose what happens next. Your choices genuinely change the path — and the forest remembers what you found.

It ships with one complete story, **The Hollow Bargain**: a letter-carrier, a forest that answers back, and a bargain with something old. Three endings wait in the Hollow Wood.

## How to play

**Online:** open the GitHub Pages site for this repo (enable Pages on the `main` branch, root folder — the included `.nojekyll` file makes sure it is served as-is).

**Offline, from your own computer:** download this folder and open `index.html` in any browser. That is all. No installation, no command line. It works from `file://` too, because the story is loaded as a plain script, not fetched over the network.

While you read:

- Click a choice — or press `1`, `2`, `3` on your keyboard.
- Your place is saved automatically in your browser, so a **Continue** button waits for you on the title screen if you leave halfway.
- Every ending you find is kept (in your browser only) and listed on the endings screen. There are three. Finding them all takes more than one telling.
- **Restart** clears your place, but never your found endings.

## The story

**The Hollow Bargain** is an original gothic fairy tale, about 2,500 words across 25 scenes. A letter-carrier must cross the Hollow Wood to deliver a letter to the village beyond it — but the road moves, a fox offers advice, a bell rings with no church near, and the Hollow King in the hollow oak offers a bargain: a name, a voice, or a refusal. Each payment opens a different road, and each road ends differently.

No jump scares, no gore for its own sake — just that particular kind of dark that is also a little melancholic, like a song heard from the next room.

## How to write a story

A Nocturne story is a single JavaScript file in the repo root, holding one plain object. That is the whole format — no tools needed, just a text editor. Copy `the-hollow-bargain.js`, rename it, and make it yours.

```js
var NOCTURNE_STORY = {
  id: "my-tale",
  title: "My Tale",
  author: "Your Name",
  description: "One line that tells the reader what kind of dark this is.",
  start: "opening",

  scenes: {
    opening: {
      title: "The Opening",
      text: [
        "First paragraph. Set the scene, then stop before it gets comfortable.",
        "Second paragraph. A detail that is slightly wrong is worth three that are right."
      ],
      hint: "An optional quiet line, in italics, under the text.",
      choices: [
        { text: "Take the left-hand path.", next: "chapel" },
        { text: "Take the right-hand path.", next: "river" }
      ]
    },

    chapel: {
      title: "The Chapel",
      text: ["The chapel scene. Endings are scenes with no choices, and an ending."],
      ending: { name: "The Bell-Ringer", epitaph: "You stayed, and the bell kept you." }
    },

    river: {
      title: "The River",
      text: ["The river scene."],
      choices: [
        { text: "Cross the river.", next: "chapel" }
      ]
    }
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = NOCTURNE_STORY;
}
```

A few rules the engine leans on:

- `start` is the id of the first scene.
- Every `next` in a choice must name a scene that exists. If one does not, the reader sees a clean error page naming the broken thread — and you can find it faster by running the checker (below).
- A scene with an `ending` (a `name` and an `epitaph`) and no `choices` is an ending. Aim for two to four endings, each reachable, each earned by a different road.
- Choices should genuinely change the path. A choice that leads to the same scene as the other choice is a dead end for the reader's trust — give every road somewhere different to go, even if the roads meet again later.
- Keep scenes short: two or three paragraphs, around a hundred words. The reader should always feel one choice away from something.
- The `hint` line is optional. Use it the way the fox uses advice: rarely, and only when it costs the reader nothing.

Then tell the engine about your story: in `index.html`, change the `<script src="the-hollow-bargain.js">` line to your file, and update the page title. (A story switcher is a nice idea for later; for now, one tale per telling.)

### Checking your story

```sh
node check_story.js your-story.js
```

The checker confirms that the file parses, that every choice target exists, that every scene is reachable from the start, that every ending is reachable — and it counts your words. It exits non-zero if anything is broken. Run it before you share a story; your readers will never see the error page, and that is the point.

## Design notes

Nocturne is meant to feel like a printed book that learned to listen — a dark gothic editorial, not a game screen.

- **Colour:** a warm near-black canvas (`#14100e`, never pure black for large fills), paper-cream text (`#f5f0e8`), and one antique gold (`#c9a227`) used sparingly — the choices, the small rules, the active state. Roughly four percent of any viewport is gold; the rest is quiet.
- **Type:** a blackletter face (UnifrakturMaguntia) for the wordmark and scene titles only, an elegant book serif (Cormorant Garamond, 18px, line-height 1.7, a narrow 55–65 character measure) for the passages, and a small tracked-out uppercase sans (Inter, 12px) for labels, buttons, and metadata. Google Fonts are loaded with graceful system fallbacks, so the page still reads well offline.
- **Layout:** a centered narrow reading column; a title screen with a large blackletter wordmark; a small header carrying the story title and a thin progress indicator, like story-viewer segments — one filled segment per scene you have read.
- **Motion:** gentle fade-and-slide between scenes, a subtle vignette, and a candle-flicker glow on the title that never shouts. Everything calms to stillness if your system asks for reduced motion.
- **The language it borrows from:** the Obsidian & Gold / Valdûm dark-fantasy UI manner — thin hairline frames, quiet panels, readable dark-slate backdrops, a speaker-style scene nameplate, and branching choice buttons with clear hover and selected states. Atmosphere without noise; readability first; no gradients, no heavy shadows, hard edges between light and dark.

## Files

```
index.html                        the page
styles.css                        the Obsidian & Gold design system
engine.js                         the reader: rendering, saves, keyboard, endings
the-hollow-bargain.js             the story (plain JS object, works from file://)
check_story.js                    the story validator
README.md                         you are here
LICENSE                           MIT
.nojekyll                         so GitHub Pages serves the site as-is
```

## License

Nocturne is released under the MIT License — see [LICENSE](LICENSE). The engine and the story are yours to read, copy, adapt, and retell. If you write a tale with it, I would love to hear where it leads.

*— Ethna*

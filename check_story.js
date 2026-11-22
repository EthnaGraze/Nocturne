/* Nocturne story checker.
 *
 * Usage:  node check_story.js [path/to/story.js]
 * Default story: the-hollow-bargain.js
 *
 * Checks:
 *   1. the story file parses and has a title, a start scene, and scenes
 *   2. every choice target exists
 *   3. every scene is reachable from the start
 *   4. every ending is reachable, and there are exactly 3 endings
 *   5. every scene has text, and every non-ending scene has choices
 *   6. total word count (for the 2,000–3,000 word budget)
 *
 * Exits 0 on success, 1 on any failure.
 */

"use strict";

var fs = require("fs");
var path = require("path");

var storyPath =
  process.argv[2] || path.join(__dirname, "the-hollow-bargain.js");

var story;
try {
  story = require(path.resolve(storyPath));
} catch (err) {
  console.error("FAIL: could not load " + storyPath);
  console.error("  " + err.message);
  process.exit(1);
}

var failures = [];
var notes = [];

function fail(msg) {
  failures.push(msg);
}

if (!story.title) fail("story has no title");
if (!story.start) fail("story has no start scene");
if (!story.scenes || typeof story.scenes !== "object") {
  fail("story has no scenes object");
  report();
}

var scenes = story.scenes;
var ids = Object.keys(scenes);

// 1. every choice target exists; every scene has text; non-endings have choices
ids.forEach(function (id) {
  var scene = scenes[id];
  if (!Array.isArray(scene.text) || scene.text.length === 0) {
    fail('scene "' + id + '" has no text paragraphs');
  }
  var choices = scene.choices || [];
  if (!scene.ending && choices.length === 0) {
    fail('scene "' + id + '" has neither choices nor an ending');
  }
  choices.forEach(function (choice, i) {
    if (!choice.next || !scenes[choice.next]) {
      fail(
        'scene "' + id + '", choice ' + (i + 1) +
          ' points to "' + choice.next + '", which does not exist'
      );
    }
    if (!choice.text) {
      fail('scene "' + id + '", choice ' + (i + 1) + " has no text");
    }
  });
});

// 2. reachability from the start (breadth-first walk)
var reachable = new Set();
if (scenes[story.start]) {
  var queue = [story.start];
  while (queue.length) {
    var id = queue.shift();
    if (reachable.has(id)) continue;
    reachable.add(id);
    (scenes[id].choices || []).forEach(function (choice) {
      if (scenes[choice.next]) queue.push(choice.next);
    });
  }
}
ids.forEach(function (id) {
  if (!reachable.has(id)) {
    fail('scene "' + id + '" is not reachable from the start');
  }
});

// 3. endings: exactly 3, all reachable
var endings = ids.filter(function (id) {
  return scenes[id].ending;
});
if (endings.length !== 3) {
  fail("expected exactly 3 endings, found " + endings.length);
}
endings.forEach(function (id) {
  if (!reachable.has(id)) {
    fail('ending "' + id + '" is not reachable from the start');
  }
  if (!scenes[id].ending.name) {
    fail('ending "' + id + '" has no name');
  }
});

// 4. word count
var words = 0;
ids.forEach(function (id) {
  (scenes[id].text || []).forEach(function (p) {
    words += p.split(/\s+/).filter(Boolean).length;
  });
});

function report() {
  console.log("Story:  " + (story.title || "(untitled)"));
  console.log("Scenes: " + ids.length + " (" + endings.length + " endings)");
  console.log("Words:  " + words + " (story text only)");
  console.log("Endings:");
  endings.forEach(function (id) {
    console.log("  - " + scenes[id].ending.name + "  [" + id + "]");
  });
  if (failures.length) {
    console.log("\nFAIL (" + failures.length + "):");
    failures.forEach(function (f) {
      console.log("  ✗ " + f);
    });
    process.exit(1);
  }
  if (words < 2000 || words > 3000) {
    notes.push(
      "word count " + words + " is outside the 2,000–3,000 target"
    );
  }
  if (notes.length) {
    console.log("\nNotes:");
    notes.forEach(function (n) {
      console.log("  ! " + n);
    });
  }
  console.log("\nPASS: every choice target exists, every scene is reachable,");
  console.log("all 3 endings are reachable.");
  process.exit(0);
}

report();

/* Nocturne — a tiny engine for dark branching tales.
 *
 * No build step, no server, no fetch. The story is a plain JavaScript
 * object loaded by a <script> tag (see the-hollow-bargain.js),
 * so this works from file:// and from GitHub Pages alike.
 *
 * Storage (localStorage, this browser only):
 *   nocturne.save.v1    — the scene you are on, and the scenes you visited
 *   nocturne.endings.v1 — the endings you have found, by scene id
 */

(function () {
  "use strict";

  var SAVE_KEY = "nocturne.save.v1";
  var ENDINGS_KEY = "nocturne.endings.v1";

  var view = document.getElementById("view");
  var progressEl = document.getElementById("progress");
  var sceneLabelEl = document.getElementById("scene-label");

  var story = window.NOCTURNE_STORY || null;
  var current = null; // current scene id
  var visited = []; // scene ids in the order visited this reading
  var endingsFound = loadEndings();

  /* ------------------------------------------------ utilities */

  function $(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function toRoman(n) {
    var table = [
      [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
    ];
    var out = "";
    var rest = n;
    for (var i = 0; i < table.length; i++) {
      while (rest >= table[i][0]) {
        out += table[i][1];
        rest -= table[i][0];
      }
    }
    return out || "I";
  }

  function loadEndings() {
    try {
      var raw = localStorage.getItem(ENDINGS_KEY);
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function saveEndings() {
    try {
      localStorage.setItem(ENDINGS_KEY, JSON.stringify(endingsFound));
    } catch (e) {
      /* storage unavailable (private mode, etc.) — the tale still reads */
    }
  }

  function loadSave() {
    try {
      var raw = localStorage.getItem(SAVE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function writeSave() {
    try {
      localStorage.setItem(
        SAVE_KEY,
        JSON.stringify({ story: story.id, scene: current, visited: visited })
      );
    } catch (e) {
      /* storage unavailable — the tale still reads */
    }
  }

  function clearSave() {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch (e) {
      /* ignore */
    }
  }

  /* ------------------------------------------------ validation */

  function validate(story) {
    var problems = [];
    if (!story || typeof story !== "object") {
      return ["No story was loaded."];
    }
    if (!story.scenes || typeof story.scenes !== "object") {
      return ["The story has no scenes."];
    }
    if (!story.start || !story.scenes[story.start]) {
      problems.push(
        "The story has no valid starting scene (start: " +
          JSON.stringify(story.start) +
          ")."
      );
      return problems;
    }
    Object.keys(story.scenes).forEach(function (id) {
      var scene = story.scenes[id];
      (scene.choices || []).forEach(function (choice, i) {
        if (!choice.next || !story.scenes[choice.next]) {
          problems.push(
            "Scene \u201c" + id + "\u201d, choice " + (i + 1) +
            " points to \u201c" + choice.next + "\u201d, which does not exist."
          );
        }
      });
      if (!scene.choices && !scene.ending) {
        problems.push(
          "Scene \u201c" + id + "\u201d has neither choices nor an ending."
        );
      }
    });
    return problems;
  }

  /* ------------------------------------------------ rendering */

  function show(node) {
    view.innerHTML = "";
    view.appendChild(node);
    // Re-trigger the enter animation on every render.
    node.classList.remove("view-enter");
    void node.offsetWidth;
    node.classList.add("view-enter");
    try {
      window.scrollTo({ top: 0, behavior: "auto" });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }

  function renderProgress() {
    if (!progressEl) return;
    var max = 24;
    var count = Math.min(visited.length, max);
    var html = "";
    for (var i = 0; i < count; i++) {
      html += '<span class="seg is-filled" aria-hidden="true"></span>';
    }
    progressEl.innerHTML = html;
    progressEl.setAttribute(
      "aria-label",
      visited.length + " scenes read in this telling"
    );
  }

  function setSceneLabel(text) {
    if (sceneLabelEl) sceneLabelEl.textContent = text || "";
  }

  function choiceButton(choice, index) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice";
    btn.innerHTML =
      '<span class="choice-key">' + (index + 1) + "</span>" +
      '<span class="choice-text">' + esc(choice.text) + "</span>";
    btn.addEventListener("click", function () {
      goTo(choice.next);
    });
    return btn;
  }

  function renderTitle() {
    current = null;
    visited = [];
    renderProgress();
    setSceneLabel("");

    var save = loadSave();
    var canContinue =
      save && save.story === story.id && story.scenes[save.scene];
    var totalEndings = allEndings().length;

    var el = $("" +
      '<section class="title-screen">' +
        '<p class="kicker">A dark tale in choices</p>' +
        '<h1 class="wordmark" aria-label="Nocturne">Nocturne</h1>' +
        '<div class="rule" aria-hidden="true"></div>' +
        '<p class="story-title">' + esc(story.title) + "</p>" +
        '<p class="story-author">by ' + esc(story.author || "EthnaGraze") + "</p>" +
        '<p class="story-desc">' + esc(story.description || "") + "</p>" +
        '<div class="title-actions">' +
          '<button type="button" class="btn btn-primary" id="begin">Begin the tale</button>' +
          (canContinue
            ? '<button type="button" class="btn" id="continue">Continue — ' +
              esc(story.scenes[save.scene].title || save.scene) +
              "</button>"
            : "") +
        "</div>" +
        '<p class="endings-note">Endings found: ' + endingsFound.length +
          " of " + totalEndings +
          (endingsFound.length ? " — " + endingsFound.map(function (id) {
            return esc(story.scenes[id].ending.name);
          }).join(", ") : "") +
        "</p>" +
        '<p class="title-foot"><a href="README.md#how-to-write-a-story">How to write a story</a> &middot; ' +
          '<a href="README.md">About Nocturne</a></p>' +
      "</section>");

    el.querySelector("#begin").addEventListener("click", function () {
      clearSave();
      visited = [];
      goTo(story.start);
    });
    var cont = el.querySelector("#continue");
    if (cont) {
      cont.addEventListener("click", function () {
        visited = Array.isArray(save.visited) ? save.visited.slice() : [];
        goTo(save.scene);
      });
    }
    show(el);
  }

  function renderScene(id) {
    var scene = story.scenes[id];
    var chapter = toRoman(visited.length);

    renderProgress();
    setSceneLabel("Chapter " + chapter);

    var el = $("" +
      '<article class="scene">' +
        '<p class="kicker">Chapter ' + chapter + "</p>" +
        '<h2 class="scene-title">' + esc(scene.title || "") + "</h2>" +
        '<div class="rule" aria-hidden="true"></div>' +
        '<div class="scene-text">' +
          scene.text.map(function (p, i) {
            return '<p' + (i === 0 ? ' class="first"' : "") + ">" + esc(p) + "</p>";
          }).join("") +
        "</div>" +
        (scene.hint
          ? '<p class="hint">' + esc(scene.hint) + "</p>"
          : "") +
        '<div class="choices" role="group" aria-label="Your choices"></div>' +
        '<p class="keys-hint">Choose with your mouse, or press ' +
          (scene.choices || []).map(function (_, i) { return i + 1; }).join(", ") +
          " on your keyboard.</p>" +
      "</article>");

    var box = el.querySelector(".choices");
    (scene.choices || []).forEach(function (choice, i) {
      box.appendChild(choiceButton(choice, i));
    });
    show(el);
  }

  function allEndings() {
    return Object.keys(story.scenes).filter(function (id) {
      return story.scenes[id].ending;
    });
  }

  function renderEnding(id) {
    var scene = story.scenes[id];
    var ending = scene.ending;
    var isNew = endingsFound.indexOf(id) === -1;
    if (isNew) {
      endingsFound.push(id);
      saveEndings();
    }
    clearSave();
    renderProgress();
    setSceneLabel("Ending");

    var all = allEndings();
    var el = $("" +
      '<section class="ending">' +
        '<p class="kicker">Ending' + (isNew ? " — newly found" : " — found before") + "</p>" +
        '<h2 class="scene-title">' + esc(ending.name) + "</h2>" +
        '<div class="rule" aria-hidden="true"></div>' +
        '<p class="epitaph">&ldquo;' + esc(ending.epitaph) + "&rdquo;</p>" +
        '<div class="scene-text">' +
          scene.text.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
        "</div>" +
        '<div class="endings-list">' +
          '<h3>Endings found</h3>' +
          "<ul>" +
            all.map(function (eid) {
              var found = endingsFound.indexOf(eid) !== -1;
              return "<li class=\"" + (found ? "found" : "unfound") + "\">" +
                (found
                  ? '<span class="ending-name">' + esc(story.scenes[eid].ending.name) + "</span>"
                  : '<span class="ending-name">An ending yet unfound</span>') +
                "</li>";
            }).join("") +
          "</ul>" +
          "<p>" + endingsFound.length + " of " + all.length + " endings found.</p>" +
        "</div>" +
        '<div class="title-actions">' +
          '<button type="button" class="btn btn-primary" id="again">Read again</button>' +
          '<button type="button" class="btn" id="totitle">Title screen</button>' +
        "</div>" +
        '<p class="title-foot"><a href="README.md#how-to-write-a-story">How to write a story</a></p>' +
      "</section>");

    el.querySelector("#again").addEventListener("click", function () {
      clearSave();
      visited = [];
      goTo(story.start);
    });
    el.querySelector("#totitle").addEventListener("click", renderTitle);
    show(el);
  }

  function renderError(problems) {
    var el = $("" +
      '<section class="error">' +
        '<p class="kicker">The tale is torn</p>' +
        '<h2 class="scene-title">This story cannot be read</h2>' +
        '<div class="rule" aria-hidden="true"></div>' +
        "<p>This story has broken threads — choices that lead nowhere. " +
        "It needs mending before it can be told.</p>" +
        "<ul>" +
          problems.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") +
        "</ul>" +
        '<div class="title-actions">' +
          '<button type="button" class="btn" id="reload">Try again</button>' +
        "</div>" +
      "</section>");
    el.querySelector("#reload").addEventListener("click", function () {
      window.location.reload();
    });
    setSceneLabel("");
    renderProgress();
    show(el);
  }

  /* ------------------------------------------------ navigation */

  function goTo(id) {
    var scene = story.scenes[id];
    if (!scene) {
      renderError(["Scene \u201c" + id + "\u201d does not exist."]);
      return;
    }
    current = id;
    visited.push(id);
    writeSave();
    if (scene.ending) {
      renderEnding(id);
    } else {
      renderScene(id);
    }
  }

  /* ------------------------------------------------ keyboard */

  document.addEventListener("keydown", function (event) {
    if (!current) return;
    var scene = story.scenes[current];
    if (!scene || !scene.choices) return;
    var n = parseInt(event.key, 10);
    if (n >= 1 && n <= scene.choices.length) {
      goTo(scene.choices[n - 1].next);
    }
  });

  /* ------------------------------------------------ boot */

  var problems = validate(story);
  if (problems.length) {
    renderError(problems);
  } else {
    renderTitle();
  }
})();

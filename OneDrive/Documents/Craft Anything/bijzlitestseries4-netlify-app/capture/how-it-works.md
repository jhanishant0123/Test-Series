# How it works

Deep mode: what the site's JavaScript is made of and what its start page did while we watched.

## Its JavaScript

Analysed 4 script(s) from https://bijzlitestseries4.netlify.app/: 1 module(s), 2 endpoint(s), 0 route(s).

Evidence ev_39c1f548af6b7ab652f8696ea489ed43d4b2c206bc74692259ea9956a3ea923e.

```json
{
  "api_operations": [],
  "app_kind": "unknown",
  "bundlers": [],
  "edges": [
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#button:click",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#button.addEventListener(click)@561"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#card:auxclick",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#card.addEventListener(auxclick)@759"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#card:click",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#card.addEventListener(click)@603"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#chip:click",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#chip.addEventListener(click)@809"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#document:keydown",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#document.addEventListener(keydown)@1238"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.clearActivity:click",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.clearActivity.addEventListener(click)@1278"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.ctaBrowse:click",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.ctaBrowse.addEventListener(click)@1290"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.ctaResume:click",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.ctaResume.addEventListener(click)@1296"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.filterInput:input",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.filterInput.addEventListener(input)@1256"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.hideDone:change",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.hideDone.addEventListener(change)@1266"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.resetBtn:click",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#stepBack@1137"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.search:input",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.search.addEventListener(input)@1185"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.search:keydown",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.search.addEventListener(keydown)@1195"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.searchClear:click",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.searchClear.addEventListener(click)@1226"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.searchMore:click",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.searchMore.addEventListener(click)@1233"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.searchResults:keydown",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.searchResults.addEventListener(keydown)@1212"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.sortSelect:change",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.sortSelect.addEventListener(change)@1261"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#tab:click",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#tab.addEventListener(click)@1272"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#window:focus",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#window.addEventListener(focus)@1316"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#window:hashchange",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#window.addEventListener(hashchange)@1301"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#window:scroll",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#onScroll@1321"
    },
    {
      "from": "event:bijzlitestseries4.netlify.app/assets/app.js#window:storage",
      "kind": "handled-by",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#window.addEventListener(storage)@1310"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#applyRoute@518",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#parseHash@470"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#applyRoute@518",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#applyTheme@1151",
      "kind": "uses",
      "to": "storage:localStorage.setItem"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#document:keydown"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.clearActivity:click"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.ctaBrowse:click"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.ctaResume:click"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.filterInput:input"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.hideDone:change"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.resetBtn:click"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.search:input"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.search:keydown"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.searchClear:click"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.searchMore:click"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.searchResults:keydown"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#refs.sortSelect:change"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#window:focus"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#window:hashchange"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#window:scroll"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#window:storage"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#onScroll@1321"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#button.addEventListener(click)@561",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#applyTheme@1151"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#button.addEventListener(click)@561",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#navigate@495"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#button.addEventListener(click)@561",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#button.addEventListener(click)@561",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#toggleSaved@304"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#card.addEventListener(auxclick)@759",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#recordOpen@288"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#card.addEventListener(click)@603",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#hashFor@487"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#card.addEventListener(click)@603",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#navigate@495"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#card.addEventListener(click)@603",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#recordOpen@288"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#chip.addEventListener(click)@809",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#emptyState@764",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#button:click"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#emptyState@764",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#el@227"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#highlight@689",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#el@227"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#icon@234",
      "kind": "mentions",
      "to": "endpoint:http://www.w3.org/2000/svg"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#initialize@1365",
      "kind": "requests",
      "to": "endpoint:data/series-manifest.json"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#initialize@1365",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#applyRoute@518"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#initialize@1365",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#applyTheme@1151"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#initialize@1365",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#bindEvents@1178"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#initialize@1365",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#buildIndex@342"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#initialize@1365",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#loadLocalState@282"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#initialize@1365",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#localizeShortcutHint@1359"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#initialize@1365",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#showLoadError@1341"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#initialize@1365",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#updateHeaderCounts@1328"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#loadLocalState@282",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#readStore@263"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#miniCard@966",
      "kind": "listens",
      "to": "event:bijzlitestseries4.netlify.app/assets/app.js#card:click"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#miniCard@966",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#el@227"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#miniCard@966",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#relativeTime@247"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#miniCard@966",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#scoreOf@318"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#miniCard@966",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#scorePill@659"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#navigate@495",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#applyRoute@518"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#progressBlock@567",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#el@227"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#providerLabel@184",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#tidy@150"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#readStore@263",
      "kind": "uses",
      "to": "storage:localStorage.getItem"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#recordOpen@288",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#readStore@263"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#recordOpen@288",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#writeStore@274"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.clearActivity.addEventListener(click)@1278",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.clearActivity.addEventListener(click)@1278",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#writeStore@274"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.ctaBrowse.addEventListener(click)@1290",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#navigate@495"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.filterInput.addEventListener(input)@1256",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.hideDone.addEventListener(change)@1266",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.search.addEventListener(keydown)@1195",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#navigate@495"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.searchClear.addEventListener(click)@1226",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#navigate@495"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.searchMore.addEventListener(click)@1233",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#refs.sortSelect.addEventListener(change)@1261",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#pluralize@223"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#renderActivity@991"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#renderBranches@580"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#renderCrumbs@542"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#renderProviders@610"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#renderSearch@920"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#renderSeries@637"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#renderTests@777"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#resolveRoute@506"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#setStatus@533"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#render@1068",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/app.js#show@538"
    },
    {
      "from": "fn:bijzlitestseries4.netlify.app/assets/app.js#renderActivity@991",
      "kind": "calls",
      "to": "fn:bijzlitestseries4.netlify.app/assets/ap
```

## Ten seconds of it

Watched https://bijzlitestseries4.netlify.app/ for 10000ms: 0 request outline(s), 0 console entr(y/ies).

Evidence ev_40d7f9d95ceb2c472ca199361f142c30e0ca1654f006e5785e5edc37eeede93c.

```json
{
  "accessibility": null,
  "console": {
    "count": 0,
    "entries": [],
    "has_text": false
  },
  "dom": {
    "attribute_names": [
      "action",
      "aria-controls",
      "aria-describedby",
      "aria-expanded",
      "aria-hidden",
      "aria-label",
      "aria-labelledby",
      "aria-live",
      "aria-pressed",
      "aria-selected",
      "as",
      "async",
      "autocomplete",
      "charset",
      "class",
      "content",
      "crossorigin",
      "cx",
      "cy",
      "d",
      "data-account-tier",
      "data-app-host",
      "data-count",
      "data-netlify-site-id",
      "data-nf-variant",
      "data-nl-ready",
      "data-tab",
      "data-theme",
      "defer",
      "enterkeyhint",
      "fill",
      "for",
      "height",
      "hidden",
      "href",
      "id",
      "lang",
      "maxlength",
      "method",
      "name",
      "placeholder",
      "property",
      "r",
      "rel",
      "required",
      "role",
      "rows",
      "spellcheck",
      "src",
      "srcdoc",
      "stroke",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-width",
      "style",
      "tabindex",
      "target",
      "title",
      "type",
      "value",
      "viewbox",
      "width",
      "x1",
      "x2",
      "y1",
      "y2"
    ],
    "elements_by_name": {
      "a": 7,
      "article": 4,
      "aside": 1,
      "body": 2,
      "button": 21,
      "circle": 1,
      "div": 57,
      "em": 1,
      "footer": 1,
      "form": 1,
      "g": 1,
      "h1": 1,
      "h2": 7,
      "h3": 5,
      "h4": 6,
      "head": 2,
      "header": 1,
      "html": 2,
      "iframe": 1,
      "input": 8,
      "kbd": 1,
      "label": 4,
      "line": 3,
      "link": 6,
      "main": 1,
      "meta": 12,
      "nav": 1,
      "option": 4,
      "p": 28,
      "path": 11,
      "script": 4,
      "search": 1,
      "section": 9,
      "select": 1,
      "span": 34,
      "strong": 2,
      "style": 1,
      "svg": 7,
      "textarea": 1,
      "title": 1
    },
    "text_nodes": 95,
    "total_nodes": 362,
    "truncated": false
  },
  "dropped_events": 0,
  "frame_origins": [
    "about:srcdoc",
    "https://bijzlitestseries4.netlify.app"
  ],
  "network": {
    "request_count": 0,
    "requests": []
  },
  "origin": "https://bijzlitestseries4.netlify.app/",
  "resources": [
    {
      "mime_type": "font/woff2",
      "type": "Font",
      "url": "https://fonts.gstatic.com/s/sora/v17/xMQ9uFFYT72X5wkB_18qmnndmSdSnh2BAfO5mnuyOo1lfiQwV6-x.woff2"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://bijzlitestseries4.netlify.app/assets/app.js?v=20260812-portal"
    },
    {
      "mime_type": "font/woff2",
      "type": "Font",
      "url": "https://fonts.gstatic.com/s/manrope/v23/xn7gYHE41ni1AdIRggexSg.woff2"
    }
  ],
  "scripts": [
    {
      "length": 528,
      "source_map_url": null,
      "url": "https://bijzlitestseries4.netlify.app/"
    },
    {
      "length": 47178,
      "source_map_url": null,
      "url": "https://bijzlitestseries4.netlify.app/assets/app.js?v=20260812-portal"
    },
    {
      "length": 35727,
      "source_map_url": null,
      "url": "https://bijzlitestseries4.netlify.app/.netlify/scripts/hud?variant=public"
    },
    {
      "length": 2353,
      "source_map_url": null,
      "url": "about:srcdoc"
    }
  ],
  "scripts_truncated": false,
  "secret_redactions": 0,
  "storage_keys": null,
  "watch_ms": 10000,
  "websockets": {
    "connections": [],
    "frames": []
  }
}
```

// Firefox privacy/security prefs for all desktop machines (Linux and Windows).
// Copied into every Firefox profile by run_onchange_after_firefox-userjs.{sh,ps1}.tmpl.
// user.js is reapplied on every Firefox start, so changes in about:config last only until restart.
// Based on Betterfox Securefox and arkenfox, limited to changes that barely break sites.

// Telemetry and studies
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("datareporting.policy.dataSubmissionEnabled", false);
user_pref("datareporting.usage.uploadEnabled", false);
user_pref("toolkit.telemetry.enabled", false);
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false);
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false);
user_pref("toolkit.telemetry.updatePing.enabled", false);
user_pref("toolkit.telemetry.bhrPing.enabled", false);
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false);
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);
user_pref("app.shield.optoutstudies.enabled", false);
user_pref("app.normandy.enabled", false);
user_pref("app.normandy.api_url", "");

// Mozilla messaging and recommendations
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false);
user_pref("browser.preferences.moreFromMozilla", false);
user_pref("browser.aboutwelcome.enabled", false);

// Firefox Suggest and sponsored content: no address bar input to Mozilla, no ads on the home page
user_pref("browser.urlbar.quicksuggest.enabled", false);
user_pref("browser.urlbar.suggest.quicksuggest.sponsored", false);
user_pref("browser.urlbar.suggest.quicksuggest.nonsponsored", false);
user_pref("browser.urlbar.quicksuggest.dataCollection.enabled", false);
user_pref("browser.newtabpage.activity-stream.showSponsored", false);
user_pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false);
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);

// Generative AI features off; translations run locally and stay on
user_pref("browser.ml.chat.enabled", false);
user_pref("browser.ml.chat.page", false);
user_pref("browser.ml.linkPreview.optin", false);
user_pref("browser.smartwindow.enabled", false);
user_pref("browser.tabs.groups.smart.userEnabled", false);

// Strict tracking protection (per-site exceptions via the shield icon) and HTTPS-Only
user_pref("browser.contentblocking.category", "strict");
user_pref("dom.security.https_only_mode", true);

// No speculative connections or prefetching
user_pref("network.predictor.enabled", false);
user_pref("network.dns.disablePrefetch", true);
user_pref("network.dns.disablePrefetchFromHTTPS", true);
user_pref("network.prefetch-next", false);
user_pref("network.http.speculative-parallel-limit", 0);
user_pref("browser.urlbar.speculativeConnect.enabled", false);
user_pref("browser.places.speculativeConnect.enabled", false);

// Downloads are not reported to Google; local phishing/malware lists stay on
user_pref("browser.safebrowsing.downloads.remote.enabled", false);
// Show homograph domains (e.g. Cyrillic letters) as xn--...
user_pref("network.IDN_show_punycode", true);
// WebRTC does not reveal the LAN IP
user_pref("media.peerconnection.ice.default_address_only", true);
user_pref("pdfjs.enableScripting", false);
// Other sites only get the domain as referrer
user_pref("network.http.referer.XOriginTrimmingPolicy", 2);

// Bitwarden fills addresses and cards
user_pref("extensions.formautofill.addresses.enabled", false);
user_pref("extensions.formautofill.creditCards.enabled", false);

// Middle-clicked bookmarks open in a background tab, like links
user_pref("browser.tabs.loadBookmarksInBackground", true);
// Start pages: Firefox has one setting for startup and new windows. On Linux, new windows show
// about:home and ~/.local/bin/firefox-start adds the start pages on the first start only.
// Not synced, so each machine keeps its own start setup.
user_pref("services.sync.prefs.sync.browser.startup.homepage", false);
user_pref("services.sync.prefs.sync.browser.startup.page", false);
{{- if eq .kind "desktop" }}
user_pref("browser.startup.page", 1);
user_pref("browser.startup.homepage", "about:home");
{{- end }}

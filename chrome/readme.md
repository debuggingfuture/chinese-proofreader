{
  "manifest_version": 2,

  "name": "Chinese-proofreader",
  "description": "This extension shows a Google Image search result for the current page",
  "version": "1.0",

  "browser_action": {
    "default_icon": "icon.png",
    "default_popup": "popup.html",
    "default_title": "Click here!"
  },

  "content_scripts": [
    {
    "matches": ["http://36kr.com/p/5047964.html"], //http://36kr.com/p/5047964.html
    "css": ["style.css"],
    "js": ["jquery-3.0.0.min.js", "content.js"]
    }
  ],

  "permissions": [
    "activeTab",
    "https://ajax.googleapis.com/"
  ]
}

chrome://extensions/

http://36kr.com/p/5047964.html
/* ----------- DO NOT EDIT BELOW ----------- */
// ==UserScript==
// @name         Facebook UI Text Replacement
// @author       Martin Andrew (based on original MC UI code by William Garrison)
// @match        https://p.socialstudio.radian6.com/publish/*
// @match        https://mc.s4.exacttarget.com/cloud/#app/Social%20Studio/*
// @grant        none
// ==/UserScript==

var replaceArry = [
/*
  _____ ____ ___ _____   _   _ _____ ____ _____
 | ____|  _ \_ _|_   _| | | | | ____|  _ \| ____|
 |  _| | | | | |  | |   | |_| |  _| | |_) |  _|
 | |___| |_| | |  | |   |  _  | |___|  _ <| |___
 |_____|____/___| |_|   |_| |_|_____|_| \_\_____|

Add strings into the replacement array in the form of
[/Words to find/gi,'Words to replace'],
*/

    /* Change Facebook page name from demo name to customer name */
    [/NTO Drive/gi,'Sitecore CMS'],


/*
  _____ _   _ ____     ___  _____   _____ ____ ___ _____ ____
 | ____| \ | |  _ \   / _ \|  ___| | ____|  _ \_ _|_   _/ ___|
 |  _| |  \| | | | | | | | | |_    |  _| | | | | |  | | \___ \
 | |___| |\  | |_| | | |_| |  _|   | |___| |_| | |  | |  ___) |
 |_____|_| \_|____/   \___/|_|     |_____|____/___| |_| |____/
*/
];

var numTerms    = replaceArry.length;
var transTimer  = setInterval (translateTermsOnPage, 222);

function translateTermsOnPage () {
    var txtWalker   = document.createTreeWalker (
        document.body,
        NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                if (node.nodeValue.trim() ) {
                    if (node.tmWasProcessed)
                        return NodeFilter.FILTER_SKIP;
                    else
                        return NodeFilter.FILTER_ACCEPT;
                }
                return NodeFilter.FILTER_SKIP;
            }
        },
        false
    );
    var txtNode     = null;
    while (txtNode  = txtWalker.nextNode()) {
        txtNode.nodeValue       = replaceAllTerms (txtNode.nodeValue);
        txtNode.tmWasProcessed  = true;
    }
    var placeholderNodes    = document.querySelectorAll ("[placeholder]");
    replaceManyAttributeTexts (placeholderNodes, "placeholder");

    var titleNodes          = document.querySelectorAll ("[title]");
    replaceManyAttributeTexts (titleNodes, "title");
}

function replaceAllTerms (oldTxt) {
    for (var J  = 0;  J < numTerms;  J++) {
        oldTxt  = oldTxt.replace (replaceArry[J][0], replaceArry[J][1]);
    }
    return oldTxt;
}

function replaceManyAttributeTexts (nodeList, attributeName) {
    for (var J = nodeList.length - 1;  J >= 0;  --J) {
        var node    = nodeList[J];
        var oldText = node.getAttribute (attributeName);
        if (oldText) {
            oldText = replaceAllTerms (oldText);
            node.setAttribute (attributeName, oldText);
        }
    }
}

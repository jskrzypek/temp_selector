var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];
  
  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // your code here
  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements

  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag
//
var selectorTypeMatcher = function(selector) {
  var selRegex = /(\.|#)/,
      selTypeIdx = selector.search(selRegex);

  if (selTypeIdx === -1) {
    return "tag";
  } else if (selTypeIdx !== 0) {
    return "tag.class";
  } else if (selector[0] === '#') {
    return "id";
  } else {
    return "class";
  }
};

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = function (el) {
      if (el.id && el.id.toLowerCase() === selector.slice(1)) {
        return true;
      }
      return false;
    }

  } else if (selectorType === "class") {
    matchFunction = function (el) {
      if (typeof el.className !== "undefined") {
        return Boolean(el.className.toLowerCase().match(selector.toLowerCase().slice(1))); 
      }
      return false;
    }
       
  } else if (selectorType === "tag.class") {
    matchFunction = function (el) {
      if (typeof el.tagName !== "undefined" && typeof el.className !== "undefined") {
      
        var selSplit = selector.toLowerCase().split(".");
        
        if ((selSplit[0] === el.tagName) 
                && Boolean(el.className.toLowerCase().match(selSplit[1]))) {
          return true;
        } 
      }
      return false;
    }
    
  } else if (selectorType === "tag") {
    matchFunction = function (el) {
      if (typeof el.tagName !== "undefined") {
        return (selector == el.tagName); 
      }
      return false;
    };
    
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};

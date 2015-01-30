/*jslint nomen: true */
/*global $, jQuery, alert, confirm, eval, _training */

function blank() {
    "use strict";
	(function ($) {
		$("#buildlist").animate({height: "100%"});
		var api = jQuery("ul.tabs").data("tabs");
		api.click(0);
	}(jQuery));
}

function expand() {
    "use strict";
	(function ($) {
		$("#buildlist").animate({height: "0px"});
	}(jQuery));
}

function expand2() {
    "use strict";
	(function ($) {
		$("#savearea").animate({right: "0px"});
	}(jQuery));
}

function closesave() {
    "use strict";
	(function ($) {
		$("#savearea").animate({right: "-21%"});
	}(jQuery));
}

$(function () {
    // setup ul.tabs to work as tabs for each div directly under div.panes
    "use strict";
    $("ul.tabs").tabs("div.panes > div");
});

function custom_alert(message) {
    "use strict";
    alert(message);
}

function custom_confirm(message, action_after_confirm) {
    "use strict";
    if (confirm(message)) {
        action_after_confirm();
    }
}
	
function reset() {
    "use strict";
	custom_confirm('Reset current skill?', _training.resetSelectedSkill);
    return false;
}

function reset_all() {
    "use strict";
	custom_confirm('Reset all skills?', _training.resetAllSkill);
    return false;
}

function objToJSONString(obj) {
    "use strict";
	var isArray = (obj && obj.join && obj.pop && obj.push && obj.reverse && obj.shift && obj.slice && obj.splice),
        results = [],
        i,
        value;
    
	for (i in obj) {
        if (obj.hasOwnProperty(i)) {
            value = obj[i];

            if (typeof value === "object") {
                results.push((isArray ? "" : "\"" + i.toString() + "\" : ") + objToJSONString(value));
            } else if (value) {
                results.push((isArray ? "" : "\"" + i.toString() + "\" : ") + (typeof value === "string" ? "\"" + value + "\"" : value));
            } else {
                results.push((isArray ? "" : "\"" + i.toString() + "\" : ") + (typeof value === "string" ? "\"\"" : 0));
            }
        }
	}
	
	return (isArray ? "[" : "{") + results.join(", ") + (isArray ? "]" : "}");
}

//document.getElementById("mytextarea").readOnly = true;
function generateBuild() {
    "use strict";
	var obj = objToJSONString(_training.getSendDataObj());
	document.getElementById('codearea').value = obj;
}

function generateUrl(job) {
    "use strict";
	var obj = objToJSONString(_training.getSendDataObj()),
        base = "dakaringer.github.io/BnS-ST/" + job + "/page_" + job + ".html?build=";
	document.getElementById('codearea').value = base + obj;
}

function trim(st) {
    "use strict";
	while (st) {
		if (st.indexOf(" ") === 0) {
            st = st.substring(1);
        } else {
            break;
        }
	}
	while (st) {
		if (st.lastIndexOf(" ") === st.length - 1) {
            st = st.substring(0, st.length - 1);
        } else {
            break;
        }
	}
	return st;
}

function applyBuild(job) {
    "use strict";
	var api = jQuery("ul.tabs").data("tabs"),
        obj = trim(document.getElementById('codearea').value),
        c;
	api.click(0);
    
	if (obj === "") {
		return;
	}
	
	try {
		c = $.parseJSON(obj);
		if (String(c.character_job) !== job) {
			document.getElementById('codearea').value = "Wrong class!!";
			return;
		}
		
		_training.loadGetJsonData(obj);
		document.getElementById('codearea').value = obj;
	} catch (err) {
		document.getElementById('codearea').value = "Invalid input!!";
		return;
	}
}

var tempScrollTop;
$(window).scroll(function () {
    "use strict";
    tempScrollTop = $("div.categoryBody").scrollTop();
});

function getQueryVariable(variable) {
    "use strict";
	var query = window.location.search.substring(1),
        vars = query.split("&"),
        i,
        pair;
	for (i = 0; i < vars.length; i += 1) {
        pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
	}
	return (false);
}

function queryUrl(job) {
    "use strict";
	var j = getQueryVariable("build"),
        c;
	
	if (j) {
		j = j.replace(/%20/g, ' ');
		j = j.replace(/%22/g, '"');
		j = j.replace(/%7B/g, '{');
		j = j.replace(/%7D/g, '}');
		try {
			c = $.parseJSON(j);
			if (String(c.character_job) !== job) {
				document.getElementById('codearea').value = "Wrong class!!";
				return;
			}
			
			_training.loadGetJsonData(j);
			document.getElementById('codearea').value = j;
		} catch (err) {
			document.getElementById('codearea').value = "Invalid input!!";
			return;
		}
	}
}
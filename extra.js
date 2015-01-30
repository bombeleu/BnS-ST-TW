function blank(){
	(function($) {
		$("#buildlist").animate({height:"100%"});
		var api = jQuery("ul.tabs").data("tabs");
		api.click(0);
	})(jQuery);
}

function expand(){
	(function($) {
		$("#buildlist").animate({height:"0px"});
	})(jQuery);
}

function expand2(){
	(function($) {
		$("#savearea").animate({right:"0px"});
	})(jQuery);
}

function closesave(){
	(function($) {
		$("#savearea").animate({right:"-20%"});
	})(jQuery);
}

$(function() {
    // setup ul.tabs to work as tabs for each div directly under div.panes
    $("ul.tabs").tabs("div.panes > div");
});

function custom_alert(message) {
		alert(message);
	}
function custom_confirm(message, action_after_confirm) {
		if(confirm(message)) {
			eval(action_after_confirm);
			if(action_after_confirm == '_training.resetAllSkill()'){
				var api = jQuery("ul.tabs").data("tabs");
				blank();
				api.click(0);
			}
		}
	}
	
function reset() {
	custom_confirm('Reset current skill?', '_training.resetSelectedSkill()'); return false;
}

function reset_all() {
	custom_confirm('Reset all skills?', '_training.resetAllSkill()'); return false;
}

//document.getElementById("mytextarea").readOnly = true;
function generateBuild() {
	var obj = objToJSONString(_training.getSendDataObj());
	document.getElementById('codearea').value = obj;
}

function generateUrl(job) {
	var obj = objToJSONString(_training.getSendDataObj());
	var base = "dakaringer.github.io/BnS-ST/" + job + "/page_" + job + ".html?build="
	document.getElementById('codearea').value = base + obj;
}

function applyBuild(job) {
	var api = jQuery("ul.tabs").data("tabs");
	api.click(0);
			
	var obj = trim(document.getElementById('codearea').value);
	if (obj == ""){
		return;
	}
	
	try{
		var c = $.parseJSON(obj);
		if(String(c.character_job) != job) {
			document.getElementById('codearea').value = "Wrong class!!";
			return;
		}
		
		_training.loadGetJsonData(obj);
		document.getElementById('codearea').value = obj;
	}
	catch(err) {
		document.getElementById('codearea').value = "Invalid input!!";
		return;
	}
}

function objToJSONString(obj) {
	var isArray = (obj && obj.join && obj.pop && obj.push && obj.reverse && obj.shift && obj.slice && obj.splice);
	var results = [];
	
	for(var i in obj) {
		var value = obj[i];
		
		if(typeof value == "object")
			results.push((isArray ? "" : "\"" + i.toString() + "\" : ") + objToJSONString(value));
		else if(value)
			results.push((isArray ? "" : "\"" + i.toString() + "\" : ") + (typeof value == "string" ? "\"" + value + "\"" : value));
		else
			results.push((isArray ? "" : "\"" + i.toString() + "\" : ") + (typeof value == "string" ? "\"\"" : 0));
	}
	
	return (isArray ? "[" : "{") + results.join(", ") + (isArray ? "]" : "}")
}

function trim(st) {
	while(st) {
		if (st.indexOf(" ")==0) st = st.substring(1);
		else break;
	}
	while(st){
		if (st.lastIndexOf(" ")==st.length-1) st = st.substring(0, st.length-1);
		else break;
	}
	return st;
}

var tempScrollTop;
$(window).scroll(function () { 
    tempScrollTop = $("div.categoryBody").scrollTop();
});

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		   var pair = vars[i].split("=");
		   if(pair[0] == variable){return pair[1];}
	}
	return(false);
}

function queryUrl(job){
	var j = getQueryVariable("build");
	
	if (j){
		j = j.replace(/%20/g, ' ');
		j = j.replace(/%22/g, '"');
		j = j.replace(/%7B/g, '{');
		j = j.replace(/%7D/g, '}');
		try{
			var c = $.parseJSON(j);
			if(String(c.character_job) != job) {
				document.getElementById('codearea').value = "Wrong class!!";
				return;
			}
			
			_training.loadGetJsonData(j);
			document.getElementById('codearea').value = j;
		}
		catch(err) {
			document.getElementById('codearea').value = "Invalid input!!";
			return;
		}
	}
}
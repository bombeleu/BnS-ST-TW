/*global $ */

var changelog = {
	"20150127": {
		"date": "January 19, 2015",
		"attrib": {
			"Website": "<br><li>New branch site for TW</li>",
		}
	}
};

var d;
for (d in changelog) {
	if (changelog.hasOwnProperty(d)) {
        var tab = "";
        var pane = "";
		var categories = "";
        var a;
		for (a in changelog[d].attrib) {
            if (changelog[d].attrib.hasOwnProperty(a)) {
                categories += a + ", ";
            }
		}
		categories = categories.substring(0, categories.length - 2);
		tab = "<li><a href=\"#\" onclick=\"expand();\"><p class=\"builder\">" + categories + "</p> <p class=\"levelreq\"></p><p class=\"title\">" + changelog[d].date + "</p></li>";
		var desc = "";
        var b;
		for (b in changelog[d].attrib) {
            if (changelog[d].attrib.hasOwnProperty(b)) {
                desc += b + "<br>" + changelog[d].attrib[b] + "<br>";
            }
		}
		pane = "<div><p class=\"date\">" + changelog[d].date + "</p><br>" + desc + "</div>";
        
        $("#buildlist").append(tab);
        $("#changedesc").append(pane);
	}
}
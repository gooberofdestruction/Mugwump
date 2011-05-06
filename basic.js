/*jslint white: true, onevar: true, undef: true, nomen: true, regexp: true, plusplus: true, bitwise: true, newcap: true, browser: true, maxerr: 50, indent: 4 */

var title = function () {
    var i = 0,
        len = arguments.length,
        mugwumps = "Mugwumps",
	goal = "Guess were the 4 mugwumps are in 10 turns or less",
	explain1 = "If you hit a red square will be shown",
	explain2 = "If you miss a blue square shown and you will be told how close you are to the mugwumps",
	explain3 = "Each guess originates at the Homebase(top left corner)",
        paragraph_node = document.createElement("p"),
        text_node,
        output_area = document.getElementById( "Mugwumps" ),
        data_node;
	
    text_node = document.createTextNode(mugwumps);
    paragraph_node.appendChild(text_node);
    output_area.appendChild(paragraph_node);
    paragraph_node = document.createElement("p");
    
    text_node = document.createTextNode(goal);
    paragraph_node.appendChild(text_node);
    output_area.appendChild(paragraph_node);
    paragraph_node = document.createElement("p");
    
    text_node = document.createTextNode(explain1);
    paragraph_node.appendChild(text_node);
    output_area.appendChild(paragraph_node);
    paragraph_node = document.createElement("p");
    
    text_node = document.createTextNode(explain2);
    paragraph_node.appendChild(text_node);
    output_area.appendChild(paragraph_node);
    paragraph_node = document.createElement("p");
    
    text_node = document.createTextNode(explain3);
    paragraph_node.appendChild(text_node);
    output_area.appendChild(paragraph_node);
    paragraph_node = document.createElement("p");

};
var print = function () {
    var i = 0,
        len = arguments.length,
        output = "",
        paragraph_node = document.createElement("p"),
        text_node,
        output_area = document.getElementById( "output_area" ),
        data_node;

    for (; i < len - 1; i = i + 1) {
        output += arguments[i] + " ";
    }
    output += arguments[i];

    text_node = document.createTextNode(output);
    paragraph_node.appendChild(text_node);
    output_area.appendChild(paragraph_node);    
};

var check = function(){
    var i = 0,
        len = arguments[0].length;
    for (; i < len; i = i + 1) {
    	if( arguments[0][i][0] == arguments[1] && arguments[0][i][1] == arguments[2]){
    	    	return true;
    	}
    }
    return false;
};

var init_grid = function(){
    var i = 0,
        j = 0,
        arg = 0,
        len = arguments.length,
        output = "-",
        tr_node = document.createElement("tr"),
	table_node = document.createElement("table"),
	td_node,
        parent_table = document.getElementById("parent_table");

    table_node.setAttribute("border", 1);
    table_node.setAttribute("width", 250);
    table_node.setAttribute("height", 250);
    

    for (; i < 10; i = i + 1) {

    	for (; j < 10; j = j + 1) {
	    
    	    td_node = document.createElement("td");
	    td_node.appendChild(document.createTextNode(""));
    	    tr_node.appendChild(td_node);
    	}
    	j=0;
    	table_node.appendChild(tr_node);
	tr_node = document.createElement("tr")
    }
    parent_table.appendChild(table_node);
    
    return table_node;
};

var inputX = function () {
    var value;
    do {
        value = prompt("Steps Down - or q to quit");
    } while (value === null || value === "" || value > 9 || value < 0);
    return value;
};

var inputY = function () {
    var value;
    do {
        value = prompt("Steps Right - or q to quit");
    } while (value === null || value === "" || value > 9 || value < 0);
    return value;
};

var distance = function(){
    
    return Math.floor(Math.sqrt( Math.pow(Math.abs(arguments[0][0] - arguments[1]),2) +
	              Math.pow(Math.abs(arguments[0][1] - arguments[2]),2) ));

}

var main = function () {
    var name;
    var x;
    var y;
    var guesses = new Array();
    var guess;
    var mugwumps = new Array();
    var mugwump;
    var tries = 0;
    var hits = new Array();
    var hit;
    var grid;
    var i = 0;
    var j = 0;
    var guess_text = "";
    title();
    grid = init_grid();
    
    for(; tries < 4; tries = tries + 1){
	mugwump = new Array();
	mugwump[0] = randomnumber=Math.floor(Math.random()*10);
	mugwump[1] = randomnumber=Math.floor(Math.random()*10);
	mugwumps[mugwumps.length] = mugwump;
    }
    
    tries = 0;
    
    for (; tries < 10 && hits.length < 4 ; tries = tries + 1) {
	i = 0;
	j = 0;
	
	for (; i < 10; i = i + 1) {
    	
	    for (; j < 10; j = j + 1) {
		
		if(check(hits, i, j)){
		    grid.childNodes[i].childNodes[j].setAttribute("BGCOLOR", "#FF0000");
		}
		else if(check(guesses, i, j)){
		    grid.childNodes[i].childNodes[j].setAttribute("BGCOLOR", "#0000FF");
		}
		else {
		    if(i == 0 && j == 0){
			grid.childNodes[i].childNodes[j].setAttribute("BGCOLOR", "#CCCCCC");
		    }
		    else {
			grid.childNodes[i].childNodes[j].setAttribute("BGCOLOR", "#FFFFFF");
		    }
		}
		
	    }
	    j=0;
	}
	
	x = inputX();
	if( x === "q" ){
	    break;
	}
	y = inputY();
	
	if(  y === "q"){
	    break;
	}
	guess = new Array();
	guess[0] = x;
	guess[1] = y;
	guesses[guesses.length] = guess;
	
	if(check(mugwumps, x, y)){
	    hit = new Array();
	    hit[0] = x;
	    hit[1] = y;
	    hits[hits.length] = hit;
	    print("Guess: ", (tries+1), "(",x,",",y,")", "HIT!!");
	}
	else{
	    i = 0;
	    guess_text = "";
	    for(; i < 4; i = i +1){
		guess_text += " Mugwump "+(i+1)+": ";
		guess_text += distance(mugwumps[i], x, y);
	    }
	    print("Guess: ", (tries+1), "(",x,",",y,")", guess_text);
	}
	
    }
    if( hits.length == 4 )
    {
	print("You Won!  Refresh page to play again");
    }
    else{
	print("Better luck next time. Refresh page to play again");
	
	i = 0;
	j = 0;
	
	for (; i < 10; i = i + 1) {
    	
	    for (; j < 10; j = j + 1) {
		
		if(check(hits, i, j)){
		    grid.childNodes[i].childNodes[j].setAttribute("BGCOLOR", "#FF0000");
		}
		else if(check(mugwumps, i, j)){
		    grid.childNodes[i].childNodes[j].setAttribute("BGCOLOR", "#00FF00");
		}
		else if(check(guesses, i, j)){
		    grid.childNodes[i].childNodes[j].setAttribute("BGCOLOR", "#0000FF");
		}
		else {
		    if(i == 0 && j == 0){
			grid.childNodes[i].childNodes[j].setAttribute("BGCOLOR", "#CCCCCC");
		    }
		    else {
			grid.childNodes[i].childNodes[j].setAttribute("BGCOLOR", "#FFFFFF");
		    }
		}
		
	    }
	    j=0;
	}
    }
};
    
window.onload = main;
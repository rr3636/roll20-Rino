// Github:   
// By:       Rino
// Contact:  https://app.roll20.net/users/799859/rino

/*
 * This script sets the token display/graphics to an random image from an RollableTable with the same name
 *
 * version: 0.1
 *
 * To use:
 *	* Add this script to your API
 *	* Create an RollableTable (menu selection top to the right inside roll20: "Decks and Table")
 *		* Name this table something you would call a monster (example "Kobold"). "Note: case sensitive"
 *		* Click "Add item" to add items in the table. Weight & name of this item is not used, so just leave as is.
 *		* You need to add an icon. So drag an image from your library here and click "save changes".
 *		* Repeat "Add item" as many times as you want.
 *		* When finished you should have a list of many icons (example: lots of different kobold images).
 *		* Finish the table by clicking "save changes".
 *	* Drag an icon to the map from your library.
 *		* left click this icon and click the settings icon for it (the one down to left of it)
 *		* set the "Name" field to the exact name you used in the table (example "Kobold"). "Note: case sensitive"
 *		* Optionally fill out other fields here (example: "Represents character").
 *		* Click "save changes" when finished
 *	* When this token is still selected, go to your "Journal" (menu top right)
 *		* Create a character (example: npc named "Kobold")
 *		* Under the title "Default Token (Optional)" there is an button "Use Selected Token". Click that one now. Finish by clicking "Save changes"
 *	* Everytime you now drags this character to the map, it will pick a random image from the table you created. (i.e. your kobolds will now not look the same).
 *
 *	* You can have unlimited of these setups. i.e. ("Kobold" name, "Kobold" table, "Goblin" name, "Goblin" table, etc...)
 */

var tokenIDtoBeCheckedForMultipleSides = [];

on("ready", function() {
    log("API is ready");
    on("add:graphic", function(obj) {
        //Will only be called for new objects that get added, since existing objects have already been loaded before the ready event fires.

        //Add the ID of the added token to a list to be checked for multiple sides (need to use this since "name" is not populated on "add")
        tokenIDtoBeCheckedForMultipleSides.push(obj.get("_id"));
    });
});

on("change:token", function(obj, prev) {
    //check if the ID that changed is in the array of token ID's that has recently been added and scheduled to be checked for multiple sides
    var tokenIDtoBeCheckedForMultipleSidesIndex = tokenIDtoBeCheckedForMultipleSides.indexOf(obj.get("_id"));

    //if changed token ID is not found in array, we exit
    if(tokenIDtoBeCheckedForMultipleSidesIndex == -1)
        return;

    //Removing the ID from the array so that we don't check this token ID again
    tokenIDtoBeCheckedForMultipleSides.splice(tokenIDtoBeCheckedForMultipleSidesIndex,1);

    //Get the name of the Token (This is not name from charactersheet if the token has that)
    objName = obj.get("name");

    //Exit if name is set to blank
    if(objName == "")
        return;

    //Check if theres an RollableTable with the same Name we just extracted. Exit if it's not found
    var rollableTableObj = findObjs({_type : "rollabletable", name : objName})[0];
    if(rollableTableObj == undefined)
        return;

    //Get the contents of the RollableTable
    var rollableTableItemsObj = findObjs({_type : "tableitem", _rollabletableid : rollableTableObj.get("_id")});

    //Exit if the table is empty
    if(rollableTableItemsObj.length < 1)
        return;

    //Roll randomly to pick one of the table items (this doesn't use the rollabletable weight option)
    var randomNewTableIndex = randomInteger(rollableTableItemsObj.length) -1;

    //Extract the URL from the table
    var randomNewTableObj = rollableTableItemsObj[randomNewTableIndex];
    var randomNewTableURL = decodeURIComponent(randomNewTableObj.get("avatar"));
    
    //exit if the URL is empty (i.e. there is no token loaded for the table field we picked)
    if(randomNewTableURL == "")
        return;

    //Choose thumb graphics as that's the only option that can be set
    var randomNewTableURL = randomNewTableURL.replace("/max.","/thumb.");

    //Finish by setting the tokens displayed graphics with the new random side.
    obj.set("imgsrc",randomNewTableURL);
});
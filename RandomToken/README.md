This is a script for roll20.net
You need to have access to API at roll20.net + follow steps below


// By:       Rino
// Contact:  https://app.roll20.net/users/799859/rino

/*
 * This script sets the token display/graphics to an random image from an RollableTable with the same name
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
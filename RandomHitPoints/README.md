This is a script for roll20.net
You need to have access to API at roll20.net + follow steps below


// By:       Rino
// Contact:  https://app.roll20.net/users/799859/rino

/*
 * This script rolls the monsters Hit Dice (+any con) and sets this as it's Hit Points in one of the "bubbles" above the token
 *
 * To use:
 *  - By design it only works with DnD 5e character sheet from Actoba (default DnD 5e charsheet) 
 *  - It only works for NPCs
 *  - The NPC must have an charactersheet, and it must be clicked to "NPC Sheet" (top selection when inside the sheet)
 *  - The field "HP Hit Dice" must be filled out without any Con bonus (i.e. "6d6" is correct. "6d6+5" is not correct)
 *  - The "CON" stat on the npc sheet must be filled out
 * 
 *  - By default it will not roll Hit Points below "One third Hit Dice + Con bonus". That is a little below average.
 *    If you want to have the posibility to have all range of HP, you should set the variable "useMinimumOneThirdHP" to "false"
 *    The variable is set long up in the script.
 *
 *  - You must set which "bubble" you will use for HP. By default it uses the RED bubble (the one to the left).
 *    If you want to change to another bubble, example: Green, you need to set the variable "HP_BAR_ID" (3=red, 2=blue, 1=green)
 *    The variable is set long up in the script.
 *
 *  - Do NOT link this bubble to the character sheet's Hit Points. The bubble should stay UNLINKED.
 *
 *  - Everytime you now drag this icon to the map, it's HP will by rolled for - creating unique Hit points pr token.
 */
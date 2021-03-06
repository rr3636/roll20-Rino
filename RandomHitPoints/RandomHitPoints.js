// Github:   https://github.com/rr3636/roll20-Rino
// By:       Rino
// Contact:  https://app.roll20.net/users/799859/rino

/*
 * This script rolls the monsters Hit Dice (+any con) and sets this as it's Hit Points in one of the "bubbles" above the token
 *
 * version: 0.4
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

(function() {
    'use strict';

    //HP_BAR_ID - The bar used top track real HP [1, 2, 3]. This can be linked to HP on a charactersheet.
    var HP_BAR_ID = 3;

    //Set token's HP to minimum it's (1/3 HD + con*lvl) HP?
    var useMinimumOneThirdHP = true;

    //misc variables
    var i;

    //Set the new HP on the token
    var setHitPoints = function(obj,rolledHP){
        obj.set("bar" + HP_BAR_ID + "_value", rolledHP);
        obj.set("bar" + HP_BAR_ID + "_max", rolledHP);
    }

    on("ready", function() {
        log("API is ready (Script: RandomHitPoints)");
    
        on("add:graphic", function(obj) {
            //Exit if the token doesn't have an charactersheet
            var CharacterID = obj.get("represents");
            if(CharacterID == "")
                return;
        
            //Get the object for "npc_constitution"
            var npcConstitutionObj = findObjs({_characterid : CharacterID, _type : "attribute", name : "npc_constitution"})[0];
        
            //Exit if npcConstitutionObj is undefined (i.e. the charactersheet doesn't have this attribute)
            if(npcConstitutionObj == undefined)
                return;
            
            //Get the value of "npc_constitution"
            var npcConstitution = npcConstitutionObj.get("current");
        
            //exit if "npcConstitution" doesn't contain a number
            if(isNaN(npcConstitution))
                return;
        
            //Exit if the token doesn't represents an NPC
            if(parseInt(findObjs({_characterid : CharacterID, _type : "attribute", name : "is_npc"})[0].get("current")) != 1)
                return;
        
            //Get the object for "npc_HP_hit_dice"
            var npcHPhitDiceObj = findObjs({_characterid : CharacterID, _type : "attribute", name : "npc_HP_hit_dice"})[0];
        
            //Exit if npcHPhitDiceObj is undefined (i.e. the charactersheet doesn't have this attribute)
            if(npcHPhitDiceObj == undefined)
                return;
        
            //Get the value of "npc_HP_hit_dice"
            var npcHPhitDice = npcHPhitDiceObj.get("current");
        
            //Exit if "npcHPhitDice" is not valid
            var npcHPhitDiceArray = npcHPhitDice.split("d");
            if(npcHPhitDiceArray.length != 2)
                if(isNaN(npcHPhitDiceArray[0]) || isNaN(npcHPhitDiceArray[1]))
                    return;
        
            //Roll the dices.... to get a random new HP
            var conValue = Math.floor((parseInt(npcConstitution) - 10) / 2);
            var numberOfDices = parseInt(npcHPhitDiceArray[0]);
            var diceSize = parseInt(npcHPhitDiceArray[1]);
            var oneThirdHP = Math.floor(((diceSize + 1) / 3) * numberOfDices) + (conValue * numberOfDices);
            var rolledHP = conValue * numberOfDices;
            for (i = 1; i < (numberOfDices + 1); i++){
                rolledHP += randomInteger(diceSize);;
            }

            //if we're using minimum "averageHP", and "rolledHP" is less - then we use "averageHP" instead
            if(useMinimumOneThirdHP && (rolledHP < oneThirdHP))
                rolledHP = oneThirdHP;
                
            //If by chance rolledHP now is below 1, we set it to 1
            if(rolledHP<1)
                rolledHP = 1;

            //Update Hit Points on the token after 1 second - since 0-3 changes happen after 'add', and they overwrite if we apply right now
            setTimeout(_.bind(setHitPoints,this,obj,rolledHP), 1000);
        });
    });
})();
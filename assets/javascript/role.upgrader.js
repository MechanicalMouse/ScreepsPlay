const roleUpgrader = {
    
    /** Upgrader params **/
    run: function(creep) {
        
        /*If target room is defined and creep is not in it...*/
        if (creep.memory.target != undefined && creep.room.name != creep.memory.target) {
            /*... Find exit, move to it*/
            const exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
            return;
        }

        /*If creep needs energy, harvest*/
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
        }

        /*If creep has energy, upgrade*/
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
        }

        /*If creep is not close to the controller, move to it and upgrade*/
        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        /*If creep is not close to an energy source, move to it and harvest*/
        else {
            const sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }

}
module.exports = roleUpgrader;
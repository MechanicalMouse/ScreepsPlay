const roleMiner = {
    

    /** Miner params **/
    run: function(creep) {
        
        /*If target room is defined and creep is not in it*/
        if (creep.memory.target != undefined && creep.room.name != creep.memory.target) {
            /*Find exit, move to it*/
            const exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
            return;
        }

        /*Find container to mine into*/
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && 
                structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
            }
        });
        
        /*If there are multiple, switch between them*/
        if(targets.length > 0) {
            const source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.pos.getRangeTo(targets[0]) == 0) {
                creep.harvest(source);
            } 
            else {
                creep.moveTo(targets[0]);
                creep.harvest(source);
            }
        }
    }
    
};    

module.exports = roleMiner;

const roleMiner = {
    

    /** miner params **/
    run: function(creep) {
            
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
            }
        });
            
        if(targets.length > 0) {
            if(creep.pos.getRangeTo(targets[0]) == 0) {
                const source = creep.pos.findClosestByPath(FIND_SOURCES);
                    creep.harvest(source);
            } 
            else {
                creep.moveTo(targets[0]);
                const source = creep.pos.findClosestByPath(FIND_SOURCES);
                    creep.harvest(source);
            }
        }
    }
    
};    

module.exports = roleMiner;

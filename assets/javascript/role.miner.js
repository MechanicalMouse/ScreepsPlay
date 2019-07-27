const roleMiner = {
    

    /** miner params **/
    run: function(creep) {
            
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
            }
        });
            
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

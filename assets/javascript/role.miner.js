const roleMiner = {
    

    /** Miner params **/
    run: function(creep) {
        
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

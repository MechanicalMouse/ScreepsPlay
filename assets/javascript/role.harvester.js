const roleHarvester = {

    /** Harvester params **/
    run: function(creep) {
        
        if(creep.carry.energy < creep.carryCapacity) {
            const containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER)
                     && (structure.store[RESOURCE_ENERGY] > 0);
                }
            });

            //const source = creep.room.storage;
            let source = creep.pos.findClosestByPath(containers);
            if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
            //if (source == undefined) {
                //source = creep.room.storage;
            //}

            const sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            // try to harvest energy, if the source is not in range...
            if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                // ...move towards the source
                creep.moveTo(sources);
            }
        }
        else {
            
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });

            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
                }
            }
            else {
                const hoard = creep.room.storage;
                if(creep.transfer(hoard, 'energy', creep.carry[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(hoard, {visualizePathStyle: {stroke: '#00ff00'}});
                }
            }

        }
        
    }
};
    
module.exports = roleHarvester;
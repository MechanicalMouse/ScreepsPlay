const rolePhalanx = {
    
    /** Phalanx params **/
    run: function(creep) {
        
        const closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            creep.attack(closestHostile);
        }

        if(creep.carry.energy < creep.carryCapacity) {
            const containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER)
                     && (structure.store[RESOURCE_ENERGY] > 0);
                }
            });
            const source = creep.pos.findClosestByPath(containers);
            if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
            
            
            const sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0,1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0,1]);
                creep.say('Harvest')
            }
        }
        else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) &&
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


    

module.exports = rolePhalanx;
const rolePhalanx = {
    
    /** Phalanx params **/
    run: function(creep) {

        /*If target room is defined and creep is not in it*/
        if (creep.memory.target != undefined && creep.room.name != creep.memory.target) {
            /*Find exit, move to it*/
            const exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
            /*Spot to move to in new room*/
            const posInAnotherRoom = new RoomPosition(33, 28, 'W8N8');
            creep.moveTo(posInAnotherRoom);
            return;
        }

        const closestHostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            creep.moveTo(closestHostile);
            creep.attack(closestHostile);
        }

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
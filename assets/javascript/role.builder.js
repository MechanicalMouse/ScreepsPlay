const roleBuilder = {
    
    /** builder params **/
    run: function(creep) {
        
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('Harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('Build');
        }
        
        if(creep.memory.building){
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            else {
                let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax
                });
                
                targets.sort((a,b) => a.hits - b.hits);

                if(targets.length > 0) {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(targets[0]);
                    }
                }
            }
        }
        else {
            const containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0);
                }
            });
            const source = creep.pos.findClosestByPath(containers);
            if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
            
            //const sources = creep.room.find(FIND_SOURCES);
            //if(creep.harvest(sources[0,1]) == ERR_NOT_IN_RANGE) {
                //creep.moveTo(sources[0,1], {visualizePathStyle: {stroke: '#ffaa00'}});
            //}
        }
    }
}

module.exports = roleBuilder;
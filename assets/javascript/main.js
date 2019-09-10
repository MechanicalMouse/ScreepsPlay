/*Require job modules*/
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleMiner = require('role.miner');
const rolePhalanx = require('role.phalanx');
const rolePioneer = require('role.pioneer');

module.exports.loop = function () {

    /*Tower code*/
    const towers = _.filter(Game.structures, structure => structure.structureType == STRUCTURE_TOWER);
    //for each tower
    for (let tower of towers) {
        //find closes hostile creep
        const target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        /*If target is found, attack*/
        if (target != undefined) {
            tower.attack(target);
        }
    }

    const tower1 = Game.getObjectById('5d37cacb496c401707466f7d');
    if(tower1) {
        let closestDamagedStructure = tower1.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (//structure.structureType == STRUCTURE_RAMPART ||
                structure.structureType == STRUCTURE_CONTAINER ||
                structure.structureType == STRUCTURE_ROAD) &&
                structure.hits < structure.hitsMax;
            }
        });
        if(closestDamagedStructure) {
            tower1.repair(closestDamagedStructure);
        }
    }

    const tower2 = Game.getObjectById('5d48bc9573beb779f0885c4e');
    if(tower2) {
        let closestDamagedStructure = tower2.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (//structure.structureType == STRUCTURE_RAMPART ||
                structure.structureType == STRUCTURE_CONTAINER ||
                structure.structureType == STRUCTURE_ROAD) &&
                structure.hits < structure.hitsMax;
        }
        });
        if(closestDamagedStructure) {
            tower2.repair(closestDamagedStructure);
        }
    }

    /*End of tower code*/

    /*Clear memory if a creep dies*/
    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing dead creep memory', name);
        }
    }
    
    /*Track how many of each creep, console.log current number*/
    for (let spawnName in Game.spawns) {
      let spawn = Game.spawns[spawnName];
      let creepsInRoom = spawn.room.find(FIND_MY_CREEPS);

        const harvesters = _.filter(creepsInRoom, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);
        const upgraders = _.filter(creepsInRoom, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgraders: ' + upgraders.length);
        const builders = _.filter(creepsInRoom, (creep) => creep.memory.role == 'builder');
        console.log('Builders: ' + builders.length);
        const miners = _.filter(creepsInRoom, (creep) => creep.memory.role == 'miner');
        console.log('Miners: ' + miners.length);
        const phalanx = _.filter(creepsInRoom, (creep) => creep.memory.role == 'phalanx');
        console.log('Phalanx: ' + phalanx.length);
    
    
        /*Spawn codes and amounts for each creep type*/
        let newName = undefined;
    
        if(harvesters.length < 3) {
            newName = 'Harvester' + Game.time;
            console.log('Spawning Harvester: ' + newName);
            spawn.spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE], newName,
                {memory: {role: 'harvester'}});
        }
    
        if (spawn.memory.claimRoom != undefined) {
            newName = 'Pioneer' + spawn.memory.claimRoom;
            console.log('Spawning Pioneer: ' + newName);
            spawn.spawnCreep([CLAIM,MOVE], newName,
                {memory: {role: 'pioneer'}});
            if (!(newName < 0)) {
                /*When pioneer creep is spawned, remove room from the list*/
                delete spawn.memory.claimRoom;
            }
        }
    
        if(upgraders.length < 3) {
            newName = 'Upgrader' + Game.time;
            console.log('Spawning Upgrader: ' + newName);
            spawn.spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE], newName,
                {memory: {role: 'upgrader'}});
        }
        
        if(builders.length < 3) {
            newName = 'Builder' + Game.time;
            console.log('Spawning Builder: ' + newName);
            spawn.spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName,
                {memory: {role: 'builder'}});
        }
    
        if(miners.length < 1) {
            newName = 'Miner' + Game.time;  
            console.log('Spawning Miner: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName,
                {memory: {role: 'miner'}});
        }
    
        if(phalanx.length < 2) {
            newName = 'Phalanx' + Game.time;
            console.log('Spawning Phalanx: ' + newName);
            spawn.spawnCreep([TOUGH,WORK,CARRY,CARRY,MOVE,ATTACK,ATTACK], newName,
                {memory: {role: 'phalanx'}});
        }
        /*End of creep type spawn codes*/

        /*Spawner announces what it's spawning*/
        if(spawn.spawning) {
        const spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
            spawningCreep.memory.role,
            spawn.pos.x + 1,
            spawn.pos.y,
            {align: 'left', opacity: 0.8});
        }
    }

    /*Using roles assigned at spawn, run the job module*/
    for(const name in Game.creeps) {
        const creep = Game.creeps[name];
        
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'phalanx') {
            rolePhalanx.run(creep);  
        }
        if(creep.memory.role == 'pioneer') {
            rolePioneer.run(creep);  
        }
    }
}
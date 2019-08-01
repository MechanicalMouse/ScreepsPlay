const roleHarvester = require('role.harvester')
const roleUpgrader = require('role.upgrader')
const roleBuilder = require('role.builder')
const roleMiner = require('role.miner')
const rolePhalanx = require('role.phalanx')

module.exports.loop = function () {

    const tower = Game.getObjectById('5d304a5183a670625d51cccf');
    const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile) {
        tower.attack(closestHostile);
    }
    //if(tower) {
        //let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            //filter: (structure) => {
                //return (structure.structureType == STRUCTURE_ROAD) &&
                //structure.hits < structure.hitsMax;
            //}
        //});
        //if(closestDamagedStructure) {
            //tower.repair(closestDamagedStructure);
        //}
    //}
    

    const tower2 = Game.getObjectById('5d37cacb496c401707466f7d');
    const closestHostile2 = tower2.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile2) {
        tower2.attack(closestHostile2);
    }
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

    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing dead creep memory', name);
        }
    }
    
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    const miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    console.log('Miners: ' + miners.length);
    const phalanx = _.filter(Game.creeps, (creep) => creep.memory.role == 'phalanx');
    console.log('Phalanx: ' + phalanx.length);
    
    if(harvesters.length < 4) {
        let newName = 'Harvester' + Game.time;
        console.log('Spawning Harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }
    
    if(upgraders.length < 3) {
        let newName = 'Upgrader' + Game.time;
        console.log('Spawning Upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }
    
    if(builders.length < 3) {
        let newName = 'Builder' + Game.time;
        console.log('Spawning Builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
    }
    
    if(miners.length < 1) {
        let newName = 'Miner' + Game.time;  
        console.log('Spawning Miner: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName,
            {memory: {role: 'miner'}});
    }
    
    if(phalanx.length < 2) {
        let newName = 'Phalanx' + Game.time;
        console.log('Spawning Phalanx: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([TOUGH,WORK,CARRY,CARRY,MOVE,ATTACK,ATTACK], newName,
            {memory: {role: 'phalanx'}});
    }
    
    if(Game.spawns['Spawn1'].spawning) {
        const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    
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
    }
}
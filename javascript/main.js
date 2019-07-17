const roleHarvester = require('role.harvester')
const roleUpgrader = require('role.upgrader')

module.exports.loop = function () {
    
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
    
    //if(harvesters.length < 1) {
        //let newName = 'Harvester' + Game.time;
        //console.log('Spawning harvester:' + newName);
        //Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            //{memory: {role: 'harvester'}});
    //}
    
    if(upgraders.length < 3) {
        let newName = 'Upgrader' + Game.time;
        console.log('Spawning upgrader:' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
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
        if( creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}
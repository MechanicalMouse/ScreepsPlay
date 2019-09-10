const rolePioneer = {

    /** Pioneer params **/
    run: function(creep) {
        
        /*If target room is defined and creep is not in it*/
        if (creep.room.name != creep.memory.target) {
          /*Find exit, move to it*/
          const exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        else {
          /*Move to and claim controller...*/
          let i = creep.claimController(creep.room.controller);
            if (i === ERR_NOT_IN_RANGE) {
              creep.moveTo(creep.room.controller);
            /*... Unless GCL is too low*/
            } else if (i === ERR_GCL_NOT_ENOUGH) {
              creep.say('GCL<');
              i = creep.reserveController(creep.room.controller);
            }
        }

    }
};

module.exports = rolePioneer;
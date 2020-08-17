var game = (function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
  
    var player = {
      x:0,
      y:475,
      h: 25,
      w: 25,
      fill: '#fff',
      dir: 'right',
      speed: 5
    }
  
    var spawn = {
      x: 50,
      y: 0,
      h: 10,
      w: 10,
      fill: '#ff0',
      speed: 5
    }
  
    //1. Initialize an Object of spawns
    var spawns = {}
  
    //2. Initialize a variable for launching spawns.
    var spawner = null;
  
  
    function launchSpawns(){
      //3. Create a new enemy spawn every 400 ms
      spawner = setInterval(()=>{
        //4. Use psuedo-random strings to name the new spawns
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";
  
        for (var i = 0; i < 10; i++){
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
  
        //5. Add the new spawn to the Object of Spawns
        spawns[text] = {
          x:Math.floor(Math.random()*this.canvas.width),
          y:spawn.y,
          h:spawn.h,
          w:spawn.w,
          fill:spawn.fill,
          speed:spawn.speed,
        }
  
      },400);
    }
  
    //6. Move all spawns
    function moveSpawns(){
  
      //7. Loop through the Object of spawns
      //and move each one individually.
      //This will look a lot like movePlayer()
      if(Object.keys(spawns).length>0){
        for(let spawn in spawns){
  
          //8. Only move the spawn, if the spawn has not 
          //moved off of the screen.
          if(spawns[spawn].y<=canvas.height){
  
            ctx.fillStyle = spawns[spawn].fill;
  
            ctx.save();
  
            ctx.clearRect(
              spawns[spawn].x-1,
              spawns[spawn].y-spawns[spawn].speed,
              spawns[spawn].w+2,
              spawns[spawn].h+2
            );
  
            ctx.fillRect(
              spawns[spawn].x,
              spawns[spawn].y = (spawns[spawn].y+spawns[spawn].speed),
              spawns[spawn].w,
              spawns[spawn].h
            );
  
            ctx.restore();
            
  
          }else{
            //9. Delete the spawn from the Object of spawns if 
            // that spawn has moved off of the screen.
            delete spawns[spawn];
          }
        }
      }
  
    }
  
    return {
  
      player: function(){
        ctx.fillStyle=player.fill;
  
        if(player.dir === 'right'){
  
          ctx.clearRect(
            player.x-player.speed,
            player.y-1,
            player.w+2,
            player.h+2
          );
  
          ctx.fillRect(
            player.x = (player.x + player.speed),
            player.y,
            player.w,
            player.h
          );
  
          if((player.x + player.w) >= canvas.width){
            player.dir = 'left';
          }
  
        }else{
  
          ctx.clearRect(
            player.x+player.speed,
            player.y-1,
            player.w+2,
            player.h+2
          );
  
          ctx.fillRect(
            player.x = (player.x - player.speed),
            player.y,
            player.w,
            player.h
          );
  
          if(player.x <= 0){
            player.dir = 'right';
          }
        }
      },
  
      changeDirection: function(){
        if(player.dir === 'left'){
          player.dir = 'right';
        }else if(player.dir === 'right'){
          player.dir = 'left';
        }
      },
  
      animate: function(){
        this.player();
        //10. Add moveSpawns to the animation frame.
        moveSpawns();
        window.requestAnimationFrame(this.animate.bind(this));
      },
  
      init: function(){
        canvas.height = 600;
        canvas.width = 800;
  
        launchSpawns();
        this.animate();
      }
    }
  })();
  
  game.init();
  
  window.addEventListener('keyup', function(){
    game.changeDirection();
  });
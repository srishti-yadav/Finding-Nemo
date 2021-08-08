// document is JS efers to the whole webpage we are working

// add images 

function load_images(){
    enemy_image = new Image;
    enemy_image.src = "images/jelly.png"

    player_image = new Image;
    player_image.src= "images/player1.png"
    // player_image.src= "images/smurf.png"

    target_image = new Image;
    target_image.src = "images/fish.png"

    coin_image = new Image;
    coin_image.src = "images/coin.png"

    coincoin_image = new Image;
    coincoin_image.src = "images/coincoin.png"
}

// Add movement to the bird

// Initialize object state
function init(){

     
// DOM tree traversal to find an element :-
canvas = document.getElementById('mycanvas');
console.log(canvas);
H= 560;
W =1270;

canvas.width = W;
canvas.height =H;

score =0;
game_over=false;

// to work with canvas, we use pen here
pen = canvas.getContext('2d');    // no var/let used hence it's a global variable
console.log(pen);
 // we want to create a bird using JSON object (key, value pairs):-
e1 ={        // this is bird object, unlike other lang. in JS we can directly instantiate an object without having a class
    x:300,
    y:200,
    w:70,
    h:70,
    speed:20,
};

e2 ={        // this is bird object, unlike other lang. in JS we can directly instantiate an object without having a class
    x:500,
    y:400,
    w:70,
    h:70,
    speed:20,
};
e3 ={        // this is bird object, unlike other lang. in JS we can directly instantiate an object without having a class
    x:900,
    y:300,
    w:70,
    h:70,
    speed:20,
};
e4 ={        // this is bird object, unlike other lang. in JS we can directly instantiate an object without having a class
    x:1100,
    y:300,
    w:70,
    h:80,
    speed:-20,
};


e5 ={        // this is bird object, unlike other lang. in JS we can directly instantiate an object without having a class
    x:1200,
    y:300,
    w:70,
    h:80,
    speed:-30,
};

enemy =[e1,e2,e3,e4,e5];

player ={        // this is bird object, unlike other lang. in JS we can directly instantiate an object without having a class
    x:100,
    y:200,
    w:70,
    h:70,
    speed:25,
    movingX: 0,
    movingY:0,
};

target ={
    x:1200,
    y:450,
    w:50,
    h:50,
    speed :30,   //  we can also add movement to nemo

};


c1 ={
    x:300,
    y:200,
    w:50,
    h:50,
    speed:-20,
    value: 50,

};

c2 ={
    x:500,
    y:400,
    w:50,
    h:50,
    speed: -30,
    value: 50,

};

c3 ={
    x:900,
    y:310,
    w:50,
    h:50,
    speed:30,
    value: 50,

};

c4 ={
    x:1100,
    y:300,
    w:50,
    h:50,
    speed:20,
    value: 50,

};

c5 ={
    x:290,
    y:470,
    w:50,
    h:50,
    speed:20,
    value: 50,

};


c6 ={
    x:1010,
    y:470,
    w:50,
    h:50,
    speed:0,
    value: 50,

};

coin =[c1,c2,c3,c4,c5, c6];
 // create eventListners from 
  canvas.addEventListener('mousedown', function(){         // anonomous func. 
      console.log('You pressed the mouse');
      player.movingX= 1;
  });
  canvas.addEventListener('mouseup', function(){
    console.log('You released the mouse');
    player.movingX =0;
});

  document.addEventListener('keydown', function(e){    // 39: right; 37: left; 38: up; :  40 :down 
      console.log("You pressed a key :") ;
      if(e.keyCode == '39')  // right
      player.movingX= 1;

      if(e.keyCode == '37')  // left
      player.movingX= -1;

      if(e.keyCode == '38')  // down
      player.movingY= -1;

      if(e.keyCode == '40')  // up
      player.movingY= 1;

  });

}

img_change = 0;
// Game loop concept 

function draw(){
    if(player.movingX || player.movingY){
    img_change= 1; }

    if(img_change>0){
        player_image.src= "images/player1.png"   ;
        img_change =-1;
        }
        
        else if(img_change <0){
            player_image.src= "images/player11.png"   ;
            img_change = 1;
        }

    pen.clearRect(0,0,W,H);
    pen.fillStyle= "red";
//Draw this on screen
pen.drawImage(player_image,player.x,player.y,player.w, player.h);  // to draw player on screen

pen.drawImage(target_image,target.x,target.y,target.w, target.h);  // to draw target on screen


for(let i=0;i <coin.length; i++){
    if(coin[i].value ==0)
    pen.drawImage(coincoin_image,coin[i].x,coin[i].y,coin[i].w, coin[i].h);
    else 
    pen.drawImage(coin_image,coin[i].x,coin[i].y,coin[i].w, coin[i].h);
}
//pen.fillRect(bird.x,bird.y,bird.w, bird.h);

for(let i=0;i <enemy.length; i++){
     pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w, enemy[i].h);
}
pen.fillStyle="white";
pen.font ="20px monospace";
pen.fillText("Finding Nemo",20,20);
pen.fillText("Your Score : " +score,20, 40);
//pen.fillText("Time  : " +score,20, 60);

}
 
function isCollision(b1,b2){
    if(Math.abs(b1.x-b2.x) <=30 && Math.abs(b1.y-b2.y) <=30)
     return true;
    return false; 
}


//  UPDATE Function
function update(){
     if(isCollision(player, target)){   // Final when we reach the target
        game_over =true; 
        player.moving = false;
        draw();
        alert("Congratulations !!\nYour Score :"+ score);
     }
    
     for(let i=0; i<coin.length; i++){     // When collision with coin
        if(isCollision(coin[i],player)){ 
          score += coin[i].value; 
          coin[i].value= 0;
                 

        }
    }
   

     for(let i=0; i<enemy.length; i++){     // When collision with enemy
         if(isCollision(enemy[i],player)){
            game_over =true; 
            player.moving = false;
            init();
            draw();
            alert("Sorry, Game Over  :( "); 
         }
     }
    
    if(player.movingX== 1){
     player.x += player.speed;
     player.movingX= 0;
    }
    if(player.movingX== -1){
        player.x -= player.speed;
      player.movingX= 0;
       }
    if(player.movingY== 1){
        player.y += player.speed;
      
        player.movingY= 0;
       }
    if(player.movingY== -1){
        player.y -= player.speed;
        player.movingY= 0;
       }   

     target.y += target.speed;          // Movement to target (nemo)
       if(target.y >=(H-target.h) || target.y <0){
          target.speed *= -1;
      }

    for(let i=0;i <enemy.length; i++){
        enemy[i].y += enemy[i].speed;
         if(enemy[i].y >=(H-enemy[i].h) || enemy[i].y <0){
            enemy[i].speed *= -1;
        }
    }
    // Adding movement to the coins
    for(let i=0;i <coin.length; i++){
        coin[i].y += coin[i].speed;
         if(coin[i].y >=(H-coin[i].h) || coin[i].y <0){
            coin[i].speed *= -1;
        }
    }
}

function gameloop(){
     // console.log("in game loop")
    
    draw();
    update();
    if(game_over) {  //   to stop the game loop
    clearInterval(f);     // this stops the f i.e the gameloop 
    }   
}

// START  of the GAME 
load_images();
init();  // object is initialized but not drawn on screen
// To object is drawn on screen we can repeatedly call gameloop()
var f= setInterval(gameloop,200);  // to call after some interval



// For player to respond when triggered from keyboard , we use eventListners of JS


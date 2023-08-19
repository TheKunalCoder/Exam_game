//The code begins
var finishLine, coinGroup, coneGroup, pb
function preload() {
  raceTrack = loadImage("track.jpg")
  car = loadImage("car.png")
  pbImg = loadImage("playB.png")
  coinImg = loadImage("coin.png")
  blockerImg = loadImage("cones.png")
}
//function setup
function setup() {
  createCanvas(1024, 200)
  flag = false
  //track creation 
  track = createSprite(width * 2, height / 2, width * 4, height)
  track.addImage(raceTrack)
  track.x = track.width / 2
  track.scale = 1

  //car creation
  car1 = createSprite(5, height / 2)
  car1.addImage(car)
  car1.scale = .15
  car1.mirrorY(-1)

  //play button creation
  pb = createSprite(width / 2, height / 2)
  pb.addImage(pbImg)
  pb.scale = 0.05
  pb.visible = true



  //cone creation
  coneGroup = new Group()
  cone = createSprite(250, height / 2)
  cone.addImage(blockerImg)
  cone.scale = 0.1
  coneGroup.add(cone)

  cone = createSprite(420, height / 2)
  cone.addImage(blockerImg)
  cone.scale = 0.1
  coneGroup.add(cone)

  cone = createSprite(590, height / 2)
  cone.addImage(blockerImg)
  cone.scale = 0.1
  coneGroup.add(cone)

  cone = createSprite(760, height / 2)
  cone.addImage(blockerImg)
  cone.scale = 0.1
  coneGroup.add(cone)

  gameState = "wait"

  coinGroup = new Group()


  score = 0
  end = createSprite(1000, height / 2, 50, height)
  end.visible = false
}
//function draw
function draw() {

  drawSprites()

  textSize(24)
  fill("yellow")
  text("score =" + score, width - 250, height - 170)
  //waiting
  if (gameState === "wait") {
    pb.visible = true
    fill("red")
    textSize(30)
    text("driving test", 150, height - 150)
    if (mousePressedOver(pb)) {
      coinReset()
      gameState = "play"
    }
  }
  //playing
  else if (gameState === "play") {

    pb.visible = false

    if (keyDown("right")) {
      car1.velocityX = 6
    }
    if (keyDown("up") && car1.y >= 25) {
      car1.y -= 15
    }
    if (keyDown("down") && car1.y <= height - 25) {
      car1.y += 15
    }

    if (car1.isTouching(end)) {
      console.log("yes")
      car1.setVelocity(0, 0)
      coinGroup.destroyEach()
      flag = true
      if (score > 16) {
        gameState = "win"
      }
      else {
        gameState = "over"
      }
    }
    if (car1.isTouching(coneGroup)) {

      gameState = "over"
    }
    car1.overlap(coinGroup, destroyCoin)
    if (score === 5) {
      car1.velocityX = 9
      textSize(40)
      fill("red")
      text("LEVEL UP!", width / 2, height / 2)
    }


  }
  //finishing
  else if (gameState === "over") {
    reset()
    if (score <= 16 && flag === true) {
      textSize(12)
      fill("yellow")
      text("Coins should be greater than 16", 400, 50)
    }
    car1.setVelocity(0, 0)
    coinGroup.destroyEach()

    if (keyDown("r")) {
      gameState = "wait"
      score = 0
      car1.x = 5

    }

  }
  else if (gameState = "win") {
    fill("red")
    textSize(40)
    text("You Win,Liscence Granted", 200, height / 2)
    car1.setVelocity(0, 0)
    coinGroup.destroyEach()   

  }


}

function destroyCoin(p1, c1) {
  c1.destroy()
  score++
}

function coinReset() {
  for (i = 130; i <= 900; i = i + 50) {
    coin1 = createSprite(i, height - 50)
    coinGroup.add(coin1)
    coin1.addImage(coinImg)
    coin1.scale = .15
  }

  for (i = 130; i <= 900; i = i + 50) {
    coin1 = createSprite(i, height - 150)
    coinGroup.add(coin1)
    coin1.addImage(coinImg)
    coin1.scale = .15
  }
}

function reset() {
  fill("red")
  textSize(40)
  text("press R to restart", 400, height / 2 + 50)
  fill("red")
  textSize(30)
  text("Try Again", 400, height / 2)
}

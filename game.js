//The code begins
var finishLine, coinGroup, coneGroup
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

  score = 0
  end = createSprite(1000, height / 2, 50, 100)
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

    if (mousePressedOver(pb)) {
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
      gameState = "over"
    }
    else if (car1.isTouching(coneGroup)) {
      fill("red")
      textSize(60)
      text("Try Again", 400, height / 2)
      gameState = "over"
    }
  }
//finishing
  else if (gameState === "over") {
    car1.setVelocity(0, 0)
    coinGroup.destroyEach()
    if (keyDown("r")) {
      gameState = "wait"
      score = 0
      car1.x = 5
      coinReset()
    }
  }

  if (score === 5) {
    car1.velocityX = 9
    textSize(40)
    fill("red")
    text("LEVEL UP!", width / 2, height / 2)
  }

  if (score < 16 && gameState === "over") {
    fill("red")
    textSize(60)
    text("Try Again", 400, height / 2)
  }

  else if (score > 16 && gameState === "over") {
    fill("red")
    textSize(60)
    text("You Win,Liscence Granted", 200, height / 2)
  }
  car1.overlap(coinGroup, destroyCoin)

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



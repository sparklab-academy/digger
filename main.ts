controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    right = digger.tilemapLocation().getNeighboringLocation(CollisionDirection.Right)
    if (tiles.tileAtLocationEquals(right, assets.tile`transparency16`)) {
        bottom_right = right.getNeighboringLocation(CollisionDirection.Bottom)
        tiles.setTileAt(bottom_right, assets.tile`transparency16`)
        tiles.setWallAt(bottom_right, false)
        holes_locations.push(bottom_right)
        holes_time.push(game.runtime())
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleBlueCrystal, function (sprite, location) {
    current_level = current_level + 1
    Load_Level()
    pause(1000)
})
function Load_Level () {
    if (current_level == 1) {
        tiles.setCurrentTilemap(tilemap`level0`)
    } else if (current_level == 2) {
        tiles.setCurrentTilemap(tilemap`level1`)
    } else {
        game.gameOver(true)
    }
    tiles.placeOnRandomTile(digger, sprites.dungeon.collectibleInsignia)
    digger.ay = 150
}
let bottom_right: tiles.Location = null
let right: tiles.Location = null
let digger: Sprite = null
let current_level = 0
let holes_time: number[] = []
let holes_locations: tiles.Location[] = []
let time_to_refill_hole = 5000
holes_locations = []
holes_time = []
current_level = 1
digger = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
scene.cameraFollowSprite(digger)
controller.moveSprite(digger, 100, 0)
Load_Level()
game.onUpdateInterval(500, function () {
    while (time_to_refill_hole < game.runtime() - holes_time[0]) {
        tiles.setTileAt(holes_locations[0], sprites.dungeon.floorDark2)
        tiles.setWallAt(holes_locations[0], true)
        holes_time.shift()
        holes_locations.shift()
        if (tiles.tileAtLocationEquals(digger.tilemapLocation(), sprites.dungeon.floorDark2)) {
            game.gameOver(false)
        }
    }
})

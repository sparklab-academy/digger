def on_a_pressed():
    global right, bottom_right
    right = digger.tilemap_location().get_neighboring_location(CollisionDirection.RIGHT)
    if tiles.tile_at_location_equals(right, assets.tile("""
        transparency16
        """)):
        bottom_right = right.get_neighboring_location(CollisionDirection.BOTTOM)
        tiles.set_tile_at(bottom_right, assets.tile("""
            transparency16
            """))
        tiles.set_wall_at(bottom_right, False)
        pause(time_to_refill_hole * 1000)
        tiles.set_tile_at(bottom_right, sprites.dungeon.floor_dark2)
        tiles.set_wall_at(bottom_right, True)
        if tiles.tile_at_location_equals(digger.tilemap_location(), sprites.dungeon.floor_dark2):
            game.game_over(False)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_overlap_tile(sprite, location):
    game.game_over(True)
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.collectible_blue_crystal,
    on_overlap_tile)

bottom_right: tiles.Location = None
right: tiles.Location = None
time_to_refill_hole = 0
digger: Sprite = None
tiles.set_current_tilemap(tilemap("""
    level1
    """))
digger = sprites.create(img("""
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
        """),
    SpriteKind.player)
tiles.place_on_random_tile(digger, sprites.dungeon.collectible_insignia)
controller.move_sprite(digger, 100, 0)
digger.ay = 150
scene.camera_follow_sprite(digger)
time_to_refill_hole = 2
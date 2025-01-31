import pygame, sys
import random
import math
from pygame.draw import *
from pygame.display import *
from math import sqrt

#frame
size = width, height = 1000, 500
frame_color = [0, 0, 0]

#ball
ball_color = [255, 212, 0]
[dx, dy] = [4, 4]
r = 20
[x, y] = [width / 2, height / 2]
b_speed = sqrt(dx * dx + dy * dy)

#paddles
p_size = p_width, p_height = width / 50, height / 5
p_speed = 8
player1 = player1_x, player1_y = 0, height / 2 - p_height / 2
player2 = player2_x, player2_y = width - p_width, height / 2 - p_height / 2
player1_color = [190, 0, 0]
player2_color = [0, 0, 146]
player1_score = 0
player2_score = 0

#general
game = 0

def display():
    global x, y, ball_color, r, player1, player2, player1_color, player2_color
    screen.fill(frame_color)
    pygame.draw.circle(screen, ball_color, [x,y], r, 0)
    pygame.draw.rect(screen, player1_color, pygame.Rect(player1_x, player1_y, p_width, p_height))
    pygame.draw.rect(screen, player2_color, pygame.Rect(player2_x, player2_y, p_width, p_height))

def ball_moves():
    global x, y, dx, dy
    x += dx
    y += dy

def reset_ball():
    global x, y, dx, dy, b_speed
    [x, y] = [width / 2, height / 2]
    b_speed = sqrt(dx * dx + dy * dy)

    rand = random.random()
    if rand < 0.5:
        angle = rand * (math.pi / 2) - (math.pi / 4)
    else:
        angle = rand * (math.pi / 2) + (3 * math.pi / 4)

    dx = b_speed * math.cos(angle)
    dy = b_speed * math.sin(angle)

def update():
    global x, y, width, height, r, dx, dy, player1_score, player2_score
    if y <= r or y >= height - r:
        dy = -dy

    if x - r < p_width and y > player1_y and y < player1_y + p_height:
        dx = -dx * 1.1
        if dx > 15:
            dx = 15

    if x + r > width - p_width and y > player2_y and y < player2_y + p_height:
        dx = -dx * 1.1
        if dx > 15:
            dx = 15

    if x - r < 0:
        player2_score = player2_score + 1
        reset_ball()
    
    if x + r > width:
        player1_score = player1_score + 1
        reset_ball()

def move_paddle():
    global player1_y, player2_y, p_speed, game
    if game == 0:
        if pygame.key.get_pressed()[pygame.K_SPACE]:
            new_game()
    if pygame.key.get_pressed()[pygame.K_w] and player1_y > 0:
        player1_y -= p_speed
    if pygame.key.get_pressed()[pygame.K_s] and player1_y < height - p_height:
        player1_y += p_speed
    if pygame.key.get_pressed()[pygame.K_UP] and player2_y > 0:
        player2_y -= p_speed
    if pygame.key.get_pressed()[pygame.K_DOWN] and player2_y < height - p_height:
        player2_y += p_speed

def event():
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        if event.type == pygame.KEYDOWN:
            move_paddle()

def check_score():
    global player1_score, player2_score, game
    if player1_score == 3:
        game = 0

    if player2_score == 3:
        game = 0

def new_game():
    global game, player1_score, player2_score, dx, dy, b_speed
    game = 1
    player1_score = 0
    player2_score = 0
    dx = 4
    dy = 4
    b_speed = sqrt(dx * dx + dy * dy)
    reset_ball()

pygame.init()
pygame.key.set_repeat(10, 10)
screen = pygame.display.set_mode(size)

while True:
    display()
    check_score()
    if game == 1:
        ball_moves()
        update()
    pygame.display.flip()
    pygame.time.delay(15)
    event()

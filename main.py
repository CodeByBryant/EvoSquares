import pygame, sys
from utils.settings import *

class Screen:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
        self.clock = pygame.time.Clock()
        
        pygame.display.set_caption("Simulation")
        
    def setup(self):
        while True:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                    
            dt = self.clock.tick() / 1000
            pygame.display.update()
            
if __name__ == "__main__":
    screen = Screen()
    screen.setup()
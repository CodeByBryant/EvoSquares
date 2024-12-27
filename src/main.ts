/** 
 * @author By Bryant Ejorh - CodeByBryant
 * 
 * MIT License 2024
 * 
 * @fileoverview EvoSquares is a simple implementation of Evolutionary Squares using TypeScript and Canvas.
 * The agents move towards food and avoid obstacles, using a simple neural network for decision-making.

*/

/*
 * IMPORTS
 */

import "./main.css";
import AgentConfigData from "./utilities/AgentConfig.json" assert { type: "json" };
import { Agent, Food } from "./Agent";

/** 
  * canvasVariables is used to avoid global variables and enhances code readability and maintainability.

*/
export namespace canvasVariables {
  export const canvas: HTMLCanvasElement = document.createElement("canvas");
  document.body.appendChild(canvasVariables.canvas);

  export const context: CanvasRenderingContext2D = canvas.getContext("2d")!;

  // Resize the canvas to fit the window
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Enable image smoothing for smoother lines
  context.imageSmoothingEnabled = true;
}

(function () {
  const agents: Agent[] = [];
  const food: Food[] = [];

  // Generate agents based on AgentConfigData
  (function () {
    const {
      AgentCount,
      DefaultAgentSize: { width, height },
      EnableRotation,
    } = AgentConfigData;

    for (let i = 0; i < AgentCount; i++) {
      const x = Math.random() * (window.innerWidth - 0); // Random x within spawn area
      const y = Math.random() * (window.innerHeight - 0); // Random y within spawn area

      const agent = new Agent(x, y, width, height);

      if (EnableRotation) {
        // Randomize rotation angle for each agent
        agent.rotate(Math.random() * 2 * Math.PI); // Random rotation in radians
      }

      // Store the agent in the list
      agents.push(agent);
    }

    // Generate food based on AgentConfigData
    for (let i = 0; i < AgentConfigData.FoodSettings.SpawnCount; i++) {
      const x = Math.random() * (window.innerWidth - 0); // Random x within spawn area
      const y = Math.random() * (window.innerHeight - 0); // Random y within spawn area

      food.push(new Food(x, y, Math.random() * 10 + 1));
    }
  })();

  window.addEventListener("resize", () => {
    canvasVariables.canvas.width = window.innerWidth;
    canvasVariables.canvas.height = window.innerHeight;
  });

  // Animation loop
  const Update = () => {
    // Clear the canvas
    canvasVariables.context.fillStyle = "black";
    canvasVariables.context.fillRect(
      0,
      0,
      canvasVariables.canvas.width,
      canvasVariables.canvas.height
    );

    agents.forEach((agent) => {
      agent.update(agents);
      agent.render();
    });

    food.forEach((food) => {
      food.render();
    });

    // Continue the animation loop
    requestAnimationFrame(Update);
  };

  // Start the animation loop
  Update();
})(); // Create a list to store the agents

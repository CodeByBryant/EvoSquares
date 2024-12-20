import "./main.css";

// Import AgentConfig JSON
import AgentConfigData from "../utils/AgentConfig.json" assert { type: "json" };

// Import the Agent class
import { Agent, Food } from "./Agent";

// Setup canvas
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d")!;

// Create a list to store the agents
const agents: Agent[] = [];
const food: Food[] = [];

// Generate agents based on AgentConfigData
const spawnAgents = () => {
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
};

// Function to render the agents
const renderAgents = () => {
  agents.forEach((agent) => {
    // Update the agent's geometry
    agent.update(agents);

    if (AgentConfigData.RenderSensor) agent.Sensor.render(ctx);

    // Render the agent
    ctx.beginPath();
    const { polygon } = agent;

    // Move to the first vertex
    ctx.moveTo(polygon[0].x, polygon[0].y);

    // Draw lines to subsequent vertices
    for (let i = 1; i < polygon.length; i++) {
      ctx.lineTo(polygon[i].x, polygon[i].y);
    }

    // Close the polygon
    ctx.closePath();

    // Fill and stroke the polygon
    ctx.fillStyle = AgentConfigData.Rendering.FillColor;
    ctx.fill();
    ctx.strokeStyle = lightenHexColor(AgentConfigData.Rendering.FillColor, 1);
    ctx.lineWidth = AgentConfigData.Rendering.StrokeWidth;
    ctx.stroke();
  });
};

// Initialize the agents
spawnAgents();

// Animation loop
const Update = () => {
  // Resize canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Clear the canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Render the agents
  renderAgents();

  // Continue the animation loop
  requestAnimationFrame(Update);
};

// Start the animation loop
Update();

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// UTILITY FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////////////////////////

function lightenHexColor(hex: string, percentage: number): string {
  // Remove the '#' if it exists
  hex = hex.replace("#", "");

  // Convert hex to RGB
  let r: number = parseInt(hex.substring(0, 2), 16);
  let g: number = parseInt(hex.substring(2, 4), 16);
  let b: number = parseInt(hex.substring(4, 6), 16);

  // Increase the RGB values by the percentage (15%)
  r = Math.min(255, Math.round(r * (1 + percentage)));
  g = Math.min(255, Math.round(g * (1 + percentage)));
  b = Math.min(255, Math.round(b * (1 + percentage)));

  // Convert RGB back to hex
  let newHex: string =
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();

  return newHex;
}

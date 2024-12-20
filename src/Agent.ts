import { NeuralNetwork, Sensor } from "./NeuralNetwork";
import AgentConfigData from "../utils/AgentConfig.json" assert { type: "json" };

type Vertex = { x: number; y: number };

class Agent {
  public position: { x: number; y: number; rotation: number };
  public width: number;
  public height: number;

  public polygon: Vertex[];

  public NeuralNetwork: NeuralNetwork;
  public Sensor: Sensor;

  constructor(
    x: number = 0,
    y: number = 0,
    width: number = 10,
    height: number = 10
  ) {
    this.position = { x: x, y: y, rotation: 0 };

    // Dimensions
    this.width = width;
    this.height = height;

    this.polygon = this.getgeometry();

    this.NeuralNetwork = new NeuralNetwork([
      AgentConfigData.Sensor.RayCount + 3,
      20,
      10,
      20,
      4,
    ]);
    this.Sensor = new Sensor(this, AgentConfigData.Sensor);
  }

  public getgeometry(): Vertex[] {
    const verticies = [];

    // Calculate half the diagonal length of the rectangle
    const rad = Math.hypot(this.width, this.height) / 2;
    // Calculate the angle between the diagonal and the height
    const alpha = Math.atan2(this.width, this.height);

    verticies.push({
      x: this.position.x - Math.sin(this.position.rotation - alpha) * rad,
      y: this.position.y - Math.cos(this.position.rotation - alpha) * rad,
    });
    verticies.push({
      x: this.position.x - Math.sin(this.position.rotation + alpha) * rad,
      y: this.position.y - Math.cos(this.position.rotation + alpha) * rad,
    });
    verticies.push({
      x:
        this.position.x -
        Math.sin(Math.PI + this.position.rotation - alpha) * rad,
      y:
        this.position.y -
        Math.cos(Math.PI + this.position.rotation - alpha) * rad,
    });
    verticies.push({
      x:
        this.position.x -
        Math.sin(Math.PI + this.position.rotation + alpha) * rad,
      y:
        this.position.y -
        Math.cos(Math.PI + this.position.rotation + alpha) * rad,
    });

    return verticies;
  }

  public move(dx: number, dy: number): void {
    this.position.x += dx;
    this.position.y += dy;
    this.polygon = this.getgeometry();
  }

  public rotate(dr: number): void {
    this.position.rotation =
      (this.position.rotation + dr + 2 * Math.PI) % (2 * Math.PI);
    this.polygon = this.getgeometry();
  }

  public update(entities: any[]): void {
    this.polygon = this.getgeometry();
    this.Sensor.update(entities);

    // Raycast Results
    const offsets = this.Sensor.output.map((e) =>
      e == null ? 0 : 1 - e.offset
    );

    // Basic Self Awareness
    const output = this.NeuralNetwork.feedForward(
      [this.position.x, this.position.y, this.position.rotation].concat(offsets)
    );

    const FORWARD = output[0];
    const BACKWARD = output[1];
    const CLOCKWISE_ROTATION = output[2];
    const CCW_ROTATION = output[3];

    // Movement and rotation constants
    const movementSpeed = 1; // Movement speed
    const rotationSpeed = 0.1; // Rotation speed

    // Calculate forward/backward movement
    const dy = (FORWARD - BACKWARD) * movementSpeed;

    // Apply movement relative to rotation
    const sin = Math.sin(this.position.rotation);
    const cos = Math.cos(this.position.rotation);
    const rotatedDx = dy * sin; // Movement along x-axis
    const rotatedDy = dy * cos; // Movement along y-axis

    this.move(rotatedDx, rotatedDy);

    // Apply rotation
    this.rotate((CLOCKWISE_ROTATION - CCW_ROTATION) * rotationSpeed);
  }

  public destroy(agentList: Agent[]): void {
    const index = agentList.indexOf(this);
    if (index !== -1) {
      agentList.splice(index, 1); // Remove the agent from the list
    }
  }
}

class Food {
  public position: { x: number; y: number; rotation: number };
  public size: number;
  public polygon: Vertex[];

  constructor(x: number = 0, y: number = 0, size: number = 10) {
    this.position = { x: x, y: y, rotation: 0 }; // Initial position and rotation
    this.size = size; // Size of the food
    this.polygon = this.getGeometry(); // Initial geometry
  }

  /**
   * Generates the polygon for the isosceles triangle.
   */
  public getGeometry(): Vertex[] {
    const baseHalf = this.size / 2; // Half of the base length
    const height = (Math.sqrt(3) / 2) * this.size; // Height of the triangle (equilateral)

    const vertices: Vertex[] = [];

    // Top vertex (pointing forward relative to rotation)
    vertices.push({
      x: this.position.x + Math.cos(this.position.rotation) * height,
      y: this.position.y + Math.sin(this.position.rotation) * height,
    });

    // Bottom-left vertex
    vertices.push({
      x:
        this.position.x +
        Math.cos(this.position.rotation + Math.PI / 2) * baseHalf -
        (Math.cos(this.position.rotation) * height) / 2,
      y:
        this.position.y +
        Math.sin(this.position.rotation + Math.PI / 2) * baseHalf -
        (Math.sin(this.position.rotation) * height) / 2,
    });

    // Bottom-right vertex
    vertices.push({
      x:
        this.position.x +
        Math.cos(this.position.rotation - Math.PI / 2) * baseHalf -
        (Math.cos(this.position.rotation) * height) / 2,
      y:
        this.position.y +
        Math.sin(this.position.rotation - Math.PI / 2) * baseHalf -
        (Math.sin(this.position.rotation) * height) / 2,
    });

    return vertices;
  }

  /**
   * Updates the triangle's geometry (e.g., when moved or rotated).
   */
  public update(): void {
    this.polygon = this.getGeometry();
  }
}

export { Agent, Food };

import NeuralNetwork from "./NeuralNetwork";

type Vertex = { x: number; y: number };

class Agent {
  public position: { x: number; y: number; rotation: number };
  public width: number;
  public height: number;

  public polygon: Vertex[];

  public NeuralNetwork: NeuralNetwork;

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

    this.NeuralNetwork = new NeuralNetwork([3, 4, 4, 5]);

    // TODO: Add agent fitness and use neural network
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
    this.update();
  }

  public rotate(dr: number): void {
    this.position.rotation = (this.position.rotation + dr) % (2 * Math.PI);
    this.update();
  }

  public update(): void {
    this.polygon = this.getgeometry();
  }

  /**
   * Removes this agent from the given list and sets itself to null.
   * @param agentList The list of agents to remove this agent from.
   */
  public destroy(agentList: Agent[]): void {
    const index = agentList.indexOf(this);
    if (index !== -1) {
      agentList.splice(index, 1); // Remove the agent from the list
    }
  }
}

export default Agent;

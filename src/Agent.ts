class Agent {
  public position: { x: number; y: number };
  public width: number;
  public height: number;

  public polygon: [
    { x: number; y: number },
    { x: number; y: number },
    { x: number; y: number },
    { x: number; y: number }
  ];

  public updatePolygon: () => void;

  constructor(
    x: number = 0,
    y: number = 0,
    width: number = 10,
    height: number = 10
  ) {
    this.position = { x: x, y: y };

    // Dimensions
    this.width = width;
    this.height = height;

    this.polygon = this.getgeometry() as [
      { x: number; y: number },
      { x: number; y: number },
      { x: number; y: number },
      { x: number; y: number }
    ];

    this.updatePolygon = () => {
      this.polygon = this.getgeometry() as [
        { x: number; y: number },
        { x: number; y: number },
        { x: number; y: number },
        { x: number; y: number }
      ];
    };
  }

  public getgeometry() {
    const verticies = [];

    // Top left vertex
    verticies.push({
      x: this.position.x - this.width / 2,
      y: this.position.y - this.height / 2,
    });

    // Top right vertex
    verticies.push({
      x: this.position.x + this.width / 2,
      y: this.position.y - this.height / 2,
    });

    // Bottom Right vertex
    verticies.push({
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    });

    // Bottom left vertex
    verticies.push({
      x: this.position.x - this.width / 2,
      y: this.position.y + this.height / 2,
    });

    return verticies;
  }
}

export default Agent;

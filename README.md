# EvoSquares

**EvoSquares** is a simulation project that models the evolution of square-shaped agents in a 2D environment. The agents navigate the environment, sense food, and use neural networks to make decisions. Over time, the agents adapt and evolve through genetic algorithms.

## Features

- **Agent Movement**: Agents can move, rotate, and interact with their surroundings.
- **Food Consumption**: Food items are scattered in the simulation, and agents compete to collect them.
- **Neural Networks**: Each agent uses a neural network for decision-making, allowing them to learn and improve.
- **Sensors**: Agents are equipped with sensors to detect nearby food and other entities.
- **Genetic Algorithm**: Simulates evolution by selecting the fittest agents to reproduce and pass their traits to the next generation.
- **Visualization**: Real-time rendering of agents, food, and interactions.

---

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine.
- **TypeScript**: The project uses TypeScript for type safety and development efficiency.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/CodeByBryant/EvoSquares.git
   cd EvoSquares
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the simulation:

   ```bash
   npm start
   ```

---

## Repository Structure

```
EvoSquares/
├── src/
│   ├── main.ts           # Main entry point of the simulation
│   ├── Agent.ts          # Defines the Agent and Food classes
│   ├── NeuralNetwork.ts  # Implements the neural network logic
|   ├── main.css          # Styles for the simulation
|   ├── vite-env.d.ts     # Type declerations
│   ├── utilities/
│   │   ├── AgentConfig.json  # Configuration file for agents
│   │   ├── utilities.ts      # Helper functions
├── package.json
├── index.html      	  # Webpage for displaying the simulation
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

---

## How It Works

1. **Neural Networks** :

   - Agents use a multi-layer neural network with customizable architecture.
   - Sensor inputs are fed into the network, and outputs dictate movement and rotation.

2. **Sensors** :

   - Agents sense the environment using raycasting, detecting food and obstacles.
   - Sensor data is normalized and used as input for the neural network.

3. **Evolution** :

   - At the end of each generation, agents are evaluated based on fitness (e.g., food collected).
   - The best-performing agents reproduce, passing their neural network weights to the next generation with mutations.

---

## Customization

- **Agent Behavior**: Modify the neural network architecture or activation functions in `NeuralNetwork.ts`.
- **Simulation Settings**: Adjust agent movement speed, sensor range, and other parameters in `AgentConfig.json`.

---

## Contributing

Contributions are welcome! Feel free to open issues, suggest new features, or submit pull requests.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Author

Developed with ❤️ by **Bryant Ejorh** ([CodeByBryant](https://github.com/CodeByBryant)).

---

Let me know if you’d like to tweak or expand any section!

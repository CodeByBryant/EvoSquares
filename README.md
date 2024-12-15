# Simulation Project

This is a Python-based simulation involving agents (squares) competing to collect food in the least amount of time. The project features genetic algorithms and neural networks to evolve agent behavior and decision-making over multiple generations.

---

## **Features**

- **Agent Competition**: Squares gather food scattered across the environment.
- **Reward System**: Agents that collect the most food in the least amount of time are rewarded.
- **Genetic Algorithms**: Traits such as movement speed and perception evolve over generations.
- **Neural Networks**: Agents use neural networks to make decisions based on environmental inputs.
- **Visualization**: Displays the simulation in 2D (using Pygame).

---

## **Planned Features**

- 3D Simulation: Once the core logic is stable, the project will be expanded to 3D using Unity.
- Advanced Neural Networks: Potentially integrating reinforcement learning for more adaptive behaviors.

---

## **Folder Structure**

```plaintext
simulation_project/
├── LICENSE
├── README.md
├── requirements.txt         # Python dependencies
├── main.py                  # Entry point for the simulation
├── simulation/              # Core simulation code
│   ├── agent.py             # Logic for agents
│   ├── food.py              # Food mechanics
│   ├── environment.py       # Manages the simulation environment
│   ├── genetic.py           # Genetic algorithm implementation
│   └── neural_network.py    # Neural network logic
├── utils/                   # Helper functions
│   ├── visualizer.py        # Handles visualization
│   └── logger.py            # Logs events and stats
└── tests/                   # Unit tests
```

---

## **Getting Started**

### **Prerequisites**

Make sure you have Python 3.8 or higher installed. Install required libraries using:

```bash
pip install -r requirements.txt
```

### **Running the Simulation**

1. Clone this repository:
   ```bash
   git clone https://github.com/CodeByBryant/AI-Learning-Simulation
   cd AI-Learning-Simulation
   ```
2. Run the main.py:
   ```bash
   python main.py
   ```

---

## **Dependencies**

- `numpy`: For mathematical operations.
- `pygame`: For interactive 2D visualization.
- `tensorflow` or `pytorch`: For neural network implementation.

---

## **Contributing**

Feel free to contribute by submitting issues or creating pull requests. Contributions can include bug fixes, feature suggestions, or performance improvements.

---

## **License**

This project is licensed under the terms of the LICENSE file included in this repository.

---

## **Future Development**

- Expand to 3D simulation using Unity.
- Add reinforcement learning for real-time decision-making.

---

## **Contact)**

For questions or feedback, please contact me.

Thanks goes [Clear Code](https://github.com/clear-code-projects) for basic system.

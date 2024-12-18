# EvoSquares

**EvoSquares** is a simulation application that explores the evolution of behavior through genetic algorithms and neural networks. Squares compete to gather food efficiently, adapting over time to achieve better results.

---

## Features

- Implements genetic algorithms to simulate evolving behaviors.
- Utilizes neural networks to control square actions.
- Rendered using HTML5 Canvas.
- Runs as a desktop application with Electron.

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd EvoSquares
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the TypeScript files:

   ```bash
   npm run build
   ```

4. Start the application:

   ```bash
   npm start
   ```

---

## Project Structure

```
EvoSquares/
├── src/
│   ├── main.ts       # Electron main process
│   ├── preload.ts    # Preload script (optional)
│   ├── index.html    # HTML for the canvas
│   ├── renderer.ts   # Canvas rendering logic
├── tsconfig.json     # TypeScript configuration
├── package.json      # Project metadata
├── node_modules/     # Dependencies
```

---

## Usage

1. Launch the application to view the simulation.
2. The squares will compete to collect food, adapting over time.

---

## Customization

You can modify the simulation to:

- Adjust genetic algorithm parameters like mutation rates or selection methods.
- Introduce environmental changes such as obstacles.
- Analyze results by logging data or visualizing performance metrics.

---

## Contributing

Contributions are welcome. Fork the repository, make your changes, and submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

For questions or feedback, feel free to open an issue or contact the repository maintainers.

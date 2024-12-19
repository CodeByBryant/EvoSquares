class NeuralNetwork {
  levels: Level[];

  /**
   * Creates a new neural network with the specified number of neurons in each layer.
   *
   * @param layerSizes An array where each element represents the number of neurons in that layer.
   *                   Example: [3, 4, 2] means:
   *                   - 3 neurons in the input layer,
   *                   - 4 neurons in the hidden layer,
   *                   - 2 neurons in the output layer.
   */
  constructor(layerSizes: number[]) {
    this.levels = [];
    for (let i = 0; i < layerSizes.length - 1; i++) {
      this.levels.push(new Level(layerSizes[i], layerSizes[i + 1]));
    }
  }

  /**
   * Feed the input data through the neural network and get the output.
   *
   * @param inputs The input values to feed into the network.
   * @param network The neural network object to be used.
   * @returns The output values generated by the network.
   */
  static feedForward(inputs: number[], network: NeuralNetwork): number[] {
    let outputs = Level.feedForward(inputs, network.levels[0]);
    for (let i = 1; i < network.levels.length; i++) {
      outputs = Level.feedForward(outputs, network.levels[i]);
    }
    return outputs;
  }

  /**
   * Apply random mutations to the network's weights and biases.
   * This is often used in genetic algorithms or for introducing randomness in training.
   *
   * @param network The neural network to mutate.
   * @param mutationRate The rate at which to apply the mutations. Default is 1.
   */
  static mutate(network: NeuralNetwork, mutationRate = 1): void {
    network.levels.forEach((level) => {
      for (let i = 0; i < level.biases.length; i++) {
        level.biases[i] = NeuralNetwork.lerp(
          level.biases[i],
          Math.random() * 2 - 1,
          mutationRate
        );
      }
      for (let i = 0; i < level.weights.length; i++) {
        for (let j = 0; j < level.weights[i].length; j++) {
          level.weights[i][j] = NeuralNetwork.lerp(
            level.weights[i][j],
            Math.random() * 2 - 1,
            mutationRate
          );
        }
      }
    });
  }

  // Linear interpolation function used in mutation to blend two values
  private static lerp(start: number, end: number, amount: number): number {
    return start + (end - start) * amount;
  }
}

class Level {
  inputs: number[];
  outputs: number[];
  biases: number[];
  weights: number[][];

  /**
   * Creates a new layer in the neural network.
   *
   * @param inputCount The number of input neurons feeding into this layer.
   * @param outputCount The number of neurons in this layer (the output neurons).
   */
  constructor(inputCount: number, outputCount: number) {
    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);
    this.biases = new Array(outputCount);
    this.weights = [];
    for (let i = 0; i < inputCount; i++) {
      this.weights[i] = new Array(outputCount);
    }
    Level.randomize(this);
  }

  // Randomly initialize the weights and biases
  private static randomize(level: Level): void {
    for (let i = 0; i < level.inputs.length; i++) {
      for (let j = 0; j < level.outputs.length; j++) {
        level.weights[i][j] = Math.random() * 2 - 1; // Random weights between -1 and 1
      }
    }
    for (let i = 0; i < level.biases.length; i++) {
      level.biases[i] = Math.random() * 2 - 1; // Random biases between -1 and 1
    }
  }

  /**
   * Perform the feedforward operation for this layer and return the output.
   *
   * @param givenInputs The inputs to be processed by this layer.
   * @param level The current layer object being processed.
   * @returns The output values after processing the inputs through the layer.
   */
  static feedForward(givenInputs: number[], level: Level): number[] {
    // Copy the input values into the inputs array of the layer
    for (let i = 0; i < level.inputs.length; i++) {
      level.inputs[i] = givenInputs[i];
    }

    // Calculate the outputs for the layer
    for (let i = 0; i < level.outputs.length; i++) {
      let sum = 0;
      for (let j = 0; j < level.inputs.length; j++) {
        sum += level.inputs[j] * level.weights[j][i];
      }

      // Add the bias and apply the tanh activation function
      sum += level.biases[i];
      level.outputs[i] = Math.tanh(sum); // Apply tanh activation
    }

    return level.outputs;
  }
}

export default NeuralNetwork;

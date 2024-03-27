/*
739. Daily Temperatures
Medium

Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the i-th day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

Example 1:

Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
Example 2:

Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]
Example 3:

Input: temperatures = [30,60,90]
Output: [1,1,0]
 

Constraints:

1 <= temperatures.length <= 10^5
30 <= temperatures[i] <= 100
*/
function dailyTemperatures(temperatures: number[]): number[] {
  const result: number[] = new Array(temperatures.length).fill(0);
  const stack: {index: number, value: number}[] = []; // [(index, value)]

  for (let temperatureIndex = 0; temperatureIndex < temperatures.length; temperatureIndex++) {
    const temperatureValue = temperatures[temperatureIndex];
    while (stack.length > 0) {
      const prevTemperature = stack[stack.length - 1];
      if (temperatureValue > prevTemperature.value) {
        result[prevTemperature.index] = temperatureIndex - prevTemperature.index;
        stack.pop();
      } else {
        break; // because the previous element will be even hotter (higher value)
      }
    }
    stack.push({index: temperatureIndex, value: temperatureValue});
  }

  return result;
}

// challenge.js

const fs = require('fs');

// Initialize the program
init();

/**
 * Initializing function, the program begins here
 */
function init() {
  const fileName = 'input.txt';
  const splitChar = '\n';
  challenge1(fileName, splitChar);
  challenge2(fileName, splitChar);
}

/**
 * The first challenge is to take in a list of segments between two nodes and
 * find how many unique paths there are between the start and the finish. Large
 * caves (capital letters) may be visited any number of times, small caves (lower
 * case letters) may be visited at most once
 */
function challenge1(fileName, splitChar) {
  const startTime = new Date().getTime();
  const input = parseInput(fileName, splitChar);
  const network = buildCaveNetwork(input);
  const routes = findNetworkRoutes(network);
  const endTime = new Date().getTime();
  console.log(`Challenge 1: ${routes.length}, Time: ${(endTime - startTime) / 1000}s`);
}

/**
 * The second challenge is the same as the first challenge but you're allowed to hit
 * one small cave twice one time
 */
function challenge2(fileName, splitChar) {
  const startTime = new Date().getTime();
  const input = parseInput(fileName, splitChar);
  const network = buildCaveNetwork(input);
  const routes = findNetworkRoutesAlt(network);
  const endTime = new Date().getTime();
  console.log(`Challenge 2: ${routes.length}, Time: ${(endTime - startTime) / 1000}s`);
}

/**
 * Grabs the inputs from input.txt, then parses them and returns the
 * outputs only
 * @param {string} filename The filename of the input to parse
 * @param {string} splitChar The character(s) to split the lines by
 * @returns {array} An array of outputs only
 */
function parseInput(fileName, splitChar) {
  // Reads in the file as a string, splits along splitChar for each line
  let input = fs.readFileSync(fileName, 'utf-8').split(splitChar);
  // Formats the input into a more digestible format
  return input.map(segment => {
    let pair = segment.split('-');
    return {
      start: pair[0],
      end: pair[1]
    };
  });
}

/**
 * Builds out an object representing the cave network showing which caves are
 * connected to what
 * @param {array<object>} input parsed input of cave network connections (e.g. A-c)
 * @returns {object} all of the caves as keys with an array of all the other caves
 *                   they connect to as their values
 */
function buildCaveNetwork(input) {
  const network = {};
  // Go through each input and add the connections to the network
  input.forEach(connection => {
    // Use sets to avoid duplicates
    if (!network[connection.start]) network[connection.start] = new Set();
    if (!network[connection.end]) network[connection.end] = new Set();
    // Add the connections of the start and the end to the network
    if (connection.end != 'start') {
      network[connection.start].add(connection.end);
    }
    if (connection.start != 'start') {
      network[connection.end].add(connection.start);
    }
  });
  // Convert the Sets to arrays so they're easier to handle
  Object.keys(network).forEach(cave => {
    network[cave] = Array.from(network[cave]);
  });
  return network;
}

/**
 * Takes a parsed network built from buildCaveNetwork() and finds all of the
 * valid paths from the start to the end
 * @param {object} network All of the caves and which connections they have
 * @returns {array<array<string>>} An array of arrays which contain paths from
 *                                 the cave start to the cave end
 */
function findNetworkRoutes(network) {
  let currRoute;
  const routes = [];
  const queue = []; 
  // currRoute acts as the route state for the next cave
  network.start.forEach(cave => {
    queue.push({
      currRoute: ['start'],
      nextCave: cave
    });
  });
  // while queue still has something in it
  while (queue.length > 0) {
    // grab the first in queue for the next one
    const nextInQueue = queue.shift();
    // grab the current route state and the next in queue for each
    const nextCave = nextInQueue.nextCave;
    currRoute = nextInQueue.currRoute;
    // add the next cave to the current route
    currRoute.push(nextCave);
    // if we reached the end, add it to the routes
    if (nextCave == 'end') {
      routes.push([...currRoute]);
    // otherwise we're not at the end, keep going
    } else {
      network[nextCave].forEach(cave => {
        // each lowercase small cave can only be visited once
        if (cave == cave.toLowerCase() && !currRoute.includes(cave)) {
          queue.push({ currRoute: [...currRoute], nextCave: cave});
        // upper case caves can be visited any number of times
        } else if (cave == cave.toUpperCase()) {
          queue.push({ currRoute: [...currRoute], nextCave: cave});
        }
      });
    }
  }
  return routes;
}

/**
 * Takes a parsed network built from buildCaveNetwork() and finds all of the
 * valid paths from the start to the end (takes in the rules of part 2 of the
 * write up where you can hit exactly one small cave twice)
 * @param {object} network All of the caves and which connections they have
 * @returns {array<array<string>>} An array of arrays which contain paths from
 *                                 the cave start to the cave end
 */
function findNetworkRoutesAlt(network) {
  let currRoute;
  const routes = [];
  const queue = []; 
  // currRoute acts as the route state for the next cave
  network.start.forEach(cave => {
    queue.push({
      currRoute: ['start'],
      nextCave: cave,
      smallCaveTwice: false
    });
  });
  // while queue still has something in it
  while (queue.length > 0) {
    // grab the first in queue for the next one
    const nextInQueue = queue.shift();
    // grab the current route state and the next in queue for each
    const nextCave = nextInQueue.nextCave;
    currRoute = nextInQueue.currRoute;
    // add the next cave to the current route
    currRoute.push(nextCave);
    // if we reached the end, add it to the routes
    if (nextCave == 'end') {
      routes.push([...currRoute]);
    // otherwise we're not at the end, keep going
    } else {
      network[nextCave].forEach(cave => {
        // each lowercase small cave can only be visited once
        if (cave == cave.toLowerCase() && !currRoute.includes(cave)) {
          queue.push({
            currRoute: [...currRoute],
            nextCave: cave,
            smallCaveTwice: nextInQueue.smallCaveTwice
          });
        // you can hit one small cave once
        } else if (cave == cave.toLowerCase() && currRoute.includes(cave) 
                   && !nextInQueue.smallCaveTwice) {
          queue.push({
            currRoute: [...currRoute],
            nextCave: cave,
            smallCaveTwice: true
          });
        // upper case caves can be visited any number of times
        } else if (cave == cave.toUpperCase()) {
          queue.push({
            currRoute: [...currRoute],
            nextCave: cave,
            smallCaveTwice: nextInQueue.smallCaveTwice
          });
        }
      });
    }
  }
  return routes;
}
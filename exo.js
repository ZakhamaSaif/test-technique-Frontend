var WATER_POINT_TYPE = "WATER";
var EARTH_POINT_TYPE = "EARTH";
var POINT_TYPES = [WATER_POINT_TYPE, EARTH_POINT_TYPE];

var DEFAULT_WATER_COLOR = [30, 144, 255];
var DEFAULT_EARTH_COLOR = [105, 105, 105];
var DEFAULT_COLORS = {
  [WATER_POINT_TYPE]: DEFAULT_WATER_COLOR, // blue
  [EARTH_POINT_TYPE]: DEFAULT_EARTH_COLOR, // dark grey
};

function generateRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

class Map {
  constructor(height, width) {
    var map = [];
    for (var i = 0; i < height; i++) {
      var row = [];
      for (var j = 0; j < width; j++) {
        row.push(this.generatePointType());
      }
      map.push(row);
    }
    this.map = map;
  }

  generatePointType() {
    return POINT_TYPES[generateRandomInteger(2)];
  }

  getRawMap() {
    var rawMap = [];
    for (var i = 0; i < this.map.length; i++) {
      var row = [];
      for (var j = 0; j < this.map[i].length; j++) {
        row.push(DEFAULT_COLORS[this.map[i][j]]);
      }
      rawMap.push(row);
    }
    return rawMap;
  }

  getColoredMap() {
    // create new copy
    const map = this.map.map((data) => [...data]);

    // visited will be used in the bfs algo
    const visited = Array.from({ length: map.length }, () =>
      Array.from({ length: map[0].length }, () => false)
    );

    const generateRandomColor = () => {
      var color = [];
      for (var i = 0; i < 3; i++) {
        color.push(generateRandomInteger(256));
      }
      return color;
    };

    // in this parte i will use the BFS algorithm
    const coloredIsland = (currentP, color) => {
      while (currentP.length > 0) {
        const [x, y] = currentP.shift();
        // check the block is valid to colored [(x,y) , is earth , not visited]
        if (
          x >= 0 &&
          y >= 0 &&
          x < map.length &&
          y < map[x].length &&
          map[x][y] === EARTH_POINT_TYPE &&
          !visited[x][y]
        ) {
          // check the island is picked
          visited[x][y] = true;
          map[x][y] = color; //set the color of the cuurent block
          //Recursivly call the function check the right, left, up, down
          currentP.push([x + 1, y]);
          currentP.push([x, y + 1]);
          currentP.push([x - 1, y]);
          currentP.push([x, y - 1]);
        }
      }
    };

    /// Iterate each block and coloring
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const block = map[i][j];
        // check if is an earth , not visited
        if (block === EARTH_POINT_TYPE && !visited[i][j]) {
          const color = generateRandomColor();
          coloredIsland([[i, j]], color);
        } else if (block === WATER_POINT_TYPE) {
          map[i][j] = DEFAULT_COLORS[block];
        }
      }
    }

    return map;
  }
}

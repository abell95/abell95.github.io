// Encapsulate world state management and helper functions
class World {
  static getWorldWidth(blocksize) {
    return (
      Math.floor(window.innerWidth * 0.6) -
      ((window.innerWidth * 0.6) % blocksize)
    );
  }

  static getWorldHeight(blocksize) {
    return (
      Math.floor(window.innerHeight * 0.6) -
      ((window.innerHeight * 0.6) % blocksize)
    );
  }
}

export default World;

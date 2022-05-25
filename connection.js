class Connection {
  constructor(bodyA, bodyB) {
    var lastLink = bodyA.bodies.length - 1;
    this.link = Constraint.create({
      bodyA: bodyA.bodies[lastLink],
      pointA: { x: 0, y: 0 },
      bodyB: bodyB,
      pointB: { x: 0, y: 0 },
      length: -100,
      stiffness: 0.01,
    });
    World.add(world, this.link);
  }
  breakConnection() {
    World.remove(world, this.link);
  }
}

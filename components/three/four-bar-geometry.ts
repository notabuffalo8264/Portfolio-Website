export type PlanePoint = {
  y: number;
  z: number;
};

export type IntersectionPair = [PlanePoint, PlanePoint];

export function circleCircleIntersections(
  centerA: PlanePoint,
  radiusA: number,
  centerB: PlanePoint,
  radiusB: number,
  out: IntersectionPair = [{ y: 0, z: 0 }, { y: 0, z: 0 }],
): IntersectionPair | null {
  const dy = centerB.y - centerA.y;
  const dz = centerB.z - centerA.z;
  const distanceSquared = dy * dy + dz * dz;
  const distance = Math.sqrt(distanceSquared);
  const epsilon = 1e-9;

  if (
    !Number.isFinite(distance) ||
    radiusA <= 0 ||
    radiusB <= 0 ||
    distance < epsilon ||
    distance > radiusA + radiusB + epsilon ||
    distance < Math.abs(radiusA - radiusB) - epsilon
  ) {
    return null;
  }

  const along = (radiusA * radiusA - radiusB * radiusB + distanceSquared) / (2 * distance);
  const heightSquared = radiusA * radiusA - along * along;
  if (heightSquared < -epsilon) {
    return null;
  }

  const height = Math.sqrt(Math.max(0, heightSquared));
  const unitY = dy / distance;
  const unitZ = dz / distance;
  const midpointY = centerA.y + along * unitY;
  const midpointZ = centerA.z + along * unitZ;
  const perpendicularY = -unitZ * height;
  const perpendicularZ = unitY * height;

  out[0].y = midpointY + perpendicularY;
  out[0].z = midpointZ + perpendicularZ;
  out[1].y = midpointY - perpendicularY;
  out[1].z = midpointZ - perpendicularZ;
  return out;
}

export function closestPoint(
  candidates: IntersectionPair,
  previous: PlanePoint,
): PlanePoint {
  const distanceSquared = (point: PlanePoint) => {
    const dy = point.y - previous.y;
    const dz = point.z - previous.z;
    return dy * dy + dz * dz;
  };

  return distanceSquared(candidates[0]) <= distanceSquared(candidates[1])
    ? candidates[0]
    : candidates[1];
}

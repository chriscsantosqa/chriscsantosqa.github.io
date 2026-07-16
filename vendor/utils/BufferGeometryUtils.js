import '../../js/career-progression.js';
import {
  TriangleFanDrawMode,
  TriangleStripDrawMode,
  TrianglesDrawMode,
} from 'three';

/**
 * Converts triangle fan and triangle strip geometries into triangle geometry.
 * GLTFLoader imports only this utility from the original module.
 */
function toTrianglesDrawMode(geometry, drawMode) {
  if (drawMode === TrianglesDrawMode) {
    console.warn(
      'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.',
    );
    return geometry;
  }

  if (drawMode !== TriangleFanDrawMode && drawMode !== TriangleStripDrawMode) {
    console.error(
      'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:',
      drawMode,
    );
    return geometry;
  }

  let index = geometry.getIndex();

  if (index === null) {
    const indices = [];
    const position = geometry.getAttribute('position');

    if (position === undefined) {
      console.error(
        'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.',
      );
      return geometry;
    }

    for (let current = 0; current < position.count; current += 1) {
      indices.push(current);
    }

    geometry.setIndex(indices);
    index = geometry.getIndex();
  }

  const numberOfTriangles = index.count - 2;
  const newIndices = [];

  if (drawMode === TriangleFanDrawMode) {
    for (let current = 1; current <= numberOfTriangles; current += 1) {
      newIndices.push(index.getX(0));
      newIndices.push(index.getX(current));
      newIndices.push(index.getX(current + 1));
    }
  } else {
    for (let current = 0; current < numberOfTriangles; current += 1) {
      if (current % 2 === 0) {
        newIndices.push(index.getX(current));
        newIndices.push(index.getX(current + 1));
        newIndices.push(index.getX(current + 2));
      } else {
        newIndices.push(index.getX(current + 2));
        newIndices.push(index.getX(current + 1));
        newIndices.push(index.getX(current));
      }
    }
  }

  if (newIndices.length / 3 !== numberOfTriangles) {
    console.error(
      'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.',
    );
  }

  const newGeometry = geometry.clone();
  newGeometry.setIndex(newIndices);
  newGeometry.clearGroups();

  return newGeometry;
}

export { toTrianglesDrawMode };

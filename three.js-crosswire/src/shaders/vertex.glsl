uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec2 pixels;

attribute float aRandom;
float PI = 3.1415926535897932384626433832795;

void main() {
    vUv = uv;
    // vPosition = position
    // pixels = vec2(1.0 / resolution.x, 1.0 / resolution.y)
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vec4 mvPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);

    mvPosition.y += aRandom + sin(time + 15.*aRandom);
    mvPosition = viewMatrix * mvPosition;
    vViewPosition = -mvPosition.xyz;

    gl_Position = projectionMatrix * mvPosition;
}

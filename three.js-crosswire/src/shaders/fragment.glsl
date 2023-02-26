uniform float time;
uniform float progress; 
uniform sampler2D uMatcap;
varying vec4 resolution;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec2 vUv;

float PI = 3.1415926535897932384626433832795;

void main(){

    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    vec3 x = normalize(vec3(viewDir.z, 0.0, -viewDir.x));
    vec3 y = cross(viewDir, x);
    vec2 uv = vec2(dot(x, vNormal), dot(y, vNormal)) * 0.495 + 0.5;

    // vec4 color = texture2D(uMatcap, vUv);
    // gl_FragColor = color;

    gl_FragColor = vec4(vUv, 0.0, 1.0);
    gl_FragColor = vec4(normal, 1.0);
}

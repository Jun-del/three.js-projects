uniform float time;
uniform float progress; 

uniform sampler2D uScan;
uniform sampler2D uMatcap;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying vec4 resolution;

float PI = 3.1415926535897932384626433832795;

void main(){

    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    vec3 x = normalize(vec3(viewDir.z, 0.0, -viewDir.x));
    vec3 y = cross(viewDir, x);
    vec2 uv = vec2(dot(x, vNormal), dot(y, vNormal)) * 0.495 + 0.5;
    vec4 matcap = texture2D(uMatcap, uv);

    // Ripple effect
    vec2 scanUv = fract(vWorldPosition.xz);

    if(vNormal.y < 0.){
        scanUv = fract(vUv * 10.);
    }
    
    vec3 origin = vec3(0.0, 0.0, 0.0);
    vec4 scanMask = texture2D(uScan, scanUv);
    
    float dist = distance(vWorldPosition, origin);
    float radialMove = fract(dist - time);
    // Fade out the effect
    radialMove *= 1. - smoothstep(1., 3., dist); 
    radialMove *= 1. - step(time, dist);

    float scanMix = smoothstep(0.3, 0., 1. - radialMove);
    scanMix *= 1. - scanMask.r * 0.7;

    scanMix += smoothstep(0.1, 0., 1. - radialMove) * 1.5;

    vec3 scanColor = mix(vec3(1.), vec3(0.5, 0.5, 1), scanMix * 0.5);


    gl_FragColor = vec4(vUv, 0.0, 1.0);
    gl_FragColor = vec4(normal, 1.0);
    gl_FragColor = vec4(vWorldPosition, 1.0);
    gl_FragColor = vec4(vec3(scanMask.r), 1.0);
    gl_FragColor = vec4(vec3(radialMove), 1.0);
    gl_FragColor = vec4(vec3(smoothstep(1., 3., dist)), 1.0);
    gl_FragColor = vec4(vec3(step(time, dist)), 1.0);
    gl_FragColor = vec4(vec3(radialMove), 1.0);
    gl_FragColor = vec4(vec3(scanMix), 1.0);
    gl_FragColor = vec4(vec3(scanColor), 1.0);

    gl_FragColor = matcap;
    gl_FragColor.rgb = mix(gl_FragColor.rgb, scanColor, scanMix * 0.9);
}

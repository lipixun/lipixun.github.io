// EbanfloLensing
// Modified from https://www.shadertoy.com/view/MtByRh
// Original author: https://www.shadertoy.com/user/Ebanflo
import { useRef } from 'react';
import { useShaderToy } from '../../utility';

export function EbanfloLensing() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useShaderToy(fragment, canvasRef, { enableMouse: false, timeFactor: 0.000003 });
  return <canvas ref={canvasRef} />;
}

const fragment = `#pragma vscode_glsllint_stage: vert
// Star Nest by Pablo RomÃ¡n Andrioli
// This content is under the MIT License.
precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

#define iterations 12
#define formuparam 0.57

#define volsteps 10
#define stepsize 0.2

#define zoom   1.200
#define tile   1.0
#define speed  0.010

#define brightness 0.0015
#define darkmatter 1.00
#define distfading 0.730
#define saturation 1.0

#define mo (2.0 * iMouse.xy - iResolution.xy) / iResolution.y * 0.001
#define blackholeCenter vec3(iTime*2.,iTime,-2.)
#define blackholeRadius 0.8
#define blackholeIntensity 1.0

float iSphere(vec3 ray, vec3 dir, vec3 center, float radius) {
  vec3 rc = ray-center;
  float c = dot(rc, rc) - (radius*radius);
  float b = dot(dir, rc);
  float d = b*b - c;
  float t = -b - sqrt(abs(d));
  float st = step(0.0, min(t,d));
  return mix(-1.0, t, st);
}

vec3 iPlane(vec3 ro, vec3 rd, vec3 po, vec3 pd) {
 float d = dot(po - ro, pd) / dot(rd, pd);
 return d * rd + ro;
}

// Fast rotation
vec3 r(vec3 v, vec2 r) {
  vec4 t = sin(vec4(r, r + 1.5707963268));
  float g = dot(v.yz, t.yw);
  return vec3(v.x * t.z - g * t.x, v.y * t.w - v.z * t.y, v.x * t.x + g * t.z);
}

vec4 mainImage(vec2 fragCoord) {
  vec2 uv = fragCoord.xy / iResolution.xy - 0.5;
  uv.y *= iResolution.y / iResolution.x;
  vec3 dir = vec3(uv * zoom, 1.0);
  float time = iTime * speed + 0.25;

  // Rotation by mouse
  vec3 from = vec3(0.0, 0.0, -15.0);
  from = r(from, mo / 10.0);
  dir = r(dir, mo / 10.0);
  from += blackholeCenter;

  // Black hole gravitational lensing calculation
  vec3 nml = normalize(blackholeCenter - from);
  vec3 pos = iPlane(from, dir, blackholeCenter, nml);
  pos = blackholeCenter - pos;
  float intensity = dot(pos, pos);

  if (intensity > blackholeRadius * blackholeRadius) {
    intensity = 1.0 / intensity;
    dir = mix(dir, pos * sqrt(intensity), blackholeIntensity * intensity);

    // Volumetric rendering
    float s = 0.1, fade = 1.0;
    vec3 v = vec3(0.0);
    for (int r = 0; r < volsteps; r++) {
      vec3 p = from + s * dir * 0.5;
      p = abs(vec3(tile) - mod(p, vec3(tile * 2.0)));
      float pa, a = pa = 0.0;
      for (int i = 0; i < iterations; i++) {
        p = abs(p) / dot(p, p) - formuparam;
        a += abs(length(p) - pa);
        pa = length(p);
      }
      float dm = max(0.0, darkmatter - a * a * 0.001);
      a *= a * a;
      if (r > 6) fade *= 1.0 - dm;
      v += fade;
      v += vec3(s, s*s, s*s*s*s) * a * brightness * fade;
      fade *= distfading;
      s += stepsize;
    }
    v = mix(vec3(length(v)), v, saturation);
    return vec4(v * 0.01, 1.0);
  }
  else {
    return vec4(0.0);
  }
}

void main() {
  gl_FragColor = mainImage(gl_FragCoord.xy);
}`;

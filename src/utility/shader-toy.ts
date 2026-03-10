// Shader toy utility
import { useEffect, type RefObject } from 'react';

export interface RenderShaderToyOptions {
  enableMouse?: boolean;
  timeFactor?: number;
}

export function useShaderToy(fragment: string, canvasRef: RefObject<HTMLCanvasElement | null>, options?: RenderShaderToyOptions) {
  const { enableMouse, timeFactor } = (options ?? {});

  useEffect(() => {
    if (canvasRef.current) {
      const controller = new AbortController();
      const releaseFn = renderShaderToy(fragment, canvasRef.current, controller.signal, { enableMouse, timeFactor });
      return () => {
        controller.abort();
        releaseFn?.();
      }
    }
    // eslint-disable-next-line
  }, [fragment, enableMouse, timeFactor]);
}

export function renderShaderToy(fragment: string, canvas: HTMLCanvasElement, signal: AbortSignal, options?: RenderShaderToyOptions): (() => void) | undefined {
  const gl = canvas.getContext('webgl') as WebGLRenderingContext;
  if (!gl) {
    return;
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const mouse = { x: 0, y: 0 };
  function updateMouse(e: MouseEvent) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }
  if (options?.enableMouse) {
    window.addEventListener('mousemove', updateMouse);
  }

  const vertexShaderSource =
    `attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

  function createShader(type: number, source: string) {
    const shader = gl.createShader(type);
    if (!shader) {
      console.error('[components/BlackHoleStarfield] createShader: Failed to create shader');
      return null;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('[components/BlackHoleStarfield] createShader: Failed to compile. Reason: ', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  // 创建着色器程序
  function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('[components/BlackHoleStarfield] createProgram: Failed to compile. Reason: ', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    return program;
  }

  // 初始化着色器
  const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
  if (!vertexShader) {
    return;
  }
  const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragment);
  if (!fragmentShader) {
    return;
  }
  const program = createProgram(vertexShader, fragmentShader);
  if (!program) {
    return;
  }

  // Get uniform locations
  const iTimeLocation = gl.getUniformLocation(program, 'iTime');
  const iResolutionLocation = gl.getUniformLocation(program, 'iResolution');
  const iMouseLocation = gl.getUniformLocation(program, 'iMouse');

  // Draw two triangles
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertexPositions), gl.STATIC_DRAW);
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

  // Render
  function render(time: DOMHighResTimeStamp) {
    if (signal.aborted) {
      return;
    }

    time *= (options?.timeFactor ?? 0.00001);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    if (iTimeLocation) {
      gl.uniform1f(iTimeLocation, time);
    }
    if (iResolutionLocation) {
      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
    }
    if (iMouseLocation) {
      gl.uniform2f(iMouseLocation, mouse.x, mouse.y);
    }

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  return () => {
    // Release resources
    gl.deleteProgram(program);
    window.removeEventListener('resize', resizeCanvas);
    if (options?.enableMouse) {
      window.removeEventListener('mousemove', updateMouse);
    }
  }
}

const triangleVertexPositions = [
  // Triangle 1
  -1, -1,
  1, -1,
  -1, 1,
  // Triangle 2
  -1, 1,
  1, -1,
  1, 1
];

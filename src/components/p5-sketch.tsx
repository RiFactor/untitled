import React, { useEffect, useRef } from "react";
import p5 from "p5";

interface Point {
  x: number;
  y: number;
  color: p5.Color;
  weight: number;
}

export function MyP5Component() {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const paths: Point[][] = [];
  let currentPath: Point[] = [];

  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(400, 400).parent(canvasRef.current!);
        p.background(255);
      };

      p.draw = () => {
        p.noFill();

        if (p.mouseIsPressed) {
          const point: Point = {
            x: p.mouseX,
            y: p.mouseY,
            color: p.color(0),
            weight: 5
          };
          currentPath.push(point);
        }

        paths.forEach(path => {
          p.beginShape();
          path.forEach(point => {
            p.stroke(point.color);
            p.strokeWeight(point.weight);
            p.vertex(point.x, point.y);
          });
          p.endShape();
        });
      };

      p.mousePressed = () => {
        currentPath = [];
        paths.push(currentPath);
      };
    };

    if (!p5InstanceRef.current) {
      p5InstanceRef.current = new p5(sketch);
    }

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, []);

  const clearCanvas = () => {
    paths.splice(0);
    if (p5InstanceRef.current) {
      p5InstanceRef.current.background(255);
    }
  };

  return (
    <div>
      <div ref={canvasRef}></div>
      <button onClick={clearCanvas}>Clear</button>
    </div>
  );
}

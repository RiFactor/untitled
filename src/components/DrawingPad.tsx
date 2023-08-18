import React from "react";
import { MyP5Component } from "./p5-sketch";

const DrawingPad = () => {
  return (
    <main className="flex flex-col p-5">
      <h1>Drawing Pad</h1>
      <br />
      {/* side bar for colour picker */}
      <aside>
        <div className="flex gap-2">
          <input id="color-picker" type="color" name="color" />
          <label htmlFor="color-picker">Colour</label>
        </div>
      </aside>
      <section>
        {/* Render MyP5Component here */}
        <MyP5Component />
      </section>
    </main>
  );
};

export default DrawingPad;

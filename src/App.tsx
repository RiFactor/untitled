import "./App.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Calculator from "./components/Calculator";

// ToDo extract reusable functions
// UI
// EdgeCase: enter number, then operator and clear operator w/o selecting a new operator: enter number should clear prev number
// EdgeCase: above - iPhone will just remember the operator if a new one isn't provided
// OR just overwrite operator, don't need clear function for it! :)

function App() {
  //combine all these functions to detect the input and then perform actions accordingly

  const handleForLoop = () => {
    for (let i = 0; i < 12; i++) {
      console.log(i);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col gap-4 p-4">
      <Navbar />
      <div className="flex w-screen flex-col p-2">
        {/* <div>
          <Card title="heading" description="text here" />
          <button className="rounded border border-neutral-50 p-2" onClick={() => handleForLoop()}>
            Click Me
          </button>
        </div> */}
        <Calculator />
      </div>
    </div>
  );
}

export default App;

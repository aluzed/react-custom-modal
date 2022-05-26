import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ConfirmModal } from "./components/ConfirmModal";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="pt-6">
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <ConfirmModal
          message="Voulez-vous vraiment faire ce projet ?"
          toggleLabel="Confirmer motivation"
          confirmLabel="Oui !"
          cancelLabel="Bof..."
          onCancel={() => {
            console.log("non !");
          }}
          onSuccess={() => {
            // ....
            return new Promise((resolve) => {
              // async job...
              return resolve(true);
            });
          }}
        />
      </header>
    </div>
  );
}

export default App;

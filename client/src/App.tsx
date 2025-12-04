import { useState } from "react";

import CodeEditor from "./components/CodeEditor";
import LanguageSelector from "./components/LanguageSelector";

const App = () => {
  const [loadEditor, setLoadEditor] = useState(false);
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");

  return (
    <main className="app">
      {!loadEditor ? (
        <LanguageSelector
          setLoadEditor={setLoadEditor}
          sourceLang={sourceLang}
          setSourceLang={setSourceLang}
          targetLang={targetLang}
          setTargetLang={setTargetLang}
        />
      ) : (
        <CodeEditor
          sourceLang={sourceLang}
          targetLang={targetLang}
          setLoadEditor={setLoadEditor}
        />
      )}
    </main>
  );
};

export default App;

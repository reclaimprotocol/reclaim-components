import React, { type ReactNode } from 'react';
import GenerateProof from './components/UtilityComponents/GenerateProof';

function App (): ReactNode {
  return (
    <div className="App">
      <GenerateProof
        appID='6d6c04eb-237b-4599-8797-94d48b0ac612'
        userID='dasq2easdase-asdq2e3'
        onSessionCreation={(session) => { console.log('session created ', session) }}
        onProofSubmission={() => {}}
        onProofSubmissionFailed={() => {}}
      />
    </div>
  );
}

export default App;

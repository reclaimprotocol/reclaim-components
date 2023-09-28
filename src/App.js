import GenerateProof from "./components/UtilityComponents/GenerateProof";

function App() {
  return (
    <div className="App">
      <GenerateProof
        appID='6d6c04eb-237b-4599-8797-94d48b0ac612'
        userID='dasq2easdase-asdq2e3'
        onProofSubmission={(p1, p2) => {
          console.log('====== onProofSubmission', p1, p2);
        }} 
        onProofSubmissionFailed={(err) => {
          console.log('==== onProofSubmissionFailed', err);
        }} 
      />
    </div>
  );
}

export default App;

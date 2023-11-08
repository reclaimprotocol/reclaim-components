# Reclaim Connect
## Overview

## Integrate Reclaim Connect in Your Front End
Reclaim Connect exposes a set of React components that can be integrated into your front end application. It is available as an NPM package. To install it, run the following command in your project directory:

```bash copy showLineNumbers
npm install @reclaimprotocol/reclaim-connect-react
```

### GenerateProof Component
The GenerateProof component enables you to request data from users. It renders a button that, when clicked, opens a modal with a QR code. Users can scan the QR code with the Reclaim mobile app to submit the requested data. The component also provides a callback function that you can use to execute logic when the proof is successfully submitted.

To use the GenerateProof component, follow these steps:

1. Import the component into your React application:

```tsx
import { GenerateProof } from '@reclaimprotocol/reclaim-connect-react';
```

2. Add the component to your application's JSX:

```tsx
<GenerateProof
  appID='6d6c04eb-237b-4599-8797-94d48b0ac612'
  userID='dasq2easdase-asdq2e3'
  onProofSubmission={() => {}}
  onProofSubmissionFailed={() => {}}
/>
```

3. Update the `applicationId` with your own application Id. You can get one by registering your application with Reclaim. Visit [Reclaim Developer Portal](https://dev.reclaimprotocol.org/applications) for more information.
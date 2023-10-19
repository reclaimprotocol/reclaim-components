# Reclaim Components
## Summary

Reclaim Components is a versatile package designed to simplify the complex implementation of reclaim functionality in your React applications. This package provides a set of pre-built React utility components that offer a hassle-free way to handle various aspects of reclaim sdk, and it is especially handy for popular, repetitive use cases.

## Installation
To get started with Reclaim Components, you can install it using npm or yarn:

```bash
npm install @reclaimprotocol/react-components
# or
yarn add @reclaimprotocol/react-components
```

## Usage
Incorporating Reclaim Components into your React application is straightforward. Here's a basic example of how to use it:

```tsx
import React, { type ReactNode } from 'react';
import { GenerateProof } from '@reclaimprotocol/react-components';

function App (): ReactNode {
  return (
    <GenerateProof
      appID='6d6c04eb-237b-4599-8797-94d48b0ac612'
      userID='dasq2easdase-asdq2e3'
      onProofSubmission={() => {}}
      onProofSubmissionFailed={() => {}}
    />
  );
}

export default App;
```


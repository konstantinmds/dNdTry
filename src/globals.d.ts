declare global {
  const tsvscode: {
    postMessage: ({ command: string, data: any }) => void
    getState: () => any
    setState: (state: any) => void
  }
}

export default tsvscode

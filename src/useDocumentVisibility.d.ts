interface IUseVis {
  count: number;
  visible: boolean;
  onVisibilityChange: (func: (isVisible: boolean) => void) => void;
}

declare module "@volkov190/react-document-visibility" {
  export default function useDocumentVisibility(): IUseVis;
}

"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback: ReactNode;
};

type State = {
  failed: boolean;
};

export class ModelErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Unable to load /public/models/homepage-mechanism.glb. Rendering the procedural fallback.",
        error,
        info,
      );
    }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

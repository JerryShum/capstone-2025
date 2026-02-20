import type { ReactFlowInstance } from "@xyflow/react";

export function calcPosition(reactFlow: ReactFlowInstance) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const xyposition = reactFlow.screenToFlowPosition({
        x: centerX - 100,
        y: centerY - 100,
    });

    return xyposition;
}
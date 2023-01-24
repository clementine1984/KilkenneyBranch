import React, { useCallback, useState } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";

const HorizontalFlow = () => {

  const initBgColor = '#fff';

  const initialNodes = [
    {
      id: "horizontal-1",
      sourcePosition: "right",
      type: "input",
      data: { label: "Facebook (Social Media)" },
      position: { x: 0, y: 80 },
    },
    {
      id: "horizontal-2",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Landing Page (VR Store)" },
      position: { x: 250, y: 0 },
    },
    {
      id: "horizontal-3",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Landing Page (Website)" },
      position: { x: 250, y: 160 },
    },
    {
      id: "horizontal-4",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Product Page (Website)" },
      position: { x: 500, y: 0 },
    },
    {
      id: "horizontal-5",
      sourcePosition: "top",
      targetPosition: "bottom",
      data: { label: "Product Page (Website)" },
      position: { x: 500, y: 100 },
    },
    {
      id: "horizontal-6",
      sourcePosition: "bottom",
      targetPosition: "top",
      data: { label: "Add to cart (Website)" },
      position: { x: 500, y: 230 },
    },
    // {
    //   id: "horizontal-7",
    //   sourcePosition: "right",
    //   targetPosition: "left",
    //   data: { label: "Node 7" },
    //   position: { x: 750, y: 50 },
    // },
    {
      id: "horizontal-8",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Checkout" },
      position: { x: 750, y: 300 },
    },
  ];

  const initialEdges = [
    {
      id: "horizontal-e1-2",
      source: "horizontal-1",
      type: "smoothstep",
      target: "horizontal-2",
      animated: true,
      label:'Third-party to Retailer Controlled'
    },
    {
      id: "horizontal-e1-3",
      source: "horizontal-1",
      type: "smoothstep",
      target: "horizontal-3",
      animated: true,
    },
    {
      id: "horizontal-e1-4",
      source: "horizontal-2",
      type: "smoothstep",
      target: "horizontal-4",
      label: "Own channel ",
      animated: true,
    },
    {
      id: "horizontal-e3-5",
      source: "horizontal-3",
      type: "smoothstep",
      target: "horizontal-5",
      animated: true,
    },
    {
      id: "horizontal-e3-6",
      source: "horizontal-3",
      type: "smoothstep",
      target: "horizontal-6",
      animated: true,
    },
    {
      id: "horizontal-e5-7",
      source: "horizontal-5",
      type: "smoothstep",
      target: "horizontal-7",
      animated: true,
    },
    {
      id: "horizontal-e6-8",
      source: "horizontal-6",
      type: "smoothstep",
      target: "horizontal-8",
      animated: true,
    },
  ];

  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  return (

    <>

<h2>Flow Paths</h2>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      style={{ background: initBgColor }}
      onConnect={onConnect}
      fitView
      attributionPosition="bottom-left"
    ></ReactFlow>
    </>
    
  );
};

export default HorizontalFlow;

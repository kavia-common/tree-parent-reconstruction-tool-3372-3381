#!/bin/bash
cd /home/kavia/workspace/code-generation/tree-parent-reconstruction-tool-3372-3381/tree_topology_frontend
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi


import autoBind from 'auto-bind';
import React from 'react';

import * as dom from './dom';
import reconciler from './reconciler';

export const instances = new WeakMap();

export default class Instance {
    isUnmounted = false;

    constructor(options) {
        autoBind(this);

        this.options = options;

        this.rootNode = dom.createNode('root');

        this.rootNode.onRender = this.onRender;

        this.container = reconciler.createContainer(this.rootNode, false, false);

        this.exitPromise = new Promise((resolve, reject) => {
            this.resolveExitPromise = resolve;
            this.rejectExitPromise = reject;
        });
    }

    onRender() {
        // If unmounted - do nothing...
        if (this.isUnmounted) return;
        // After mounted - do nothing... ¯\_(ツ)_/¯
    }

    render(node) {
        reconciler.updateContainer(node, this.container);
    }

    unmount(error) {
        if (this.isUnmounted) {
            return;
        }

        this.onRender();

        this.isUnmounted = true;

        reconciler.updateContainer(null, this.container);
        instances.delete(this.options.id);

        if (error instanceof Error) {
            this.rejectExitPromise(error);
        } else {
            this.resolveExitPromise();
        }
    }

    waitUntilExit() {
        return this.exitPromise;
    }
}

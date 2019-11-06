import Instance, { instances } from './instance';

let globalID = 0;

export default (node, options = {}) => {

    if (!options.id) {
        options.id = globalID++
    }
	let instance;
	if (instances.has(options.id)) {
		instance = instances.get(options.id);
	} else {
		instance = new Instance(options);
		instances.set(options.id, instance);
	}

	instance.render(node);

	return {
		rerender: instance.render,
		unmount: () => instance.unmount(),
		waitUntilExit: instance.waitUntilExit,
		cleanup: () => instances.delete(options.id)
	};
};

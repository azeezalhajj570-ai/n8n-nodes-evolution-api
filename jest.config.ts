export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/test'],
	moduleNameMapper: {
		'^axios$': '<rootDir>/node_modules/axios/dist/node/axios.cjs',
	},
};

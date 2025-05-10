import { defineConfig, devices } from "@playwright/test";

const SLOW = process.env.SLOW;

export default defineConfig({
	// Look for test files in the "tests" directory, relative to this configuration file.
	testDir: "tests",

	// Run all tests in parallel.
	fullyParallel: true,

	// Fail the build on CI if you accidentally left test.only in the source code.
	forbidOnly: !!process.env.CI,

	// Retry on CI only.
	retries: 1,

	// Opt out of parallel tests on CI.
	workers: SLOW || process.env.CI ? 1 : undefined,

	// Reporter to use
	reporter: [["html"], ["list"]],

	use: {
		// Collect trace when retrying the failed test.
		trace: "on-first-retry",
		headless: !SLOW,
		launchOptions: {
			slowMo: SLOW ? 800 : undefined,
		},
	},
	// Configure projects for major browsers.
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
});
